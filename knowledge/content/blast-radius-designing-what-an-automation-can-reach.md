---
slug: blast-radius-designing-what-an-automation-can-reach
title: 'Blast radius: designing what an automation can reach'
short_slug: blast-radius-what-an-automation-can-reach
summary: 'Before connecting an agent to a new system, ask what it could reach on its worst day. Grant access per task rather than per agent, and separate read, write and send, so one mistake stays contained.'
service: agents
format: Framework
level: Advanced
date: '2026-10-02'
author: M.A.I. Consulting
series: kb-5b
tags:
- agents
- blast radius
- access control
- agent security
related:
- indirect-injection-your-own-document-store-is-an-attack-surface
- prompt-injection-for-people-who-will-never-write-a-prompt-filter
- the-tasks-we-will-not-configure-and-why-that-list-is-short-but
linkedin_url: ''
source_ref: 'mai-kb tree #76 / draft 7503144974872412161'
cluster: 5B Agent security
---

The last two pieces in this series dealt with how an agent gets compromised: a hidden instruction in a request, or one buried in a document the agent was only supposed to read. This piece deals with the question that matters once compromise has already happened, because pretending it never will is not a plan. If an agent does exactly the wrong thing, on its worst day, how much of the organisation can it actually touch? That question has a name in security work: blast radius. It is answerable in advance, and answering it properly is mostly a design decision, not a technical one.

Blast radius is not a hypothetical for people who expect to be attacked. It is the honest answer to what a single mistake, a single piece of bad input, or a single moment of over-trust in a tool actually costs, regardless of whether anyone was ever trying to cause harm.

## The question to ask before the question of whether it will happen

Most conversations about agent risk start with "how likely is this to go wrong," which is a reasonable question but the wrong first one. The first question is "if it goes wrong, what does it reach." An agent connected to one clearly bounded system has a small blast radius by construction, regardless of how good or bad its judgement turns out to be on a given day. An agent connected to everything, because connecting it to everything was convenient at setup time, has a large blast radius regardless of how careful its design otherwise is. Likelihood is worth estimating. Reach is worth designing.

## Why convenience quietly expands the radius

The natural direction of least resistance during setup is to grant broad access once, so nobody has to come back and grant a bit more later. A single service account with wide permissions across email, file storage, and a CRM is genuinely easier to configure than three narrowly scoped credentials, one per system, each doing only what that specific task needs. The saving is real and it is also exactly backwards: the whole point of scoping access narrowly is that it is inconvenient in exactly the way that limits damage, and the setup-time convenience of one broad credential is paid for later, all at once, the day something goes wrong inside it.

## Designing the radius deliberately

- **Grant access per task, not per agent.** An agent that does three distinct things should usually hold three distinct, narrowly scoped credentials, not one broad one that happens to cover all three, because a compromise of the broad credential compromises all three tasks at once.
- **Separate read from write, and write from send.** An agent that reads a document store, drafts a reply, and sends it are three different levels of consequence; collapsing them into one uninterrupted permission set removes the natural checkpoints between them.
- **Treat every system connection as a design decision, not a configuration default.** The question is never "can this agent reach that system," which a permissions screen answers instantly. It is "should it, given what happens if today is the day it reaches it wrongly."
- **Assume the agent will eventually be wrong about something and design for that day, not around it.** A narrow blast radius does not require an agent that never makes a mistake. It requires an organisation that already decided, in advance, how much a mistake is allowed to cost.

> Blast radius is not a question you answer once, when the agent goes live. It is a design constraint you carry through every new system you connect it to afterwards, because each new connection either was scoped deliberately or was allowed to happen because it was the easy default.

## The practical takeaway

**Before connecting an agent to any new system, ask what it would be able to reach on its worst day, not just what it needs on its best one, and grant access per task rather than per agent so a single compromise stays contained.**

## Sources

- OWASP Top 10 for LLM Applications (2025 edition): recommended defence-in-depth controls, least-privilege tooling, input/output filtering, human approval for high-risk actions, adversarial testing.
