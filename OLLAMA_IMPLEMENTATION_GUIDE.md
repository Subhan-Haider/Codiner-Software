# 🚀 Ollama Professional Integration Guide

## Complete Implementation for Codiner & CodeLens

This guide provides step-by-step instructions for implementing professional Ollama integration with model management, system prompts, and UI components.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Steps](#installation-steps)
3. [Codiner Integration](#codiner-integration)
4. [CodeLens Integration](#codelens-integration)
5. [Model Management](#model-management)
6. [System Prompts](#system-prompts)
7. [Auto-Start Configuration](#auto-start-configuration)
8. [Advanced Features](#advanced-features)
9. [Security Best Practices](#security-best-practices)
10. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

### Minimum
- **RAM**: 8GB (for 7B models)
- **Storage**: 10GB free space
- **OS**: Windows 10+, macOS 11+, Ubuntu 20.04+

### Recommended
- **RAM**: 16GB+ (for 14B models)
- **Storage**: 20GB+ SSD
- **GPU**: NVIDIA with 6GB+ VRAM (optional, for faster inference)

---

## 📦 Installation Steps

### Step 1: Install Ollama

**Windows:**
```powershell
# Download from https://ollama.com/download
# Or use winget
winget install Ollama.Ollama
```

**macOS:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Step 2: Verify Installation

```bash
ollama --version
```

### Step 3: Start Ollama Service

```bash
ollama serve
```

Default runs on: `http://localhost:11434`

### Step 4: Install Recommended Models

**For Codiner (code generation):**
```bash
ollama pull qwen2.5-coder:7b
ollama pull deepseek-coder:6.7b
```

**For CodeLens (analysis + security):**
```bash
ollama pull mistral:7b
ollama pull codellama:7b
```

**If you have 16GB+ RAM:**
```bash
ollama pull qwen2.5-coder:14b
```

---

## 🏗️ Codiner Integration

### Architecture Overview

```
┌─────────────────────────────────────────┐
│  Codiner Application                    │
├─────────────────────────────────────────┤
│                                         │
│  UI Layer (React)                       │
│  └─ OllamaModelManager Component        │
│                                         │
│  IPC Bridge (Electron)                  │
│  └─ ollama_management_handler.ts        │
│                                         │
│  Service Layer (Node.js)                │
│  ├─ ollama-manager.ts                   │
│  └─ system-prompts.ts                   │
│                                         │
│  External                               │
│  └─ Ollama (localhost:11434)            │
└─────────────────────────────────────────┘
```

### Files Created

1. **`src/lib/ai/ollama-manager.ts`** - Core model management logic
2. **`src/lib/ai/system-prompts.ts`** - Professional AI prompts
3. **`src/ipc/handlers/ollama_management_handler.ts`** - IPC handlers
4. **`src/components/OllamaModelManager.tsx`** - UI component

### Integration Steps

#### 1. Register IPC Handlers

In your main Electron process initialization file:

```typescript
import { registerOllamaManagementHandlers } from "./ipc/handlers/ollama_management_handler";

// In your app initialization
registerOllamaManagementHandlers();
```

#### 2. Add UI Component to Settings

In your Settings page:

```typescript
import { OllamaModelManager } from "@/components/OllamaModelManager";

export function SettingsPage() {
  return (
    <div>
      {/* Other settings sections */}
      
      <section>
        <h2>AI Models</h2>
        <OllamaModelManager />
      </section>
    </div>
  );
}
```

#### 3. Use System Prompts in AI Calls

```typescript
import { buildPrompt } from "@/lib/ai/system-prompts";
import { createOllamaProvider } from "@/ipc/utils/ollama_provider";

// When making AI requests
const { system, prompt } = buildPrompt("generate", userInput, {
  code: selectedCode,
  fileName: currentFile,
  language: "typescript",
});

const provider = createOllamaProvider();
const model = provider("qwen2.5-coder:7b");

const response = await model.doGenerate({
  inputFormat: "prompt",
  mode: { type: "regular" },
  prompt: [
    { role: "system", content: system },
    { role: "user", content: prompt },
  ],
});
```

#### 4. Add Neural Pulse Monitoring

```typescript
import { getModelHealth } from "@/lib/ai/ollama-manager";

// In your Neural Pulse component
useEffect(() => {
  const checkHealth = async () => {
    const health = await getModelHealth("qwen2.5-coder:7b");
    
    if (health.available) {
      console.log(`Ollama latency: ${health.latency}ms`);
      // Update UI with green status
    } else {
      // Update UI with red status
    }
  };

  const interval = setInterval(checkHealth, 10000); // Check every 10s
  return () => clearInterval(interval);
}, []);
```

#### 5. Smart Model Routing

```typescript
import { chooseModelForTask } from "@/lib/ai/ollama-manager";

// Automatically choose best model for task
const bestModel = await window.electron.ipcRenderer.invoke(
  "ollama:choose-model-for-task",
  "generate" // or "refactor", "docs", "security", "explain"
);

console.log(`Using model: ${bestModel}`);
```

---

## 🔍 CodeLens Integration

### Enhanced ollama-client.js

Update your existing `ollama-client.js`:

```javascript
class OllamaClient {
  constructor(baseURL = 'http://localhost:11434') {
    this.baseURL = baseURL;
  }

  /**
   * Analyze code with structured security prompt
   */
  async analyzeCodeSecurity(code, fileName, permissions = []) {
    const prompt = `You are a browser extension security expert and code auditor.

Analyze the following browser extension code carefully.

File: ${fileName}

Code:
\`\`\`
${code}
\`\`\`

${permissions.length > 0 ? `Manifest Permissions:\n${permissions.map(p => `- ${p}`).join('\n')}` : ''}

Provide:
1. List of vulnerabilities (with severity: Critical/High/Medium/Low)
2. Risky patterns detected
3. Permission analysis
4. Privacy concerns
5. Recommended fixes
6. Overall security score (1-10)

Be precise and technical.
Do not speculate without evidence.
Base conclusions only on provided code.`;

    return this.generateText(prompt, 'mistral:7b', true);
  }

  /**
   * Generate text with streaming
   */
  async generateText(prompt, model = 'qwen2.5-coder:7b', stream = false) {
    const response = await fetch(`${this.baseURL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed: ${response.statusText}`);
    }

    if (stream) {
      return this.handleStream(response);
    }

    const data = await response.json();
    return data.response;
  }

  /**
   * Handle streaming response
   */
  async *handleStream(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) {
            yield json.response;
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}
```

### Enhanced ollama-ui.js

Add streaming support:

```javascript
async handleAnalyzeCode() {
  const code = this.getSelectedCode();
  if (!code) {
    this.showMessage('No code selected');
    return;
  }

  this.showLoading('Analyzing code with AI...');

  try {
    const resultDiv = document.getElementById('ollama-result');
    resultDiv.innerHTML = '<div class="streaming-text"></div>';
    const streamDiv = resultDiv.querySelector('.streaming-text');

    // Use streaming for real-time display
    const stream = await this.client.generateText(
      `Analyze this code and explain what it does:\n\n${code}`,
      this.selectedModel,
      true // Enable streaming
    );

    for await (const chunk of stream) {
      streamDiv.textContent += chunk;
      streamDiv.scrollTop = streamDiv.scrollHeight;
    }

    this.hideLoading();
  } catch (error) {
    this.showMessage('Analysis failed: ' + error.message);
  }
}
```

---

## 🎛️ Model Management

### Features Implemented

1. **Auto-Detection**
   - Detects if Ollama is installed
   - Checks if service is running
   - Auto-starts service if needed

2. **Model Installation**
   - Install individual models
   - Install recommended model packs
   - Real-time progress tracking

3. **Model Deletion**
   - Remove unused models
   - Confirmation dialogs

4. **Smart Recommendations**
   - Hardware-based suggestions
   - RAM detection
   - Curated model list

5. **Health Monitoring**
   - Check model availability
   - Measure latency
   - Display in Neural Pulse

### Usage Examples

**Check if Ollama is ready:**
```typescript
const installed = await window.electron.ipcRenderer.invoke("ollama:check-installed");
const running = await window.electron.ipcRenderer.invoke("ollama:check-running");

if (installed && !running) {
  await window.electron.ipcRenderer.invoke("ollama:start-service");
}
```

**Install a model:**
```typescript
const result = await window.electron.ipcRenderer.invoke(
  "ollama:install-model",
  "qwen2.5-coder:7b"
);

if (result.success) {
  console.log("Model installed successfully");
}
```

**Get system recommendations:**
```typescript
const recommendations = await window.electron.ipcRenderer.invoke(
  "ollama:get-recommended-models"
);

// Shows models recommended for your RAM
recommendations.forEach(model => {
  if (model.recommended) {
    console.log(`Recommended: ${model.displayName}`);
  }
});
```

---

## 📝 System Prompts

### Available Prompts

1. **CODE_GENERATION** - For generating production code
2. **SECURITY_ANALYSIS** - For security audits
3. **REFACTORING** - For code refactoring
4. **DOCUMENTATION** - For generating docs
5. **DEBUGGING** - For debugging assistance
6. **EXPLANATION** - For code explanation
7. **UNIVERSAL** - All-in-one prompt

### Usage

```typescript
import { getSystemPrompt, buildPrompt } from "@/lib/ai/system-prompts";

// Get specific prompt
const securityPrompt = getSystemPrompt("security");

// Build complete prompt with context
const { system, prompt } = buildPrompt("generate", userInput, {
  code: selectedCode,
  fileName: "app.tsx",
  language: "typescript",
});

// Use in AI call
const response = await aiModel.generate({
  system,
  prompt,
});
```

### Custom Prompts

You can add custom prompts in `system-prompts.ts`:

```typescript
export const SYSTEM_PROMPTS = {
  // ... existing prompts
  
  CUSTOM_TASK: `Your custom prompt here...`,
};
```

---

## ⚙️ Auto-Start Configuration

### Windows (Task Scheduler)

1. Press `Win + R`
2. Type: `taskschd.msc`
3. Create Basic Task
4. **Trigger**: At log on
5. **Action**: Start a Program
6. **Program**: `C:\Users\setup\AppData\Local\Programs\Ollama\ollama.exe`
7. **Arguments**: `serve`

Now Ollama runs automatically when PC starts.

### macOS (launchd)

Create `~/Library/LaunchAgents/com.ollama.serve.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ollama.serve</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/ollama</string>
        <string>serve</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.ollama.serve.plist
```

### Linux (systemd)

Create `/etc/systemd/system/ollama.service`:

```ini
[Unit]
Description=Ollama Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/ollama serve
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable ollama
sudo systemctl start ollama
```

---

## 🔥 Advanced Features

### 1. Shared AI Engine

Create a unified config file:

**`C:\Users\setup\.codiner\ai-config.json`**
```json
{
  "defaultModel": "qwen2.5-coder:7b",
  "ollamaHost": "http://localhost:11434",
  "autoStart": true,
  "models": {
    "generate": "qwen2.5-coder:7b",
    "refactor": "deepseek-coder:6.7b",
    "docs": "codellama:7b",
    "security": "mistral:7b"
  }
}
```

Both Codiner and CodeLens read from this config.

### 2. Local Embeddings (Semantic Search)

```bash
ollama pull nomic-embed-text
```

Then implement semantic search:

```typescript
async function indexProject(files: string[]) {
  const embeddings = [];
  
  for (const file of files) {
    const embedding = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: file.content,
      }),
    });
    
    embeddings.push({
      file: file.path,
      embedding: await embedding.json(),
    });
  }
  
  return embeddings;
}
```

Now Codiner can understand your entire codebase!

### 3. Hardware Detection UI

```typescript
const ram = await window.electron.ipcRenderer.invoke("ollama:get-system-ram");

let suggestion = "";
if (ram < 8) {
  suggestion = "We recommend llama3.2:3b for your system";
} else if (ram < 16) {
  suggestion = "We recommend qwen2.5-coder:7b for your system";
} else {
  suggestion = "We recommend qwen2.5-coder:14b for your system";
}

// Show in UI
```

---

## 🛡️ Security Best Practices

### 1. Input Validation

Always validate model names:

```typescript
const allowedModels = [
  "qwen2.5-coder:7b",
  "deepseek-coder:6.7b",
  "mistral:7b",
  // ... etc
];

if (!allowedModels.includes(userInput)) {
  throw new Error("Invalid model name");
}
```

### 2. Request Limits

```typescript
const MAX_TOKENS = 4096;
const MAX_PROMPT_LENGTH = 10000;

if (prompt.length > MAX_PROMPT_LENGTH) {
  throw new Error("Prompt too long");
}
```

### 3. Error Handling

```typescript
try {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    body: JSON.stringify({ model, prompt }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.statusText}`);
  }

  return await response.json();
} catch (error) {
  console.error("Ollama error:", error);
  throw error;
}
```

---

## 🔧 Troubleshooting

### Ollama Not Detected

**Problem**: UI shows "Ollama not installed"

**Solutions**:
1. Verify installation: `ollama --version`
2. Check PATH environment variable
3. Restart terminal/IDE
4. Reinstall Ollama

### Service Not Running

**Problem**: "Ollama service is not running"

**Solutions**:
1. Start manually: `ollama serve`
2. Check port 11434: `netstat -an | findstr 11434`
3. Check firewall settings
4. Restart Ollama service

### Model Installation Fails

**Problem**: Model download fails or hangs

**Solutions**:
1. Check internet connection
2. Verify disk space
3. Try smaller model first
4. Check Ollama logs

### Slow Performance

**Problem**: AI responses are very slow

**Solutions**:
1. Use smaller models (3B instead of 7B)
2. Enable GPU acceleration
3. Close other applications
4. Increase RAM allocation

---

## 📊 Performance Optimization

### Model Selection by Task

| Task | Best Model | Speed | Quality |
|------|-----------|-------|---------|
| Quick edits | llama3.2:3b | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ |
| Code generation | qwen2.5-coder:7b | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ |
| Refactoring | deepseek-coder:6.7b | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ |
| Documentation | codellama:7b | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| Security | mistral:7b | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| Complex projects | qwen2.5-coder:14b | ⚡⚡ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Next Steps

1. ✅ Install Ollama
2. ✅ Pull recommended models
3. ✅ Integrate model manager UI
4. ✅ Add system prompts
5. ✅ Configure auto-start
6. ✅ Test with real code
7. 🚀 Ship to users!

---

**Made with ❤️ by Subhan Haider**  
*Empowering developers with local-first AI*
