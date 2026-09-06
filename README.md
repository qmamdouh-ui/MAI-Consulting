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
| `/services/` | The offer page: five services and three ready-made scopes. Each service page carries a from-price; the estimator prices a full scope |
| `/about/` | Who delivers the work: background, credentials, standards |
| `/cheatsheet/` | Redirects to `/playbook/`. Kept so inbound links keep working |
| `/playbook/` | Sample of the deliverable each department receives |
| `/terms/` | Entity and tax details, payment terms, cancellation and postponement, scope changes, supplier onboarding. Linked from every price and every form |
| `/estimate/` | Price estimator: type, size, scope → indicative range; 200+ staff routed to a call; selections emailed to the owner **and to the visitor**. On narrow screens a fixed bar carries the live range so the number is not stranded below an eight-step form. Step numbers are rendered from the visible steps, so hiding the organisation steps for an individual gives 1, 2, 3 |
| `/for-funders/` | Portfolio programmes for foundations and donors, a second buyer rather than a second sector |
| `/compare/` | Market and competitor comparison with published prices, sources, and the value case |
| `/knowledge/` | Published work filed by service and package, with slots for LinkedIn articles |
| `/resources/` | Redirects to `/knowledge/` |
| `/eu-ai-act-article-4/` | Briefing on the AI literacy obligation, the main commercial hook |
| `/explore-your-ai-readiness/` | **AI Readiness Check**: free, 28 questions, 4D framework, about 12 minutes |
| `/extensive-ai-readiness-analysis/` | **AI Readiness Self-Assessment**: free, 60 questions, 10 dimensions, about 30 minutes. The URL slug is legacy; the name is not |
| `/our-clients/` | Who it is for: four buyer roles, packages table, how engagements run |
| `/use-cases/`, `/claude-in-chrome/`, `/save-claude-tokens/` | Reference articles |
| `/privacy/` | Privacy policy, on its own URL so it can be linked from proposals |
| `/what-we-do/` | Redirects to `/services/`. Kept so inbound links keep working |
| `assets/site.css` | Shared design system: tokens, global nav, footer, components, skip link, focus styles |
| `assets/analytics.js` | Cookieless event layer. **Inert until configured** — see below |
| `assets/chat.js` | Assistant launcher only, about 2 KB |
| `assets/chat-kb.js` | Assistant knowledge base, about 170 KB, fetched on first click |
| `assets/og/*.png` | One 1200×630 social card per page |
| `robots.txt`, `sitemap.xml` | Crawler directives |

## Design system

`assets/site.css` is the single source of truth for colours, type and components:
light `#f6f8fc` ground, navy `#001830`/`#003E8A`, gold `#C9A84C`, Playfair Display
headings, Inter body. Pages built on it link the stylesheet. The two assessments and
the three reference articles keep their own inline CSS but carry the same global
navigation via a self-contained `.mai-topbar` block, so no page styles collide.

**Two golds, and they are not interchangeable.** `--gold` (`#C9A84C`) measures
2.29:1 on white, which fails WCAG at any size. Use it on dark grounds, where it
reaches 7.83:1, and as a fill behind dark text. For gold-coloured *text on a light
ground* use `--gold-ink` (`#8A6D1F`), which reaches 4.90:1 on white and 4.61:1 on
`--off`. The service numbers, the ROI figures and the package audience labels all
use `--gold-ink` for this reason.

**Navigation.** Six items and a CTA, identical on every page:
Services · Pricing · Who It's For · About · Knowledge · Free Check · **Book a call**.
Compare and For Funders are reachable from the home page, Services and the footer;
they are deliberately not in the top bar.

**Three CTA labels, used verbatim everywhere.** `Book a call`,
`Price your engagement`, `Take the free check (12 min)`. Vary the sentence around a
button, never the button. Where several buttons lead to different presets of the
same tool the verb stays and the object changes: `Price Foundation`, `Price Adoption`.

**Internal links never open a new tab.** `target="_blank"` is for outbound
citations only.

**`source-content/` is served too.** With `.nojekyll` set and the site published
from the repository root, GitHub Pages serves every file in the repo, including
`source-content/`. It is reachable at `mai4consulting.com/source-content/`.
`robots.txt` disallows it from crawlers, but that is a request, not access
control. **This repository is public**, so do not commit anything here that should
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

Note that the Word documents contain the site's HTML *pasted in as text*; the
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
the readable content (headings, paragraphs, and lists) with all Word styling
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
copy-paste `<a class="art">` template: fill it in, place it directly above
the dashed `.slot` block in that section, newest first. No other file changes.

## Competitor pricing on `/compare/`

Every price is a published list price with a linked source, dated September
2026. Re-check them before quoting the page in a proposal; providers change
prices and the page states the date it was checked.

## The site assistant (`assets/chat.js` + `assets/chat-kb.js`)

**The file was split.** `chat.js` is a ~2 KB launcher that draws the button and
nothing else. `chat-kb.js` holds the ~170 KB knowledge base and is fetched on the
first click, then builds and opens itself. Most visitors never open the assistant
and no longer download it. **Answers live in `chat-kb.js`; the launcher holds none.**

