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

## 4. Pricing model: how it is built and what was reviewed

The estimator (`estimate/index.html`, scope model in the page script) prices delivery days at a base day rate multiplied by a sector factor: NGO 0.70, international organisation 0.90, government 1.00, private 1.20. Base CHF 1,700, so about CHF 1,190 a day for an NGO, with a CHF 3,500 floor.

Reviewed 14 October 2026:

- **Base rate kept.** Published evidence puts senior Swiss independent specialists at CHF 140 to 250 an hour (about CHF 1,100 to 2,000 a day), and the UN Secretariat's top consultant band at USD 1,000 to 1,100 a day. CHF 1,190 to 1,700 sits inside that range. There was no evidence for a rise and none for a cut.
- **Funder programmes re-based on delivery days.** The Baseline (up to 15 grantees) came to about 13 delivery days at the NGO rate, and the Programme (up to 12 grantees) to about 50. CHF 12,000 and CHF 52,000 priced them below cost, so they are now CHF 15,000 and CHF 58,000 (about CHF 4,850 a grantee). The Drawdown Fund stays at CHF 30,000, 15% below list.
- **Individual course defined and split (14 October 2026).** The course runs three days (level 3). Tuition per person falls with group size, the same online or in person: CHF 4,800 for one participant (four delivery days at the NGO rate; the earlier CHF 3,100 was below cost), then 2,900, 2,700, 2,500, 2,300, 2,100, 1,900, 1,700 and 1,500 for nine. Online adds nothing. In person adds, itemised and invoiced at actual cost: venue CHF 900 a day for the group, hotel CHF 250 a night per person, hospitality CHF 90 a day per person, and CHF 400 per group for coordination (transfers, visa letters, dietary and accessibility needs). Evidence: Geneva four-star rooms about CHF 150 to 230 a night, seminar rooms CHF 300 to 1,500 a day. Examples: six people online CHF 12,600, in person for three nights CHF 21,820 (about CHF 3,640 each). For one or two people the site and the chat answer point to online. Constants are `_pp`, `_cd`, `_vd`, `_hn`, `_hd`, `_co` in the estimator script.
- **Not testable from a desk:** whether buyers accept these prices. The test is to quote the next five enquiries and record the response.

## 5. Article 4 is dated content

Article 4 of the EU AI Act was replaced by Regulation (EU) 2026/1744 (Official Journal, 24 July 2026). The briefing at `eu-ai-act-article-4/`, the funder page, the chat answer (`id:"article4"`) and two Knowledge entries were corrected on 14 October 2026. The LinkedIn post and article of 8 September that said the opposite ("No, the Digital Omnibus did not delay your AI literacy obligation") was deleted from the Page on 14 October 2026 and marked deleted in `mai-kb/linkedin/linkedin-publication-log.csv`. The Knowledge entry with the same slug now carries the corrected analysis and a dated correction note. The other two posts of 8 September were left up.
