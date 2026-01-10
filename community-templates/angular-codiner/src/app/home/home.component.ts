import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-4 py-6 sm:px-0">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
          Welcome to Angular Template
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          A modern Angular application built with TypeScript, optimized for development in Codiner.
          Experience the power of Angular's component architecture and reactive programming.
        </p>

        <!-- Counter Demo -->
        <div class="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Angular Signals Demo</h2>
          <div class="text-6xl font-bold text-indigo-600 mb-4">{{ count() }}</div>
          <div class="flex space-x-4 justify-center">
            <button
              (click)="increment()"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Increment
            </button>
            <button
              (click)="decrement()"
              class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Decrement
            </button>
            <button
              (click)="reset()"
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">🚀 Key Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🅰️</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Angular 17</h3>
            <p class="text-gray-600">
              Latest Angular with standalone components, signals, and modern TypeScript support.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔷</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">TypeScript</h3>
            <p class="text-gray-600">
              Full TypeScript integration with strict type checking and excellent IDE support.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">📦</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Standalone Components</h3>
            <p class="text-gray-600">
              Modern component architecture without NgModules for better tree-shaking.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Signals</h3>
            <p class="text-gray-600">
              Reactive signals for fine-grained change detection and better performance.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🔍</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">ESLint</h3>
            <p class="text-gray-600">
              Code linting with Angular ESLint rules for consistent and high-quality code.
            </p>
          </div>

          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Codiner Optimized</h3>
            <p class="text-gray-600">
              Specifically configured for development in the Codiner code editor environment.
            </p>
          </div>
        </div>
      </div>

      <!-- Getting Started -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">🚀 Getting Started</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Installation</h3>
            <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div class="mb-2"># Copy this template</div>
              <div class="mb-2">cp -r angular-codiner my-app</div>
              <div class="mb-2">cd my-app</div>
              <div class="mb-2"># Install dependencies</div>
              <div>npm install</div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Development</h3>
            <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div class="mb-2"># Start development server</div>
              <div class="mb-2">npm start</div>
              <div class="mb-2"># Build for production</div>
              <div class="mb-2">npm run build</div>
              <div class="mb-2"># Run tests</div>
              <div>npm test</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
