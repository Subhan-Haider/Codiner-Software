# Angular Template for Codiner

Angular template for Codiner - A modern Angular application with TypeScript, standalone components, and optimized for development in the Codiner code editor.

## ✨ Features

- **🅰️ Angular 17**: Latest Angular with modern features
- **🔷 TypeScript**: Full TypeScript support with strict configuration
- **🧩 Standalone Components**: Modern component architecture
- **⚡ Signals**: Reactive signals for better performance
- **📱 Responsive**: Tailwind CSS for styling
- **🔍 ESLint**: Code linting with Angular ESLint rules
- **🧪 Testing**: Jasmine and Karma for unit testing
- **🎯 Codiner Optimized**: Specifically configured for Codiner editor

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm (comes with Node.js)

### Installation

```bash
# Copy this template
cp -r community-templates/angular-codiner my-angular-app
cd my-angular-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm start

# Open http://localhost:4200 in your browser
```

### Build for Production

```bash
# Build the application
npm run build

# The build artifacts will be stored in the `dist/` directory
```

### Testing

```bash
# Run unit tests
npm test

# Run linting
npm run lint
```

## 📁 Project Structure

```
angular-codiner/
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   └── home.component.ts
│   │   ├── about/
│   │   │   └── about.component.ts
│   │   ├── app.component.ts       # Root component
│   │   ├── app.config.ts          # Application configuration
│   │   └── app.routes.ts          # Route definitions
│   ├── assets/                    # Static assets
│   ├── index.html                 # Main HTML file
│   ├── main.ts                    # Application bootstrap
│   ├── styles.css                 # Global styles
│   └── test.ts                    # Test configuration
├── angular.json                   # Angular CLI configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Documentation
```

## 🛠️ Configuration

### Angular Configuration

The `angular.json` file contains the Angular CLI configuration:

```json
{
  "projects": {
    "angular-codiner-template": {
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": { ... },
        "serve": { ... },
        "test": { ... },
        "lint": { ... }
      }
    }
  }
}
```

### TypeScript Configuration

Strict TypeScript configuration for better code quality:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

## 🎨 Styling

This template uses Tailwind CSS loaded via CDN for rapid UI development. You can customize styles in:

- `src/styles.css` - Global styles
- Component `styles` arrays - Component-specific styles

### Example Styling

```typescript
@Component({
  selector: 'app-example',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-900">Example Component</h2>
    </div>
  `,
  styles: [`
    .custom-class {
      /* Component-specific styles */
    }
  `]
})
```

## 🧩 Components

### Standalone Components

This template uses Angular's modern standalone components:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Example component works!</p>`
})
export class ExampleComponent {}
```

### Signals

Use Angular signals for reactive state management:

```typescript
import { Component, signal } from '@angular/core';

@Component({ ... })
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(value => value + 1);
  }

  reset() {
    this.count.set(0);
  }
}
```

## 🧪 Testing

### Unit Tests

Run tests with Karma and Jasmine:

```bash
npm test
```

### Writing Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

## 🚀 Deployment

### Build Optimization

The production build includes:

- **AOT Compilation**: Ahead-of-time compilation for better performance
- **Tree Shaking**: Removes unused code
- **Minification**: Reduces bundle size
- **Code Splitting**: Optimizes loading

### Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Build command: npm run build
# Publish directory: dist/angular-codiner-template
```

#### Manual Deployment

```bash
# Build for production
npm run build

# Deploy the dist/angular-codiner-template/ directory
```

## 🔧 Development Tips

### Code Generation

Use Angular CLI to generate components, services, etc.:

```bash
# Generate a new component
ng generate component my-component

# Generate a service
ng generate service my-service

# Generate a guard
ng generate guard my-guard
```

### Debugging

- Use Angular DevTools browser extension
- Enable source maps in development
- Use `ng build --configuration development` for debugging

### Performance

- Use `OnPush` change detection strategy for better performance
- Implement lazy loading for routes
- Use Angular's built-in performance tools

## 📚 Resources

### Official Documentation

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI](https://angular.io/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Learning Resources

- [Angular University](https://angular-university.io/)
- [Angular in Depth](https://indepth.dev/angular/)
- [Official Angular Blog](https://blog.angular.io/)

### Community

- [Angular Discord](https://discord.gg/angular)
- [Angular Subreddit](https://reddit.com/r/Angular2)
- [Angular GitHub](https://github.com/angular/angular)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the MIT License.
