import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function FileDemo() {
  const [fileContent, setFileContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const createSampleFile = async () => {
    setLoading(true);
    setMessage('');

    try {
      // In a real Bun app, you would use Bun's file APIs
      // For demo purposes, we'll simulate file operations
      const sampleContent = `Hello from Bun! 🚀

This file was created at: ${new Date().toISOString()}

Bun is a fast JavaScript runtime that can:
- Run TypeScript files directly
- Bundle JavaScript applications
- Install npm packages quickly
- Replace Node.js in many use cases

Features demonstrated:
✅ Fast startup times
✅ Built-in bundling
✅ Native TypeScript support
✅ Web APIs in runtime
✅ Drop-in Node.js compatibility
`;

      // Simulate file creation (in real Bun app: await Bun.write('sample.txt', sampleContent))
      setFileContent(sampleContent);
      setFileName('sample.txt');
      setMessage('✅ File created successfully!');

      // Auto-download (simulate file download)
      const blob = new Blob([sampleContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sample.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const readBundledFile = async () => {
    setLoading(true);
    setMessage('');

    try {
      // In Bun, you can import files directly
      // For demo, we'll show package.json content
      const packageJson = await import('../package.json');
      const content = JSON.stringify(packageJson.default, null, 2);
      setFileContent(content);
      setFileName('package.json');
      setMessage('✅ Package.json loaded!');
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📁 File Operations</CardTitle>
        <CardDescription>
          Experience Bun's powerful file system capabilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={createSampleFile} disabled={loading} className="flex-1">
              {loading ? 'Processing...' : 'Create Sample File'}
            </Button>
            <Button onClick={readBundledFile} disabled={loading} variant="outline">
              Read Package.json
            </Button>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('✅')
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            }`}>
              {message}
            </div>
          )}

          {fileContent && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">File: {fileName}</h4>
                <Button
                  onClick={() => {
                    setFileContent('');
                    setFileName('');
                    setMessage('');
                  }}
                  variant="outline"
                  size="sm"
                >
                  Clear
                </Button>
              </div>
              <textarea
                value={fileContent}
                readOnly
                rows={8}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 font-mono text-sm resize-none"
                placeholder="File content will appear here..."
              />
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Bun provides fast file operations with native APIs and TypeScript support
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