A retrieval-only assistant on every content page, in English, French and Arabic (auto-detected per message, with a manual switch; Arabic renders right-to-left). It calls no language model:
every answer is a knowledge-base entry written from copy on this site, so it
cannot invent. If a question does not clear the confidence bar it says so and
offers two options: send the question to the team (EmailJS, same account and
template as the contact form) or open the contact form. Greetings, "who are you",
"can you speak Arabic" and similar are answered naturally; only questions *about
the practice* that the site does not cover trigger the hand-off. Off-topic
questions get a friendly redirect, not a hand-off.

**Teaching it a new answer.** Open `assets/chat-kb.js`, find `var KB=[`, and add
an entry:

```js
{id:"short-id", yes:true, rel:["related-id"],
 k:{"specific phrase":6,"single word":3},          // English keywords → weight
 kf:{"expression precise":6},                      // French (accents optional)
 ka:{"عبارة محددة":6},                              // Arabic
 a:{en:"Answer from the site.", fr:"Réponse.", ar:"الجواب."},
 l:"page/", t:{en:"Link label",fr:"Libellé",ar:"التسمية"}},
```

Weights: a question must hit at least one keyword weighted 4 or more, total at
least 5, and beat the runner-up. Put the distinctive phrases at 5–7 and generic
words at 2–3. Test in the browser console with
`__maiChat.answer("your question")`; it returns the entry or `null`;
`__maiChat.detect("…")` shows the detected language.

**Off-topic guard.** `OFFTOPIC` in the same file lists terms that force a
refusal unless a strong specific match exists. Add to it when a leak shows up.

Note what is *not* in it any more. It used to refuse `founder`, `owner`, `ceo`,
`vat number`, `company number`, `registration number`, `cancel`, `refund` and
`guarantee` — every one of them a question a real buyer asks before signing. Those
now reach the `who-runs-it`, `procurement` and `cancellation` entries. Do not put
them back: if the site has no answer to a question, write the answer, do not gag
the assistant.


## Analytics (`assets/analytics.js`)

Cookieless by design: no cookies, no localStorage, no fingerprint, no personal data,
and therefore no consent banner. It is **inert until configured** — `mai.track()` is
safe to call from anywhere and returns silently while `PROVIDER` and `SITE` are empty.

**To switch it on**, set two constants at the top of the file:

```js
var PROVIDER = "plausible";          // or "umami" or "goatcounter"
var SITE     = "mai4consulting.com"; // the site id / domain / code for that provider
```

Seven events are already wired where they happen, so nothing else needs touching:

| Event | Fires when |
| --- | --- |
| `estimator_opened` | the price page loads |
| `estimate_shown` | a numeric range is rendered for a real scope |
| `estimate_sent` | the scope is emailed |
| `assessment_started` | the first question is answered |
| `assessment_completed` | every question is answered |
| `report_downloaded` | the PDF is generated |
| `contact_submitted` | the contact form is sent |

Event properties carry shapes (`ngo`, `s3`, `extended`), never anything a visitor typed.

## Booking (`/contact-us/`)

The contact page has a scheduler slot above the form. It is empty:

```js
var SCHEDULER_URL = '';   // e.g. 'https://cal.com/your-handle/30min'
```

Set it to any embeddable booking link and the calendar replaces the message-first
panel automatically. **Leave it empty and the page says so** rather than promising a
booking it cannot take — that wording is deliberate, not a placeholder to delete.

## Accessibility commitments in the code

Undo any of these and the site stops being usable for part of its audience:

- The assessment rating scales are `role="radiogroup"` with real `<button>` elements,
  arrow-key navigation and `aria-checked`. They used to be `<div onclick>`, which made
  43% of the short check and 27% of the long one unanswerable from a keyboard.
- Dimension accordions are `<button aria-expanded>`, not clickable divs.
- Every form control has a programmatic label.
- Every page has a skip link and a `<main id="main">`.
- The estimator announces its range through a small scoped live region, not by
  re-announcing the whole result panel on every keystroke.

## Assessment progress is saved locally

Both assessments write answers to `localStorage` (`mai-check-v1`, `mai-extended-v1`)
on every change, restore on load, and expire after 30 days. Nothing is sent anywhere
by this. Sixty questions is half an hour of work and a reload used to discard all of it.

## Prices shown on the site

The estimator's scope model is client-side and readable in page source, so the day
rate and the sector multipliers are public whether or not we intend them to be. They
are therefore **stated openly** on `/estimate/` and `/terms/`: government and public
rate 1.0, NGO 0.7×, international organisation 0.9×, private 1.2×. If that should
ever stop being public, the calculation has to move server-side — a static host
cannot hide it, and a comment saying it is hidden does not make it so.

The from-prices on the service pages come from the estimator's own floor for a small
NGO. **If the rate card changes, change them too**, or the pages disagree with the tool.
