# Site operations: what needs the owner

Items from the October 2026 audit that code alone cannot finish.

## 1. Switch on analytics (about 10 minutes)

`assets/analytics.js` is loaded by `assets/chat.js` on every content page and does nothing until a site code is set.

1. Create a free site at goatcounter.com. Cookieless, no personal profile, honours Do Not Track.
2. Put the code (the part before `.goatcounter.com`) in `CODE` in `assets/analytics.js`.
3. Add this sentence to `privacy/index.html`, in the section on data collected: *"We count page views with GoatCounter, which sets no cookies and stores no personal profile."*
4. Check the counter after a day. Until then the site cannot show which page, article or estimator run produces an enquiry.

## 2. Put a calendar behind "Book a call"

Every "Book a call" button leads to the contact form (`contact-us/`). A calendar link (30-minute slot) removes a step. Once chosen, point the "Book a call" buttons and the nav link at it on every page, and keep the contact form as the fallback.

## 3. Proof

The site names two clients, one of them a related party. Nothing here can be written for you. The fastest fix is one or two discounted pilots in exchange for a named case study with timed before-and-after hours on three proposals. Add it to `our-clients/` and the home page when it exists.

## 4. Pricing model: how it is built and what was reviewed

The estimator (`estimate/index.html`, scope model in the page script) prices delivery days at a base day rate multiplied by a sector factor: NGO 0.70, international organisation 0.90, government 1.00, private 1.20. Base CHF 1,700, so about CHF 1,190 a day for an NGO, with a CHF 3,500 floor.

Reviewed 14 October 2026:

- **Base rate kept.** Published evidence puts senior Swiss independent specialists at CHF 140 to 250 an hour (about CHF 1,100 to 2,000 a day), and the UN Secretariat's top consultant band at USD 1,000 to 1,100 a day. CHF 1,190 to 1,700 sits inside that range. There was no evidence for a rise and none for a cut.
- **Funder programmes re-based on delivery days.** The Baseline (up to 15 grantees) came to about 13 delivery days at the NGO rate, and the Programme (up to 12 grantees) to about 50. CHF 12,000 and CHF 52,000 priced them below cost, so they are now CHF 15,000 and CHF 58,000 (about CHF 4,850 a grantee). The Drawdown Fund stays at CHF 30,000, 15% below list.
- **Open item: the individual course.** The per-person course (CHF 3,100 for one participant down to CHF 1,500 for nine, plus CHF 400 a night) states no length. If it is three days, one participant pays less than the delivery cost at the base rate (3 x CHF 1,700). Decide the length, state it on `estimate/` and in the chat answer, then re-check the prices.
- **Not testable from a desk:** whether buyers accept these prices. The test is to quote the next five enquiries and record the response.

## 5. Article 4 is dated content

Article 4 of the EU AI Act was replaced by Regulation (EU) 2026/1744 (Official Journal, 24 July 2026). The briefing at `eu-ai-act-article-4/`, the funder page, the chat answer (`id:"article4"`) and two Knowledge entries were corrected on 14 October 2026. The LinkedIn article behind the Knowledge entry "The Omnibus delayed high-risk rules and rewrote Article 4" (slug `no-the-digital-omnibus-did-not-delay-your-ai-literacy-obligation`) was published on 8 September saying the opposite. If it is live on LinkedIn, correct or retract it there too.
