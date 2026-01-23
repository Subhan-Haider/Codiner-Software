# ⚡ Codiner

<div align="center">

**The Free, Local, Open-Source AI App Builder**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-32.1.2-blue.svg)](https://www.electronjs.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

*Build web applications faster with local AI, production-ready templates, and smart diagnostics.*

[🚀 Quick Start](#-quick-start) • [✨ Key Features](#-key-features) • [📚 Documentation](#-documentation) • [🤝 Contributing](#-contributing)

<img src="assets/promo-banner.png" alt="Codiner Promo Banner" width="100%" />

</div>

---

## 💡 What is Codiner?

**Codiner** is a powerful, local-first desktop application designed to accelerate web development. Unlike cloud-only tools, Codiner runs entirely on your machine, giving you full control over your code, data, and AI agents.

It seamlessly integrates with your favorite AI models—both local (Ollama) and cloud-based (Anthropic, OpenAI, Google)—to help you scaffold projects, debug code, and manage deployments.

## ✨ Key Features

### 🧠 Neural Pulse Architecture
Codiner's advanced AI connectivity layer ensures your coding assistant is always online and responsive.
- **Auto-Healing Connections**: Automatically detects and repairs dropped AI connections.
- **Real-Time Diagnostics**: Monitors latency and provider health in real-time.
- **Smart Fallbacks**: If one provider fails, Codiner can switch to another to keep you working.

### 🏠 Local & Private by Design
- **Your Code, Your Machine**: No code is sent to our servers. Everything runs locally.
- **Local LLM Support**: First-class support for **Ollama** and other local inference engines.
- **Cloud Connectors**: Securely connect to Anthropic (Claude), OpenAI (GPT-4), Google (Gemini), and more.

### 🚀 Production-Ready Templates
Jumpstart your next project with over **22+ verified templates** covering every modern stack:
- **Web**: React, Next.js, Vue, Svelte, Angular, Astro
- **Mobile**: React Native, Capacitor
- **Desktop**: Electron, Tauri
- **Backend**: NestJS, Express, Fastify, Supabase

👉 **[Browse All Templates](community-templates/README.md)**

### 🔌 Built-in Integrations
Manage your entire stack from one place with persistent configuration:
- **Infrastructure**: Vercel, Docker
- **Backend/DB**: Firebase, Supabase, Neon
- **Tools**: Slack, Stripe

### 🛠️ Smart Diagnostics
- **Plain English Errors**: No more cryptic JSON dumps. Codiner explains *why* something failed (e.g., "Invalid API Key", "Port Conflict").
- **Network Monitoring**: Visual "Orbs" show the status of every connected service.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 20 or higher
- **Git**: Installed and configured
- **OS**: Windows, macOS, or Linux

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Subhan-Haider/Codiner_Windows.git
    cd Codiner_Windows
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Mode**
    ```bash
    npm start
    ```
    This will launch the Electron app in development mode with hot-reloading.

### Building the App

To create a distributable installer for your OS:

```bash
# For your current platform
npm run make
```

For detailed build instructions (Windows, macOS, Linux), see the **[Setup Guide](setup.md)**.

## 📚 Documentation

- **[AI Diagnostics & Neural Pulse](AI_DIAGNOSTICS_DOCUMENTATION.md)**: Deep dive into the AI monitor architecture.
- **[Community Templates](community-templates/README.md)**: Full list of available starter templates.
- **[Setup Guide](setup.md)**: Advanced build and distribution instructions.
- **[Contributing Guide](CONTRIBUTING.md)**: How to get involved.

## 🤝 Contributing

We welcome contributions from the community! Whether it's adding a new template, fixing a bug, or improving documentation, your help is appreciated.

Please read our **[Contributing Guide](CONTRIBUTING.md)** to get started.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Electron** for the cross-platform desktop framework.
- **Vite** for lightning-fast tooling.
- **Tailwind CSS** for the utility-first styling.
- **Shadcn/UI** for the beautiful component system.
- All the open-source contributors who make this project possible!
