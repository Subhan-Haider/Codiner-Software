/**
 * Docker Auto-Generator UI Component
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
    Container,
    CheckCircle,
    AlertCircle,
    FileText,
    Database,
    Sparkles,
} from "lucide-react";

interface DockerGeneratorProps {
    projectPath: string;
    projectName?: string;
}

interface ProgressUpdate {
    step: string;
    message: string;
}

export function DockerGenerator({
    projectPath,
    projectName = "Project",
}: DockerGeneratorProps) {
    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState<ProgressUpdate | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);
    const [projectInfo, setProjectInfo] = useState<any>(null);

    const handleGenerate = async () => {
        setGenerating(true);
        setError(null);
        setSuccess(false);
        setProgress(null);
        setGeneratedFiles([]);

        try {
            // Listen for progress
            const progressListener = (data: ProgressUpdate) => {
                setProgress(data);
            };

            (window as any).electron.ipcRenderer.on("docker:progress", progressListener);

            // Generate Docker config
            const result = await (window as any).electron.ipcRenderer.invoke(
                "docker:generate",
                projectPath
            );

            // Clean up listener
            (window as any).electron.ipcRenderer.removeListener("docker:progress", progressListener);

            if (result.success) {
                setSuccess(true);
                const files = ["Dockerfile", "docker-compose.yml", ".dockerignore"];

                // Add nginx.conf if it was generated
                if (result.config.nginxConfig) {
                    files.push("nginx.conf");
                }

                setGeneratedFiles(files);
            } else {
                setError(result.error || "Failed to generate Docker configuration");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setGenerating(false);
        }
    };

    const handleAnalyze = async () => {
        try {
            const result = await (window as any).electron.ipcRenderer.invoke(
                "docker:analyze",
                projectPath
            );

            if (result.success) {
                setProjectInfo(result.info);
            }
        } catch (error) {
            console.error("Failed to analyze project:", error);
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
                        <Container className="h-5 w-5" />
                        Docker Auto-Generator
                    </CardTitle>
                    <CardDescription>
                        Generate production-ready Docker configuration for {projectName}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button
                        onClick={handleGenerate}
                        disabled={generating}
                        size="lg"
                        className="w-full"
                    >
                        {generating ? (
                            <>
                                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                                Generating Docker Config...
                            </>
                        ) : (
                            <>
                                <Container className="h-4 w-4 mr-2" />
                                Generate Docker Configuration
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={handleAnalyze}
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        Analyze Project
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
                        Docker configuration generated successfully!
                    </AlertDescription>
                </Alert>
            )}

            {/* Generated Files */}
            {generatedFiles.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Generated Files</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {generatedFiles.map((file) => (
                                <div
                                    key={file}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                                >
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm font-mono">{file}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Project Info */}
            {projectInfo && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Detected Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-muted-foreground">Framework</p>
                                <p className="font-semibold">{projectInfo.framework}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Language</p>
                                <p className="font-semibold">{projectInfo.language}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Package Manager</p>
                                <p className="font-semibold">{projectInfo.packageManager}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Node Version</p>
                                <p className="font-semibold">{projectInfo.nodeVersion}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Port</p>
                                <p className="font-semibold">{projectInfo.port}</p>
                            </div>
                            {projectInfo.hasDatabase && (
                                <div>
                                    <p className="text-muted-foreground">Database</p>
                                    <div className="flex items-center gap-1">
                                        <Database className="h-3 w-3" />
                                        <p className="font-semibold">{projectInfo.databaseType}</p>
                                    </div>
                                </div>
                            )}
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
                    <div className="space-y-3">
                        {/* Dockerfile */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <h3 className="font-semibold text-sm">Dockerfile</h3>
                                <Badge variant="secondary" className="text-xs">Multi-stage</Badge>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Optimized multi-stage build</li>
                                <li>• Alpine Linux base (minimal size)</li>
                                <li>• Production-ready configuration</li>
                                <li>• Security best practices</li>
                            </ul>
                        </div>

                        {/* docker-compose.yml */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <Container className="h-4 w-4 text-purple-500" />
                                <h3 className="font-semibold text-sm">docker-compose.yml</h3>
                                <Badge variant="secondary" className="text-xs">Full stack</Badge>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Application service</li>
                                <li>• Database service (if detected)</li>
                                <li>• Network configuration</li>
                                <li>• Volume management</li>
                                <li>• Environment variables</li>
                            </ul>
                        </div>

                        {/* .dockerignore */}
                        <div className="p-3 border rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4 text-orange-500" />
                                <h3 className="font-semibold text-sm">.dockerignore</h3>
                                <Badge variant="secondary" className="text-xs">Optimized</Badge>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Excludes node_modules</li>
                                <li>• Ignores build artifacts</li>
                                <li>• Skips development files</li>
                                <li>• Reduces image size</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Features */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Features</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Auto</Badge>
                            <span className="text-muted-foreground">Framework detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Multi-stage</Badge>
                            <span className="text-muted-foreground">Optimized builds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Database</Badge>
                            <span className="text-muted-foreground">Auto-configured</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Production</Badge>
                            <span className="text-muted-foreground">Ready to deploy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Secure</Badge>
                            <span className="text-muted-foreground">Best practices</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">Small</Badge>
                            <span className="text-muted-foreground">Alpine Linux</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Start */}
            {success && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">🚀 Quick Start</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded">
                            <p className="text-muted-foreground"># Build and run</p>
                            <p>docker-compose up --build</p>
                            <p className="text-muted-foreground mt-3"># Or build image only</p>
                            <p>docker build -t {projectName} .</p>
                            <p className="text-muted-foreground mt-3"># Run container</p>
                            <p>docker run -p {projectInfo?.port || 3000}:{projectInfo?.port || 3000} {projectName}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
