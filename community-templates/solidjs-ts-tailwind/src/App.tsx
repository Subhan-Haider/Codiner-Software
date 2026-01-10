import { Component } from 'solid-js';
import { Routes, Route, A } from '@solidjs/router';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';

const App: Component = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <A href="/" class="text-xl font-bold text-gray-900 dark:text-white">
                ⚛️ SolidJS Template
              </A>
            </div>
            <div class="flex items-center space-x-8">
              <A href="/" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </A>
              <A href="/about" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </A>
              <A href="/dashboard" class="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </A>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-1">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
        </Routes>
      </main>

      <footer class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center text-gray-600 dark:text-gray-400">
            <p>Built with SolidJS, TypeScript, and Tailwind CSS</p>
            <p class="mt-2">Fine-grained reactivity and performance</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
