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
import { Flame, Loader2, Save, Trash2, ExternalLink, ShieldCheck, LogIn, LogOut, Terminal, CheckCircle2, AlertCircle } from "lucide-react";
import { App } from "@/ipc/ipc_types";

interface FirebaseIntegrationDialogProps {
    appId: number;
    appName: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    currentProjectId: string | null;
}

export function FirebaseIntegrationDialog({
    appId,
    appName,
    isOpen,
    onOpenChange,
    currentProjectId,
}: FirebaseIntegrationDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [projectId, setProjectId] = useState(currentProjectId || "");
    const [isSaving, setIsSaving] = useState(false);
    const [firebaseStatus, setFirebaseStatus] = useState<{
        installed: boolean;
        loggedIn: boolean;
        email?: string | null;
    } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setProjectId(currentProjectId || "");
            checkFirebaseStatus();
        }
    }, [isOpen, currentProjectId]);

    const checkFirebaseStatus = async () => {
        try {
            const installed = await IpcClient.getInstance().isFirebaseInstalled();
            if (installed) {
                const auth = await IpcClient.getInstance().getFirebaseAuthState();
                setFirebaseStatus({ installed: true, loggedIn: auth.loggedIn, email: auth.email });
            } else {
                setFirebaseStatus({ installed: false, loggedIn: false });
            }
        } catch (error) {
            console.error("Failed to check Firebase status:", error);
        }
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().firebaseLogin();
            await checkFirebaseStatus();
            showSuccess("Logged in successfully");
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await IpcClient.getInstance().firebaseLogout();
            await checkFirebaseStatus();
            showSuccess("Logged out successfully");
        } catch (error) {
            showError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!projectId.trim()) {
            showError("Project ID is required");
            return;
        }

        try {
            setIsSaving(true);
            // Use the same update-app-config channel
            await IpcClient.getInstance().updateAppConfig(appId, {
                firebaseProjectId: projectId.trim(),
            });

            if (firebaseStatus && !firebaseStatus.loggedIn) {
                showSuccess("Project ID saved. Please login to complete setup.");
                // Do not close the dialog so they can login
            } else {
                showSuccess("Firebase configuration updated");
                onOpenChange(false);
            }
        } catch (error) {
            console.error("Firebase update failed:", error);
            showError(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setIsSaving(true);
            await IpcClient.getInstance().updateAppConfig(appId, {
                firebaseProjectId: null,
            });
            showSuccess("Firebase disconnected");
            setProjectId("");
            onOpenChange(false);
        } catch (error) {
            showError(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-[#FFCA28]" />
                        </div>
                        <div>
                            <DialogTitle>Firebase Integration</DialogTitle>
                            <DialogDescription>
                                Connect your app to Google Firebase services.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firebase-project-id" className="text-sm font-bold">
                                Firebase Project ID
                            </Label>
                            <Input
                                id="firebase-project-id"
                                placeholder="my-awesome-app-123"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                className="h-11 bg-muted/50 border-orange-500/20 focus-visible:ring-orange-500"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                You can find this in your <a href="https://console.firebase.google.com/" target="_blank" className="text-orange-600 hover:underline inline-flex items-center gap-0.5">Firebase Console <ExternalLink className="w-2 h-2" /></a> under Project Settings.
                            </p>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Label className="text-sm font-bold flex items-center gap-2">
                                <Terminal className="w-4 h-4" /> Firebase CLI Status
                            </Label>

                            {!firebaseStatus ? (
                                <div className="flex items-center gap-2 text-muted-foreground text-xs animate-pulse">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking status...
                                </div>
                            ) : !firebaseStatus.installed ? (
                                <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 space-y-2">
                                    <div className="flex items-center gap-2 text-red-600 text-[11px] font-bold">
                                        <AlertCircle className="w-3.5 h-3.5" /> Firebase Tool Not Installed
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                                        Run <code className="bg-red-500/10 px-1 rounded">npm install -g firebase-tools</code> in your terminal to enable full AI control.
                                    </p>
                                </div>
                            ) : (
                                <div className="p-3 rounded-lg border border-orange-500/20 bg-orange-500/5 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[11px] font-bold">
                                            {firebaseStatus.loggedIn ? (
                                                <>
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                    <span className="text-green-700">Authenticated</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                                                    <span className="text-orange-700">Not Authenticated</span>
                                                </>
                                            )}
                                        </div>
                                        {firebaseStatus.email && (
                                            <p className="text-[10px] text-muted-foreground ml-5">
                                                {firebaseStatus.email}
                                            </p>
                                        )}
                                    </div>

                                    {firebaseStatus.loggedIn ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 text-[10px] font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                            onClick={handleLogout}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <LogOut className="w-3 h-3 mr-1.5" />}
                                            Logout
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-8 text-[10px] font-bold bg-[#FFCA28]/10 text-orange-700 hover:bg-[#FFCA28]/20 border border-orange-200"
                                            onClick={handleLogin}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> : <LogIn className="w-3 h-3 mr-1.5" />}
                                            Login
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 space-y-2">
                            <h4 className="text-xs font-bold text-orange-700 flex items-center gap-1.5 uppercase tracking-wider">
                                <ShieldCheck className="w-3.5 h-3.5" /> Security Note
                            </h4>
                            <p className="text-[11px] text-orange-800/80 leading-relaxed">
                                This Project ID is used to configure your application's connection to Firebase.
                                Make sure to also add your API keys to the <span className="font-bold">Environment Variables</span> section for full functionality.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    {currentProjectId && (
                        <Button
                            variant="ghost"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold"
                            onClick={handleDisconnect}
                            disabled={isSaving}
                        >
                            Disconnect
                        </Button>
                    )}
                    <div className="flex-1" />
                    <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isSaving} className="font-bold">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-[#FFCA28] text-black hover:bg-[#FFC107] font-bold shadow-lg shadow-orange-500/10"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Configuration
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
