# M.A.I. Consulting website — UX and conversion audit

_6 September 2026. Full read of 25 HTML pages plus `assets/site.css` and `assets/chat.js`.
Findings are ranked: 6 blocking, 19 material, 15 standards._

---

The writing on this site is better than the writing on almost any consultancy site of its size. That is not the problem. The problem is that the site _argues_ beautifully and _converts_ badly, and that nobody can currently prove otherwise, because the site measures nothing.

**Reviewed** 6 September 2026 · **Pages** 25 HTML + 2 shared assets · **Method** full copy read, code inspection, model reconstruction

| Count | Severity |
| --- | --- |
| 6 | Blocking — the journey breaks or the promise fails |
| 19 | Material — credibility, comprehension, procurement |
| 15 | Standards — accessibility, findability, craft |
| 0 | Broken internal links. The build hygiene is genuinely clean |

## What I did, and what I am not doing

I read every word of all 25 pages, read `site.css` and the 172 KB `chat.js`, reconstructed the estimator's pricing model in Node to check the numbers the marketing pages quote from it, computed WCAG contrast ratios for sixteen text/background pairs, and walked the internal link graph.

What I am not doing is telling you the site is good. Parts of it are, and I say where. But you asked for criticism and the honest headline is this: **you have built a site that persuades a reader who is already reading carefully, and put almost nothing in place for the far larger number who are not.** The copy assumes an engaged, sequential, desktop reader with time. Most of your traffic will be a director skimming on a phone between meetings, or a DPO who arrived from a LinkedIn link and wants to know in eleven seconds whether you are real.

Two structural observations frame everything below.

**First: the site's central claim is measurement, and the site is not measured.** The Compare page argues that "attendance is not evidence," the services page refuses to quote an ROI figure it has not measured, the Adoption package is sold on a before-and-after score. There is no analytics code of any kind on any page — no Google Analytics, no Plausible, no Matomo, nothing. You cannot say how many people start the readiness check, how many finish it, how many reach the estimator, or which of the eight steps they abandon. Every recommendation in this document, mine included, is currently unfalsifiable on your own site.

**Second: the site is anonymous.** A boutique practice whose stated differentiator is "whoever scopes it, delivers it" has no name, no face and no biography anywhere across 25 pages. The only human name on the site is the word "Mamdouh" inside a form success message that a visitor sees only after submitting, and an email address. Meanwhile the site assistant is explicitly configured to refuse the questions `founder`, `owner` and `ceo`. This is the single largest gap and it runs through a third of what follows.

> **Credit where it is earned**
>

So the criticism is calibrated: the sourcing discipline is unusual and real — every sector statistic carries a linked primary source, the HBS study's _negative_ finding is quoted alongside its positive one, the conflict of interest on the AI for Good testimonial is disclosed without being asked. The [EU AI Act Article 4 briefing](https://mai4consulting.com/eu-ai-act-article-4/) is the best page on the site and would stand up in a professional publication. The About page's "Limits" section, which lists five reasons not to hire you, is the most persuasive thing here. Contrast on dark backgrounds is well above requirement. Zero broken links across 25 pages. The legacy redirects carry canonical tags and `noindex`. None of that is normal for a site this size.

The gap is not in the thinking. It is entirely in the mechanics between the thinking and the buyer.

## Blocking

Six findings where a visitor who wants to buy is stopped, misled, or given nothing to act on. Fix these before anything else on this list.

#### [B‑01] "Book a call" appears 15 times and books no call — _Blocking_

Every "Book a call" button on the site — in the top bar of all 25 pages, in the closing band of every service page, in the estimator, in the assessment results — leads to `/contact-us/`, which is a nine-field message form. There is no scheduler, no calendar embed, no availability, and no phone number anywhere on the site.

```
contact-us/index.html — required: name, email, sector, service of interest, message.
Optional: organisation, job title, team size, referral source, contact preference.
Promise on the page: acknowledgement in hours → full reply in 1 business day
                    → "discovery call scheduled within the week".
Also: "Phone call" is offered as a contact preference. No phone field exists.
```

So the actual journey is: click a button labelled "book", write a paragraph about your organisation, wait a day, exchange emails to find a slot, and speak next week. Against a labelled promise of booking, that is a three-to-seven-day gap. B2B benchmarks consistently show self-service scheduling converting several times better than form-then-callback for exactly this kind of high-consideration service, and the reason is not laziness — it is that a form asks the buyer to expose intent before receiving anything, while a calendar gives them the slot immediately.

**Fix:** Put a real scheduler (Cal.com, Calendly, Google Appointment Schedules) on `/contact-us/` above the form, with visible slots. Keep the form below it as the alternative for people who prefer to write first, and relabel that path "Send a message — reply within one business day." Add a phone number, or remove "Phone call" from the preference list and add a phone field if you keep it. If you genuinely cannot offer slots, change 15 buttons to say what actually happens.

**Impact:** This is the highest-leverage single change on the site. It converts the site's most-repeated call to action from a promise you break into one you keep, removes a multi-day gap at the exact moment of peak intent, and costs an afternoon. _Confidence: high on mechanism, unmeasurable on magnitude until B‑02 is fixed._

#### [B‑02] There is no analytics on any page — _Blocking_

A repository-wide search for `gtag`, `googletagmanager`, `plausible`, `matomo`, `fathom`, `document.cookie`, `localStorage` and `sessionStorage` returns nothing outside the privacy policy's own prose. The site sets no cookies and records no events.

This has two consequences. The obvious one is that you are optimising blind: you cannot tell whether the estimator is used, whether anyone finishes 60 questions, whether the Compare page persuades or exhausts, whether "For Investors" in the third nav slot earns it. The less obvious one is a credibility problem — the privacy policy describes analytics you do not run (see M‑12), and a practice that sells "measure before, measure after" is not measuring the one asset it fully controls.

**Fix:** Install a lightweight, cookieless analytics tool — Plausible or Umami, both of which avoid the consent-banner problem entirely and align with the practice's own positioning far better than Google Analytics would. Instrument seven events: estimator opened, estimator range rendered, estimate emailed, assessment started, assessment completed, PDF downloaded, contact form submitted. Then update the privacy policy to describe what you actually run.

