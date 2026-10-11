---
slug: the-escalation-path-and-the-24-hour-rule
title: 'AI policy escalation path and the 24-hour rule'
short_slug: ai-escalation-path-24-hour-rule
summary: 'What to write into an AI policy for the moment something goes wrong: one named contact, a broad definition of escalation-worthy, no penalty for reporting, and a fixed 24-hour clock from discovery.'
service: policy
format: Guide
level: Practitioner
date: '2026-09-25'
author: M.A.I. Consulting
series: kb-4a
tags:
- policy
- governance
- escalation
- incident response
- writing the policy
related:
- red-lines-the-decisions-that-never-get-delegated
linkedin_url: ''
source_ref: 'mai-kb tree #54 / draft 7503014392612089857'
cluster: 4A Writing the policy
---

The last piece in this series set out the red-line list: a short set of decisions that never get delegated, however good the safeguard looks elsewhere in the policy. A red-line list and a permitted-use table between them cover what should happen. Neither says anything about what happens the moment something doesn't, a safeguard gets skipped under deadline pressure, a red-line decision quietly gets treated as routine, an AI-assisted output turns out to be wrong after it has already gone out. Most policies in this series so far describe the intended path. This piece is about the moment someone steps off it.

The answer is a short escalation path and one non-negotiable timing rule: whoever discovers the problem escalates it within 24 hours of discovery, regardless of how small it looks.

## Why this section usually gets skipped

Most people drafting an AI policy think in terms of prevention: permissions, safeguards, red lines, all designed to stop something going wrong before it happens. That is necessary but not sufficient, because prevention eventually fails somewhere, and a policy silent on what happens next leaves the actual moment of discovery completely undefined. That is exactly the moment things go worst. Someone who is not sure what to do, or who to tell, tends to do one of two things: wait and hope it resolves itself, or quietly fix it without telling anyone. Both responses turn a containable problem into a hidden one.

## The 24-hour rule itself

Twenty-four hours is deliberately short and deliberately not zero. Short enough that a wrong grant report, a mishandled disclosure, or a red-line decision that slipped through can usually still be corrected or contained before it does lasting damage. Not zero, because nobody should be expected to interrupt whatever they are doing the instant they notice something; they need enough room to finish the immediate task and think clearly before reporting. The clock starts at discovery, not at the moment the original error happened, which matters because a problem is often found well after it occurred, and backdating the deadline to the original event would make the rule impossible to meet honestly.

## What the escalation path itself needs to specify

- **A single named first point of contact, not a list of options.** "Report to your line manager or the DPO or whoever seems appropriate" forces a judgement call in exactly the moment someone least wants to make one; one named person removes that hesitation entirely.
- **What counts as escalation-worthy, stated broadly rather than narrowly.** A rule that requires someone to first decide whether an issue is serious enough to report reintroduces the delay the 24-hour clock exists to remove; the safer default is to escalate anything that might qualify and let the named contact make the judgement call.
- **No penalty for the report itself, only for concealment.** People escalate honestly and quickly when reporting carries no cost and staying silent does; a culture that punishes the person who flags a problem teaches everyone to stay quiet next time.
- **A written record of what happened and what was done about it, even for near-misses that caused no actual harm.** A near-miss with no record repeats itself invisibly; a near-miss with a record becomes evidence the next policy review can actually use.

> A policy that only describes what should happen has nothing to say for the moment something doesn't. That is exactly the moment people most need it to speak.

## The trade-off in a strict 24-hour rule

A hard deadline can feel punitive for a genuinely ambiguous or low-stakes near-miss, and there is a real temptation to soften it into something like "escalate promptly" or "as soon as reasonably practicable." The honest answer is that softening the deadline reintroduces the exact hesitation the rule exists to remove: the moment someone starts weighing whether their situation is serious enough to count as promptly, the clock becomes indefinite in practice, whatever the policy says on paper. A fixed 24 hours is blunt, but blunt is what makes it usable under pressure, which is the only condition this rule actually has to work under.

## The practical takeaway

**Write a single named first point of contact into the policy, define escalation-worthy broadly rather than narrowly, remove any penalty for reporting itself, and hold the 24-hour clock fixed from the point of discovery rather than softening it into discretionary language that quietly becomes no deadline at all.**

*No external statistic cited; this article presents an internal practical guide rather than third-party evidence.*
