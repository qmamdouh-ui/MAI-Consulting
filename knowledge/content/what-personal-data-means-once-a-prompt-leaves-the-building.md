---
slug: what-personal-data-means-once-a-prompt-leaves-the-building
title: What "personal data" means once a prompt leaves the building
short_slug: personal-data-once-a-prompt-leaves
summary: 'Personal data is wider than names and numbers, and a prompt''s fate depends on account tier, retention and sub-processors; a technical explainer for DPOs and IT leads, with four questions to ask any tool.'
service: policy
format: Explainer
level: Advanced
date: '2026-09-27'
author: M.A.I. Consulting
series: kb-4b
tags:
- personal data
- GDPR
- data protection
- technical explainer
related:
- dpia-and-ai-when-an-impact-assessment-is-triggered
- beneficiary-data-and-ai-the-question-with-no-comfortable-answer
- permitted-use-by-role-the-table-that-does-the-work
linkedin_url: ''
source_ref: 'mai-kb tree #61 / draft 7503053391850323968'
cluster: 4B Data and disclosure
---

The last piece in this series set out a trigger test for when a formal impact assessment is required. That test only works if the underlying question it depends on is answered correctly first: what actually counts as personal data. Most staff carry a narrow, everyday definition in their heads, names, email addresses, phone numbers, and paste a paragraph into an AI tool without a second thought as long as none of those obvious markers appear in it. The legal and technical definition is considerably wider, and getting that gap wrong is what quietly undermines every permission this series has built so far.

This piece is a technical explainer, not a legal opinion, aimed at the DPOs and IT leads who have to answer the question precisely rather than approximately.

## The narrow definition people default to

Ask most staff what personal data means and the answer arrives instantly: a name, an email address, a phone number, a national ID number. It is a reasonable shorthand for everyday conversation, and it is exactly why a paragraph with none of those markers in it still feels safe to paste into a chat window. The shorthand is not wrong so much as radically incomplete, and the gap between it and the actual definition is where most accidental exposure happens.

## What the broader definition actually includes

Under the GDPR framework most European and Swiss organisations work within some version of, personal data is any information relating to an identified or identifiable natural person, and identifiable is doing most of the work in that sentence. A case reference number, a job title combined with a location and a date, a device or IP identifier, an employee number, or even a distinctive turn of phrase quoted from an internal complaint can each make a specific person identifiable, on their own or combined with other information already available. Pseudonymised data does not escape the definition either. If re-identification is realistically possible using information reasonably available to the organisation itself, the data stays personal data in the eyes of the regulation, a point this series has already made once, in the piece on beneficiary data, about how unreliable de-identification actually is in a small or tight-knit context.

## What actually happens to a prompt once it leaves the building

A prompt travels to the vendor's API endpoint, sometimes through an extra layer, a browser extension, a plugin, a third-party integrator sitting between the user and the model. What happens next depends entirely on the specific account tier and its settings: some tiers keep data out of model training by default, others do not, and the same vendor can offer meaningfully different terms to a free user and an enterprise customer for what looks like the same product. This is exactly why an earlier piece in this series argued that a safeguard has to be checked directly rather than assumed from a vendor's marketing page. A one-line reassurance that "we don't train on your data" says nothing at all about how long a prompt is retained for abuse monitoring, or who inside the vendor's own organisation can see it.

## Four questions worth asking about any tool before treating a prompt as safe

- **Does this specific account tier keep data out of training**, since consumer and enterprise tiers from the same vendor often carry entirely different defaults behind an identical-looking interface.
- **Where is the data processed and stored**, since data residency shifts which law actually applies, and that matters directly for an organisation bound by Swiss or EU data protection rules.
- **How long is a prompt retained after the response comes back**, since a clean answer on training says nothing about retention for logs, debugging, or abuse review.
- **Who else can see it**, sub-processors, the vendor's own support and abuse-review staff, any third-party plugin sitting in the pipeline, since data protection responsibility does not stop at the first hop a prompt makes.

> The question is never just what a tool does with data. It is what counts as data in the first place, and that definition is wider than names and numbers.

## Why the wider definition changes the permitted-use table

A permitted-use table built on the narrow, everyday definition of personal data will under-classify exactly the tasks that need the most care: summarising an internal complaint that quotes a colleague verbatim, tidying a case note with two or three indirect identifiers, drafting a reference that combines a job title, a department and a date. None of that reads as "personal data" under the narrow definition, and all of it is personal data under the actual one. Getting the definition right at the start is what makes every permission and every red line built on top of it mean what it is supposed to mean.

## The practical takeaway

**Treat personal data as anything that could make a specific person identifiable, directly or indirectly, not just names and obvious identifiers, verify each tool's actual training, retention and sub-processor terms at the account tier your organisation actually uses, and revisit the permitted-use table with the wider definition in mind rather than the narrow one most staff carry by default.**

*No external statistic cited; this article presents an internal technical explainer rather than third-party evidence. General personal-data criteria described here follow the commonly cited GDPR framework; readers should confirm current requirements with their own regulator or counsel.*
