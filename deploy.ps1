# Deploy script via SSH/SCP
# ========================

$SSH_HOST = '213.171.6.47'
$SSH_USER = 'root'
$REMOTE_PATH = '/var/www/steklodush-spb.ru'
$BUILD_PATH = 'C:\Users\mail\ShowerGlass\dist\ShowerGlass\browser'
$CSR_INDEX = Join-Path $BUILD_PATH 'index.csr.html'
$INDEX = Join-Path $BUILD_PATH 'index.html'
$ARCHIVE_PATH = 'C:\Users\mail\ShowerGlass\deploy-browser.tar.gz'
$REMOTE_ARCHIVE = '/tmp/showerglass-browser.tar.gz'
$PARTS_DIR = 'C:\Users\mail\ShowerGlass\deploy-parts'
$REMOTE_PARTS_DIR = '/tmp/showerglass-browser-parts'
$PART_SIZE = 8MB

if (-not (Test-Path $BUILD_PATH)) {
    Write-Host 'Build folder not found:' $BUILD_PATH -ForegroundColor Red
    Write-Host 'Run: npm run build' -ForegroundColor Yellow
    exit 1
}

if ((-not (Test-Path $INDEX)) -and (Test-Path $CSR_INDEX)) {
    Copy-Item -LiteralPath $CSR_INDEX -Destination $INDEX -Force
    Write-Host 'Created index.html from index.csr.html' -ForegroundColor Green
}

if (-not (Test-Path $INDEX)) {
    Write-Host 'index.html not found in build folder:' $INDEX -ForegroundColor Red
    exit 1
}

$mainBundle = Select-String -Path $INDEX -Pattern 'main-[A-Z0-9]+\.js' | ForEach-Object { $_.Matches.Value } | Select-Object -First 1
Write-Host 'Build main bundle:' $mainBundle -ForegroundColor Green

Write-Host 'Deploy Script' -ForegroundColor Cyan
Write-Host 'Server:' $SSH_HOST -ForegroundColor Green
Write-Host 'User:' $SSH_USER -ForegroundColor Green
Write-Host 'Destination:' $REMOTE_PATH -ForegroundColor Green

Write-Host ''
Write-Host 'Creating deploy archive...' -ForegroundColor Cyan
if (Test-Path $ARCHIVE_PATH) {
    Remove-Item -LiteralPath $ARCHIVE_PATH -Force
}
if (Test-Path $PARTS_DIR) {
    Remove-Item -LiteralPath $PARTS_DIR -Recurse -Force
}
New-Item -ItemType Directory -Path $PARTS_DIR | Out-Null
tar -czf $ARCHIVE_PATH -C $BUILD_PATH .
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Failed to create deploy archive' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Splitting deploy archive...' -ForegroundColor Cyan
$buffer = New-Object byte[] $PART_SIZE
$inputStream = [System.IO.File]::OpenRead($ARCHIVE_PATH)
try {
    $partIndex = 0
    while (($bytesRead = $inputStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
        $partPath = Join-Path $PARTS_DIR ('part-{0:D4}' -f $partIndex)
        $outputStream = [System.IO.File]::Create($partPath)
        try {
            $outputStream.Write($buffer, 0, $bytesRead)
        } finally {
            $outputStream.Dispose()
        }
        $partIndex++
    }
} finally {
    $inputStream.Dispose()
}

Write-Host "Created $partIndex archive parts" -ForegroundColor Green

Write-Host ''
Write-Host 'Preparing remote upload folder...' -ForegroundColor Yellow
ssh "$SSH_USER@$SSH_HOST" "rm -rf $REMOTE_PARTS_DIR $REMOTE_ARCHIVE && mkdir -p $REMOTE_PARTS_DIR"
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Failed to prepare remote upload folder' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Uploading deploy archive parts via SCP...' -ForegroundColor Cyan
$parts = Get-ChildItem -LiteralPath $PARTS_DIR -File | Sort-Object Name
foreach ($part in $parts) {
    $uploaded = $false
    for ($attempt = 1; $attempt -le 4; $attempt++) {
        Write-Host "Uploading $($part.Name), attempt $attempt..." -ForegroundColor Yellow
        $scpTarget = "${SSH_USER}@${SSH_HOST}:$REMOTE_PARTS_DIR/$($part.Name)"
        scp $part.FullName $scpTarget
        if ($LASTEXITCODE -eq 0) {
            $uploaded = $true
            break
        }
        Start-Sleep -Seconds 3
    }

    if (-not $uploaded) {
        Write-Host "Failed to upload archive part: $($part.Name)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ''
Write-Host 'Combining deploy archive on server...' -ForegroundColor Yellow
ssh "$SSH_USER@$SSH_HOST" "cat $REMOTE_PARTS_DIR/part-* > $REMOTE_ARCHIVE && ls -lh $REMOTE_ARCHIVE"
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Failed to combine remote archive' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Installing archive on server...' -ForegroundColor Yellow
$remoteCommand = "set -e; tmp=`$(mktemp -d /tmp/showerglass.XXXXXX); tar -xzf $REMOTE_ARCHIVE -C `$tmp; if [ ! -f `$tmp/index.html ] && [ -f `$tmp/index.csr.html ]; then cp `$tmp/index.csr.html `$tmp/index.html; fi; test -f `$tmp/index.html; mkdir -p $REMOTE_PATH; find $REMOTE_PATH -mindepth 1 -maxdepth 1 -exec rm -rf {} \;; cp -a `$tmp/. $REMOTE_PATH/; find $REMOTE_PATH -type d -exec chmod 755 {} \;; find $REMOTE_PATH -type f -exec chmod 644 {} \;; grep -o 'main-[A-Z0-9]*\.js' $REMOTE_PATH/index.html; nginx -t; systemctl reload nginx; rm -rf `$tmp $REMOTE_ARCHIVE $REMOTE_PARTS_DIR; echo OK"
ssh "$SSH_USER@$SSH_HOST" $remoteCommand
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Remote install failed' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Deployment finished successfully!' -ForegroundColor Green
Write-Host 'Check the site: https://www.steklodush-spb.ru' -ForegroundColor Cyan
