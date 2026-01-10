import { Component, createSignal, createResource } from 'solid-js';

// Mock API function
const fetchDashboardData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    users: 1234,
    revenue: 56789,
    orders: 456
  };
};

const Dashboard: Component = () => {
  const [refreshKey, setRefreshKey] = createSignal(0);
  const [data] = createResource(refreshKey, fetchDashboardData);

  const refresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">Dashboard</h1>
        <button
          onClick={refresh}
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Refresh Data
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-2">Total Users</h3>
          <div class="text-3xl font-bold text-blue-600">
            {data.loading ? '...' : data()?.users}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-2">Revenue</h3>
          <div class="text-3xl font-bold text-green-600">
            ${data.loading ? '...' : data()?.revenue?.toLocaleString()}
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-2">Orders</h3>
          <div class="text-3xl font-bold text-purple-600">
            {data.loading ? '...' : data()?.orders}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
