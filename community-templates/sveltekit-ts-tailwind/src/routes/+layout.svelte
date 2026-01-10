<script lang="ts">
  import "../app.css";
</script>

<main class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
  <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">🧡 SvelteKit Template</h1>
        </div>
        <div class="flex items-center space-x-8">
          <a href="/" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
          <a href="/about" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
          <a href="/dashboard" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</a>
        </div>
      </div>
    </div>
  </nav>

  <slot />
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
