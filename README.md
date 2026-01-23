# <img src="assets/icon/icon.png" width="40" height="40" align="center" /> Codiner

<div align="center">

**The Free, Local-First, Open-Source AI Application Foundry**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-32.2.2-blue.svg?style=for-the-badge&logo=electron)](https://www.electronjs.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D20-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

*Build full-stack modern web applications in seconds using local AI, powerful templates, and real-time neural diagnostics.*

[🚀 Quick Start](#-quick-start) • [⚡ How it Works](#-how-it-works) • [🧠 Neural Pulse](#-neural-pulse-architecture) • [🚀 Infrastructure](#-infrastructure-foundry) • [🤝 Support](#-community--support)

<img src="assets/promo-banner.png" alt="Codiner Promo Banner" width="100%" style="border-radius: 10px; margin: 20px 0;" />

</div>

---

## ⚡ How it Works: The Architecture

Codiner is built as a **Secure Desktop Hub**. It acts as the "Grand Central Station" between your code, your local AI models, and your cloud infrastructure.

<div align="center">
  <img src="assets/codiner-architecture.png" width="85%" alt="Codiner Architecture Diagram" style="border-radius: 10px; border: 1px solid #333;" />
</div>

### 1. The Core Engine (Electron + IPC)
Codiner runs as a multi-process Electron application. The **Renderer** (the UI you see) communicates with the **Main Process** via a secure **IPC (Inter-Process Communication) Bridge**.
- **No Browser Sandbox Limits**: Unlike web-based AI builders, Codiner can directly interact with your local filesystem, run terminal commands, and manage Docker containers.
- **SQLite + Drizzle**: All your project data, AI preferences, and integration keys are stored in a local, lightning-fast SQLite database.

### 2. The AI Orchestrator
When you ask Codiner to build or fix something, it doesn't just call one API. It orchestrates a "Neural Handshake":
- **Local Priority**: If Ollama is running, Codiner can route tasks locally for maximum privacy and 0ms network latency.
- **Context injection**: Codiner automatically reads your project structure and relevant files, feeding only the necessary context to the AI to stay within token limits.

### 3. The File System Guard
Codiner performs "Atomic Writes". It prepares code changes in a shadow buffer, validates them, and then applies them to your project folder using a high-integrity file-writing system, ensuring your source code is never corrupted.

---

## 🧠 Neural Pulse Architecture
Our signature AI diagnostic suite. It's the "cockpit" of your AI development.

| Component | What it Monitors | Why it Matters |
|:--- |:--- |:--- |
| **Connectivity Orbs** | Real-time status of all AI nodes. | Instant visual confirmation if a service (like Ollama) goes down. |
| **Neural Latency** | Time-to-first-token and round-trip ping. | Choose the fastest provider for the task at hand. |
| **Capability Matrix** | Vision, Tool-use, and Context Window size. | Automatically routes complex visual tasks to multimodal models. |
| **Error Autopsy** | Translates cryptic JSON errors to plain English. | Fix "Rate Limit" or "Invalid Key" issues in seconds. |

<div align="center">
  <img src="assets/neural-pulse-viz.png" width="80%" alt="Neural Pulse Visualization" style="border-radius: 8px;" />
</div>

---

## 🚀 Infrastructure Foundry

Codiner doesn't just write code; it configures your entire production environment.

### 🔌 Verified Integrations
- **Firebase/Supabase**: Backend-as-a-service setup including project IDs and authentication flows.
- **Neon DB**: Serverless Postgres integration with automatic connection string management.
- **Vercel**: One-click deployment configuration for your built apps.
- **Docker**: Automatic generation of optimized `Docker-compose` and `Dockerfile` assets.

### 🏗️ The Template Library
Jumpstart any project with **22+ audited, production-grade templates**:
- **Frameworks**: Next.js 14 (App Router), React 19, Vue 3 (Composition API), Svelte 5 (Runes).
- **Desktop**: Tauri + Rust, Electron + Svelte/React.
- **Mobile**: Universal Expo (React Native), Capacitor + Vue.
- **Ready-to-Go**: E-commerce with Stripe, SaaS with Payload CMS, and high-performance APIs with NestJS/Fastify.

---

## 💎 The Codiner Difference

| Feature | **Traditional Cloud AI Builders** | **⚡ Codiner** |
|:--- |:--- |:--- |
| **Privacy** | Your code is on their servers | **100% Local.** Your code never leaves. |
| **Cost** | High monthly subscriptions | **Free & Open Source forever.** |
| **Connectivity** | Requires constant internet | **Works Offline** with local LLMs (Ollama). |
| **Control** | Locked into their platform | **Export anywhere.** It's just clean code. |
| **Speed** | Network latency issues | **Ultra-fast** local execution. |

---

## 🛠️ Tech Stack

<div align="center">

| Area | Technologies |
| :--- | :--- |
| **Framework** | ![Electron](https://img.shields.io/badge/Electron-47848f?style=flat-square&logo=electron&logoColor=white) ![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white) |
| **Data Layer** | ![SQLite](https://img.shields.io/badge/SQLite-07405e?style=flat-square&logo=sqlite&logoColor=white) ![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind-06b6d4?style=flat-square&logo=tailwind-css&logoColor=white) ![Framer](https://img.shields.io/badge/Framer_Motion-0055ff?style=flat-square&logo=framer&logoColor=white) |
| **Build Tooling**| ![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white) |
| **AI Providers** | ![Ollama](https://img.shields.io/badge/Ollama-000000?style=flat-square&logo=ollama&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white) ![Anthropic](https://img.shields.io/badge/Anthropic-D97757?style=flat-square&logo=anthropic&logoColor=white) ![Google](https://img.shields.io/badge/Gemini-4285F4?style=flat-square&logo=google&logoColor=white) |

</div>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/setupg963-spec/Codiner-Software.git
cd Codiner-Software

# Install the engine
npm install

# Start development mode
npm start
```

---

## 📚 Documentation

Deep dive into how the engine works:
- **[AIE Diagnostics Guide](AI_DIAGNOSTICS_DOCUMENTATION.md)** - Understanding the telemetry system.
- **[Template Library](community-templates/README.md)** - Full breakdown of the 22+ starters.
- **[System Architecture](AGENTS.md)** - How the AI Agents interact with your file system.
- **[Build & Setup](setup.md)** - Cross-platform distribution (Win/Mac/Linux).

---

<div align="center">
  <p>Built with ❤️ by the Codiner Team and open-source contributors.</p>
  <p><b>⭐ Star us on GitHub to support the mission!</b></p>
</div>
