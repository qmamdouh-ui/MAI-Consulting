---
slug: browser-agents-in-a-logged-in-session-a-risk-model
title: 'Browser agents in a logged-in session: should you allow them at all?'
short_slug: browser-agents-logged-in-session-risk
summary: 'A browser agent in a logged-in session inherits everything that login can reach. Judge the session, not the task, and default to no where irreversible or highly sensitive actions are available.'
service: agents
format: Briefing
level: Advanced
date: '2026-10-02'
author: M.A.I. Consulting
series: kb-5b
tags:
- browser agents
- session risk
- agent security
- governance
related:
- blast-radius-designing-what-an-automation-can-reach
- indirect-injection-your-own-document-store-is-an-attack-surface
- prompt-injection-for-people-who-will-never-write-a-prompt-filter
linkedin_url: ''
source_ref: 'mai-kb tree #77 / draft 7503152060368994305'
cluster: 5B Agent security
---

This series has spent three pieces establishing how an agent gets compromised and how far the damage can spread once it is. This piece applies that thinking to a specific, increasingly common setup: a browser agent operating inside a session where the person has already logged in, to email, to internal tools, to a CRM, sometimes to all three tabs at once. The honest governance question is not "how do we configure this safely." It is "should we allow this at all, and if so, for which tasks specifically." That question deserves an answer before the agent is given the keys, not after.

A logged-in browser session is not a neutral workspace. It is an accumulated set of permissions, cookies, and standing access that took a person months or years to build up, and a browser agent operating inside it inherits all of it at once, for whatever task it happens to be doing at the time.

## What "logged-in" actually hands over

When a person authorises a browser agent to act inside their logged-in session, they are not granting access to one task. They are granting access to everything that session can already reach: every tab the browser could open, every link the account is authenticated against, every action the interface allows a click to perform. The agent's task might be narrow, summarise this inbox, fill in this form, but its actual reach is the full breadth of what that login already permits, which is rarely narrow at all.

## Why this is a different risk from an API integration

An API integration is built against a defined, documented set of endpoints; whatever it can do was decided in advance, by someone who wrote the integration. A browser agent in a logged-in session has no such boundary. It can click whatever the interface presents, follow whatever link appears, and act on whatever content loads into the page it happens to be reading, which is precisely the surface this series described in its pieces on prompt injection and blast radius. The browser does not distinguish between a link the person intended the agent to follow and one an attacker, or simply a poorly designed advert, put in its path.

## A decision framework for the "should we allow this at all" question

- **Ask what the session can reach, not what the task requires.** The task might be narrow. The session's actual reach almost never is, and it is the session's reach that sets the real risk, not the task description.
- **Distinguish a read-heavy task from one that can take irreversible action.** An agent that summarises what is on screen carries a materially different risk from one that can submit a form, send a message, or complete a purchase inside that same session.
- **Require a human to approve the specific session, not just the specific agent.** The same agent is a different risk in a session logged into a public information page than in one logged into finance, HR, or a beneficiary case management system.
- **Set a default of no for any session with irreversible or highly sensitive actions available, and require an explicit, documented exception to say yes.** This mirrors the never-configure list this series has already argued for elsewhere: the default should require a case for automating, not a case for refusing it.

> A browser agent in a logged-in session does not just do the task it was given. It operates with the full reach of everything that login already permits, and the honest governance question is whether that reach, not the task, is one the organisation is actually willing to hand over.

## The practical takeaway

**Before allowing a browser agent into any logged-in session, ask what the session itself can reach rather than what the task requires, and set a default of no for sessions with irreversible or highly sensitive actions available unless there is an explicit, documented exception.**

## Sources

- Anthropic red-team results for Claude in Chrome, as cited on M.A.I.'s own reference page (vendor self-reported, 2026-08): 23.6% prompt-injection success unmitigated; 11.2% with mitigations in autonomous mode; 35.7% to 0% on four browser-specific attack types.
- OWASP Top 10 for LLM Applications (2025 edition): recommended defence-in-depth controls, least-privilege tooling, input/output filtering, human approval for high-risk actions, adversarial testing.
