---
slug: say-the-brief-out-loud
title: 'Say the brief out loud: better context in one minute'
summary: Spoken, the background you skip when typing takes a minute and comes out fuller. How to dictate a brief into Claude, Gemini, Windows or macOS, and the read-back of names and numbers before you send.
service: training
format: Guide
level: Entry
date: '2026-11-24'
author: Mamdouh Alqudsi
series: work-with-ai
series_order: 14
tags:
- dictation
- voice
- briefing
- claude
- gemini
related:
- prompt-in-short-checked-steps
- context-engineering-vs-prompt-engineering
- ground-rules-for-team-ai-use
linkedin_url: https://www.linkedin.com/pulse/say-brief-out-loud-better-context-one-minute-mamdouh-alqudsi-a1xge/
source_ref: AI Tips edition 44, brief l2-say-the-brief-out-loud (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7516098545188364289/); draft verified 2026-11-04
featured: false
---

Typing the background is the part most people skip: who the reader is, what is already settled, what must not change. Said out loud, the same background takes about a minute and comes out fuller than most people would ever type it. Claude and Gemini both accept speech now, alongside the dictation built into Windows and macOS (as of November 2026).

*When a request needs context, say it instead of typing it, then read the text before you send it.*

**Try it in one minute.** Open Claude or Gemini, press the microphone and talk about the goal, the reader and the limits. End with: "Before you write anything, list what you understood and ask me what is missing." Fix the transcript, then let it write.

## Say the brief, not the question

The point is not to sound polished. It is to get the background out of your head and into the message box, then let the AI do the tidying.

- **Cover four things, in any order.** The goal, the reader, what you already have, and the limits. For example: "I need a half-page update for a partner who missed last week's call. They care about the timeline, not the budget. Here is what changed..." Then keep talking.
- **Ramble, then ask for structure.** The closing line above turns a messy minute of speech into a checked brief, because the AI shows you what it understood before it writes anything.
- **Any text box works.** On Windows, put the cursor in the box and press Windows key + H. Microsoft's help page says voice typing needs an internet connection and uses online speech recognition. On a Mac, turn on Dictation under System Settings > Keyboard > Dictation, then use the Microphone key or your Dictation shortcut.

## Claude: dictation to type, voice mode to think

Claude offers two things that both start with your voice. Dictation turns your speech into text in the message box, where you can read it. Voice mode is a spoken conversation where Claude talks back. For getting a long brief in, you want dictation.

- **Voice mode in practice.** Anthropic's help page calls it a beta on all plans, including Free, on iOS, Android, the desktop app and the web. On web and desktop, start a new chat and tap the sound-wave icon at the lower right. It is hands-free by default and replies at natural pauses. Anthropic recommends push-to-talk in noisy places.
- **Know the limits.** Voice conversations count towards your regular usage limits, and support for languages other than English is in beta. Set your voice language under Settings > Capabilities > Voice (or Settings > General > Voice > Language). Changing the app's display language does not change it.
- **You keep a record.** Text transcripts of your voice conversations are saved in your chat history, so you can come back and ask for the decisions and actions as text.

> Speech is the cheapest way to give an AI the background it needs. The read-back is what makes it safe to send.

## Gemini: talk in the chat, or dictate on a Mac

Google has taken voice in two directions this year, and both serve the same habit: get the context in by speaking, keep the result as text you can check.

- **Live, inside the chat.** Google's release notes of 19 May 2026 say Gemini Live is now built into chats on Android and iOS, so you can move between speaking and typing in one conversation. Talk through the situation, then switch to typing for the exact wording you want.
- **Dictation on a Mac.** The release notes of 29 July 2026 say the Gemini app for macOS lets you press and hold the Fn key to dictate text, and that it launched in English. Google's Mac page lists a MacBook with Apple silicon and macOS Sequoia (15.0) or later.
- **Screen context is a separate choice.** The same note mentions an optional setting that lets Gemini work from what is on your screen. Leave it off until you have decided what should be visible when you speak.

## Read it back before it goes

Dictation is fast because it is forgiving, and that is also its weakness. Even a strong transcript can turn a surname, an acronym or a figure into something plausible and wrong, and the AI will then build on the wrong word with full confidence.

- **Check the three things speech gets wrong.** Names, numbers and acronyms. Read just those before you press send. It takes ten seconds. Fix a misheard figure in the box, not in the answer three paragraphs later.
- **Speak as if it were typed.** Your voice goes to a vendor's servers just as typed text does. Microsoft says Windows voice typing uses online recognition. Keep confidential material out of a brief you dictate, and do not dictate it in an open-plan office.
- **Keep the text, not the audio.** Once a spoken brief works, copy the cleaned-up version into your notes or a Claude project. Next time you start from a written brief instead of saying it all again.

## The bottom line

**Say the context you would never bother to type, then read the names and numbers before you send it.**

## Sources

- https://academy.claude.com/tutorials/how-to-choose-between-voice-mode-and-dictation
- https://support.claude.com/en/articles/11101966-using-voice-mode
- https://claude.com/docs/office-agents/dictation
- https://gemini.google/release-notes/
- https://gemini.google/mac/
- https://support.google.com/gemini/answer/15274899?hl=en
- https://support.microsoft.com/en-us/windows/use-voice-typing-to-talk-instead-of-type-on-your-pc-fec94565-c4bd-329d-e59a-af033fa5689f
- https://support.apple.com/guide/mac-help/dictate-your-messages-and-documents-mh40584/mac
