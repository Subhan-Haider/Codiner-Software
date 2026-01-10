import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Info, Zap, Rocket, Code, Palette } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Next.js Official Template</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="secondary">Next.js 14</Badge>
            <Badge variant="outline">App Router</Badge>
            <Badge variant="outline">Shadcn/UI</Badge>
            <Badge variant="outline">TypeScript</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Full-Stack React Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the power of Next.js 14 with App Router, Shadcn/UI components,
            Tailwind CSS styling, and TypeScript. Build modern web applications with
            server and client components.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Docs
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">✨ Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Next.js 14</CardTitle>
                <CardDescription>
                  Latest Next.js with App Router, server components, and improved performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>TypeScript First</CardTitle>
                <CardDescription>
                  Full TypeScript support with automatic type generation and strict checking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Shadcn/UI</CardTitle>
                <CardDescription>
                  Beautiful and accessible component library built on Radix UI primitives
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Tailwind CSS</CardTitle>
                <CardDescription>
                  Utility-first CSS framework for rapid UI development and responsive design
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>ESLint & Prettier</CardTitle>
                <CardDescription>
                  Code linting and formatting for consistent, high-quality code standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Info className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Optimized</CardTitle>
                <CardDescription>
                  Built-in optimizations for performance, SEO, and modern web standards
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Demo Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">🎮 Interactive Demo</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Components Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Component Library
                </CardTitle>
                <CardDescription>
                  Showcase of Shadcn/UI components in action
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nextjs">Next.js</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </CardContent>
            </Card>

            {/* Status & Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Status & Progress
                </CardTitle>
                <CardDescription>
                  Visual indicators and interactive elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loading Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Server Component</Badge>
                    <Badge variant="secondary">Client Component</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="destructive">Experimental</Badge>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Server-Side Rendering</AlertTitle>
                  <AlertDescription>
                    This page is rendered on the server for optimal performance and SEO.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Demo */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Tabs with Server Components</CardTitle>
            <CardDescription>
              Organize content with tabs, rendered on the server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="deployment">Deployment</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <h3 className="text-lg font-semibold">Next.js App Router</h3>
                <p className="text-muted-foreground">
                  Experience the power of Next.js 14 with the new App Router. This template
                  demonstrates modern React development patterns with server and client components.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Server Components</h4>
                    <p className="text-sm text-muted-foreground">
                      Run on the server for better performance
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Client Components</h4>
                    <p className="text-sm text-muted-foreground">
                      Interactive components with 'use client'
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-lg font-semibold">Built-in Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Automatic code splitting and optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Built-in CSS and Sass support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    API routes for backend functionality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Static generation and server-side rendering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Image optimization with next/image
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Font optimization with next/font
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="deployment" className="space-y-4">
                <h3 className="text-lg font-semibold">One-Click Deployment</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Vercel (Recommended)</h4>
                    <p className="text-sm text-muted-foreground">
                      Deploy instantly with Vercel. Optimized for Next.js applications.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Netlify</h4>
                    <p className="text-sm text-muted-foreground">
                      Deploy with Netlify for static generation and serverless functions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Railway</h4>
                    <p className="text-sm text-muted-foreground">
                      Full-stack deployment with databases and background services.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Quick setup instructions for the Next.js template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Installation</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                  <div className="mb-2"># Copy this template</div>
                  <div className="mb-2">cp -r nextjs-official my-app</div>
                  <div className="mb-2">cd my-app</div>
                  <div className="mb-2"># Install dependencies</div>
                  <div>npm install</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Development</h3>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm">
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
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="container flex h-16 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            Built with Next.js 14, React 18, Shadcn/UI, Tailwind CSS, and TypeScript
          </p>
        </div>
      </footer>
    </div>
  )
}
