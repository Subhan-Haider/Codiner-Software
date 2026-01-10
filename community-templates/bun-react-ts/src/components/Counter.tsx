import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function Counter() {
  const [count, setCount] = useState(0);
  const [incrementBy, setIncrementBy] = useState(1);

  const increment = () => setCount(count + incrementBy);
  const decrement = () => setCount(count - incrementBy);
  const reset = () => setCount(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>⚡ Reactive Counter</CardTitle>
        <CardDescription>
          Experience Bun's fast reactivity with React hooks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-blue-600 mb-2">{count}</div>
          <div className="text-lg text-gray-600">Count</div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <label className="text-sm font-medium">Increment by:</label>
          <input
            type="number"
            value={incrementBy}
            onChange={(e) => setIncrementBy(Number(e.target.value) || 1)}
            min="1"
            max="10"
            className="w-16 px-2 py-1 border rounded text-center"
          />
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={decrement} variant="outline">
            -{incrementBy}
          </Button>
          <Button onClick={reset} variant="secondary">
            Reset
          </Button>
          <Button onClick={increment}>
            +{incrementBy}
          </Button>
        </div>

        <div className="mt-4 text-sm text-muted-foreground text-center">
          Built with React hooks and Bun's fast runtime
        </div>
      </CardContent>
    </Card>
  );
}
