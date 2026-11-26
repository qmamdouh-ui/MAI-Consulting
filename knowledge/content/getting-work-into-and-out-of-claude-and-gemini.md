---
slug: getting-work-into-and-out-of-claude-and-gemini
title: "Getting work into and out of Claude and Gemini: show the screen, ask for the file"
summary: "Two kinds of retyping waste time with AI: describing a screen on the way in and reformatting text on the way out. Upload paths, limits and export options for Claude and Gemini, and the check at each end."
service: training
format: Guide
level: Entry
date: '2026-11-26'
author: Mamdouh Alqudsi
series: work-with-ai
series_order: 10
tags: [uploads, file export, screenshots, claude, gemini]
related: [make-the-ai-calculate-not-estimate, check-ai-output-before-it-ships, ai-assisted-decision-documents]
linkedin_url: ''
source_ref: 'AI Tips edition 42, brief l2-show-the-screen (https://www.linkedin.com/article/edit/7515125489779515392/, 2026-11-17) and edition 45, brief l2-in-and-out-reference (https://www.linkedin.com/article/edit/7515736835864616962/, 2026-11-26), state/personal/published.jsonl; drafts verified 2026-11-04; newsletter ed 34 (long-files-messy-text)'
featured: false
---

Two kinds of retyping eat time with AI. On the way in, you describe a screen from memory or copy a table by hand. On the way out, you rebuild the headings, tables and totals of a pasted answer. Claude and Gemini can both read the screen or the file you give them and hand back a finished file. The menu paths and limits below were checked against the vendors' help pages on 4 November 2026; menus move, so check them again before relying on a specific number.

*Give the AI the picture instead of describing it, ask for the file instead of copying the text, and check both ends.*

**Try it twice this week.** The next time you are about to type "I'm getting an error that says something like...", paste a cropped screenshot instead. The next time you tidy meeting notes by hand, ask for a one-page Word document with a decisions section and an action table (owner, date).

## Show it the screen, then ask one precise question

An image gives the AI the exact wording, layout and numbers you would otherwise paraphrase. Ask a question the picture can answer. Instead of "what's wrong?", try: "This is the error I get when I export the report. Explain what it means in plain language and give me the two most likely fixes."

Capturing has to be quicker than describing, or the habit will not stick:

- **On a Mac.** Control-Shift-Command-4, then drag over just the area you want. The screenshot goes to the clipboard, ready to paste.
- **On Windows 10 and 11.** Windows logo key + Shift + S opens the Snipping Tool overlay. Drag over the area, then copy it.
- **Crop to the problem.** A full-screen capture can include your inbox, a colleague's name or a client file in the next window. An image is pasted data too.

> Describing a screen from memory is a translation, and every translation loses something, usually the detail you needed.

## Getting material into Claude

For the claude.ai web and desktop apps, as of November 2026:

- **"+" (bottom left of the chat box) > Add files or photos.** Pick files from your computer or drag them into the chat. You can also paste an image straight from the clipboard, the fastest route for a screenshot. Up to 20 files per chat.
- **What it reads.** Documents: PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON and XLSX. Images: JPEG, PNG, GIF and WebP. XLSX only works once "Code execution and file creation" is switched on.
- **PDFs.** 100 pages or fewer are read as text and visuals, 101 to 1,000 pages as text only, and longer files cannot be uploaded. If the chart is on page 140, Claude has not seen it: split a long report first if the charts matter.
- **Images.** Up to 8000 x 8000 pixels, and Anthropic recommends 1000 x 1000 or larger. A tiny thumbnail of a table is a guess waiting to happen.

## Getting material into Gemini

For the Gemini web app at gemini.google.com, as of November 2026:

- **Add files > Upload Files** for files on your computer, then type your prompt and click Submit.
- **Add files > Add from Drive** for files already in Google Drive. On a work or school account, your Workspace administrator must have enabled apps in Gemini.
- **The limits.** Up to 10 files per prompt, and each file in an uploaded folder counts towards the ten. Up to 100 MB per file and 2 GB per video. Total video length is up to 5 minutes and audio up to 10 minutes; a Google AI Pro or Ultra plan raises that to 1 hour and 3 hours.
- **Where uploads go.** They count towards your Gemini Apps storage, which is separate from your Drive storage.

