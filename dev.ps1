$nodeDir = Join-Path $PSScriptRoot ".tools\node-v24.14.0-win-x64"
$env:PATH = "$nodeDir;$env:PATH"

& "$nodeDir\npm.cmd" run dev
