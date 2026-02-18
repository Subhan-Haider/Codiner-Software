# 🚀 Ollama Local AI Setup Guide for Codiner

## Quick Start: Run AI Locally in Codiner

Codiner has **built-in Ollama support** for running AI models completely locally on your machine. No cloud costs, no data sharing, complete privacy.

## Step 1: Install Ollama

### Windows
```powershell
# Download from https://ollama.com/download/windows
# Or use winget
winget install Ollama.Ollama
```

### macOS
```bash
brew install ollama
```

### Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## Step 2: Pull Recommended Models

### 🏆 Best Coding Models for Codiner

#### **Qwen 2.5 Coder** (Recommended)
```bash
ollama pull qwen2.5-coder:7b
```
- **Size**: 4.7GB
- **Best for**: General coding, code generation, refactoring
- **Speed**: Medium
- **Quality**: ⭐⭐⭐⭐⭐

#### **DeepSeek Coder** (Alternative)
```bash
ollama pull deepseek-coder:6.7b
```
- **Size**: 3.8GB
- **Best for**: Code completion, debugging
- **Speed**: Medium-Fast
- **Quality**: ⭐⭐⭐⭐

#### **CodeLlama** (Meta AI)
```bash
ollama pull codellama:7b
```
- **Size**: 3.8GB
- **Best for**: Code generation, documentation
- **Speed**: Medium
- **Quality**: ⭐⭐⭐⭐

#### **Llama 3.2** (Lightweight)
```bash
ollama pull llama3.2:3b
```
- **Size**: 2.0GB
- **Best for**: Quick tasks, low-resource systems
- **Speed**: Fast
- **Quality**: ⭐⭐⭐

### 🎯 Specialized Models

#### **For TypeScript/JavaScript**
```bash
ollama pull qwen2.5-coder:7b
```

#### **For Python**
```bash
ollama pull deepseek-coder:6.7b
```

#### **For Low RAM Systems (8GB)**
```bash
ollama pull llama3.2:3b
```

#### **For High Performance (16GB+ RAM)**
```bash
ollama pull qwen2.5-coder:14b
```

## Step 3: Start Ollama

Ollama usually runs automatically after installation. If not:

```bash
ollama serve
```

## Step 4: Use in Codiner

1. **Open Codiner**
2. **Click the Model Picker** (top toolbar)
3. **Navigate to**: `Local models` → `Ollama`
4. **Select your model** (e.g., "Qwen 2.5 Coder 7B")
5. **Start coding!** 🎉

## Model Comparison

| Model | RAM | Speed | Code Quality | Best Use Case |
|-------|-----|-------|--------------|---------------|
| **qwen2.5-coder:7b** | 8GB | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | General coding |
| **deepseek-coder:6.7b** | 8GB | ⚡⚡⚡⚡ | ⭐⭐⭐⭐ | Fast completion |
| **codellama:7b** | 8GB | ⚡⚡⚡ | ⭐⭐⭐⭐ | Documentation |
| **llama3.2:3b** | 4GB | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | Quick tasks |
| **qwen2.5-coder:14b** | 16GB | ⚡⚡ | ⭐⭐⭐⭐⭐ | Complex projects |

## Advanced Configuration

### Custom Ollama Host

If Ollama is running on a different machine or port:

1. Open Codiner Settings
2. Navigate to AI Providers
3. Configure Ollama base URL (default: `http://localhost:11434`)

### GPU Acceleration

Ollama automatically uses your GPU if available:

- **NVIDIA**: Requires CUDA drivers
- **AMD**: Requires ROCm (Linux only)
- **Apple Silicon**: Automatic Metal acceleration

### Multiple Models

You can pull multiple models and switch between them:

```bash
# Pull multiple models
ollama pull qwen2.5-coder:7b
ollama pull deepseek-coder:6.7b
ollama pull llama3.2:3b

# List installed models
ollama list
```

## Troubleshooting

### "No local models found"

**Solution**:
1. Ensure Ollama is running: `ollama serve`
2. Pull at least one model: `ollama pull qwen2.5-coder:7b`
3. Restart Codiner

