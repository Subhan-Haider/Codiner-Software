# Next.js Official Template

Uses Next.js, React.js, Shadcn, Tailwind and TypeScript.

## ✨ Features

- **🚀 Next.js 14**: Latest Next.js with App Router and React Server Components
- **⚛️ React 18**: Modern React with concurrent features and automatic batching
- **🎨 Shadcn/UI**: Beautiful and accessible component library built on Radix UI
- **💨 Tailwind CSS**: Utility-first CSS framework for rapid development
- **🔷 TypeScript**: Full TypeScript support with strict type checking
- **📱 Responsive**: Mobile-first design with responsive utilities
- **♿ Accessible**: WCAG compliant components with proper ARIA attributes
- **⚡ Optimized**: Built-in performance optimizations and code splitting
- **🔍 SEO Ready**: Server-side rendering and metadata API
- **🎯 Type Safe**: End-to-end type safety with generated types

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/nextjs-official my-next-app
cd my-next-app

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

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 📁 Project Structure

```
nextjs-official/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Home page (server component)
│   │   └── globals.css         # Global styles with Shadcn/UI
│   ├── components/
│   │   └── ui/                 # Shadcn/UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...             # Other UI components
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # Shadcn/UI configuration
└── README.md                   # Documentation
```

## 🛠️ Configuration

### Next.js Configuration

The template includes optimized Next.js configuration:

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  output: 'standalone', // For Docker deployment
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
}

module.exports = nextConfig
```

### App Router Structure

```
app/
├── layout.tsx          # Root layout (server component)
├── page.tsx           # Home page (server component)
├── globals.css        # Global styles
└── [dynamic]/         # Dynamic routes
```

### TypeScript Configuration

Strict TypeScript configuration with path mapping:

```json
{
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🎨 Shadcn/UI Components

The template includes essential Shadcn/UI components:

### Core Components

- **Button**: Versatile button with variants and sizes
- **Card**: Container component for content sections
- **Input**: Form input with validation styles
- **Label**: Accessible form labels
- **Badge**: Status indicators and tags
- **Progress**: Progress bars and loading indicators
- **Switch**: Toggle switches
- **Select**: Dropdown selectors
- **Textarea**: Multi-line text inputs
- **Alert**: Notification and status messages
- **Tabs**: Tabbed interface components

### Usage Examples

```tsx
// Server Component (default)
export default function Page() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Server Component</CardTitle>
          <CardDescription>
            This renders on the server for better performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Client Component (interactive)
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">{count}</div>
          <Button onClick={() => setCount(count + 1)}>
            Increment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### Adding New Components

Add new Shadcn/UI components using the CLI:

```bash
# Install shadcn-ui CLI (if not already installed)
npm install -g shadcn-ui

# Add a new component
npx shadcn-ui@latest add dialog

# Add multiple components
npx shadcn-ui@latest add dropdown-menu tooltip
```

## 🎯 App Router Features

### Server Components (Default)

```tsx
// app/page.tsx
export default function Page() {
  // This runs on the server
  const data = await fetchData()

  return (
    <div>
      <h1>Server Component</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

### Client Components

```tsx
// components/counter.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      Count: {count}
    </Button>
  )
}
```

### Metadata API

```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
  },
}

export default function Page() {
  return <div>My Page</div>
}
```

### Route Groups

```typescript
// app/(auth)/login/page.tsx
export default function LoginPage() {
  return <div>Login</div>
}

// app/(dashboard)/settings/page.tsx
export default function SettingsPage() {
  return <div>Settings</div>
}
```

## 🎨 Styling

### Tailwind CSS

Utility-first CSS with custom design tokens:

```tsx
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Card Title
  </h2>
  <p className="text-gray-600">
    Card content with Tailwind utilities.
  </p>
  <Button className="mt-4">
    Action Button
  </Button>
</div>
```

### CSS Variables

Design tokens defined in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more design tokens */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode tokens */
}
```

### Custom Components

Create styled components with Tailwind:

```tsx
const StyledCard = ({ children, className, ...props }) => (
  <Card
    className={cn(
      "border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </Card>
)
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
# Publish directory: .next/static
```

### Docker

```bash
# Build with standalone output
npm run build

# Docker deployment
docker build -t my-app .
docker run -p 3000:3000 my-app
```

### Static Export

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig
```

## 📊 Performance

### Built-in Optimizations

- **Server-Side Rendering**: Faster initial page loads
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Built-in next/image component
- **Font Optimization**: Automatic font loading optimization
- **Bundle Analysis**: Built-in bundle analyzer

### Performance Monitoring

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 🔧 Development Tools

### ESLint Configuration

```javascript
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"]
}
```

### TypeScript Strict Mode

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### VS Code Extensions

- **TypeScript Importer**: Auto import suggestions
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **ESLint**: Real-time linting
- **Prettier**: Code formatting

## 📚 Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [React Documentation](https://react.dev/)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Learning Resources

- [Next.js Learn](https://nextjs.org/learn)
- [React Router Tutorial](https://reactrouter.com/start/tutorial)
- [Shadcn/UI Guide](https://ui.shadcn.com/docs)

### Community

- [Next.js Discord](https://nextjs.org/discord)
- [React Discord](https://discord.gg/reactiflux)
- [Vercel Community](https://vercel.community/)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

### Adding Features

1. Follow the existing component structure
2. Use TypeScript for all new code
3. Add proper error handling
4. Include accessibility features
5. Test components across different viewports
6. Update documentation

### Best Practices

- Use Server Components by default
- Add 'use client' only when necessary
- Implement proper loading states
- Add error boundaries for robustness
- Optimize images and fonts
- Follow Next.js performance guidelines

## 📄 License

This template is licensed under the MIT License.
