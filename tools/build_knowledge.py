#!/usr/bin/env python3
"""Build the Knowledge section from knowledge/content/*.md.

Reads one markdown file per article (YAML front matter + body) and writes:
  knowledge/<slug>/index.html   one static page per published article
  knowledge/articles.json       the index the hub renders (and the weekly sync appends to)
  knowledge/index.html          hub: only the region between the BUILD markers is replaced
  sitemap.xml                   article URLs between the KNOWLEDGE markers

Only articles whose `date` is today or earlier are published (this repo is public, so
future-dated drafts must not be committed here at all; the date gate is a second guard).

Usage:  python tools/build_knowledge.py [--today YYYY-MM-DD]
"""
import argparse, datetime, html, json, math, pathlib, re, sys
import markdown, yaml

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "knowledge" / "content"
SITE = "https://mai4consulting.com"

SERVICES = [  # key, number, label, question
    ("assessment", "01", "AI Readiness Assessment", "Where do we stand, and what do we fix first?"),
    ("policy", "02", "AI Use Policy", "What are our people allowed to do, and how?"),
    ("training", "03", "Team AI Training", "How should AI be used in my role?"),
    ("support", "04", "Fluency Support", "How do we stop this decaying in six months?"),
    ("agents", "05", "Custom Agents & Tools", "Can the tool we already pay for do this task for us, every time?"),
    ("general", "", "Leadership & Perspective", "Where does AI sit in how an organisation is run?"),
]
SVC = {k: (n, l, q) for k, n, l, q in SERVICES}
SERVICE_PAGE = {"assessment": "services/assessment/", "policy": "services/policy/",
                "training": "services/training/", "support": "services/support/",
                "agents": "services/agents/", "general": "services/"}
REQUIRED = ["slug", "title", "summary", "service", "format", "level", "date", "author"]


def load():
    arts = []
    for p in sorted(CONTENT.glob("*.md")):
        if p.name.startswith("_"):
            continue
        t = p.read_text(encoding="utf-8")
        m = re.match(r"^---\n(.*?)\n---\n(.*)$", t, re.S)
        if not m:
            sys.exit(f"{p.name}: missing front matter")
        fm = yaml.safe_load(m.group(1)) or {}
        miss = [k for k in REQUIRED if not fm.get(k)]
        if miss:
            sys.exit(f"{p.name}: missing {miss}")
        if fm["slug"] != p.stem:
            sys.exit(f"{p.name}: slug '{fm['slug']}' must equal the file name")
        if fm["service"] not in SVC:
            sys.exit(f"{p.name}: unknown service '{fm['service']}'")
        fm["id"] = fm["slug"]  # file-stable id used by `related`
        fm["slug"] = fm.get("short_slug") or fm["slug"]  # URL slug
        fm["date"] = str(fm["date"])
        fm["body"] = m.group(2).strip()
        fm["words"] = len(re.findall(r"\w+", fm["body"]))
        fm["minutes"] = max(1, math.ceil(fm["words"] / 220))
        fm["series"] = fm.get("series") or ""
        fm.setdefault("tags", [])
        fm.setdefault("related", [])
        fm.setdefault("featured", False)
        fm.setdefault("linkedin_url", "")
        arts.append(fm)
    seen = {}
    for a in arts:
        if a["slug"] in seen:
            sys.exit(f"duplicate URL slug '{a['slug']}' in {a['id']} and {seen[a['slug']]}")
        seen[a["slug"]] = a["id"]
    return arts


def e(s):
    return html.escape(str(s), quote=True)


def fmt_date(d):
    return datetime.date.fromisoformat(d).strftime("%d %B %Y").lstrip("0")


HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>{title} | M.A.I. Consulting</title>
<meta name="description" content="{desc}"/>
<link rel="canonical" href="{canon}"/>
<meta property="og:type" content="{ogtype}"/>
<meta property="og:site_name" content="M.A.I. Consulting"/>
<meta property="og:title" content="{title}"/>
<meta property="og:description" content="{desc}"/>
<meta property="og:url" content="{canon}"/>
<meta name="twitter:card" content="summary"/>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23001830'/%3E%3Ctext x='16' y='23' font-family='Georgia,serif' font-size='19' font-weight='700' fill='%23C9A84C' text-anchor='middle'%3EM%3C/text%3E%3C/svg%3E"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="{up}assets/site.css"/>
<link rel="stylesheet" href="{up}assets/knowledge.css"/>
{extra_head}</head>
<body>
<div class="mai-topbar">
  <div class="mai-topbar-inner">
    <a class="mai-brand" href="{up}"><span class="mai-brand-dot"></span>M.A.I. Consulting</a>
    <button class="mai-burger" id="mai-burger" aria-label="Menu" aria-expanded="false">&#9776;</button>
    <ul class="mai-links" id="mai-links">
      <li><a href="{up}services/">Services</a></li>
      <li><a href="{up}estimate/">Estimate</a></li>
      <li><a href="{up}for-funders/">For Investors</a></li>
      <li><a href="{up}compare/">Compare</a></li>
      <li><a href="{up}knowledge/" aria-current="page">Knowledge</a></li>
      <li><a href="{up}explore-your-ai-readiness/">Readiness Check</a></li>
      <li><a href="{up}transformation-journey/">Use Cases</a></li>
      <li><a class="mai-cta" href="{up}contact-us/">Book a call</a></li>
    </ul>
  </div>
</div>
"""

FOOT = """<footer class="mai-footer">
  <div class="mai-footer-inner">
    <div>
      <div class="mai-footer-logo">M.A.I. Consulting</div>
      <div class="mai-footer-tag">Strategy &middot; AI &middot; Impact</div>
    </div>
    <div class="mai-footer-right">
      <div class="footer-nav"><a href="{up}services/">Services</a> <a href="{up}knowledge/">Knowledge</a> <a href="{up}about/">About</a> <a href="{up}privacy/">Privacy</a> <a href="{up}contact-us/">Contact</a></div>
      <div class="mai-footer-copy">mai4consulting.com &middot; &copy; 2026 M.A.I. Consulting</div>
    </div>
  </div>
