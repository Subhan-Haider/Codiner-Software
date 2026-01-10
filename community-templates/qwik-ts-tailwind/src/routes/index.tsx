import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold tracking-tight mb-4">
          Welcome to Qwik
        </h1>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Build instant-loading web applications with Qwik's resumable architecture.
          Experience the future of web development with TypeScript and Tailwind CSS.
        </p>

        {/* Counter Demo */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md mx-auto mb-8">
          <h2 class="text-2xl font-semibold mb-4">Qwik Reactivity Demo</h2>
          <div class="text-6xl font-bold text-purple-600 mb-4">{count.value}</div>
          <div class="flex gap-2 justify-center">
            <button
              onClick$={() => count.value++}
              class="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Increment
            </button>
            <button
              onClick$={() => count.value = 0}
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
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Instant Loading</h3>
            <p class="text-muted-foreground">
              Resumable applications that start instantly, regardless of size
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔷</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">TypeScript</h3>
            <p class="text-muted-foreground">
              Full TypeScript support with excellent developer experience
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
            <p class="text-muted-foreground">
              Utility-first CSS framework for rapid UI development
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">📦</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">File-Based Routing</h3>
            <p class="text-muted-foreground">
              Automatic routing based on file structure with nested routes
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Vite</h3>
            <p class="text-muted-foreground">
              Lightning-fast build tool with hot module replacement
            </p>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Optimized</h3>
            <p class="text-muted-foreground">
              Automatic code splitting and lazy loading for optimal performance
            </p>
          </div>
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
              <div class="mb-2">cp -r qwik-ts-tailwind my-qwik-app</div>
              <div class="mb-2">cd my-qwik-app</div>
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
});
