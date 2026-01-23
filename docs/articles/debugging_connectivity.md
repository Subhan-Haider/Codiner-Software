# Debugging AI Connectivity: A Guide to the Neural Pulse Monitor

![AI Diagnostic Metrics](neural_pulse_dashboard_preview)

Getting an "Engine Handshake Failure" can be a frustrating roadblock. Codiner's **Neural Pulse Monitor** (located in `Settings > Analytics`) is designed to turn that frustration into a quick fix. This guide explains how to use the dashboard to troubleshoot your AI cluster.

## Navigating the Dashboard

When you open the Neural Pulse Monitor, you'll see a real-time visualization of your system's health.

- **System Health Score**: A percentage based on how many of your configured "Neural Nodes" (providers) are currently online.
- **Latency Cards**: Shows the speed (in milliseconds) of your currently active model. 
  - *Green:* Optimal speed (< 500ms).
  - *Amber:* High latency (> 500ms).
- **Module Capabilities**: A list of tags (Vision, Tools, AI Agents) indicating what your current configuration supports.

## Common Error Scenarios

### 1. "Quota or Spend Limit Exceeded"
**The Cause:** You have run out of credits with your provider (e.g., OpenAI or OpenRouter) or you have hit a free-tier usage cap.
**The Fix:** 
- Check your billing dashboard at the provider's website.
- Switch to a different provider in Codiner's `Settings > Models`.
- If using OpenRouter, try selecting a model with the `:free` suffix.

### 2. "Connection Failed: Server Unreachable"
**The Cause:** Most common with local models (Ollama/LM Studio). The software might be closed, or a firewall is blocking the port.
**The Fix:**
- For **Ollama**: Open your terminal and run `ollama serve`. Ensure it's listening on port `11434`.
- For **LM Studio**: Check that the "Local Server" tab is active and the server is "Started". Default port is usually `1234`.

### 3. "Invalid API Key"
**The Cause:** There is a typo in your key, or it has been revoked.
**The Fix:** 
- Go to `Settings > Models`.
- Delete the existing key and paste a fresh one from your provider's dashboard.
- Tip: Always ensure there are no trailing spaces when pasting keys.

## Using the "Sync Cluster" Feature

The **Sync Cluster** button in the top right of the Analytics panel performs a "Cold Boot" of all your AI integrations. It:
1. Clears any cached connection errors.
2. Re-verifies every configured API key.
3. Automatically updates your model capability tags.

If you've just updated your settings and things don't look right, a quick **Sync Cluster** is often all you need.

## Pro Tip: Individual Node Testing
Don't want to change your whole setup just to test one model? In the **Node Telemetry** list, you can click the small **Refresh** icon next to any specific provider to test its connection independently. This is the fastest way to verify a new API key without interrupting your current workflow.
