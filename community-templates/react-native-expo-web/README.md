# React Native (Expo) + Web Template

An Expo SDK 52 + expo-router v4 starter that runs on iOS/Android and the browser via react-native-web.

## ✨ Features

- **Universal**: Single codebase for iOS, Android, and Web
- **Modern**: Expo SDK 52 with latest React Native
- **Navigation**: File-based routing with expo-router v4
- **TypeScript**: Full TypeScript support
- **Hot Reload**: Fast development with hot reloading
- **Production Ready**: Optimized builds for all platforms

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation

```bash
# Clone or copy this template
cp -r community-templates/react-native-expo-web my-app
cd my-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm start

# Run on specific platforms
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser
```

## 📱 Platform Support

### iOS
- Requires Xcode 15+
- iOS 13.4+ support
- Physical device or simulator

### Android
- Android Studio with SDK
- Android API 21+ support
- Physical device or emulator

### Web
- Modern browsers (Chrome, Firefox, Safari, Edge)
- React Native Web for web compatibility
- Progressive Web App support

## 🏗️ Project Structure

```
app/
├── _layout.tsx      # Root layout and navigation
├── index.tsx        # Home screen
└── about.tsx        # About screen

assets/
├── icon.png         # App icon
├── splash.png       # Splash screen
└── adaptive-icon.png # Android adaptive icon
```

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "React Native Expo Web Template",
    "slug": "react-native-expo-web-template",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"]
  }
}
```

### Environment Variables

Create `.env` files for different environments:

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_ENVIRONMENT=development
```

## 📦 Dependencies

### Core Dependencies
- `expo` - Expo SDK
- `react-native` - React Native framework
- `expo-router` - File-based routing
- `react-native-web` - Web compatibility

### Development Dependencies
- `typescript` - TypeScript support
- `@expo/cli` - Expo command line tools
- `eslint` - Code linting

## 🎨 Customization

### Styling
This template uses React Native's built-in StyleSheet for styling. For more advanced styling, consider:

- **NativeWind**: Tailwind CSS for React Native
- **Styled Components**: CSS-in-JS solution
- **React Native Paper**: Material Design components

### Navigation
Currently uses expo-router v4 with stack navigation. Can be extended to:

- Tab navigation
- Drawer navigation
- Modal screens
- Deep linking

## 🚀 Deployment

### Expo Application Services (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build for production
eas build --platform ios
eas build --platform android

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Web Deployment

```bash
# Build for web
npm run build:web

# Deploy to hosting service (Vercel, Netlify, etc.)
# The dist/ folder contains the web build
```

## 🔧 Development Tips

### Platform-Specific Code

```tsx
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'ios' ? 20 : 16,
  },
});
```

### Web-Specific Features

```tsx
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
  console.log('Running on web!');
}
```

### Debugging

- **Expo Dev Tools**: Press `d` in terminal to open
- **React DevTools**: For component inspection
- **Flipper**: Desktop debugging tool for React Native

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Web](https://necolas.github.io/react-native-web/)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the Apache 2.0 License.
