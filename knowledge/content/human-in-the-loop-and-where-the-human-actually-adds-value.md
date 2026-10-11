---
slug: human-in-the-loop-and-where-the-human-actually-adds-value
title: Human-in-the-loop, and where the human actually adds value
short_slug: human-in-the-loop-where-humans-add-value
summary: 'Human review only protects you if it sits where an agent''s confidence and competence diverge, before output is polished into fluent prose. Batch approvals and late reviews are oversight in name only.'
service: agents
format: Framework
level: Advanced
date: '2026-10-02'
author: M.A.I. Consulting
series: kb-5b
tags:
- human-in-the-loop
- agent security
- oversight
- agents
related:
- browser-agents-in-a-logged-in-session-a-risk-model
- blast-radius-designing-what-an-automation-can-reach
- indirect-injection-your-own-document-store-is-an-attack-surface
linkedin_url: ''
source_ref: 'mai-kb tree #78 / draft 7503159178526486529'
cluster: 5B Agent security
---

This closes the cluster this series has spent four pieces building: how an agent gets compromised, how far the damage can spread, and what it inherits inside a logged-in session. Every one of those pieces has pointed towards the same safeguard, a human somewhere in the loop, without ever asking the harder question this piece takes on directly: where, specifically, does that human actually add value, and where is their presence in the loop closer to a formality than a genuine check.

"Human-in-the-loop" gets used as though it were a single design choice, applied uniformly. In practice it is a placement decision, made separately for every task, and the placement is what determines whether the human is doing real work or just adding a click between the agent and the outcome.

## The evidence for why placement matters

Research on professionals using AI on tasks inside and outside the tool's actual competence found something specific and uncomfortable: on tasks outside that competence, people using the tool were 19 percentage points less likely to reach the correct answer than people not using it at all. The tool did not just fail to help there. It actively made outside-competence tasks worse, because people trusted output that looked as confident and well-formatted as the output on tasks the tool was actually good at. A human in the loop who cannot tell which kind of task they are looking at is not a safeguard. They are a rubber stamp with good intentions.

## Where the human genuinely adds value

The human's judgement is worth the most at the exact point where the agent's confidence and its actual competence are most likely to diverge, which is rarely the point where the interface puts the approval button by default. A human reviewing a fully drafted, fluent, well-structured output is reviewing something engineered to look correct, whether or not it is. The same human, shown the underlying decision before the agent smoothed it into prose, catches far more, because the thing they are evaluating has not yet been dressed up to look finished.

## Where it is closer to theatre

- **A single click that approves a batch, not an item.** "Approve all 40" is not oversight of 40 decisions. It is oversight of the decision to stop looking, dressed up as review of the individual cases.
- **Review that arrives after the output is already fluent and confident-sounding.** By the time a human sees polished prose, the errors this series' evidence describes are the hardest kind to spot, precisely because they no longer look like errors.
- **Approval required from someone without the context to evaluate it.** A human-in-the-loop step assigned to whoever happens to be free, rather than whoever actually understands the task, adds latency without adding judgement.
- **A review step nobody has ever seen catch anything.** If a human-in-the-loop checkpoint has run for months without ever changing an outcome, that is not evidence it is unnecessary. It is usually evidence the review is happening too late, or on the wrong thing, to ever have a chance.

> A human in the loop is only a safeguard if the human is looking at the thing that is actually likely to be wrong, at the point before it has been polished into looking right. Everywhere else, it is a delay with the appearance of oversight.

## The practical takeaway

**Place human review at the point where an agent's confidence and its actual competence are most likely to diverge, before the output has been polished into fluent prose, rather than defaulting to whichever approval point the interface makes easiest to add.**

## Sources

- Dell'Acqua et al., HBS Working Paper 24-013 (jagged frontier): consultants using an AI tool were 19 percentage points less likely to reach the correct answer on tasks outside the tool's competence, despite being faster and completing more tasks overall.
- OWASP Top 10 for LLM Applications (2025 edition): recommended defence-in-depth controls, least-privilege tooling, input/output filtering, human approval for high-risk actions, adversarial testing.
