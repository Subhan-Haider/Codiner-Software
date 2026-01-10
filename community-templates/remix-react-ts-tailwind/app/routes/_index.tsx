import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Template - React, TypeScript, Tailwind" },
    { name: "description", content: "A modern Remix template with React, TypeScript, and Tailwind CSS" },
  ];
};

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to Remix
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Build better websites with modern web standards. Remix brings server-side rendering,
          nested routing, and powerful data loading to React applications.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="secondary">Server-Side Rendering</Badge>
          <Badge variant="outline">Nested Routes</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tailwind CSS</Badge>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            View Docs
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <CardTitle>Server-Side Rendering</CardTitle>
              <CardDescription>
                Fast initial page loads with server-side rendering and hydration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧩</span>
              </div>
              <CardTitle>Nested Routing</CardTitle>
              <CardDescription>
                Powerful nested routing with layouts and parallel routes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <CardTitle>Data Loading</CardTitle>
              <CardDescription>
                Built-in data loading with loaders and actions for seamless UX
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔷</span>
              </div>
              <CardTitle>TypeScript</CardTitle>
              <CardDescription>
                Full TypeScript support with automatic route types
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>
                Utility-first CSS framework with Shadcn/UI components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <CardTitle>Production Ready</CardTitle>
              <CardDescription>
                Optimized for performance with built-in error boundaries
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Getting Started */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>🚀 Getting Started</CardTitle>
          <CardDescription>
            Quick setup instructions for the Remix template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Installation</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2"># Copy this template</div>
                <div className="mb-2">cp -r remix-react-ts-tailwind my-app</div>
                <div className="mb-2">cd my-app</div>
                <div className="mb-2"># Install dependencies</div>
                <div>npm install</div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Development</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2"># Start development server</div>
                <div className="mb-2">npm run dev</div>
                <div className="mb-2"># Build for production</div>
                <div className="mb-2">npm run build</div>
                <div className="mb-2"># Start production server</div>
                <div>npm start</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
