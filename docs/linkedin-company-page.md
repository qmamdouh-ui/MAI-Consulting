# LinkedIn company page — content pack

Source of truth: the live site at `mai4consulting.com`, as published in this
repository. Every claim below is traceable to a page listed in the last column.
When the site changes, update this file in the same commit.

Last aligned with site commit: `f1ca035` (About page rewritten as the practice).

---

## 1. Tagline — 120 character limit

Paste (93 characters):

```
AI adoption for mission-driven organisations. Readiness, policy, department training. Geneva.
```

Alternative (68 characters), if you want the problem rather than the offer:

```
Your team already uses AI. Nobody told them how — or what's allowed.
```

The first is better for search: LinkedIn indexes the tagline, and it carries
"AI", "organisations", "training" and "policy" as literal terms.

---

## 2. About / Overview — 2,000 character limit

LinkedIn strips formatting from this field. Bold, bullets and markdown will not
render, so the text below uses line breaks and em dashes only. Paste verbatim.
It runs to 1,945 characters — 55 short of the cap, so anything added here has to
come out of something else.

```
Your team already uses AI. Nobody told them how — or what's allowed.

M.A.I. Consulting makes mission-driven organisations AI-fluent for the work they actually do. We work on the people who use AI, not the infrastructure that runs it. Four services, one framework, published prices.

AI Readiness Assessment — a scored report across ten dimensions with a ranked 90-day priority list, mapped to ISO/IEC 42001, the NIST AI Risk Management Framework and EU AI Act Article 4. From CHF 6,900.

AI Use Policy — board-ready, written as permissions rather than prohibitions: permitted uses by role, the red lines, a data classification table, disclosure rules for funders and beneficiaries, an escalation path, an approved tool list. From CHF 8,400.

Team AI Training — one organisation-wide session, then a 90-minute lab per department built on that team's real tasks. Each lab ends with that team's one-page cheatsheet. From CHF 12,000.

Fluency Support — monthly office hours, cheatsheet updates as the tools change, coaching for your internal champions, and a re-score at six months. From CHF 1,400 a month.

All four run on the 4D AI Fluency framework — Delegation, Description, Discernment, Diligence — published by Anthropic with Rick Dakan and Joseph Feller. It is public, so the method can be audited rather than taken on trust.

We work with nonprofits, NGOs and foundations; UN agencies and international organisations; government and public institutions; and training centres, as partners rather than clients. Private-sector work is taken on referral.

We sell no licences and take no partner commissions. If the free tier is enough for your team, we will tell you so.

Geneva-based, delivered anywhere, in English, French or Arabic. Fixed price and fixed scope, agreed before work starts.

Free 28-question readiness assessment, no call required: mai4consulting.com/explore-your-ai-readiness
Services and prices: mai4consulting.com/services
```

---

## 3. Page details

| Field | Value | Source |
| --- | --- | --- |
| Name | M.A.I. Consulting | sitewide |
| Website | `https://mai4consulting.com/` | `CNAME` |
| Industry | Business Consulting and Services | see note below |
| Company size | 0–1 employees | `/about/` — "It is not a large firm. There is no bench" |
| Company type | Self-employed *(confirm against the registered legal form)* | not stated on the site |
| Founded | 2023 | `/about/` — "Founded in 2023" |
| Location (HQ) | Geneva, Switzerland | footer, `/contact-us/` |
| Phone | none published — leave blank | `/contact-us/` lists email only |

**Industry.** LinkedIn allows one. "Business Consulting and Services" fits the
four-service mix better than "Professional Training and Coaching", because two
of the four services — the assessment and the policy — are advisory, not
training. If lead flow from LinkedIn search matters more than accuracy of
description, "Professional Training and Coaching" is the narrower, higher-intent
category. Pick one; do not switch back and forth, as the category feeds LinkedIn's
recommendation surfaces and resets when changed.

**Company size.** Keeping 0–1 is consistent with the About page, which says
plainly that there is no bench and that whoever scopes an engagement delivers it.
Inflating this to 2–10 would contradict a page a prospect can read in one click.

---

## 4. Specialties — up to 20 entries

```
AI readiness assessment
AI use policy
AI literacy training
EU AI Act Article 4 compliance
ISO/IEC 42001 readiness
NIST AI Risk Management Framework
AI governance
AI for nonprofits and NGOs
AI for UN agencies and international organisations
AI training for the public sector
Responsible AI
Data protection and GDPR for AI use
Train-the-trainer
AI change management
Claude for business
Prompt design
Nonprofit digital transformation
Delivery in English, French and Arabic
```

---

## 5. Buttons, hashtags, imagery

**Custom button.** "Learn more" → `https://mai4consulting.com/explore-your-ai-readiness/`
The free assessment is the site's lowest-friction entry point, it needs no call,
and the visitor keeps a report either way. "Visit website" pointing at the home
page wastes the click on a second navigation decision.

**Community hashtags** (three, maximum): `#AILiteracy` `#EUAIAct` `#AIGovernance`

**Logo** — 300 × 300 px, PNG or JPG, under 4 MB.
**Cover image** — 1128 × 191 px. Text sits in the left third; LinkedIn crops the
right side on mobile.

There is no logo or cover asset in this repository — `assets/` holds only
`site.css`. Both images have to come from wherever the current LinkedIn logo was
produced, or be made. Brand references if they are remade: navy `#001830` and
`#003E8A`, gold `#C9A84C`, Playfair Display headings, Inter body, light ground
`#f6f8fc` (`assets/site.css`).

---

## 6. What is being replaced, and why

The page as it currently reads describes a management consulting firm that helps
nonprofits "grow impact by integrating business innovation into every-day
solutions", using a proprietary framework called "Consulting apart" built on
"crowdsourced social and economic constructive competition".

None of that survives on the site. The site now sells four AI services and
nothing else, at published prices, on a public framework it invites clients to
audit. Three specific problems with the old copy:

1. **It describes a business that no longer exists.** The commit history shows
   non-AI service lines were cut sitewide (`d2fa41f`). A prospect who reads the
   LinkedIn page and then the website sees two different firms.
2. **The proprietary framework claim inverts the current position.** The whole
   argument on `/about/` is that the method is public — Anthropic's 4D framework
   — precisely so buyers do not have to trust a black box. A named in-house
   framework works against that.
3. **It is unfalsifiable.** "Integrating business innovation into every-day
   solutions" describes no deliverable, price or timeline. The site now leads
   with all three.

Caveat on sourcing: LinkedIn is unreachable from the environment this was
written in, so the description above is second-hand, taken from a third-party
data aggregator's cached copy of the page. Check the live page before assuming
it still reads that way.

---

## 7. Open items

- **The site links no company page.** `/contact-us/` has one "Connect on
  LinkedIn" link and it points to the personal profile
  `linkedin.com/in/qmamdouh/`. Once the company page URL is confirmed, add it to
  the contact page and the footer so the site and the page point at each other —
  LinkedIn weighs that reciprocity, and a visitor who wants the organisation
  currently gets an individual.
- **Footer tagline.** Every page footer reads "Strategy · AI · Impact". The
  strategy and impact lines were cut from the offer; the footer is the last place
  the old three-part positioning survives. Either restore what those words refer
  to, or drop them.
- **Legal entity type.** The company-type field needs the registered form (sole
  proprietorship, Sàrl, other). Not stated anywhere on the site.
