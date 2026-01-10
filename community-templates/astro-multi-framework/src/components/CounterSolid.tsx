import { createSignal } from 'solid-js';

export default function CounterSolid() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
      <div class="text-3xl font-bold text-purple-600 mb-4">{count()}</div>
      <div class="flex gap-2">
        <button
          onClick={increment}
          class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Increment
        </button>
        <button
          onClick={reset}
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
