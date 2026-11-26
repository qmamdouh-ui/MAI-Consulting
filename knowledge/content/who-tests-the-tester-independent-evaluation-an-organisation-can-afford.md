---
slug: who-tests-the-tester-independent-evaluation-an-organisation-can-afford
short_slug: independent-ai-evaluation-ladder
title: Who tests the tester? Independent evaluation an organisation can afford
summary: The person who builds an AI workflow usually judges whether it works. The Independence Ladder sets out four affordable levels of independent testing and how to match each to the stakes of the workflow.
service: assessment
format: Framework
level: Practitioner
date: '2026-10-28'
author: M.A.I. Consulting
series: ai-consulting
tags:
- Evaluation
- Testing
- AIGovernance
- Assurance
- Workflows
related:
- the-pilot-that-produces-evidence-instead-of-anecdote
- reading-a-vendor-benchmark-without-being-taken-in
- named-owner-operating-guide-test-set-what-makes-an-agent-survive
linkedin_url: ''
source_ref: 'ai-consulting queue #24 (https://www.linkedin.com/article/edit/7508817751390584832/)'
featured: false
---

There is an awkward fact at the centre of most AI adoption. The person who sets up a workflow is usually the person who judges whether it works. They chose the example documents, wrote the instructions, looked at the first outputs and decided they were good. Naturally, they concluded the workflow succeeds. It would be strange if they did not.

Large technology firms and regulated industries respond with independent evaluation, meaning someone other than the builder tests the result. Most mission-driven organisations cannot afford a dedicated evaluation team, and conclude that independence is out of reach. We think that conclusion is wrong. Independence comes in degrees, and the useful degrees are cheap.

*Testing your own work is not worthless, but it should never be the only test.*

## Why self-assessment drifts

The trouble with builder-led testing is structural, not moral. The builder knows what the workflow is meant to do and reads outputs charitably. They test the cases they imagined, which are the cases the workflow handles well. They are also invested: a failed test means more work, and possibly an awkward conversation with the director who approved the project.

Over time, this produces confidence that outruns evidence. The workflow is trusted because nobody has seen it fail, and nobody has seen it fail because nobody who wanted to find a failure has looked.

## The Independence Ladder

We describe evaluation as a ladder of four rungs, each a step further from the builder. An organisation does not need to reach the top. It needs to know which rung it is standing on, and to choose the rung that matches the stakes.

- **Rung 1: the author checks.** The builder tests their own workflow. It is fast and free, and appropriate for low-stakes, personal use. It should be recorded as the weakest form of evidence, not as validation.
- **Rung 2: a peer swap.** A colleague who did not build the workflow tests it on cases they choose. The cost is an hour or two. It catches the failures the builder cannot see, because the peer has different assumptions and different examples.
- **Rung 3: a rotating outsider.** A reviewer from another department, or another organisation in a peer network, tests the workflow on a periodic schedule. They bring distance and no stake in the outcome. Organisations of similar size can swap reviewers at no cash cost.
- **Rung 4: an external review.** A person or firm with no relationship to the builder or the tool examines the workflow, the test cases and the results. This is the most independent and the most expensive, and is reserved for workflows where errors would seriously harm people or breach obligations.

Matching the rung to the stakes is the point. Most internal drafting aids sit comfortably at Rung 2. A workflow that touches beneficiary decisions or funder reporting belongs at Rung 3 or above.

## How to make a cheap test meaningful

Independence is necessary, not sufficient. A tester who receives only the examples the builder prepared is not independent in any useful sense. Three practices raise the value of a low-cost test.

First, let the tester choose some of the cases. Ask them to bring two or three awkward documents from their own work, the ones that would embarrass a system. Second, agree in advance what counts as a pass. If the criteria are written after the results, they will be bent to fit. Third, record the outcome, including the failures, in a place others can see.

The last practice is the one that changes behaviour. An organisation that keeps a short list of what was tested, by whom, on what, and what happened has begun to build the evidence trail that boards and funders increasingly ask about.

> The purpose of an independent test is not to approve the workflow but to give it a fair chance of failing.

## Who counts as independent

Independence is about interest, not about qualifications. A colleague from another team who has no stake in the project is more independent than a specialist reporting to the same manager. Someone who will use the output is often a better tester than someone who built it, because they notice what is unusable. A peer at another organisation, bound by the same confidentiality obligations, brings a fresh eye without cost.

Beware two false independents. The first is the vendor: a supplier's own test results describe the product under favourable conditions, and cannot stand in for your test on your documents. The second is the enthusiast who wants the project to succeed and will report accordingly.

## Testing what changes

A workflow that passed a test in March is not necessarily sound in September. Models are updated, documents change, staff turn over and the way people use the workflow drifts. Evaluation is therefore a recurring task, not a gate. A lightweight schedule works well: a peer swap at launch, a repeat after a stated interval such as six months, and a repeat whenever the underlying tool or the type of document changes materially.

Tying the retest to triggers, not only to the calendar, keeps the effort proportionate. A change of tool version is an event worth a small re-test. A quiet period is not.

## What it costs

The honest cost of Rung 2 is a couple of hours per workflow, per test. Rung 3 costs a little more in coordination. Rung 4 is a proper budget item. Set against the cost of a workflow failing quietly in front of a funder or a beneficiary, the lower rungs are inexpensive. The mistake is not spending too little on evaluation but assuming that the choice lies between a full evaluation team and no independent test at all.

## Questions for your next leadership meeting

- For each AI workflow we rely on, which rung of the ladder has it reached?
- Who could serve as our rotating outsider, and have we asked them?
- Do we keep a record of what was tested and what failed, or only of what passed?

## The bottom line

**Match the independence of the test to the stakes of the workflow, and never let the builder be the only tester.** Independence is a ladder, and even its lower rungs give an organisation evidence that its own confidence cannot.

## Sources

No external statistics cited. The Independence Ladder is a framework proposed by M.A.I. Consulting.
