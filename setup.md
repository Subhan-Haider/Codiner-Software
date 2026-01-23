# Codiner Build Setup Guide

This guide covers how to build and distribute the Codiner application for Windows, macOS, and Linux platforms.

## 📋 Prerequisites

### General Requirements
- Node.js >= 20
- npm or yarn
- Git

### Platform-Specific Requirements

#### Windows
- Visual Studio Build Tools (for native modules)
- Windows 10/11
- PowerShell

#### macOS
- macOS 10.13 or later
- Xcode Command Line Tools: `xcode-select --install`
- Apple Developer Account (for code signing)

#### Linux
- Ubuntu 18.04+ or equivalent
- Build tools: `sudo apt-get install build-essential libnss3-dev libatk-bridge2.0-dev libdrm2 libxkbcommon-dev libgtk-3-dev libgbm-dev`

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm start
```

### Build for Current Platform
```bash
npm run package
```

### Build for Distribution
```bash
npm run make
```

## 🔧 Platform-Specific Builds

### Windows

#### Build Commands
```bash
# Build for Windows
npm run make -- --platform win32

# Package only
npm run package -- --platform win32
```

#### Output
- **Installer**: `out/Codiner-win32-x64/Codiner-Setup-0.32.0.exe`
- **Portable**: `out/Codiner-win32-x64/Codiner-win32-x64-0.32.0.zip`

#### Code Signing (Optional)
Set environment variables for code signing:
```bash
export SM_CODE_SIGNING_CERT_SHA1_HASH="your_cert_hash"
```

### macOS

#### Build Commands
```bash
# Build for macOS
npm run make -- --platform darwin

# Package only
npm run package -- --platform darwin
```

#### Environment Variables for Code Signing & Notarization
```bash
export APPLE_TEAM_ID="YOUR_TEAM_ID"
export APPLE_ID="your.email@domain.com"
export APPLE_PASSWORD="your-app-specific-password"
```

#### Output
- **DMG (Recommended)**: `out/Codiner-darwin-x64/Codiner-0.32.0.dmg`
- **ZIP**: `out/Codiner-darwin-x64/Codiner-darwin-x64-0.32.0.zip`

#### Development Builds (Skip Signing)
```bash
export E2E_TEST_BUILD=true
npm run make -- --platform darwin
```

### Linux

#### Supported Distributions

**Debian-based (Ubuntu, Linux Mint, etc.)**
```bash
# Build DEB package
npm run make -- --platform linux --targets deb
```

**RPM-based (Fedora, CentOS, RHEL)**
```bash
# Build RPM package
npm run make -- --platform linux --targets rpm
```

**Generic Linux (AppImage/tar.gz)**
```bash
# Build ZIP archive
npm run make -- --platform linux --targets zip
```

#### Build All Linux Targets
```bash
npm run make -- --platform linux
```

#### Output Files

**Debian (.deb)**:
- `out/Codiner-linux-x64/Codiner_0.32.0_amd64.deb`

**RPM (.rpm)**:
- `out/Codiner-linux-x64/Codiner-0.32.0.x86_64.rpm`

**Generic (.zip)**:
- `out/Codiner-linux-x64/Codiner-linux-x64-0.32.0.zip`

#### Linux-Specific Configuration

The Linux builds include:
- **Protocol handler**: `x-scheme-handler/codiner` for URL handling
- **Desktop integration**: Proper .desktop file creation
- **Icon support**: PNG icons for desktop integration

## 🏗️ Build Configuration

### Electron Forge Makers

The following makers are configured in `forge.config.ts`:

```typescript
makers: [
  new MakerSquirrel({}),        // Windows installer
  new MakerDMG({ format: "ULFO" }), // macOS DMG
  new MakerZIP({}, ["darwin"]), // macOS ZIP (fallback)
  new MakerRpm({}),             // Linux RPM
  new MakerDeb({                // Linux DEB
    options: {
      mimeType: ["x-scheme-handler/codiner"],
    },
  }),
]
```

### Custom Build Scripts

```json
{
  "package": "npm run clean && electron-forge package",
  "make": "npm run clean && electron-forge make",
  "publish": "npm run clean && electron-forge publish"
}
```

## 🐛 Troubleshooting

### Common Issues

#### Windows: "Visual Studio installation not found"
```bash
# Install build tools (deprecated but still works)
npm install --global windows-build-tools

# Or use prebuilt binaries
npm config set rebuild:force false
```

#### macOS: "Code signing failed"
- Verify Apple Developer certificate is installed
- Check `APPLE_TEAM_ID` matches your certificate
- Ensure Xcode Command Line Tools are installed

#### Linux: "Native module build failed"
```bash
# Install build dependencies
sudo apt-get update
sudo apt-get install build-essential libnss3-dev libatk-bridge2.0-dev libdrm2 libxkbcommon-dev libgtk-3-dev libgbm-dev
```

#### All Platforms: "better-sqlite3 not found"
```bash
# Rebuild native modules
npx electron-rebuild

# Or use prebuilt binaries
npm run package
```

### Build Logs

To see detailed build logs:
```bash
DEBUG=electron-forge:* npm run make
```

### Clean Builds

To ensure clean builds:
```bash
npm run clean
npm run make
```

## 📦 Distribution

### GitHub Releases

The project is configured for GitHub releases via Electron Forge:

```typescript
publishers: [
  {
    name: "@electron-forge/publisher-github",
    config: {
      repository: {
        owner: "Subhan-Haider",
        name: "Codiner_Windows",
      },
      draft: true,
    },
  },
]
```

### Manual Distribution

After building, upload the generated files from the `out/` directory to your distribution platform.

## 🔧 Development Tips

### Testing Builds Locally

1. Build for your current platform
2. Test the generated installer/package
3. Verify app functionality
4. Check for any missing dependencies

### Cross-Platform Development

For cross-platform development, consider using:
- GitHub Actions with macOS/Windows/Linux runners
- Docker containers for Linux builds
- Cloud build services (e.g., Electron Build Service)

### Performance Optimization

- Use `asar: true` for smaller bundle sizes
- Configure appropriate maker options
- Consider code splitting for large applications

## 📚 Additional Resources

- [Electron Forge Documentation](https://www.electronforge.io/)
- [Electron Builder (alternative)](https://www.electron.build/)
- [Apple Code Signing Guide](https://developer.apple.com/support/code-signing/)
- [Linux Desktop Integration](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html)


