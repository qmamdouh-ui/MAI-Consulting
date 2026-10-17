# Site operations: what needs the owner

Items from the October 2026 audit that code alone cannot finish.

## 1. Switch on analytics (parked, 14 October 2026)

`assets/analytics.js` is loaded by `assets/chat.js` on every content page and does nothing until a site code is set.

1. Create a free site at goatcounter.com. Cookieless, no personal profile, honours Do Not Track.
2. Put the code (the part before `.goatcounter.com`) in `CODE` in `assets/analytics.js`.
3. Add this sentence to `privacy/index.html`, in the section on data collected: *"We count page views with GoatCounter, which sets no cookies and stores no personal profile."*
4. Check the counter after a day. Until then the site cannot show which page, article or estimator run produces an enquiry.

## 2. Booking (done, 14 October 2026)

Three Google Calendar appointment schedules on the `q.mamdouh@mai4consulting.com` calendar: **Quick intro call (15 min)**, **Discovery call (30 min)** and **Working session (1 hour)**. Monday to Friday, 12:00 to 20:00 Geneva time, Google Meet, email verification on, one required question ("Organisation and what you would like to discuss"). The public links live on `book/index.html`; every "Book ..." button on the site points to that page. To change hours, buffers or the form, edit the schedule in Google Calendar (Booking pages in the left sidebar). The link targets in `book/index.html` stay valid after edits.

## 3. Proof

The site names two clients, one of them a related party. Nothing here can be written for you. The fastest fix is one or two pilot engagements in exchange for a named case study with timed before-and-after hours on three proposals. Add it to `our-clients/` and the home page when it exists.

## 4. Pricing model: not published (owner decision, 17 October 2026)

**The rule.** The public site publishes no prices for the practice's own work: no day rate, no package, course, funder or support prices, no currency figures, no bundle discounts and no at-cost notes. Where a price used to appear, the site says "Priced per engagement. You receive a written quote after a free scoping call." and links to `/book/` where it fits. Delivery days, durations and scope descriptions stay published; days are never paired with a rate or a currency. Rates and quote figures are kept outside this public repository. Scope changes above 20% are re-quoted; payment terms are set out in the written quote.

**Estimator (`estimate/index.html`, script at the foot of the page).** A scope estimator, not a price calculator. The result panel shows the estimated delivery days, then a "Where the days come from" breakdown (one line per component, the overlap line, delivery days rounded to the half day), then "What is included", then the quote call to action linking to `/book/`. The estimate sent by email (EmailJS) carries the selections, the days and the breakdown only. Constants:

- `_min=3` minimum delivery days.
- Size scaling `_os` {s1 .85, s2 1, s3 1.25, s4 1.5, s5 1.75} applied to the training programme, task preparation and configuration items; department-size scaling `_ds` {s .85, m 1, l 1.25} for labs and configuration. Sizes above 200 staff (s4, s5) are estimated too, with a note that one site is assumed.
- Assessment days `_a1` (four dimensions) {1.5, 2.5, 3.5, 4.5, 6} and `_a2` (ten dimensions) {2.5, 4, 6, 8, 10} by size s1–s5.
- Umbrella policy days `_p` {3, 5, 6.5, 8, 10}; annexes `_ann`: 1.5 for the first, 1 for each further; default annex count `_dn` {1, 3, 5, 6, 8}.
- Training ladder `_lvD` {3:3, 4:5, 5:6.5, 6:8, 7:10} cumulative delivery days from level 1 or 2 (see `docs/LEVELS.md`); starting credit `_lvCr` for groups already at level 3+; lab scaling by target level `_lvF`; labs `_labs`: first lab 1.0, second 0.9, further 0.8 × department size × level factor.
- Configuration `_ag=3`, `_sk=1.5`, `_tl=2` days per agent, skill and tool; train-the-trainer `_ttt=2`; Fluency Support 1 or 2 delivery days a month for 3–12 months, plus the six-month re-score `_rs=2` once when the retainer runs six months or more.
- Discovery and scoping: 1 day, always. Re-score and handover: 1 day whenever assessment, training or policy is chosen.
- Overlap lines, the only reductions in days: training and policy together −10% of the days; configuration with training −5% (shared preparation and sessions). Both are shown as a line in the breakdown, applied before support days are added.
- Presets: `?preset=assessment|policy|training|agents|support|foundation|adoption|institution|course`, plus `&size=s1..s5`. Adoption ticks four department labs; Institution sets 200–500 staff, ten dimensions, level 5, three labs, umbrella policy with six annexes, train-the-trainer and twelve months of support at one day a month.

