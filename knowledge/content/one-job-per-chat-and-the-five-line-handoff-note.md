---
slug: one-job-per-chat-and-the-five-line-handoff-note
title: When to start a new chat, and the five-line note that carries over
summary: A chat doing four jobs costs more and answers worse. Give each job its own chat, and when the job changes, start fresh with a checked five-line handoff note instead of the whole history.
service: training
format: Guide
level: Entry
date: '2026-11-19'
author: Mamdouh Alqudsi
series: work-with-ai
series_order: 13
tags:
- context window
- chats
- handoff
- claude
- gemini
related:
- prompt-in-short-checked-steps
- stop-re-explaining-projects-and-skills
- ten-minutes-to-see-what-your-ai-remembers-about-you
linkedin_url: ''
source_ref: AI Tips edition 43, brief l2-one-job-per-chat (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7516460931908882432/); draft verified 2026-11-04
featured: false
---

A chat that started as a proposal outline, then became a budget question, an email and a slide, is doing four jobs. The answers still sound fluent, but more of each message goes on reminding the AI which version you are on. The fix is usually not a better prompt. It is a new chat with a short note carrying over what mattered (as of November 2026).

*Give each job its own chat, and when the job changes or the thread gets long, start fresh with a five-line handoff note instead of dragging the whole history along.*

**Try it today.** Open your longest-running chat in Claude or Gemini and paste this: "Before I start a new chat, write a handoff note in five lines: the goal, the decisions we made, the open questions, the sources we relied on, and the next step. No other text." Correct the note, then paste it into a new chat.

## Claude: long chats cost more, and they end

Every chat has a working memory, the context window, and everything you and Claude have said sits inside it. A new job in an old chat shares that space with every earlier draft and correction.

- **The limit is real.** Anthropic's help page on usage and length limits says length limits relate to the context window. On paid plans the newest models support up to 1 million tokens and others 500,000 or 200,000.
- **Long chats use more of your allowance.** The page says longer conversations that trigger automatic context management use more of your usage limit, and advises: "Try starting a new conversation if you're approaching your usage limit in a longer chat."
- **The automatic summary is not a filing system.** With code execution on, Claude summarises earlier messages when a chat nears the limit and keeps the full history available to refer back to. It is Claude, not you, that chooses what the summary keeps.

## Gemini: fix the request, don't stack corrections

Often a chat grew long because the first request was wrong and every later message patched it.

- **Edit the prompt instead of replying to it.** Google's Gemini Apps help page says to click Edit text to the right of your prompt, change it and click Update, and Gemini will regenerate the response. One corrected request beats four messages saying "no, shorter, and in French".
- **Start clean on purpose.** At gemini.google.com, New chat is at the top left (open the menu first if you do not see it).
- **For a one-off.** Temporary chat sits next to New chat. Google's page says it will not appear in your Gemini Apps Activity or recent chats, and it is not available with a work or school account.

> A chat that has done three jobs remembers all three. You only wanted it to remember one.

## Find the old thread without pasting it back

Starting fresh does not mean losing what you did. Both tools can look back at earlier chats when you ask, so the new chat can stay small and still be informed.

- **Claude's chat search.** On Pro, Max, Ultra, Team and Enterprise plans, on web, desktop and mobile, you can ask in plain words, for example "Let's continue where we left off with [project]". Inside a project it searches only that project's chats. The switch is "Search and reference chats" under Settings > Your Claude (Settings > Memory in the older layout).
- **What it skips.** Anthropic says Claude does not pull information from incognito chats when searching.
- **Gemini's memory of past chats.** If Memory is on (see the guide on reading what your AI remembers), Gemini can draw on past chats. Google's page says it needs Keep Activity on and is not available on work, school or supervised Google Accounts.

## The five-line handoff note

The search features find old chats. They do not decide what mattered. That part is yours, and it takes two minutes before you close the long chat.

- **Ask for it in a fixed shape.** Use the prompt at the top: goal, decisions, open questions, sources, next step. No other text.
- **Check it like a minute-taker.** Read the five lines against what you actually decided. The note is the AI's reading of the chat, not the record, so correct any decision it softened or any source it invented before you carry it forward.
- **Paste it as the first message of the new chat.** Then give the new job. If the same note keeps coming back every week, it belongs in a project's instructions instead.

## The bottom line

**One chat, one job: when the job changes, start a new chat and carry over five checked lines, not the whole thread.**

## Sources

- https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work
- https://support.claude.com/en/articles/11817273
- https://support.google.com/gemini/answer/13275745?hl=en
- https://support.google.com/gemini/answer/17004136?hl=en
- https://support.google.com/gemini/answer/16413516?hl=en
