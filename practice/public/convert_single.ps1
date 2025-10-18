# 単一ファイルをShift-JISからUTF-8に変換し、内容を表示するスクリプト

param(
    [string]$SourceFile
)

try {
    # Shift-JISでファイルを読み込み
    $content = [System.IO.File]::ReadAllText($SourceFile, [System.Text.Encoding]::GetEncoding('Shift_JIS'))

    # UTF-8で標準出力に出力
    Write-Output $content

} catch {
    Write-Error "Error reading file: $_"
    exit 1
}
