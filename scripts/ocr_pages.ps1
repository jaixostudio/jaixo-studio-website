Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime]
$null = [Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime]

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.IsGenericMethod
} | Select-Object -First 1

function Await($asyncOp, $type) {
    $method = $asTaskGeneric.MakeGenericMethod($type)
    $task = $method.Invoke($null, @($asyncOp))
    return $task.GetAwaiter().GetResult()
}

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if (-not $engine) {
    $lang = [Windows.Globalization.Language]::new('en-US')
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
}

$dir = "C:\Users\ASUS\Downloads\ilovepdf_pages-to-jpg (1)"
$files = Get-ChildItem -Path $dir -Filter "*.jpg" | Sort-Object Name

$results = @()

foreach ($f in $files) {
    try {
        $storageFileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)
        $storageFile = Await $storageFileOp ([Windows.Storage.StorageFile])

        $streamOp = $storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)
        $stream = Await $streamOp ([Windows.Storage.Streams.IRandomAccessStream])

        $decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
        $decoder = Await $decoderOp ([Windows.Graphics.Imaging.BitmapDecoder])

        $bitmapOp = $decoder.GetSoftwareBitmapAsync()
        $bitmap = Await $bitmapOp ([Windows.Graphics.Imaging.SoftwareBitmap])

        $ocrOp = $engine.RecognizeAsync($bitmap)
        $ocrResult = Await $ocrOp ([Windows.Media.Ocr.OcrResult])

        $text = $ocrResult.Text -replace "`r", " " -replace "`n", " "
        $clean = ($text -replace '\s+', ' ').Trim()

        $results += [PSCustomObject]@{
            File = $f.Name
            Text = $clean
        }
        Write-Host "$($f.Name): $($clean.Substring(0, [Math]::Min(80, $clean.Length)))"
    } catch {
        Write-Host "Error on $($f.Name): $_"
    }
}

$results | ConvertTo-Json -Depth 3 | Out-File -FilePath "scripts/ocr_results.json" -Encoding utf8
Write-Host "OCR complete. Saved to scripts/ocr_results.json"
