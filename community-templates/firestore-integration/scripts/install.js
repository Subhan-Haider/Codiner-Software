#!/usr/bin/env node

/**
 * Automated Installation Script for Firestore Integration Template
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class FirestoreInstaller {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.packageManager = this.detectPackageManager();
  }

  detectPackageManager() {
    if (fs.existsSync(path.join(this.projectRoot, 'yarn.lock'))) return 'yarn';
    if (fs.existsSync(path.join(this.projectRoot, 'pnpm-lock.yaml'))) return 'pnpm';
    return 'npm';
  }

  async install() {
    console.clear();
    console.log('🔥 Firestore Integration Template - Automated Installation');
    console.log('=========================================================\n');

    try {
      await this.showWelcome();
      await this.checkPrerequisites();
      await this.installDependencies();
      await this.setupConfiguration();
      await this.createDemoFiles();
      await this.showCompletion();

    } catch (error) {
      console.error('\n❌ Installation failed:', error.message);
      process.exit(1);
    }
  }

  async showWelcome() {
    console.log('✨ Welcome to Firestore Integration Setup!');
    console.log('This installer will set up everything you need for Firestore integration.\n');

    const answer = await this.askQuestion('Ready to begin? (Y/n): ');
    if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
      console.log('Installation cancelled.');
      process.exit(0);
    }
  }

  async checkPrerequisites() {
    console.log('🔍 Checking prerequisites...\n');

    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (majorVersion < 18) {
      throw new Error(`Node.js ${nodeVersion} detected. Please upgrade to Node.js 18+.`);
    }
    console.log(`✅ Node.js ${nodeVersion}`);

    try {
      const pmVersion = execSync(`${this.packageManager} --version`, { encoding: 'utf8' }).trim();
      console.log(`✅ ${this.packageManager} ${pmVersion}`);
    } catch (error) {
      throw new Error(`${this.packageManager} not found.`);
    }

    console.log('');
  }

  async installDependencies() {
    console.log('📦 Installing Firebase and dependencies...\n');

    const installCommand = this.packageManager === 'yarn' ? 'yarn add firebase' :
                          this.packageManager === 'pnpm' ? 'pnpm add firebase' : 'npm install firebase';

    console.log(`Running: ${installCommand}`);

    try {
      execSync(installCommand, {
        cwd: this.projectRoot,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });
      console.log('\n✅ Firebase SDK installed successfully!\n');
    } catch (error) {
      throw new Error('Failed to install Firebase SDK.');
    }
  }

  async setupConfiguration() {
    console.log('⚙️  Setting up Firebase configuration...\n');

    // Create environment file
    const envPath = path.join(this.projectRoot, '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Firestore Integration Environment Variables
# Configure your Firebase project settings here

# Firebase Configuration (Replace with your actual config)
VITE_FIREBASE_API_KEY=demo-api-key
VITE_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=demo-project
VITE_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=demo-app-id

# Application Settings
VITE_APP_NAME=Firestore Integration Demo
VITE_APP_ENV=development
`;

      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created .env file with Firebase configuration template');
    } else {
      console.log('ℹ️  .env file already exists');
    }

    // Create Firebase config template
    const configPath = path.join(this.projectRoot, 'src', 'firebase-config.js');
    if (!fs.existsSync(configPath)) {
      const configContent = `// Firebase Configuration
// Replace these values with your Firebase project config

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Multiple project support
export const firebaseConfigs = {
  'demo-project': firebaseConfig,
  'my-app-prod': {
    // Add your production config here
    apiKey: "your-prod-api-key",
    authDomain: "your-prod-project.firebaseapp.com",
    projectId: "your-prod-project",
    storageBucket: "your-prod-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-prod-app-id"
  },
  'my-app-dev': {
    // Add your development config here
    apiKey: "your-dev-api-key",
    authDomain: "your-dev-project.firebaseapp.com",
    projectId: "your-dev-project",
    storageBucket: "your-dev-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-dev-app-id"
  }
};
`;

      fs.writeFileSync(configPath, configContent);
      console.log('✅ Created Firebase configuration file');
    }

    console.log('');
  }

  async createDemoFiles() {
    console.log('🎯 Creating demo files and examples...\n');

    // Create a simple demo page
    const demoPath = path.join(this.projectRoot, 'demo.html');
    if (!fs.existsSync(demoPath)) {
      const demoContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firestore Demo</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .demo-section { margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        button { padding: 10px 20px; margin: 5px; border: none; border-radius: 5px; cursor: pointer; }
        .connect-btn { background: #4285f4; color: white; }
        .test-btn { background: #34a853; color: white; }
        .disconnect-btn { background: #ea4335; color: white; }
    </style>
</head>
<body>
    <h1>🔥 Firestore Integration Demo</h1>

    <div class="demo-section">
        <h2>Quick Test</h2>
        <button class="connect-btn" onclick="connectFirestore()">Connect Firestore</button>
        <button class="test-btn" onclick="addTestData()">Add Test Data</button>
        <button class="disconnect-btn" onclick="disconnectFirestore()">Disconnect</button>
    </div>

    <div class="demo-section">
        <h2>Status</h2>
        <div id="status">Not connected</div>
    </div>

    <div class="demo-section">
        <h2>Logs</h2>
        <div id="logs" style="max-height: 200px; overflow-y: auto; background: #f5f5f5; padding: 10px; border-radius: 4px;"></div>
    </div>

    <script type="module">
        // This would normally import your Firestore integration
        console.log('Firestore Demo loaded - integrate with your main module');

        // Demo functions (replace with actual integration)
        window.connectFirestore = () => {
            document.getElementById('status').textContent = 'Connecting...';
            addLog('Attempting to connect to Firestore...');
        };

        window.addTestData = () => {
            addLog('Adding test data...');
        };

        window.disconnectFirestore = () => {
            document.getElementById('status').textContent = 'Disconnected';
            addLog('Disconnected from Firestore');
        };

        function addLog(message) {
            const logs = document.getElementById('logs');
            const timestamp = new Date().toLocaleTimeString();
            logs.innerHTML += \`<div>[${timestamp}] ${message}</div>\`;
            logs.scrollTop = logs.scrollHeight;
        }
    </script>
</body>
</html>`;
      fs.writeFileSync(demoPath, demoContent);
      console.log('✅ Created demo.html for testing');
    }

    // Create example integration file
    const examplePath = path.join(this.projectRoot, 'src', 'example-integration.js');
    if (!fs.existsSync(examplePath)) {
      const exampleContent = `/**
 * Example: How to integrate Firestore into your app
 */

