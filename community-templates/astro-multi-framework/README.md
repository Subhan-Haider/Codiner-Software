# Astro Multi-Framework Template

Astro Template with multi-framework support - Use React, Vue, Svelte, SolidJS, and more in the same project!

## ✨ Features

- **🌟 Multi-Framework**: Support for React, Vue, Svelte, SolidJS, and Preact
- **🚀 Lightning Fast**: Zero JavaScript by default with selective hydration
- **📄 Content Focused**: MDX support and excellent for content-rich websites
- **🔷 TypeScript**: Full TypeScript support with automatic type generation
- **🎨 Tailwind CSS**: Utility-first CSS with Shadcn/UI components
- **🏝️ Islands Architecture**: Selective hydration for optimal performance
- **📱 Responsive**: Mobile-first design patterns
- **🎯 SEO Optimized**: Server-side rendering and meta tag optimization
- **🛠️ Developer Experience**: Hot reload, error boundaries, and debugging

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/astro-multi-framework my-astro-app
cd my-astro-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:4321 in your browser
```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
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
astro-multi-framework/
├── src/
│   ├── components/
│   │   ├── CounterReact.tsx    # React component
│   │   ├── CounterVue.vue      # Vue component
│   │   ├── CounterSvelte.svelte # Svelte component
│   │   └── CounterSolid.tsx    # SolidJS component
│   ├── layouts/
│   │   └── Layout.astro        # Main layout
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── pages/
│       └── index.astro         # Home page
├── public/                     # Static assets
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Documentation
```

## 🛠️ Configuration

### Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    vue(),
    svelte(),
    solidJs(),
    mdx(),
  ],
  output: 'static',
});
```

### Framework Integrations

Astro supports multiple frontend frameworks:

- **React**: `@astrojs/react` - JSX components with hooks
- **Vue**: `@astrojs/vue` - Single File Components with reactivity
- **Svelte**: `@astrojs/svelte` - Svelte components with stores
- **SolidJS**: `@astrojs/solid-js` - Fine-grained reactivity
- **Preact**: `@astrojs/preact` - Lightweight React alternative

## 🎨 Multi-Framework Components

### React Components

```tsx
// CounterReact.tsx
import { useState } from 'react';

export default function CounterReact() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Vue Components

```vue
<!-- CounterVue.vue -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>
```

### Svelte Components

```svelte
<!-- CounterSvelte.svelte -->
<script lang="ts">
  let count = $state(0);

  function increment() {
    count++;
  }
</script>

<div>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment</button>
</div>
```

### SolidJS Components

```tsx
// CounterSolid.tsx
import { createSignal } from 'solid-js';

export default function CounterSolid() {
  const [count, setCount] = createSignal(0);

  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## 🏝️ Islands Architecture

### Selective Hydration

Astro ships zero JavaScript by default. Use client directives for interactivity:

```astro
---
// Server-rendered content (no JavaScript)
---

<!-- Hydrate on page load -->
<Component client:load />

<!-- Hydrate on user interaction -->
<Component client:idle />

<!-- Hydrate when element enters viewport -->
<Component client:visible />

<!-- Hydrate only on specific media query -->
<Component client:media="(max-width: 768px)" />
```

### Framework Islands

Mix frameworks in the same page:

```astro
---
// Astro component (server-rendered)
---

<div class="framework-showcase">
  <ReactComponent client:load />
  <VueComponent client:load />
  <SvelteComponent client:load />
  <SolidComponent client:load />
</div>
```

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes:

```astro
<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">
    Astro Component
  </h2>
  <p class="text-gray-600">
    Styled with Tailwind CSS
  </p>
</div>
```

### Component Styles

Scoped styles in Astro components:

```astro
---
// Component logic
---

<style>
  .astro-card {
    @apply bg-white rounded-lg shadow-md p-6;
    border: 2px solid theme('colors.blue.500');
  }
</style>

<div class="astro-card">
  <h2>Astro Component</h2>
  <p>With scoped styles</p>
</div>
```

### Global Styles

```css
/* src/styles/global.css */
html {
  font-family: system-ui, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
```

## 📄 Content Collections

### MDX Support

Write content in MDX:

```mdx
---
title: My Blog Post
description: A blog post written in MDX
---

# Hello World

This is a blog post written in **MDX**!

<ReactComponent client:load />
```

### Content Schema

Define content schemas:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

### Query Content

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---

<ul>
  {posts.map(post => (
    <li>
      <a href={`/blog/${post.slug}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
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
# Publish directory: dist
```

### Static Hosting

```bash
# Build static site
npm run build

# Deploy dist/ directory to any static host
```

### SSR Deployment

For server-side rendering:

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
```

## 🔧 Development Tools

### Astro Dev Toolbar

Enhanced development experience:

```javascript
// astro.config.mjs
export default defineConfig({
  devToolbar: {
    enabled: true
  }
});
```

### VS Code Extensions

Recommended extensions:

- **Astro**: Official Astro support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions
- **ESLint**: Real-time linting

### TypeScript Support

Full TypeScript support with automatic types:

```typescript
// src/env.d.ts
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 📚 Resources

### Official Documentation

- [Astro Documentation](https://docs.astro.build/)
- [Astro Islands Guide](https://docs.astro.build/en/concepts/islands/)
- [Multi-Framework Guide](https://docs.astro.build/en/guides/framework-components/)

### Learning Resources

- [Astro Tutorial](https://docs.astro.build/en/tutorial/0-introduction/)
- [Astro Examples](https://github.com/withastro/astro/tree/main/examples)
- [Astro Themes](https://astro.build/themes/)

### Community

- [Astro Discord](https://astro.build/chat)
- [Astro GitHub](https://github.com/withastro/astro)
- [Awesome Astro](https://github.com/one-aalam/awesome-astro)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
