#!/usr/bin/env pwsh
try {
  & "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\..\prepush.ps1"
  exit $LASTEXITCODE
} catch {
  Write-Error "Failed to run pre-push hook wrapper: $_"
  exit 1
}
