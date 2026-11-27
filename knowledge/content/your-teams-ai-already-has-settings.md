---
slug: your-teams-ai-already-has-settings
short_slug: decide-your-team-ai-settings
title: 'Your team''s AI already has settings: decide four of them on purpose'
summary: On Claude Team or Enterprise and Google Workspace with Gemini, four admin settings decide what the AI can see, reach, run and keep. What the vendors ship by default and the question to ask about each.
service: policy
format: Guide
level: Practitioner
date: '2026-11-04'
author: Mamdouh Alqudsi
tags:
- admin settings
- connectors
- data retention
- governance
- defaults
related:
- ground-rules-for-team-ai-use
- blast-radius-designing-what-an-automation-can-reach
- the-tool-inventory-the-least-glamorous-artefact-that-unlocks
linkedin_url: https://www.linkedin.com/pulse/your-teams-ai-already-has-settings-decide-four-them-purpose-alqudsi-sisge/
source_ref: AI Tips edition 38, brief dm-ai-defaults-to-decide (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7515123122082250752/); draft verified 2026-10-11
featured: false
---

This guide is for managers whose team already uses Claude or Gemini at work most days.

If your team works on a Claude Team or Enterprise plan, or on Google Workspace with Gemini, four settings already have values. Someone chose them, usually the vendor, and most of them start at "on" or "keep forever". Each one decides what the AI can see, reach, run or keep. None of them needs a policy document, but each needs one conversation between you and whoever holds the admin role. As of October 2026, here is what the vendors' own admin pages say ships by default, and the question I would bring to that conversation.

*A default is a decision. The only question is whether your organisation made it.*

## Where AI is switched on: off in one app is not off everywhere

Google's admin help (updated 9 October 2026) says Gemini features in Workspace services, from Gmail and Docs to Drive, Meet and Chat, are on by default. On Enterprise Standard, Enterprise Plus and some education editions, the admin can turn them off app by app. That sounds like fine-grained control. The catch is in Google's own wording.

- **The cross-app rule.** Google states: "Even if Gemini is off for a specific app, users can still access its data when using Gemini in other apps." Its example is a Gmail user asking Gemini about a Drive file while Gemini is off for Drive. If your aim is to keep a body of files away from AI, an app switch will not do it.
- **The Gemini app is a separate switch.** Access to gemini.google.com, the Gemini mobile apps and Gemini in Chrome is set elsewhere, has no effect on the AI features inside Workspace apps, and Google says changes can take up to 24 hours.
- **Which licence your people are on matters.** For users with a qualifying Workspace edition, Google says content is "not human reviewed or used for Generative AI model training outside their domain without permission". For users without one, "their chats may be reviewed by human reviewers". The question for your admin: is everyone who uses Gemini for work on a qualifying edition?

## What it can connect to: the key, and what it may do with it

Connectors let Claude read from and act in other tools: a drive, a calendar, a ticketing system. On Team and Enterprise plans, Anthropic's help page on connectors says an Owner or Primary Owner has to add a connector for the organisation first. Adding it does not give anyone access. Each person still signs in with their own account, so Claude can reach what that person can reach, and no more.

- **Decide which connectors exist at all.** Members cannot use one the Owner has not added, so the list of connectors your organisation has added is a decision you can actually see. Ask to see that list.
- **Decide what each may do.** Owners can set a connector's actions to Always allow, Needs approval, or Blocked. Anthropic says the choice applies to everyone in the organisation using that connector, and individual users cannot override it. My default for a new connector would be reading allowed and anything that sends, edits or deletes set to Needs approval, until the team has used it for a few weeks.
- **Know the limit.** Restricting actions in Claude never grants more access than the source system already gives that person. If someone can see too much in your drive today, a connector does not create that problem, but it is a good reason to fix it before you connect anything.

> Connecting a tool is handing over a key. Deciding which doors it opens is a manager's job, not a setting the vendor picks.

## What it can run and reach: the sandbox has a door

Claude can write and run code to analyse a file or build a spreadsheet. Anthropic's help page (updated 6 August 2026) says this "Code execution and file creation" capability is on by default for Team organisations and for new Enterprise ones. Owners control it under Organisation settings > Capabilities, along with how far that code can reach the internet.

- **The range of network options.** Owners choose between no internet access, package managers only, package managers plus a list of domains they approve, or all domains. Anthropic itself describes "all domains" as the riskiest option. For new Enterprise organisations, outside network access starts switched off.
- **Why it matters.** Anthropic's own page warns that Claude "could theoretically be tricked into sending data to external servers", for example by hidden instructions inside a file or web page from outside. The more places the sandbox can reach, the more places such an instruction could send data to.
- **The question to ask.** Which network option is set today, and who chose it? Check the live setting rather than assuming the default. If nobody can name a reason for wider access, choose the narrowest option the team's work actually needs.

## How long it keeps the conversation: "forever" is a retention policy too

Every chat your team has holds whatever they pasted into it. On Claude Enterprise, Anthropic's help page says that data is "retained indefinitely unless a custom retention period is set". Only an Owner or Primary Owner can change that, under Organisation settings > Data and Privacy.

- **The floor and the trap.** The shortest period allowed is 30 days. Chats inside a project follow the project's retention, which takes precedence, and projects are kept indefinitely by default. A short chat setting does not cover chats that live inside projects.
- **Shortening is not reversible.** When a shorter period is saved, data older than it is scheduled for permanent deletion straight away. Anthropic says a daily process does the deleting, which can take several days for large volumes. Check with whoever handles records or legal holds first.
- **It leaves a trail.** Anthropic says every retention change and deletion is recorded in the audit logs. Ask who reviews those logs, and how often.

My own judgement, not a vendor's: decide each of these four on purpose, and write the answer down where the team can see it. "Off" is a legitimate answer, but it is a decision with costs of its own. The work still needs doing, and people will find another way to do it.

## The bottom line

**Your team's AI already runs on someone's decisions about what it can see, reach, run and keep, so make sure those decisions are yours.** What to do this week: book 30 minutes with your Claude or Workspace admin, open these four settings together, and for each one write down the current value, who chose it, and whether you would choose it again.

## Sources

- https://knowledge.workspace.google.com/admin/gemini/manage-access-to-gemini-features-in-workspace-services
- https://knowledge.workspace.google.com/admin/generative-ai/gemini-app
- https://support.claude.com/en/articles/11176164
- https://support.claude.com/en/articles/12111783
- https://support.claude.com/en/articles/10440198-custom-data-retention-controls-for-claude-enterprise
