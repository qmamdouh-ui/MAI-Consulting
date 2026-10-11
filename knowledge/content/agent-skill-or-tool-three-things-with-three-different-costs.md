---
slug: agent-skill-or-tool-three-things-with-three-different-costs
title: 'Agent, skill or tool: what to build and what each really costs'
short_slug: agent-skill-or-tool-what-each-costs
summary: 'A tool, a skill and an agent cost very different amounts to build, run and govern. One question, whether the task must decide what happens next, tells you which one to choose.'
service: agents
format: Analysis
level: Practitioner
date: '2026-09-30'
author: M.A.I. Consulting
series: kb-5a
tags:
- agents
- automation
- comparison
- tool inventory
related:
- the-tool-inventory-the-least-glamorous-artefact-that-unlocks
- permitted-use-by-role-the-table-that-does-the-work
- write-the-permissions-first
linkedin_url: ''
source_ref: 'mai-kb tree #69 / draft 7503105200715542528'
cluster: 5A Deciding what to automate
---

This series turns now to a new question this consultancy gets asked constantly: when a task looks automatable, what should actually get built? The word "agent" gets used loosely enough that it now covers three genuinely different things, a simple tool, a packaged skill, and a true agent, and the three carry very different costs to build, run and govern. Reaching for the most sophisticated option by default is one of the most reliable ways to overspend on a problem a much simpler build would have solved.

This piece sets out what distinguishes the three, and what each one actually costs beyond the obvious build price.

## A tool: one job, no judgement

A tool is a single-purpose integration, a script or API call that does one deterministic thing when asked: pull a report, format a document, send a notification. It makes no decisions about what to do next. Given the same input, it produces the same output every time. The tool inventory this series built early on is, in effect, an inventory of exactly this category, and most of what an organisation genuinely needs falls here. A tool is cheap to build, cheap to verify, and close to impossible to get wrong in a way that surprises anyone, because there is no judgement built into it to go wrong.

## A skill: a bounded package, still no autonomy

A skill sits a step up: a curated capability, often a prompt template with instructions and context bundled together, that an AI system can invoke to handle a specific, bounded task well. Drafting a grant report in the organisation's house style, checking a document against the safeguarding language checklist, these are skills. The distinguishing feature is that a skill executes within a single bounded interaction. It does not decide, on its own, to chain several actions together or to go looking for more information. It is more flexible than a tool because it carries judgement about how to phrase or structure something, but that judgement stays contained to the one task it was built for.

## An agent: the same judgement, but the loop is on

An agent is where the real cost jump happens. An agent decides its own sequence of actions, calling tools, invoking skills, deciding what to do next based on what it just found, often across several steps without a human in between each one. That autonomy is exactly what makes an agent capable of handling genuinely open-ended work. It is also exactly what makes an agent the one category this series' entire governance apparatus, the red lines, the escalation path, the review cycle, was actually built for. A tool cannot go outside its scope. A skill barely can. An agent, by design, can.

## What the three actually cost, beyond the build

- **A tool costs an afternoon and a maintenance ticket.** The build is small, the failure mode is visible immediately, and nobody needs to be trained to supervise it.
- **A skill costs a template, a review, and a named owner who checks it still matches house style.** The cost is real but proportionate, closer to writing a good SOP than to shipping software.
- **An agent costs everything a skill costs, plus the governance apparatus this series has spent most of its length building.** Red lines, an escalation path, a review cycle, are not optional extras for an agent. They are the actual price of the autonomy, and skipping them is not a shortcut, it is an unbuilt agent running anyway.
- **Choosing agent when tool would do costs the most of all**, not in money necessarily, but in the false sense that a problem has been "handled" by something with more oversight burden than the task ever needed.

> The build cost is the smallest part of the bill. A tool's real cost is an afternoon. A skill's real cost is a named owner. An agent's real cost is the governance this series has spent most of its length describing, and that cost is due whether or not anyone pays it.

## The question that actually sorts the three

Before reaching for any of the three, one question does most of the sorting: does this task need to decide what to do next, or does it just need to be done? If the answer is "just done", a tool. If the answer is "done well, within a fixed shape", a skill. Only when the honest answer is "it needs to decide, based on what it finds, what to do next" does an agent's cost become worth paying. Most tasks that get pitched as agents, on close inspection, are actually skills with an agent's price tag attached.

## The practical takeaway

**Sort a proposed automation by whether it needs to decide what happens next, not by how impressive the word "agent" sounds, and reserve full agent governance, red lines, escalation path, review cycle, for the tasks that genuinely need that autonomy.**

*No external statistic cited; this article presents an internal comparison framework rather than third-party evidence.*
