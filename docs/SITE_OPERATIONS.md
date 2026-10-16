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

The site names two clients, one of them a related party. Nothing here can be written for you. The fastest fix is one or two discounted pilots in exchange for a named case study with timed before-and-after hours on three proposals. Add it to `our-clients/` and the home page when it exists.

## 4. Pricing model: one rate, delivery days, transparent (owner decision, 16 October 2026)

**The rule.** Every delivery day is **EUR 800**, the same for every type of client: NGO, international organisation, government, private company. No sector multipliers, no sector discounts, no CHF anywhere on the site. Every price on the site is written as "N delivery days × EUR 800 = EUR X". Venue, hotel, hospitality and travel are never inside a price: they are itemised and invoiced at actual cost. The minimum engagement is three delivery days (EUR 2,400). Payment terms unchanged: 40% on signature, 60% on delivery; support retainers billed monthly in advance; scope changes above 20% re-quoted. The owner's justification (seven years of international experience across countries and topics, degrees from several countries) appears once, as one factual line, in the estimator's "How to read the number" section; it is not to be used as a boast elsewhere.

**Estimator (`estimate/index.html`, script at the foot of the page).** The result panel shows the total, then a "Where the days come from" breakdown (one line per component, the bundle line, delivery days rounded to the half day, days × EUR 800), then the included items, then the note "Scope is fixed in writing after the call; venue, hotel, hospitality and travel are invoiced at cost." Constants:

- `_r=800` day rate; `_min=3` minimum delivery days.
- Size scaling `_os` {s1 .85, s2 1, s3 1.25, s4 1.5, s5 1.75} applied to the training programme, task preparation and configuration items; department-size scaling `_ds` {s .85, m 1, l 1.25} for labs and configuration. Sizes above 200 staff (s4, s5) are now priced too, with a note that one site is assumed; "scoped on a call" no longer appears.
- Assessment days `_a1` (four dimensions) {1.5, 2.5, 3.5, 4.5, 6} and `_a2` (ten dimensions) {2.5, 4, 6, 8, 10} by size s1–s5.
- Umbrella policy days `_p` {3, 5, 6.5, 8, 10}; annexes `_ann`: 1.5 for the first, 1 for each further; default annex count `_dn` {1, 3, 5, 6, 8}.
- Training ladder `_lvD` {3:3, 4:5, 5:6.5, 6:8, 7:10} cumulative delivery days from level 1 or 2 (see `docs/LEVELS.md`); starting credit `_lvCr` for groups already at level 3+; lab scaling by target level `_lvF`; labs `_labs`: first lab 1.0, second 0.9, further 0.8 × department size × level factor.
- Configuration `_ag=3`, `_sk=1.5`, `_tl=2` days per agent, skill and tool; train-the-trainer `_ttt=2`; Fluency Support 1 or 2 delivery days a month for 3–12 months, plus the six-month re-score `_rs=2` once when the retainer runs six months or more.
- Discovery and scoping: 1 day, always. Re-score and handover: 1 day whenever assessment, training or policy is bought.
- Bundle lines, the only reductions: training and policy together −10% of the days; configuration bought with training −5%. Both are shown as a line in the breakdown, applied before support days are added.
- Presets: `?preset=assessment|policy|training|agents|support|foundation|adoption|institution|course`, plus `&size=s1..s5`. Adoption ticks four department labs; Institution sets 200–500 staff, ten dimensions, level 5, three labs, umbrella policy with six annexes, train-the-trainer and twelve months of support at one day a month.

