# Tauri Desktop App Template with React and TypeScript

Build secure, fast, and lightweight desktop applications with Tauri, React, and TypeScript. Combine the power of Rust backend with React frontend for native desktop experiences.

## ✨ Features

- **🦀 Rust Backend**: High-performance Rust core with memory safety and native APIs
- **⚛️ React Frontend**: Modern React 18 with hooks, concurrent features, and TypeScript
- **🎨 Tailwind CSS**: Utility-first CSS with Shadcn/UI components
- **🔒 Secure by Default**: Sandboxed runtime with explicit filesystem and system permissions
- **📦 Small Bundles**: Tiny application binaries with no web runtime overhead
- **🔄 Hot Reload**: Fast development with instant frontend updates
- **⚡ Native Performance**: Direct OS integration through Rust FFI
- **📱 Cross-Platform**: Windows, macOS, and Linux support out of the box

## 🚀 Quick Start

### Prerequisites

- **Rust**: Install from [rustup.rs](https://rustup.rs/)
- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **System dependencies**:
  - Windows: Microsoft Visual Studio C++ Build Tools
  - macOS: Xcode Command Line Tools
  - Linux: GCC and webkit2gtk (varies by distro)

### Installation

```bash
# Copy this template
cp -r community-templates/tauri-react-ts my-tauri-app
cd my-tauri-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# This will start both the Vite dev server and Tauri dev window
```

### Production Build

```bash
# Build for production
npm run build

# The built application will be in src-tauri/target/release/bundle/
```

### Development Commands

```bash
# Run only the frontend (Vite)
npm run dev:frontend

# Build only the frontend
npm run build:frontend

# Run only the Rust backend
npm run dev:backend
```

## 📁 Project Structure

```
tauri-react-ts/
├── src/                          # React frontend
│   ├── components/
│   │   └── ui/                   # Shadcn/UI components
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Main React app
│   └── main.tsx                  # React entry point
├── src-tauri/                    # Rust backend
│   ├── src/
│   │   └── main.rs               # Rust application entry
│   ├── Cargo.toml                # Rust dependencies
│   └── tauri.conf.json           # Tauri configuration
├── dist/                         # Built frontend (generated)
└── package.json                  # Node.js dependencies
```

## 🛠️ Configuration

### Tauri Configuration

```json
// src-tauri/tauri.conf.json
{
  "productName": "Tauri React Template",
  "identifier": "com.codiner.tauri-react-ts",
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": ["icons/32x32.png", "icons/128x128.png"]
  }
}
```

### Rust Dependencies

```toml
# src-tauri/Cargo.toml
[dependencies]
serde_json = "1.0"
serde = { version = "1.0", features = ["derive"] }
tauri = { version = "2.0.0-beta.0", features = [ "shell-open" ] }
```

## 🎨 Frontend Development

### React Components

Build modern React components with TypeScript:

```tsx
import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

function FileReader() {
  const [content, setContent] = useState('');

  const readFile = async () => {
    try {
      const fileContent = await invoke<string>('read_file', {
        path: '/path/to/file.txt'
      });
      setContent(fileContent);
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  return (
    <div>
      <button onClick={readFile}>Read File</button>
      <pre>{content}</pre>
    </div>
  );
}
```

### Tailwind CSS

Style your components with Tailwind:

```tsx
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Tauri Component
  </h2>
  <p className="text-gray-600">
    Styled with Tailwind CSS
  </p>
</div>
```

## 🦀 Backend Development

### Rust Commands

Define Rust functions callable from JavaScript:

```rust
// src-tauri/src/main.rs
use tauri::command;

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
async fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path)
        .map_err(|e| format!("Failed to read file: {}", e))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            read_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Calling Rust from JavaScript

```typescript
import { invoke } from '@tauri-apps/api/core';

// Async call to Rust function
const greeting = await invoke<string>('greet', { name: 'World' });

// File system operations
const content = await invoke<string>('read_file', { path: './file.txt' });
```

## 🔒 Security & Permissions

### File System Access

Configure file system permissions in `tauri.conf.json`:

```json
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": false,
        "readFile": true,
        "writeFile": true,
        "readDir": true,
        "copyFile": true,
        "createDir": true,
        "removeDir": true,
        "removeFile": true,
        "renameFile": true,
        "exists": true,
        "scope": ["$APPDATA", "$DOCUMENT", "$DESKTOP"]
      }
    }
  }
}
```

### Dialog Permissions

Enable system dialogs:

```json
{
  "tauri": {
    "allowlist": {
      "dialog": {
        "all": false,
        "ask": true,
        "confirm": true,
        "message": true,
        "open": true,
        "save": true
      }
    }
  }
}
```

## 📦 Building & Distribution

### Platform-Specific Builds

```bash
# Build for current platform
npm run build

# Build for specific platforms
npm run tauri build -- --target x86_64-apple-darwin    # macOS
npm run tauri build -- --target x86_64-pc-windows-msvc # Windows
npm run tauri build -- --target x86_64-unknown-linux-gnu # Linux
```

### Application Icons

Place icons in `src-tauri/icons/`:

```
src-tauri/icons/
├── 32x32.png
├── 128x128.png
├── 128x128@2x.png
├── icon.icns    # macOS
└── icon.ico     # Windows
```

## 🔧 Development Tools

### VS Code Extensions

Recommended extensions:

- **Tauri**: Official Tauri support
- **rust-analyzer**: Rust language support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions

### Debugging

#### Frontend Debugging
- Use browser dev tools in the Tauri window
- Set `devtools: true` in `tauri.conf.json` for development

#### Backend Debugging
- Use VS Code Rust debugging
- Add breakpoints in `src-tauri/src/main.rs`

### Hot Reload

Frontend changes hot-reload automatically. For Rust changes:

```bash
# Restart the dev server
npm run dev
```

## 📚 Resources

### Official Documentation

- [Tauri Documentation](https://tauri.app/v1/guides/)
- [React Documentation](https://react.dev/)
- [Rust Documentation](https://doc.rust-lang.org/)

### Learning Resources

- [Tauri Tutorial](https://tauri.app/v1/guides/getting-started/)
- [Tauri Examples](https://github.com/tauri-apps/tauri/tree/dev/examples)
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri)

### Community

- [Tauri Discord](https://discord.gg/tauri)
- [Tauri GitHub](https://github.com/tauri-apps/tauri)
- [Tauri Twitter](https://twitter.com/TauriApps)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
