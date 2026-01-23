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
import { Loader2, Database, ExternalLink, RefreshCw, Plus, Check } from "lucide-react";
import { GetNeonProjectResponse, NeonProject } from "@/ipc/ipc_types";

interface NeonIntegrationDialogProps {
    appId: number;
    appName: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    currentProjectId: string | null;
}

export function NeonIntegrationDialog({
    appId,
    appName,
    isOpen,
    onOpenChange,
    currentProjectId,
}: NeonIntegrationDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [projectInfo, setProjectInfo] = useState<GetNeonProjectResponse | null>(null);
    const [newProjectName, setNewProjectName] = useState(appName);
    const [connectProjectId, setConnectProjectId] = useState("");

    useEffect(() => {
        if (isOpen && currentProjectId) {
            loadProjectInfo();
        }
    }, [isOpen, currentProjectId]);

    const loadProjectInfo = async () => {
        try {
            setIsLoading(true);
            const info = await IpcClient.getInstance().getNeonProject({ appId });
            setProjectInfo(info);
        } catch (error) {
            console.error("Failed to load Neon project info:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateProject = async () => {
        try {
            setIsCreating(true);
            const project = await IpcClient.getInstance().createNeonProject({
                appId,
                name: newProjectName,
            });
            showSuccess(`Neon project "${project.name}" created!`);
            loadProjectInfo();
        } catch (error) {
            showError(error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleConnectProject = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().updateAppConfig(appId, {
                neonProjectId: connectProjectId,
            });
            showSuccess("Connected to Neon project");
            loadProjectInfo();
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Database className="w-5 h-5 text-emerald-600" />
                        </div>
                        <DialogTitle>Neon PostgreSQL</DialogTitle>
                    </div>
                    <DialogDescription>
                        Serverless Postgres database with instant branching.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {projectInfo ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Project Name</p>
                                        <p className="font-semibold text-lg">{projectInfo.projectName}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={loadProjectInfo} disabled={isLoading}>
                                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => IpcClient.getInstance().openExternalUrl(`https://console.neon.tech/app/projects/${projectInfo.projectId}`)}>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Project ID</p>
                                    <p className="font-mono text-sm bg-white/50 px-2 py-1 rounded inline-block border border-emerald-100/50">{projectInfo.projectId}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Branches</p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {projectInfo.branches.map(branch => (
                                            <div key={branch.branchId} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white border border-emerald-100 text-xs text-emerald-800">
                                                <div className={`w-1.5 h-1.5 rounded-full ${branch.type === 'production' ? 'bg-emerald-500' : 'bg-blue-400'}`} />
                                                {branch.branchName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full text-destructive hover:text-destructive hover:bg-destructive/5" onClick={() => {
                                IpcClient.getInstance().updateAppConfig(appId, { neonProjectId: null });
                                setProjectInfo(null);
                            }}>
                                Disconnect Project
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Create New Project</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Project Name"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        disabled={isCreating}
                                    />
                                    <Button onClick={handleCreateProject} disabled={isCreating || !newProjectName}>
                                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                        Create
                                    </Button>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">
                                    * This will create a new serverless Postgres instance in your Neon account.
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
                                <Label>Project ID</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="epic-mountain-123456"
                                        value={connectProjectId}
                                        onChange={(e) => setConnectProjectId(e.target.value)}
                                    />
                                    <Button variant="outline" onClick={handleConnectProject} disabled={isLoading || !connectProjectId}>
                                        <Check className="w-4 h-4 mr-2" />
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="pt-4 border-t border-border">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
