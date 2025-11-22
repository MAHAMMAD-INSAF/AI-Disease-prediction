<#
  PowerShell pre-push helper. Runs the same checks as the POSIX script.
  Usage: Run this manually or use the versioned git hook wrapper in `scripts/hooks`.
#>
try {
  Write-Host "Running pre-push checks for Disease Prediction repo"

  Write-Host "1) Frontend: lint"
  Push-Location -Path "$(Join-Path $PSScriptRoot '..\frontend')"
  $lint = Start-Process -FilePath npm -ArgumentList 'run','lint' -NoNewWindow -Wait -PassThru
  if ($lint.ExitCode -ne 0) { throw "Frontend lint failed (exit $($lint.ExitCode))" }

  Write-Host "2) Frontend: build (production)"
  $build = Start-Process -FilePath npm -ArgumentList 'run','build' -NoNewWindow -Wait -PassThru
  if ($build.ExitCode -ne 0) { throw "Frontend build failed (exit $($build.ExitCode))" }
  Pop-Location

  Write-Host "Pre-push checks passed."
  exit 0
} catch {
  Write-Error "Pre-push checks failed: $_"
  exit 1
}
