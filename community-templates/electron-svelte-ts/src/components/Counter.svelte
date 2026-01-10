<script lang="ts">
  let count = $state(0);
  let incrementBy = $state(1);

  function increment() {
    count += incrementBy;
  }

  function decrement() {
    count -= incrementBy;
  }

  function reset() {
    count = 0;
  }

  // Reactive computation
  let doubled = $derived(count * 2);
  let isEven = $derived(count % 2 === 0);

  // Effect that runs when count changes
  $effect(() => {
    console.log('Count changed to:', count);
  });
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
  <h2 class="text-2xl font-semibold mb-6 text-center">Svelte 5 Reactive Counter</h2>

  <div class="text-center mb-6">
    <div class="text-6xl font-bold text-blue-600 mb-2">{count}</div>
    <div class="text-lg text-gray-600 mb-2">Doubled: {doubled}</div>
    <div class="text-sm px-3 py-1 rounded-full inline-block"
         class:bg-green-100={isEven}
         class:text-green-800={isEven}
         class:bg-red-100={!isEven}
         class:text-red-800={!isEven}>
      {isEven ? 'Even' : 'Odd'}
    </div>
  </div>

  <div class="flex items-center justify-center gap-4 mb-6">
    <label class="text-sm font-medium">Increment by:</label>
    <input
      type="number"
      bind:value={incrementBy}
      min="1"
      max="10"
      class="w-16 px-2 py-1 border rounded text-center"
    />
  </div>

  <div class="flex gap-2 justify-center">
    <button
      on:click={decrement}
      class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
    >
      -{incrementBy}
    </button>

    <button
      on:click={reset}
      class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
    >
      Reset
    </button>

    <button
      on:click={increment}
      class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
    >
      +{incrementBy}
    </button>
  </div>
</div>
