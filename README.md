# MAI Consulting

Website repository for M.A.I. Consulting.

## Repository layout

| Path | Purpose |
| --- | --- |
| *(repo root)* | The published site. Deployable files (HTML, CSS, JS, assets) live here. |
| `source-content/` | Content backup only. Not part of the published site. |
| `source-content/text/` | Plain-text Markdown extraction of each backup page. |

## The published site

The published site lives in the **repository root**. Anything served to visitors
belongs here. `source-content/` is reference material and is never deployed.

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
