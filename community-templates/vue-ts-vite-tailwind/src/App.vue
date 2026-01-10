<script setup lang="ts">
// Define reactive data
import { ref } from 'vue'
import TheWelcome from './components/TheWelcome.vue'

const message = ref('Hello Vue 3 + TypeScript + Tailwind!')
const count = ref(0)

// Define methods
const increment = () => {
  count.value++
}

const reset = () => {
  count.value = 0
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">🟢 Vue 3 Template</h1>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#features" class="text-gray-500 hover:text-gray-900">Features</a>
            <a href="#components" class="text-gray-500 hover:text-gray-900">Components</a>
            <a href="#docs" class="text-gray-500 hover:text-gray-900">Docs</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
          {{ message }}
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A minimal, production-ready Vue 3 starter template with TypeScript, Vite, and Tailwind CSS.
          Start building amazing applications today!
        </p>

        <!-- Counter Demo -->
        <div class="bg-white rounded-lg shadow-md p-8 mb-8 max-w-md mx-auto">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Counter</h3>
          <div class="text-6xl font-bold text-indigo-600 mb-4">{{ count }}</div>
          <div class="flex space-x-4 justify-center">
            <button
              @click="increment"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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
      <div id="features" class="mb-16">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-8">✨ Key Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Vue 3 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🟢</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Vue 3</h4>
            <p class="text-gray-600">
              Latest Vue 3 with Composition API, providing better performance and developer experience.
            </p>
          </div>

          <!-- TypeScript -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔷</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">TypeScript</h4>
            <p class="text-gray-600">
              Full TypeScript support with strict type checking and excellent IDE support.
            </p>
          </div>

          <!-- Vite -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Vite</h4>
            <p class="text-gray-600">
              Lightning-fast build tool with instant hot module replacement during development.
            </p>
          </div>

          <!-- Tailwind CSS -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎨</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Tailwind CSS</h4>
            <p class="text-gray-600">
              Utility-first CSS framework for rapid UI development with responsive design.
            </p>
          </div>

          <!-- ESLint -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔍</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">ESLint</h4>
            <p class="text-gray-600">
              Code linting and formatting with Prettier integration for consistent code quality.
            </p>
          </div>

          <!-- Production Ready -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🚀</span>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Production Ready</h4>
            <p class="text-gray-600">
              Optimized build configuration and deployment ready setup for production use.
            </p>
          </div>
        </div>
      </div>

      <!-- Welcome Component -->
      <div id="components" class="mb-16">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-8">🧩 Component Demo</h3>
        <TheWelcome />
      </div>

      <!-- Getting Started -->
      <div id="docs" class="bg-white rounded-lg shadow-md p-8">
        <h3 class="text-3xl font-bold text-gray-900 text-center mb-8">🚀 Getting Started</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Installation</h4>
            <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div class="mb-2"># Copy this template</div>
              <div class="mb-2">cp -r vue-ts-vite-tailwind my-app</div>
              <div class="mb-2">cd my-app</div>
              <div class="mb-2"># Install dependencies</div>
              <div>npm install</div>
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-4">Development</h4>
            <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div class="mb-2"># Start development server</div>
              <div class="mb-2">npm run dev</div>
              <div class="mb-2"># Build for production</div>
              <div class="mb-2">npm run build</div>
              <div class="mb-2"># Preview production build</div>
              <div>npm run preview</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>Built with Vue 3, TypeScript, Vite, and Tailwind CSS</p>
          <p class="mt-2">Part of the Codiner Community Templates Collection</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Component-specific styles can go here */
</style>
