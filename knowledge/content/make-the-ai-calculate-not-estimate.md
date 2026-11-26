---
slug: make-the-ai-calculate-not-estimate
title: 'Make the AI calculate, not estimate: spreadsheet questions in Claude and Gemini'
summary: When the answer is a number, ask Claude or Gemini to calculate it inside the file and show the code or formula, then recount one figure yourself. Where to switch it on, what to ask and what to check.
service: training
format: Guide
level: Practitioner
date: '2026-11-03'
author: Mamdouh Alqudsi
series: work-with-ai
series_order: 11
tags:
- spreadsheets
- calculation
- verification
- claude
- gemini
related:
- check-ai-output-before-it-ships
- getting-work-into-and-out-of-claude-and-gemini
- finance-and-administration
linkedin_url: ''
source_ref: AI Tips edition 37, brief l2-make-the-ai-calculate (state/personal/published.jsonl, https://www.linkedin.com/article/edit/7515127983276359680/); draft verified 2026-10-11
featured: false
---

Paste a table into a chat, ask for the total or the trend, and the AI will give you a confident number. Sometimes it is right. The better habit is to make the AI calculate inside the file, using the tool built for that, and show you how it got there. Claude and Gemini both offer this now (as of October 2026). This guide covers where to switch it on, what to ask, and the one check that stays with you.

*When the answer is a number, ask the AI to calculate it and show the method, not just to read the table and reply.*

## Claude: switch on the tool that runs the numbers

Claude can write and run code on a file you upload, so a total or an average is computed rather than read off the page. That is the thesis in its simplest form: the number comes from a calculation you can inspect.

- **Turn it on first.** Anthropic's help page (updated 6 August 2026) says to go to Settings > Capabilities and turn on "Code execution and file creation". It is on by default for Free, Pro and Max. On Team and Enterprise, the organisation's owners control it.
- **Upload the data, then ask for the calculation.** Export the sheet as CSV, upload it, and try: "Calculate the total and the monthly average for each region. Show the code you used and the number of rows you counted." The limit is 30 MB per file.
- **Ask for a spreadsheet back, not only an answer.** The same page says Claude can create Excel files with working formulas. Ask for the result as an .xlsx so the formulas sit in the cells where you can read them. Anthropic notes this uses more of your usage limit than a normal chat.

## Claude for Excel: ask where the number came from

If your work already lives in Excel, the add-in brings Claude into the workbook itself. Here the habit is to ask for the derivation, because the answer then points at real cells you can open.

- **Who has it.** Anthropic's documentation says Claude for Excel is generally available on the Pro, Max, Team and Enterprise plans. It runs on Excel on the web, on Windows with Microsoft 365, and on Mac. It does not run on Excel for iPad or Android, or on Excel 2016 and 2019.
- **Ask it to trace, not just to answer.** The documentation's own example prompt is: "Walk me through how the revenue number in cell C42 is calculated." Answers include cell-level citations you can click to jump to the cell.
- **Use it to find errors too.** Another documented prompt: "Trace why cell H15 is returning #DIV/0." Anthropic warns you before Claude overwrites existing data, and asks you to confirm risky operations.

> A number you can trace back to a cell is worth more than a better-sounding number you cannot.

## Gemini in Google Sheets: let it write the formula, then read it

Gemini works from a side panel in Sheets. It can put a formula into a cell, which is the most checkable form a calculation can take, and it can show the code behind an analysis.

- **Open it and ask for a formula.** Google's help page says to click Ask Gemini at the top right of the spreadsheet. Its example prompt is "Create a formula that divides goals by games." You can insert the result into the selected cell or ask for another version.
- **For analysis, open the code.** Ask "Identify trends in this table", then use "Show code" on the response to see what Gemini ran. When a formula shows an error, hover over the cell and click Fix.
- **Know the limits Google lists.** It works best with native Google Sheets files, so save an Excel file as a Sheet first. An inserted chart does not update when the original data changes. On Android (launched 10 September 2026) you can ask about your data and create charts, but formulas need the web version. It requires an eligible Google Workspace or Google AI plan.

## Check one number yourself before you trust the rest

All three tools make the method visible. None of them makes it correct by default. The last step is yours, and it is short.

- **Recount one figure by hand.** Pick a single total or average, filter the sheet yourself and compare. If the row count or the figure differs, the method is wrong somewhere, and the other numbers are suspect too.
- **Read the method, not only the result.** In the code or formula, check which columns were used, whether blanks were skipped and whether the date range is the one you meant.
- **Only use files you trust.** Anthropic warns that files from external sources can carry hidden instructions that try to make Claude leak data or change records. Its own guidance says Claude for Excel is not recommended for audit-critical calculations without verification.

A calculation you can see is easier to check, but someone still has to check it.

## The bottom line

**When the answer is a number, ask the AI to calculate it in the file and show its method, then check one figure yourself.** Try it today: take a sheet you report from every month, ask Claude or Gemini for one total with the code or formula shown, and compare it with the figure you already have.

## Sources

- https://support.claude.com/en/articles/12111783
- https://claude.com/docs/office-agents/excel
- https://support.google.com/docs/answer/14356410?hl=en
- https://workspaceupdates.googleblog.com/2026/08/gemini-in-google-sheets-is-now-available-on-Android-devices.html
