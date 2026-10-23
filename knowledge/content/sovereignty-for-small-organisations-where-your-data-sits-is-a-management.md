---
slug: sovereignty-for-small-organisations-where-your-data-sits-is-a-management
title: "Sovereignty for small organisations: where your data sits is a management decision"
short_slug: data-sovereignty-four-locks
summary: 'Server location says little about who can compel access, switch the service off or how fast you could leave. The Four Locks (location, jurisdiction, access, exit) make that call in an afternoon.'
service: policy
format: Framework
level: Practitioner
date: '2026-10-20'
author: M.A.I. Consulting
series: ai-consulting
tags:
- DataSovereignty
- AIGovernance
- DataProtection
- InternationalOrganisations
- Nonprofits
related:
- vendor-concentration-and-the-exit-plan-diversifying-ai-suppliers
- data-classification-from-zero
- legal-protection-it-and-procurement
linkedin_url: ''
source_ref: 'ai-consulting queue #18 (https://www.linkedin.com/article/edit/7508804189808943104/)'
featured: false
---

"Where is our data?" is usually treated as an IT question with a one-word answer: Ireland, Frankfurt, the United States. It is a good place to start and a poor place to stop. For an international organisation holding beneficiary records, donor information and partner correspondence, the location of a server tells you very little about who can compel access to it, who can switch it off, and how quickly you could leave.

Small organisations do not build sovereign clouds. But they make sovereignty decisions every time they choose a tool, sign a licence or paste a document into an assistant. These are management decisions, and they can be made well with four plain questions.

*Data location is a fact about geography. Sovereignty is a fact about who holds the keys.*

## Why "where" is the wrong first question

Storing data in a particular country can help with rules on cross-border transfers and with partner expectations. It does not settle the jurisdiction of the company that operates the service. Under the US CLOUD Act of 2018, for example, US law requires providers subject to US jurisdiction to preserve and produce data in their possession, custody or control regardless of where it is stored. The Act also gives providers a way to challenge requests that conflict with another country's law. The practical point is not that any particular request is likely. It is that a data centre address and a legal exposure are separate things, and a risk assessment that records only the first is incomplete.

The same logic applies to AI features layered on top of storage. A document held in one region may be processed for a summary or a search in another, by a different sub-processor, under different terms. The question is not only where the data sits, but where it goes when you use it.

## The Four Locks

Each lock is a separate way in which control can be held or lost, and each can be assessed in an afternoon.

- **Location.** Where is the data stored and processed, including for AI features, backups and support access? Ask for the answer in writing, by service, not as a general statement on a website.
- **Jurisdiction.** Which legal systems can compel the provider, its parent company or its sub-processors to hand data over? For international organisations, also record any privileges and immunities you rely on, and whether the contract actually preserves them.
- **Access.** Who can see the data in practice: the provider's staff, sub-processors, your own administrators? Are prompts and files used to train models, retained for review, or deleted, and on what schedule?
- **Exit.** Could you leave? This means exporting your data in a usable form, deleting it at the provider on request, and moving to another tool within a timeframe your operations can survive.

A tool does not need to score perfectly on all four. It needs to score well enough on the locks that matter for the data involved.

> If you cannot describe how you would leave, you have not yet made a sovereignty decision. You have made a dependency.

## Matching the locks to the data

The mistake seen most often is applying one standard to everything. A blanket rule that "all data must stay in-region" is either unenforceable or so restrictive that staff bypass it, which is the shadow AI problem in another form. Tie the locks to the data classes the organisation already uses, or should.

- **Public and low-sensitivity material.** Location and jurisdiction matter little. Convenience and cost can lead. Exit still matters, so that your working files are not held hostage.
- **Internal working documents.** Access and exit matter most. Confirm retention and training terms, and keep an export routine.
- **Personal data and donor information.** All four locks apply. Record the assessment, and involve your data protection lead before adoption, not after.
- **Beneficiary, protection and case data.** Treat as the highest tier. Either keep it out of general-purpose AI tools altogether or use arrangements where all four locks have been checked and documented by someone with authority to say no.

This is the same permissions-first logic used for policy generally: state clearly what may go where, rather than banning tools and hoping.

## Regional and sovereign options: how to weigh them

Regional providers and sovereign offerings are multiplying, and they can be the right answer for sensitive data. They are not automatically safer. Ask the same four questions of them as of any other provider, and add two more. First, how mature is the service, including security certification and support? Second, is the model or tool good enough in your working languages and your subject area? A tool that fits your jurisdiction but fails your workflow will be replaced by whatever staff use privately. Weigh the trade-off openly and record it.

## Questions for your next leadership meeting

- For each AI tool in use, can we state in writing where our data is processed, which jurisdictions can reach it, and who can see it?
- Which data classes are we comfortable sending to which tools, and where is that decision recorded?
- If our main AI provider changed its terms tomorrow, how long would it take us to leave?

## The bottom line

**Sovereignty for a small organisation is not a location on a map. It is four locks, location, jurisdiction, access and exit, assessed in writing and matched to the sensitivity of the data.**

## Your next step

Pick the three AI tools your staff use most. For each, complete a one-page Four Locks assessment from the vendor's own documents and contract, marking every answer as confirmed in writing, assumed or unknown. The unknowns are your risk register. Then test one exit: export your data from one tool and check that a colleague can open and use it.

## Sources

US CLOUD Act (adopted 23 March 2018): obligation on US-jurisdiction providers to preserve and produce data regardless of storage location, with a provider right to challenge conflicting requests (Congress.gov CRS R45173 and LSB10125; Eurojust summary). No claims are made about specific requests or about international-organisation immunities. The Four Locks is a framework proposed by M.A.I. Consulting.
