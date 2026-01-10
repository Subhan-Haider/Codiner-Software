# Capacitor Mobile App Template with Vue and TypeScript

Build cross-platform mobile applications with Capacitor, Vue 3, and TypeScript. Experience native device APIs with a modern web development workflow that runs natively on iOS, Android, and the web.

## ✨ Features

- **📱 Cross-Platform**: Single codebase for iOS, Android, and Web
- **🟢 Vue 3**: Composition API with `<script setup>` syntax
- **🔷 TypeScript**: Full TypeScript support with type-safe APIs
- **⚡ Capacitor**: Native device access without complex tooling
- **🎨 Ionic Vue**: Beautiful, accessible mobile UI components
- **📍 Native APIs**: Camera, GPS, storage, and device information
- **🔄 Live Reload**: Hot module replacement during development
- **📦 Native Packaging**: Build native apps with platform-specific tooling

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **iOS Development** (optional):
  - macOS with Xcode 14+
  - iOS Simulator or physical device
- **Android Development** (optional):
  - Android Studio
  - Android SDK and emulator or physical device

### Installation

```bash
# Copy this template
cp -r community-templates/capacitor-vue-ts my-mobile-app
cd my-mobile-app

# Install dependencies
npm install
```

### Development (Web)

```bash
# Start development server
npm run dev

# Open http://localhost:8100 in your browser
```

### iOS Development

```bash
# Add iOS platform
npm run add:ios

# Open in Xcode
npx cap open ios

# Or run on simulator
npm run run:ios
```

### Android Development

```bash
# Add Android platform
npm run add:android

# Open in Android Studio
npx cap open android

# Or run on emulator/device
npm run run:android
```

### Production Build

```bash
# Build web assets
npm run build

# Sync to all platforms
npm run sync
```

## 📁 Project Structure

```
capacitor-vue-ts/
├── android/                    # Android project (generated)
├── ios/                        # iOS project (generated)
├── public/                     # Static assets
├── src/
│   ├── components/             # Vue components
│   ├── services/               # Capacitor service wrappers
│   ├── theme/                  # Ionic theme variables
│   ├── views/                  # Page components
│   │   ├── CameraPage.vue      # Camera functionality
│   │   ├── GeolocationPage.vue # GPS and location
│   │   └── StoragePage.vue     # Data persistence
│   ├── App.vue                 # Root component
│   ├── main.ts                 # Vue app entry
│   └── router/index.ts         # Vue Router config
├── capacitor.config.ts         # Capacitor configuration
├── ionic.config.json           # Ionic CLI configuration
└── vite.config.ts              # Vite configuration
```

## 🛠️ Configuration

### Capacitor Configuration

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.codiner.capacitor-vue-ts',
  appName: 'Capacitor Vue Template',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: 'DEFAULT'
    }
  }
};
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

## 📱 Native Features

### Camera Access

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt
  });
  return image.dataUrl;
};
```

### Geolocation

```typescript
import { Geolocation } from '@capacitor/geolocation';

const getLocation = async () => {
  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000
  });
  return position;
};
```

### Device Storage

```typescript
import { Storage } from '@capacitor/storage';

// Store data
await Storage.set({ key: 'user', value: JSON.stringify(userData) });

// Retrieve data
const { value } = await Storage.get({ key: 'user' });
const userData = value ? JSON.parse(value) : null;
```

### Device Information

```typescript
import { Device } from '@capacitor/device';

const info = await Device.getInfo();
console.log('Platform:', info.platform);
console.log('Model:', info.model);
```

## 🎨 Vue 3 Features

### Composition API

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

const increment = () => {
  count.value++;
};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### Ionic Components

```vue
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button @click="handleClick">
        Click me
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar,
  IonTitle, IonContent, IonButton
} from '@ionic/vue';
</script>
```

## 🔌 Capacitor Plugins

### Available Plugins

- **Camera**: Take photos and access gallery
- **Geolocation**: GPS location and position watching
- **Storage**: Key-value data persistence
- **Device**: Device information and capabilities
- **Network**: Network status and connectivity
- **Toast**: Native toast notifications
- **Status Bar**: Status bar styling and control

### Plugin Installation

```bash
# Install a plugin
npm install @capacitor/camera

# Sync with native projects
npm run sync
```

## 📦 Building for Production

### Web Deployment

```bash
# Build for web
npm run build

# Deploy dist/ folder to any static hosting
```

### iOS App Store

```bash
# Build web assets
npm run build

# Sync to iOS
npm run sync

# Open in Xcode
npx cap open ios

# Archive and submit via Xcode
```

### Android Play Store

```bash
# Build web assets
npm run build

# Sync to Android
npm run sync

# Open in Android Studio
npx cap open android

# Build APK/AAB via Android Studio
```

## 🔧 Development Tools

### VS Code Extensions

Recommended extensions:

- **Vue Language Features (Volar)**: Vue 3 support
- **Ionic**: Ionic framework support
- **Capacitor**: Capacitor tooling
- **TypeScript Importer**: Auto import suggestions

### iOS Development

```bash
# Install CocoaPods (iOS dependencies)
sudo gem install cocoapods

# Update iOS pods
cd ios/App && pod install
```

### Android Development

```bash
# Set up Android environment variables
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
```

## 📱 Platform-Specific Features

### iOS Permissions

```xml
<!-- ios/App/App/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to take photos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access for GPS features</string>
```

### Android Permissions

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
```

## 🚀 Advanced Features

### Custom Plugins

Create native functionality:

```typescript
// Define plugin interface
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

// Use plugin
import { Echo } from '@capacitor-community/echo';

const result = await Echo.echo({ value: 'Hello World' });
```

### Background Tasks

Handle app lifecycle events:

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed:', isActive);
});

App.addListener('backButton', () => {
  // Handle back button on Android
});
```

### Push Notifications

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

await PushNotifications.register();

PushNotifications.addListener('registration', (token) => {
  console.log('Push registration success:', token.value);
});

PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Push received:', notification);
});
```

## 📚 Resources

### Official Documentation

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [Ionic Vue Documentation](https://ionicframework.com/docs/vue)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Learning Resources

- [Capacitor Tutorial](https://capacitorjs.com/docs/getting-started)
- [Ionic Vue Tutorial](https://ionicframework.com/docs/vue/quickstart)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

### Community

- [Capacitor Discord](https://discord.gg/UPYYRtw)
- [Ionic Discord](https://discord.gg/ionic)
- [Vue Discord](https://discord.gg/vue)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
