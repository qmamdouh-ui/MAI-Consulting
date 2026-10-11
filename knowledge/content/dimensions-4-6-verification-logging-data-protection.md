---
slug: dimensions-4-6-verification-logging-data-protection
title: 'AI readiness dimensions 4-6: verification, logging, data protection'
summary: What a low score looks like on verification, logging and data protection, with a quick diagnostic for each and why data protection needs continuing oversight rather than a one-off fix.
short_slug: ai-readiness-dimensions-4-6-verification-logging
featured: false
service: assessment
format: Guide
level: Practitioner
date: '2026-09-13'
author: M.A.I. Consulting
series: kb-2a
tags:
- readiness score
- verification
- logging
- data protection
- diagnostics
related:
- dimensions-1-3-fluency-delegation-practice-description
- data-classification-from-zero
linkedin_url: ''
source_ref: 'mai-kb tree #18 / draft 7502871493031325696'
cluster: 2A Getting a baseline
---

We diagnosed the first three dimensions last time, the ones an Ops team meets every day because they sit closest to the surface. This piece takes the next three, and they sit closer to a different desk. Verification, logging, and data protection are the ones a DPO cares about most, because they are the dimensions where a low score does not just slow work down. It creates the conditions for an incident.

The same treatment applies: what a low score actually looks like, not just the definition.

## Verification: what a low score actually looks like

A low verification score looks like an output being used because it read confidently, not because anyone checked it against a source. It looks like a workflow with no defined check step at all, so verification happens only when someone happens to feel uncertain, which is precisely when confident-sounding wrong answers are least likely to trigger that feeling. It looks like the person with the domain knowledge to catch an error never seeing the output before it goes out the door.

The fix is procedural, not cultural: name the check step, name who does it, and put it before the point where the document leaves the building, not after.

## Logging: what a low score actually looks like

A low logging score is invisible until someone asks the question that matters: did AI touch this document, and if so, how? A low score means nobody can answer with certainty. The record, if it exists at all, lives in one person's memory of a Tuesday three months ago, which is not a record.

This is the cheapest of the three to fix and the easiest to let slide, because there is no immediate cost to skipping it, right up until the day there is. A line in a shared log, added at the time rather than reconstructed afterwards, closes almost all of the gap.

## Data protection: what a low score actually looks like

A low data protection score looks like staff pasting a document into a general-purpose tool without checking, or knowing, which of the four classes it falls into. We have written before about that four-class table: Public, Internal, Confidential, Restricted. A low score here means the table exists on paper and nobody consults it before pasting, because the classification step has never been attached to the moment the decision is actually made.

The honest answer, asked directly, is usually "I didn't think about it," which is not carelessness so much as a missing habit: the classification question was never built into the two seconds before someone hits paste.

## Three quick diagnostics, one per dimension

- **For verification.** Ask to see the last AI-assisted output used in a real decision, and ask who checked it against the source before it went out. "Nobody, it looked right" is the low score.
- **For logging.** Pick one specific task from last week and ask whether AI was used on it. If nobody can answer with certainty either way, the logging dimension is low, regardless of what the policy says should happen.
- **For data protection.** Show someone a real document and ask which of the four classes it falls into, and whether they would paste it into the tool they use most. Hesitation or a wrong classification is the tell.

> The dimension that matters least on a good day is the one that matters most on a bad one.

## The trade-off these three do not share

Verification and logging are both procedural fixes: name the step, put it in the workflow, enforce it. Neither requires deep expertise to close, only discipline, and both respond to a checklist backed by actual enforcement rather than a training session nobody follows up on. Data protection is different in kind, not just degree. It requires staff to correctly apply a classification judgement in real time, under the same time pressure that produces every other shortcut, and a single mistake here, a beneficiary record pasted into the wrong place, is not symmetric with a missed log entry. It deserves closer, ongoing oversight, not the same one-off session as the other two.

## The practical takeaway

**Fix verification and logging with a named checklist step and real enforcement; treat data protection as the one of the three that needs continuing oversight, because the cost of a single mistake here is not the same as the cost of a missed log entry.**

*No external statistic cited; this article extends the organisation's own assessment methodology and references its own prior data classification work rather than presenting third-party evidence.*
