# Vue 3 + TypeScript + Vite + Tailwind

A minimal, production-ready Vue 3 starter template with TypeScript, Vite, and Tailwind CSS v3.

## ✨ Features

- **🟢 Vue 3**: Latest Vue 3 with Composition API
- **🔷 TypeScript**: Full TypeScript support
- **⚡ Vite**: Lightning-fast build tool
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🔍 ESLint**: Code linting with Prettier
- **📱 Responsive**: Mobile-first design
- **🚀 Production Ready**: Optimized for deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r vue-ts-vite-tailwind my-vue-app
cd my-vue-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
vue-ts-vite-tailwind/
├── src/
│   ├── components/     # Vue components
│   │   └── TheWelcome.vue
│   ├── views/         # Page components (for routing)
│   ├── App.vue        # Root component
│   ├── main.ts        # Application entry point
│   └── style.css      # Global styles with Tailwind
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── README.md          # Documentation
```

## 🛠️ Configuration

### Vue 3 + TypeScript

This template uses Vue 3 with the Composition API and TypeScript for better type safety and developer experience.

```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('Hello Vue 3!')
const count = ref<number>(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>
```

### Vite Configuration

Vite provides fast development and optimized production builds.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

### Tailwind CSS

Utility-first CSS framework for rapid UI development.

```vue
<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900">Card Title</h2>
      <p class="text-gray-600 mt-2">Card description with Tailwind utilities.</p>
      <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Action Button
      </button>
    </div>
  </div>
</template>
```

## 🎨 Styling

### Global Styles

Styles are configured in `src/style.css` with Tailwind directives and custom styles.

### Component Styles

Add scoped styles to Vue components:

```vue
<style scoped>
.my-component {
  /* Component-specific styles */
}
</style>
```

### Tailwind Customization

Customize Tailwind in `tailwind.config.js`:

```javascript
export default {
  content: ["./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: '#your-color'
      }
    }
  },
  plugins: []
}
```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy the dist/ folder to your hosting service
```

## 🔧 Development Tools

### Vue DevTools

Install the Vue DevTools browser extension for debugging Vue applications.

### TypeScript Support

Full TypeScript support with IntelliSense, type checking, and refactoring.

### Hot Module Replacement

Vite provides instant hot module replacement during development.

## 📚 Recommended Extensions

### VS Code Extensions

- **Volar** - Vue 3 language support
- **TypeScript Vue Plugin (Volar)** - TypeScript support for Vue
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **ESLint** - Linting support
- **Prettier** - Code formatting

## 🧩 Adding Vue Router

To add routing to your application:

```bash
npm install vue-router@4
```

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
```

## 📊 Adding State Management

For complex applications, consider Pinia for state management:

```bash
npm install pinia
```

```typescript
// src/stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

## 🧪 Testing

Add testing framework:

```bash
# Vitest for unit testing
npm install -D vitest @vue/test-utils jsdom

# Playwright for E2E testing
npm install -D @playwright/test
```

## 📖 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the MIT License.