**Figures the pages quote (all derived from the script; re-derive with the same constants if any change).** Assessment, four dimensions: 3.5 / 4.5 / 5.5 days (EUR 2,800 / 3,600 / 4,400) for under 10 / 10–50 / 50–200 staff; ten dimensions: 4.5 / 6 / 8 / 10 days (EUR 3,600 / 4,800 / 6,400 / 8,000) up to 200–500. Umbrella policy: 5 / 7 / 8.5 / 10 days (EUR 4,000 / 5,600 / 6,800 / 8,000). Training to level 3, 10–50 staff: 5 days (EUR 4,000); with three labs 7.5 days (EUR 6,000); to level 4: 7 days (EUR 5,600). One agent + one skill + one tool, 10–50 staff: 7.5 days (EUR 6,000). Support: EUR 800 or 1,600 a month; six months at one day a month with re-score and handover day 9 days (EUR 7,200); twelve months 15 days (EUR 12,000). Packages: Foundation 7.5 days = EUR 6,000 for 10–50 staff (6 days = EUR 4,800 under 10); Adoption 22.5 days = EUR 18,000 for 50–200 (26.5 days = EUR 21,200 for 200–500); Institution from 50 days = EUR 40,000 for 200–500 staff with twelve months of support.

**Course for individuals and representatives (fewer than ten).** Priced per group, not per person: `_lvD[level]` delivery days × EUR 800, shared among the participants. Three days to level 3 = EUR 2,400 per group: one person pays 2,400, four pay 600 each, nine about 267 each. Higher target levels add the ladder days (level 5 for two people: 6.5 days = EUR 5,200, EUR 2,600 each). Online is tuition only. In person adds, labelled as estimates and invoiced at actual cost: venue `_vd` about EUR 900 a day for the group, hotel `_hn` about EUR 250 a night per person, hospitality `_hd` about EUR 90 a day per person, coordination `_co` EUR 400 per group. Example: six people, three days, three nights in person: tuition EUR 2,400 + at-cost items EUR 9,220 = about EUR 11,620, about EUR 1,937 each. The old per-person ladder `_pp` is gone.

**Funder page (`for-funders/index.html`).** Portfolio Baseline (up to 15 grantees): from EUR 10,400, 13 delivery days. Portfolio Programme (up to 12 grantees): from EUR 40,000, 50 delivery days, about EUR 3,350 per grantee. Grantee Drawdown Fund: from EUR 20,000 of delivery days (25 days), drawn down over twelve months at the same rate, no discount. Cohort-versus-individual comparison: a small NGO under 10 staff buying assessment, general training and general policy on its own is 8 delivery days = EUR 6,400 in the estimator; twelve of those = EUR 76,800 against EUR 40,000 for the Programme, so "about twice", not three times. The page is addressed to funders and foundations (donors, development agencies, incubators, accelerators), not investors.

**Compare page.** All M.A.I. figures in EUR; the 150-staff scenario (ten dimensions, training with three labs, umbrella policy with three annexes) is 22 delivery days = EUR 17,600. Figures that had no source were removed (boutique advisory year-one range, grant-writer salary and per-proposal fees); the governance-consultancy range is kept but labelled a vendor blog estimate.

**Standards.** ISO/IEC 42001, NIST AI RMF and Article 4 appear only as the optional standards mapping inside the extended readiness assessment. The Institution package no longer lists a governance gap plan or an Article 4 evidence file; "What this practice does not do" names ISO/IEC 42001 or other certification preparation, compliance and legal advice.

**Site assistant (`assets/chat.js`).** The price, private-sector, funders, packages, standards, compliance, small-groups and training answers carry the new model in EN/FR/AR. Note that the assistant strips any sentence containing a currency figure before it answers (the `noPrice` design), so visitors are pointed to the estimator for the number; the rate itself is described in words.

**Not testable from a desk:** whether buyers accept EUR 800 a day. The test is to quote the next five enquiries and record the response.

## 5. Article 4 is dated content

Article 4 of the EU AI Act was replaced by Regulation (EU) 2026/1744 (Official Journal, 24 July 2026). The briefing at `eu-ai-act-article-4/`, the funder page, the chat answer (`id:"article4"`) and two Knowledge entries were corrected on 14 October 2026. The LinkedIn post and article of 8 September that said the opposite ("No, the Digital Omnibus did not delay your AI literacy obligation") was deleted from the Page on 14 October 2026 and marked deleted in `mai-kb/linkedin/linkedin-publication-log.csv`. The Knowledge entry with the same slug now carries the corrected analysis and a dated correction note. The other two posts of 8 September were left up.
