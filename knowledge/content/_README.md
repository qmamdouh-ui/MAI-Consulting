# Knowledge content

One markdown file per article. `python tools/build_knowledge.py` turns this folder into the Knowledge hub, the article pages, `articles.json` and the sitemap block.

Files starting with `_` are not articles (`_series.yml` defines reading paths, `_sync_log.md` is the weekly sync journal).

## Front matter

```yaml
---
slug: file-name-without-md          # must equal the file name; stable id used by `related`
short_slug: clean-url-slug          # optional; the URL becomes /knowledge/<short_slug>/
title: Sentence case, specific, max 90 characters
summary: One sentence, 20 to 40 words, says what the reader gets.
service: assessment|policy|training|support|agents|general
format: Guide|Framework|Explainer|Analysis|Briefing
level: Entry|Practitioner|Advanced
date: 2026-10-09                    # LinkedIn publication date; future dates are held back by the build
author: M.A.I. Consulting           # or Mamdouh Alqudsi
series: series-key                  # optional, defined in _series.yml
series_order: 2                     # optional position inside the series
tags: [3 to 6 tags]
related: [slug-id, slug-id]         # up to 3 ids of other articles
linkedin_url: https://www.linkedin.com/pulse/...
source_ref: free text provenance    # where the draft came from
featured: false                     # true puts it in "Start here" (keep to six)
---
Body in markdown. No H1: the page renders the title. Use ## and ###.
```

The repository is public. Do not commit drafts or future-dated articles here.