### "Error loading models"

**Solution**:
1. Check if Ollama is running:
   ```bash
   curl http://localhost:11434/api/tags
   ```
2. Verify firewall isn't blocking port 11434
3. Restart Ollama service

### Slow Performance

**Solutions**:
1. Use a smaller model (`llama3.2:3b`)
2. Close other applications
3. Enable GPU acceleration
4. Increase system RAM

### Model Not Appearing in Codiner

**Solution**:
1. Verify model is pulled: `ollama list`
2. Restart Codiner
3. Click "Refresh" in the model picker

## Performance Tips

### For 8GB RAM Systems
```bash
# Use lightweight models
ollama pull llama3.2:3b
```

### For 16GB+ RAM Systems
```bash
# Use larger, more capable models
ollama pull qwen2.5-coder:14b
ollama pull deepseek-coder:33b
```

### For GPU Systems
Ollama automatically detects and uses GPU. Monitor with:
```bash
# NVIDIA
nvidia-smi

# AMD (Linux)
rocm-smi
```

## Privacy & Security

### What Stays Local?
- ✅ All AI processing
- ✅ Your code and prompts
- ✅ Model weights and data
- ✅ Conversation history

### What's Sent to Cloud?
- ❌ Nothing! (when using Ollama)

### Network Requirements
- **Internet**: Only for initial model download
- **Local Network**: Ollama runs on localhost by default
- **Offline**: Works completely offline after setup

## Recommended Workflow

### 1. Start with Qwen 2.5 Coder
```bash
ollama pull qwen2.5-coder:7b
```

### 2. Test Performance
Create a simple project and test code generation speed.

### 3. Adjust Based on Results
- **Too slow?** → Try `llama3.2:3b`
- **Need better quality?** → Try `qwen2.5-coder:14b`
- **Want faster completion?** → Try `deepseek-coder:6.7b`

## Model Update Guide

### Check for Updates
```bash
ollama list
```

### Update a Model
```bash
ollama pull qwen2.5-coder:7b
```

### Remove Old Models
```bash
ollama rm old-model-name
```

## System Requirements

### Minimum
- **RAM**: 8GB
- **Storage**: 5GB free
- **CPU**: Modern multi-core processor
- **OS**: Windows 10+, macOS 11+, Linux

### Recommended
- **RAM**: 16GB+
- **Storage**: 20GB+ free
- **GPU**: NVIDIA with 6GB+ VRAM
- **CPU**: 8+ cores

### Optimal
- **RAM**: 32GB+
- **Storage**: 50GB+ NVMe SSD
- **GPU**: NVIDIA RTX 3060+ (12GB VRAM)
- **CPU**: 12+ cores

## FAQ

**Q: Can I use Ollama and cloud models together?**  
A: Yes! Codiner supports switching between local and cloud models seamlessly.

**Q: Which model is fastest?**  
A: `llama3.2:3b` is the fastest, but `qwen2.5-coder:7b` offers the best balance.

**Q: Do I need internet after setup?**  
A: No! Ollama works completely offline after downloading models.

**Q: Can I use custom models?**  
A: Yes! Any model compatible with Ollama will appear in Codiner.

**Q: How much does this cost?**  
A: $0! Ollama and all models are completely free and open-source.

**Q: Is this as good as GPT-4?**  
A: For coding tasks, `qwen2.5-coder:14b` is competitive with GPT-4 for many use cases.

## Support

### Ollama Issues
- **Docs**: [ollama.com/docs](https://ollama.com/docs)
- **GitHub**: [github.com/ollama/ollama](https://github.com/ollama/ollama)

### Codiner Issues
- **GitHub**: [github.com/Subhan-Haider/Codiner-Software/issues](https://github.com/Subhan-Haider/Codiner-Software/issues)

## Next Steps

1. ✅ Install Ollama
2. ✅ Pull `qwen2.5-coder:7b`
3. ✅ Select model in Codiner
4. 🚀 Start building with local AI!

---

**Made with ❤️ by Subhan Haider**  
*Empowering developers with local-first AI*
