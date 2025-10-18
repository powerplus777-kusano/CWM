# Shift-JISからUTF-8への変換スクリプト

param(
    [string]$SourceFile,
    [string]$DestFile
)

# Shift-JISでファイルを読み込み
$content = [System.IO.File]::ReadAllText($SourceFile, [System.Text.Encoding]::GetEncoding('Shift_JIS'))

# UTF-8で保存
[System.IO.File]::WriteAllText($DestFile, $content, [System.Text.Encoding]::UTF8)

Write-Host "Converted: $SourceFile -> $DestFile"