**Impact:** No direct conversion gain. It is on this list because without it, every other item here stays an argument rather than a measurement, and because a governance practice running undocumented, unmeasured web processing is a story you do not want a prospective DPO client to notice. _Confidence: high._

#### [B‑03] The estimator refuses to price the top half of your stated market — _Blocking_

The home page targets "mission-driven and international organisations of up to 500 staff." The estimator returns a numeric range for 1–10, 10–50 and 50–200. For **200–500** and **500+** it returns "Scoped on a call" with no figure at all.

```
estimate/index.html, line 372 — if(st.size==="s4"||st.size==="s5") return null;

Reconstructed outputs (NGO rate, CHF, excl. VAT):
  page default, nothing clicked ............ 12,000 – 15,000
  assessment only, 10 dims, 10–50 staff ....  6,500 –  8,000
  preset=adoption, 50–200 staff ........... 23,500 – 29,500
  preset=institution (200–500) ............ no number returned
  200–500 and 500+ ........................ no number returned
```

The Compare page builds an entire competitive differentiator on this: _"not knowing whether this is a CHF 5,000 or a CHF 500,000 conversation is the main reason buyers leave."_ The estimator then declines to answer for a 300-person INGO — precisely the buyer with the largest budget, the longest procurement cycle and the greatest need to know the order of magnitude before opening an internal conversation. The Institution package, which is the site's premium offer, routes to "Scope on a call" on every page it appears.

**Fix:** Extend the size multipliers to `s4` and `s5` and return a wide but real band — a 200–500-staff Adoption scope is not unknowable, and a range of, say, CHF 45,000–75,000 with a prominent "wide because structure, sites and languages move this a lot; the call narrows it" is worth infinitely more than silence. Keep the call CTA. The point is to establish the order of magnitude, not to quote.

**Impact:** Removes the contradiction between the site's loudest differentiator and its behaviour, and gives the largest prospects the one number that lets them start an internal budget conversation without contacting you. _Confidence: high on the contradiction; moderate on conversion effect._

#### [B‑04] On mobile, the estimator's price sits below an eight-step form — _Blocking_

The estimator is a two-column grid: form left, sticky price panel right. Below 900 px the grid collapses to one column and the panel loses its sticky position, so it renders _after_ the entire form in source order.

```
estimate/index.html, line 66 — @media(max-width:900px){.est{grid-template-columns:1fr}.res{position:static}}

Mobile sequence: 8 steps (org type, size, assessment, training + 7-level
ladder + 8 department checkboxes, policy, agents/skills/tools, 11 task
checkboxes, free-text notes) → then the price.
```

The entire value of a live estimator is the feedback loop: change a choice, watch the number move. On a phone that loop does not exist. The visitor answers eight steps' worth of questions on faith and only then discovers whether the answer is affordable. This is your primary conversion tool, and on the device most of your traffic will use, it is a long questionnaire with a delayed reveal.

**Fix:** Below 900 px, pin a compact result bar to the bottom of the viewport showing the live range and a "details" toggle that expands the inclusions list. Move the chat launcher up when it is showing so the two do not collide. Alternatively, render a condensed price line directly under step 1 as well as at the end.

**Impact:** Restores the interaction the tool exists to provide, on the majority-share device. This is the difference between an estimator and a form. _Confidence: high._

#### [B‑05] Nobody's name, face or CV appears anywhere — _Blocking_

The About page is 1,064 words about "the practice" and "we." There is no principal named, no photograph, no career history, no LinkedIn profile link (only a company page), and no list of the nine certifications the home page advertises in 34-pixel type. Across the whole site there are **zero images of any kind**. The only human name is inside the contact form's success message.

```
assets/chat.js, line 414 — the assistant's OFFTOPIC refusal list includes:
  ceo|founder|owner|salary|hiring|...|vat number|company number|registration number

So "who founded this practice?" is answered with a refusal, on a site
that names nobody, while an id:"about" entry containing
"founded in 2023" sits unreachable behind that same filter.
```

In professional services the buyer buys a person. That is more true, not less, for a young practice with two named clients. Every trust signal the site does offer — the framework is public, the instrument is free, the estimator is open, the limits are stated — is an argument that you can be _inspected_. And then the one thing a buyer most wants to inspect, the person who will be in the room, is withheld. An executive director asked to sign a CHF 25,000 engagement will look for the principal's background before anything else, and the site is engineered to prevent that.

**Fix:** Rewrite the About page around a named principal: a photograph, a 250-word career summary (the Geneva/international-sector background is the asset — use it), the LinkedIn profile, and the nine certifications itemised by name, issuer and date with verification links where they exist. Remove `ceo|founder|owner` from the assistant's refusal list and point it at the About page. Add "About" to the top navigation.

**Impact:** The largest credibility gain available, and it converts several other findings from problems into strengths — the certifications claim becomes verifiable, the "whoever scopes it delivers it" differentiator becomes concrete rather than abstract, and the LinkedIn distribution strategy gains a person to follow. _Confidence: high._

#### [B‑06] Both free assessments front-load an identity gate and lose everything on reload — _Blocking_

The 28-question check opens with a six-field profile block marked "All fields required." The 60-question extended assessment opens with seven, adding "EU AI Act Exposure." Both blocks sit _above_ the questions.

Two problems. First, the gate is illusory but reads as real: validation only fires on the PDF download, so the questions and the live score are actually free — but nothing on the page says so, and a visitor reading "All fields required" above a wall of form fields will reasonably conclude they must hand over their name, organisation, role and work email before they may begin. The home page sells this as "No call is needed and you keep the report" and never mentions the identity request.

Second, and worse: **there is no save state.** No `localStorage`, no session persistence, no resume. A tab reload, a phone call, a browser crash, a mis-tap on the back button at question 47 of 60, and thirty minutes of work is gone with no warning.

```
short check ..... 28 questions, "about twelve minutes", 6 required profile fields
extended ........ 60 questions, "about thirty minutes", 7 required profile fields
persistence ..... none (no localStorage / sessionStorage / beforeunload guard)
```

