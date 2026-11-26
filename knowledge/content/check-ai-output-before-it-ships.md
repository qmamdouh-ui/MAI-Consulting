---
slug: check-ai-output-before-it-ships
title: "Checking AI output before it ships: ten habits that cost minutes, not afternoons"
summary: "Read AI drafts as an editor, own what carries your name, check against the goal, recompute numbers, look for omissions in summaries, and build short checks and checkpoints into the work."
service: training
format: Guide
level: Practitioner
date: 2026-10-28
author: Mamdouh Alqudsi
series: fluency-foundations
series_order: 3
tags: [verification, review, diligence, checkpoints, discernment]
related: ["calibrate-trust-in-ai-output", "the-four-checks-before-anything-leaves-the-building", "the-verification-tax-what-checking-costs-and-when-it-exceeds-the"]
linkedin_url: ''
source_ref: "profile articles #93, #95, #96, #98, #99, #140, #141, #149, #152, #154 (newsletter eds 26, 28, 29); newsletter ed 33 (fluent-is-not-verified, make-claims-checkable, a-named-person-before-send)"
featured: false
---
An AI draft looks finished the moment it appears, and that is when mistakes get through. Picture a single unchecked number that makes it into a client email: finding it before sending would take thirty seconds, and finding it afterwards takes an afternoon of damage control. The scenarios in this guide are illustrative, not reports from client engagements.

This guide gives you ten practical habits for the review itself. For the question of how much to trust a given answer in the first place, see the companion guide on calibrating trust.

## 1. Read like an editor, not a customer

A customer reads a finished product and asks whether it is good enough to accept. An editor reads a draft and asks what is wrong with it before anyone else sees it. The same paragraph from an AI tool is waved through by the first mindset and caught by the second. The difference is which question gets asked first.

AI collapses the line between a draft looking finished and being correct more completely than a human draft usually does. In editor mode you:

- **Read for what is missing.** Notice whether a caveat, an exception or a source was left out of something that sounded complete.
- **Check the most confident claims first.** The most polished sentence is where an unverified assumption is easiest to smuggle through.
- **Ask what would have to be true for this to be wrong.** Then try to break it on purpose, assuming a real flaw will not announce itself.

> A customer's job ends when the draft looks finished. An editor's job starts exactly there.

## 2. Check against the goal, not just the instruction

Suppose an AI tool is asked to shorten a report to under 500 words. It returns 498 words, technically compliant, with the paragraph that mattered most cut to one vague sentence. The instruction was followed to the letter. The goal, a shorter report that still works, was missed.

Watch for three forms of this:

- **A length limit hit exactly at the cost of what mattered.** The instruction said short. It did not say which parts were safe to remove.
- **A rule applied without its obvious exception.** Told to always include a disclaimer, the tool adds one where it makes no sense, because the rule was never scoped.
- **A format matched while the substance drifts.** A five-bullet summary with five bullets, but the key point buried in bullet four because nothing ranked them.

A person usually infers the unstated goal. An AI tool optimises for the instruction as written unless the goal is spelled out. Better instructions help, but the fix is also to check the output against the goal every time the two could diverge. State the purpose in the prompt, then test the result against it.

## 3. Own the output

Suppose a factually wrong figure from an AI draft reaches a client-facing report. The first instinct is to explain that the tool got it wrong. That explanation does not change who sent the report. The person who reviewed, approved and signed it owns the mistake.

- **The review is the job.** A quick skim, justified by "it usually gets it right," turns diligence into a formality.
- **Disclosure does not transfer responsibility.** Saying AI helped draft something is honest, but accountability for what is wrong in the final version stays with you.
- **The standard is the same as for your own writing.** You would not submit your own unchecked first draft as final work.

This blurs with AI because a human collaborator's errors feel like theirs, while a tool's errors can feel like nobody's. With no one to blame, the checking quietly loosens. Nobody downstream asks which model made the mistake. They ask who signed off.

Ownership only works when it has a name attached. Microsoft's Copilot privacy page says responses "aren't guaranteed to be 100% factual" and that users "should still use their judgment when reviewing the output before sending them to others". A small team can turn that into a rule short enough to survive a busy week: internal notes get a self-check; anything external, financial or about a person gets a second reader, and that reader's name goes in the file.

## 4. Build the thirty-second check

The habit that would prevent the client-email mistake above is smaller than the mistake by orders of magnitude. Three versions:

- **Trace every number to its source before it leaves your hands.** One click back to the original document, not a mental note to check later.
- **Read the first and last sentence of anything long out loud.** Skimming misses tone problems and dropped context that a few seconds of reading aloud usually catches.
- **Ask what would have to be true for this to be wrong.** If the answer is "the source data was misread" or "the date range shifted," that is specific enough to check in under a minute.

The habit does not stick on its own because nothing bad happens the first ten times a check is skipped. The cost arrives on the eleventh, too far from the shortcut for the two to be connected. Build the check into the workflow before you need it.

## 5. Put checkpoints into long tasks

Imagine a long AI-assisted project that runs two hours before anyone looks at the output. An early wrong assumption has spread through every later step, and the work has to be redone from where it first appeared. One checkpoint an hour in would catch it.

Place checks:

- **After the first output, before anything builds on it.** An error at the foundation is the most expensive one to find late.
- **At each seam where the work changes kind.** Moving from research to drafting, or drafting to formatting, is already a pause, so checking costs little.
- **Wherever redoing a step would be expensive.** Those steps deserve a check wherever they fall.

