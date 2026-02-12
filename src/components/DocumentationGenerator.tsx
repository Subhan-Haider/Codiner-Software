/**
 * Auto-Documentation Generator UI Component
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Sparkles,
    CheckCircle,
    AlertCircle,
    Folder,
    Code,
    Settings,
    BookOpen,
} from "lucide-react";

interface DocumentationGeneratorProps {
    projectPath: string;
    projectName?: string;
}

interface ProgressUpdate {
    step: string;
    message: string;
}

export function DocumentationGenerator({
    projectPath,
    projectName = "Project",
}: DocumentationGeneratorProps) {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);

    const handleGenerate = async () => {
        setGenerating(true);
        setError(null);
        setSuccess(false);
        setProgress(null);
        setGeneratedDocs([]);

        try {
            // Listen for progress updates
            const progressListener = (data: ProgressUpdate) => {
                setProgress(data);
            };

            window.electron.ipcRenderer.on("docs:progress", progressListener);

            // Generate documentation
            const result = await window.electron.ipcRenderer.invoke(
                "docs:generate-full",
                projectPath
            );

            // Clean up listener
            window.electron.ipcRenderer.removeListener("docs:progress", progressListener);

            if (result.success) {
                setSuccess(true);
                setGeneratedDocs([
                    "README.md",
                    "docs/ARCHITECTURE.md",
                    "docs/SETUP.md",
                    "docs/STRUCTURE.md",
                ]);
            } else {
                setError(result.error || "Failed to generate documentation");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setGenerating(false);
        }
    };

    const getProgressPercentage = () => {
        if (!progress) return 0;
        const steps = ["analyzing", "generating", "saving", "complete"];
        const currentIndex = steps.indexOf(progress.step);
        return ((currentIndex + 1) / steps.length) * 100;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Auto-Documentation Generator
                    </CardTitle>
                    <CardDescription>
                        Generate comprehensive documentation for {projectName} using AI
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={handleGenerate}
                        disabled={generating}
                        size="lg"
                        className="w-full"
                    >
                        {generating ? (
                            <>
                                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                                Generating Documentation...
                            </>
                        ) : (
                            <>
                                <FileText className="h-4 w-4 mr-2" />
                                Generate Full Project Documentation
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Progress */}
            {generating && progress && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Progress value={getProgressPercentage()} className="w-full" />
                        <p className="text-sm text-muted-foreground">{progress.message}</p>
                    </CardContent>
                </Card>
            )}

            {/* Error */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Success */}
            {success && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        Documentation generated successfully! Check your project folder.
                    </AlertDescription>
                </Alert>
            )}

            {/* Generated Files */}
            {generatedDocs.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Generated Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {generatedDocs.map((file) => (
                                <div
                                    key={file}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                                >
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-mono">{file}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* What Will Be Generated */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">What Will Be Generated</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* README */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <h3 className="font-semibold text-sm">README.md</h3>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Project overview</li>
                                <li>• Installation guide</li>
                                <li>• Usage examples</li>
                                <li>• Tech stack</li>
                                <li>• Contributing guidelines</li>
                            </ul>
                        </div>

                        {/* Architecture */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Code className="h-4 w-4 text-purple-500" />
                                <h3 className="font-semibold text-sm">ARCHITECTURE.md</h3>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• System design</li>
                                <li>• Data flow</li>
                                <li>• Key technologies</li>
                                <li>• Design patterns</li>
                                <li>• Component structure</li>
                            </ul>
                        </div>

                        {/* Setup */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Settings className="h-4 w-4 text-green-500" />
                                <h3 className="font-semibold text-sm">SETUP.md</h3>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Prerequisites</li>
                                <li>• Installation steps</li>
                                <li>• Environment setup</li>
                                <li>• Build instructions</li>
                                <li>• Troubleshooting</li>
                            </ul>
                        </div>

                        {/* Structure */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Folder className="h-4 w-4 text-orange-500" />
                                <h3 className="font-semibold text-sm">STRUCTURE.md</h3>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Folder tree</li>
                                <li>• Directory descriptions</li>
                                <li>• File organization</li>
                                <li>• Module breakdown</li>
                                <li>• Code structure</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Features */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Features
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">AI</Badge>
                            <span className="text-muted-foreground">AI-powered content</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Auto</Badge>
                            <span className="text-muted-foreground">Framework detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Smart</Badge>
                            <span className="text-muted-foreground">Dependency analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Pro</Badge>
                            <span className="text-muted-foreground">Professional format</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Fast</Badge>
                            <span className="text-muted-foreground">Quick generation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Local</Badge>
                            <span className="text-muted-foreground">Privacy-first</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tips */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">💡 Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-xs text-muted-foreground space-y-2">
                        <li>• Ensure Ollama is running for AI-powered content</li>
                        <li>• Documentation is saved to your project folder</li>
                        <li>• You can regenerate anytime to update docs</li>
                        <li>• Edit generated files to add project-specific details</li>
                        <li>• Perfect for GitHub repositories and open-source projects</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
