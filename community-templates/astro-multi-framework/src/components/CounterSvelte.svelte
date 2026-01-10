<script lang="ts">
  let count = $state(0);

  function increment() {
    count++;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
  <div class="text-3xl font-bold text-orange-600 mb-4">{count}</div>
  <div class="flex gap-2">
    <button
      onclick={increment}
      class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-200"
    >
      Increment
    </button>
    <button
      onclick={reset}
      class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
    >
      Reset
    </button>
  </div>
</div>
