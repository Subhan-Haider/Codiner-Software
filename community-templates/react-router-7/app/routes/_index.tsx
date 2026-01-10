import type { Route } from "./+types/_index";
import { Layout } from "~/components/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router 7 Template" },
    { name: "description", content: "Modern template using React Router 7 with file-based routing" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Welcome to React Router 7
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the power of file-based routing with React Router 7.
            Build modern React applications with automatic route generation,
            nested layouts, and powerful routing primitives.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="/about"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              Learn More
            </a>
            <a
              href="/dashboard"
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border border-gray-300 transition duration-200"
            >
              View Dashboard
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">✨ Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">File-Based Routing</h3>
              <p className="text-gray-600">
                Routes are automatically generated from your file system structure.
                No more manual route configuration.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nested Routes</h3>
              <p className="text-gray-600">
                Create complex layouts with nested routes and shared UI components
                using folder-based organization.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Type Safety</h3>
              <p className="text-gray-600">
                Full TypeScript support with automatic type generation for routes,
                loaders, and actions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Loading</h3>
              <p className="text-gray-600">
                Built-in data loading with loaders and actions for seamless
                server and client state management.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern UI</h3>
              <p className="text-gray-600">
                Beautiful, responsive design with Tailwind CSS and modern
                React patterns.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Vite Powered</h3>
              <p className="text-gray-600">
                Lightning-fast development with Vite's modern build tools
                and hot module replacement.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">🚀 Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Installation</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2"># Copy this template</div>
                <div className="mb-2">cp -r react-router-7 my-app</div>
                <div className="mb-2">cd my-app</div>
                <div className="mb-2"># Install dependencies</div>
                <div>npm install</div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Development</h3>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="mb-2"># Start development server</div>
                <div className="mb-2">npm run dev</div>
                <div className="mb-2"># Build for production</div>
                <div className="mb-2">npm run build</div>
                <div className="mb-2"># Preview production build</div>
                <div>npm run preview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