// Import the integration (adjust path as needed)
// import FirestoreIntegration from './firestore-integration.js';

// Example 1: Basic usage
function basicExample() {
  // Initialize
  const firestore = new FirestoreIntegration();

  // The UI will be automatically created
  // User can click "Connect Firestore" button
}

// Example 2: Custom event handling
function customExample() {
  const firestore = new FirestoreIntegration();

  // Listen for connection changes
  document.addEventListener('firestore-connected', (event) => {
    console.log('Connected:', event.detail.user);
  });

  // Listen for data changes
  document.addEventListener('firestore-data-changed', (event) => {
    console.log('Data changed:', event.detail);
  });
}

// Example 3: React integration
function reactExample() {
  // In your React component:
  /*
  import FirestoreConnect from './FirestoreConnect';

  function MyApp() {
    return (
      <div>
        <h1>My App</h1>
        <FirestoreConnect
          onConnectionChange={(connected, user) => {
            console.log('Connection status:', connected);
          }}
          onDataChange={(data) => {
            // Handle real-time data changes
            if (data.type === 'task_added') {
              addTaskToUI(data.data);
            }
          }}
        />
      </div>
    );
  }
  */
}

// Example 4: Programmatic usage
function programmaticExample() {
  // For advanced users who want full control
  const firestore = new FirestoreIntegration();

  // Custom connection handling
  firestore.connect().then(() => {
    console.log('Connected successfully');
  }).catch((error) => {
    console.error('Connection failed:', error);
  });

  // Custom data operations
  firestore.addTestData().then(() => {
    console.log('Test data added');
  });
}

export { basicExample, customExample, reactExample, programmaticExample };
`;
      fs.writeFileSync(examplePath, exampleContent);
      console.log('✅ Created example integration file');
    }

    console.log('');
  }

  async showCompletion() {
    console.clear();
    console.log('🎉 Firestore Integration Setup Complete!');
    console.log('=========================================\n');

    console.log('✅ Firebase SDK installed');
    console.log('✅ Configuration files created');
    console.log('✅ Demo files ready');
    console.log('✅ Security rules template ready\n');

    console.log('🚀 Next Steps:');
    console.log('1. Configure your Firebase project in src/firebase-config.js');
    console.log('2. Deploy Firestore security rules: firebase deploy --only firestore:rules');
    console.log('3. Open index.html in your browser');
    console.log('4. Click "Connect Firestore" to test the integration\n');

    console.log('📋 Available Files:');
    console.log('  index.html          - Main demo page');
    console.log('  demo.html           - Simple test page');
    console.log('  src/                - Integration modules');
    console.log('  firestore.rules     - Security rules');
    console.log('  README.md           - Complete documentation\n');

    console.log('🔗 Useful Links:');
    console.log('  Firebase Console: https://console.firebase.google.com/');
    console.log('  Firestore Docs: https://firebase.google.com/docs/firestore');
    console.log('  Security Rules: https://firebase.google.com/docs/firestore/security/get-started\n');

    const openDemo = await this.askQuestion('Open demo page now? (Y/n): ');
    if (openDemo.toLowerCase() !== 'n' && openDemo.toLowerCase() !== 'no') {
      console.log('\n🌐 Opening demo page...');
      console.log('If it doesn\'t open automatically, visit: http://localhost:5173\n');

      try {
        execSync('npm run dev', {
          cwd: this.projectRoot,
          stdio: 'inherit',
          detached: true
        });
      } catch (error) {
        console.log('Please run "npm run dev" manually to start the demo');
      }
    } else {
      console.log('\n💡 To start the demo later, run: npm run dev');
    }

    console.log('\n🎊 Firestore integration setup complete!');
    console.log('Happy coding with real-time data synchronization! 🚀\n');
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question(question, (answer) => {
        rl.close();
        resolve(answer || 'y');
      });
    });
  }
}

// Run the installer
if (require.main === module) {
  const installer = new FirestoreInstaller();
  installer.install().catch(console.error);
}

module.exports = FirestoreInstaller;