A checkpoint does not need to be thorough. It needs to exist while catching a problem is still cheap. Momentum makes stopping feel slow, but skipping checks is what makes long tasks slow, later and by more.

## 6. Take five minutes before anything important is sent

Picture an email to a donor, drafted almost entirely by AI and ready to go. Five minutes spent on it first will cover three things:

- **Read it once as the recipient, not as the writer.** A draft that makes sense to the person who asked for it often does not make sense to the person who has to act on it.
- **Check every number and name against its source.** A wrong figure in a sent email cannot be quietly revised after it lands.
- **Cut the one sentence that sounds good but says nothing.** AI drafts often carry a smooth transitional sentence that adds length and no information.

Five minutes is short enough to survive a busy week. A longer review starts to cancel the time the quick draft saved, and people drop habits that erode their own benefit.

## 7. Recompute the number; a confident tone is not evidence

An AI summary can contain a figure that fits the surrounding text perfectly and is still wrong. Fluent writing and an accurate number come from different processes, so the first tells you nothing about the second.

- **Recompute independently.** Pull the source figures and do the sum separately. Re-reading the number repeats the same reasoning that produced the error.
- **Ask the tool to show its working.** A calculation laid out step by step is more likely to expose its own mistake than a bare final figure.
- **Build the check in calm moments.** The urge to trust a plausible number is strongest when time is short, which is when a wrong number costs most.

Confident and wrong is documented, expected behaviour. NIST's Generative AI Profile (NIST AI 600-1, July 2024) defines confabulation as systems that "generate and confidently present erroneous or false content", and adds that outputs "may also include confabulated logic or citations that purport to justify or explain the system's answer". The cost is real: in 2025 Deloitte Australia agreed to partially refund an AU$440,000 government contract after a report it produced was found to contain references to non-existent research and a fabricated quotation from a federal court judgment; the firm later disclosed that a generative AI model had been used in the work (City A.M. report). You do not need to verify every word. Check what would hurt if wrong: every citation, statistic, name, date and amount. Open each cited source, confirm it exists and says what the draft says, and recompute any number that drives a decision.

### Ask for the evidence before you check

Verification is faster when the draft is built to be checked. Anthropic's guidance on reducing hallucinations comes down to three prompting habits:

- **Give permission not to know.** Anthropic says explicitly allowing Claude to admit uncertainty "can drastically reduce false information". A line such as "if the document does not say, tell me so" costs nothing.
- **Ground the answer in quotes.** For long documents, ask for word-for-word quotes first and an analysis based only on those quotes, so every point traces back to the source text.
- **Make it retract what it cannot support.** After drafting, ask for a supporting quote for each claim and the removal of any claim without one, with the gap marked so a person sees it.

The same page is plain about the limit: these techniques "significantly reduce hallucinations, they don't eliminate them entirely". A draft with quotes attached and gaps marked turns the human check into a comparison instead of a search.

## 8. Read summaries for what they left out

Early on, the instinct is to scan a summary for something that looks wrong. With more use, the better question is what it omitted, because an omission never announces itself.

- **Check the omission, not only the error.** An accurate summary can still mislead if it drops the one caveat that changes the conclusion.
- **Go back to the source for anything that will inform a decision,** not only for anything that looks off.
- **Trust structure more than conclusions.** How a summary groups and orders material is usually sound. Its top-line conclusion is the part to double-check.

This calibration comes from repeated use across real documents, not from being told that summaries can be wrong.

## 9. Judge a first draft by how easy it is to improve

Ask for a two-page brief and receive three polished pages that say little, and the polish is the trap. A useful first draft:

- **States one clear main point early.** If you cannot say what it argues after the first paragraph, it is not ready to improve.
- **Marks claims that still need a source,** instead of giving every sentence the same confidence.
- **Leaves obvious room for your judgement,** such as context, priorities and what you actually recommend.

Asking for a shorter, plainer draft with open questions listed at the end keeps you in charge of what the brief finally says.

## 10. Make the check visible to a sceptic

A board member who is not told how a summary was made reads every number with an unspoken question mark. Arguing that the tool is reliable does not help. Making this output easy to check does:

- **Say which parts AI drafted and which a person checked.**
- **Show where one figure comes from,** by pointing to its source document.
- **Name the weakest part of the work yourself,** before you are asked.

## What to do next

- Before you send your next important email, spend five minutes reading it as the recipient and checking each number against its source.
- Before you accept your next AI draft, write one line answering "what is wrong with this?" and only then decide whether to use it.
- Add the goal to your prompts for anything with a limit (length, format, tone), and check the result against the goal, not the limit.
- Before sending anything with a figure, open the source and confirm each number.
- For any task longer than an hour, mark in advance where the first output and each change of work type will be checked.
- Agree with your team that the person who sends the work owns it, whichever tool drafted it, and that external work carries a named second reader.
- In your next prompt on a long document, ask for supporting quotes and for "not stated" where the document is silent.

## Sources

- NIST AI 600-1, Generative AI Profile (July 2024): https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- City A.M. on the Deloitte Australia refund: https://www.cityam.com/?p=2367690
- Anthropic, reduce hallucinations: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Anthropic support, incorrect or misleading responses: https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on
- Microsoft, Microsoft 365 Copilot privacy: https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy
