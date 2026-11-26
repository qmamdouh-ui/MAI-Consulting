import { PROMPT, KNOWLEDGE } from "./content.js";

const SESSION_RE = /^[a-z0-9]{8,40}$/;
const META_RE = /<ina-meta>([\s\S]*?)<\/ina-meta>/;

function cors(req, env) {
  const origin = req.headers.get("Origin") || "";
  const ok = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).includes(origin);
  return {
    ok,
    headers: {
      "Access-Control-Allow-Origin": ok ? origin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      Vary: "Origin",
    },
  };
}

const json = (obj, status, headers = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", ...headers } });

async function bump(kv, key, ttl) {
  const n = parseInt((await kv.get(key)) || "0", 10) + 1;
  await kv.put(key, String(n), { expirationTtl: ttl });
  return n;
}

function clean(text) {
  return String(text || "").replace(/<\/?ina-meta>/gi, "").slice(0, 1200);
}

// Visitors are counted by a short hash of the address; the address itself is never stored.
async function visitorKey(req) {
  const ip = req.headers.get("CF-Connecting-IP") || "unknown";
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("ina|" + ip));
  return [...new Uint8Array(d)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function chat(req, env, c, tester) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "bad json" }, 400, c.headers);
  }
  const session = String(body.session || "");
  const msgs = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
  if (!SESSION_RE.test(session) || !msgs.length) return json({ error: "bad request" }, 400, c.headers);
  const turns = msgs
    .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: clean(m.content) }))
    .filter((m) => m.content);
  while (turns.length && turns[0].role !== "user") turns.shift();
  if (!turns.length || turns[turns.length - 1].role !== "user") return json({ error: "bad request" }, 400, c.headers);

  const day = new Date().toISOString().slice(0, 10);
  const hour = new Date().toISOString().slice(0, 13);
  const v = tester ? "t-" + tester : await visitorKey(req);
  const hourlyLimit = tester ? +env.TEST_HOURLY || 40 : +env.HOURLY_PER_VISITOR;
  if ((await bump(env.INA_KV, `rl:${v}:${hour}`, 3700)) > hourlyLimit) return json({ error: "rate" }, 429, c.headers);
  if ((await bump(env.INA_KV, `sess:${session}`, 86400)) > +env.MAX_PER_SESSION) return json({ error: "session limit" }, 429, c.headers);
  if (!tester && (await bump(env.INA_KV, `cap:${day}`, 90000)) > +env.DAILY_CAP) return json({ error: "daily cap" }, 429, c.headers);

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: env.MODEL,
      max_tokens: 700,
      system: [
        { type: "text", text: PROMPT },
        { type: "text", text: "# Knowledge base\n\n" + KNOWLEDGE, cache_control: { type: "ephemeral" } },
      ],
      messages: turns,
    }),
  });
  if (!r.ok) {
    await append(env, day, session, body, turns, null, "model_error_" + r.status, tester);
    return json({ error: "model" }, 502, c.headers);
  }
  const data = await r.json();
  const raw = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  let meta = {};
  const m = raw.match(META_RE);
  if (m) {
    try {
      meta = JSON.parse(m[1]);
    } catch {
      meta = { parse_error: true };
    }
  }
  // An unclosed trailer (output cut off, or the closing tag missing) must never reach the visitor.
  const reply = raw.replace(META_RE, "").replace(/<ina-meta>[\s\S]*$/i, "").trim();
  if (!reply) return json({ error: "empty" }, 502, c.headers);
  await append(env, day, session, body, turns, { reply, meta, usage: data.usage || null }, null, tester);
  return json(
    { reply, meta: { lang: meta.lang, need: meta.need, suggested: meta.suggested, call_requested: !!meta.call_requested, lead: meta.lead } },
    200,
    c.headers
  );
}

// One record per conversation and day, rewritten on each turn. It holds the whole transcript so far.
async function append(env, day, session, body, turns, result, error, tester) {
  const key = `log:${day}:${session}`;
  const prev = JSON.parse((await env.INA_KV.get(key)) || "null") || {
    session,
    day,
    started: new Date().toISOString(),
    page: String(body.page || "").slice(0, 200),
    source: tester ? "test" : "visitor",
    tester: tester || undefined,
    scenario: tester ? String(body.scenario || "").slice(0, 300) : undefined,
    turns: [],
  };
  const now = new Date().toISOString();
  prev.turns.push({ at: now, role: "visitor", text: turns[turns.length - 1].content });
  if (result) prev.turns.push({ at: now, role: "ina", text: result.reply, meta: result.meta, usage: result.usage });
  if (error) prev.turns.push({ at: now, role: "system", text: error });
  prev.updated = now;
  prev.model = env.MODEL;
  await env.INA_KV.put(key, JSON.stringify(prev), { expirationTtl: 86400 * (+env.LOG_TTL_DAYS || 1095) });
}

