---
slug: monitoring-and-evaluation-where-ai-helps-and-where-it-corrupts
title: 'Monitoring and evaluation: where AI helps and where it corrupts the data'
short_slug: monitoring-evaluation-ai-data-integrity
summary: 'AI can draft M&E narrative and charts from settled data, but outlier calls, gap-filling, causal claims and summary categories must stay human or the dataset is quietly corrupted.'
service: training
format: Analysis
level: Advanced
date: '2026-09-22'
author: M.A.I. Consulting
series: kb-3c
tags:
- monitoring and evaluation
- data integrity
- role patterns
- trade-off
related:
- ai-assisted-research-a-programme-officer-can-defend
linkedin_url: ''
source_ref: 'mai-kb tree #46 / draft 7502982372183773184'
cluster: 3C Role-specific patterns
---

The last piece in this series was about keeping AI-assisted research traceable back to a source. Monitoring and evaluation raises the same risk one level up: M&E is a data-integrity discipline first and a reporting discipline second, and the moment AI assistance touches the data layer rather than the reporting layer, a corrupted number can enter a dataset looking exactly as legitimate as a correct one. Nobody catches a fabricated citation by reading it twice. Nobody catches a silently smoothed data point either, and this dataset gets used to decide whether a programme continues, scales, or closes.

This piece draws the line between where AI genuinely helps in M&E work and which specific steps have to stay human regardless of how capable the tool gets.

## Where AI helps without touching the data

AI assistance is genuinely useful on the reporting layer sitting on top of already-verified data: drafting the narrative sections of an M&E report from an approved data table, generating a first-pass visualisation from clean figures, writing the standard methodology boilerplate that appears in every quarterly report, or reformatting a dataset for a different funder's template. None of this changes a single underlying number, which is exactly why it is safe.

## Where AI corrupts data without anyone noticing

The risk sits specifically in tasks that look like tidying but are actually judgement calls: interpolating a missing survey response as though it were real data, summarising a spread of answers into a single confident sentence that quietly drops the distribution, or inferring a causal story from a correlation because a causal story reads better in a report. Every one of these produces output that looks more polished than the raw data did, which is precisely what makes the corruption invisible until someone tries to reconcile this year's figures against next year's and finds they no longer mean the same thing.

## Which M&E steps must stay human

- **Deciding what counts as an outlier versus a valid extreme data point.** This decision needs domain judgement about the programme and the context; a model has no way to distinguish a data-entry error from the one household that genuinely did have an unusual outcome.
- **Filling any genuine gap in the data.** A missing value handled by a visible, justified estimate is a defensible judgement call; the same gap silently interpolated by a model is corruption wearing the shape of a complete dataset.
- **Inferring causation from correlation.** M&E data is overwhelmingly correlational, and the step of claiming one thing caused another belongs to a person who can be asked to defend that claim, not to a model that will produce a plausible-sounding causal sentence whether or not the evidence supports it.
- **Translating raw survey or qualitative responses into a summary category.** Compressing "60% agreed, 25% disagreed, 15% were unsure" into "most respondents agreed" is not a simplification, it is a different, less honest dataset, and the person doing that translation needs to own the judgement about what was lost.

> A summary that hides the distribution is not a simplification. It is a different dataset.

## The trade-off in keeping these steps human

Keeping these four steps human costs real M&E lead time, and it costs the most during the busiest reporting periods, which is exactly when the temptation to let a fast, capable tool touch the raw data is strongest. The honest answer is that this is precisely the wrong moment to relax the boundary: an M&E dataset compounds silently across reporting cycles, so a corrupted baseline this year becomes a corrupted comparison next year, and by the time anyone notices, the affected decisions about programme continuation or scaling have already been made on bad data.

## The practical takeaway

**Let AI draft the narrative and visualise the numbers once the data is settled, but keep outlier judgement, gap-filling, causal claims, and the translation of raw responses into summary categories entirely human, because these are the specific points where a dataset can be quietly corrupted in a way that looks like tidying.**

*No external statistic cited; this article presents an internal trade-off analysis rather than third-party evidence.*
