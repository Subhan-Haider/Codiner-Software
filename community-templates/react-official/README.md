# React Official Template

A beautifully designed React template with advanced features including search functionality, SEO audit, accessibility checker, and performance monitoring. Built with TypeScript, Tailwind CSS, and modern React patterns.

## ✨ Features

### 🎨 **UI/UX Features**
- **⚛️ React 18**: Latest React with concurrent features and automatic batching
- **⚡ Vite**: Lightning-fast build tool and development server
- **🎨 Shadcn/UI**: Beautiful and accessible component library with 20+ components
- **💨 Tailwind CSS**: Utility-first CSS framework with custom animations
- **🔷 TypeScript**: Full type safety and enhanced developer experience
- **🎭 Framer Motion**: Smooth animations and page transitions
- **📱 Responsive**: Mobile-first design patterns, device-friendly
- **♿ Accessible**: WCAG 2.1 AA compliant components and features
- **🔧 Hot Reload**: Fast development with hot module replacement

### 🔍 **Advanced Functionality**
- **🔎 Search Feature**: Real-time search with filtering and categories
- **📊 SEO Audit Tool**: Comprehensive SEO analysis with actionable recommendations
- **♿ Accessibility Checker**: WCAG compliance testing and improvement suggestions
- **⚡ Performance Monitor**: Real-time Core Web Vitals and optimization tips
- **🎯 Interactive Components**: Animated counters, progress bars, and dynamic UI
- **📋 Developer Tools**: Professional development utilities built-in

### 🛠️ **Developer Experience**
- **🔍 ESLint**: Code linting with React and TypeScript rules
- **💅 Prettier**: Automatic code formatting and consistent code style
- **📦 Optimized Builds**: Production-ready builds with code splitting
- **🎯 SEO Optimized**: Meta tags, structured data, and performance optimization
- **🚀 Performance Focused**: Lazy loading, image optimization, and caching strategies

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/react-official my-react-app
cd my-react-app

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
# Build for production
npm run build

# Preview production build
npm run preview
```

### 🛠️ **Developer Tools**

This template includes powerful developer tools for SEO, accessibility, and performance analysis:

```bash
# Run comprehensive SEO audit
npm run seo-audit

# Check accessibility compliance (WCAG)
npm run accessibility-check

# Analyze performance metrics
npm run performance-test

# Format code with Prettier
npm run format

# Type checking
npm run type-check

# Preview production build
npm run preview
```

## 🎯 **Advanced Features Guide**

### 🔍 **Search & Navigation**
- **Real-time Search**: Filter features and content dynamically
- **Category Filtering**: Browse content by categories (SEO, Performance, etc.)
- **Responsive Navigation**: Mobile-friendly menu with smooth animations
- **Breadcrumb Navigation**: Clear navigation hierarchy

### 📊 **SEO Audit Tool**
- **Comprehensive Analysis**: Page title, meta descriptions, headings
- **Technical SEO**: Structured data, canonical URLs, mobile-friendliness
- **Content Analysis**: Keyword optimization, readability scores
- **Performance Impact**: SEO factors affecting search rankings

### ♿ **Accessibility Checker**
- **WCAG Compliance**: AA and AAA level accessibility testing
- **Automated Testing**: Color contrast, keyboard navigation, screen reader compatibility
- **Issue Prioritization**: Critical, serious, moderate, and minor violations
- **Fix Suggestions**: Actionable recommendations for each issue

### ⚡ **Performance Monitor**
- **Core Web Vitals**: FCP, LCP, FID, CLS, TBT measurements
- **Bundle Analysis**: JavaScript, CSS, and asset size optimization
- **Resource Optimization**: Image formats, compression, caching
- **Real-time Metrics**: Live performance monitoring and alerts

### 🎨 **UI Components**
- **20+ Shadcn/UI Components**: Buttons, cards, forms, navigation
- **Custom Animations**: Framer Motion powered transitions
- **Dark/Light Mode Ready**: Theme system with CSS variables
- **Responsive Grid**: Mobile-first responsive layouts
- **Interactive Elements**: Progress bars, tabs, accordions, tooltips

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
react-official/
├── scripts/                    # Developer tools
│   ├── seo-audit.js           # SEO analysis tool
│   ├── accessibility-check.js # WCAG compliance checker
│   └── performance-test.js    # Performance analyzer
├── src/
│   ├── components/
│   │   ├── ui/                # Shadcn/UI components (20+)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── separator.tsx
│   │   ├── SEOTools.tsx       # SEO audit component
│   │   ├── AccessibilityChecker.tsx # A11y checker
│   │   └── PerformanceMonitor.tsx   # Performance monitor
│   ├── App.tsx                # Main app with advanced features
│   │       └── ...             # Other UI components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # Shadcn/UI configuration
└── README.md                   # Documentation
```

