import { Component, createSignal, createEffect, createMemo, For } from 'solid-js';

const Home: Component = () => {
  const [count, setCount] = createSignal(0);
  const [items, setItems] = createSignal<string[]>(['Item 1', 'Item 2']);

  // Reactive computation - automatically updates when count changes
  const doubled = createMemo(() => count() * 2);

  // Effect that runs when count changes
  createEffect(() => {
    console.log('Count changed to:', count());
  });

  const increment = () => setCount(count() + 1);
  const reset = () => setCount(0);
  const addItem = () => {
    setItems([...items(), `Item ${items().length + 1}`]);
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight mb-4">
          Welcome to SolidJS
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Experience the power of fine-grained reactivity with SolidJS.
          Build fast, reactive user interfaces with TypeScript and Tailwind CSS.
        </p>

        {/* Reactive Counter Demo */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md mx-auto mb-8">
          <h2 class="text-2xl font-semibold mb-4">Fine-Grained Reactivity Demo</h2>
          <div class="text-6xl font-bold text-blue-600 mb-4">{count()}</div>
          <div class="text-lg text-gray-600 mb-4">Doubled: {doubled()}</div>
          <div class="flex gap-2 justify-center">
            <button
              onClick={increment}
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Increment
            </button>
            <button
              onClick={reset}
              class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">✨ Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚛️</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">SolidJS</h3>
            <p class="text-muted-foreground">
              Fine-grained reactivity system that compiles to vanilla JavaScript
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔷</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">TypeScript</h3>
            <p class="text-muted-foreground">
              Full TypeScript support with excellent type inference and safety
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
            <p class="text-muted-foreground">
              Utility-first CSS framework for rapid UI development
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Vite</h3>
            <p class="text-muted-foreground">
              Lightning-fast build tool with hot module replacement
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">ESLint</h3>
            <p class="text-muted-foreground">
              Code linting and formatting for consistent, high-quality code
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Production Ready</h3>
            <p class="text-muted-foreground">
              Optimized builds and modern development workflows
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic List Demo */}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-3xl font-bold text-center mb-8">Dynamic List with SolidJS</h2>
        <div class="max-w-md mx-auto">
          <button
            onClick={addItem}
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 mb-4"
          >
            Add Item
          </button>
          <ul class="space-y-2">
            <For each={items()}>
              {(item, index) => (
                <li class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                  <span>{item}</span>
                  <span class="text-sm text-gray-500">#{index() + 1}</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      {/* Getting Started */}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 class="text-3xl font-bold text-center mb-8">🚀 Getting Started</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-4">Installation</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
              <div class="mb-2"># Copy this template</div>
              <div class="mb-2">cp -r solidjs-ts-tailwind my-solid-app</div>
              <div class="mb-2">cd my-solid-app</div>
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
              <div class="mb-2"># Preview production build</div>
              <div>npm run preview</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
