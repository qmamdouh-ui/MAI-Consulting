---
slug: write-the-method-before-you-buy-the-agent
title: Write the method before you buy the agent
short_slug: write-the-method-before-you-buy-the-agent
summary: 'If nobody can write down in plain steps how a task is done today, buying an agent for it is premature. The written method is the real readiness test, and it surfaces hidden disagreements early.'
service: agents
format: Analysis
level: Practitioner
date: '2026-09-30'
author: M.A.I. Consulting
series: kb-5a
tags:
- agents
- method
- documentation
- contrarian
related:
- agent-skill-or-tool-three-things-with-three-different-costs
- permitted-use-by-role-the-table-that-does-the-work
- task-decomposition-finding-the-handover-point
linkedin_url: ''
source_ref: 'mai-kb tree #71 / draft 7503112324401074176'
cluster: 5A Deciding what to automate
---

The last piece in this series sorted a proposed automation into a tool, a skill, or an agent by asking whether it needed to decide what happens next. This piece takes the question a step earlier, back to the moment right before anyone starts evaluating vendors or configuring anything. The honest, contrarian version of that moment is this: if nobody in the organisation can currently write down, in plain steps, how the task gets done today, buying an agent to do it is premature. The problem is not automation. It is documentation, and no agent fixes that for you.

This piece argues that the method has to exist first, on paper, before an agent is worth evaluating, and that skipping straight to the tool is one of the most expensive ways to discover that the method was never actually agreed on.

## The seduction of skipping the method

An agent looks like it solves the documentation problem by absorbing it. Hand the task to something capable enough, the thinking goes, and it will work out a sensible way to do it, sparing the organisation the tedious work of writing the method down first. This is backwards. An agent needs a method to operate against, whether that method is explicit or not, and if the organisation has not written it down, the agent will either invent its own version, silently, or fail in ways nobody can diagnose because nobody agreed what correct looked like in the first place.

## What "the method" actually means here

The method is not a full standard operating procedure with numbered sub-clauses. It is the honest, plain-language answer to a small set of questions: what are the steps, in order, that a competent person actually follows today; what information does each step need; what does a correct outcome look like; and what makes a result wrong rather than merely different. An organisation that cannot answer these four questions for a task does not yet have a method. It has a habit, held in one or two people's heads, and habits are exactly what breaks first when an agent is asked to reproduce them.

## Why this test is more revealing than it sounds

Trying to write the method down, before any agent enters the conversation, does something valuable on its own: it surfaces disagreement that automation would otherwise have hidden. Two staff members who both "do the report" may be doing it in genuinely different ways, each defensible, neither written down, and an agent built against one person's undocumented habit will quietly produce results the other person considers wrong. Writing the method first forces that disagreement into the open while it is still cheap to resolve, rather than after the agent has been built and is producing output that half the team distrusts for reasons nobody can quite articulate.

## What tends to happen when the method gets skipped

- **The agent gets blamed for a disagreement that predates it.** The actual argument is about what "correct" means, but it surfaces as a complaint about the tool.
- **Configuration becomes a series of after-the-fact patches**, each one papering over a step the method never actually specified, rather than a deliberate build against an agreed process.
- **Nobody can explain why the agent does what it does**, because nobody wrote down what it was supposed to do in the first place, which makes the escalation path this series has argued for close to useless in practice.
- **The organisation ends up documenting the method anyway**, just later, more expensively, and under the pressure of an agent already in production and already causing friction.

> An agent that automates an undocumented method does not remove the documentation problem. It hides it, temporarily, until the first disagreement about what the agent should have done forces the method into the open anyway, at a worse time and a higher cost.

## The practical takeaway

**Before evaluating any agent, write the method it would need to follow, in plain steps, and treat the ability to do that clearly as the actual readiness test, since an organisation that cannot write the method down is not ready to automate it.**

*No external statistic cited; this article presents an internal contrarian argument rather than third-party evidence.*
