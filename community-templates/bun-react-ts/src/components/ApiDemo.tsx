import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function ApiDemo() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with Bun's fetch
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setData(null);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🌐 API Integration</CardTitle>
        <CardDescription>
          Fetch data from APIs with Bun's fast HTTP client
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={fetchData} disabled={loading} className="flex-1">
              {loading ? 'Fetching...' : 'Fetch API Data'}
            </Button>
            <Button onClick={clearData} variant="outline">
              Clear
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                ❌ Error: {error}
              </p>
            </div>
          )}

          {data && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">API Response:</h4>
              <div className="text-sm text-green-700 dark:text-green-300">
                <div><strong>Title:</strong> {data.title}</div>
                <div><strong>Body:</strong> {data.body?.substring(0, 100)}...</div>
                <div><strong>ID:</strong> {data.id}</div>
                <div><strong>User ID:</strong> {data.userId}</div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Uses Bun's native fetch API for fast HTTP requests
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
