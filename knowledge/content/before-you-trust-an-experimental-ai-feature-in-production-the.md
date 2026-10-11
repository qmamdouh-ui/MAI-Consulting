---
slug: before-you-trust-an-experimental-ai-feature-in-production-the
title: 'Before you trust an experimental AI feature in production: the client''s checklist'
short_slug: trust-experimental-ai-feature-production-checklist
summary: A new AI feature arrives labelled experimental. Do you adopt or refuse? Neither. The Trust Ladder moves a feature from sandbox to standard in five steps, with a fallback and a named owner at each.
service: agents
format: Analysis
level: Advanced
date: '2026-10-08'
author: M.A.I. Consulting
series: ai-consulting
tags:
- AIGovernance
- AIRisk
- DigitalTransformation
- AIStrategy
- Leadership
related: []
linkedin_url: ''
source_ref: 'ai-consulting queue #10 (https://www.linkedin.com/article/edit/7508802889327415296/)'
featured: false
---

Every few weeks, a supplier announces something new. A feature in preview, a beta agent, an "experimental" mode that promises to do in minutes what took hours. The demonstration is compelling, a colleague has already tried it, and the question arrives on a manager's desk: can we use this for real work?

The instinct is either to say yes because the gain looks large or to say no because the label says experimental. Both answers avoid the actual decision. What the client needs is not a verdict on the feature but a short, repeatable way of deciding how much weight it may carry, and how quickly that weight can be withdrawn.

*"Experimental" is not a reason to refuse a tool. It is a reason to limit what depends on it.*

## Why the label matters less than the dependency

A preview feature can be more reliable in a narrow task than a mature one is in a broad task. What distinguishes experimental features is not necessarily lower quality. It is that the behaviour, the price, the availability and the terms may change without much notice, and that the supplier has made fewer commitments about them.

That shifts the question. Rather than asking whether the feature is good, ask what happens to us if it changes or disappears next month. If the answer is "we return to the old method by lunchtime", you can experiment freely. If the answer is "a donor deadline is missed", you cannot yet.

## The Trust Ladder

We use five rungs. A feature earns each one by passing a defined test, and it can be moved back down as easily as up.

**Rung one: sandbox.** Use only with non-sensitive, throwaway material. Purpose: learn what it does. No decision depends on the output.

**Rung two: shadow.** Run it alongside the existing method on real tasks, and compare results without acting on the new output. Purpose: measure quality against something you know.

**Rung three: supervised.** Use its output in real work, with a named person checking every result before it leaves the organisation. Purpose: find the failure modes that only appear at volume.

**Rung four: bounded.** Allow it to operate within explicit limits, on defined data classes, with sampling checks rather than full review. Purpose: capture the efficiency once the failure pattern is understood.

**Rung five: standard.** Adopt it as a normal method, with an owner, a documented procedure, and a fallback.

> A feature does not become trustworthy because it has been used for a long time. It becomes trustworthy because someone measured what it does when it goes wrong.

## The client's checklist

Before any feature moves beyond the sandbox, we suggest six questions. They are short enough to fit on a single page and specific enough to produce a record.

- **What data will it touch?** Classify it first. Nothing above your lowest-risk category should enter a feature that has not left the sandbox.
- **What is the fallback?** Write down the previous method and confirm someone still knows how to run it.
- **What does failure look like?** Describe the plausible errors in plain language, so that reviewers know what to look for, not just that they should look.
- **Who is the named owner?** One person, not a committee, who can pause the feature.
- **What is the change signal?** How will you learn if the supplier alters behaviour, terms or price, and who checks?
- **What will we measure?** Accepted outputs, review time and rework, in line with the cost per completed task, so that the decision to advance is evidence-based.

## What to do when the supplier's claims are impressive

Announcements often cite benchmark results or internal evaluations. These are useful as a starting hypothesis and insufficient as a decision. Independent reproduction is what turns a claim into evidence, and most small organisations cannot do it at scale. They can, however, reproduce it on their own documents.

Take twenty real examples, including the awkward ones, and test the feature against them. The results describe your use, not the supplier's showcase. That small test set is the most valuable asset in the process, and it can be reused each time the feature updates.

## A brief note on agents and browsers

The ladder applies with particular force to features that act rather than advise: tools that click, send, edit or approve on your behalf. The blast radius of such features, the set of things they can reach, matters more than their accuracy. For these, we suggest spending longer on rungs two and three, and limiting what accounts and data they can see before granting any autonomy.

## Moving up, and moving back down

The ladder is only useful if movement is easy in both directions. Define, in advance, what evidence advances a feature one rung. For example, a feature might move from shadow to supervised when its outputs matched the existing method on most of a fixed test set, with no error in the categories you consider serious. The threshold is for your organisation to set, and it should be written before the results are seen.

Equally, define what sends a feature back. A change in supplier behaviour, a serious error, a new data type or a change in who uses it should each trigger a return to an earlier rung until the test set has been rerun. This avoids the common pattern in which a feature is trusted because it was trusted last quarter, long after its behaviour has changed.

## Who decides

We suggest that the named owner holds authority to pause any feature immediately, without seeking permission, and that promotion to rungs four and five requires sign-off from the person accountable for the data involved. In many small organisations that will be the operations lead or the data protection lead. The decision is small, quick and recorded, which is what makes it sustainable.

Recording matters. A one-line entry noting the feature, the rung, the date, the owner and the evidence is enough. Over a year, those entries become the organisation's own evidence file, the kind of record a funder or auditor may one day ask to see.

## Questions for your next leadership meeting

- Which experimental features are our staff already using, and on what data?
- For each, what is the fallback and who knows how to run it?
- Do we have a small test set of our own documents to check new features against?

## The bottom line

**Trust an experimental feature in steps, not in one decision: sandbox it, shadow it, supervise it, bound it, and only then standardise it, with a fallback and an owner at every rung.** That way the organisation captures the upside early and keeps the downside small.

