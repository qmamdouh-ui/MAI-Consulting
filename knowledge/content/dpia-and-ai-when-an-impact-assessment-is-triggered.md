---
slug: dpia-and-ai-when-an-impact-assessment-is-triggered
title: 'DPIA and AI: when an impact assessment is triggered'
short_slug: dpia-and-ai-when-triggered
summary: 'A practical trigger test for when an AI use case needs a data protection impact assessment, so a DPO does a few properly instead of running one on everything or none at all.'
service: policy
format: Framework
level: Advanced
date: '2026-09-27'
author: M.A.I. Consulting
series: kb-4b
tags:
- DPIA
- GDPR
- data protection
- decision framework
related:
- beneficiary-data-and-ai-the-question-with-no-comfortable-answer
- safeguarding-language-checks-a-use-case-worth-writing-once
- the-six-month-review-cycle-and-what-triggers-an-early-one
linkedin_url: ''
source_ref: 'mai-kb tree #60 / draft 7503048136349806592'
cluster: 4B Data and disclosure
---

The last two pieces in this series looked at beneficiary data and at what an organisation says about its AI use. This piece is about a more formal instrument that sits behind both: the data protection impact assessment. Two failure modes show up around DPIAs almost as often as each other. One organisation runs a full DPIA on every AI use, however routine, until the process becomes a box-tick nobody reads and the DPO's real capacity gets spent on the wrong things. The other assumes none of its AI use rises to that level, until a genuinely high-risk use case goes live with no formal assessment behind it at all. Neither is a considered position. Both are what happens when nobody has written down a clear trigger test.

This is general orientation, not legal advice, and the exact trigger list varies by regulator and jurisdiction, a Geneva-based organisation working across Swiss and EU frameworks should confirm the current position with its own DPO or counsel. But the underlying logic of the trigger test travels well, and it is worth setting out plainly.

## What a DPIA actually is, in one sentence

A DPIA is a structured assessment of how one specific processing activity affects individuals' data protection rights, carried out before that processing starts. It is not the organisation's general AI policy, and it is not a one-off exercise covering the whole data protection programme. It attaches to a particular use of a particular tool on particular data, which is exactly why a blanket "we did a DPIA" answer usually means the real question has not actually been asked yet.

## The trigger, in practical terms

Under the GDPR framework most European and Swiss organisations work within some version of, a DPIA becomes mandatory when processing is likely to result in a high risk to individuals, and that usually means one or more of: processing special category data, health status, protection status, biometric data, at meaningful scale; systematic profiling that produces a decision with a legal or otherwise significant effect on a person; or the use of a genuinely novel technology in a way regulators have not already assessed as low-risk. Most regulators also publish their own list of processing types they consider mandatory by default, and that list is the one worth checking directly rather than relying on general guidance like this piece.

## Running it against this series' own examples

Plain-language rewriting of an internal memo does not trigger a DPIA; nothing about it touches special category data or produces a significant effect on anyone. A safeguarding language check on outward-facing content, reviewed in the last piece, sits in a similar place, it checks wording, not the underlying case data itself. Beneficiary case data at meaningful scale, the subject of two pieces ago, sits much closer to the trigger, particularly wherever it touches protection status or health information. And any AI-assisted screening that produces an eligibility decision, who gets admitted to a programme, who is flagged for further review, is close to the clearest trigger of all: a systematic decision with a significant effect on the person it is made about.

## Signals worth treating as a prompt to check, even short of an automatic yes

- **Special category data at any real scale**, health, protection status, or biometric information, rather than a single incidental mention.
- **A decision with a significant effect on a person**, an eligibility outcome, a flag for further scrutiny, anything that changes what happens to them next.
- **A new tool or vendor nobody in the organisation has formally assessed before**, since an untested processor is itself part of the risk being evaluated.
- **Processing beneficiary data in a context where consent was never realistically available**, the exact condition the beneficiary data piece in this series treated as the hardest case.

> A DPIA is a triggered obligation, not a blanket one. Running it on everything dilutes the DPO's attention from the one use case that actually needed the scrutiny.

## What skipping the trigger test costs either way

Running a DPIA on every AI use exhausts a DPO's limited time on routine, low-risk tasks, and a document produced under that kind of volume gets treated as paperwork rather than genuine assessment, which defeats the point of doing one at all. Running none leaves the organisation's highest-risk processing, exactly the kind this series has flagged repeatedly, beneficiary data, eligibility decisions, unassessed until something forces the question. The trigger test is what lets an organisation do a small number of DPIAs properly rather than a large number badly, or none at all.

## The practical takeaway

**Run the DPIA trigger test against each specific AI use case rather than the organisation's AI policy as a whole, treat special category data at scale, significant-effect decisions, untested tools, and unavailable consent as the clearest prompts to check, and confirm the current mandatory list with your own regulator or counsel rather than relying on general guidance.**

*No external statistic cited; this article presents an internal decision framework rather than third-party evidence. General DPIA trigger criteria described here follow the commonly cited GDPR Article 35 framework; readers should confirm current requirements with their own regulator or counsel.*
