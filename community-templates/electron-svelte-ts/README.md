# Electron Desktop App Template with Svelte and TypeScript

Build cross-platform desktop applications with Electron, Svelte 5, and TypeScript. Experience native desktop functionality with modern web technologies and secure inter-process communication.

## ✨ Features

- **⚡ Electron**: Cross-platform desktop app framework with Node.js and Chromium
- **🧡 Svelte 5**: Latest Svelte with runes, signals, and enhanced reactivity
- **🔷 TypeScript**: Full TypeScript support for both main and renderer processes
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **🔒 Secure IPC**: Type-safe inter-process communication with preload scripts
- **📁 File System**: Native file system access with secure permissions
- **🖥️ Native Menus**: Platform-specific application menus and dialogs
- **📦 Distribution**: Ready for packaging and distribution
- **🚀 Hot Reload**: Fast development with instant updates

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **System dependencies**:
  - Windows: Microsoft Visual Studio Build Tools
  - macOS: Xcode Command Line Tools
  - Linux: GCC and development libraries

### Installation

```bash
# Copy this template
cp -r community-templates/electron-svelte-ts my-electron-app
cd my-electron-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# This will start both the Vite dev server and Electron app
```

### Production Build

```bash
# Build the application
npm run build

# Package for distribution
npm run dist
```

### Development Scripts

```bash
# Run only the Vite dev server
npm run dev:renderer

# Build only the renderer
npm run build:renderer

# Build only the main process
npm run build:main
```

## 📁 Project Structure

```
electron-svelte-ts/
├── electron/                    # Main process (Node.js)
│   ├── main.ts                 # Application entry point
│   └── preload.ts              # Secure IPC bridge
├── src/                        # Renderer process (Svelte)
│   ├── components/             # Svelte components
│   │   ├── Counter.svelte      # Reactive counter demo
│   │   ├── FileManager.svelte  # File operations
│   │   └── SystemInfo.svelte   # System information
│   ├── App.svelte              # Main Svelte app
│   └── main.ts                 # Svelte entry point
├── dist/                       # Built renderer (generated)
├── dist-electron/              # Built main process (generated)
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript for renderer
└── tsconfig.main.json          # TypeScript for main process
```

## 🛠️ Architecture

### Main Process (Node.js)
Handles application lifecycle, window management, and system integration:

```typescript
// electron/main.ts
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,
  },
});

// IPC handlers
ipcMain.handle('read-file', async (event, filePath) => {
  // Secure file operations
});
```

### Preload Script (Security Bridge)
Safely exposes Electron APIs to the renderer process:

```typescript
// electron/preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('write-file', path, content),
});
```

### Renderer Process (Svelte)
Modern web UI with reactive components:

```svelte
<script lang="ts">
  let count = $state(0);

  async function readFile() {
    const result = await window.electronAPI.readFile('/path/to/file');
    // Handle result
  }
</script>

<button on:click={readFile}>Read File</button>
```

## 🎨 Svelte 5 Features

### Reactive Signals

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  function increment() {
    count += 1;
  }

  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<p>Count: {count}, Doubled: {doubled}</p>
<button on:click={increment}>Increment</button>
```

### Component Communication

```svelte
<!-- Parent -->
<script>
  import Child from './Child.svelte';
  let message = $state('Hello');
</script>

<Child bind:value={message} />

<!-- Child -->
<script>
  interface Props {
    value: string;
  }
  let { value = $bindable() }: Props = $props();
</script>

<input bind:value />
```

## 🔒 Security & IPC

### Secure Communication

All communication between processes is validated and type-safe:

```typescript
// Preload script with type definitions
declare global {
  interface Window {
    electronAPI: {
      readFile: (path: string) => Promise<{ success: boolean; data?: string; error?: string }>;
      writeFile: (path: string, content: string) => Promise<{ success: boolean; error?: string }>;
      getSystemInfo: () => Promise<SystemInfo>;
    };
  }
}
```

### Context Isolation

Renderer process is sandboxed from Node.js APIs:

```typescript
webPreferences: {
  nodeIntegration: false,      // Disabled for security
  contextIsolation: true,      // Enabled for security
  enableRemoteModule: false,   // Disabled for security
  preload: 'preload.js',       // Secure bridge
}
```

## 📁 File System Operations

### Reading Files

```typescript
const readFile = async (filePath: string) => {
  try {
    const result = await window.electronAPI.readFile(filePath);
    if (result.success) {
      console.log('File content:', result.data);
    } else {
      console.error('Error:', result.error);
    }
  } catch (error) {
    console.error('IPC error:', error);
  }
};
```

### Writing Files

```typescript
const writeFile = async (filePath: string, content: string) => {
  const result = await window.electronAPI.writeFile(filePath, content);
  if (result.success) {
    alert('File saved successfully!');
  } else {
    alert(`Error: ${result.error}`);
  }
};
```

## 🖥️ Application Menus

### Native Menus

Platform-specific menus with accelerators:

```typescript
const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: async () => {
          const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile']
          });
          // Handle file selection
        }
      }
    ]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
```

## 📦 Packaging & Distribution

### Build Configuration

```json
// package.json
"build": {
  "appId": "com.codiner.electron-svelte-ts",
  "productName": "Electron Svelte Template",
  "directories": {
    "output": "release"
  },
  "files": ["dist-electron", "dist"],
  "mac": { "category": "public.app-category.developer-tools" },
  "win": { "target": "nsis" },
  "linux": { "target": "AppImage" }
}
```

### Platform-Specific Builds

```bash
# Build for current platform
npm run dist

# Build for specific platforms
npx electron-builder --win
npx electron-builder --mac
npx electron-builder --linux
```

### Application Icons

Place icons in project root:

```
electron-svelte-ts/
├── build/
│   ├── icon.ico    # Windows
│   ├── icon.icns   # macOS
│   └── icon.png    # Linux (256x256)
```

## 🔧 Development Tools

### VS Code Extensions

Recommended extensions:

- **Electron**: Official Electron support
- **Svelte**: Official Svelte support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions

### Debugging

#### Main Process
```bash
# Debug main process
npm run dev:main:debug
```

#### Renderer Process
- Use browser dev tools (Ctrl+Shift+I)
- Set breakpoints in Svelte components

### Hot Reload

- Renderer: Automatic with Vite
- Main process: Restart required (can be scripted)

## 📚 Resources

### Official Documentation

- [Electron Documentation](https://electronjs.org/docs)
- [Svelte Documentation](https://svelte.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Learning Resources

- [Electron Tutorial](https://electronjs.org/docs/tutorial/tutorial-first-app)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [Electron Builder](https://electron.build/)

### Community

- [Electron Discord](https://discord.gg/electron)
- [Svelte Discord](https://svelte.dev/chat)
- [Electron GitHub](https://github.com/electron/electron)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
