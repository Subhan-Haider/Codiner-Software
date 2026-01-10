#!/usr/bin/env node

/**
 * Automated Installation Script for Vue 3 + TypeScript Template
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

class VueInstaller {
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
    console.log('💚 Vue 3 + TypeScript Template - Automated Installation');
    console.log('====================================================\n');

    try {
      await this.showWelcome();
      await this.checkPrerequisites();
      await this.installDependencies();
      await this.setupEnvironment();
      await this.showCompletion();

    } catch (error) {
      console.error('\n❌ Installation failed:', error.message);
      process.exit(1);
    }
  }

  async showWelcome() {
    console.log('✨ Welcome to Vue 3 + TypeScript Template Setup!');
    console.log('This installer will set up your Vue development environment.\n');

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
    console.log('📦 Installing Vue dependencies...\n');

    const installCommand = this.packageManager === 'yarn' ? 'yarn install' :
                          this.packageManager === 'pnpm' ? 'pnpm install' : 'npm install';

    console.log(`Running: ${installCommand}`);

    try {
      execSync(installCommand, {
        cwd: this.projectRoot,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });
      console.log('\n✅ Vue dependencies installed!\n');
    } catch (error) {
      throw new Error('Failed to install dependencies.');
    }
  }

  async setupEnvironment() {
    console.log('⚙️  Setting up environment...\n');

    const envPath = path.join(this.projectRoot, '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Vue 3 + TypeScript Template Environment
VITE_APP_TITLE="Vue 3 + TypeScript App"
VITE_APP_ENV="development"
`;
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created .env file');
    }

    console.log('');
  }

  async showCompletion() {
    console.clear();
    console.log('🎉 Vue Installation Complete!');
    console.log('=============================\n');

    console.log('✅ Vue 3 + TypeScript + Vite + Tailwind setup ready');
    console.log('🚀 Ready to develop!\n');

    console.log('📋 Commands:');
    console.log('  npm run dev      # Start dev server');
    console.log('  npm run build    # Build for production');
    console.log('  npm run preview  # Preview production build');
    console.log('');

    const startNow = await this.askQuestion('Start development server now? (Y/n): ');
    if (startNow.toLowerCase() !== 'n' && startNow.toLowerCase() !== 'no') {
      console.log('\n🚀 Starting Vue development server...\n');
      const devProcess = spawn(this.packageManager, ['run', 'dev'], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' }
      });

      process.on('SIGINT', () => {
        devProcess.kill('SIGINT');
        console.log('\n👋 Vue dev server stopped. Happy coding!');
        process.exit(0);
      });
    } else {
      console.log('\n💡 Run: npm run dev');
      console.log('🌐 Open: http://localhost:5173\n');
      console.log('🎊 Happy coding with Vue 3! 💚\n');
    }
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      const rl = readline.createInterface({
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
  const installer = new VueInstaller();
  installer.install().catch(console.error);
}

module.exports = VueInstaller;
