import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Docker + Next.js + Lowdb Template',
  description: 'A Next.js template with Docker, Lowdb JSON database, and GitHub Container Registry integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    🐳 Next.js + Lowdb
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Docker Ready</span>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
