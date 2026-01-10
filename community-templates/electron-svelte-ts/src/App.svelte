<script lang="ts">
  import { onMount } from 'svelte';
  import Counter from './components/Counter.svelte';
  import FileManager from './components/FileManager.svelte';
  import SystemInfo from './components/SystemInfo.svelte';

  let activeTab = 'home';

  // Handle file operations from menu
  onMount(() => {
    if (window.electronAPI) {
      window.electronAPI.onFileOpened((filePath) => {
        console.log('File opened:', filePath);
        activeTab = 'files';
        // Trigger file loading logic here
      });

      window.electronAPI.onFileSaveRequested((filePath) => {
        console.log('File save requested:', filePath);
        // Trigger file saving logic here
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('file-opened');
        window.electronAPI.removeAllListeners('file-save-requested');
      }
    };
  });
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
  <!-- Navigation -->
  <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            ⚡ Electron + Svelte Template
          </h1>
        </div>
        <div class="flex items-center space-x-8">
          <button
            on:click={() => activeTab = 'home'}
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            class:text-blue-600={activeTab === 'home'}
            class:text-gray-500={activeTab !== 'home'}
            class:hover:text-gray-900={activeTab !== 'home'}
          >
            Home
          </button>
          <button
            on:click={() => activeTab = 'files'}
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            class:text-blue-600={activeTab === 'files'}
            class:text-gray-500={activeTab !== 'files'}
            class:hover:text-gray-900={activeTab !== 'files'}
          >
            Files
          </button>
          <button
            on:click={() => activeTab = 'system'}
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
            class:text-blue-600={activeTab === 'system'}
            class:text-gray-500={activeTab !== 'system'}
            class:hover:text-gray-900={activeTab !== 'system'}
          >
            System
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if activeTab === 'home'}
      <!-- Home Tab -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold tracking-tight mb-4">
          Welcome to Electron + Svelte
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Build cross-platform desktop applications with Electron and Svelte.
          Experience the power of native desktop development with modern web technologies.
        </p>

        <div class="flex justify-center gap-4 mb-8">
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">Electron</span>
          <span class="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">Svelte 5</span>
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">TypeScript</span>
          <span class="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium">Tailwind</span>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Native Performance</h3>
          <p class="text-muted-foreground">
            Direct OS integration with Node.js and Chromium runtime
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🧡</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Svelte 5</h3>
          <p class="text-muted-foreground">
            Latest Svelte with runes, signals, and enhanced reactivity
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🔷</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">TypeScript</h3>
          <p class="text-muted-foreground">
            Full TypeScript support with type-safe IPC communication
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">📁</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">File System</h3>
          <p class="text-muted-foreground">
            Native file system access with secure IPC communication
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🎨</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
          <p class="text-muted-foreground">
            Utility-first CSS framework for rapid UI development
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">📦</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Cross-Platform</h3>
          <p class="text-muted-foreground">
            Build for Windows, macOS, and Linux from single codebase
          </p>
        </div>
      </div>

      <!-- Counter Demo -->
      <div class="max-w-md mx-auto">
        <Counter />
      </div>

    {:else if activeTab === 'files'}
      <FileManager />
    {:else if activeTab === 'system'}
      <SystemInfo />
    {/if}
  </div>

  <!-- Footer -->
  <footer class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center text-gray-600 dark:text-gray-400">
        <p>Built with Electron, Svelte 5, TypeScript, and Tailwind CSS</p>
        <p class="mt-2">Cross-platform desktop applications made easy</p>
      </div>
    </div>
  </footer>
</main>

<style>
  :global(html) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
</style>
