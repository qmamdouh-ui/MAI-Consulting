---
slug: the-19-point-problem-ai-made-consultants-worse-at-one-task-in
title: 'The 19-point problem: AI made consultants worse at one task in the study everyone quotes'
summary: In the Harvard study of 758 consultants, AI users were 25% faster but 19 percentage points less likely to reach the correct answer on a task outside the tool's competence, which reframes training.
short_slug: 19-point-problem-ai-consultants-study
featured: true
service: training
format: Analysis
level: Entry
date: '2026-09-09'
author: M.A.I. Consulting
series: kb-1c
tags:
- jagged frontier
- delegation
- evidence
- AI training
- productivity
related: []
linkedin_url: ''
source_ref: 'mai-kb tree #5 / draft 7502825243074338816'
cluster: 1B Delegation thesis
---

The Harvard Business School study of 758 consultants is one of the most cited pieces of
evidence for AI in professional work, and for good reason. Consultants using GPT-4 completed
tasks about 25% faster and finished 12.2% more of them, at higher assessed quality.

That is the half everybody quotes.

The researchers also gave a task deliberately chosen to sit outside what the tool does well.
On that task, consultants using AI were **19 percentage points less likely to reach the
correct answer** than consultants working without it.

Not slower. Not marginally worse. Substantially more likely to be wrong.

## The finding is not "AI is unreliable"

It would be comfortable to read this as a caution about hallucination, file it under
"check the output", and move on. That is not what the result says.

The consultants were capable professionals. The tool was capable. The failure was in the
**pairing**: a task the tool handled confidently and badly, given to people with no
reliable way to tell that this was one of those tasks.

The researchers describe a "jagged frontier": capability that is high in some directions and
low in others, with no smooth boundary you can feel from the inside. The tool's fluency is
constant. Its competence is not. Nothing in the interface distinguishes the two.

That is the actual problem. Not that AI is sometimes wrong (everything is sometimes wrong),
but that its confidence carries no signal about which side of the frontier you are on.

## Why this reframes what training is for

Most AI training teaches operation: how to prompt, which features exist, what the tool can
do. Operation is the easy part and it is largely self-taught.

The 19-point result says the binding constraint is elsewhere. It is the judgement about
**which tasks to hand over at all**, and that judgement is not learnable from the tool,
because the tool is exactly the thing that cannot tell you.

It has to be learned from the work. Which means it has to be taught against your documents,
your task types, your failure cases. Not against a generic curriculum, and not by a vendor
whose incentive is to widen the set of tasks you delegate.

This is why a department that has completed a general AI course still asks what is
appropriate in its own role. The course answered a question they did not have.

## What follows practically

**Map the frontier for your task types, not in the abstract.** For each recurring task, the
useful question is not "can AI do this?" but "when this goes wrong, will we notice?" A task
where errors are visible and cheap is a good candidate even if the tool is mediocre at it. A
task where errors are plausible-looking and expensive is a bad candidate even if the tool is
usually good at it.

**Treat confident output on unfamiliar task types as the risk signal.** The failure mode is
not obvious nonsense. It is a well-structured, professionally worded, wrong answer.

**Put the verification burden where the frontier is jagged.** Uniform "always check the
output" guidance is unaffordable and gets ignored. Targeted checks on identified task types
get done.

## Where I would push back on my own argument

Two honest limits.

The study is one experiment, in one profession, with one model generation, in 2023. Models
have changed. The specific frontier has moved. Anyone claiming the 19-point figure transfers
directly to your organisation in 2026 is overreading it.

What is unlikely to have changed is the *structure*: capability that is uneven in ways the
interface does not expose. A moving frontier is still a frontier, and a frontier you cannot
see is the thing that causes the error.

## The practical takeaway

Take the five tasks your team most often hands to AI. For each, answer one question:
**if the output were confidently wrong, what would tell us?**

Any task where the honest answer is "nothing would" is the task to look at first, regardless
of how well the tool appears to perform on it.

## Sources

- Dell'Acqua, F. et al., "Navigating the Jagged Technological Frontier", Harvard Business
  School Working Paper 24-013 (2023). 758 consultants; 25% faster, 12.2% more tasks
  completed; 19 percentage points less likely to reach the correct answer on the
  out-of-frontier task. https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf
- Noy, S. & Zhang, W., Science (2023): writing tasks 40% faster, quality +18%, for contrast.
- Brynjolfsson, Li & Raymond, NBER w31161 (2023): +14% output, +34% for least experienced.
