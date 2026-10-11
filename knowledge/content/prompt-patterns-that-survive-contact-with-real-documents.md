---
slug: prompt-patterns-that-survive-contact-with-real-documents
title: Prompt patterns that survive contact with real documents
summary: Four structural prompt patterns that hold up on messy real documents, including showing the actual template, naming what to ignore, requesting uncertainty flags and chunking long files.
short_slug: prompt-patterns-for-real-documents
featured: false
service: training
format: Guide
level: Practitioner
date: '2026-09-20'
author: M.A.I. Consulting
series: kb-3b
tags:
- prompting
- document handling
- task redesign
- practical guide
related:
- task-decomposition-finding-the-handover-point
- the-verification-tax-what-checking-costs-and-when-it-exceeds-the
linkedin_url: ''
source_ref: 'mai-kb tree #41 / draft 7502962488901005312'
cluster: 3B Task-level redesign
---

Naming a handover point, as the last two pieces in this series covered, assumes the tool actually produces something usable at that point. It does not, if the prompt getting it there was written like a demo. Most people learn to prompt from clean, short, obviously-structured example text, and almost no real document in an NGO looks like that: it is a scanned PDF with a wonky header, three donors' worth of inconsistent report templates, redacted names, and a footer repeating on every page.

This piece is a set of patterns that hold up against that mess, not clever tricks, but structural fixes for the specific ways real documents break a prompt that only ever saw tidy demo text.

## Why demo prompts fail on real files

A demo prompt works because the example text is short, complete, and has an obvious structure the model can infer without help. A real file is none of those things: it is long, it repeats itself, it mixes several document types under one file name, and important information sits next to boilerplate the model has no way of distinguishing from content unless told. A prompt tuned only on the demo has learned nothing about any of that, and it fails silently rather than with an error, which is the more dangerous failure mode.

## Patterns that hold up on messy documents

- **Show the model the actual structure before asking it to use it.** Paste a real example of your organisation's header, section labels, or template layout rather than assuming the model will infer your specific format from a generic instruction; "extract the budget line" means something different in every donor's template.
- **Name what to ignore, not just what to extract.** Letterheads, repeated page footers, superseded draft watermarks, and boilerplate legal text confuse extraction far more often than the actual content does, and telling the model to ignore them by name is more reliable than hoping it works that out.
- **Ask for the extraction and the uncertainty flag together.** "Extract the total grant amount; if you cannot find it stated explicitly, say so rather than estimating" prevents the model from confidently guessing a number that was never actually in the document, which is a much harder error to catch than a visible blank.
- **Chunk long documents deliberately instead of letting length quietly degrade quality.** A forty-page report handed over in one prompt does not fail with an error, it fails by getting steadily less accurate towards the end, and working through it section by section with page or heading anchors keeps that decay from being invisible.

> A prompt that only works on clean text has learned nothing about the job.

## The trade-off in writing prompts this way

Writing a prompt with named exceptions, an explicit ignore-list, and a section-by-section structure takes longer than typing a quick throwaway instruction, and for a genuinely short, clean document that extra structure is often wasted effort. The honest answer is that the throwaway prompt's real cost is invisible until it meets a messy file, at which point it does not error, it just produces a wrong answer that looks plausible, and that is a worse failure than a slower prompt because nobody is prompted to go back and check it, which is exactly the verification tax this series covered in the last piece.

## The practical takeaway

**Write prompts against your real documents, not demo text: show the actual structure, name what to ignore, ask for uncertainty flags alongside extractions, and chunk long files deliberately rather than trusting one long prompt to hold its accuracy to the end.**

*No external statistic cited; this article presents an internal practical guide rather than third-party evidence.*