## 🛠️ Configuration

### Vite Configuration

The template uses Vite for fast development and optimized production builds:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Tailwind CSS

Tailwind is configured with Shadcn/UI design tokens:

```typescript
// tailwind.config.ts
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Shadcn/UI color variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... more color tokens
      }
    }
  },
  plugins: []
}
```

### Shadcn/UI

Components are configured in `components.json`:

```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🎨 Shadcn/UI Components

The template includes essential Shadcn/UI components:

### Core Components

- **Button**: Versatile button component with variants
- **Card**: Container component for content
- **Input**: Form input component
- **Label**: Accessible form labels
- **Badge**: Status and tag indicators
- **Progress**: Progress bar component
- **Switch**: Toggle switch component
- **Select**: Dropdown select component
- **Textarea**: Multi-line text input
- **Alert**: Notification and status messages
- **Tabs**: Tabbed interface component

### Usage Examples

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Component</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Enter text..." />
          <Button>Submit</Button>
          <Badge variant="secondary">Status</Badge>
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

## 🎯 TypeScript Integration

### Strict Type Checking

The template uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Component Props

All components are fully typed:

```tsx
interface User {
  id: number
  name: string
  email: string
}

interface UserCardProps {
  user: User
  onEdit?: (user: User) => void
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
        {onEdit && (
          <Button onClick={() => onEdit(user)}>
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
```

## 🎨 Styling

### CSS Variables

The template uses CSS variables for theming:

```css
/* src/index.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

### Tailwind Classes

Use Tailwind utility classes for styling:

```tsx
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Card Title
  </h2>
  <p className="text-gray-600">
    Card content with Tailwind styling.
  </p>
</div>
```

### Custom Components

Create custom styled components:

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

## 🔧 Development Tools

### ESLint Configuration

```javascript
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

### VS Code Extensions

Recommended extensions for the best experience:

- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **TypeScript Importer**: Auto import suggestions
- **Auto Rename Tag**: Auto rename paired HTML/JSX tags

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

# Deploy the dist/ directory to your hosting service
```

## 📚 Resources

### Official Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Learning Resources

- [React Router Tutorial](https://reactrouter.com/start/tutorial)
- [Shadcn/UI Guide](https://ui.shadcn.com/docs)
- [Tailwind CSS Guides](https://tailwindcss.com/docs/utility-first)

### Community

- [React Discord](https://discord.gg/reactiflux)
- [Vite Discord](https://chat.vitejs.dev/)
- [Shadcn/UI GitHub](https://github.com/shadcn-ui/ui)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

### Adding Components

1. Follow the existing component structure
2. Use the Shadcn/UI CLI for new components
3. Update the main App.tsx to showcase new components
4. Add proper TypeScript types
5. Update documentation

### Best Practices

- Use TypeScript for all new code
- Follow the existing naming conventions
- Add proper error handling
- Include accessibility features
- Test components across different screen sizes

## 📄 License

This template is licensed under the MIT License.
