import { useState } from 'react';

export default function CounterReact() {
  const [count, setCount] = useState(0);

  return (
    <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
      <div class="text-3xl font-bold text-blue-600 mb-4">{count}</div>
      <div class="flex gap-2">
        <button
          onClick={() => setCount(count + 1)}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
