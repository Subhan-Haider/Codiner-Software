import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">
                ⚡ Qwik Template
              </h1>
            </div>
            <div class="flex items-center space-x-8">
              <a href="/" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="/about" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="/dashboard" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-1">
        <Slot />
      </main>

      <footer class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center text-gray-600 dark:text-gray-400">
            <p>Built with Qwik, TypeScript, and Tailwind CSS</p>
            <p class="mt-2">Resumable and instant-loading applications</p>
          </div>
        </div>
      </footer>
    </div>
  );
});