**Fix:** Move the profile block _below_ the questions, reframed as "Where should we send your report?" Persist answers to `localStorage` on every change and restore on load with a "resume where you left off" line. Add a `beforeunload` warning once answering has started. State plainly above the questions: "Answer first. Details are only needed for the PDF."

**Impact:** These two tools are the site's principal lead magnets and the entry point recommended by four other pages. Removing a perceived gate at the top of a 12-to-30-minute task, and eliminating catastrophic data loss part-way through, addresses the two largest abandonment causes in long-form assessments. _Confidence: high on the loss risk; the gate effect is unmeasurable until B‑02._

## Material

Nineteen findings that damage credibility, block procurement, or make the offer harder to understand than it needs to be.

#### [M‑01] The "9 AI certifications" claim is the one claim on the site you cannot inspect — _Material_

The home page's fact strip leads with **9** — "seven from Anthropic, two from the United Nations College with Microsoft." The About page repeats it as prose. Nowhere on the site is a single certificate named, dated or linked.

This sits badly against the site's own standard, stated on the same page: _"Where a figure could not be traced to the organisation that published it, it is not on this site."_ You hold every third-party statistic to a linked-source test and exempt your own headline credential from it. A sceptical reader notices that asymmetry, and it is the credential most likely to be checked.

**Fix:** List the nine on the About page: name, issuer, date, and a verification link where the issuer provides one. If some are not independently verifiable, say which — that admission is worth more than the number.

**Impact:** Converts the site's biggest unverifiable claim into its most verifiable one, and closes the only place where the site's evidentiary standard is applied unevenly. _Confidence: high._

#### [M‑02] The Knowledge hub is empty and claims an automation that does not exist — _Material_

The page invites the reader to "assess the thinking before you commission the work." It then contains **zero original articles**. The items filed under services 01–03 are the site's own tools and existing pages. Services 04 and 05 say "Nothing published here yet." All five sections carry a "Next article" placeholder and a "Follow on LinkedIn to see it first" link.

```
knowledge/articles.json
{ "updated": "2026-09-05", "articles": [] }

The page states: articles are "mirrored into the section they belong to
here, automatically, each morning."
The README states the process: "copy this block, fill it in, and place it
directly above the .slot div." There is no sync. The renderer only reads a
file that a human edits by hand, and that file is empty.
```

So a page whose stated purpose is to let the reader judge your thinking contains none of it, sends the reader to LinkedIn five times, and describes a daily automation that does not run. If a buyer clicks "Knowledge" as their second click — a very likely path for a director evaluating expertise — the site's answer is an empty shelf with a sign explaining how the shelf will be stocked.

**Fix:** Either publish three or four real pieces before the page is linked from the primary navigation, or unlink it and promote the EU AI Act briefing in its place. Delete the "automatically, each morning" sentence — it is not true, and it is the kind of small false claim that costs disproportionately on a site selling governance. The three existing reference articles and the playbook are genuine assets; file them as the content rather than as placeholders under a "next article" heading.

**Impact:** An empty section in the primary nav is worse than no section: it converts a curiosity click into evidence that the practice has little to say. Removing the false automation claim removes a needless integrity risk. _Confidence: high._

#### [M‑03] Vendor-independence is claimed three times and never reconciled with Anthropic partnership — _Material_

"Vendor-independent. We sell no licences and take no partner commissions" appears on the home page. "It sells no software. No licences resold, no partner commissions, no quota" appears on the About page. The Compare page frames independence as a structural differentiator.

Meanwhile: the About page discloses "Member of the Anthropic Claude Partner Network." Three of the six items in the footer's "Read" group are Anthropic and Microsoft product explainers (_AI Use Cases_, _Claude in Chrome_, _Claude for Business_). The training ladder's top level is defined as operating Claude Code specifically. The method is Anthropic's published framework.

None of that is dishonest — partner-network membership is disclosed, and it may well carry no commission. But the site never reconciles the two, and a procurement officer or DPO who notices the pattern before you address it will read it as a gap you hoped they would miss rather than a distinction you had already drawn.

**Fix:** Add a short, direct paragraph to the About page: what the Partner Network membership is, what it does and does not involve financially, why the practice still recommends the free tier or a competitor when that is right, and what would happen if Copilot were the better fit for a client. Own it on the page rather than leaving it to be discovered.

**Impact:** Turns the site's most likely "gotcha" into another instance of the disclosure discipline it already demonstrates elsewhere. The AI for Good conflict-of-interest disclosure proves you know how to do this; apply the same treatment here. _Confidence: high._

#### [M‑04] The playbook page breaks the site's own sourcing rule — _Material_

```
playbook/index.html — "Why a playbook and not a course":

  "Adding AI tools raises productivity up to about three, then reduces it.
   Staff carrying heavy AI-oversight loads report measurably more
   information overload."

No source. No link. Every other statistic on the site carries one.
"up to about three" is also missing its noun — three tools, presumably.
```

Two empirical claims, stated flatly, unsourced, on a site whose home page promises the opposite. One of them is also ungrammatical in a way that suggests it was cut down and never re-read. This is the single most damaging sentence on the site relative to its length, because the reader who checks sources is exactly the reader you are trying to win.

**Fix:** Source both claims and link them in the same `.cite` style used everywhere else, or delete them. Fix "up to about three" either way.

**Impact:** Restores the consistency of the sourcing discipline, which is the site's strongest single trust asset and only works if it is exceptionless. _Confidence: high._

#### [M‑05] Service pages promise a price and none of them carry one — _Material_

The services hub says, twice: "Method, worked examples and price sit on each service's own page." Each of the five pages has a section headed "Price." None contains a number.

```
services/assessment  → "Priced on organisation type and size… fixed after a 30-minute call"
services/policy      → "Priced on organisation type and size, annexes priced individually"
services/training    → "Priced on the level you are training to…"
services/support     → "quoted on the call rather than in the estimator" — yet the
                        page's own button says "Price this service" and links to it
services/agents      → "Priced per agent, per skill and per tool in the estimator"

An unused CSS class .svc-price sits in services/index.html,
suggesting prices were there once and were pulled.
```

