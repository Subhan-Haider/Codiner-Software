# SvelteKit Template with Svelte 5, TypeScript, Tailwind

A modern SvelteKit template featuring Svelte 5 with runes, TypeScript, and Tailwind CSS for building fast, scalable web applications.

## ✨ Features

- **🧡 Svelte 5**: Latest Svelte with runes and enhanced reactivity
- **⚡ SvelteKit 2.0**: File-based routing with SSR and SPA capabilities
- **🔷 TypeScript**: Full TypeScript support with type checking
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🔍 ESLint + Prettier**: Code linting and formatting
- **📱 Responsive**: Mobile-first design patterns
- **🚀 Production Ready**: Optimized builds and deployment
- **🛠️ Developer Experience**: Hot reload, error boundaries, and debugging

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/sveltekit-ts-tailwind my-svelte-app
cd my-svelte-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
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
# Run linting and formatting checks
npm run lint

# Check TypeScript types
npm run check

# Watch mode for type checking
npm run check:watch
```

## 📁 Project Structure

```
sveltekit-ts-tailwind/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte     # Root layout
│   │   └── +page.svelte       # Home page
│   ├── lib/                   # Utilities and components
│   └── app.css               # Global styles
├── static/                   # Static assets
├── svelte.config.js          # SvelteKit configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## 🛠️ Configuration

### SvelteKit Configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
```

### File-Based Routing

SvelteKit uses file-based routing:

```
src/routes/
├── +layout.svelte           # Root layout
├── +page.svelte            # Home page (/)
├── about/
│   └── +page.svelte        # About page (/about)
├── dashboard/
│   ├── +layout.svelte      # Dashboard layout
│   └── +page.svelte        # Dashboard page (/dashboard)
└── [slug]/
    └── +page.svelte        # Dynamic routes (/posts/123)
```

### TypeScript Configuration

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

## 🎨 Svelte 5 Features

### Runes and Signals

Svelte 5 introduces runes for reactive state management:

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  function increment() {
    count += 1;
  }

  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<button onclick={increment}>
  Count: {count}, Doubled: {doubled}
</button>
```

### Enhanced Reactivity

Svelte 5 provides more powerful reactivity:

```svelte
<script lang="ts">
  let items = $state(['item 1', 'item 2']);
  let selectedIndex = $state(0);

  function addItem() {
    items.push(`item ${items.length + 1}`);
  }

  function selectItem(index: number) {
    selectedIndex = index;
  }

  $: selectedItem = $derived(items[selectedIndex]);
</script>

<ul>
  {#each items as item, index}
    <li
      class:selected={index === selectedIndex}
      onclick={() => selectItem(index)}
    >
      {item}
    </li>
  {/each}
</ul>

<button onclick={addItem}>Add Item</button>
<p>Selected: {selectedItem}</p>
```

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes for styling:

```svelte
<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">
    Card Title
  </h2>
  <p class="text-gray-600">
    Card content with Tailwind utilities.
  </p>
</div>
```

### Component Styles

Add scoped styles to components:

```svelte
<style>
  .custom-button {
    @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded;
    transition: all 0.2s ease;
  }

  .custom-button:hover {
    transform: translateY(-1px);
  }
</style>

<button class="custom-button">
  Custom Styled Button
</button>
```

### Global Styles

Global styles are defined in `src/app.css`:

```css
/* Global styles */
body {
  font-family: system-ui, sans-serif;
}

h1, h2, h3 {
  @apply text-gray-900 dark:text-white;
}
```

## 📊 Data Loading

### Load Functions

Use load functions for server-side data fetching:

```typescript
// src/routes/blog/+page.ts
export async function load({ fetch }) {
  const response = await fetch('/api/posts');
  const posts = await response.json();

  return {
    posts
  };
}
```

### Page Data

Access loaded data in components:

```svelte
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

{#each data.posts as post}
  <article>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </article>
{/each}
```

### API Routes

Create API routes in the `src/routes/api/` directory:

```typescript
// src/routes/api/posts/+server.ts
import { json } from '@sveltejs/kit';

export async function GET() {
  const posts = await getPosts();

  return json(posts);
}

export async function POST({ request }) {
  const data = await request.json();
  const newPost = await createPost(data);

  return json(newPost, { status: 201 });
}
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
# Publish directory: build
```

### Manual Deployment

```bash
# Build for production
npm run build

# The build output is in the .svelte-kit/output/ directory
```

### Adapters

SvelteKit supports different deployment targets:

```javascript
// For Node.js servers
import adapter from '@sveltejs/adapter-node';

// For static sites
import adapter from '@sveltejs/adapter-static';

// For Vercel
import adapter from '@sveltejs/adapter-vercel';
```

## 🔧 Development Tools

### VS Code Extensions

Recommended extensions for SvelteKit development:

- **Svelte for VS Code**: Official Svelte support
- **SvelteKit Snippets**: Code snippets for SvelteKit
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **TypeScript Importer**: Auto import suggestions

### TypeScript Support

Full TypeScript support with generated types:

```typescript
// Use generated types for better DX
import type { PageData, ActionData } from './$types';

export let data: PageData;
export let form: ActionData;
```

### Error Handling

Handle errors gracefully with error boundaries:

```svelte
<!-- src/routes/+error.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
```

## 📚 Resources

### Official Documentation

- [Svelte Documentation](https://svelte.dev/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Learning Resources

- [Svelte Tutorial](https://svelte.dev/tutorial)
- [SvelteKit Tutorial](https://learn.svelte.dev/)
- [Svelte Society](https://sveltesociety.dev/)

### Community

- [Svelte Discord](https://svelte.dev/chat)
- [Svelte Subreddit](https://reddit.com/r/sveltejs)
- [SvelteKit GitHub](https://github.com/sveltejs/kit)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