// GET /logs?date=YYYY-MM-DD with a bearer token: every conversation of that day, one JSON object per line.
async function logs(req, env) {
  const auth = req.headers.get("Authorization") || "";
  if (!env.LOG_TOKEN || auth !== "Bearer " + env.LOG_TOKEN) return new Response("forbidden", { status: 403 });
  const date = new URL(req.url).searchParams.get("date") || "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return new Response("bad date", { status: 400 });
  const out = [];
  let cursor;
  do {
    const page = await env.INA_KV.list({ prefix: `log:${date}:`, cursor });
    for (const k of page.keys) out.push(await env.INA_KV.get(k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return new Response(out.filter(Boolean).join("\n") + (out.length ? "\n" : ""), {
    headers: { "content-type": "application/x-ndjson" },
  });
}

// Every conversation reaches GitHub: a cron trigger copies each day's log into the private Employees repo,
// so Hana, the collector and the building page read Ina like any other agent. The repo is private on purpose:
// the logs hold what visitors typed.
function b64(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
function unb64(text) {
  const bin = atob(String(text).replace(/\n/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0)));
}
async function dayText(env, day) {
  const out = [];
  let cursor;
  do {
    const page = await env.INA_KV.list({ prefix: `log:${day}:`, cursor });
    for (const k of page.keys) out.push(await env.INA_KV.get(k.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return out.filter(Boolean).sort().join("\n") + (out.length ? "\n" : "");
}
async function flushDay(env, day) {
  if (!env.GITHUB_TOKEN || !env.LOG_REPO) return "not configured";
  const text = await dayText(env, day);
  if (!text) return "no conversations";
  const path = `${env.LOG_PATH || "agent-logs/site-intake"}/${day}.jsonl`;
  const url = `https://api.github.com/repos/${env.LOG_REPO}/contents/${path}`;
  const h = { Authorization: "Bearer " + env.GITHUB_TOKEN, "User-Agent": "ina-chat", Accept: "application/vnd.github+json" };
  for (let attempt = 0; attempt < 2; attempt++) {
    let sha;
    const cur = await fetch(`${url}?ref=main`, { headers: h });
    if (cur.status === 200) {
      const j = await cur.json();
      if (unb64(j.content) === text) return "unchanged";
      sha = j.sha;
    } else if (cur.status !== 404) return "read failed " + cur.status;
    const put = await fetch(url, {
      method: "PUT",
      headers: { ...h, "content-type": "application/json" },
      body: JSON.stringify({ message: `Ina: conversations ${day}`, content: b64(text), sha, branch: "main" }),
    });
    if (put.ok) return "pushed";
    if (put.status !== 409 && put.status !== 422) return "write failed " + put.status;
  }
  return "conflict";
}
async function flush(env) {
  const now = Date.now();
  const days = [new Date(now).toISOString().slice(0, 10), new Date(now - 864e5).toISOString().slice(0, 10)];
  const res = {};
  for (const d of days) res[d] = await flushDay(env, d);
  return res;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/logs" && req.method === "GET") return logs(req, env);
    const c = cors(req, env);
    // Community agents test Ina with a shared token; their conversations are logged as source "test".
    const t = req.headers.get("X-Ina-Test") || "";
    const tester = env.TEST_TOKEN && t === env.TEST_TOKEN ? (req.headers.get("X-Ina-Agent") || "agent").replace(/[^a-z0-9-]/gi, "").slice(0, 40) : "";
    if (tester) c.ok = true;
    if (req.method === "OPTIONS") return new Response(null, { status: c.ok ? 204 : 403, headers: c.headers });
    if (url.pathname === "/chat" && req.method === "POST") {
      if (!c.ok) return json({ error: "origin" }, 403, c.headers);
      try {
        return await chat(req, env, c, tester);
      } catch (e) {
        return json({ error: "server" }, 500, c.headers);
      }
    }
    return new Response("not found", { status: 404 });
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(flush(env));
  },
};
export { flush };
