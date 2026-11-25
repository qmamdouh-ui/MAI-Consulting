# Knowledge sync

The Knowledge section is generated from `knowledge/content/*.md`. Two ways to keep it current.

## Daily, unattended (PowerShell)

Kit (`.claude/agents/knowledge-curator.md`, tracked in git since 2026-11-25) runs every day at 07:35 and replaced the cloud routine that mirrored Page articles (retired 2026-11-25: it could not reach LinkedIn from the cloud and hand-edited `articles.json`). Sources are local: LinkedIn-Strategy `state/*/published.jsonl` and drafts, plus the older linkedin-content-agent queues. No LinkedIn access is needed.

`tools/knowledge-sync.ps1` makes up to three attempts (ten minutes apart); if all three fail it stops and waits for the next scheduled week. Each attempt first runs `tools/linkedin_snapshot.py`, a read-only look at the owner's profile articles and the Page's published list in a Chromium profile the owner logged into himself (it never clicks, posts or handles a password). Then it starts the `knowledge-curator` agent headlessly, with a lock, a timeout and a log in `logs/knowledge-sync/`. The agent brings only what the snapshot shows is live (bring, merge or skip), builds, runs `tools/check_knowledge.py`, and commits on a `knowledge-sync-<date>` branch. With `-Publish` it also merges to `main` and pushes when the QA gate passes.

One-time setup (and again whenever LinkedIn logs the profile out): `python C:\Users\qmamd\linkedin-content-agent\scripts\login_setup.py`, then log in yourself in the window that opens.

```powershell
.\tools\knowledge-sync.ps1 -Register -Publish            # show the daily 07:35 plan
.\tools\knowledge-sync.ps1 -Register -Publish -Apply     # create the scheduled task (publishes when the QA gate passes)
.\tools\knowledge-sync.ps1                      # run once now
```

## Monthly, interactive

In a normal Claude Code session with Chrome open and logged in, ask the agent to read the Page and the profile, confirm what is really published, and fill in `linkedin_url`. This is deliberately a person-in-the-loop step.
