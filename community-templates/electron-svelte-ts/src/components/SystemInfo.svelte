<script lang="ts">
  import { onMount } from 'svelte';

  let systemInfo = $state<{
    platform: string;
    arch: string;
    version: string;
    electron: string;
  } | null>(null);
  let isLoading = $state(true);

  onMount(async () => {
    try {
      systemInfo = await window.electronAPI.getSystemInfo();
    } catch (error) {
      console.error('Failed to get system info:', error);
    } finally {
      isLoading = false;
    }
  });

  function getPlatformIcon(platform: string) {
    switch (platform) {
      case 'darwin': return '🍎';
      case 'win32': return '🪟';
      case 'linux': return '🐧';
      default: return '💻';
    }
  }

  function getPlatformName(platform: string) {
    switch (platform) {
      case 'darwin': return 'macOS';
      case 'win32': return 'Windows';
      case 'linux': return 'Linux';
      default: return platform;
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <h2 class="text-3xl font-bold mb-8">System Information</h2>

  {#if isLoading}
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading system information...</p>
      </div>
    </div>
  {:else if systemInfo}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Platform Info -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <span class="text-2xl">{getPlatformIcon(systemInfo.platform)}</span>
          Platform
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">OS:</span>
            <span class="font-medium">{getPlatformName(systemInfo.platform)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Architecture:</span>
            <span class="font-medium">{systemInfo.arch}</span>
          </div>
        </div>
      </div>

      <!-- Application Info -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <span class="text-2xl">⚙️</span>
          Application
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Version:</span>
            <span class="font-medium">{systemInfo.version}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Electron:</span>
            <span class="font-medium">{systemInfo.electron}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Environment Details -->
    <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-4">Environment Details</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl mb-2">🔧</div>
          <div class="text-sm font-medium">Node.js</div>
          <div class="text-xs text-gray-600">Runtime</div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl mb-2">⚛️</div>
          <div class="text-sm font-medium">Chromium</div>
          <div class="text-xs text-gray-600">Browser Engine</div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div class="text-2xl mb-2">🧡</div>
          <div class="text-sm font-medium">Svelte</div>
          <div class="text-xs text-gray-600">UI Framework</div>
        </div>
      </div>
    </div>

    <!-- Capabilities -->
    <div class="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">🚀 Capabilities</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">File System Access</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">Native Menus</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">System Dialogs</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">IPC Communication</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">Cross-Platform</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-green-600">✓</span>
          <span class="text-sm">Auto Updates</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
      <p class="text-red-800 dark:text-red-200">
        Failed to load system information. This feature requires Electron.
      </p>
    </div>
  {/if}
</div>
