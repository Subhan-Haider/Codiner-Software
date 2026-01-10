# Qwik Template with TypeScript and Tailwind

A modern template featuring Qwik with TypeScript and Tailwind CSS for building instant-loading, resumable web applications.

## ✨ Features

- **⚡ Qwik**: Resumable framework for instant-loading applications
- **🔷 TypeScript**: Full TypeScript support with excellent developer experience
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **📦 File-Based Routing**: Automatic routing with nested route support
- **🚀 Vite**: Lightning-fast build tool with hot module replacement
- **🔍 ESLint**: Code linting for consistent, high-quality code
- **📱 Responsive**: Mobile-first design patterns
- **⚡ Optimized**: Automatic code splitting and lazy loading

## 🚀 Quick Start

### Prerequisites

- Node.js 16.8+ or 18.11+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/qwik-ts-tailwind my-qwik-app
cd my-qwik-app

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
# Run linting
npm run lint

# Format code
npm run fmt
```

## 📁 Project Structure

```
qwik-ts-tailwind/
├── src/
│   ├── components/        # Reusable components
│   ├── routes/           # File-based routing
│   │   ├── layout.tsx    # Root layout
│   │   └── index.tsx     # Home page
│   └── global.css        # Global styles
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Documentation
```

## 🛠️ Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
});
```

### File-Based Routing

Routes are automatically created from files in `src/routes/`:

```
src/routes/
├── layout.tsx           # Root layout
├── index.tsx           # Home page (/)
├── about.tsx           # About page (/about)
├── dashboard/
│   ├── layout.tsx      # Dashboard layout
│   └── index.tsx       # Dashboard page (/dashboard)
└── blog/
    └── [slug].tsx      # Dynamic blog posts (/blog/:slug)
```

## 🎨 Qwik Features

### Reactive Signals

```tsx
import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);

  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
    </div>
  );
});
```

### Event Handlers

Use the `$` suffix for resumable event handlers:

```tsx
import { component$, useSignal } from "@builder.io/qwik";

export default component$(() => {
  const count = useSignal(0);

  return (
    <button
      onClick$={() => {
        count.value++;
        console.log('Count:', count.value);
      }}
    >
      Click me: {count.value}
    </button>
  );
});
```

### Server-Side Data Loading

```tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useUserData = routeLoader$(async () => {
  // This runs on the server
  const response = await fetch('https://api.example.com/user');
  return response.json();
});

export default component$(() => {
  const userData = useUserData();

  return (
    <div>
      <h1>Welcome, {userData.value.name}!</h1>
    </div>
  );
});
```

### Lazy Loading Components

```tsx
import { component$, lazy$ } from "@builder.io/qwik";

const LazyComponent = lazy$(() => import('./LazyComponent'));

export default component$(() => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
});
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

Use Qwik's scoped styling:

```tsx
import { component$, useStyles$ } from "@builder.io/qwik";

export default component$(() => {
  useStyles$(`
    .my-component {
      background: lightblue;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  `);

  return (
    <div class="my-component">
      Scoped styles in Qwik
    </div>
  );
});
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

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy the dist/ directory
```

## 🔧 Development Tools

### VS Code Extensions

- **Qwik**: Official Qwik support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions

### Qwik DevTools

Enhanced debugging and development experience for Qwik applications.

## 📚 Resources

### Official Documentation

- [Qwik Documentation](https://qwik.builder.io/)
- [Qwik City Documentation](https://qwik.builder.io/qwikcity/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Learning Resources

- [Qwik Tutorial](https://qwik.builder.io/tutorial/welcome/overview/)
- [Qwik Examples](https://qwik.builder.io/examples/)
- [Qwik REPL](https://qwik.builder.io/playground/)

### Community

- [Qwik Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
