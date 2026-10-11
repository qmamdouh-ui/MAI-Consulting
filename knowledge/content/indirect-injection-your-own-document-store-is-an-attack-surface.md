---
slug: indirect-injection-your-own-document-store-is-an-attack-surface
title: 'Indirect injection: your own document store is an attack surface'
short_slug: indirect-injection-document-store-attack-surface
summary: 'To an agent that reads it, any shared drive or ticket system many people could edit is untrusted content. Scope read access, curate trusted sources and log what the agent reads.'
service: agents
format: Explainer
level: Advanced
date: '2026-10-01'
author: M.A.I. Consulting
series: kb-5b
tags:
- prompt injection
- agent security
- document store
- OWASP
- access control
related:
- prompt-injection-for-people-who-will-never-write-a-prompt-filter
- named-owner-operating-guide-test-set-what-makes-an-agent-survive
- the-tasks-we-will-not-configure-and-why-that-list-is-short-but
linkedin_url: ''
source_ref: 'mai-kb tree #75 / draft 7503137946103943168'
cluster: 5B Agent security
---

The last piece in this series described prompt injection in general terms: an instruction hidden inside content an agent reads, rather than inside the request a person typed. This piece narrows that down to the version most relevant to an organisation this size, because it does not require an attacker, a phishing email, or anything dramatic. It requires only that an agent has read access to a shared drive, a ticketing system, or a document store that more than one person has ever been able to write to.

That is the uncomfortable part. Indirect prompt injection, as OWASP defines it, occurs when a model reads untrusted content from websites, documents, emails, tickets, repositories, or knowledge bases. Most organisations already have all four. The attack surface was not created by adopting an agent. It was created years ago, by every shared drive nobody fully audited, and the agent is simply the first thing that reads all of it at once, uncritically, and acts on what it finds.

## Where "untrusted" actually starts

The instinct is to treat internal documents as trusted by default, because they came from inside the organisation. That instinct is the vulnerability. A document is untrusted, in the sense this piece means, the moment more than one person could have edited or uploaded it without a second person reviewing the change. A shared grant-report folder, a beneficiary-submitted form, a ticket a member of the public opened, a document a departed contractor left behind: none of these were ever adversarially reviewed before an agent started reading them, and "nobody has abused this yet" is not the same claim as "this could not be abused."

## Why a document store is worse than a single email

A phishing email is one message, sent once, to whichever inboxes it reaches. A document store an agent reads regularly is a standing surface: anything placed inside it at any point in the past, by anyone who ever had write access, however that access was granted or forgotten about, is available to be read the next time the agent runs its task. The risk does not arrive with the attack. It has usually been sitting there for months, inert, until an agent with enough autonomy to act on what it reads starts routinely opening it.

## What actually reduces this risk

- **Scope what the agent can read**, not just what it can write. Read access is treated as low-risk far more often than it deserves, precisely because reading looks passive; an agent that reads broadly and acts on what it finds has effectively inherited the write permissions of everyone who ever touched that folder.
- **Separate genuinely trusted content from everything else.** A small, curated set of documents the agent is built to work from is a fundamentally different risk profile from "point it at the shared drive and let it find what it needs."
- **Log what the agent reads, not only what it outputs.** When something goes wrong, the output alone rarely explains why; the read log is what lets a person trace the instruction back to the document that planted it.
- **Treat a document store's access history as part of its risk profile.** A folder six people could write to at some point over three years carries meaningfully more risk than one two people have ever touched, regardless of how careful everyone involved has been.

> An agent does not need to be tricked by a sophisticated attacker to be compromised by indirect injection. It only needs to read something an organisation has already been quietly accumulating, unreviewed, for as long as the folder has existed.

## The practical takeaway

**Audit what an agent can read before worrying about what it can write, treat every document store with more than one historical contributor as untrusted by default, and log what the agent reads so a wrong output can actually be traced back to its source.**

## Sources

- OWASP Top 10 for LLM Applications (2025 edition): indirect prompt injection defined as occurring when a model reads untrusted content from websites, documents, emails, tickets, repositories or knowledge bases.
- OWASP Top 10 for LLM Applications (2025 edition): prompt injection ranked LLM01, the top risk, for the second consecutive edition.
- OWASP Top 10 for LLM Applications (2025 edition): recommended defence-in-depth controls, least-privilege tooling, input/output filtering, human approval for high-risk actions, adversarial testing.
