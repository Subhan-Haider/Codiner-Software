<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero Section -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold tracking-tight mb-4">
        Welcome to Nuxt 3
      </h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
        Experience the power of Nuxt 3 with Vue 3, TypeScript, and Tailwind CSS.
        Build modern web applications with server-side rendering, file-based routing,
        and auto-imports.
      </p>

      <!-- Counter Demo -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md mx-auto mb-8">
        <h2 class="text-2xl font-semibold mb-4">Vue 3 Reactivity Demo</h2>
        <div class="text-6xl font-bold text-green-600 mb-4">{{ count }}</div>
        <div class="flex space-x-4 justify-center">
          <button
            @click="increment"
            class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Increment
          </button>
          <button
            @click="reset"
            class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-center mb-8">✨ Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🟢</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Vue 3</h3>
          <p class="text-muted-foreground">
            Latest Vue 3 with Composition API, script setup, and enhanced performance
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">📁</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">File-Based Routing</h3>
          <p class="text-muted-foreground">
            Automatic route generation from file structure with nested routes support
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🔷</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">TypeScript</h3>
          <p class="text-muted-foreground">
            Full TypeScript support with auto-generated types and IntelliSense
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🎨</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
          <p class="text-muted-foreground">
            Utility-first CSS framework with dark mode and responsive design
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">SSR & SSG</h3>
          <p class="text-muted-foreground">
            Server-side rendering, static generation, and hybrid rendering modes
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl">🔄</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Auto Imports</h3>
          <p class="text-muted-foreground">
            Automatic import of composables, components, and utilities
          </p>
        </div>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-center mb-8">🚀 Getting Started</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">Installation</h3>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
            <div class="mb-2"># Copy this template</div>
            <div class="mb-2">cp -r nuxt-vue-ts-tailwind my-nuxt-app</div>
            <div class="mb-2">cd my-nuxt-app</div>
            <div class="mb-2"># Install dependencies</div>
            <div>npm install</div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">Development</h3>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
            <div class="mb-2"># Start development server</div>
            <div class="mb-2">npm run dev</div>
            <div class="mb-2"># Build for production</div>
            <div class="mb-2">npm run build</div>
            <div class="mb-2"># Generate static site</div>
            <div>npm run generate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Reactive state with Vue 3 Composition API
const count = ref(0)

function increment() {
  count.value++
}

function reset() {
  count.value = 0
}

// SEO Meta tags
useHead({
  title: 'Home - Nuxt 3 Template',
  meta: [
    { name: 'description', content: 'Home page of the Nuxt 3 template with Vue 3, TypeScript, and Tailwind CSS' }
  ]
})
</script>
