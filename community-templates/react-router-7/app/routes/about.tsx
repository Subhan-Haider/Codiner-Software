import type { Route } from "./+types/about";
import { Layout } from "~/components/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - React Router 7 Template" },
    { name: "description", content: "Learn about React Router 7 and file-based routing" },
  ];
}

export default function About() {
  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            About React Router 7
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the power of file-based routing and modern React development
            with React Router 7.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* What is React Router 7 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 What is React Router 7?</h2>
            <p className="text-gray-600 mb-4">
              React Router 7 is the latest evolution of React Router, bringing powerful new features
              including file-based routing, automatic route generation, and enhanced developer experience.
              It represents a significant leap forward in how we think about routing in React applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Innovations</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• File-based routing system</li>
                  <li>• Automatic route generation</li>
                  <li>• Enhanced TypeScript support</li>
                  <li>• Built-in data loading</li>
                  <li>• Nested route layouts</li>
                  <li>• Improved developer tools</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Benefits</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Zero configuration routing</li>
                  <li>• Type-safe route parameters</li>
                  <li>• Better performance</li>
                  <li>• Simplified architecture</li>
                  <li>• Enhanced DX</li>
                  <li>• Future-proof design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* File-Based Routing */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📁 File-Based Routing</h2>
            <p className="text-gray-600 mb-6">
              React Router 7 introduces a revolutionary file-based routing system where your file
              structure directly determines your application's routes. This approach eliminates
              the need for manual route configuration and provides a more intuitive development experience.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm">
              <div className="mb-4 text-gray-700 font-semibold">Example Route Structure:</div>
              <div className="space-y-1">
                <div>app/</div>
                <div>&nbsp;&nbsp;routes/</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;_index.tsx &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → /</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;about.tsx &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → /about</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;dashboard.tsx &nbsp;&nbsp;&nbsp;&nbsp; → /dashboard</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;blog/</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_index.tsx &nbsp;&nbsp;&nbsp;&nbsp; → /blog</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$postId.tsx &nbsp;&nbsp;&nbsp; → /blog/:postId</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;users/</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;profile.tsx &nbsp;&nbsp;&nbsp; → /users/profile</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">📄</div>
                <div className="font-semibold text-gray-900">Static Routes</div>
                <div className="text-sm text-gray-600">Direct file to route mapping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌀</div>
                <div className="font-semibold text-gray-900">Dynamic Routes</div>
                <div className="text-sm text-gray-600">$param.tsx for parameters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📁</div>
                <div className="font-semibold text-gray-900">Nested Routes</div>
                <div className="text-sm text-gray-600">Folder-based organization</div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚡ Performance & DX</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold text-gray-900">Feature</th>
                    <th className="text-left py-2 font-semibold text-gray-900">React Router 6</th>
                    <th className="text-left py-2 font-semibold text-gray-900">React Router 7</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b">
                    <td className="py-3">Route Configuration</td>
                    <td>Manual route objects</td>
                    <td>Automatic from file system</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">TypeScript Support</td>
                    <td>Basic types</td>
                    <td>Full type generation</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Data Loading</td>
                    <td>useEffect patterns</td>
                    <td>Built-in loaders</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Code Splitting</td>
                    <td>Manual lazy loading</td>
                    <td>Automatic route-based</td>
                  </tr>
                  <tr>
                    <td className="py-3">Developer Experience</td>
                    <td>Good</td>
                    <td>Exceptional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Migration Guide */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Migration Guide</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">From React Router 6</h3>
                <p className="text-gray-600 mt-1">
                  Migrating from React Router 6 is straightforward. The main change is moving
                  from manual route configuration to file-based routing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Key Migration Steps:</h4>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Install React Router 7 dependencies</li>
                  <li>Move route components to <code className="bg-gray-200 px-1 rounded">app/routes/</code> folder</li>
                  <li>Rename files to match URL structure</li>
                  <li>Replace route configuration with file structure</li>
                  <li>Update imports to use new route types</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Resources & Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://reactrouter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <span className="text-2xl mr-3">📖</span>
                <div>
                  <div className="font-semibold text-gray-900">Official Documentation</div>
                  <div className="text-sm text-gray-600">Complete React Router 7 docs</div>
                </div>
              </a>
              <a
                href="https://github.com/remix-run/react-router"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <span className="text-2xl mr-3">💻</span>
                <div>
                  <div className="font-semibold text-gray-900">GitHub Repository</div>
                  <div className="text-sm text-gray-600">Source code and issues</div>
                </div>
              </a>
              <a
                href="https://reactrouter.com/start/tutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <span className="text-2xl mr-3">🎓</span>
                <div>
                  <div className="font-semibold text-gray-900">Tutorial</div>
                  <div className="text-sm text-gray-600">Step-by-step learning guide</div>
                </div>
              </a>
              <a
                href="https://discord.gg/Remix"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <span className="text-2xl mr-3">💬</span>
                <div>
                  <div className="font-semibold text-gray-900">Discord Community</div>
                  <div className="text-sm text-gray-600">Get help and share knowledge</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
