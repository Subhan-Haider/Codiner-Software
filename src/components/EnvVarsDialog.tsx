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
import { Loader2, Plus, Trash2, ShieldAlert } from "lucide-react";
import { EnvVar } from "@/ipc/ipc_types";

interface EnvVarsDialogProps {
    appId: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EnvVarsDialog({
    appId,
    isOpen,
    onOpenChange,
}: EnvVarsDialogProps) {
    const [envVars, setEnvVars] = useState<EnvVar[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadEnvVars();
        }
    }, [isOpen]);

    const loadEnvVars = async () => {
        try {
            setIsLoading(true);
            const vars = await IpcClient.getInstance().getAppEnvVars({ appId });
            setEnvVars(vars.length > 0 ? vars : [{ key: "", value: "" }]);
        } catch (error) {
            showError("Failed to load environment variables");
            setEnvVars([{ key: "", value: "" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddRow = () => {
        setEnvVars([...envVars, { key: "", value: "" }]);
    };

    const handleRemoveRow = (index: number) => {
        const newVars = [...envVars];
        newVars.splice(index, 1);
        setEnvVars(newVars.length > 0 ? newVars : [{ key: "", value: "" }]);
    };

    const handleChange = (index: number, field: keyof EnvVar, value: string) => {
        const newVars = [...envVars];
        newVars[index][field] = value;
        setEnvVars(newVars);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            // Filter out empty keys
            const varsToSave = envVars.filter(v => v.key.trim() !== "");
            await IpcClient.getInstance().setAppEnvVars({ appId, envVars: varsToSave });
            showSuccess("Environment variables updated successfully");
            onOpenChange(false);
        } catch (error) {
            showError(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col p-6">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <DialogTitle>Environment Variables</DialogTitle>
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                    </div>
                    <DialogDescription>
                        Manage sensitive environment variables for this app. These are stored in a local .env file.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto my-4 pr-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-[1fr,1fr,40px] gap-4 mb-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key</Label>
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Value</Label>
                                <div></div>
                            </div>
                            {envVars.map((v, index) => (
                                <div key={index} className="grid grid-cols-[1fr,1fr,40px] gap-4 items-center animate-in fade-in slide-in-from-top-1">
                                    <Input
                                        placeholder="VARIABLE_NAME"
                                        value={v.key}
                                        onChange={(e) => handleChange(index, "key", e.target.value)}
                                        className="font-mono text-sm"
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Value"
                                        value={v.value}
                                        onChange={(e) => handleChange(index, "value", e.target.value)}
                                        className="font-mono text-sm"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveRow(index)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddRow}
                                className="w-full mt-2 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Variable
                            </Button>
                        </div>
                    )}
                </div>

                <DialogFooter className="pt-4 border-t border-border">
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving || isLoading}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Variables
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
