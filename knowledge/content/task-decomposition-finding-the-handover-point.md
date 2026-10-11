---
slug: task-decomposition-finding-the-handover-point
title: 'Task decomposition for AI: finding the handover point'
summary: How to break a task into steps and write down the handover point, usually just before the first judgement call, where AI output ends and human responsibility begins.
short_slug: task-decomposition-handover-point
featured: false
service: training
format: Guide
level: Practitioner
date: '2026-09-20'
author: M.A.I. Consulting
series: kb-3b
tags:
- task decomposition
- handover point
- workflow design
- delegation
related:
- the-unit-of-ai-value-is-a-task-never-a-job
linkedin_url: ''
source_ref: 'mai-kb tree #39 / draft 7502956255280316416'
cluster: 3B Task-level redesign
---

Last time, this series argued that the task, not the job, is the only unit small enough to reason about honestly. That claim raises an immediate practical problem: most tasks are not atomic. "Draft the board report" is not one step, it is a sequence: gather the numbers, structure them into a narrative, write the first draft, review it, finalise it. Delegating "the task" without saying which of those steps a tool actually does produces exactly the vague, unsupervised arrangement this series has warned against throughout.

This piece is about finding the handover point, the specific place inside a decomposed task where a tool's output stops and a human's judgement takes over, and writing that point down rather than leaving it to whoever happens to be running the task that week.

## Why a vague handover produces an unpredictable result

"Use the tool to help with the report" is an instruction with no handover point in it, and different staff will draw the line in different places without realising they have made a decision at all. One person lets the tool touch only the first paragraph. Another lets it draft the whole narrative including the conclusion, which is exactly the sub-step this series' department playbooks kept reserving for a human. Neither person is wrong by the instruction they were given, because the instruction never specified where the boundary actually sits.

## Where the handover point usually belongs

The clearest boundary in most decomposed tasks sits right before the first genuine judgement call. Gathering the numbers, structuring them, and producing a first-pass narrative are all steps a tool can do because they follow from data that already exists. The moment the task requires deciding what the numbers mean, which risk to flag, or how to frame a sensitive result, the handover has already happened, whether anyone named it or not.

## What makes a handover point actually useful

- **It sits where the output can be checked without redoing the work.** A good handover point produces something a human can verify by reading it, not something that requires re-deriving the numbers from scratch to know whether it is right.
- **It is stated as a specific sub-step, not a vague verb.** "Produce a first draft from these five data tables" names a handover point. "Help with the report" does not, and the difference is exactly what determines whether two people doing the same task end up with the same division of labour.
- **It sits before the first judgement call, not after it.** Every department playbook in this series drew its never-delegate line at the point a named human had to answer for a decision, and the handover point is simply that same line applied one task at a time.
- **The same task can have more than one legitimate handover point**, depending on how much oversight a team wants at a given moment, but whichever point is chosen has to be written down, because an unstated handover point is not a lighter-touch policy, it is just an unsupervised one.

> A task without a stated handover point is not delegated. It is just unsupervised.

## The trade-off in naming the handover point precisely

Decomposing a task into its sub-steps and naming the exact handover point takes real time upfront, usually a short workshop with whoever actually does the work, and it is slower to start than simply handing someone a tool and asking them to figure out where it helps. The honest answer is that the informal approach is cheap only because it defers the cost: every person who does the task ends up drawing their own boundary, and those boundaries drift further apart the longer nobody writes one down. The workshop cost is paid once. The cost of an unstated handover point is paid every time someone new starts the task and has to guess where the line sits.

## The practical takeaway

**Decompose every delegated task into its sub-steps, name the exact point where tool output becomes human input, usually the step right before the first judgement call, and write that handover point down rather than leaving it to individual habit.**

*No external statistic cited; this article presents an internal workflow-design framework rather than third-party evidence.*
