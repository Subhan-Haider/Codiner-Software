/**
 * Ollama Model Management UI Component
 * Allows users to install, manage, and configure Ollama models
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IpcClient } from "@/ipc/ipc_client";
import { Download, Trash2, CheckCircle, AlertCircle, Cpu, HardDrive } from "lucide-react";

interface OllamaModel {
    name: string;
    size: number;
    modified_at: string;
}

interface ModelRecommendation {
    name: string;
    displayName: string;
    bestFor: string;
    ramNeeded: string;
    sizeGB: number;
    recommended: boolean;
}

interface InstallProgress {
    model: string;
    progress: string;
}

export function OllamaModelManager() {
    const [isInstalled, setIsInstalled] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [installedModels, setInstalledModels] = useState<OllamaModel[]>([]);
    const [recommendedModels, setRecommendedModels] = useState<ModelRecommendation[]>([]);
    const [systemRAM, setSystemRAM] = useState(0);
    const [loading, setLoading] = useState(true);
    const [installing, setInstalling] = useState<string | null>(null);
    const [installProgress, setInstallProgress] = useState<InstallProgress | null>(null);

    const ipcClient = IpcClient.getInstance();

    useEffect(() => {
        checkOllamaStatus();
        loadModels();

        // Listen for install progress
        window.electron.ipcRenderer.on("ollama:install-progress", (data: InstallProgress) => {
            setInstallProgress(data);
        });

        return () => {
            window.electron.ipcRenderer.removeAllListeners("ollama:install-progress");
        };
    }, []);

    const checkOllamaStatus = async () => {
        try {
            const installed = await window.electron.ipcRenderer.invoke("ollama:check-installed");
            setIsInstalled(installed);

            if (installed) {
                const running = await window.electron.ipcRenderer.invoke("ollama:check-running");
                setIsRunning(running);

                if (!running) {
                    // Auto-start Ollama if installed but not running
                    await window.electron.ipcRenderer.invoke("ollama:start-service");
                    setIsRunning(true);
                }
            }
        } catch (error) {
            console.error("Error checking Ollama status:", error);
        }
    };

    const loadModels = async () => {
        setLoading(true);
        try {
            const ram = await window.electron.ipcRenderer.invoke("ollama:get-system-ram");
            setSystemRAM(ram);

            const recommended = await window.electron.ipcRenderer.invoke("ollama:get-recommended-models");
            setRecommendedModels(recommended);

            if (isRunning) {
                const installed = await window.electron.ipcRenderer.invoke("ollama:get-installed-models");
                setInstalledModels(installed);
            }
        } catch (error) {
            console.error("Error loading models:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInstallModel = async (modelName: string) => {
        setInstalling(modelName);
        setInstallProgress(null);

        try {
            const result = await window.electron.ipcRenderer.invoke("ollama:install-model", modelName);

            if (result.success) {
                await loadModels(); // Refresh list
            } else {
                console.error("Installation failed:", result.error);
            }
        } catch (error) {
            console.error("Error installing model:", error);
        } finally {
            setInstalling(null);
            setInstallProgress(null);
        }
    };

    const handleDeleteModel = async (modelName: string) => {
        if (!confirm(`Are you sure you want to delete ${modelName}?`)) {
            return;
        }

        try {
            const result = await window.electron.ipcRenderer.invoke("ollama:delete-model", modelName);

            if (result.success) {
                await loadModels(); // Refresh list
            } else {
                console.error("Deletion failed:", result.error);
            }
        } catch (error) {
            console.error("Error deleting model:", error);
        }
    };

    const handleInstallPack = async () => {
        setInstalling("pack");
        setInstallProgress(null);

        try {
            const result = await window.electron.ipcRenderer.invoke("ollama:install-model-pack");

            if (result.success) {
                await loadModels(); // Refresh list
            } else {
                console.error("Pack installation failed:", result.error);
            }
        } catch (error) {
            console.error("Error installing pack:", error);
        } finally {
            setInstalling(null);
            setInstallProgress(null);
        }
    };

    const isModelInstalled = (modelName: string) => {
        return installedModels.some((m) => m.name === modelName);
    };

    const formatSize = (bytes: number) => {
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
    };

    if (!isInstalled) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Ollama Not Installed</CardTitle>
                    <CardDescription>
                        Ollama is required for local AI features
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Please install Ollama from{" "}
                            <a
                                href="https://ollama.com/download"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                ollama.com/download
                            </a>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Status Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Ollama Status
                        {isRunning ? (
                            <Badge variant="default" className="bg-green-500">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Running
                            </Badge>
                        ) : (
                            <Badge variant="destructive">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Not Running
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Cpu className="h-4 w-4" />
                        <span>System RAM: {systemRAM}GB</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <HardDrive className="h-4 w-4" />
                        <span>Installed Models: {installedModels.length}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Install Progress */}
            {installProgress && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Installing {installProgress.model}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={undefined} className="w-full" />
                        <p className="text-xs text-muted-foreground mt-2">
                            {installProgress.progress}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Quick Install Pack */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Setup</CardTitle>
                    <CardDescription>
                        Install recommended models for your system ({systemRAM}GB RAM)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={handleInstallPack}
                        disabled={installing !== null}
                        className="w-full"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {installing === "pack" ? "Installing..." : "Install AI Model Pack"}
                    </Button>
                </CardContent>
            </Card>

            {/* Installed Models */}
            {installedModels.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Installed Models</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {installedModels.map((model) => (
                            <div
                                key={model.name}
                                className="flex items-center justify-between p-3 border rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">{model.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatSize(model.size)}
                                    </p>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteModel(model.name)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Available Models */}
            <Card>
                <CardHeader>
                    <CardTitle>Available Models</CardTitle>
                    <CardDescription>
                        Install models for different tasks
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recommendedModels.map((model) => {
                        const installed = isModelInstalled(model.name);

                        return (
                            <div
                                key={model.name}
                                className={`p-4 border rounded-lg ${model.recommended ? "border-primary" : ""}`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium">{model.displayName}</h3>
                                            {model.recommended && (
                                                <Badge variant="default" className="text-xs">
                                                    Recommended
                                                </Badge>
                                            )}
                                            {installed && (
                                                <Badge variant="secondary" className="text-xs">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Installed
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {model.bestFor}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="text-xs text-muted-foreground space-x-4">
                                        <span>RAM: {model.ramNeeded}</span>
                                        <span>Size: {model.sizeGB}GB</span>
                                    </div>

                                    {!installed && (
                                        <Button
                                            size="sm"
                                            onClick={() => handleInstallModel(model.name)}
                                            disabled={installing !== null}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            {installing === model.name ? "Installing..." : "Install"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}
