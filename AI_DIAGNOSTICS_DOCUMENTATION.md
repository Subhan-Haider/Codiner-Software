# AI Diagnostics & Connectivity Suite

The **AI Diagnostics Suite** is a professional-grade set of tools designed to ensure the reliability, performance, and transparency of the AI models integrated into Codiner. This suite provides real-time verification of neural handshakes, latency monitoring, and capability detection.

## 🚀 Key Features

### 1. Real-Time Connectivity Handshake
- **Automatic Sync**: The system performs a "handshake" automatically when model configurations are updated or after a period of inactivity (5 minutes).
- **Manual Execution**: Users can manually trigger a full system test via the **Execute AI Test** button in the Analytics panel.
- **Node Discovery**: Each configured provider (OpenAI, Anthropic, Ollama, etc.) can be tested individually to verify API keys and network status.

### 2. Performance Metrics (Telemetry)
- **Neural Latency (Ping)**: Tracks the round-trip time of the AI response in milliseconds.
- **Health Indicators**: 
  - **Optimal**: < 500ms (Low latency, high speed).
  - **Warning**: > 500ms (Network congestion or rate limiting).
- **System Load Integration**: Correlates AI performance with local CPU and Memory usage.

### 3. Capability Mapping
- **Module Tags**: Successfully verified models report their specific capabilities, including:
  - `Text Generation`: Core chat functionality.
  - `Vision`: Ability to process image inputs (Multimodal).
  - `Tools`: Function-calling and agentic capabilities.
  - `Streaming`: Real-time token output support.

### 4. Advanced Error Autopsy
- **Proactive Banners**: When a connection fails, a prominent alert banner provides a human-readable diagnosis.
- **Smart Parsing**: Errors like "402 Payment Required" are translated to "Your API is not working: Quota or spend limit exceeded."
- **System vs. Provider**: Differentiates between local infrastructure issues and remote API failures.

## 🛠 Technical Architecture

### IPC Layer (`ai:test-connectivity`)
- `ai_test_handler.ts`: Coordinates the communication between the renderer and the AI provider.
- `IpcClient.aiTestConnectivity(providerId?)`: The frontend hook into the diagnostic engine.

### Data Layer
- `UserSettings.lastAiTestResult`: Persists the last successful/failed test outcome, including timestamp and latency, for cross-session health monitoring.
- `errorMessage.ts`: A centralized utility for parsing complex AI SDK errors into user-friendly instructions.

### UI Layer (`NeuralSystemDiagnostics.tsx`)
- **Diagnostic Cards**: Modular components for visualizing Load, Memory, Security, and Pulse.
- **Telemetry Feed**: A live list of all AI nodes with their current operational status and individual refresh controls.

## 🔧 Troubleshooting

If you see the **"Your API is not working"** banner:
1. **Check Networking**: Ensure you have an active internet connection.
2. **Key Verification**: Go to `Settings > Models` and verify your API keys are correct.
3. **Local Models**: If using Ollama or LM Studio, ensure the service is running locally on the correct port (11434 for Ollama, 1234 for LM Studio).
4. **Quota**: Verify you have remaining balance/quota with your provider (e.g., OpenRouter, OpenAI).

---
*Architecting the future of neural connectivity.*
