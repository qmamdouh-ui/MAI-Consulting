# Status and progress report for the weekly Knowledge sync.
#   .\tools\knowledge-status.ps1            summary
#   .\tools\knowledge-status.ps1 -Log       also print the last run's full log
[CmdletBinding()]
param([switch]$Log)

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root
$name = 'MAI-Knowledge-Sync'

"== Scheduled task =="
$t = Get-ScheduledTask -TaskName $name -ErrorAction SilentlyContinue
if (-not $t) { "NOT REGISTERED (run .\tools\knowledge-sync.ps1 -Register -Apply -Publish)" }
else {
    $i = Get-ScheduledTaskInfo -TaskName $name
    $res = switch ($i.LastTaskResult) { 0 { 'success' } 267011 { 'never run yet' } 267009 { 'running now' } 267014 { 'stopped by time limit' } default { "code $($i.LastTaskResult)" } }
    "State:      $($t.State)  (Ready = waiting for its slot, Running = in progress, Disabled = off)"
    "Last run:   $($i.LastRunTime)  -> $res"
    "Next run:   $($i.NextRunTime)"
    "Mode:       $(if ($t.Actions[0].Arguments -match '-Publish') { 'PUBLISH (merges to main and pushes when QA passes)' } else { 'draft (stops on a branch)' })"
}

"`n== Run in progress? =="
$run = Get-CimInstance Win32_Process -Filter "Name='claude.exe'" | Where-Object { $_.CommandLine -match 'knowledge-curator' }
if ($run) { "YES: claude.exe pid $($run.ProcessId -join ', ') started $($run[0].CreationDate)" } else { 'no' }

"`n== Last log (logs\knowledge-sync) =="
$lf = Get-ChildItem logs\knowledge-sync\*.log -ErrorAction SilentlyContinue | Sort-Object LastWriteTime | Select-Object -Last 1
if ($lf) {
    "$($lf.Name)  (updated $($lf.LastWriteTime))"
    $lines = Get-Content $lf.FullName
    $marks = $lines | Where-Object { $_ -match '^\[\d{4}-' -and $_ -match 'START|attempt|DONE|FAILED|TIMEOUT|BLOCKED|SKIPPED|END' }
    $marks | Select-Object -Last 12
    if ($Log) { "`n-- full log --"; $lines } else { "`n-- agent's last report --"; ($lines | Select-Object -Last 14) }
} else { 'no log yet (the task has not run)' }

"`n== Site / repo =="
$count = (Get-Content knowledge\articles.json -Raw | ConvertFrom-Json).articles.Count
"Articles in the library:  $count"
"Branch:                   $(git branch --show-current)"
"Unpushed commits:         $((git log origin/main..main --oneline | Measure-Object).Count)"
"Open sync branches:       $((git branch --list 'knowledge-sync-*' | Measure-Object).Count)"
"`nLast sync-log rows:"
Get-Content knowledge\content\_sync_log.md | Select-Object -Last 3
try { $live = (Invoke-RestMethod 'https://mai4consulting.com/knowledge/articles.json' -TimeoutSec 20).articles.Count; "`nLive site shows:          $live articles" } catch { "`nLive site check failed: $($_.Exception.Message)" }
