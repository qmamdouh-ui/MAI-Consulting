# MAI Consulting

Website repository for M.A.I. Consulting.

## Repository layout

| Path | Purpose |
| --- | --- |
| *(repo root)* | The published site. Deployable files (HTML, CSS, JS, assets) live here. |
| `source-content/` | Content backup only. Not part of the published site. |
| `source-content/text/` | Plain-text Markdown extraction of each backup page. |

## The published site

The published site lives in the **repository root**, served by GitHub Pages at
`mai4consulting.com`. Anything served to visitors belongs here.

| Path | Purpose |
| --- | --- |
| `/` | Home |
| `/services/` | The offer page — four services, three packages, published starting prices |
| `/about/` | Who delivers the work: background, credentials, standards |
| `/cheatsheet/` | Sample of the one-page deliverable each department receives |
| `/for-funders/` | Portfolio programmes for foundations and donors — a second buyer, not a second sector |
| `/compare/` | Market and competitor comparison with published prices, sources, and the value case |
| `/knowledge/` | Published work filed by service and package, with slots for LinkedIn articles |
| `/resources/` | Redirects to `/knowledge/` |
| `/eu-ai-act-article-4/` | Briefing on the AI literacy obligation — the main commercial hook |
| `/explore-your-ai-readiness/` | Free 28-question assessment (4D framework) |
| `/extensive-ai-readiness-analysis/` | 60-question, 10-dimension assessment |
| `/our-clients/` | Who we work with, packages table, how engagements run |
| `/use-cases/`, `/claude-in-chrome/`, `/save-claude-tokens/` | Reference articles |
| `/privacy/` | Privacy policy, on its own URL so it can be linked from proposals |
| `/what-we-do/` | Redirects to `/services/`. Kept so inbound links keep working |
| `assets/site.css` | Shared design system — tokens, global nav, footer, components |
| `robots.txt`, `sitemap.xml` | Crawler directives |

## Design system

`assets/site.css` is the single source of truth for colours, type and components:
light `#f6f8fc` ground, navy `#001830`/`#003E8A`, gold `#C9A84C`, Playfair Display
headings, Inter body. Pages built on it link the stylesheet. The older article and
assessment pages keep their own inline CSS but carry the same global navigation via
a self-contained `.mai-topbar` block, so no page styles collide.

**`source-content/` is served too.** With `.nojekyll` set and the site published
from the repository root, GitHub Pages serves every file in the repo, including
`source-content/`. It is reachable at `mai4consulting.com/source-content/`.
`robots.txt` disallows it from crawlers, but that is a request, not access
control. **This repository is public** — do not commit anything here that should
not be world-readable.

## `source-content/`

`source-content/` holds eight pages exported from Microsoft Word, each as a
`.htm` file plus its companion `_fichiers` folder of Word support files
(`filelist.xml`, stylesheets, images).

**These are content backups, not the real website source.** They are Word's own
export format: the markup is dominated by `mso-` styling, conditional comments,
and `<o:p>` tags that Word emits, and it should never be edited, deployed, or
treated as the site's HTML. They exist so the page copy is preserved and
recoverable independently of the live site.

Note that the Word documents contain the site's HTML *pasted in as text* — the
person who made the backup copied the page source into Word rather than saving
the rendered page. That is why the exports are large relative to how much prose
they hold.

Backed-up pages:

- Contact Us
- Explore Your AI Readiness
- Extensive AI Readiness Assessment
- Home Page
- Our Clients
- Save Claude Tokens
- Use Cases
- What do we do

## `source-content/text/`

Each `.htm` backup has a matching Markdown file in `source-content/text/`,
named in lowercase with hyphens (`Home Page.htm` → `home-page.md`). These hold
the readable content — headings, paragraphs, and lists — with all Word styling
and markup stripped out. Each file records the backup it came from.

Use these when you want to read or search the site copy. They are a derived,
read-only convenience: to change wording on the live site, edit the published
files in the repository root.

Two pages (`Explore Your AI Readiness` and `Extensive AI Readiness Assessment`)
are interactive assessment tools whose questions live in the page's JavaScript
rather than in static HTML. Their Markdown files reproduce those question banks
in a clearly labelled section so the backup is complete.

## Adding a LinkedIn article

`knowledge/index.html` has four service sections. Each carries a commented
copy-paste `<a class="art">` template — fill it in, place it directly above
the dashed `.slot` block in that section, newest first. No other file changes.

## Competitor pricing on `/compare/`

Every price is a published list price with a linked source, dated September
2026. Re-check them before quoting the page in a proposal; providers change
prices and the page states the date it was checked.

## The site assistant (`assets/chat.js`)

A retrieval-only assistant on every content page. It calls no language model:
every answer is a knowledge-base entry written from copy on this site, so it
cannot invent. If a question does not clear the confidence bar it says so and
offers two options — send the question to the team (EmailJS, same account and
template as the contact form) or open the contact form.

**Teaching it a new answer.** Open `assets/chat.js`, find `var KB = [`, and add
an entry:

```js
{id:"short-id",
 k:{"specific phrase":6,"another phrase":5,"single word":3},   // keyword → weight
 q:["an example question","another way to ask it"],
 a:"The answer, taken from copy that exists on the site.",
 l:"page/", t:"Link label"},
```

Weights: a question must hit at least one keyword weighted 4 or more, total at
least 5, and beat the runner-up. Put the distinctive phrases at 5–7 and generic
words at 2–3. Test in the browser console with
`__maiChat.answer("your question")` — it returns the entry or `null`.

**Off-topic guard.** `OFFTOPIC` in the same file lists terms that force a
refusal unless a strong specific match exists. Add to it when a leak shows up.
