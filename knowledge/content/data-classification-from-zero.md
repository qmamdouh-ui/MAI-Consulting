---
slug: data-classification-from-zero
title: 'Data classification from zero: what can go into an AI tool'
summary: A one-page, four-class scheme (Public, Internal, Confidential, Restricted) and a single who-is-harmed test that tell staff what can go into a general-purpose AI tool.
short_slug: data-classification-from-zero
featured: true
service: policy
format: Guide
level: Practitioner
date: '2026-09-11'
author: M.A.I. Consulting
series: kb-1c
tags:
- data classification
- DPO
- beneficiary data
- policy
- safeguarding
related:
- the-tool-inventory-the-least-glamorous-artefact-that-unlocks
linkedin_url: ''
source_ref: 'mai-kb tree #13 / draft 7502852963825065984'
cluster: 1C Seeing your own use
---

The tool inventory tells you what staff are using. It does not tell you what they are allowed to put into it. That is the next document, and most organisations we work with have never built one: a data classification scheme, four classes, one page, that says in plain terms what can go into a general-purpose AI tool and what cannot.

Skipping this step is not really skipping it. It means every staff member is making the classification decision themselves, silently, differently, every time they paste something into a chat window. Some will be cautious. Some will not know there is a decision to make at all.

## Why this follows the inventory, not the other way round

We wrote recently about the tool inventory as the artefact that comes before policy. Classification is the reason the inventory matters: once you know what tools exist and who uses them, the live question becomes what data those tools are allowed to touch. Building a classification scheme before the inventory exists just produces categories nobody can attach to a real workflow.

## The four classes, in one sentence each

- **Public.** Already published, or written to be published: website copy, press releases, job listings. No handling restriction beyond ordinary accuracy.
- **Internal.** Not published but not damaging if it were: internal memos, meeting notes, draft budgets. Fine in most general AI tools once the account itself is sanctioned.
- **Confidential.** Damaging to the organisation or a named individual if disclosed: unpublished board papers, salary data, unresolved HR cases, draft funder correspondence. Restricted to sanctioned tools with a data-processing agreement in place.
- **Restricted.** Damaging to a beneficiary if disclosed: casework notes, safeguarding records, anything that identifies a vulnerable person. Never enters a general-purpose AI tool, sanctioned or not, unless a specific DPIA has cleared that exact use.

## The test that actually sorts real documents

The four labels are easy to write down and hard to apply consistently, because most documents do not announce their own class. The practical test we use is a single question, asked of the person who wrote it: who is harmed, and how, if this document is public tomorrow? An answer of "nobody, really" is Public or Internal. An answer that names the organisation's reputation or a named colleague is Confidential. An answer that names a beneficiary is Restricted, immediately, with no further discussion needed. This test sorts faster than any flowchart, because it maps directly onto risk staff already understand rather than a taxonomy they have to learn.

> A classification scheme that nobody can apply to a real document by Friday afternoon is not a classification scheme.

## What changes once a document has a class

Classification only earns its keep once it is wired to a decision, and the decision it should be wired to is the tool inventory built in the previous step. Public and Internal data can flow into whatever tool is already sanctioned there. Confidential data narrows that list to tools with a signed data-processing agreement, which for most organisations under 500 staff is a shorter list than people expect. Restricted data narrows it to nothing, by default, and any exception has to be a written, dated decision, not a quiet assumption someone made under deadline pressure.

## The trade-off nobody names

Over-classifying costs speed: mark too much as Confidential or Restricted and staff route around the policy instead of through it, which puts you back where the tool inventory started, only now with a policy document nobody follows. Under-classifying costs exposure: mark too little as Restricted and a beneficiary's casework notes end up in a tool with no data-processing agreement, discovered only when something has already gone wrong. The four-class table does not resolve this trade-off. It only makes each side of it a deliberate choice instead of a default nobody consciously chose.

## The practical takeaway

**Take ten real documents from across the organisation, apply the who-is-harmed test to each by Friday, and you will have a working four-class table before you have a finished policy.**

*No external statistic cited; this article draws on practitioner method rather than sector survey data, consistent with the "caveat honestly" rule when the register has nothing directly relevant.*
