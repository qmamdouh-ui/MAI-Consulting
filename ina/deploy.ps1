# Deploys Ina's service and connects everything. Run it in your own PowerShell window (not with "!"),
# because it asks you to paste the Anthropic key, which must never appear in a chat or a file.
#
#   cd C:\Users\qmamd\MAI-Consulting\ina
#   .\deploy.ps1
#
# Before the first run, once: `npx wrangler login` (opens your browser; a free Cloudflare account is enough),
# and create an Anthropic API key for Ina only with a monthly spend limit
# (console.anthropic.com > API keys; Settings > Limits).
#
# What it does: tests the service, creates its store, sets the secrets (random tokens for logs and tests; your
# key from the prompt), deploys, then writes the Worker URL into assets/chat.js and hr/settings.json and the two
# tokens into your user environment so the log pull and the community agents' tests can reach her.
# It commits and pushes nothing: the website change goes out when you push the public repo.

$ErrorActionPreference = 'Stop'
$ina = $PSScriptRoot
$site = Split-Path -Parent $ina
$worker = Join-Path $ina 'worker'
Set-Location $worker

function Step([string]$m) { Write-Host "`n== $m" -ForegroundColor Cyan }

Step 'Checking the Cloudflare login'
$who = (npx --yes wrangler@4 whoami 2>&1 | Out-String)
if ($who -notmatch 'logged in|You are logged in') { throw "Not logged in. Run: npx wrangler login   then run this script again." }

Step 'Regenerating knowledge, bundling the prompt, testing'
node gen-knowledge.mjs; if ($LASTEXITCODE) { throw 'gen-knowledge failed' }
node build.mjs;         if ($LASTEXITCODE) { throw 'build failed' }
node test.mjs | Tee-Object -Variable testOut | Out-Host
if ($testOut -match 'FAIL' -or $LASTEXITCODE) { throw 'Offline tests failed; not deploying.' }

Step 'Creating the store'
$toml = Get-Content -Raw wrangler.toml
if ($toml -match 'REPLACE_WITH_KV_NAMESPACE_ID') {
    $out = (npx --yes wrangler@4 kv namespace create INA_KV 2>&1 | Out-String)
    $m = [regex]::Match($out, 'id\s*=\s*"([0-9a-f]{32})"')
    if (-not $m.Success) { Write-Host $out; throw 'Could not read the new namespace id.' }
    $toml = $toml -replace 'REPLACE_WITH_KV_NAMESPACE_ID', $m.Groups[1].Value
    [System.IO.File]::WriteAllText((Join-Path $worker 'wrangler.toml'), $toml, (New-Object System.Text.UTF8Encoding($false)))
    "namespace $($m.Groups[1].Value)"
} else { 'store already created' }

Step 'Setting secrets'
function New-Token { -join ((48..57) + (97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ }) }
$logToken = New-Token; $testToken = New-Token
$logToken  | npx --yes wrangler@4 secret put LOG_TOKEN  | Out-Null
$testToken | npx --yes wrangler@4 secret put TEST_TOKEN | Out-Null
$sec = Read-Host 'Paste the Anthropic API key for Ina (input hidden)' -AsSecureString
$key = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
if ($key -notmatch '^sk-ant-') { throw 'That does not look like an Anthropic key (it should start with sk-ant-).' }
$key | npx --yes wrangler@4 secret put ANTHROPIC_API_KEY | Out-Null
$key = $null

Step 'Deploying'
$ErrorActionPreference = 'Continue'   # Windows PowerShell 5.1 turns wrangler's stderr warnings into fatal errors otherwise
$dep = (npx --yes wrangler@4 deploy 2>&1 | Out-String)
$ErrorActionPreference = 'Stop'
Write-Host $dep
$u = [regex]::Match($dep, 'https://[a-z0-9.-]+\.workers\.dev')
if (-not $u.Success) { throw 'Deploy finished but no workers.dev URL was printed.' }
$url = $u.Value

Step 'Connecting the site, HR and the community agents'
$chat = Join-Path $site 'assets\chat.js'
$js = [System.IO.File]::ReadAllText($chat)
$js2 = [regex]::Replace($js, 'var INA_ENDPOINT_DEFAULT = "[^"]*";', "var INA_ENDPOINT_DEFAULT = `"$url`";")
if ($js2 -eq $js -and $js -notmatch [regex]::Escape($url)) { throw 'INA_ENDPOINT_DEFAULT not found in assets/chat.js' }
[System.IO.File]::WriteAllText($chat, $js2, (New-Object System.Text.UTF8Encoding($false)))

$setPath = Join-Path $site 'Employees\hr\settings.json'
$set = Get-Content -Raw $setPath | ConvertFrom-Json
$set | Add-Member -NotePropertyName ina_endpoint -NotePropertyValue $url -Force
($set | ConvertTo-Json -Depth 5) | Set-Content -Path $setPath -Encoding UTF8

[Environment]::SetEnvironmentVariable('INA_LOG_TOKEN', $logToken, 'User')
[Environment]::SetEnvironmentVariable('INA_TEST_TOKEN', $testToken, 'User')
[Environment]::SetEnvironmentVariable('INA_TEST_URL', $url, 'User')

Step 'Smoke test'
$env:INA_TEST_URL = $url; $env:INA_TEST_TOKEN = $testToken
Set-Location 'C:\Users\qmamd\LinkedIn-Strategy'
$id = python scripts\ina_test.py start --agent deploy-check --scenario 'Deployment smoke test' --source 'deploy.ps1'
python scripts\ina_test.py say --id $id 'Our funder asks whether we have an AI policy. We are a small NGO. Where do we start?'
python scripts\ina_test.py end --id $id --verdict good --note 'deployment smoke test'

Write-Host "`nIna is live at $url" -ForegroundColor Green
Write-Host 'Next: push the public repo so the website uses her (assets/chat.js) together with the privacy paragraph in ina\privacy-paragraph.md.'
