---
slug: language-equity-ai-quality-in-arabic-and-french-and-what-it-means
title: "Language equity: AI quality in Arabic and French and what it means for international work"
short_slug: language-equity-ai-arabic-french
summary: 'An AI tool has a different quality level for each language, register and subject, so an English pilot proves little. The Three-Layer Language Test checks register, dialect and domain with native speakers.'
service: assessment
format: Framework
level: Practitioner
date: '2026-10-19'
author: M.A.I. Consulting
series: ai-consulting
tags:
- Multilingual
- Arabic
- InternationalDevelopment
- DigitalInclusion
- AIAdoption
related:
- translation-review-not-translation
- reading-a-vendor-benchmark-without-being-taken-in
- the-near-miss-log-ai-risk-management-small-organisations-will
linkedin_url: ''
source_ref: 'ai-consulting queue #17 (https://www.linkedin.com/article/edit/7508803565268713472/)'
featured: false
---

Most AI adoption plans quietly assume one language. The pilot runs in English, the staff survey is in English, the demonstration impresses everyone in English, and the rollout is then declared organisation-wide. A great deal of international and humanitarian work does not happen in English. It happens in Arabic, French, and the dialects, registers and technical vocabularies inside them. If the quality of an AI tool differs by language, so does the quality of the work it touches, and so does who benefits.

This is a management question before it is a technical one. When some colleagues get a strong assistant and others a mediocre one, the organisation has created an equity gap that nobody chose. Language should be a first-class criterion in every adoption decision, tested and recorded like any other risk.

*An AI tool does not have one quality level. It has one quality level per language, per register and per subject.*

## What the evidence says, and what it does not

The published evidence is consistent in direction, though still thin in coverage. Recent academic benchmarks of Arabic-capable models, including the DialectalArabicMMLU benchmark presented at LREC 2026, find that models perform worse on regional dialects than on Modern Standard Arabic. A separate 2026 benchmark, "Arabic Prompts with English Tools", reports a consistent drop in tool-calling accuracy, averaging roughly 5 to 10 percent and often higher in specific scenarios, when the same request is issued in Arabic rather than English.

Two cautions apply. These studies test particular models at a particular moment, and models improve quickly, so no single figure should be treated as permanent. And much of the work is on smaller open-weight models, not on the leading commercial assistants your staff are more likely to use. The defensible conclusion is narrow: a gap has been measured, its size varies, and you cannot assume it is zero for your language, your dialect or your subject. For French the picture is generally stronger because of the volume of French text available, but specialised vocabulary and regional usage can still trip a tool up.

## The Three-Layer Language Test

Test a tool on three layers, because it can pass one and fail the next.

- **Register.** Does it write at the level your document needs? A formal letter to a ministry, a donor report and a message to community volunteers call for different registers, and tools often flatten them into one polite, generic tone.
- **Dialect.** Does it understand and produce the variety your staff and partners actually use, not only the standard written form? Field teams and beneficiaries rarely speak the standard form found in textbooks.
- **Domain.** Does it handle the specialised vocabulary of your work, such as trade, protection, health, agriculture or public finance, including the accepted translations of institutional terms in your own glossary?

A tool that writes fluent standard Arabic can still mistranslate a programme term. A tool that handles French well can still use metropolitan phrasing where your partners expect a regional or institutional form. The test is a short structured exercise, not a research project: take ten real documents, ask native-speaking colleagues to mark errors by layer, and record the result.

> A fluent answer in the wrong register is more dangerous than a clumsy one, because it looks finished.

## Why this matters for international organisations

- **Verification cost is unevenly distributed.** If the tool is weaker in Arabic, the colleagues who read Arabic spend more time checking, and the productivity gains reported in the English pilot do not transfer.
- **Training materials become a hidden barrier.** Guidance written only in English tells staff who work in other languages that the programme was not designed for them, and they adapt by using tools privately, without the shared workflows the organisation intended.
- **Quality of service to beneficiaries can diverge.** When a translated notice, a triage message or a plain-language summary is produced in a language the tool handles less well, the people least able to challenge it receive the weakest output.

There is a positive side. Where a tool performs well, drafting in a colleague's stronger working language, or checking a translation, can let capable people contribute who were held back by English. That benefit is only real if it has been tested, not assumed.

## What to do on Monday

Start with a language inventory: which languages does the organisation work in, which of them does each AI tool support, and where is that support verified rather than advertised? Then run the Three-Layer Language Test on the two or three workflows where a language error would do the most harm, such as anything that goes to beneficiaries, funders or partner governments.

Set a rule for the results. A workflow passes for a language only if a native speaker with subject knowledge has reviewed a sample, and the review is dated and kept. A workflow that fails is not banned, but it goes through human review by default until it passes a later test. Retest whenever the tool or the model changes, since quality moves in both directions.

Budget for it. Native-speaker review is a cost, and pretending the English pilot covers everyone simply moves that cost onto individual staff.

## Questions for your next leadership meeting

- In which languages do we work, and for which of them has anyone tested our AI tools rather than trusted the vendor's language list?
- Which outputs reach beneficiaries or partners in a language we cannot review ourselves?
- Who owns language quality as a standing risk, and when did we last retest?

## The bottom line

**Treat language as a quality dimension of every AI decision: test each tool by register, dialect and domain with native speakers, record the result, and route anything untested through human review.**

## Your next step

List the languages you work in, pick the two workflows where a language error would do most harm, and run the Three-Layer Language Test on ten real documents this month.

## Sources

DialectalArabicMMLU (LREC 2026, ACL Anthology 2026.lrec-1.251; arXiv 2510.27543). "Arabic Prompts with English Tools: A Benchmark" (arXiv 2601.05101). The findings are measured gaps on tested models, not permanent or universal. The Three-Layer Language Test is a framework proposed by M.A.I. Consulting.
