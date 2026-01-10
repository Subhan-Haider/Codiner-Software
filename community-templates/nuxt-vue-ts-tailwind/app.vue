<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <!-- Navigation -->
    <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900 dark:text-white">
              🟢 Nuxt 3 Template
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </NuxtLink>
            <NuxtLink to="/dashboard" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600 dark:text-gray-400">
          <p>Built with Nuxt 3, Vue 3, TypeScript, and Tailwind CSS</p>
          <p class="mt-2">File-based routing and auto-imports included</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Nuxt 3 Template',
  meta: [
    { name: 'description', content: 'Nuxt.js Template with Vue 3, TypeScript, Tailwind' }
  ]
})
</script>
