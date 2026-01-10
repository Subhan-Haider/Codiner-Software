# SolidJS Template with TypeScript and Tailwind

A modern template featuring SolidJS with TypeScript and Tailwind CSS for building fast, reactive user interfaces.

## ✨ Features

- **⚛️ SolidJS**: Fine-grained reactivity framework that compiles to vanilla JavaScript
- **🔷 TypeScript**: Full TypeScript support with excellent type inference
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **⚡ Vite**: Lightning-fast build tool with hot module replacement
- **🔍 ESLint**: Code linting for consistent, high-quality code
- **📱 Responsive**: Mobile-first design patterns
- **🚀 Production Ready**: Optimized builds and modern development workflows

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/solidjs-ts-tailwind my-solid-app
cd my-solid-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
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

# Format code
npm run format
```

## 📁 Project Structure

```
solidjs-ts-tailwind/
├── src/
│   ├── pages/
│   │   ├── Home.tsx       # Home page with reactive demos
│   │   ├── About.tsx      # About page
│   │   └── Dashboard.tsx  # Dashboard with async data
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles with Tailwind
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Documentation
```

## 🛠️ Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "strict": true
  }
}
```

## 🎨 SolidJS Features

### Reactive Signals

```tsx
import { createSignal } from 'solid-js';

function Counter() {
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

### Reactive Computations

```tsx
import { createSignal, createMemo } from 'solid-js';

function ComputedExample() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);

  return (
    <div>
      <p>Count: {count()}</p>
      <p>Doubled: {doubled()}</p>
      <button onClick={() => setCount(count() + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Effects

```tsx
import { createSignal, createEffect } from 'solid-js';

function EffectExample() {
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    console.log('Count changed:', count());
  });

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

### Dynamic Lists

```tsx
import { createSignal, For } from 'solid-js';

function ListExample() {
  const [items, setItems] = createSignal(['Item 1', 'Item 2']);

  const addItem = () => {
    setItems([...items(), `Item ${items().length + 1}`]);
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        <For each={items()}>
          {(item, index) => <li>{item} (#{index() + 1})</li>}
        </For>
      </ul>
    </div>
  );
}
```

### Async Data

```tsx
import { createResource } from 'solid-js';

function AsyncExample() {
  const [data] = createResource(fetchData);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>Data: {data()}</div>
      </Suspense>
    </div>
  );
}
```

## 🎨 Styling

### Tailwind CSS

Use Tailwind utility classes:

```tsx
<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 class="text-2xl font-bold text-gray-900 mb-4">
    Styled Component
  </h2>
  <p class="text-gray-600">
    Content with Tailwind utilities
  </p>
</div>
```

### Component Styles

Use SolidJS style directive:

```tsx
function StyledComponent() {
  return (
    <div
      style={{
        'background-color': 'lightblue',
        'padding': '1rem',
        'border-radius': '0.5rem'
      }}
    >
      Styled with inline styles
    </div>
  );
}
```

## 🚀 Deployment

### Vercel

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
# Build for production
npm run build

# Deploy the dist/ directory
```

## 🔧 Development Tools

### VS Code Extensions

- **SolidJS**: Official SolidJS support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions

### Browser DevTools

SolidJS provides excellent debugging tools for reactive state.

## 📚 Resources

### Official Documentation

- [SolidJS Documentation](https://docs.solidjs.com/)
- [SolidJS Tutorial](https://docs.solidjs.com/tutorial/introduction_basics)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Learning Resources

- [SolidJS REPL](https://playground.solidjs.com/)
- [SolidJS Examples](https://github.com/solidjs/solid/tree/main/packages/solid/examples)

### Community

- [SolidJS Discord](https://discord.com/invite/solidjs)
- [SolidJS GitHub](https://github.com/solidjs/solid)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
