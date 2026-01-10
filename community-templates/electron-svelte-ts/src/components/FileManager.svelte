<script lang="ts">
  import { onMount } from 'svelte';

  let filePath = $state('');
  let fileContent = $state('');
  let savePath = $state('');
  let saveContent = $state('Hello from Electron + Svelte!');
  let isLoading = $state(false);
  let message = $state('');

  async function readFile() {
    if (!filePath.trim()) {
      message = 'Please enter a file path';
      return;
    }

    isLoading = true;
    try {
      const result = await window.electronAPI.readFile(filePath);
      if (result.success) {
        fileContent = result.data || '';
        message = 'File read successfully!';
      } else {
        message = `Error: ${result.error}`;
      }
    } catch (error) {
      message = `Error: ${error}`;
    } finally {
      isLoading = false;
    }
  }

  async function writeFile() {
    if (!savePath.trim()) {
      message = 'Please enter a save path';
      return;
    }

    isLoading = true;
    try {
      const result = await window.electronAPI.writeFile(savePath, saveContent);
      if (result.success) {
        message = 'File saved successfully!';
      } else {
        message = `Error: ${result.error}`;
      }
    } catch (error) {
      message = `Error: ${error}`;
    } finally {
      isLoading = false;
    }
  }

  async function selectDirectory() {
    try {
      const result = await window.electronAPI.selectDirectory();
      if (result.success && result.path) {
        filePath = result.path;
        message = 'Directory selected!';
      }
    } catch (error) {
      message = `Error selecting directory: ${error}`;
    }
  }

  // Handle menu file open events
  onMount(() => {
    if (window.electronAPI) {
      window.electronAPI.onFileOpened(async (openedFilePath) => {
        filePath = openedFilePath;
        // Auto-read the file
        const result = await window.electronAPI.readFile(openedFilePath);
        if (result.success) {
          fileContent = result.data || '';
          message = 'File opened from menu!';
        } else {
          message = `Error opening file: ${result.error}`;
        }
      });
    }
  });
</script>

<div class="max-w-4xl mx-auto">
  <h2 class="text-3xl font-bold mb-8">File System Operations</h2>

  {#if message}
    <div class="mb-6 p-4 rounded-lg"
         class:bg-green-50={message.includes('successfully')}
         class:text-green-800={message.includes('successfully')}
         class:bg-red-50={!message.includes('successfully')}
         class:text-red-800={!message.includes('successfully')}>
      {message}
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Read File Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-4">📖 Read File</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">File Path</label>
          <div class="flex gap-2">
            <input
              bind:value={filePath}
              placeholder="Enter file path or select directory"
              class="flex-1 px-3 py-2 border rounded-lg"
            />
            <button
              on:click={selectDirectory}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse
            </button>
          </div>
        </div>

        <button
          on:click={readFile}
          disabled={isLoading}
          class="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? 'Reading...' : 'Read File'}
        </button>

        {#if fileContent}
          <div>
            <label class="block text-sm font-medium mb-2">File Content</label>
            <textarea
              bind:value={fileContent}
              readonly
              rows="8"
              class="w-full px-3 py-2 border rounded-lg bg-gray-50 font-mono text-sm"
              placeholder="File content will appear here..."
            ></textarea>
          </div>
        {/if}
      </div>
    </div>

    <!-- Write File Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-4">✏️ Write File</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Save Path</label>
          <input
            bind:value={savePath}
            placeholder="Enter file path to save"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Content</label>
          <textarea
            bind:value={saveContent}
            rows="6"
            class="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            placeholder="Enter content to save..."
          ></textarea>
        </div>

        <button
          on:click={writeFile}
          disabled={isLoading}
          class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? 'Saving...' : 'Save File'}
        </button>
      </div>
    </div>
  </div>

  <!-- Instructions -->
  <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-3">💡 Instructions</h3>
    <ul class="text-sm space-y-2 text-gray-700 dark:text-gray-300">
      <li>• Use the <strong>File → Open File</strong> menu to load files</li>
      <li>• Use the <strong>File → Save File</strong> menu to save files</li>
      <li>• Click <strong>Browse</strong> to select directories</li>
      <li>• File operations are performed securely through Electron's IPC</li>
    </ul>
  </div>
</div>
