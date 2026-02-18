# 🚀 Ollama Integration - Quick Reference

## 📦 What You Got

### 5 New Files Created

1. **`src/lib/ai/ollama-manager.ts`** - Model management backend
2. **`src/lib/ai/system-prompts.ts`** - Professional AI prompts
3. **`src/ipc/handlers/ollama_management_handler.ts`** - IPC bridge
4. **`src/components/OllamaModelManager.tsx`** - UI component
5. **`OLLAMA_IMPLEMENTATION_GUIDE.md`** - Complete guide

---

## ⚡ Quick Start (3 Steps)

### 1️⃣ Register IPC Handlers

In your main Electron process file:

```typescript
import { registerOllamaManagementHandlers } from "./ipc/handlers/ollama_management_handler";

app.whenReady().then(() => {
  registerOllamaManagementHandlers(); // Add this line
});
```

### 2️⃣ Add UI to Settings

In your Settings component:

```tsx
import { OllamaModelManager } from "@/components/OllamaModelManager";

// In your render:
<OllamaModelManager />
```

### 3️⃣ Use System Prompts

In your AI calls:

```typescript
import { buildPrompt } from "@/lib/ai/system-prompts";

const { system, prompt } = buildPrompt("generate", userInput);
// Use system and prompt in your AI request
```

---

## 🎯 Key Features

✅ **Auto-detect** Ollama installation  
✅ **Auto-start** Ollama service  
✅ **Install models** with progress bars  
✅ **Delete models** with confirmation  
✅ **Smart recommendations** based on RAM  
✅ **Health monitoring** with latency tracking  
✅ **Task-based routing** (best model per task)  
✅ **Security validation** (no command injection)  

---

## 🔧 API Reference

### IPC Calls Available

```typescript
// Check if Ollama is installed
await window.electron.ipcRenderer.invoke("ollama:check-installed");

// Check if service is running
await window.electron.ipcRenderer.invoke("ollama:check-running");

// Start Ollama service
await window.electron.ipcRenderer.invoke("ollama:start-service");

// Get installed models
await window.electron.ipcRenderer.invoke("ollama:get-installed-models");

// Install a model
await window.electron.ipcRenderer.invoke("ollama:install-model", "qwen2.5-coder:7b");

// Delete a model
await window.electron.ipcRenderer.invoke("ollama:delete-model", "qwen2.5-coder:7b");

// Get system RAM
await window.electron.ipcRenderer.invoke("ollama:get-system-ram");

// Get recommended models
await window.electron.ipcRenderer.invoke("ollama:get-recommended-models");

// Install model pack
await window.electron.ipcRenderer.invoke("ollama:install-model-pack");

// Choose best model for task
await window.electron.ipcRenderer.invoke("ollama:choose-model-for-task", "generate");

// Get model health
await window.electron.ipcRenderer.invoke("ollama:get-model-health", "qwen2.5-coder:7b");
```

---

## 📝 System Prompts Available

```typescript
import { getSystemPrompt, buildPrompt } from "@/lib/ai/system-prompts";

// Available prompt types:
"generate"    // Code generation
"refactor"    // Code refactoring
"docs"        // Documentation
"security"    // Security analysis
"debug"       // Debugging
"explain"     // Code explanation
"universal"   // All-in-one
```

---

## 🎨 UI Component Props

```tsx
<OllamaModelManager />
// No props needed - fully self-contained
```

---

## 🔐 Security Features

- ✅ Whitelist validation for model names
- ✅ No arbitrary command execution
- ✅ Input sanitization
- ✅ Error handling with logging

---

## 📊 Recommended Models

| Model | Size | Best For | RAM Needed |
|-------|------|----------|------------|
| llama3.2:3b | 2GB | Quick tasks | 4GB |
| qwen2.5-coder:7b | 4.7GB | Code generation | 8GB |
| deepseek-coder:6.7b | 3.8GB | Fast completion | 8GB |
| codellama:7b | 3.8GB | Documentation | 8GB |
| mistral:7b | 4.1GB | Security analysis | 8GB |
| qwen2.5-coder:14b | 9GB | Complex projects | 16GB |

---

## 🐛 Troubleshooting

### Ollama Not Detected
```bash
# Verify installation
ollama --version

# Check if running
curl http://localhost:11434
```

### Dependencies Missing
```bash
# Install Radix UI components
npm install @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-switch
```

### Service Won't Start
```bash
# Start manually
ollama serve
```

---

## 📖 Full Documentation

- **Implementation Guide**: `OLLAMA_IMPLEMENTATION_GUIDE.md`
- **User Setup**: `OLLAMA_SETUP.md`
- **Architecture**: `OLLAMA_LOCAL_ARCHITECTURE.md`
- **Summary**: `OLLAMA_INTEGRATION_SUMMARY.md`

---

## ✨ Example Usage

### Install Model with Progress

```typescript
// Listen for progress
window.electron.ipcRenderer.on("ollama:install-progress", (data) => {
  console.log(`${data.model}: ${data.progress}`);
});

// Install model
const result = await window.electron.ipcRenderer.invoke(
  "ollama:install-model",
  "qwen2.5-coder:7b"
);

if (result.success) {
  console.log("Model installed!");
}
```

### Use System Prompt

```typescript
import { buildPrompt } from "@/lib/ai/system-prompts";

const { system, prompt } = buildPrompt("generate", "Create a React component", {
  code: existingCode,
  fileName: "Button.tsx",
  language: "typescript",
});

// Use in AI call
const response = await aiModel.generate({ system, prompt });
```

### Check Model Health

```typescript
const health = await window.electron.ipcRenderer.invoke(
  "ollama:get-model-health",
  "qwen2.5-coder:7b"
);

if (health.available) {
  console.log(`Latency: ${health.latency}ms`);
} else {
  console.log("Model not available");
}
```

---

**Made with ❤️ for Codiner**  
*Professional Ollama integration for local-first AI*
