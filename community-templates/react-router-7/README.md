# React Router 7 + File System Routes

Modern template using react-router v7 with file based routing from fs- . or more 10+

## ✨ Features

- **🚀 React Router 7**: Latest React Router with file-based routing
- **📁 File-Based Routing**: Routes automatically generated from file system
- **🔷 TypeScript**: Full TypeScript support with automatic type generation
- **⚡ Vite**: Lightning-fast build tool and development server
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🧩 Nested Routes**: Complex layouts with nested routing
- **📊 Data Loading**: Built-in loaders and actions
- **🔍 ESLint**: Code linting and formatting
- **📱 Responsive**: Mobile-first design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/react-router-7 my-app
cd my-app

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
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
react-router-7/
├── app/
│   ├── components/         # Shared components
│   │   └── layout.tsx     # Main layout component
│   ├── routes/            # File-based routes
│   │   ├── _index.tsx     # Home page (/)
│   │   ├── about.tsx      # About page (/about)
│   │   └── dashboard/     # Nested routes (/dashboard/*)
│   │       ├── _layout.tsx # Dashboard layout
│   │       ├── _index.tsx # Dashboard home (/dashboard)
│   │       └── analytics.tsx # Analytics page (/dashboard/analytics)
│   ├── root.tsx           # Root component and error boundary
│   └── app.css           # Global styles
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Documentation
```

## 🛠️ File-Based Routing

React Router 7 introduces revolutionary file-based routing where your file structure directly determines your application's routes.

### Route Structure Examples

```
app/routes/
├── _index.tsx           →  /
├── about.tsx            →  /about
├── dashboard._layout.tsx →  Layout for /dashboard/*
├── dashboard._index.tsx →  /dashboard
├── dashboard.analytics.tsx →  /dashboard/analytics
├── blog.$postId.tsx     →  /blog/:postId (dynamic)
└── users.profile.tsx    →  /users/profile (nested)
```

### Special Files

- **`_index.tsx`**: Index route for a directory (e.g., `/dashboard/_index.tsx` → `/dashboard`)
- **`_layout.tsx`**: Layout component that wraps child routes
- **`$param.tsx`**: Dynamic routes with parameters (e.g., `$userId.tsx` → `/:userId`)
- **`_route.tsx`**: Custom route configuration

### Nested Routes

Create complex layouts with nested routing:

```typescript
// app/routes/dashboard/_layout.tsx
export default function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```

## 🎯 TypeScript Integration

React Router 7 provides automatic TypeScript support:

```typescript
// Automatic route types
import type { Route } from "./+types/about";

export async function loader({ params }: Route.LoaderArgs) {
  // params is fully typed based on route structure
  return { user: await getUser(params.userId) };
}

export default function About({ loaderData }: Route.ComponentProps) {
  // loaderData is fully typed
  return <div>Hello {loaderData.user.name}!</div>;
}
```

## 📊 Data Loading

Built-in data loading with loaders and actions:

```typescript
// app/routes/users.$userId.tsx
import type { Route } from "./+types/users.$userId";

export async function loader({ params }: Route.LoaderArgs) {
  const user = await getUser(params.userId);
  return { user };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  // Handle form submission
}

export default function User({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>{loaderData.user.name}</h1>
      {/* User details */}
    </div>
  );
}
```

## 🧩 Components and Layouts

### Shared Components

Place reusable components in `app/components/`:

```typescript
// app/components/header.tsx
export function Header() {
  return (
    <header className="bg-white shadow">
      <nav>{/* Navigation */}</nav>
    </header>
  );
}
```

### Layout Components

Use layout components for shared UI:

```typescript
// app/routes/dashboard/_layout.tsx
import { Layout } from "~/components/layout";

export default function DashboardLayout() {
  return (
    <Layout>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </Layout>
  );
}
```

## 🎨 Styling

### Tailwind CSS

This template uses Tailwind CSS for styling:

```tsx
<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900">Card Title</h2>
    <p className="text-gray-600 mt-2">Card description with Tailwind utilities.</p>
  </div>
</div>
```

### Custom Styles

Add custom styles in `app/app.css`:

```css
@layer components {
  .btn-custom {
    @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
  }
}
```

## 🚀 Advanced Features

### Error Boundaries

Handle errors gracefully:

```typescript
// app/root.tsx
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

### Meta Tags

Set page metadata:

```typescript
// app/routes/about.tsx
export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn more about our company" },
  ];
}
```

### Links and Navigation

Use React Router's navigation components:

```typescript
import { Link, useNavigate } from "react-router";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/about">About</Link>
      <button onClick={() => navigate("/dashboard")}>
        Go to Dashboard
      </button>
    </nav>
  );
}
```

## 🔧 Configuration

### Vite Configuration

```typescript
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
});
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
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

# Deploy the build/ directory to your hosting service
```

## 📚 Resources

### Official Documentation

- [React Router 7 Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

### Learning Resources

- [React Router Tutorial](https://reactrouter.com/start/tutorial)
- [File-Based Routing Guide](https://reactrouter.com/how-to/file-route-conventions)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community

- [React Router Discord](https://discord.gg/Remix)
- [Reactiflux Discord](https://www.reactiflux.com/)
- [Reddit](https://reddit.com/r/reactjs)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions are welcome!

## 📄 License

This template is licensed under the MIT License.
