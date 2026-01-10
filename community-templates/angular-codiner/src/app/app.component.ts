import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900">🅰️ Angular Template</h1>
            </div>
            <div class="flex items-center space-x-8">
              <a routerLink="/home" routerLinkActive="text-indigo-600" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a routerLink="/about" routerLinkActive="text-indigo-600" class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-codiner-template';
}
