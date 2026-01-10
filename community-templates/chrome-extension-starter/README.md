# Chrome Extension Starter

Create Chrome Extensions in Codiner. Note: Codiner preview does not work but load in browser to test updates.

## ✨ Features

- **📦 Manifest V3**: Latest Chrome extension standard
- **⚛️ React + TypeScript**: Modern development with type safety
- **🔥 Vite**: Fast build tool with hot reload
- **🎨 Popup UI**: Beautiful popup interface
- **🔧 Background Script**: Extension lifecycle management
- **📄 Content Scripts**: Interact with web pages
- **⚙️ Options Page**: User settings and configuration
- **💾 Chrome Storage**: Persistent data storage
- **🎯 Chrome APIs**: Access to browser APIs

## 🚀 Quick Start

### Prerequisites

- Google Chrome browser
- Node.js 18+
- Basic understanding of Chrome extensions

### Installation & Development

```bash
# Copy this template
cp -r community-templates/chrome-extension-starter my-extension
cd my-extension

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Loading in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dist` folder (after building)
5. The extension will appear in your toolbar

## 📁 Project Structure

```
chrome-extension-starter/
├── src/
│   ├── popup.tsx          # Popup React component
│   ├── popup.css          # Popup styles
│   ├── background.ts      # Background script
│   ├── content.ts         # Content script
│   ├── options.tsx        # Options page component
│   └── options.css        # Options page styles
├── public/                # Static assets (icons, etc.)
├── popup.html             # Popup HTML template
├── manifest.json          # Extension manifest
├── vite.config.ts         # Vite build configuration
├── package.json           # Dependencies and scripts
└── README.md              # Documentation
```

## 🛠️ Chrome Extension Components

### Manifest V3

The `manifest.json` defines the extension's permissions and structure:

```json
{
  "manifest_version": 3,
  "name": "Chrome Extension Starter",
  "version": "1.0.0",
  "permissions": ["activeTab", "storage"],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### Popup

The popup appears when users click the extension icon. Built with React:

```tsx
const Popup = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="popup">
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
};
```

### Background Script

Runs in the background and handles extension events:

```typescript
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed!');
});
```

### Content Scripts

Interact with web pages and modify their DOM:

```typescript
// Inject into all pages
chrome.contentScripts.register({
  matches: ['<all_urls>'],
  js: [{ file: 'content.js' }]
});
```

### Options Page

User settings and configuration page:

```tsx
const Options = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const saveSettings = () => {
    chrome.storage.sync.set(settings);
  };
};
```

## 💾 Storage API

Use Chrome's storage API for persistent data:

```typescript
// Save data
chrome.storage.sync.set({ key: 'value' });

// Retrieve data
chrome.storage.sync.get(['key'], (result) => {
  console.log(result.key);
});
```

## 🔧 Development Tips

### Hot Reload

Vite provides hot reload during development. Changes to your source files will automatically rebuild the extension.

### Debugging

1. **Popup**: Click the extension icon to open the popup
2. **Background Script**: Go to `chrome://extensions/` → Inspect views → background page
3. **Content Scripts**: Open DevTools on any web page
4. **Options Page**: Right-click extension icon → Options

### Permissions

Add permissions to `manifest.json` as needed:

```json
{
  "permissions": [
    "activeTab",
    "storage",
    "tabs",
    "notifications"
  ]
}
```

### Content Security Policy

For inline scripts or external resources, configure CSP:

```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

## 🚀 Building & Publishing

### Build for Production

```bash
npm run build
```

The built extension will be in the `dist/` folder.

### Publishing to Chrome Web Store

1. Create a developer account at the [Chrome Web Store](https://chrome.google.com/webstore/developer/dashboard)
2. Zip the `dist/` folder
3. Upload the zip file to the developer dashboard
4. Fill out store listing information
5. Submit for review

## 📚 Chrome APIs

### Common APIs Used

- **chrome.tabs**: Interact with browser tabs
- **chrome.storage**: Persistent storage
- **chrome.runtime**: Extension lifecycle
- **chrome.action**: Toolbar icon and popup
- **chrome.scripting**: Execute scripts

### Example: Tab Interaction

```typescript
// Get current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  console.log('Current tab:', currentTab.url);
});
```

## 🎨 Customization

### Icons

Replace the icons in the `public/icons/` folder:

- `icon-16.png` - 16x16px
- `icon-32.png` - 32x32px
- `icon-48.png` - 48x48px
- `icon-128.png` - 128x128px

### Styling

Customize the popup and options page styles in their respective CSS files.

### Functionality

Extend the extension by:

1. Adding new permissions to `manifest.json`
2. Creating new React components
3. Adding background script logic
4. Implementing content script features

## 🔧 Troubleshooting

### Extension Not Loading

- Ensure you're loading the `dist/` folder, not the source folder
- Check the console for errors in the background script
- Verify all required permissions are granted

### Popup Not Working

- Check that `popup.html` exists in the build output
- Verify the popup component is properly mounted
- Look for JavaScript errors in the popup console

### Content Scripts Not Running

- Check the `matches` pattern in `manifest.json`
- Ensure content script files are built correctly
- Verify permissions for the target domains

## 📖 Resources

### Official Documentation

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/migrating/)
- [Chrome APIs Reference](https://developer.chrome.com/docs/extensions/reference/)

### Development Tools

- [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)
- [Extension Development Tools](https://chrome.google.com/webstore/detail/extensions/niicjhkahjkfdnjlgmcmghljdjjmmjci)

### Community

- [Chrome Extension Google Group](https://groups.google.com/g/chromium-extensions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-extension)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the MIT License.