</footer>
<script>
(function(){{
  var b=document.getElementById('mai-burger'), l=document.getElementById('mai-links');
  if(b&&l){{b.addEventListener('click',function(){{var o=l.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false');}});}}
}})();
</script>
<script src="{up}assets/chat.js" defer></script>
</body>
</html>
"""


def article_page(a, by_slug, series_map):
    up = "../../"
    n, label, q = SVC[a["service"]]
    md = markdown.Markdown(extensions=["tables", "sane_lists"])
    body = md.convert(a["body"])
    canon = f"{SITE}/knowledge/{a['slug']}/"
    ld = {
        "@context": "https://schema.org", "@type": "Article", "headline": a["title"],
        "description": a["summary"], "datePublished": a["date"], "mainEntityOfPage": canon,
        "author": {"@type": "Person" if a["author"] != "M.A.I. Consulting" else "Organization", "name": a["author"]},
        "publisher": {"@type": "Organization", "name": "M.A.I. Consulting"},
    }
    extra = '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False) + "</script>\n"
    out = HEAD.format(title=e(a["title"]), desc=e(a["summary"]), canon=canon, ogtype="article", up=up, extra_head=extra)
    out += f"""<section class="hero hero-art"><div class="inner-narrow">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="{up}knowledge/">Knowledge</a> <span>/</span> <a href="{up}knowledge/#s-{a['service']}">{e(label)}</a></nav>
  <div class="art-meta"><span class="pill">{e(a['format'])}</span><span class="pill pill-line">{e(a['level'])}</span><span>{fmt_date(a['date'])}</span><span>{a['minutes']} min read</span></div>
  <h1>{e(a['title'])}</h1>
  <p class="hero-sub">{e(a['summary'])}</p>
  <p class="byline">By {e(a['author'])}</p>
</div></section>
<section class="band"><div class="inner-narrow prose">
{body}
</div></section>
"""
    # series navigation
    s = a["series"]
    if s and s in series_map:
        items = series_map[s]["items"]
        i = [x["id"] for x in items].index(a["id"])
        prev = items[i - 1] if i > 0 else None
        nxt = items[i + 1] if i < len(items) - 1 else None
        out += f'<section class="band band-alt"><div class="inner-narrow"><div class="kicker">Series &middot; {e(series_map[s]["title"])} &middot; part {i+1} of {len(items)}</div><div class="series-nav">'
        out += (f'<a href="{up}knowledge/{prev["slug"]}/"><small>Previous</small>{e(prev["title"])}</a>' if prev else "<span></span>")
        out += (f'<a href="{up}knowledge/{nxt["slug"]}/" class="r"><small>Next</small>{e(nxt["title"])}</a>' if nxt else "<span></span>")
        out += "</div></div></section>\n"
    rel = [by_slug[r] for r in a["related"] if r in by_slug][:3]
    if rel:
        out += '<section class="band"><div class="inner"><div class="kicker">Keep reading</div><div class="grid-3">'
        for r in rel:
            out += card(r, up)
        out += "</div></div></section>\n"
    li = (f'<a class="btn btn-ghost" href="{e(a["linkedin_url"])}" target="_blank" rel="noopener">Read the LinkedIn original</a>'
          if a["linkedin_url"] else
          '<a class="btn btn-ghost" href="https://www.linkedin.com/company/94284867/" target="_blank" rel="noopener">Follow on LinkedIn</a>')
    out += f"""<section class="band band-dark" style="text-align:center"><div class="inner">
  <div class="kicker">{e(n + ' · ' if n else '')}{e(label)}</div>
  <h2 style="margin:0 auto 1rem">{e(q)}</h2>
  <p class="lede" style="margin:0 auto 2rem">If this is the question on your desk, a thirty-minute call tells you whether the service fits, or that you do not need us yet.</p>
  <div class="btn-row" style="justify-content:center"><a class="btn btn-gold" href="{up}{SERVICE_PAGE[a['service']]}">See the service</a><a class="btn btn-ghost" href="{up}contact-us/">Book a call</a>{li}</div>
</div></section>
"""
    out += FOOT.format(up=up)
    return out


def card(a, up="", cls="art"):
    n, label, _ = SVC[a["service"]]
    return (f'<a class="{cls}" href="{up}knowledge/{a["slug"]}/"><span class="m">{e(a["format"])} &middot; {fmt_date(a["date"])}</span>'
            f'<h4>{e(a["title"])}</h4><p>{e(a["summary"])}</p><span class="foot">{e(label)} &middot; {a["minutes"]} min</span></a>')


def row(a, up=""):
    n, label, _ = SVC[a["service"]]
    meta = f'{a["format"]} · {a["level"]} · {fmt_date(a["date"])} · {a["minutes"]} min read'
    return (f'<a class="row" href="{up}{a["slug"]}/" data-t="{e(a["title"])}" data-s="{e(a["summary"])}" data-m="{e(meta)}" '
            f'data-v="{e(label)}" data-li="{e(a["linkedin_url"])}"><span class="rt">{e(a["title"])}</span>'
            f'<span class="rm">{e(a["format"])} &middot; {a["minutes"]} min</span></a>')


def acc(title, sub, count, body, id_=""):
    ida = f' id="{id_}"' if id_ else ""
    return (f'<details class="acc"{ida}><summary>'
            f'<span class="acc-t">{title}</span><span class="acc-q">{sub}</span><span class="acc-n">{count}</span></summary>'
            f'<div class="acc-b">{body}</div></details>')


def hub_region(arts, series_map, today):
    latest = sorted(arts, key=lambda a: a["date"], reverse=True)
    feat = [a for a in arts if a["featured"]][:6]
    o = []
    o.append(f"""<section class="band" id="library">
  <div class="inner">
    <div class="kicker">The library &middot; {len(arts)} articles</div>
    <h2>Find the piece that answers your question.</h2>
    <p class="lede">Open a category, pick a title for a short summary, and go on to the full article only if it is what you need.</p>
    <div class="kb-tools">
      <input id="kb-q" type="search" placeholder="Search titles, summaries and topics" aria-label="Search the library"/>
      <div class="chips" id="kb-levels" role="group" aria-label="Filter by level">
        <button class="chip on" data-lvl="">Any level</button><button class="chip" data-lvl="Entry">Entry</button><button class="chip" data-lvl="Practitioner">Practitioner</button><button class="chip" data-lvl="Advanced">Advanced</button>
      </div>
      <p id="kb-count" class="muted-s" aria-live="polite"></p>
    </div>
    <div id="kb-results" class="rows" hidden></div>
    <div id="kb-default">""")
    if feat:
        o.append('<div class="kicker sub-k">Start here</div><div class="rows rows-feat">' + "".join(row(a) for a in feat) + "</div>")
    o.append('<div class="kicker sub-k">Browse by service</div><div class="accs">')
    for k, nn, l, q in SERVICES:
        items = sorted([a for a in arts if a["service"] == k], key=lambda a: a["date"], reverse=True)
        body = ""
        if k in REFERENCE:
            body += '<div class="kicker ref-k">Reference &amp; tools</div><div class="grid-3 ref-grid">' + REFERENCE[k] + "</div>"
        if items:
            groups = {}
            for a in items:
                groups.setdefault(a["series"] or "", []).append(a)
            order = sorted(groups.items(), key=lambda kv: (kv[0] == "", kv[0]))
            for s, lst in order:
                title = series_map[s]["title"] if s in series_map else "More in this service"
                if s in series_map:
                    lst = sorted(lst, key=lambda x: (x.get("series_order", 0), x["date"]))
                body += f'<div class="grp-t">{e(title)}</div><div class="rows">' + "".join(row(a) for a in lst) + "</div>"
        else:
            body += '<p class="muted-s">Nothing published here yet. The writing follows the work.</p>'
        o.append(acc((f'<span class="n">{nn}</span>' if nn else "") + e(l), "&ldquo;" + e(q) + "&rdquo;",
                     f"{len(items)} article" + ("" if len(items) == 1 else "s"), body, "s-" + k))
    o.append("</div>")
    o.append('<div class="kicker sub-k">Reading paths</div><div class="accs">')
    for s, d in series_map.items():
        if len(d["items"]) < 2:
            continue
        lst = sorted(d["items"], key=lambda x: (x.get("series_order", 0), x["date"], x["id"]))
        o.append(acc(e(d["title"]), e(d["blurb"]), f"{len(lst)} parts", '<div class="rows">' + "".join(row(a) for a in lst) + "</div>"))
    o.append("</div>")
    o.append('<div class="kicker sub-k">Latest</div><div class="rows">' + "".join(row(a) for a in latest[:5]) + "</div>")
    o.append("</div></div></section>")
    o.append("""<dialog id="kb-pop" aria-labelledby="kb-pop-t"><div class="pop-in">
  <button class="pop-x" id="kb-pop-x" aria-label="Close">&times;</button>
  <div class="pop-m" id="kb-pop-v"></div><h3 id="kb-pop-t"></h3><div class="pop-d" id="kb-pop-m"></div>
  <p id="kb-pop-s"></p>
  <div class="pop-a"><a class="btn btn-gold" id="kb-pop-go" href="#">Read the full article</a><a class="btn btn-ghost" id="kb-pop-li" href="#" target="_blank" rel="noopener" hidden>LinkedIn original</a></div>
</div></dialog>""")
    return "\n".join(o)


REFERENCE = {
    "assessment": '<a class="art" href="../explore-your-ai-readiness/"><span class="m">Free tool &middot; 12 minutes</span><h4>AI Readiness Assessment</h4><p>Twenty-eight questions across the four competencies of AI fluency, scored on the spot.</p></a>'
                  '<a class="art" href="../extensive-ai-readiness-analysis/"><span class="m">Instrument &middot; 60 questions</span><h4>Extended AI Readiness Assessment</h4><p>Ten dimensions covering fluency, governance and data protection.</p></a>'
                  '<a class="art" href="../compare/"><span class="m">Analysis &middot; market</span><h4>Compare the market</h4><p>Every alternative with published list prices, sources and the arithmetic.</p></a>',
    "policy": '<a class="art" href="../eu-ai-act-article-4/"><span class="m">Briefing &middot; regulation</span><h4>EU AI Act Article 4</h4><p>The AI literacy obligation: who is in scope and what it asks of you.</p></a>'
              '<a class="art" href="../claude-in-chrome/"><span class="m">Reference &middot; risk</span><h4>Claude in Chrome: impact, trade-offs and warnings</h4><p>What a browser agent does on your behalf, and what to check first.</p></a>',
    "training": '<a class="art" href="../playbook/"><span class="m">Sample deliverable</span><h4>A team playbook</h4><p>The working playbook a department receives.</p></a>'
                '<a class="art" href="../use-cases/"><span class="m">Reference &middot; practice</span><h4>AI use cases in practice</h4><p>What Claude and Copilot do across writing, research, analysis and automation.</p></a>'
                '<a class="art" href="../save-claude-tokens/"><span class="m">Reference &middot; tooling</span><h4>Claude for business</h4><p>Instruction files, skills, and how to cut token spend.</p></a>',
}


def write_hub(arts, series_map, today):
    p = ROOT / "knowledge" / "index.html"
    t = p.read_text(encoding="utf-8")
    region = hub_region(arts, series_map, today)
    a, b = "<!-- BUILD:START -->", "<!-- BUILD:END -->"
    if a not in t:
        sys.exit("knowledge/index.html has no BUILD markers; run the one-off hub template migration first")
    pre, rest = t.split(a, 1)
    _, post = rest.split(b, 1)
    p.write_text(pre + a + "\n" + region + "\n" + b + post, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--today", default=datetime.date.today().isoformat())
    args = ap.parse_args()
    all_arts = load()
    arts = [a for a in all_arts if a["date"] <= args.today]
    held = len(all_arts) - len(arts)
    by_slug = {a["id"]: a for a in arts}
    for a in arts:
        bad = [r for r in a["related"] if r not in by_slug]
        if bad:
            print(f"warn: {a['id']} related slugs not published: {bad}")
    # series
    meta = {}
    sp = CONTENT / "_series.yml"
    if sp.exists():
        meta = yaml.safe_load(sp.read_text(encoding="utf-8")) or {}
    series_map = {}
    for a in sorted(arts, key=lambda x: (x.get("series_order", 0), x["date"], x["id"])):
        s = a["series"]
        if s:
            d = series_map.setdefault(s, {"title": meta.get(s, {}).get("title", s), "blurb": meta.get(s, {}).get("blurb", ""), "items": []})
            d["items"].append(a)
    # article pages
    kdir = ROOT / "knowledge"
    for a in arts:
        d = kdir / a["slug"]
        d.mkdir(exist_ok=True)
        (d / "index.html").write_text(article_page(a, by_slug, series_map), encoding="utf-8")
    # remove pages of slugs no longer in content
    live_urls = {a["slug"] for a in all_arts}
    for d in kdir.iterdir():
        if d.is_dir() and d.name != "content" and (d / "index.html").exists() and d.name not in live_urls and (d / ".generated").exists():
            for f in d.iterdir():
                f.unlink()
            d.rmdir()
    for a in arts:
        (kdir / a["slug"] / ".generated").write_text("", encoding="utf-8")
    # articles.json
    idx = {
        "_comment": "Index of Knowledge articles, generated by tools/build_knowledge.py from knowledge/content/*.md. Do not hand-edit.",
        "source": "https://www.linkedin.com/company/94284867/",
        "updated": args.today,
        "articles": [
            {"slug": a["slug"], "title": a["title"], "summary": a["summary"], "section": a["service"], "format": a["format"],
             "level": a["level"], "date": a["date"], "minutes": a["minutes"], "series": a["series"], "series_order": a.get("series_order", 0), "tags": a["tags"],
             "featured": bool(a["featured"]), "author": a["author"], "url": f"/knowledge/{a['slug']}/", "linkedin_url": a["linkedin_url"]}
            for a in sorted(arts, key=lambda x: x["date"], reverse=True)
        ],
    }
    (kdir / "articles.json").write_text(json.dumps(idx, ensure_ascii=False, indent=1), encoding="utf-8")
    write_hub(arts, series_map, args.today)
    # sitemap
    sm = ROOT / "sitemap.xml"
    t = sm.read_text(encoding="utf-8")
    t = re.sub(r"\s*<!-- KNOWLEDGE:START -->.*?<!-- KNOWLEDGE:END -->", "", t, flags=re.S)
    block = "\n  <!-- KNOWLEDGE:START -->\n" + "\n".join(
        f"  <url><loc>{SITE}/knowledge/{a['slug']}/</loc><lastmod>{a['date']}</lastmod><priority>0.6</priority></url>" for a in sorted(arts, key=lambda x: x["slug"])
    ) + "\n  <!-- KNOWLEDGE:END -->\n"
    t = t.replace("</urlset>", block + "</urlset>")
    sm.write_text(t, encoding="utf-8")
    print(f"built {len(arts)} articles ({held} held back as future-dated), {len(series_map)} series")


if __name__ == "__main__":
    main()
