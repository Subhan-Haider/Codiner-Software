import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IpcClient } from "@/ipc/ipc_client";
import { showSuccess, showError } from "@/lib/toast";
import { Loader2, Globe, ExternalLink, RefreshCw, Key, LogOut, Check } from "lucide-react";
import { VercelDeployment, VercelProject } from "@/ipc/ipc_types";
import { useSettings } from "@/hooks/useSettings";

interface VercelIntegrationDialogProps {
    appId: number;
    appName: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    currentProjectId: string | null;
}

export function VercelIntegrationDialog({
    appId,
    appName,
    isOpen,
    onOpenChange,
    currentProjectId,
}: VercelIntegrationDialogProps) {
    const { settings, refreshSettings } = useSettings();
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingToken, setIsSavingToken] = useState(false);
    const [token, setToken] = useState("");
    const [deployments, setDeployments] = useState<VercelDeployment[]>([]);
    const [availableProjects, setAvailableProjects] = useState<VercelProject[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [newProjectName, setNewProjectName] = useState(appName);
    const [view, setView] = useState<"auth" | "projects" | "status">("auth");
    const [isDeploying, setIsDeploying] = useState(false);

    const handleDeploy = async () => {
        try {
            setIsDeploying(true);
            const url = await IpcClient.getInstance().deployToVercel({ appId });
            showSuccess(`Deployment started! Live URL: ${url}`);
            // Wait a moment for Vercel to register it
            setTimeout(() => {
                loadDeployments();
            }, 2000);
        } catch (error) {
            console.error("Deploy failed:", error);
            showError(error);
        } finally {
            setIsDeploying(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            if (!settings?.vercelAccessToken?.value) {
                setView("auth");
            } else if (currentProjectId) {
                setView("status");
                loadDeployments();
            } else {
                setView("projects");
                loadProjects();
            }
        }
    }, [isOpen, settings?.vercelAccessToken?.value, currentProjectId]);

    const loadDeployments = async () => {
        try {
            setIsLoading(true);
            const data = await IpcClient.getInstance().getVercelDeployments({ appId });
            setDeployments(data);
        } catch (error) {
            console.error("Failed to load Vercel deployments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadProjects = async () => {
        try {
            setIsLoading(true);
            const data = await IpcClient.getInstance().listVercelProjects();
            setAvailableProjects(data);
        } catch (error) {
            console.error("Failed to load Vercel projects:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveToken = async () => {
        try {
            setIsSavingToken(true);
            await IpcClient.getInstance().saveVercelAccessToken({ token });
            await refreshSettings();
            showSuccess("Vercel token saved successfully");
            setToken("");
        } catch (error) {
            showError(error);
        } finally {
            setIsSavingToken(false);
        }
    };

    const handleCreateProject = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().createVercelProject({
                appId,
                name: newProjectName,
            });
            showSuccess(`Vercel project "${newProjectName}" created!`);
            setView("status");
            loadDeployments();
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectProject = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().connectToExistingVercelProject({
                appId,
                projectId: selectedProjectId,
            });
            showSuccess("Connected to Vercel project");
            setView("status");
            loadDeployments();
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().disconnectVercelProject({ appId });
            showSuccess("Disconnected Vercel project");
            setView("projects");
            loadProjects();
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (state: string) => {
        switch (state.toLowerCase()) {
            case "ready": return "bg-emerald-500";
            case "error": return "bg-red-500";
            case "building": return "bg-blue-500";
            default: return "bg-gray-400";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                            <Globe className="w-5 h-5 text-white" />
                        </div>
                        <DialogTitle>Vercel Deployment</DialogTitle>
                    </div>
                    <DialogDescription>
                        Deploy your application to Vercel's edge network.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {view === "auth" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="space-y-2">
                                <Label>Vercel Access Token</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="password"
                                        placeholder="Enter your Vercel token"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                    <Button onClick={handleSaveToken} disabled={isSavingToken || !token}>
                                        {isSavingToken ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4 mr-2" />}
                                        Save
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Generate a token in your <a href="https://vercel.com/account/tokens" target="_blank" className="text-primary hover:underline">Vercel settings</a>.
                                </p>
                            </div>
                        </div>
                    )}

                    {view === "projects" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <div className="space-y-3">
                                <Label>Create New Project</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Project Name"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                    />
                                    <Button onClick={handleCreateProject} disabled={isLoading || !newProjectName}>
                                        Create
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground">
                                    Creates a new project on Vercel for your files.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or connect existing</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Select Project</Label>
                                <div className="flex gap-2">
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={selectedProjectId}
                                        onChange={(e) => setSelectedProjectId(e.target.value)}
                                    >
                                        <option value="">Choose a project...</option>
                                        {availableProjects.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                    <Button variant="outline" onClick={handleConnectProject} disabled={isLoading || !selectedProjectId}>
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === "status" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                            <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-sm">Deployment Status</h3>
                                    <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-medium border border-green-500/20">
                                        Connected
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-11 bg-black hover:bg-black/90 text-white font-bold shadow-lg shadow-black/10 transition-all"
                                    onClick={handleDeploy}
                                    disabled={isDeploying}
                                >
                                    {isDeploying ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Globe className="w-4 h-4 mr-2" />
                                            Publish Now
                                        </>
                                    )}
                                </Button>
                                <p className="text-[10px] text-center text-muted-foreground">
                                    Uploads your local files directly to Vercel (Production)
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</h4>
                                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={loadDeployments} disabled={isLoading}>
                                        <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {deployments.length > 0 ? (
                                        deployments.map(deploy => (
                                            <div key={deploy.uid} className="p-2.5 rounded-lg border border-border flex items-center justify-between hover:bg-muted/30 transition-colors group">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(deploy.state)}`} />
                                                        <span className="font-medium text-xs truncate max-w-[200px] text-foreground/90">{deploy.url}</span>
                                                    </div>
                                                </div>
                                                <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => IpcClient.getInstance().openExternalUrl(`https://${deploy.url}`)}>
                                                    <ExternalLink className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-6 border border-dashed rounded-lg">
                                            <p className="text-xs text-muted-foreground">No deployments yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 h-8 text-xs" onClick={handleDisconnect}>
                                <LogOut className="w-3 h-3 mr-2" />
                                Disconnect Project
                            </Button>
                        </div>
                    )}
                </div>

                <DialogFooter className="pt-4 border-t border-border flex justify-between items-center w-full">
                    {settings?.vercelAccessToken?.value && view !== "auth" && (
                        <Button variant="link" size="sm" className="text-xs text-muted-foreground" onClick={() => setView("auth")}>
                            Change Token
                        </Button>
                    )}
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
