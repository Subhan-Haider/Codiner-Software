import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                🚀 React Router 7
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </Link>
              <Link to="/dashboard/analytics" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Analytics
              </Link>
              <Link to="/dashboard/settings" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Sidebar + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Menu</h3>
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                📊 Overview
              </Link>
              <Link
                to="/dashboard/analytics"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                📈 Analytics
              </Link>
              <Link
                to="/dashboard/settings"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                ⚙️ Settings
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
