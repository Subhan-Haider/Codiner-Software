<template>
  <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
    <div class="text-3xl font-bold text-green-600 mb-4">{{ count }}</div>
    <div class="flex gap-2">
      <button
        @click="increment"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Increment
      </button>
      <button
        @click="reset"
        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}

function reset() {
  count.value = 0;
}
</script>
