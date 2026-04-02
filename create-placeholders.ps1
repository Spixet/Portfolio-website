$icons = @(
    "typescript",
    "express",
    "mongodb",
    "html",
    "sql",
    "ml",
    "opencv",
    "tensorflow",
    "firebase",
    "docker",
    "vscode",
    "figma",
    "git"
)

$svgTemplate = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect width="24" height="24" fill="#6D28D9" rx="4" />
  <text x="12" y="16" font-family="Arial" font-size="8" text-anchor="middle" fill="white">{{NAME}}</text>
</svg>
'@

$placeholdersPath = "public\images\placeholders"
$iconsPath = "public\images\icons"
$profilePath = "public\images\profile-photos"

# Create directories if they don't exist
if (!(Test-Path $placeholdersPath)) {
    New-Item -ItemType Directory -Path $placeholdersPath -Force
}
if (!(Test-Path $iconsPath)) {
    New-Item -ItemType Directory -Path $iconsPath -Force
}
if (!(Test-Path $profilePath)) {
    New-Item -ItemType Directory -Path $profilePath -Force
}

# Create default project placeholder
$projectSvg = $svgTemplate -replace "{{NAME}}", "Project"
Set-Content -Path "$placeholdersPath\default-project.svg" -Value $projectSvg -Force

# Create default profile placeholder (if it doesn't exist already)
if (!(Test-Path "$profilePath\default-profile.png")) {
    $profileSvg = $svgTemplate -replace "{{NAME}}", "Profile"
    Set-Content -Path "$profilePath\default-profile.svg" -Value $profileSvg -Force
}

# Create all the missing icon SVGs
foreach ($icon in $icons) {
    $iconPath = "$iconsPath\$icon.svg"
    if (!(Test-Path $iconPath)) {
        $iconSvg = $svgTemplate -replace "{{NAME}}", $icon
        Set-Content -Path $iconPath -Value $iconSvg -Force
        Write-Host "Created $iconPath"
    } else {
        Write-Host "$iconPath already exists"
    }
}
