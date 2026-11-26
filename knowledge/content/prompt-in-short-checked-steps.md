---
slug: prompt-in-short-checked-steps
title: "Prompt in short, checked steps: brief first, one ask, specific feedback"
summary: "Habits that beat prompt formulas: brief the AI with the reason and the deliverable, ask for one outcome at a time, start plain, give feedback specific enough to act on, keep prompts that work and check every number and quote."
service: training
format: Guide
level: Entry
date: 2026-10-27
author: Mamdouh Alqudsi
series: fluency-foundations
series_order: 1
tags: [prompting, discernment, feedback, research, fluency]
related: ["context-engineering-vs-prompt-engineering", "prompt-patterns-that-survive-contact-with-real-documents", "the-four-checks-before-anything-leaves-the-building"]
linkedin_url: ''
source_ref: "profile articles #14, #18, #47, #48; newsletter ed 31 (plan-before-it-acts), ed 32 (brief-first, name-the-deliverable, let-it-question-you, critique-then-keep)"
featured: false
---
Most wasted time with AI comes from the way people ask, not from the tool. Long bundled requests, borrowed formulas and vague corrections all feel efficient and all cost you a second editing pass. The fix is a working rhythm of short steps: ask one thing, start plain, correct precisely, and check the facts that matter.

This guide is hands-on and task-level. It assumes you already use an AI chat tool and want fewer rounds of rework.

## Ask for one outcome at a time

When three things are on your mind, it is tempting to write all three into one message and assume one trip will save two. It rarely does. Stacking three requests into one prompt does not save three trips: it usually costs five.

A colleague can ask a clarifying question or tell you what they skipped. A single AI response does not do that by default. It tries to satisfy everything in one pass, and when the asks pull in different directions, something gets shortchanged without any signal of what. The reply still reads as complete, with full sentences and a confident tone, so the gap only shows later, usually in the part that mattered most.

Untangling is the real cost. If the reply blends three unrelated changes, accepting the two that are right means accepting, or stripping out by hand, the one that is not. Whatever you stated last or least specifically is the most likely to get generic treatment.

Three working rules:

- **One outcome per prompt.** If you cannot finish "I want this response to do ___" with a single verb phrase, it is probably two prompts.
- **Finish the loop before adding the next ask.** Get the first thing right, confirm it, then move on. It is slower to type and faster overall.
- **Sequence related tasks explicitly.** "First do A. Once that is settled, we will do B" gives a clear order instead of asking the model to juggle both.

Batching is fine when it is the same job repeated. "Summarise each of these five reports using the same three headings" is one instruction, so there is nothing to prioritise between. The dividing line is not the number of items. It is whether the asks are the same job repeated or different jobs competing for one response.

## Start with the plain version, not a formula

Seven-step frameworks and magic phrases circulate constantly. Most were true for a specific model at a specific moment. Models change every few months, and a phrase that mattered for one version often does nothing for the next, because the weakness it compensated for has been fixed. You cannot tell which formulas still apply just by reading them.

> A memorised formula answers last year's model. A quick test answers today's.

Instead:

1. **Try the plain version first.** Ask directly, with no trick layered on top.
2. **Notice what is actually missing.** Look at what the answer got wrong, not at which technique you forgot.
3. **Add only what the gap calls for.** Missing context: add context. Wrong format: name the format.

This is not the same as having no method. You still notice what changed between a good result and a bad one, and carry that forward as a working sense of what a given tool needs. The difference is that your habit comes from evidence rather than from a rule written for another model.

Some structures are worth keeping because they close a real information gap: state the audience, name the format, give one example. A simple test: if you can explain in plain terms why a technique should work, it is probably durable. If you cannot, it was probably specific to a version that has gone.

## Brief the AI before you ask

Most weak answers trace back to a weak first message: a one-line request sent to a tool that knows nothing about your audience, your files or why you are asking. Anthropic's prompting guide describes Claude as "a brilliant but new employee who lacks context on your norms and workflows". The plain version of a prompt still needs the situation, not only the task.

- **Give the reason, not only the rule.** Anthropic's guide says that explaining why an instruction matters helps Claude "better understand your goals and deliver more targeted responses". Microsoft's Copilot training lists four elements for a prompt: context (why you need it and who is involved), goal, source (specific files, emails or meetings) and expectations.
- **Put long material first and the question last.** Anthropic advises placing long documents above the query and instructions, which it says improves performance across models.
- **Name the deliverable.** Say what the finished piece looks like: audience, tone, length and structure. Microsoft's training notes that a response for senior leadership reads differently from one for a project team, and Anthropic calls examples "one of the most reliable ways" to steer format, tone and structure.
- **Test the brief on a person.** Anthropic's own test: if a colleague with minimal context would be confused by your prompt, the AI will be too.

