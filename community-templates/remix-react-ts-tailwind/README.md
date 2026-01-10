# Remix Template with React, TypeScript, Tailwind

A modern full-stack web framework template featuring Remix, React, TypeScript, and Tailwind CSS for building fast, scalable, and user-friendly web applications.

## ✨ Features

- **⚡ Remix 2.0**: Full-stack React framework with nested routing and server-side rendering
- **⚛️ React 18**: Latest React with concurrent features and automatic batching
- **🔷 TypeScript**: Full TypeScript support with automatic route types
- **🎨 Tailwind CSS**: Utility-first CSS with Shadcn/UI components
- **🔄 Nested Routing**: Powerful nested routing with layouts and error boundaries
- **📊 Data Loading**: Built-in data loading with loaders and actions
- **🛠️ Developer Experience**: Hot reload, error boundaries, and debugging
- **🚀 Production Ready**: Optimized builds and deployment configurations
- **🔍 ESLint**: Code linting with Remix and React best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Copy this template
cp -r community-templates/remix-react-ts-tailwind my-remix-app
cd my-remix-app

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
npm run start
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck

# Format code
npm run format
```

## 📁 Project Structure

```
remix-react-ts-tailwind/
├── app/
│   ├── components/
│   │   └── ui/                  # Shadcn/UI components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── routes/
│   │   └── _index.tsx          # Home page route
│   ├── root.tsx                # Root layout component
│   └── tailwind.css            # Global styles
├── public/                     # Static assets
├── remix.config.js             # Remix configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Documentation
```

## 🛠️ Configuration

### Remix Configuration

```javascript
// remix.config.js
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
```

### Nested Routing

Remix uses file-based routing with nested layouts:

```
app/routes/
├── _index.tsx                   # Home page (/)
├── about.tsx                    # About page (/about)
├── dashboard.tsx                # Dashboard (/dashboard)
├── dashboard/
│   ├── _layout.tsx             # Dashboard layout
│   └── settings.tsx            # Settings (/dashboard/settings)
└── blog/
    ├── _layout.tsx             # Blog layout
    ├── $slug.tsx               # Dynamic blog post (/blog/:slug)
    └── index.tsx               # Blog list (/blog)
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    }
  }
}
```

## 🎨 Components and Styling

### Shadcn/UI Components

Pre-configured Shadcn/UI components with Tailwind:

```tsx
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Tailwind CSS

Utility-first styling with custom design tokens:

```tsx
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">
    Styled Component
  </h2>
  <p className="text-gray-600">
    Content with Tailwind utilities
  </p>
</div>
```

## 📊 Data Loading and Actions

### Loaders

Server-side data loading:

```tsx
// app/routes/users.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const users = await getUsers();
  return json({ users });
}

export default function Users() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Actions

Form handling and mutations:

```tsx
// app/routes/users.tsx
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  await createUser({ name });
  return redirect("/users");
}

export default function NewUser() {
  return (
    <Form method="post">
      <input name="name" type="text" />
      <button type="submit">Create User</button>
    </Form>
  );
}
```

## 🔄 Error Handling

### Error Boundaries

Catch and handle errors gracefully:

```tsx
// app/routes/users.$id.tsx
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Error!</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

### Catch Boundaries

Handle thrown responses:

```tsx
// app/routes/users.$id.tsx
export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>User not found</div>;
  }

  throw new Error("Unexpected error");
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

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway deploy
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Development Tools

### VS Code Extensions

Recommended extensions:

- **Remix**: Official Remix support
- **Tailwind CSS IntelliSense**: Autocomplete for classes
- **TypeScript Importer**: Auto import suggestions
- **ESLint**: Real-time linting

### Browser DevTools

Remix provides enhanced debugging:

- **Network Tab**: See loader/action calls
- **Application Tab**: View route hierarchy
- **Console**: Remix-specific logging

## 📚 Resources

### Official Documentation

- [Remix Documentation](https://remix.run/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### Learning Resources

- [Remix Tutorial](https://remix.run/docs/en/main/start/tutorial)
- [Remix Examples](https://github.com/remix-run/remix/tree/main/examples)
- [Remix Community](https://rmx.as/discord)

### Community

- [Remix Discord](https://rmx.as/discord)
- [Remix Twitter](https://twitter.com/remix_run)
- [Remix GitHub](https://github.com/remix-run/remix)

## 🤝 Contributing

This template is part of the Codiner community templates collection. Contributions welcome!

## 📄 License

This template is licensed under the MIT License.