Meanwhile the [For Investors](https://mai4consulting.com/for-funders/) page — built for a secondary audience — publishes three hard prices: from CHF 12,000, from CHF 52,000, from CHF 30,000. Your secondary buyer gets more price transparency than your primary one.

**Fix:** Put a "from" figure on each of the five service pages, taken from the estimator's floor for a small NGO — "from CHF 6,500 for a 10–50-staff NGO; price yours" is honest, bounded and stops the reader having to leave the page to learn the order of magnitude. On the Fluency Support page, remove the "Price this service" button that contradicts the paragraph beside it, or make the estimator handle retainers.

**Impact:** Every service page currently ends by sending the reader somewhere else to find out the one thing that decides whether to continue. Closing that loop on the page removes a hop from five of the site's highest-intent journeys. _Confidence: high._

#### [M‑06] Two testimonials, neither attributed to a person, one with a disclosed conflict — _Material_

The Who We Work With page carries quotes from BlackBird Training Center and the AI for Good Foundation. Both are attributed to organisations, not to named individuals with roles. The AI for Good quote carries the disclosure that the practice's principal also holds a role at the foundation — which is admirable, and also means the reader is left with one genuinely arm's-length testimonial from an unnamed source.

**Fix:** Get a name and a title on the BlackBird quote — an unattributed organisational quote reads as written in-house, whether or not it was. Better still, replace one with a short written case note: the situation, what was delivered, what changed, over what period, with a named contact who agreed to be quoted. One of those is worth more than six anonymous pull-quotes. If neither client will be named, say so on the page and explain why.

**Impact:** Social proof is the weakest section of an otherwise strong evidence stack, and it is weak in a way that is fixable with two emails. _Confidence: high._

#### [M‑07] "Send to the team & keep a copy" sends the visitor no copy — _Material_

```
estimate/index.html, line ~398 — the EmailJS payload sets
to_email: "q.mamdouh@mai4consulting.com". The visitor's address is
carried as from_email only. No copy is sent to them.

Only after a successful send does the panel say: "Use your browser's print
or save-as-PDF for your own copy."
```

The button makes two promises and keeps one. The reader who clicks it in order to keep a record of their scope — a completely normal reason to click a button labelled "keep a copy" — is told afterwards to go and print the page themselves.

**Fix:** Either send the visitor a copy (a second EmailJS template addressed to `from_email`, which is a ten-minute change), or relabel the button "Send this scope to the team" and add a separate "Save as PDF" button that triggers `window.print()` — the print stylesheet is already written and already hides the nav, footer and send block.

**Impact:** The emailed copy is also the single best follow-up asset you could own: a document with the buyer's own selections in their inbox, forwardable to a finance director. Currently you have built everything needed for it except the send. _Confidence: high._

#### [M‑08] Typing in the estimator's notes field silently deletes the name and email already entered — _Material_

Every `input` event on any form field calls `render()`, which rebuilds the entire result panel with `innerHTML`. The "Send this estimate" name, email and organisation inputs live inside that panel.

```
Sequence that loses data:
  1. fill name + email in the send panel
  2. scroll up, add a line to "8 · Anything we should know"
  3. every keystroke re-renders #res-body
  4. name and email are gone, with no message

estimate/index.html — i.addEventListener("input",render) on all
#est fields; sendBlock() is re-emitted inside body.innerHTML on
every render.
```

**Fix:** Move the send block out of the re-rendered region, or preserve its three values across renders and restore them. A five-line change.

**Impact:** Silent data loss at the exact moment the visitor is committing to hand over contact details is the worst possible place for it. Anyone who fills the panel and then remembers something for the notes box loses the lead. _Confidence: high — reproducible from the code._

#### [M‑09] The estimator's step numbering breaks for individual buyers — _Material_

Selecting "Individual or organisation representative" hides the steps marked `.step.org`. Two steps that should hide do not.

```
Steps an individual sees, in order:
  1 · What kind of organisation are you?
  2 · The course
  2 · How many staff would this cover?   ← duplicate number, irrelevant
                                            question, feeds nothing
  8 · Anything we should know            ← jumps from 2 to 8

estimate/index.html, line 121 — <div class="step">, missing the
org class its five siblings carry. Step 8 at line 221 has the same
omission and a hard-coded "8 ·" that nothing renumbers.
```

Separately, the estimator's own hero says "**Five choices** produce one indicative range." There are eight numbered steps.

**Fix:** Add `org` to the staff-size step. Renumber remaining visible steps in JavaScript on each render, or drop the numbers entirely. Change "Five choices" to match reality, or reduce the tool to five steps by folding the task-picker and notes into an optional "add detail" disclosure — which would be the better answer, since eight steps is a lot for a page whose purpose is a quick order-of-magnitude.

**Impact:** Individual and small-group buyers are an explicitly named segment with a dedicated price path; the first thing they see is a numbering error and an irrelevant question. _Confidence: high._

#### [M‑10] The estimator anchors at CHF 12,000–15,000 before the visitor chooses anything — _Material_

The page loads with NGO, 10–50 staff, four-dimension assessment, organisation-wide training and an umbrella policy all pre-selected. The result panel therefore shows a price for a scope the visitor did not build.

```
Reconstructed default: 12.5 days × 0.90 bundle factor × CHF 1,700
                       × 0.70 NGO rate  →  CHF 12,000 – 15,000

For a 1–10-staff organisation the site's true floor is CHF 5,000–6,500.
They see 12,000–15,000 first.
```

Pre-selecting the largest plausible bundle is a defensible commercial choice, but it is being made silently on a site whose entire tone is "we will tell you if you do not need this." A small organisation lands, sees a five-figure number attached to choices it never made, and leaves — and, by B‑02, you will never know it happened.

**Fix:** Either start with nothing selected and an explicit "select what you need" empty state (the code already has one), or keep the defaults and label the panel "Example scope — change the selections below." Both are honest; the current arrangement is neither.

**Impact:** Removes an unearned anchor that works against the smallest segment of a market the site says it serves down to teams of one. _Confidence: moderate — anchoring cuts both ways commercially, but the silence about it is the real fault._

#### [M‑11] The day rate and the sector multipliers are readable in the page source — _Material_

```
estimate/index.html, line 260, above a comment reading
"figures are intentionally not rendered anywhere on the page":

  var _r=1700, _m={ngo:.70, io:.90, gov:1.00, priv:1.20};
  window.__maiEstimate = function(st){return estimate(st);};

Effective day rates: NGO CHF 1,190 · IO 1,530 · government 1,700 · private 2,040.
Anyone who opens View Source, or the console, has the whole rate card.
```

The README describes the model as "deliberately not rendered." It is not rendered; it is also not concealed. A private-sector prospect can determine that they are charged 71% more than an NGO for identical work, and a government buyer that they pay 43% more. Whether that matters is a commercial judgement, not a UX one — but the intent expressed in the code comment is not achieved by the code, and you should know that before someone else tells you.

**Fix:** Decide which you want. If differential pricing is defensible — and for a practice serving the nonprofit sector it usually is — state it plainly on the page: "Nonprofit and international rates are lower than public and private rates" already appears in step 1; extend it to say by roughly how much, and the exposure becomes a feature. If it is not something you want visible, the calculation has to move server-side, which for a static GitHub Pages site means a small serverless function.

**Impact:** Either closes a genuine commercial exposure or converts it into another instance of the transparency the site trades on. Doing nothing leaves an intent stated in the repository that the product does not deliver. _Confidence: high on the exposure; the commercial call is yours._

#### [M‑12] The privacy policy does not cover the two tools that collect the most data — _Material_

The policy describes the contact form and the site assistant. It does not mention the assessments or the estimator, which between them collect more personal data than the contact form does.

```
What the readiness check actually does on "Download PDF Report":
  1. builds a PDF containing the visitor's name, organisation, role,
     score and recommendations
  2. POSTs the base64 PDF to a Google Apps Script web app → stored in
     a Google Drive account
  3. emails name, org, role, sector, size, email, score, weakest
     dimensions and the Drive link to the practice

Privacy policy §2 (What Data We Collect): no assessment data listed.
Privacy policy §9 (International Transfers): names EmailJS only. Google
is not named as a processor anywhere.
Estimator send panel: "Nothing else is stored."
Privacy policy §7: submissions retained "up to 3 years."
```

Separately, §2 and §5 describe "analytics cookies," "preference cookies" and automatically collected IP, device and referrer data. As established in B‑02, the site sets no cookies and runs no analytics. The policy overstates the processing in one place and omits it entirely in another.

For any practice this would be sloppy. For one that sells AI use policies, data classification tables and DPIA vocabulary to data protection officers, it is a live sales objection sitting on your own domain. The first thing a competent DPO does before hiring a governance adviser is read that adviser's privacy notice.

**Fix:** Rewrite §§2, 5, 6, 7 and 9 to describe what the site actually does: name Google (Drive/Apps Script) as a processor with its transfer basis; describe the assessment and estimator collections, their purpose, legal basis and retention; delete the cookie categories that do not exist or install the cookieless analytics from B‑02 and describe those. Add a one-line consent notice with a privacy link directly above each of the three submit buttons — currently none of them has one at the point of collection. Reconcile "Nothing else is stored" with the three-year retention period.

**Impact:** Removes a self-inflicted objection at exactly the moment your most qualified buyer is evaluating you, and turns the privacy page from a liability into a demonstration of the service. _Confidence: high. This is not legal advice — have counsel confirm the redraft._

#### [M‑13] Institutional procurement is blocked, and the assistant is configured to refuse the questions — _Material_

The site sells to UN agencies, public institutions and INGOs. Those buyers cannot raise a purchase order without a legal entity name, a registration or VAT number, an address, and standard terms.

```
Not present anywhere on the site: legal entity form, company registration
number, VAT/CHE number, postal address, terms & conditions, cancellation
policy, refund policy, insurance, supplier questionnaire.

Present: "Geneva, Switzerland" and one email address.

assets/chat.js OFFTOPIC list forces a refusal on:
  vat number · company number · registration number · iban ·
  bank account · cancel · cancellation · refund · guarantee ·
  warranty · insurance

Payment terms (40/60, monthly retainers, >20% re-quote) appear only in the
estimator's result panel, one About-page line, and the assistant.
```

So a finance officer trying to set you up as a supplier finds nothing on the site, asks the assistant, and is refused. That is not an edge case; it is the step immediately after "yes, let's proceed."

**Fix:** Add a short `/terms/` page: legal entity and registration details, VAT status, payment terms, what happens if a client cancels or postpones, the 20% re-scope rule, travel billing, insurance if held, and a downloadable supplier-information sheet. Link it from the footer's Legal group beside Privacy. Remove the procurement terms from the assistant's refusal list and point them at that page.

**Impact:** Unblocks the administrative path for exactly the institutional buyers the site is written for, and removes friction at the point of highest intent. _Confidence: high._

#### [M‑14] The assessment result names the right service and does not link to it — _Material_

```
explore-your-ai-readiness/index.html — updateNextStep():
  score < 40  → "Start with an AI Use Policy."
  40 – 70     → "Start with Team AI Training, one lab per department."
  > 70        → "Look at Fluency Support and a re-score in six months."

All three service names are bold text, not links. The two buttons beneath
stay generic: "Book a free 30-minute debrief" · "See services and prices".
```

The logic is already written and it is good — it does the diagnostic-to-service mapping the whole site argues for. It then stops one line short of acting on it. The visitor is told which of five services to start with and handed a link to all five.

**Fix:** Make each service name a link, and swap the secondary button to the matched service with a matching label — "Read about the AI Use Policy service." Pass the score band into the estimator preset so the range they land on reflects what was just recommended.

**Impact:** The lowest-effort conversion improvement on the site. The bridge from free tool to paid service is already built and is missing its last three metres. _Confidence: high._

#### [M‑15] About, Who We Work With and Contact are not in the navigation; "For Investors" is, in third place — _Material_

```
Top bar (all 25 pages):
  Services · Estimate · For Investors · Compare · Knowledge ·
  Readiness Check · [Book a call]

Footer only: About · Who We Work With · Contact · Sample Playbook ·
             EU AI Act Article 4 · the three articles · Privacy
```

Three problems in one bar. The About page — the page a first-time visitor to an unfamiliar boutique goes to second — is reachable only from the footer. The Who We Work With page, which does the audience self-identification work ("four roles, which one is yours"), is likewise buried. And a page for a secondary audience occupies the third slot, under a label ("For Investors") that does not describe the primary readers it addresses, who are foundations and donors, and who in this sector are generally not called investors. The page's own title is "For Investors and Funders."

**Fix:** Revise to: **Services · Pricing · Approach · About · Knowledge · Free Check · [Book a call]**, with For Investors moved to a clearly signposted link inside Services and on the home page (where it already has a band). Rename "Estimate" to "Pricing" — it is what buyers scan for. Fold Compare into the Pricing page or into Approach. Relabel the funders page for the audience that reads it.

**Impact:** Puts the two pages that build trust in a young practice where trust is decided, and stops a secondary-audience page consuming primary-navigation attention on every page of the site. _Confidence: high on the About omission; moderate on the specific reshuffle._

#### [M‑16] Three different products are called some version of "AI Readiness Assessment" — _Material_

```
1. "AI Readiness Check" — free, 28 questions
     nav label "Readiness Check" · home "The AI Readiness Check" ·
     footer "Readiness Check" · page H1 "AI Readiness Check"

2. "Extended AI Readiness Assessment" — free, 60 questions
     URL /extensive-ai-readiness-analysis/   ← "extensive" + "analysis"
     page title "Extended AI Readiness Assessment"   ← "extended" + "assessment"
     footer "Extended Assessment" · README "Extensive AI Readiness Analysis"
     home "the extended assessment"

3. "AI Readiness Assessment" — the paid service at /services/assessment/
```

The assessment service page does contain an excellent three-column table distinguishing them — which is itself evidence that the naming needed explaining. But that table is on one page, halfway down, and everywhere else the three names collide. A visitor who takes the free check and then sees "AI Readiness Assessment" in the services list has no reliable way to know whether they have already done it.

**Fix:** Fix the slug/title mismatch first — pick one word, and redirect the old URL. Then differentiate by function rather than by degree: _Readiness Check_ (free, 12 min), _Readiness Self-Assessment_ (free, 30 min), _Readiness Audit_ (paid, with interviews). Lift the comparison table onto both free tools, not just the service page.

**Impact:** Removes the most likely comprehension failure on the site, on the products that do the most lead generation. _Confidence: high._

#### [M‑17] The home page opens 14 new tabs' worth of links, including all five service cards — _Material_

```
target="_blank" counts: index 14 · services 13 · claude-in-chrome 16 ·
compare 8 · for-funders 7 · training 7 · assessment 8

On the home page and the services hub, every one of the five service
cards opens in a new tab.
```

New tabs are correct for outbound citations — and the citations are the one place the site uses them appropriately. They are wrong for the site's own primary journey. A visitor comparing services opens five, finds no back button that returns them to where they were, and accumulates a tab stack. It is also a WCAG 3.2.5 caution: opening a new window without warning is a change of context the user did not request.

**Fix:** Remove `target="_blank"` from every internal link. Keep it on outbound citations and add a visually-hidden "opens in a new tab" to those. Compensate for the lost context with the service sub-navigation already built on the service pages.

**Impact:** Restores linear, back-button-navigable browsing on the site's main comparison journey. _Confidence: high._

#### [M‑18] The same destination has nine different button labels — _Material_

```
To the estimator: "Estimate your price" · "Price your scope" · "Build your
scope, see the range" · "Build a scope and see the price" · "See the price
for your organisation" · "Price this service" · "Estimate this scope" ·
"See the per-person price" · "Estimate →"

To contact:      "Book a call" (15×) · "Book a 30-minute call" (5×) ·
                 "Book the 30-minute call" · "Scope on a call" ·
                 "Ask about Baseline" · "Ask about the Programme" ·
                 "Ask about the Fund" · "Ask for one for your team"

To the check:    "Take the free readiness check" (8×) · "Take the readiness
                 check" · "Take the check" · "Open the readiness check" ·
                 "Open the check →"
```

Readers learn a label and then scan for it. Varying it means every instance has to be read rather than recognised, and it prevents any single call to action from accumulating familiarity across a multi-page visit. The variation reads as writerly care; it functions as noise.

**Fix:** Three primary labels, used verbatim everywhere: **Price your engagement**, **Book a 30-minute call**, **Take the free check (12 min)**. Vary the supporting sentence around them, never the button.

**Impact:** Consistency compounds across a multi-page visit, which is exactly the visit pattern this site is designed for. _Confidence: moderate-high._

#### [M‑19] Copy defects visible to the reader — _Material_

- **Duplicated paragraph.** The estimator's "How to read the number" section says "Two things move it most… Two things do not move it: negotiating, and how urgent it is," then two paragraphs later says "What moves the figure: … What does not move it: negotiating, and how urgent it is." Same content, twice, on one screen.

- **"10 × 60" as a headline fact.** In the home page fact strip, in 30-pixel Playfair, this reads as a multiplication. It means ten dimensions and sixty questions. Write it as "10 / 60".

- **"Geneva" in a numeric fact strip.** Three of the four tiles are counts; the fourth is a place name, with 26 words of caption carrying two client names and three languages. It is doing four jobs in a slot designed for one.

- **Mixed spelling conventions**, split cleanly along the old/new page seam: 39 US spellings in the extended assessment, 24 in Use Cases, 24 in the readiness check, 11 in the contact form, 6 in Claude for Business, 4 each in Privacy and Claude in Chrome — against consistent British spelling on every page written later. The reader meets "Tell us about your organization" on the contact form of a site that has said "organisation" forty times.

- **Two title-case systems.** The contact page and the three reference articles use Title Case headings ("Start a Conversation", "What Claude Actually Does Well"); everything newer uses sentence case. Two writers, visibly.

**Fix:** One editorial pass with a spell-check set to en-GB, plus a find-and-replace on the six worst pages. Delete the duplicated paragraph.

**Impact:** Individually trivial; collectively they are the difference between a site that reads as one practice and one that reads as a site rebuilt in layers, which undercuts the "whoever scopes it delivers it" claim. _Confidence: high._

## Accessibility, findability and craft

Fifteen findings. The accessibility ones are not optional politeness — UN agencies and EU public institutions carry accessibility requirements in their procurement, and this site sells to them.

### Accessibility

#### [A‑01] Twelve of 28 and sixteen of 60 assessment questions cannot be answered with a keyboard — _Standards_

```
Both assessments render scale questions as:
  <div class="scale-btn" onclick="setScale(...)">1</div>

No tabindex, no role, no aria-checked, no keyboard handler. Dimension
accordion headers are also <div onclick>.

  short check: 12 of 28 questions (43%) · extended: 16 of 60 (27%)
```

A keyboard-only user, a screen-reader user, or anyone using switch access cannot complete either free assessment. WCAG 2.1 AA failures: 2.1.1 Keyboard, 4.1.2 Name/Role/Value, 1.3.1 Info and Relationships.

**Fix:** Replace the scale divs with a `role="radiogroup"` of real `<button>` elements carrying `aria-checked`, and the accordion headers with `<button aria-expanded>`. This is a contained change to two `buildInput` functions.

**Impact:** Removes an outright exclusion from the site's two flagship free tools, and removes an answer you would currently have to give truthfully on any public-sector accessibility questionnaire. _Confidence: high._

#### [A‑02] Twenty-seven form fields have no programmatic label — _Standards_

```
contact-us ......................... 9 fields
extensive-ai-readiness-analysis ... 10 fields
explore-your-ai-readiness ..........  8 fields

Labels are present visually but carry no for attribute and the inputs
carry no aria-label. A screen reader announces "edit text, blank."
```

**Fix:** Add `for` / `id` pairs. Fifteen minutes across three files. WCAG 1.3.1, 3.3.2, 4.1.2.

**Impact:** The three data-capture surfaces on the site are the three that are unusable with assistive technology. _Confidence: high._

#### [A‑03] Gold on white fails contrast on the most prominent numbers on the site — _Standards_

Contrast on dark backgrounds is well handled throughout — I measured fourteen pairs that pass comfortably. Two fail, and they are on prominent elements.

| Element | Colours | Ratio | Required | |
| --- | --- | --- | --- | --- |
| **Service numbers 01–05** — home + services hub, 24 px bold | #C9A84C on #fff | 2.29 | 3.0 | **FAIL** |
| **ROI figures 40% / 14% / 25%** — services page, 30 px bold | #C9A84C on #fff | 2.29 | 3.0 | **FAIL** |
| **Package audience labels** — "Up to 50 staff · a first step" | #C9A84C on #fff | 2.29 | 4.5 | **FAIL** |
| "All fields required" note | #aaa on #fff | 2.32 | 4.5 | **FAIL** |
| Nav links | rgba(255,255,255,.72) on navy | 6.05 | 4.5 | pass |
| Estimator panel small print | rgba(255,255,255,.60) on navy | 6.10 | 4.5 | pass |
| Muted hint text | #6b7280 on #f6f8fc | 4.55 | 4.5 | pass |
| Gold on navy | #C9A84C on #001830 | 7.83 | 4.5 | pass |

**Fix:** Introduce a darker gold for use on light grounds — around `#8A6D1F` reaches 4.6:1 on white and reads as the same brand colour. Keep `#C9A84C` for dark grounds, where it performs well. Change `#aaa` to `#6b7280`.

**Impact:** The failures are on the elements carrying the most visual weight in the offer — the service numbers and the three statistics the services page is built around. _Confidence: high — measured._

#### [A‑04] Three smaller accessibility defects — _Standards_

- **Skip link on 1 of 25 pages.** Only `/compare/` has one. Every other page makes a keyboard user tab through seven navigation links before reaching content.

- **`aria-live="polite"` on the whole estimator result panel**, which is re-rendered on every keystroke in every field. A screen-reader user typing in the notes box hears the entire price panel re-announced repeatedly. Scope the live region to the range element alone, and debounce.

- **Contact page heading hierarchy jumps H1 → H3** with no H2.

### Findability

#### [F‑01] No page has a social share image, and LinkedIn is the stated distribution channel — _Standards_

Not one of the 25 pages carries an `og:image`. The site contains zero images of any kind. `twitter:card` is set to `summary`, the small variant. Every link shared to LinkedIn — the channel the Knowledge page directs readers to five times and the one the practice publishes on first — renders as a bare text card.

**Fix:** Generate a 1200×630 image per page from the existing design system: navy ground, page title in Playfair, the M mark, and one figure from the page. Twenty minutes of templating covers all 25. Set `twitter:card` to `summary_large_image`.

**Impact:** Directly multiplies the return on the channel the practice's content strategy depends on. This is the highest ratio of effect to effort in this section. _Confidence: high on mechanism._

#### [F‑02] The two assessment pages contain almost no indexable content — _Standards_

```
explore-your-ai-readiness ......... 311 static words · 1 H1 · 0 H2 · 0 H3
extensive-ai-readiness-analysis ... 331 static words · 1 H1 · 0 H2 · 0 H3

All 28 and 60 questions, all dimension names and all recommendations live
in JavaScript. Sitemap priority for the first: 0.9.
```

"AI readiness assessment" is almost certainly the highest-intent term this practice can rank for, and the two pages built for it are, to a crawler, a headline and a form. Meanwhile the pages with genuinely rankable depth — the Article 4 briefing, the Compare page — sit at priority 0.8 and 0.9 and are absent from the top navigation.

**Fix:** Render the ten dimension names and their descriptions as static HTML above or below the tool, with real headings. Add a short static "what this assessment covers and what the score means" section. Add FAQ and SoftwareApplication schema. Neither change touches the tool's behaviour.

#### [F‑03] Titles and descriptions are written past the length search engines display — _Standards_

| Page | Title chars | Description chars |
| --- | --- | --- |
| Home | **86** | **275** |
| Services | 28 | **263** |
| Compare | 38 | **216** |
| For Investors | 45 | **213** |
| Readiness Check | 38 | **206** |
| EU AI Act Article 4 | **80** | 187 |
| Claude in Chrome | **69** | 171 |
| Claude for Business | **79** | 133 |

Practical limits: ~60 characters for titles, ~155 for descriptions.

Also missing sitewide: any `schema.org` structured data — no Organization, no Service, no FAQPage, no BreadcrumbList. For a consultancy with a defined service catalogue and a page full of answerable questions, that is a straightforward omission.

### Craft and performance

#### [C‑01] The site assistant is 172 KB and ships on every page — _Standards_

```
assets/chat.js .... 171.8 KB (37 knowledge-base entries, EN/FR/AR)
assets/site.css ...  20.3 KB

Total per page, uncompressed:
  home ......... 214.7 KB   (chat.js is 80% of it)
  services ..... 215.3 KB
  estimate ..... 235.6 KB
  extended ..... 258.9 KB
```

It is deferred, so it does not block rendering, but a keyword-matching lookup table with 37 entries is three to eight times the weight of the page it sits on, and it is downloaded by every visitor on every page whether or not they open it. On a 3G connection in a field office — a plausible scenario for parts of this audience — that is the dominant cost of the page.

**Fix:** Load the widget's launcher only, and fetch the knowledge base on first click. Or split the three language packs and load one on demand. Either halves or quarters the payload for the large majority who never open it.

#### [C‑02] Two design systems, visibly — _Standards_

Fifteen pages use `assets/site.css`. Ten do not: the contact page, both assessments, the three reference articles and the redirects carry their own inline CSS, their own colour declarations, Material Symbols icons, gradient text effects, animated badge dots and Title Case headings. The README documents this as intentional. It is still visible to the reader — the contact page, which is where every "Book a call" lands, looks like a different company's page from the one that sent them there.

**Fix:** Rebuild the contact page on `site.css` first, since it terminates every primary journey on the site. The assessments can follow; the articles can wait.

#### [C‑03] Twenty-five pages, zero images — _Standards_

An all-typographic site is a legitimate aesthetic choice and this one is executed with more discipline than most. But the cost is being paid in four places at once: no principal photograph (B‑05), no social cards (F‑01), no visual differentiation between 1,500-word pages that all share one layout, and no way to _show_ the sample playbook, the assessment report or the tool inventory — the three artefacts the entire offer is built on, all of which are currently described in prose rather than shown.

**Fix:** Four images would do most of the work: a principal photograph, a screenshot of a real assessment report page, a photograph or clean render of a printed playbook, and the social-card template. Everything else can stay typographic.

**Impact:** "See what a department receives" currently leads to a page that describes the deliverable in HTML. Showing the artefact is the single most persuasive move available to a practice selling a documented output. _Confidence: moderate-high._

## The order I would do this in

Sequenced by return, not by section. The first block is a week's work and changes the site's economics; everything after it is improvement rather than repair.

| # | Do this | Refs | Effort | Why first |
| --- | --- | --- | --- | --- |
| 1 | **Install cookieless analytics and instrument seven events** | B‑02 | 2 h | Nothing below can be evaluated without it |
| 2 | **Put a real scheduler on the contact page**; add a phone number or drop the phone option | B‑01 | 3 h | 15 buttons stop lying; the multi-day gap closes |
| 3 | **Name and show the principal**; itemise the nine certifications; unblock the assistant | B‑05, M‑01 | 1 d | The largest trust gap, and it unlocks four other fixes |
| 4 | **Fix the two estimator data-loss and numbering bugs**; send the visitor their copy | M‑07/08/09 | 3 h | Straight defects on the conversion tool |
| 5 | **Link the assessment result to the service it names** | M‑14 | 30 m | Highest ratio of effect to effort on the site |
| 6 | **Save assessment progress; move the profile block below the questions** | B‑06 | 4 h | Stops catastrophic loss on a 30-minute task |
| 7 | **Mobile price bar on the estimator** | B‑04 | 3 h | Restores the tool's whole reason to exist on phones |
| 8 | **Rewrite the privacy policy to match reality; add a `/terms/` page** | M‑12, M‑13 | 1 d | Removes an objection your best-qualified buyer will find |
| 9 | **Price the 200–500 and 500+ bands** | B‑03 | 2 h | Serves the largest prospects the site claims |
| 10 | **Keyboard access and form labels on the three data-capture surfaces** | A‑01, A‑02 | 4 h | Public-sector procurement, and it is simply correct |
| 11 | **Social card template + darker gold + remove internal `_blank`** | F‑01, A‑03, M‑17 | 4 h | Cheap, visible, compounding |
| 12 | **Navigation revision; rename the three assessments; unify CTA labels** | M‑15/16/18 | 1 d | Comprehension, once the mechanics work |
| 13 | **Publish three real articles or unlink Knowledge**; source or cut the playbook claim | M‑02, M‑04 | ongoing | An empty shelf is worse than no shelf |
| 14 | **Editorial pass: en-GB, duplicated paragraph, "10 × 60", contact page on `site.css`** | M‑19, C‑02 | 1 d | Makes one practice out of visible layers |

## The thing I would say if I could only say one

The site is written as an argument to be read in full by someone who has already decided you might be worth taking seriously. That reader exists, and for them this site is excellent — better sourced, more honest about its limits, and more specific about its deliverables than almost anything else in this market. The Compare page in particular does something very few consultancies have the nerve to do, and the About page's list of five reasons not to hire you is more persuasive than any testimonial on the site.

But the site has almost no answer for the reader who has _not_ decided that yet. That reader wants three things in the first thirty seconds — who is this person, what does it cost, and how do I speak to them — and the site answers none of them: no name, no price without operating a tool, and a "book" button that opens a form. Everything in Section 02 is a version of that single failure.

The gap is not writing. It is that the site was built as a document and needs to work as a product. Fix items 1 to 5 in that table and you will have both.

M.A.I. Consulting website · UX and conversion audit · 6 September 2026

Basis: full read of 25 HTML pages, assets/site.css and assets/chat.js; internal link graph;
reconstruction of the estimator pricing model; sixteen computed WCAG 2.1 contrast ratios.

Impact statements are mechanism-and-direction, not forecasts. No conversion figure in this document is measured,
because the site currently measures nothing — which is finding B‑02.

Privacy and procurement observations are not legal advice.
