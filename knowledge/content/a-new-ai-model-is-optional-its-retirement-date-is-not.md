---
slug: a-new-ai-model-is-optional-its-retirement-date-is-not
short_slug: ai-model-launches-and-retirements
title: A new AI model is optional; its retirement date is not
summary: 'Treat model launches as optional and retirement dates as deadlines: list which tools call which model, name an owner for each vendor notice, and keep ten real tasks as a test set for either decision.'
service: support
format: Guide
level: Practitioner
date: '2026-11-10'
author: Mamdouh Alqudsi
tags:
- model retirement
- deprecation
- test set
- vendor management
- ownership
related:
- vendor-concentration-and-the-exit-plan-diversifying-ai-suppliers
- the-tool-inventory-the-least-glamorous-artefact-that-unlocks
- the-year-two-problem-what-happens-after-ai-adoption-succeeds
linkedin_url: https://www.linkedin.com/pulse/new-ai-model-optional-its-retirement-date-mamdouh-alqudsi-z75be/
source_ref: AI Tips edition 40, brief dm-launch-optional-retirement-not (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7515373808090935296/); draft verified 2026-11-04
featured: false
---

Two dates on the vendors' own pages matter more to your team than any new model. Anthropic retires Claude Sonnet 4.5 on its API on 30 November 2026. Google lists 1 December 2026 as the earliest possible shutdown date for Gemini 2.5 Pro and Gemini 2.5 Flash. If a tool your team relies on calls one of those models through an API, it stops working at or soon after those dates (as of November 2026).

*Treat a new model as optional and a retirement date as a deadline, and keep ten of your own tasks ready so either decision takes an afternoon.*

**Do this week.** Ask whoever runs your AI-based tools for one list with three columns: tool, model, platform. Check each model against the two dates above.

## Launches are optional: decide once what would make you switch

The pace is the point. Anthropic's release table shows new Claude models on 1 September, 22 September, 28 September and 7 October. If every launch reopens the question of which tool your team uses, you will be reopening it every week or two.

- **The vendor's own default is a fine place to stop.** Anthropic's model guide says plainly: "Most workloads start with Claude Opus 5.5." Its other advice is to start with a cheaper model where speed and volume matter and upgrade "only if necessary for specific capability gaps".
- **Write down your switching criterion now.** For example: "We change the default when a new model does better on our test set, or when the current one is deprecated." One sentence, agreed once, saves a debate per launch.
- **The limit of this advice.** If your hard tasks are clearly failing today, a launch may be the fix. Then test it, as in the third section. Optional does not mean ignore. It means you choose when.

## Retirements are deadlines: find out what is built on which model

This is where the real risk sits, and it is mostly invisible to a manager. It does not concern people typing into a chat app. It concerns anything built on the APIs: a vendor's tool, an internal assistant, an automation someone set up last year. Each one names a specific model, and that model has an end date.

- **What happens at the date.** Anthropic's deprecations page says "Requests to retired models fail", and promises at least 60 days' notice for publicly released models. Claude Sonnet 4.5 was deprecated on 30 September and retires on 30 November 2026, with Claude Sonnet 5.5 as the recommended replacement.
- **Google publishes earliest dates, not final ones.** Its page says the listed dates are "the earliest possible dates" and that the exact date will come "with advance notice". Five preview models, all text-to-speech or audio, are listed for 17 November. Gemini 2.5 Pro and 2.5 Flash are listed for 1 December.
- **Where it runs changes the date.** Anthropic's dates apply to its own platforms. Its page says Amazon Bedrock and Claude models on Google Cloud (Google managed) "set their own retirement schedules". So the question is not only which model, but through whose cloud.

> A launch changes what is possible. A retirement changes what still works. Only one of them has a deadline.

## Keep ten real tasks as your test set

Both decisions need the same evidence: does the new model do our work at least as well as the old one? Anthropic's guide says "Having a good evaluation set is the most important step in the process". For a team, that does not mean a technical benchmark. It means a short folder of real work.

- **Pick ten tasks your team actually does.** A donor update drafted from notes, a table summarised, a policy question answered from a long document. Keep the prompt, the input and the answer you accepted. Remove anything confidential first.
- **Judge on what the vendor lists.** Anthropic's checklist is accuracy of responses, response quality and handling of edge cases, then weighing performance against cost. A one-line note per task ("same", "better", "missed the figure in row 12") is enough.
- **Rerun it on a trigger, not on every launch.** Run it when a deprecation notice arrives, when your switching criterion is met, or when someone reports that the hard tasks are failing. An afternoon, not a project.

## Name who reads the notice, and what they check

Anthropic says affected customers are notified by email. In many small organisations the address on the account belongs to a former colleague, a shared inbox nobody reads, or a vendor. The most useful thing a manager can do here takes ten minutes and one conversation.

- **Name one owner per AI system.** For each tool built on an API, someone who knows which model it calls, through which platform, and who receives the vendor's notices.
- **Ask your vendor the direct question.** "Which model and version does your product call, and what is your plan when it retires?" A vendor who cannot answer has a gap you will inherit.
- **Use the audit the vendor provides.** For direct Claude API use, Anthropic's page describes a usage export: in Claude Console, open Usage, click Export, and the CSV breaks usage down by API key and model. That shows in one file whether anything still calls a deprecated model.

## The bottom line

**Let launches wait until your own test set says they help, and put every retirement date in the calendar of a named owner.**

## Sources

- https://platform.claude.com/docs/en/about-claude/model-deprecations
- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://aistudio.google.com/docs/deprecations
