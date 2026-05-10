# Deploy script via SSH/SCP
# ========================

$SSH_HOST = '213.171.6.47'
$SSH_USER = 'root'
$REMOTE_PATH = '/var/www/steklodush-spb.ru/public_html'
$BUILD_PATH = 'C:\Users\mail\ShowerGlass\dist\ShowerGlass'

if (-not (Test-Path $BUILD_PATH)) {
    Write-Host 'Build folder not found:' $BUILD_PATH -ForegroundColor Red
    Write-Host 'Run: npm run build' -ForegroundColor Yellow
    exit 1
}

Write-Host 'Deploy Script' -ForegroundColor Cyan
Write-Host 'Server:' $SSH_HOST -ForegroundColor Green
Write-Host 'User:' $SSH_USER -ForegroundColor Green
Write-Host 'Destination:' $REMOTE_PATH -ForegroundColor Green

Write-Host ''
Write-Host 'Checking SSH connection...' -ForegroundColor Yellow
$sshResult = ssh -o ConnectTimeout=5 "$SSH_USER@$SSH_HOST" 'echo SSH_OK' 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'SSH connection failed:' -ForegroundColor Red
    Write-Host $sshResult -ForegroundColor Red
    exit 1
}
Write-Host 'SSH connection OK' -ForegroundColor Green

Write-Host ''
Write-Host 'Uploading files via SCP...' -ForegroundColor Cyan
$scpSource = "$BUILD_PATH\*"
$scpTarget = "${SSH_USER}@${SSH_HOST}:$REMOTE_PATH/"
scp -r $scpSource $scpTarget
if ($LASTEXITCODE -ne 0) {
    Write-Host 'SCP upload failed' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Setting permissions on server...' -ForegroundColor Yellow
ssh "$SSH_USER@$SSH_HOST" "chmod -R 755 $REMOTE_PATH && echo OK"
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Failed to set permissions' -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host 'Deployment finished successfully!' -ForegroundColor Green
Write-Host 'Check the site: https://www.steklodush-spb.ru' -ForegroundColor Cyan
