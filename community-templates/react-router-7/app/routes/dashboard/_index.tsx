import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - React Router 7 Template" },
    { name: "description", content: "Dashboard overview with nested routing demonstration" },
  ];
}

export default function DashboardIndex() {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+12%", trend: "up" },
    { label: "Revenue", value: "$45,678", change: "+8%", trend: "up" },
    { label: "Orders", value: "1,234", change: "-3%", trend: "down" },
    { label: "Conversion", value: "3.24%", change: "+5%", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome to your dashboard. This demonstrates nested routing with shared layouts in React Router 7.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "New user registered", time: "2 minutes ago", type: "user" },
            { action: "Order #1234 completed", time: "15 minutes ago", type: "order" },
            { action: "Payment received", time: "1 hour ago", type: "payment" },
            { action: "System backup completed", time: "3 hours ago", type: "system" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-purple-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-gray-900">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Export Data
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-200">
              Generate Report
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Create New Item
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Demo</h3>
          <p className="text-gray-600 mb-4">
            This dashboard demonstrates nested routing. Click the menu items in the sidebar to navigate between different sections.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Analytics:</strong> View detailed analytics and metrics</p>
            <p>• <strong>Settings:</strong> Configure dashboard preferences</p>
            <p>• <strong>Shared Layout:</strong> Notice how the sidebar persists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
