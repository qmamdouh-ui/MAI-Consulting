---
slug: named-owner-operating-guide-test-set-what-makes-an-agent-survive
title: 'Named owner, operating guide, test set: what makes an agent survive its author'
short_slug: named-owner-operating-guide-test-set-agent
summary: 'An agent only its builder understands is a personal project running in production. A named owner, a written operating guide and a periodic test set are the minimum bar before calling it finished.'
service: agents
format: Guide
level: Advanced
date: '2026-10-01'
author: M.A.I. Consulting
series: kb-5a
tags:
- agents
- ownership
- documentation
- testing
related:
- the-tasks-we-will-not-configure-and-why-that-list-is-short-but
- write-the-method-before-you-buy-the-agent
- agent-skill-or-tool-three-things-with-three-different-costs
linkedin_url: ''
source_ref: 'mai-kb tree #73 / draft 7503125278567800832'
cluster: 5A Deciding what to automate
---

This closes the cluster this series has spent five pieces building: what an agent actually is, why the method has to come first, and where the absolute limits sit. This piece answers the practical question that follows once an agent is genuinely built and working: what stops it quietly breaking, or quietly drifting into something nobody understands, the day the person who built it moves on. The honest answer is three artefacts, none of them technical, all of them cheap compared to the cost of finding out the hard way that nobody else can touch the thing.

An agent that only its builder understands is not actually finished. It is a personal tool wearing the appearance of organisational infrastructure, and the gap between those two things only becomes visible at the worst possible moment, usually right after the builder has already left.

## A named owner, distinct from the builder

The person who built the agent and the person who owns it going forward do not need to be the same person, and for most organisations this size, keeping them the same is actually the risk. Ownership here means something specific: one named person, not a team, who is accountable for the agent still doing what it is supposed to do, who gets told first when something looks wrong, and who has the authority to switch it off. If the builder leaves and nobody was ever named as owner, the agent does not fail cleanly. It keeps running, unattended, until something breaks badly enough that someone finally asks who is meant to be watching it.

## An operating guide the owner did not have to write themselves

The operating guide is the artefact that actually transfers the knowledge the builder is carrying around in their head: what the agent does, what it does not do, what normal output looks like, what a wrong output looks like, and what to do when one shows up. This is not a technical specification. It is closer to the method this series argued for building before the agent existed in the first place, now updated to describe what actually got built rather than what was intended. An owner who inherits an agent with no operating guide is not really an owner. They are a person with responsibility for something they cannot actually evaluate.

## A test set that catches drift before a person does

The test set is a small, fixed collection of real inputs with known-correct outputs, run periodically against the agent to confirm it still behaves the way it did when it was accepted. This matters because the way an agent quietly stops working is rarely a dramatic failure. It is a slow drift, a platform update, a small change in the documents it reads, a shift in the task itself, that nobody notices until the output has been subtly wrong for weeks. A test set turns that invisible drift into something a person can actually check on a schedule, rather than something that only surfaces once a beneficiary or a funder points it out.

## What each artefact actually protects against

- **The named owner protects against nobody noticing.** Without one, a departing builder takes the only working understanding of the agent with them, and the gap stays invisible until something forces it into view.
- **The operating guide protects against nobody being able to help.** An owner without a guide can restart the agent, but cannot judge whether what it is doing is still correct.
- **The test set protects against slow, silent drift.** The failure mode that never announces itself is the one that does the most damage, because nobody is looking for it.
- **Together, the three protect the organisation from finding out by accident** that something it depends on has not actually been supervised in months.

> A working agent with no named owner, no operating guide, and no test set is not really an organisational asset. It is a personal project that happens to be running in production, and the organisation will not find out the difference until the person who built it is no longer there to explain it.

## The practical takeaway

**Treat a named owner, a written operating guide, and a periodic test set as the minimum bar for calling an agent finished, not optional extras added once time allows, since without all three the agent only survives for as long as its builder stays.**

*No external statistic cited; this article presents an internal practical framework rather than third-party evidence.*
