---
slug: prompt-injection-for-people-who-will-never-write-a-prompt-filter
title: Prompt injection explained for executives and DPOs who will never write a filter
short_slug: prompt-injection-explained-for-executives-dpos
summary: 'Prompt injection hides instructions in content an agent reads, and OWASP ranks it the top LLM risk. A plain-language explanation, a vendor''s own test figures, and layered defences any organisation can apply.'
service: agents
format: Explainer
level: Entry
date: '2026-10-01'
author: M.A.I. Consulting
series: kb-5b
tags:
- prompt injection
- agent security
- OWASP
- technical explainer
related:
- named-owner-operating-guide-test-set-what-makes-an-agent-survive
- the-tasks-we-will-not-configure-and-why-that-list-is-short-but
- red-lines-the-decisions-that-never-get-delegated
linkedin_url: ''
source_ref: 'mai-kb tree #74 / draft 7503131273108963328'
cluster: 5B Agent security
---

This series opens a new cluster on agent security with the attack that matters most, not because it is the most technically dramatic, but because it is the one an executive director or a DPO genuinely needs to understand in plain terms, without ever needing to write a line of defensive code themselves. Prompt injection has been ranked LLM01, the single highest risk, for the second consecutive edition of the OWASP Top 10 for LLM Applications. That is not a niche concern. It is the industry's own vendor-neutral standards body naming this the thing to worry about first.

This piece explains what the attack actually is, in language that does not require understanding how a language model works, and what an organisation without a security team can realistically do about it.

## The attack, described without jargon

A prompt injection happens when someone hides an instruction inside content an AI agent is going to read, rather than inside the request a person typed. The agent cannot always tell the difference between "the task I was asked to do" and "an instruction that happened to be sitting inside a document I was reading while doing that task." If the hidden instruction is convincing enough, the agent follows it, doing something the person who set it running never asked for and may never see coming.

## Why this matters more once an agent reads your own documents

The more dangerous version of this attack, called indirect prompt injection, occurs when a model reads untrusted content from websites, documents, emails, tickets, repositories, or knowledge bases. This series has spent considerable length arguing that an agent should be built against a documented method, given a named owner, and never handed the tasks on this series' own never-configure list. Prompt injection is the reason all of that matters even for an agent doing something as ordinary as reading a shared drive. The attack does not require the agent to browse the open internet. It only requires the agent to read something an organisation already has lying around that someone else could have touched.

## What a real-world test actually found

Anthropic's own red-team testing of Claude in Chrome, a browser-using agent, found a prompt-injection success rate of 23.6% unmitigated, falling to 11.2% with mitigations in autonomous mode, and specific browser-focused attack types dropping from 35.7% to 0% once targeted defences were applied. Two things are worth being honest about here. First, this is a vendor reporting on its own product, so it should be read as a data point rather than an independent audit, and paired with the OWASP framing above for balance. Second, even the improved, mitigated number is not zero. Mitigation reduces the risk substantially. It does not remove it, and no organisation evaluating an agent should be told otherwise.

## What OWASP actually recommends, in practice

- **Least-privilege tooling** means an agent only gets access to the specific systems and actions its task genuinely requires, not broad access "in case it is useful later."
- **Input and output filtering** means checking what an agent reads and what it produces for the kind of hidden instructions this piece has described, not a perfect defence, but a meaningful reduction.
- **Human approval for high-risk actions** is the same principle this series has already argued for under the never-configure list, applied here specifically to the moment an agent is about to act on something it read rather than something it was told.
- **Adversarial testing** means deliberately trying to trick the agent before it goes into real use, rather than discovering the gap the first time someone else tries it for real.

> Prompt injection is not a bug that gets patched once and forgotten. It is a structural feature of how these systems currently work, which is exactly why OWASP's own guidance is layered defence rather than a single fix, and exactly why the never-configure list and the named-owner discipline this series has argued for matter as much for security as they do for governance.

## The practical takeaway

**Treat prompt injection as the top risk it is ranked, understand that mitigation reduces but does not eliminate it, and apply the same layered defence, least-privilege access, filtering, human approval on high-risk actions, and adversarial testing, that this series has already argued for on governance grounds.**

## Sources

- OWASP Top 10 for LLM Applications (2025 edition): prompt injection ranked LLM01, the top risk, for the second consecutive edition. https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf
- OWASP Top 10 for LLM Applications (2025 edition): indirect prompt injection defined as occurring when a model reads untrusted content from websites, documents, emails, tickets, repositories or knowledge bases.
- OWASP Top 10 for LLM Applications (2025 edition): recommended defence-in-depth controls, least-privilege tooling, input/output filtering, human approval for high-risk actions, adversarial testing.
- Anthropic red-team results for Claude in Chrome, as cited on M.A.I.'s own reference page (vendor self-reported, 2026-08): 23.6% prompt-injection success unmitigated; 11.2% with mitigations in autonomous mode; 35.7% to 0% on four browser-specific attack types.
