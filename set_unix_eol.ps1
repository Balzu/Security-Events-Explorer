Set-Variable -Name file -Value entrypoint.sh
((Get-Content $file) -join "`n") + "`n" | Set-Content -NoNewline $file