# Weekly Knowledge sync, headless (no Claude session, terminal or Chrome window needed).
#
#   .\tools\knowledge-sync.ps1             run now: snapshot LinkedIn, sync, commit on a branch (never pushes)
#   .\tools\knowledge-sync.ps1 -Publish    also merge to main and push when the QA gate passes
#   .\tools\knowledge-sync.ps1 -Register   plan the Friday 16:00 task (add -Apply to create it)
#   .\tools\knowledge-sync.ps1 -Register -Remove -Apply   delete the task
#
# One run = up to 3 attempts, $RetryMinutes apart. An attempt is:
#   1. tools\linkedin_snapshot.py: read-only look at the owner's profile and the Page's published list
#      (persistent Chromium profile the owner logged into himself; never clicks or posts)
#   2. the knowledge-curator agent, which evaluates what is live and brings, merges or skips it
# If all 3 attempts fail the run stops and waits for the next scheduled week; nothing is half-published.
# Single instance (lock file), hard timeout per agent run, log in logs\knowledge-sync\<date>.log.

[CmdletBinding()]
param(
    [switch]$Publish,
    [switch]$Register,
    [switch]$Apply,
    [switch]$Remove,
    [int]$TimeoutMinutes = 45,
    [int]$MaxAttempts = 3,
    [int]$RetryMinutes = 10
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
        $limit = New-TimeSpan -Minutes ($MaxAttempts * ($TimeoutMinutes + $RetryMinutes + 5))
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit $limit -MultipleInstances IgnoreNew
        Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings `
            -Description 'Weekly Knowledge sync for mai4consulting.com (reads LinkedIn read-only, 3 attempts, then waits for next week)' -Force | Out-Null
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

function Invoke-Attempt([int]$n) {
    $today = (Get-Date).ToString('yyyy-MM-dd')
    $snapDir = Join-Path $Root 'logs\linkedin-snapshot'
    $snap = Join-Path $snapDir "$today.json"
    New-Item -ItemType Directory -Force -Path $snapDir | Out-Null

    # 1. read-only LinkedIn snapshot
    Write-Log "attempt $n/${MaxAttempts}: LinkedIn snapshot"
    $py = Start-Process -FilePath 'python' -ArgumentList @((Join-Path $PSScriptRoot 'linkedin_snapshot.py'), '--out', $snap) `
        -WorkingDirectory $Root -NoNewWindow -PassThru -RedirectStandardOutput "$snap.out" -RedirectStandardError "$snap.err"
    $null = $py.Handle
    if (-not $py.WaitForExit(10 * 60 * 1000)) { & taskkill.exe /PID $py.Id /T /F | Out-Null; Write-Log 'snapshot TIMEOUT'; return $false }
    foreach ($f in "$snap.out", "$snap.err") {
        if ((Test-Path $f) -and (Get-Item $f).Length -gt 0) { Write-Log ('snapshot: ' + ((Get-Content -LiteralPath $f -Raw) -replace '\s+$', '')) }
        Remove-Item -LiteralPath $f -ErrorAction SilentlyContinue
    }
    if ($py.ExitCode -ne 0) { Write-Log "snapshot FAILED exit=$($py.ExitCode) (2 = not logged in; run login_setup.py)"; return $false }

    # 2. agent
    $cmd = Get-Command claude -ErrorAction SilentlyContinue
    $claude = if ($cmd) { $cmd.Source } else { Join-Path $env:USERPROFILE '.local\bin\claude.exe' }
    if (-not (Test-Path $claude)) { Write-Log 'claude CLI not found'; return $false }
    $publishText = if ($Publish) {
        'PUBLISH MODE IS ON: only if tools/check_knowledge.py exits 0 and the build succeeded, merge the sync branch into main (fast-forward) and `git push origin main`. If anything fails, do not merge or push; stay on the branch and say BLOCKED with the reason.'
    } else { 'Do NOT merge into main and do NOT push. Stop on the committed branch.' }
    $task = "Run the weekly Knowledge sync in UNATTENDED mode as defined in your agent file (section `"Unattended mode`"). Today is $today (Europe/Zurich). The LinkedIn snapshot taken minutes ago is at $snap (evidence of what is really published; use it as the primary source). $publishText"
    $unattended = 'You are running unattended: no human is present and nobody can answer questions. Do not summarise these instructions, do not ask for clarification, do not open a browser and do not touch linkedin.com (the snapshot file already holds what you need). Either do the task or stop with one plain line starting "BLOCKED:" saying exactly what is missing. Finding nothing new is a normal outcome: log it and stop. End with a short report: found, brought, merged, skipped (with reasons), anything in the queues but missing from the snapshot, and anything needing the owner.'
    $promptFile = Join-Path $env:TEMP "knowledge-sync-$PID.prompt.txt"
    $outFile = Join-Path $env:TEMP "knowledge-sync-$PID.out.txt"
    $errFile = Join-Path $env:TEMP "knowledge-sync-$PID.err.txt"
    try {
        Set-Content -LiteralPath $promptFile -Value ($task + "`r`n`r`n" + $unattended) -Encoding UTF8
        $tools = 'Read,Write,Edit,Glob,Grep,Bash(python:*),Bash(git:*)'
        Write-Log "attempt ${n}: agent start publish=$($Publish.IsPresent) timeout=${TimeoutMinutes}m"
        $proc = Start-Process -FilePath $claude -ArgumentList @('-p', '--agent', 'knowledge-curator', '--permission-mode', 'acceptEdits', '--allowedTools', "`"$tools`"") `
            -WorkingDirectory $Root -RedirectStandardInput $promptFile -RedirectStandardOutput $outFile -RedirectStandardError $errFile -NoNewWindow -PassThru
        $null = $proc.Handle
        if (-not $proc.WaitForExit($TimeoutMinutes * 60 * 1000)) {
            & taskkill.exe /PID $proc.Id /T /F | Out-Null; Write-Log "agent TIMEOUT after $TimeoutMinutes minutes"; return $false
        }
        $out = if (Test-Path $outFile) { Get-Content -LiteralPath $outFile -Raw } else { '' }
        if ($out) { Add-Content -LiteralPath $log -Value $out -Encoding UTF8 }
        if ((Test-Path $errFile) -and (Get-Item $errFile).Length -gt 0) { Add-Content -LiteralPath $log -Value ('STDERR: ' + (Get-Content -LiteralPath $errFile -Raw)) -Encoding UTF8 }
        if ($proc.ExitCode -ne 0) { Write-Log "agent FAILED exit=$($proc.ExitCode)"; return $false }
        if ($out -match '(?m)^\s*BLOCKED:') { Write-Log 'agent reported BLOCKED'; return $false }
        return $true
    } finally {
        Remove-Item -LiteralPath $promptFile, $outFile, $errFile -ErrorAction SilentlyContinue
        Push-Location $Root; try { & git checkout -q main 2>$null } catch {} ; Pop-Location
    }
}

try {
    for ($n = 1; $n -le $MaxAttempts; $n++) {
        $ok = $false
        try { $ok = Invoke-Attempt $n } catch { Write-Log ("attempt $n error: " + $_.Exception.Message) }
        if ($ok) { Write-Log "DONE on attempt $n"; exit 0 }
        if ($n -lt $MaxAttempts) { Write-Log "attempt $n failed; retrying in $RetryMinutes minutes"; Start-Sleep -Seconds ($RetryMinutes * 60) }
    }
    Write-Log "FAILED: $MaxAttempts attempts. Waiting until the next scheduled run (next Friday 16:00). Nothing was published."
    exit 1
} finally {
    $lock.Dispose()
}
