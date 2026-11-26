# Ina, the website assistant

Ina talks with visitors on mai4consulting.com, works out what they need, suggests which of the five services could fit and invites them to a free call. She never quotes a price and never gives a definitive verdict on a service. Every conversation is logged to GitHub, where Hana reviews it and the community agents' test conversations sit beside it.

## Where she lives

| Repo | What it holds |
|---|---|
| MAI-Consulting (public, this one) | Her definition and the service: `ina/prompt.md`, `ina/knowledge.md`, `ina/worker/`, `.claude/agents/site-intake.md`, the page widget `assets/chat.js`, and `.github/workflows/deploy-ina.yml`, which tests and deploys the service on every push that touches them. |
| MAI-Consulting-Employees (private) | Her place on the team: `roster.yaml` entry, `coaching/site-intake.md`, and her conversation logs in `agent-logs/site-intake/<date>.jsonl`, written there by the service every 10 minutes. The logs stay in the private repo because they hold what visitors typed. |
| LinkedIn-Strategy | The test harness the community agents use: `scripts/ina_test.py`, and each day's results in `state/mai-page/ina-tests/`. |

## How it flows

1. A visitor writes in the widget; `assets/chat.js` sends the conversation to the service (`ina/worker`).
2. The service adds `prompt.md` and `knowledge.md`, calls the model, strips the machine-readable trailer, returns the reply and keeps the transcript in its store.
3. Every 10 minutes the service copies the day's transcripts to GitHub (Employees repo). Hana's collector and the building page read them like any other agent's log.
4. Each morning the community agent (`mai-page-engagement`) holds two or three test conversations with her, based on what it met on LinkedIn the day before. They are logged with `source: "test"`.
5. At 22:30 Hana reads the day's real and test conversations, writes concrete prompt or knowledge changes into `coaching/site-intake.md`, and the owner applies them. A push to this repo redeploys Ina.

If the service is unreachable or a limit is reached, the widget falls back to the rule-based assistant in `assets/chat.js`; the visitor is never left without an answer.

## Go live (owner, once): the short way

1. `npx wrangler login` (browser; a free Cloudflare account is enough).
2. Create an Anthropic API key for Ina only, with a monthly spend limit in the console.
3. In your own PowerShell window (not with `!`): `cd C:\Users\qmamd\MAI-Consulting\ina` then `.\deploy.ps1`. It tests, creates the store, sets the secrets (it asks you to paste the key, hidden), deploys, writes the URL into `assets/chat.js` and `Employees\hr\settings.json`, sets the tokens in your user environment, and runs one smoke conversation.
4. Commit and push the public repo (`ina/`, `assets/chat.js`, `.claude/agents/site-intake.md`, `.github/`, `.gitignore`, and `privacy/index.html` with the paragraph from `privacy-paragraph.md`) in one commit.

With this route the hourly sync pulls her logs from the service and pushes them to GitHub. For a push every 10 minutes straight from the service instead, set the `GITHUB_TOKEN` secret (fine-grained, Contents read and write on the Employees repo only) and `"ina_worker_pushes": true` in `Employees\hr\settings.json`. The long form of each step follows.

## Go live, step by step

1. Cloudflare account (the free plan is enough), `npm i -g wrangler`, `wrangler login`.
2. In `ina/worker/`: `wrangler kv namespace create INA_KV`, and paste the id into `wrangler.toml`.
3. Secrets, each with `wrangler secret put <NAME>` (never in a file):
   - `ANTHROPIC_API_KEY`: a key created for Ina only, with a monthly spend limit in the Anthropic console.
   - `GITHUB_TOKEN`: a fine-grained token with Contents read and write on the Employees repo only.
   - `LOG_TOKEN` and `TEST_TOKEN`: two long random strings.
4. `node gen-knowledge.mjs && node build.mjs && node test.mjs` (19 checks must pass), then `wrangler deploy`. Note the Worker URL.
5. In the public repo add two Actions secrets, `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, so later pushes deploy themselves.
6. Set the Worker URL in `INA_ENDPOINT_DEFAULT` in `assets/chat.js`, and replace the "Site assistant (Ina)" paragraph of `privacy/index.html` with `privacy-paragraph.md`. Push both in one commit so the page never claims one thing and does another.
7. On the PC: set the user environment variable `INA_TEST_URL` to the Worker URL and `INA_TEST_TOKEN` to the `TEST_TOKEN` value, so the community agent's runs can reach her.
8. Try three conversations on the live site (a price question, an attempt to make her ignore her rules, a normal enquiry ending with an email) and check the transcript reaches GitHub within 10 minutes and the email reaches the team.

## Limits that protect the cost

30 messages per visitor per hour, 40 per conversation and 600 per day across the site; 40 per hour for each testing agent (`wrangler.toml`). Visitors are counted by a short hash of their address, which is not stored.

## Changing her

- Voice and rules: edit `prompt.md`. Facts: edit the `KB` in `assets/chat.js`. Push; the workflow regenerates `knowledge.md`, tests and deploys.
- Hana proposes changes with the conversation that shows the need; the owner decides. Nothing in the prompt changes without that decision.
