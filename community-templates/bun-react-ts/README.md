# Bun Runtime Template with React and TypeScript

Experience the future of JavaScript development with Bun, a fast all-in-one JavaScript runtime. This template combines Bun's speed with React 18, TypeScript, and Tailwind CSS for modern web application development.

## ✨ Features

- **⚡ Lightning Fast**: Bun's JavaScriptCore engine with 4x faster startup than Node.js
- **📦 All-in-One**: Runtime, bundler, package manager, and test runner in one
- **🔷 Native TypeScript**: Run TypeScript files directly without compilation step
- **🎯 Node.js Compatible**: Drop-in replacement with 90% npm package compatibility
- **⚛️ Modern React**: React 18 with concurrent features and fast refresh
- **🎨 Tailwind CSS**: Utility-first CSS with Shadcn/UI components
- **🧪 Built-in Testing**: Fast test runner with native ESM support
- **🔄 Hot Reload**: Instant updates during development

## 🚀 Quick Start

### Prerequisites

- **Bun**: Install from [bun.sh](https://bun.sh/)
- Modern web browser

### Installation

```bash
# Copy this template
cp -r community-templates/bun-react-ts my-bun-app
cd my-bun-app

# Install dependencies (fast!)
bun install
```

### Development

```bash
# Start development server with hot reload
bun run dev

# Open http://localhost:5173 in your browser
```

### Production Build

```bash
# Build for production
bun run build

# Serve production build
bun run start
```

### Testing

```bash
# Run tests
bun test

# Run tests in watch mode
bun run test:watch
```

## 📁 Project Structure

```
bun-react-ts/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/UI components
│   │   ├── Counter.tsx           # Reactive counter demo
│   │   ├── ApiDemo.tsx           # API integration demo
│   │   └── FileDemo.tsx          # File operations demo
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Main React app
│   ├── index.tsx                 # React entry point
│   └── index.css                 # Global styles
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Documentation
```

## 🛠️ Bun Features

### Fast Package Management

```bash
# Install packages (much faster than npm/yarn)
bun add react @types/react

# Remove packages
bun remove lodash

# Run scripts
bun run build
```

### Native TypeScript Support

```typescript
// Run TypeScript files directly
bun run src/index.tsx

// No tsconfig.json needed for simple scripts
// Bun handles TypeScript compilation automatically
```

### Built-in Bundler

```bash
# Bundle for production
bun build src/index.tsx --outdir dist --target browser

# Minify and optimize
bun build --minify src/index.tsx
```

### Fast Test Runner

```typescript
// Native test runner with Jest-like API
import { test, expect } from "bun:test";

test("2 + 2 equals 4", () => {
  expect(2 + 2).toBe(4);
});

// Run with: bun test
```

## 🎨 React Development

### Modern React Features

```tsx
import { useState, useEffect, Suspense } from 'react';

// Hooks with TypeScript
function Counter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

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

### Component Patterns

```tsx
// Modern React patterns work perfectly with Bun
import { memo, forwardRef } from 'react';

const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, ...props }, ref) => (
    <button ref={ref} onClick={onClick} {...props}>
      {children}
    </button>
  )
));
```

## 🎨 Styling

### Tailwind CSS

```tsx
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Styled Component
  </h2>
  <p className="text-gray-600">
    Utility-first CSS with Tailwind
  </p>
</div>
```

### CSS Modules (Optional)

```tsx
import styles from './Button.module.css';

export function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
```

## 📊 API Integration

### Fast HTTP Client

```typescript
// Bun's fetch is faster than Node.js
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// Built-in FormData, Headers, Request, Response
const formData = new FormData();
formData.append('file', file);

await fetch('/upload', {
  method: 'POST',
  body: formData
});
```

### Server-Side Rendering (Optional)

```typescript
// Create a simple HTTP server
export default {
  port: 3000,
  fetch(request: Request) {
    return new Response('Hello from Bun!');
  }
};
```

## 📁 File System Operations

### Native File APIs

```typescript
// Read files (faster than Node.js)
const file = Bun.file('data.json');
const text = await file.text();
const json = await file.json();

// Write files
await Bun.write('output.txt', 'Hello, Bun!');

// File operations
import { readdir, stat } from 'fs/promises';

const files = await readdir('.');
const stats = await stat('file.txt');
```

### Environment Variables

```typescript
// Access environment variables
const API_KEY = process.env.API_KEY;
const PORT = parseInt(process.env.PORT || '3000');

// Bun-specific environment handling
console.log('Bun version:', Bun.version);
```

## 🧪 Testing

### Built-in Test Runner

```typescript
import { test, expect, describe, beforeEach } from "bun:test";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  beforeEach(() => {
    // Setup code
  });

  test("increments count", async () => {
    render(<Counter />);
    const button = screen.getByText("Increment");

    await userEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

### Performance Testing

```typescript
test("API call performance", async () => {
  const start = performance.now();

  const response = await fetch('/api/data');
  const data = await response.json();

  const end = performance.now();
  console.log(`API call took ${end - start}ms`);

  expect(response.ok).toBe(true);
});
```

## 🚀 Deployment

### Static Site Deployment

```bash
# Build for static hosting
bun run build

# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
```

### Server-Side Rendering

```typescript
// For SSR applications
import { renderToString } from 'react-dom/server';

export default {
  async fetch(request: Request) {
    const html = renderToString(<App />);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};
```

### Docker Deployment

```dockerfile
FROM oven/bun:latest

WORKDIR /app
COPY package.json ./
RUN bun install
COPY . .

EXPOSE 3000
CMD ["bun", "run", "start"]
```

## 🔧 Development Tools

### Hot Reload

```bash
# Automatic hot reload (faster than Vite/Webpack)
bun run dev
```

### Type Checking

```bash
# Fast TypeScript checking
bunx tsc --noEmit
```

### Code Formatting

```bash
# Built-in formatter
bunx prettier --write .
```

### Linting

```bash
# ESLint with React support
bunx eslint src --ext .ts,.tsx
```

## 📊 Performance Comparison

| Feature | Bun | Node.js | Improvement |
|---------|-----|---------|-------------|
| Startup Time | ~3ms | ~70ms | ~95% faster |
| Install Speed | ~5s | ~30s | ~83% faster |
| Bundle Speed | ~1s | ~10s | ~90% faster |
| Memory Usage | Lower | Higher | ~50% less |

## 🎯 Bun Advantages

### 1. **All-in-One Toolchain**
- No need for separate bundler (Vite/Webpack)
- No need for separate test runner (Jest)
- No need for separate package manager (npm/yarn)

### 2. **Native Performance**
- JavaScriptCore engine (same as Safari)
- Native ESM support
- Optimized for modern JavaScript

### 3. **Developer Experience**
- Instant startup times
- Native TypeScript support
- Built-in hot reload

### 4. **Node.js Compatibility**
- 90% npm package compatibility
- Same APIs and patterns
- Drop-in replacement

## 📚 Resources

### Official Documentation

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Learning Resources

- [Bun Examples](https://github.com/oven-sh/bun/tree/main/examples)
- [Bun Discord](https://discord.gg/CXdq2DP8)
- [Migration Guide](https://bun.sh/docs/ecosystem/nodejs)

### Community

- [Bun GitHub](https://github.com/oven-sh/bun)
- [Awesome Bun](https://github.com/daltonmenezes/awesome-bun)
- [Bun Twitter](https://twitter.com/bunjavascript)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
