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

export default config;
