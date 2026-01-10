import type { Route } from "./+types/analytics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics - Dashboard" },
    { name: "description", content: "Detailed analytics and metrics dashboard" },
  ];
}

export default function Analytics() {
  const chartData = [
    { month: "Jan", users: 1200, revenue: 24000 },
    { month: "Feb", users: 1350, revenue: 27000 },
    { month: "Mar", users: 1180, revenue: 23600 },
    { month: "Apr", users: 1420, revenue: 28400 },
    { month: "May", users: 1580, revenue: 31600 },
    { month: "Jun", users: 1720, revenue: 34400 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Detailed analytics and insights for your application. This route demonstrates nested routing within the dashboard layout.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Views</h3>
          <div className="text-3xl font-bold text-blue-600 mb-1">45,231</div>
          <div className="text-sm text-green-600">+12.5% from last month</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unique Visitors</h3>
          <div className="text-3xl font-bold text-purple-600 mb-1">12,543</div>
          <div className="text-sm text-green-600">+8.2% from last month</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Bounce Rate</h3>
          <div className="text-3xl font-bold text-orange-600 mb-1">24.3%</div>
          <div className="text-sm text-red-600">+2.1% from last month</div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Trends</h2>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p>Chart visualization would go here</p>
            <p className="text-sm">Integrate with Chart.js, Recharts, or D3.js</p>
          </div>
        </div>

        {/* Simple Data Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-semibold text-gray-900">Month</th>
                <th className="text-left py-2 font-semibold text-gray-900">Users</th>
                <th className="text-left py-2 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-2 font-semibold text-gray-900">Growth</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-gray-900">{data.month}</td>
                  <td className="py-3 text-gray-600">{data.users.toLocaleString()}</td>
                  <td className="py-3 text-gray-600">${data.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      index > 0 && data.users > chartData[index - 1].users
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {index > 0
                        ? ((data.users - chartData[index - 1].users) / chartData[index - 1].users * 100).toFixed(1) + '%'
                        : 'N/A'
                      }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {[
              { page: "/dashboard", views: 8420, percentage: 35 },
              { page: "/about", views: 6210, percentage: 26 },
              { page: "/", views: 4890, percentage: 20 },
              { page: "/blog", views: 3240, percentage: 13 },
              { page: "/contact", views: 1240, percentage: 6 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.page}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="font-semibold text-gray-900">{item.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
          <div className="space-y-4">
            {[
              { device: "Desktop", count: 8920, percentage: 62, color: "bg-blue-500" },
              { device: "Mobile", count: 4230, percentage: 29, color: "bg-green-500" },
              { device: "Tablet", count: 1250, percentage: 9, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{item.device}</span>
                    <span className="text-sm text-gray-500">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{item.count.toLocaleString()} visits</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
