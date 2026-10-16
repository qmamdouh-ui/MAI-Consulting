# One-off reminder for 7 November 2026 (set 16 October 2026). Shows a popup.
# Register it yourself (local time):
#   Register-ScheduledTask -TaskName 'MAI-reminder-2026-11-07-assessment-emails' `
#     -Action (New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-NoProfile -WindowStyle Hidden -STA -ExecutionPolicy Bypass -File "C:\Users\qmamd\repos\MAI-Consulting\tools\reminder-2026-11-07.ps1"') `
#     -Trigger (New-ScheduledTaskTrigger -Once -At '2026-11-07 09:00') `
#     -Settings (New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Hours 12)) `
#     -Description 'One-off reminder: assessment result emails to respondents (EmailJS template)' -Force
Add-Type -AssemblyName PresentationFramework
$msg = @"
M.A.I. reminder (set 16 October 2026)

Check that a respondent of the free AI readiness assessments receives an email from q.mamdouh@mai4consulting.com with their results, a thank-you for trying the tool, and the link to book a call.

The site code already sends it once the EmailJS template exists:
1. In EmailJS, create a template with "To Email" = {{to_email}}, from name "M.A.I. Consulting", reply-to q.mamdouh@mai4consulting.com, and the body fields listed in the comment above EMAILJS_RESPONDENT_TEMPLATE_ID.
2. Put the template ID in EMAILJS_RESPONDENT_TEMPLATE_ID in explore-your-ai-readiness/index.html and extensive-ai-readiness-analysis/index.html, commit and push.
3. Run a test submission with your own address.
"@
[System.Windows.MessageBox]::Show($msg, 'M.A.I. Consulting: assessment result emails') | Out-Null
