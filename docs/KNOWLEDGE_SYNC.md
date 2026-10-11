# Knowledge sync

The Knowledge section is generated from `knowledge/content/*.md`. Two ways to keep it current.

## Weekly, unattended (PowerShell)

`tools/knowledge-sync.ps1` starts the `knowledge-curator` agent headlessly, with a lock, a timeout and a log in `logs/knowledge-sync/`. It reads local queues only, evaluates each item that went live (bring, merge or skip), builds, runs `tools/check_knowledge.py`, and commits on a `knowledge-sync-<date>` branch. It never opens LinkedIn. With `-Publish` it also merges to `main` and pushes when the QA gate passes.

```powershell
.\tools\knowledge-sync.ps1 -Register            # show the Friday 16:00 plan
.\tools\knowledge-sync.ps1 -Register -Apply     # create the scheduled task
.\tools\knowledge-sync.ps1                      # run once now
```

## Monthly, interactive

In a normal Claude Code session with Chrome open and logged in, ask the agent to read the Page and the profile, confirm what is really published, and fill in `linkedin_url`. This is deliberately a person-in-the-loop step.