## Restructure before you ask for anything new

The safest first use of AI on a long file or a messy paste is to put it into a shape you can use: a table, a list of dates, a set of headings. The material is already in front of the tool, and the result can be compared line by line with the source. In Google Sheets, pasting a bulleted list or free text can offer a Convert to table button (since April 2026, with Workspace smart features switched on). Spot-check a sample of converted rows against the original before trusting the rest.

## Getting finished work out of Claude

Claude can build the file itself instead of handing you text to reformat.

- **Switch on file creation once.** Settings > Capabilities > "Code execution and file creation" (called "Create and edit files" in the updated settings layout). On Team and Enterprise plans, the organisation owner controls it under Organisation settings > Capabilities.
- **Ask for the format by name.** Word (.docx), Excel (.xlsx), PowerPoint (.pptx) or PDF. "Turn this into a two-page Word document with the table as a real table" gets you a file, not a block of text. You can download it or save it to Google Drive.
- **Ask once the content is settled.** Anthropic says creating files uses more of your usage limit than a normal chat.

## Getting finished work out of Gemini

Gemini sends work to Google's own apps in one click, and since April 2026 it can also generate the file directly.

- **Share & export (below a response) > Export to Docs** saves the response as a new Google Doc. Draft in Gmail, in the same menu, creates an email draft.
- **Export to Sheets (bottom right of a table)** works for responses that contain a table, but not for tables that include images.
- **Canvas: Share & export (top right of the panel) > Export to Docs** for drafts built in Canvas.
- **Describe the file in the prompt.** Google's Workspace Updates post of 27 April 2026 lists Docs, Sheets, Slides, PDF, Word, Excel, CSV, LaTeX, plain text, RTF and Markdown, one file per prompt.
- **On a work account,** your organisation's settings decide which export options you see. If one is missing, ask your administrator instead of switching to a personal account.

Whichever tool you use, describe the file like a template: give the skeleton ("Sheet 1: inputs. Sheet 2: monthly budget by line. Sheet 3: summary with totals"), say what must stay live ("use formulas for every total, not typed values"), and set the length and the reader.

## Check both ends before you trust it

A picture and a file both look more certain than they are. Each needs a short check.

- **Ask what it read before what to do.** Start with "First, list the text and numbers you can read in this image", or for a file, "Read back the column headers and the last row." Compare the answer with the original and correct a wrong digit before you ask for analysis, because everything after it is built on that reading.
- **Open the file in the real program.** Check that headings are headings and tables are tables. Click into one total and read the formula. If it is a typed number, ask again with formulas, then recount one figure against your source.
- **Treat unknown files with care.** Do not upload a file from an unknown sender just to have it reformatted, for the same reason you would not open it.

## The bottom line

**Show the AI the screen or the file, ask for a finished file back, and check what it read and what it built.** Try it on one table you would normally copy by hand: upload the file, ask for the headers and last row, check them, then ask for the result as an Excel file.

## Sources

- https://support.claude.com/en/articles/8241126-upload-files-to-claude
- https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude
- https://support.claude.com/en/articles/12626668
- https://support.claude.com/en/articles/12138966-release-notes
- https://support.google.com/gemini/answer/14903178?hl=en
- https://support.google.com/gemini/answer/14184041?hl=en
- https://support.google.com/gemini/answer/15274899?hl=en
- https://support.google.com/gemini/answer/16047321?hl=en
- https://workspaceupdates.googleblog.com/2026/04/move-from-conversation-to-creation-with-file-generation-in-Gemini.html
- https://workspaceupdates.googleblog.com/2026/04/paste-and-convert-unformatted-text-into-Google-Sheets-tables-with-Gemini.html
- https://support.apple.com/en-us/102646
- https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b
