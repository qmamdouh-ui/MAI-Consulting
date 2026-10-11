# Weekly Knowledge sync, headless (no Claude session, terminal or Chrome needed).
#
#   .\tools\knowledge-sync.ps1             run once now (stops at a committed branch, never pushes)
#   .\tools\knowledge-sync.ps1 -Publish    also merge to main and push when the QA gate passes
#   .\tools\knowledge-sync.ps1 -Register   plan the Friday 16:00 task (add -Apply to create it)
#   .\tools\knowledge-sync.ps1 -Register -Remove -Apply   delete the task
#
# Single instance (lock file), hard timeout, everything logged to logs\knowledge-sync\<date>.log.
# It uses LOCAL sources only and never opens LinkedIn: unattended browser access to linkedin.com is
# off limits (see LinkedIn-Strategy docs\CONSTRAINTS.md). Verifying publication and filling in
# linkedin_url is the interactive monthly step in docs\KNOWLEDGE_SYNC.md.

[CmdletBinding()]
param(
    [switch]$Publish,
    [switch]$Register,
    [switch]$Apply,
    [switch]$Remove,
    [int]$TimeoutMinutes = 45
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$TaskName = 'MAI-Knowledge-Sync'

if ($Register) {
    $self = Join-Path $PSScriptRoot 'knowledge-sync.ps1'
    $publishArg = if ($Publish) { ' -Publish' } else { '' }
    $arg = "-NoProfile -ExecutionPolicy Bypass -File `"$self`"$publishArg"
    if ($Remove) {
        if ($Apply) { Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false; "removed $TaskName" }
        else { "would remove $TaskName (add -Apply)" }
        return
    }
    "Plan: Fridays 16:00 (machine time; keep Windows on Geneva time): powershell.exe $arg"
    if ($Apply) {
        $action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $arg -WorkingDirectory $Root
        $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Friday -At '16:00'
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes ($TimeoutMinutes + 10)) -MultipleInstances IgnoreNew
        Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings `
            -Description 'Weekly Knowledge sync for mai4consulting.com (headless, no LinkedIn access)' -Force | Out-Null
        "registered $TaskName (runs only while you are logged on; starts when available if the PC was off)"
    } else { 'nothing changed (add -Apply)' }
    return
}

$logDir = Join-Path $Root 'logs\knowledge-sync'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$log = Join-Path $logDir ((Get-Date -Format 'yyyy-MM-dd') + '.log')
function Write-Log([string]$m) { Add-Content -LiteralPath $log -Value ("[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $m) -Encoding UTF8 }

try { $lock = [System.IO.File]::Open((Join-Path $logDir '.lock'), 'OpenOrCreate', 'ReadWrite', 'None') }
catch { Write-Log 'SKIPPED: another knowledge-sync run is still going'; exit 0 }

$promptFile = Join-Path $env:TEMP "knowledge-sync-$PID.prompt.txt"
$outFile = Join-Path $env:TEMP "knowledge-sync-$PID.out.txt"
$errFile = Join-Path $env:TEMP "knowledge-sync-$PID.err.txt"
try {
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    $claude = if ($cmd) { $cmd.Source } else { Join-Path $env:USERPROFILE '.local\bin\claude.exe' }
    if (-not (Test-Path $claude)) { throw 'claude CLI not found' }

    $today = (Get-Date).ToString('yyyy-MM-dd')
    $publishText = if ($Publish) {
@'
PUBLISH MODE IS ON: only if tools/check_knowledge.py exits 0 and the build succeeded, merge the sync branch into main (fast-forward) and `git push origin main`. If anything fails, do not merge or push; stay on the branch and say BLOCKED with the reason.
'@
    } else {
        'Do NOT merge into main and do NOT push. Stop on the committed branch.'
    }

    $task = @"
Run the weekly Knowledge sync in UNATTENDED mode as defined in your agent file (section "Unattended mode"). Today is $today (Europe/Zurich).
$publishText
"@
    $unattended = @'
You are running unattended: no human is present and nobody can answer questions. Do not summarise these instructions, do not ask for clarification, do not open a browser and do not touch linkedin.com. Either do the task or stop with one plain line starting "BLOCKED:" saying exactly what is missing. Finding nothing new is a normal outcome: log it and stop. End with a short report: found, brought, merged, skipped (with reasons), anything date-inferred but not verified on LinkedIn, and anything needing the owner.
'@
    Set-Content -LiteralPath $promptFile -Value ($task + "`r`n`r`n" + $unattended) -Encoding UTF8

    $tools = 'Read,Write,Edit,Glob,Grep,Bash(python:*),Bash(git:*),Bash(powershell:*)'
    $argList = @('-p', '--agent', 'knowledge-curator', '--permission-mode', 'acceptEdits', '--allowedTools', "`"$tools`"")
    Write-Log "START knowledge-sync publish=$($Publish.IsPresent) timeout=${TimeoutMinutes}m"
    $proc = Start-Process -FilePath $claude -ArgumentList $argList -WorkingDirectory $Root `
        -RedirectStandardInput $promptFile -RedirectStandardOutput $outFile -RedirectStandardError $errFile -NoNewWindow -PassThru
    $null = $proc.Handle
    if (-not $proc.WaitForExit($TimeoutMinutes * 60 * 1000)) {
        & taskkill.exe /PID $proc.Id /T /F | Out-Null
        Write-Log "TIMEOUT: killed process tree after $TimeoutMinutes minutes"; $code = 124
    } else { $code = $proc.ExitCode }
    if (Test-Path $outFile) { Add-Content -LiteralPath $log -Value (Get-Content -LiteralPath $outFile -Raw) -Encoding UTF8 }
    if ((Test-Path $errFile) -and (Get-Item $errFile).Length -gt 0) { Add-Content -LiteralPath $log -Value ('STDERR: ' + (Get-Content -LiteralPath $errFile -Raw)) -Encoding UTF8 }
    Write-Log "END knowledge-sync exit=$code"
    exit $code
} finally {
    Remove-Item -LiteralPath $promptFile, $outFile, $errFile -ErrorAction SilentlyContinue
    $lock.Dispose()
}
