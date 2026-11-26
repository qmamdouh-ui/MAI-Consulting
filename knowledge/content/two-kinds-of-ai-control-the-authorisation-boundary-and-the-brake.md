---
slug: two-kinds-of-ai-control-the-authorisation-boundary-and-the-brake
short_slug: ai-control-boundary-and-brake
title: 'Two kinds of AI control: the authorisation boundary and the brake'
summary: A boundary decides what an AI system can reach; a brake decides how fast it can be stopped. The Fence and Brake Test shows which control a given use needs first, and why neither replaces the other.
service: agents
format: Framework
level: Practitioner
date: '2026-10-29'
author: M.A.I. Consulting
series: ai-consulting
tags:
- AIControl
- Permissions
- HumanOversight
- AgentSecurity
- RiskManagement
related:
- blast-radius-designing-what-an-automation-can-reach
- human-in-the-loop-and-where-the-human-actually-adds-value
- browser-agents-in-a-logged-in-session-a-risk-model
linkedin_url: ''
source_ref: 'ai-consulting queue #25 (https://www.linkedin.com/article/edit/7508819284031315969/)'
featured: false
---

Ask a group of executives how they would keep an AI system under control and the answers tend to fall into two camps. One camp says: make sure we can stop it. A kill switch, an approval step, a person watching. The other says: make sure it cannot do the wrong thing in the first place. Restrict what it can access, and limit what it is allowed to do.

Both camps are right, and each tends to underrate the other. They are describing two different kinds of control, with different strengths and different failure modes. Organisations that treat them as alternatives usually end up with one, and discover the missing one at an unhelpful moment.

*A brake decides when to stop; a boundary decides what is possible at all.*

## Two controls, defined plainly

An authorisation boundary is set before anything runs. It defines what a tool, an agent or a person using AI is permitted to touch and to do: which data, which systems, which actions, with whose approval. Whatever falls outside the boundary is not possible, however the system behaves.

A brake operates while or after something runs. It is the ability to notice a problem and halt or reverse it: a human review before an output is sent, an alert that pauses a process, a rollback. Whatever is inside the boundary can still go wrong, and the brake is what limits the damage.

The two answer different questions. The boundary answers: what is the worst this could reach? The brake answers: how quickly can we stop it once we see it?

## The Fence and Brake Test

We use a simple test to see which control an organisation needs first for a given use of AI. It asks two questions about the task.

- **Can the harm be foreseen?** If the ways it could go wrong are known, such as a summary revealing confidential data, a boundary can prevent them directly. Restrict the input, and the harm cannot occur. Foreseeable harms are best met with fences.
- **Can the harm be reversed in time?** If an error can be caught and corrected before it matters, such as a draft that a person reviews before it goes out, a brake is sufficient and often cheaper. Reversible harms are best met with brakes.
- **If the harm is unforeseeable and irreversible, use both.** Where the system might do something nobody anticipated, and the consequence cannot be undone, such as sending communications to beneficiaries or moving money, you need a tight fence and a fast brake together.
- **If the harm is foreseeable and reversible, do not over-engineer.** A low-stakes drafting aid needs light controls of each kind. Heavy controls here mostly teach staff to work around them.

The test does not require technical expertise. It requires asking, for each use, what could go wrong and whether it could be put right.

## Why organisations reach for the brake first

Brakes feel reassuring. A human in the loop, an approval step or a kill switch are visible, and they signal diligence. Boundaries are less visible: a well-set permission that quietly prevents a problem produces no incident to point to.

There is also a budgeting reason. Brakes are often added after a system is built and can be attached to almost anything. Boundaries need to be designed in, which means deciding at the start what the system will be allowed to touch. That is a harder conversation, and it is easily postponed until an incident makes it urgent.

The result is a familiar pattern: an approval step on every output, with the system nonetheless holding access to far more data than the task requires. The brake is busy while the fence is missing.

> A brake without a boundary is a person standing in front of an open door, hoping to notice who walks through.

## Why brakes alone fail

A brake depends on someone noticing in time. Reviewers tire, and approvals become habitual clicks. A process that runs fast may complete its damage before a person could intervene. And the person applying the brake must understand what they are looking at, which is not guaranteed when outputs are long or technical.

Brakes also carry a hidden cost. Every approval takes time, and time is the first thing removed when a project is under budget pressure. A control that depends on someone's attention is fragile in exactly the conditions where it matters.

## Why boundaries alone fail

Boundaries handle the harms you thought of. They are weak against the ones you did not. A system confined to a single folder may still produce a misleading summary of what is in it. A tool restricted to drafting may still draft something wrong or inappropriate. Boundaries limit reach; they do not guarantee quality.

They also age. Permissions set at launch tend to widen as people ask for one more integration, and nobody reviews the accumulated access. A boundary that was tight in January can be loose by autumn.

## A practical starting point

Take the three AI uses that matter most in your organisation. For each, write down in two lines what the boundary is, meaning what data, systems and actions it may touch, and what the brake is, meaning who or what can stop it, and how fast. If either line is blank, you have found your next piece of work. If the brake depends on one person's attention, ask what happens when they are away.

Then set a review date for the boundary, because permissions widen quietly and someone should be asked to confirm that they still fit the purpose.

## Questions for your next leadership meeting

- For each important AI use, can we state its boundary and its brake in a sentence each?
- Where are we relying on a person's attention to compensate for access that is wider than the task needs?
- When were the permissions on our AI tools last reviewed by someone who did not set them?

## The bottom line

**Decide first what an AI system may reach, then decide how quickly you can stop it, and treat neither as a substitute for the other.** A boundary limits the damage a system can do, and a brake limits how long it can do it.

## Sources

No external statistics cited. The Fence and Brake Test is a framework proposed by M.A.I. Consulting.
