import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [filePath, setFilePath] = useState("");
  const [writeContent, setWriteContent] = useState("");
  const [writePath, setWritePath] = useState("");
  const [dirContents, setDirContents] = useState<string[]>([]);
  const [dirPath, setDirPath] = useState("");
  const [systemInfo, setSystemInfo] = useState<any>(null);

  async function greet() {
    try {
      const response = await invoke<string>("greet", { name });
      setGreetMsg(response);
    } catch (error) {
      console.error("Failed to greet:", error);
      setGreetMsg("Error: Failed to communicate with backend");
    }
  }

  async function readFile() {
    try {
      const content = await invoke<string>("read_file", { path: filePath });
      setFileContent(content);
    } catch (error) {
      console.error("Failed to read file:", error);
      setFileContent("Error reading file");
    }
  }

  async function writeFile() {
    try {
      await invoke("write_file", { path: writePath, content: writeContent });
      alert("File written successfully!");
    } catch (error) {
      console.error("Failed to write file:", error);
      alert("Error writing file");
    }
  }

  async function listDirectory() {
    try {
      const contents = await invoke<string[]>("list_directory", { path: dirPath });
      setDirContents(contents);
    } catch (error) {
      console.error("Failed to list directory:", error);
      setDirContents(["Error listing directory"]);
    }
  }

  async function getSystemInfo() {
    try {
      const info = await invoke("get_system_info");
      setSystemInfo(info);
    } catch (error) {
      console.error("Failed to get system info:", error);
      setSystemInfo({ error: "Failed to get system info" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Tauri + React + TypeScript
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build cross-platform desktop applications with Rust backend and React frontend.
            Experience the power of native performance with web technologies.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary">React 18</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tauri 2.0</Badge>
            <Badge variant="outline">Rust Backend</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Greet Function */}
          <Card>
            <CardHeader>
              <CardTitle>🤝 Greeting Function</CardTitle>
              <CardDescription>
                Call a Rust function from React
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <Button onClick={greet} className="w-full">
                Greet from Rust
              </Button>
              {greetMsg && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {greetMsg}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Operations */}
          <Card>
            <CardHeader>
              <CardTitle>📁 File Operations</CardTitle>
              <CardDescription>
                Read and write files using the Rust backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Read File */}
              <div>
                <label className="block text-sm font-medium mb-2">Read File</label>
                <div className="flex gap-2">
                  <Input
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    placeholder="File path"
                  />
                  <Button onClick={readFile} variant="outline">
                    Read
                  </Button>
                </div>
                {fileContent && (
                  <Textarea
                    value={fileContent}
                    readOnly
                    className="mt-2 h-20"
                    placeholder="File content will appear here"
                  />
                )}
              </div>

              <Separator />

              {/* Write File */}
              <div>
                <label className="block text-sm font-medium mb-2">Write File</label>
                <Input
                  value={writePath}
                  onChange={(e) => setWritePath(e.target.value)}
                  placeholder="File path to write"
                  className="mb-2"
                />
                <Textarea
                  value={writeContent}
                  onChange={(e) => setWriteContent(e.target.value)}
                  placeholder="Content to write"
                  className="mb-2 h-20"
                />
                <Button onClick={writeFile} variant="outline" className="w-full">
                  Write File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Directory Listing */}
          <Card>
            <CardHeader>
              <CardTitle>📂 Directory Listing</CardTitle>
              <CardDescription>
                List directory contents from the filesystem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Directory Path</label>
                <div className="flex gap-2">
                  <Input
                    value={dirPath}
                    onChange={(e) => setDirPath(e.target.value)}
                    placeholder="Directory path"
                  />
                  <Button onClick={listDirectory} variant="outline">
                    List
                  </Button>
                </div>
              </div>
              {dirContents.length > 0 && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium mb-2">Contents:</p>
                  <div className="flex flex-wrap gap-2">
                    {dirContents.map((item, index) => (
                      <Badge key={index} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Information */}
          <Card>
            <CardHeader>
              <CardTitle>💻 System Information</CardTitle>
              <CardDescription>
                Get system details from the Rust backend
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={getSystemInfo} variant="outline" className="w-full">
                Get System Info
              </Button>
              {systemInfo && (
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="space-y-1">
                    {Object.entries(systemInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium capitalize">{key}:</span>
                        <span className="text-sm text-muted-foreground">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>✨ Key Features</CardTitle>
            <CardDescription>
              What makes Tauri + React + TypeScript powerful for desktop apps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🦀</span>
                </div>
                <h3 className="font-semibold mb-2">Rust Backend</h3>
                <p className="text-sm text-muted-foreground">
                  High-performance Rust core with memory safety
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h3 className="font-semibold mb-2">React Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  Modern React with hooks and concurrent features
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Secure by Default</h3>
                <p className="text-sm text-muted-foreground">
                  Sandboxed runtime with explicit permissions
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold mb-2">Small Bundles</h3>
                <p className="text-sm text-muted-foreground">
                  Tiny binaries with no runtime overhead
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