When you cannot see what the brief is missing, turn it round and let the AI interview you. Give a short description of the goal and the reader, then add: "Don't start working yet. Ask me clarifying questions first." Brian Simms of Graduate School USA describes this as the "You Ask Me" technique (8 October 2025): answering specific questions is easier than anticipating everything the tool might need. Use it on a draft that matters, and for routine tasks tell the tool to proceed on stated assumptions instead.

For a job with several steps, such as reorganising a shared folder of reports, ask for the plan before the work. In Claude Code, plan mode (Shift+Tab, or a prompt that starts with /plan) has Claude read and propose without editing anything until you approve. A plan you can read and correct is a brief you have already reviewed.

## Give feedback a person could act on

"Make it better" is the least useful feedback you can give a person, and it is just as useless for AI. The model cannot read your mind about what is wrong, so the quality of the next draft depends on what you say about this one. Vague feedback gets you a different draft. Specific feedback gets you a better one.

- **Name the exact sentence or section.** "The second paragraph buries the point" gets fixed. "This isn't quite right" gets rewritten at random.
- **Say what is wrong.** "Too formal for this audience" is fixable. "I don't love it" is not.
- **State the standard.** If you want a particular person's voice, a specific past email or a specific tone, say so rather than hoping it is inferred.

A good test: could you hand this feedback to a new hire and expect a specific change?

Two further habits help. Keep a running note of corrections you make often, such as phrases you always cut or a structure you always ask for, and paste that list in as a starting instruction so you stop repeating yourself. And if a draft is wrong in its basic approach, not just its execution, do not patch it for three rounds. Say plainly that the approach is wrong and why, then let it restart.

### Review against criteria, then keep the prompt

Feedback works better when the AI applies it to itself first. Anthropic describes self-correction as the most common chaining pattern: generate a draft, have Claude review it against criteria you state, then have it refine the draft based on that review. Microsoft's training makes the same point for Copilot: refine with follow-up prompts instead of accepting the first response, and check the cited sources before sharing.

Once a prompt has produced a good result, save it. In Microsoft 365 Copilot you can hover over a prompt you have run, click the bookmark icon and choose Save prompt. For a small team, a short shared list of prompts that worked is the cheapest training material available, because the next person starts where you finished.

## Check the specifics before you use them

AI research tools are confident whether or not they are right, and confidence is not the same signal as accuracy. Treat every specific claim as a lead to check, not a fact to cite.

| Fine to delegate | Always verify |
|---|---|
| Finding starting points: sources, angles, search terms | Any statistic |
| Summarising long material you will read yourself anyway | Any direct quote |
| Outlining a write-up from findings you already trust | Any named study, date or number |

The two-minute check: ask the tool for its source, then open that source. If it does not exist, does not say what was claimed, or cannot be found, that is not a rare glitch. It is the model doing what it was likely to do with an obscure or specific fact. If you cannot verify a claim independently, treat it as unconfirmed.

Speed on the search, rigour on the facts.

## What to do next

- Before your next important request, write the reason, the reader and the finished format into the prompt, or ask the AI to question you first.
- Split your next multi-part prompt into separate prompts and compare the results with your usual bundle.
- Run your next task plain first, then write down what was missing before adding anything.
- Rewrite your last piece of feedback so a new hire could act on it.
- Start a short list of the corrections you repeat and paste it into your next chat.
- Open the source behind every statistic or quote before it goes into anything you send.
- Save the next prompt that gives you a result you would send, and share it with the team.

## Sources

- Anthropic, Claude prompting best practices: https://platform.claude.com/en/docs/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Microsoft Learn, Write prompts that get results: https://learn.microsoft.com/en-us/training/modules/get-ready-work-microsoft-365-copilot/4-write-prompts-that-get-results
- Microsoft Support, Save your favourite prompts: https://support.microsoft.com/en-us/microsoft-365-copilot/save-your-favorite-prompts-to-use-again
- Graduate School USA, the "You Ask Me" technique: https://www.graduateschool.edu/learn/ai/you-ask-me-technique
- Claude Code, permission modes: https://code.claude.com/docs/en/permission-modes
