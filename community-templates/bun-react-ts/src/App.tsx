import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Counter } from './components/Counter';
import { ApiDemo } from './components/ApiDemo';
import { FileDemo } from './components/FileDemo';

function App() {
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading system info (Bun-specific features would go here)
    const loadSystemInfo = async () => {
      // Bun has built-in APIs for system information
      const info = {
        runtime: 'Bun',
        version: '1.x.x', // Would use Bun.version in real Bun app
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };
      setSystemInfo(info);
      setIsLoading(false);
    };

    loadSystemInfo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ⚡ Bun + React + TypeScript
              </h1>
            </div>
            <div className="flex items-center space-x-8">
              <Badge variant="secondary">Bun Runtime</Badge>
              <Badge variant="outline">React 18</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Bun
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience lightning-fast development with Bun, a modern JavaScript runtime.
            Built-in bundling, TypeScript support, and native performance with React.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary">⚡ Fast Startup</Badge>
            <Badge variant="outline">📦 Built-in Bundler</Badge>
            <Badge variant="outline">🔷 Native TypeScript</Badge>
            <Badge variant="outline">🎯 Drop-in Node.js</Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Lightning Fast</CardTitle>
              <CardDescription>
                Bun's JavaScriptCore engine provides exceptional performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Startup times up to 4x faster than Node.js with native ES modules support
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📦 Built-in Bundler</CardTitle>
              <CardDescription>
                No separate bundler needed - Bun handles it all
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Fast bundling with tree-shaking, minification, and source maps
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔷 Native TypeScript</CardTitle>
              <CardDescription>
                TypeScript support without additional configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Run TypeScript files directly with automatic compilation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Node.js Compatible</CardTitle>
              <CardDescription>
                Drop-in replacement with 90% npm package compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Most existing Node.js code runs without modifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🛠️ Batteries Included</CardTitle>
              <CardDescription>
                Built-in tools for development and testing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Package manager, test runner, and bundler all in one
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Modern React</CardTitle>
              <CardDescription>
                React 18 with concurrent features and modern patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Latest React features with fast refresh and optimized rendering
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Counter />
          <ApiDemo />
        </div>

        <div className="mb-8">
          <FileDemo />
        </div>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>💻 Runtime Information</CardTitle>
            <CardDescription>
              System and runtime details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading system information...</p>
              </div>
            ) : systemInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Runtime</div>
                  <div className="text-lg font-semibold">{systemInfo.runtime}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Version</div>
                  <div className="text-lg font-semibold">{systemInfo.version}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Platform</div>
                  <div className="text-lg font-semibold">{systemInfo.platform}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Timestamp</div>
                  <div className="text-sm font-semibold">{new Date(systemInfo.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Unable to load system information</p>
            )}
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Quick setup instructions for the Bun template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Installation</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                  <div className="mb-2"># Copy this template</div>
                  <div className="mb-2">cp -r bun-react-ts my-bun-app</div>
                  <div className="mb-2">cd my-bun-app</div>
                  <div className="mb-2"># Install dependencies</div>
                  <div>bun install</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Development</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 font-mono text-sm">
                  <div className="mb-2"># Start development server</div>
                  <div className="mb-2">bun run dev</div>
                  <div className="mb-2"># Build for production</div>
                  <div className="mb-2">bun run build</div>
                  <div className="mb-2"># Run tests</div>
                  <div>bun test</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>Built with Bun runtime, React, TypeScript, and Tailwind CSS</p>
            <p className="mt-2">Experience the future of JavaScript development</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
