---
slug: nist-ai-rmf-applied-to-a-60-person-ngo
title: NIST AI RMF applied to a 60-person NGO
short_slug: nist-ai-rmf-small-ngo
summary: 'How a 60-person NGO can apply NIST''s four AI RMF functions (Govern, Map, Measure, Manage) at proportionate size, with a paragraph per tool and a review question instead of dashboards.'
service: assessment
format: Briefing
level: Advanced
date: '2026-09-29'
author: M.A.I. Consulting
series: kb-4d
tags:
- NIST AI RMF
- standards
- risk management
- regulatory explainer
related:
- iso-iec-42001-for-organisations-that-will-never-certify
- the-tool-inventory-the-least-glamorous-artefact-that-unlocks
- permitted-use-by-role-the-table-that-does-the-work
linkedin_url: ''
source_ref: 'mai-kb tree #67 / draft 7503092705229512704'
cluster: 4D Standards
---

The last piece in this series looked at ISO/IEC 42001 and argued that most organisations this series is written for should borrow its structure without pursuing certification. The US National Institute of Standards and Technology's AI Risk Management Framework sits in a different category entirely. It was never designed to be certified against. There is no audit, no badge, no accreditation body. It is a voluntary framework, free to use, built around four functions: Govern, Map, Measure, Manage. That makes it worth a genuinely different question from the one the last piece asked about ISO 42001, not whether to borrow it, but how far down to scale it before it stops being useful.

This piece works through what each of the four functions actually asks of an organisation, and what a 60-person NGO can reasonably do with each one without hiring a compliance team it does not have.

## Govern: the function this series has already half-built

Govern asks an organisation to establish policies, roles, and accountability for AI risk across the organisation, not just within whichever team happens to be using it. Anyone who has followed this series already has most of this in place: a named policy owner, an escalation path, a red-lines document, a review cycle. NIST's Govern function does not ask for anything additional here so much as it asks the organisation to check that governance is genuinely organisation-wide rather than living only inside the department that adopted AI first.

## Map: naming what you actually have

Map asks an organisation to identify its AI systems, their context, and the risks specific to each use case, rather than treating AI risk as one undifferentiated category. This is the tool inventory this series built early on, extended one step further: not just which tools exist, but what each one is actually used for, who it affects, and what could plausibly go wrong with that specific use. A 60-person NGO does not need a formal risk taxonomy to do this well. A short paragraph per tool, written honestly, does most of the work.

## Measure: the function most likely to be skipped, and the one worth keeping

Measure asks an organisation to track and assess the risks it has mapped, using whatever metrics are proportionate to its size. This is the function smaller organisations are most tempted to skip entirely, on the reasonable-sounding grounds that formal metrics feel like a large-organisation exercise. That instinct is only half right.

- **Full metric dashboards are genuinely disproportionate** for a 60-person organisation, and building one is a common way this function turns into overhead nobody sustains.
- **A short qualitative check at each review cycle is not disproportionate**, and this series has already built the review cycle to hang it on.
- **The question worth asking each time is simple**: has anything changed about how this tool is used, who it affects, or what could go wrong, since the last review.
- **Skipping Measure entirely is the actual risk**, not doing it informally, because Govern and Map without any check on whether things have changed quietly become paperwork nobody revisits.

> Measure does not require a dashboard. It requires an honest answer, repeated on a fixed cycle, to one question: has anything changed since the last time we checked.

## Manage: closing the loop

Manage asks an organisation to respond to what Measure surfaces, prioritising action against the risks that actually matter rather than treating every finding as equally urgent. In practice, this is the escalation path and the six-month review cycle doing their job: a finding from Measure either triggers a genuine response, a policy update, a tool restriction, additional training, or it gets explicitly logged as accepted and low-priority. What Manage rules out is the third option this series has warned against elsewhere, noting a finding and doing nothing with it, silently.

## What scaling down actually means here

Scaling the RMF down for an organisation this size does not mean doing less of it. It means doing all four functions at a size proportionate to sixty people rather than six thousand: a paragraph instead of a taxonomy, a review-cycle question instead of a dashboard, an escalation-path decision instead of a risk committee. The full four-function shape stays intact. Only the apparatus around each function shrinks.

## The practical takeaway

**Map the organisation's existing governance work onto NIST's four functions, Govern, Map, Measure, Manage, not to add new work but to confirm nothing has been quietly skipped, and treat Measure in particular as a standing question on the existing review cycle rather than a dashboard to build.**

*No external statistic cited; this article describes the publicly available structure of the NIST AI Risk Management Framework in general terms rather than substituting for the published framework. Organisations wanting to apply it formally should work from the current official NIST text.*
