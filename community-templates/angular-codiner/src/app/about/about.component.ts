import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="px-4 py-6 sm:px-0">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          About This Angular Template
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn more about this Angular template designed specifically for development in Codiner.
        </p>
      </div>

      <!-- Content Sections -->
      <div class="space-y-8">
        <!-- What is Angular -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">🅰️ What is Angular?</h2>
          <p class="text-gray-600 mb-4">
            Angular is a platform and framework for building single-page client applications using HTML and TypeScript.
            It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul class="text-gray-600 space-y-1">
                <li>• Declarative UI with HTML templates</li>
                <li>• Component-based architecture</li>
                <li>• Dependency injection</li>
                <li>• Reactive programming with RxJS</li>
                <li>• TypeScript-first development</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Modern Concepts</h3>
              <ul class="text-gray-600 space-y-1">
                <li>• Standalone components</li>
                <li>• Signals for reactivity</li>
                <li>• Control flow syntax</li>
                <li>• Functional guards</li>
                <li>• Improved developer experience</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Project Structure -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">📁 Project Structure</h2>
          <div class="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <div class="mb-2">angular-codiner/</div>
            <div class="ml-4 mb-1">├── src/</div>
            <div class="ml-8 mb-1">│   ├── app/</div>
            <div class="ml-12 mb-1">│   │   ├── home/</div>
            <div class="ml-12 mb-1">│   │   ├── about/</div>
            <div class="ml-12 mb-1">│   │   ├── app.component.ts</div>
            <div class="ml-12 mb-1">│   │   ├── app.config.ts</div>
            <div class="ml-12 mb-1">│   │   └── app.routes.ts</div>
            <div class="ml-8 mb-1">│   ├── assets/</div>
            <div class="ml-8 mb-1">│   ├── index.html</div>
            <div class="ml-8 mb-1">│   ├── main.ts</div>
            <div class="ml-8 mb-1">│   └── styles.css</div>
            <div class="ml-4 mb-1">├── angular.json</div>
            <div class="ml-4 mb-1">├── package.json</div>
            <div class="ml-4 mb-1">└── tsconfig.json</div>
          </div>
        </div>

        <!-- Technologies Used -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">🛠️ Technologies Used</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Angular 17</h3>
              <p class="text-sm text-gray-600">Latest Angular framework with modern features</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">TypeScript 5.2</h3>
              <p class="text-sm text-gray-600">Type-safe JavaScript with latest features</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">RxJS</h3>
              <p class="text-sm text-gray-600">Reactive programming library</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">ESLint</h3>
              <p class="text-sm text-gray-600">Code linting and formatting</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Jasmine & Karma</h3>
              <p class="text-sm text-gray-600">Testing framework and test runner</p>
            </div>
            <div class="border border-gray-200 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Tailwind CSS</h3>
              <p class="text-sm text-gray-600">Utility-first CSS framework</p>
            </div>
          </div>
        </div>

        <!-- Development Tips -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">💡 Development Tips</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Standalone Components</h3>
              <p class="text-gray-600 mb-3">
                Use standalone components for better tree-shaking and simpler architecture.
              </p>
              <div class="bg-gray-50 rounded p-3 font-mono text-sm">
                @Component({{ '{' }}<br>
                &nbsp;&nbsp;standalone: true,<br>
                &nbsp;&nbsp;imports: [CommonModule],<br>
                &nbsp;&nbsp;// ...<br>
                })
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Signals</h3>
              <p class="text-gray-600 mb-3">
                Use signals for reactive state management and better performance.
              </p>
              <div class="bg-gray-50 rounded p-3 font-mono text-sm">
                const count = signal(0);<br>
                count.update(val => val + 1);
              </div>
            </div>
          </div>
        </div>

        <!-- Resources -->
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">📚 Resources</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://angular.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <span class="text-2xl mr-3">📖</span>
              <div>
                <div class="font-semibold text-gray-900">Angular Documentation</div>
                <div class="text-sm text-gray-600">Official Angular docs and guides</div>
              </div>
            </a>
            <a
              href="https://angular.io/guide/standalone-components"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <span class="text-2xl mr-3">🧩</span>
              <div>
                <div class="font-semibold text-gray-900">Standalone Components</div>
                <div class="text-sm text-gray-600">Guide to modern component architecture</div>
              </div>
            </a>
            <a
              href="https://angular.io/guide/signals"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <span class="text-2xl mr-3">⚡</span>
              <div>
                <div class="font-semibold text-gray-900">Signals</div>
                <div class="text-sm text-gray-600">Reactive signals documentation</div>
              </div>
            </a>
            <a
              href="https://www.typescriptlang.org/docs/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              <span class="text-2xl mr-3">🔷</span>
              <div>
                <div class="font-semibold text-gray-900">TypeScript Handbook</div>
                <div class="text-sm text-gray-600">Comprehensive TypeScript guide</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent {}