**Day counts the pages quote (all derived from the script; re-derive with the same constants if any change).** Assessment, four dimensions: 3.5 / 4.5 / 5.5 days for under 10 / 10–50 / 50–200 staff; ten dimensions: 4.5 / 6 / 8 / 10 days up to 200–500. Umbrella policy: 5 / 7 / 8.5 / 10 days. Training to level 3, 10–50 staff: 5 days; with three labs 7.5 days; to level 4: 7 days. One agent + one skill + one tool, 10–50 staff: 7.5 days. Support: 1 or 2 days a month; six months at one day a month with re-score and handover day 9 days; twelve months 15 days. Packages: Foundation 7.5 days for 10–50 staff (6 days under 10); Adoption 22.5 days for 50–200 (26.5 days for 200–500); Institution from 50 days for 200–500 staff with twelve months of support.

**Course for individuals and representatives (fewer than ten).** Counted per group, not per person: `_lvD[level]` delivery days for the group. Three days to level 3; higher target levels add the ladder days. Online runs as half-days on the participants' platform; in person, the venue, hotel, hospitality and coordination are arranged by the practice and covered in the written quote. The estimator collects the number of participants and hotel nights for that quote.

**Funder page (`for-funders/index.html`).** Portfolio Baseline (up to 15 grantees): from 13 delivery days. Portfolio Programme (up to 12 grantees): from 50 delivery days. Grantee Drawdown Fund: a pre-funded block from 25 delivery days, drawn down over twelve months. Cohort-versus-individual comparison: a small NGO under 10 staff buying assessment, general training and general policy on its own is 8 delivery days in the estimator; twelve of those are 96 days against 50 for the Programme, so "almost twice the days". The page is addressed to funders and foundations (donors, development agencies, incubators, accelerators), not investors.

**Compare page.** Alternatives keep their published list prices and sources. The M.A.I. entries show delivery days and "quoted per engagement" only; the 150-staff scenario (ten dimensions, training with three labs, umbrella policy with three annexes) is about 22 delivery days. Figures that had no source were removed (boutique advisory year-one range, grant-writer salary and per-proposal fees); the governance-consultancy range is kept but labelled a vendor blog estimate.

**Standards.** ISO/IEC 42001, NIST AI RMF and Article 4 appear only as the optional standards mapping inside the extended readiness assessment. The Institution package no longer lists a governance gap plan or an Article 4 evidence file; "What this practice does not do" names ISO/IEC 42001 or other certification preparation, compliance and legal advice.

**Site assistant (`assets/chat.js`).** The price, terms, who-for, private-sector, funders, packages, small-groups and training answers say in EN/FR/AR that pricing is set per engagement and shared in a written quote after a free scoping call; the price and small-groups answers link to the booking page, and the `noPrice` line points to the estimator for the days and to the booking page for the quote. The `noFig` helper is unchanged.

**Not testable from a desk:** how buyers respond to a quoted rather than a published price. The test is to record the response to the next five quotes.

## 5. Article 4 is dated content

Article 4 of the EU AI Act was replaced by Regulation (EU) 2026/1744 (Official Journal, 24 July 2026). The briefing at `eu-ai-act-article-4/`, the funder page, the chat answer (`id:"article4"`) and two Knowledge entries were corrected on 14 October 2026. The LinkedIn post and article of 8 September that said the opposite ("No, the Digital Omnibus did not delay your AI literacy obligation") was deleted from the Page on 14 October 2026 and marked deleted in `mai-kb/linkedin/linkedin-publication-log.csv`. The Knowledge entry with the same slug now carries the corrected analysis and a dated correction note. The other two posts of 8 September were left up.
