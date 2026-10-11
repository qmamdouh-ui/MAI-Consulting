---
slug: stop-re-explaining-projects-and-skills
title: "Stop re-explaining yourself: when to use a Project and when to build a Skill"
summary: "A Project holds standing context, a Skill holds a repeatable process; this guide shows how to set up each, what to put in, and how to turn five manual steps into a Skill."
service: agents
format: Guide
level: Practitioner
date: 2026-09-12
author: Mamdouh Alqudsi
series:
tags: [claude projects, skills, repeatable tasks, instructions, workflow]
related: ["agent-skill-or-tool-three-things-with-three-different-costs", "write-the-method-before-you-buy-the-agent", "ground-rules-for-team-ai-use"]
linkedin_url: ''
source_ref: "profile articles #27, #28, #46"
featured: false
---
Every new chat starts from zero. Whatever you explained carefully last week, whatever correction you made, whatever format you finally settled on, none of it carries forward unless you retype it. If you have pasted the same background into a chat for the third time this week, you have a memory problem that two features address in different ways.

The advice here reflects Claude's Projects and Skills as described in September 2026. Check the current product before relying on specifics, but the underlying habit holds whichever tool you use: say things once.

## Why a blank chat is normal, and when it hurts

A blank slate is usually fine, because most requests really are one-off. It only hurts on requests you make again and again. There, retyping the same context, caveats and corrections adds up to real, repeated effort, and you end up re-deriving a good result slightly differently each time, hoping you remember the phrasing that worked before.

## Projects and Skills: which one for what

| | Project | Skill |
|---|---|---|
| What it holds | Standing context and a few core references | A process you repeat, with its format and corrections |
| The problem it solves | Re-explaining your situation | Re-explaining how to do a task |
| Good example | Your team's writing style and the reports you work from | Weekly status update, donor correspondence first pass, notes into action items |

A Project is not a smarter model. It is the same model with better memory of your specific situation. A Skill is where a good chat's lessons go to stop being forgotten.

## Setting up a Project

- **Put in instructions that rarely change.** Writing style, report format and standing constraints on any output belong in the Project's custom instructions, not in each message.
- **Add the two or three files a conversation needs.** Not everything you have ever written. A cluttered Project answers questions worse, not better.
- **Keep sensitive material out.** A Project is convenient, not a vault. Treat what you put in it as you would anything else you send to an AI tool (see the ground rules guide on what never to paste).
- **Skip it for one-off questions.** If you will never ask a related question again, a normal chat is faster to start and nothing is lost.

The habit that makes a Project worth the setup: the first time you catch yourself making the same correction twice, update the instructions. That is the signal the Project is missing something it should already know, and fixing it once saves every conversation after.

## What a Skill preserves

- **Corrections you have already made.** If you fixed the same mistake three chats in a row, a Skill can bake the fix in.
- **The exact format you settled on.** The version that finally worked becomes the default output.
- **Context that does not change.** Audience, tone and constraints that apply to every instance can live in the Skill.

One limit: a Skill does not remember what you never wrote down. A correction that lived only in your head is not in the Skill either. The memory is not automatic. It is just durable once captured.

## Build your first Skill from five steps you already do

Most recurring tasks already have an informal process. If you could talk a new colleague through it without thinking hard, it is ready. Choose your most repeated task, not your hardest: a weekly status update, a first pass at donor or board correspondence, or cleaning meeting notes into action items.

1. **Write down what you actually do,** including the shortcuts and the parts you skip half the time, not an idealised version.
2. **List the inputs each step needs.** A report step might need last week's numbers; a correspondence step might need the donor's name and gift history.
3. **Flag the judgment calls.** Formatting a date or pulling a total is mechanical. Choosing which three highlights matter is a decision. Mark the second kind so the Skill asks rather than guesses.
4. **Write as if teaching a competent stranger.** No shorthand, no "obviously". If a new hire would need it spelled out, so does the Skill.
5. **Name it for the task, not the tool.** "Weekly Status Draft" gets used. "Report Helper" gets forgotten.

## Test it on real work

Run the Skill on a real example, not a hypothetical one, and compare the result with what you would have written by hand. Where it is off, do not just fix that one output. Fix the instruction that caused it. That correction is permanent, which is the point: the second run should already be better than the first, and the tenth should need no correction at all.

## What to do next

- Count how many times this week you pasted the same background into a chat; if it is three or more, create a Project for it.
- Pick your most repeated task and write its five steps, inputs and judgment calls in one page.
- Turn that page into a Skill named for the task, and run it on a real example today.
- Fix the instruction, not the output, each time the Skill gets something wrong.
- Review your Project's files and remove anything the conversations do not actually need.
