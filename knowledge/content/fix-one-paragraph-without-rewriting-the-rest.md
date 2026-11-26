---
slug: fix-one-paragraph-without-rewriting-the-rest
title: 'Fix one paragraph without rewriting the rest: selection editing in Claude and Gemini'
summary: Once a draft is mostly right, mark what is finished, then change one passage at a time with Claude's Edit with Claude or Gemini Canvas, and review only the passage that changed.
service: training
format: Guide
level: Entry
date: '2026-11-05'
author: Mamdouh Alqudsi
series: work-with-ai
series_order: 12
tags:
- editing
- drafts
- claude
- gemini canvas
- review
related:
- prompt-in-short-checked-steps
- check-ai-output-before-it-ships
- one-report-many-audiences-with-ai
linkedin_url: ''
source_ref: AI Tips edition 39, brief l2-edit-the-passage (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7523759641571291136/); draft verified 2026-11-04
featured: false
---

You ask an AI to make one paragraph shorter. It sends back the whole draft, and three sentences you had already approved are now different. So you read everything again. Claude and Gemini both let you change one passage and leave the rest alone (as of November 2026).

*Once a draft is mostly right, fix it one passage at a time, so you only review what changed.*

**Try it in two minutes.** Take a draft you would normally re-prompt in full. Open it as a Claude doc or a Gemini canvas, select the one paragraph that bothers you, and ask for a single change.

## Decide what is finished before you ask for changes

If you have not decided which parts are done, any edit you ask for is a request to start over. Five minutes of marking turns a vague rewrite into one or two precise ones.

- **Read once and sort.** Put each paragraph in one of two piles: keep as is, or needs work. Usually the second pile is one or two paragraphs.
- **Name the problem in each passage.** "Too long", "wrong order", "the figure needs its date", "too formal for this reader". One problem per request is easier to check than five.
- **Keep the brief in the chat.** Who the draft is for and what it must do still apply. The edits are the last step, not a replacement for briefing the AI properly.

## Claude: highlight the text and click "Edit with Claude"

Anthropic's help page says it directly: in a doc, "highlight the text you want changed, click Edit with Claude, and type your request." You do not have to describe which paragraph you mean.

- **Get the draft into a doc.** Ask for a doc in the chat, or choose "Output" in the message box and pick a template. It needs the capability labelled "Cloud code execution and file creation" switched on in Settings > Capabilities. On Team and Enterprise plans it sits in Organisation settings.
- **Mark the passage, then ask.** For example: "Cut this to two sentences and keep the figure."
- **Type small fixes yourself.** A wrong date or a clumsy word is faster to fix by hand. When you are done, Export offers Word, PDF, Markdown and Google Docs.

> The paragraph you already approved is the one an AI rewrite should not touch.

## Gemini Canvas: select the text, then ask

Canvas is Gemini's document panel. Google's help page describes the same move, and adds two one-click edits for the most common requests.

- **Open the draft in Canvas.** At gemini.google.com, below the text box, click Add Files, then Canvas, enter your prompt and submit. You can also edit the text yourself in the panel.
- **Select, then prompt.** Select the text, type the request and press Enter. If you are not sure what is wrong with a passage, select it and click Suggest edits.
- **Use the quick edits and the versions.** Change length and Change tone cover most requests. Previous Version and Next Version let you step back from a change you dislike. Share & export, then Export to Docs, opens the text in a new Google Doc. You need to be signed in to Gemini Apps.

## Check only the passage that changed

Selection editing makes the review smaller. It does not make it optional. The check is quick because you know exactly where to look.

- **Read the changed passage against your note.** If you asked for "two sentences, keep the figure", count the sentences and find the figure. If either is missing, ask again for that passage only.
- **Read the sentence before and after.** A shortened paragraph sometimes loses the link the next paragraph relied on.
- **Treat pasted text with care.** Anthropic's help page says to handle a published artefact from someone else "the way you'd treat a file from an unknown sender". I apply the same rule to text pasted in from outside.

**A prompt to start from:** "Change only the highlighted passage: [your request]. Keep every figure and date. Do not touch anything else."

## The bottom line

**When a draft is mostly right, mark what is finished, then change one passage at a time and check only what changed.**

## Sources

- https://support.claude.com/en/articles/12138966-release-notes
- https://support.claude.com/en/articles/9487310-what-are-artefacts-and-how-do-i-use-them
- https://support.google.com/gemini/answer/16047321?hl=en
- https://gemini.google/release-notes/
