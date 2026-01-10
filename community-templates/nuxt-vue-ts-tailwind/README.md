# Nuxt.js Template with Vue 3, TypeScript, Tailwind

A comprehensive Nuxt 3 template featuring Vue 3, TypeScript, and Tailwind CSS for building modern, scalable web applications with server-side rendering.

## ✨ Features

- **🟢 Vue 3**: Latest Vue 3 with Composition API and `<script setup>` syntax
- **📁 File-Based Routing**: Automatic route generation from file structure
- **🔷 TypeScript**: Full TypeScript support with auto-generated types
- **🎨 Tailwind CSS**: Utility-first CSS framework with dark mode
- **⚡ Server-Side Rendering**: SSR with hydration and SEO optimization
- **🔄 Auto Imports**: Automatic import of composables and components
- **🛠️ Nuxt DevTools**: Enhanced development experience
- **📱 Responsive**: Mobile-first design patterns
- **🚀 Production Ready**: Optimized builds and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/nuxt-vue-ts-tailwind my-nuxt-app
cd my-nuxt-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📁 Project Structure

```
nuxt-vue-ts-tailwind/
├── assets/
│   └── css/
│       └── main.css           # Global styles with Tailwind
├── components/                # Auto-imported Vue components
├── lib/
│   └── utils.ts              # Utility functions
├── pages/                    # File-based routing pages
│   └── index.vue             # Home page
├── public/                   # Static assets
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation
```

## 🛠️ Configuration

### Nuxt Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  ssr: true,
})
```

### File-Based Routing

Pages are automatically generated from the `pages/` directory:

```
pages/
├── index.vue                 # Home page (/)
├── about.vue                 # About page (/about)
├── products/
│   ├── index.vue            # Products list (/products)
│   └── [id].vue             # Product detail (/products/123)
└── dashboard/
    ├── index.vue            # Dashboard (/dashboard)
    └── settings.vue         # Settings (/dashboard/settings)
```

### TypeScript Configuration

```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

## 🎨 Vue 3 Features

### Composition API with `<script setup>`

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)
const doubled = computed(() => count.value * 2)

// Methods
function increment() {
  count.value++
}

// Auto-imported composables
const { data } = await $fetch('/api/data')
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### Reactive Data

```vue
<script setup lang="ts">
const user = reactive({
  name: 'John',
  age: 30
})

const items = ref(['item 1', 'item 2'])
</script>

<template>
  <div>
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
```

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes:

```vue
<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Card Title
    </h2>
    <p class="text-gray-600 dark:text-gray-300">
      Card content with Tailwind utilities.
    </p>
  </div>
</template>
```

### Dark Mode

Built-in dark mode support:

```vue
<script setup lang="ts">
const colorMode = useColorMode()

function toggleDarkMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button @click="toggleDarkMode">
    Toggle {{ colorMode.value === 'dark' ? 'Light' : 'Dark' }} Mode
  </button>
</template>
```

### Component Styles

Scoped styles in Vue components:

```vue
<template>
  <button class="custom-button">
    Custom Styled Button
  </button>
</template>

<style scoped>
.custom-button {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded;
  transition: all 0.2s ease;
}

.custom-button:hover {
  transform: translateY(-1px);
}
</style>
```

## 📊 Data Fetching

### Server-Side Data Fetching

```vue
<script setup lang="ts">
// Server-side data fetching
const { data: posts } = await $fetch('/api/posts')

// Or using useFetch composable
const { data, pending, error } = await useFetch('/api/posts')
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div v-for="post in data" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>
```

### API Routes

Create server API routes in `server/api/`:

```typescript
// server/api/posts.get.ts
export default defineEventHandler(async (event) => {
  // Server-side logic
  return {
    posts: [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' },
    ]
  }
})
```

## 🚀 Advanced Features

### Server Components

```vue
<script setup lang="ts">
// This runs on the server
const posts = await $fetch('/api/posts')
</script>

<template>
  <!-- Server-rendered content -->
  <div>
    <h1>Server Component</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>
```

### Client Components

```vue
<script setup lang="ts">
// Client-side logic
const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <!-- Client-side interactivity -->
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### Auto Imports

Components and composables are automatically imported:

```vue
<script setup lang="ts">
// No need to import useState, useFetch, etc.
const { data } = await useFetch('/api/data')
const count = ref(0)
</script>

<template>
  <!-- No need to import components -->
  <NuxtLink to="/about">About</NuxtLink>
  <NuxtPage />
</template>
```

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
# Publish directory: .output/public
```

### Node.js Server

```bash
# Build for Node.js
npm run build

# Start production server
npm start
```

### Static Generation

```bash
# Generate static site
npm run generate

# Preview static site
npm run preview
```

## 🔧 Development Tools

### Nuxt DevTools

Enhanced development experience:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true }
})
```

### VS Code Extensions

Recommended extensions:

- **Vue Language Features (Volar)**: Vue 3 support
- **TypeScript Vue Plugin (Volar)**: TypeScript in Vue
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **Nuxt DevTools**: Enhanced debugging

### ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@nuxt/eslint-config']
}
```

## 📚 Resources

### Official Documentation

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Learning Resources

- [Nuxt 3 Tutorial](https://nuxt.com/docs/getting-started)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Nuxt 3 Examples](https://nuxt.com/docs/examples)

### Community

- [Nuxt Discord](https://nuxt.com/discord)
- [Vue Discord](https://discord.gg/vue)
- [Nuxt GitHub](https://github.com/nuxt/framework)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
