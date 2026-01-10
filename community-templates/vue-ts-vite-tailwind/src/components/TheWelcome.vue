<script setup lang="ts">
import { ref } from 'vue'

interface Feature {
  icon: string
  title: string
  description: string
}

const features = ref<Feature[]>([
  {
    icon: '🎯',
    title: 'Component-Based',
    description: 'Build reusable UI components with Vue\'s single-file component architecture.'
  },
  {
    icon: '⚡',
    title: 'Reactive',
    description: 'Automatic reactivity system updates the DOM when your data changes.'
  },
  {
    icon: '🔧',
    title: 'Developer Tools',
    description: 'Excellent debugging experience with Vue DevTools browser extension.'
  },
  {
    icon: '📱',
    title: 'Responsive',
    description: 'Mobile-first design with Tailwind CSS responsive utilities.'
  }
])
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-8">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Welcome to Vue 3</h3>
      <p class="text-gray-600 max-w-2xl mx-auto">
        This template includes everything you need to start building modern Vue applications.
        Explore the features below and start creating amazing user experiences.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
          </div>
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h4>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 text-center">
      <a
        href="https://vuejs.org/guide/introduction.html"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
      >
        Learn Vue 3
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Component styles */
</style>
