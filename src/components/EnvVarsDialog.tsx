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
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IpcClient } from "@/ipc/ipc_client";
import { showSuccess, showError } from "@/lib/toast";
import {
    Loader2,
    Plus,
    Trash2,
    ShieldAlert,
    FileText,
    Edit3,
    Search,
    RefreshCw,
    Zap,
    Download,
    Copy,
    ChevronDown,
    Terminal
} from "lucide-react";
import { EnvVar } from "@/ipc/ipc_types";
import { cn } from "@/lib/utils";

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
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [bulkValue, setBulkValue] = useState("");
    const [isDiscovering, setIsDiscovering] = useState(false);
    const [useExportPrefix, setUseExportPrefix] = useState(false);

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

            // Sync bulk value
            setBulkValue(serializeVars(vars, useExportPrefix));
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

    // Parse bulk text to EnvVar array
    const parseBulk = (text: string): EnvVar[] => {
        return text.split("\n")
            .filter(line => line.trim() && !line.trim().startsWith("#") && line.includes("="))
            .map(line => {
                let cleanLine = line.trim();
                if (cleanLine.startsWith("export ")) {
                    cleanLine = cleanLine.substring(7).trim();
                }
                const [key, ...rest] = cleanLine.split("=");
                return { key: key.trim(), value: rest.join("=").trim() };
            });
    };

    // Serialize EnvVar array to bulk text
    const serializeVars = (vars: EnvVar[], useExport: boolean): string => {
        const prefix = useExport ? "export " : "";
        return vars
            .filter(v => v.key.trim())
            .map(v => `${prefix}${v.key}=${v.value}`)
            .join("\n");
    };

    const toggleBulkMode = () => {
        if (isBulkMode) {
            // Switching from Bulk to Table
            setEnvVars(parseBulk(bulkValue));
        } else {
            // Switching from Table to Bulk
            setBulkValue(serializeVars(envVars, useExportPrefix));
        }
        setIsBulkMode(!isBulkMode);
    };

    const handleToggleExportPrefix = () => {
        const newValue = !useExportPrefix;
        setUseExportPrefix(newValue);
        if (isBulkMode) {
            const currentVars = parseBulk(bulkValue);
            setBulkValue(serializeVars(currentVars, newValue));
        }
    };

    const handleDiscover = async () => {
        try {
            setIsDiscovering(true);
            const { discoveredKeys } = await IpcClient.getInstance().discoverAppEnvVars({ appId });

            const existingKeys = new Set(envVars.map(v => v.key));
            const newKeys = discoveredKeys.filter(k => !existingKeys.has(k));

            if (newKeys.length === 0) {
                showSuccess("All environment variables from code are already configured.");
                return;
            }

            const discoveredVars = newKeys.map(k => ({ key: k, value: "" }));
            const updatedVars = [...envVars.filter(v => v.key !== ""), ...discoveredVars];
            setEnvVars(updatedVars);

            // Update bulk value too if in bulk mode
            if (isBulkMode) {
                setBulkValue(serializeVars(updatedVars, useExportPrefix));
            }

            showSuccess(`Smart Discovery found ${newKeys.length} new variables used in your code.`);
        } catch (error) {
            showError("Failed to auto-discover environment variables from codebase.");
        } finally {
            setIsDiscovering(false);
        }
    };

    const handleCopy = (useExport: boolean) => {
        const text = serializeVars(envVars, useExport);
        navigator.clipboard.writeText(text);
        showSuccess(useExport ? "Copied as shell script (with export)" : "Copied to clipboard");
    };

    const handleDownload = () => {
        const text = serializeVars(envVars, useExportPrefix);
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ".env.local";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showSuccess(".env.local file downloaded");
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            let varsToSave: EnvVar[];

            if (isBulkMode) {
                varsToSave = parseBulk(bulkValue);
            } else {
                varsToSave = envVars.filter(v => v.key.trim() !== "");
            }

            await IpcClient.getInstance().setAppEnvVars({ appId, envVars: varsToSave });
            showSuccess("Environment variables saved significantly.");
            onOpenChange(false);
        } catch (error) {
            showError(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[750px] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-background border-border shadow-2xl">
                <DialogHeader className="p-6 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <DialogTitle className="text-xl font-bold tracking-tight">App Environment Variables</DialogTitle>
                                <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
                            </div>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Securely manage your application's secrets and configurations.
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 gap-2">
                                        <Download className="w-3.5 h-3.5" />
                                        Export
                                        <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleCopy(false)} className="gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy as .env
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCopy(true)} className="gap-2">
                                        <Terminal className="w-4 h-4" />
                                        Copy as shell (export)
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleDownload} className="gap-2">
                                        <Download className="w-4 h-4" />
                                        Download .env.local
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDiscover}
                                disabled={isDiscovering || isLoading}
                                className="h-8 gap-2 bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
                            >
                                {isDiscovering ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                                Smart Discovery
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleBulkMode}
                                className="h-8 gap-2"
                            >
                                {isBulkMode ? <FileText className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                                {isBulkMode ? "Table View" : "Bulk Edit"}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 pt-4 min-h-[300px]">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-12 space-y-4">
                            <div className="relative">
                                <RefreshCw className="w-10 h-10 animate-spin text-blue-500/20" />
                                <Loader2 className="w-6 h-6 animate-spin text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <p className="text-sm text-muted-foreground animate-pulse">Accessing secure storage...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {isBulkMode ? (
                                <div className="space-y-2 animate-in fade-in duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Label className="text-sm font-semibold text-foreground">Raw Configuration</Label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleToggleExportPrefix}
                                                className={cn(
                                                    "h-6 px-2 text-[10px] font-mono transition-colors",
                                                    useExportPrefix ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" : "bg-muted text-muted-foreground"
                                                )}
                                            >
                                                {useExportPrefix ? "export ENABLED" : "export DISABLED"}
                                            </Button>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted font-mono">.env.local</span>
                                    </div>
                                    <Textarea
                                        value={bulkValue}
                                        onChange={(e) => setBulkValue(e.target.value)}
                                        placeholder="KEY=VALUE&#10;DATABASE_URL=postgres://...&#10;API_TOKEN=sk-..."
                                        className="min-h-[350px] font-mono text-sm resize-none bg-muted/30 focus-visible:ring-blue-500/50"
                                    />
                                    <p className="text-[11px] text-muted-foreground italic">
                                        * Lines starting with 'export' or '#' are handled automatically. Values will be parsed correctly.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    <div className="grid grid-cols-[1fr,1fr,40px] gap-4 px-1">
                                        <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">Parameter Key</Label>
                                        <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">Secret Value</Label>
                                        <div />
                                    </div>
                                    <div className="space-y-2.5">
                                        {envVars.map((v, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-[1fr,1fr,40px] gap-4 items-center group animate-in slide-in-from-left-2 duration-200"
                                                style={{ animationDelay: `${index * 30}ms` }}
                                            >
                                                <div className="relative">
                                                    <Input
                                                        placeholder="VARIABLE_NAME"
                                                        value={v.key}
                                                        onChange={(e) => handleChange(index, "key", e.target.value)}
                                                        className="font-mono text-xs h-9 bg-muted/20 border-transparent focus:bg-background focus:border-blue-500/50 shadow-none transition-all"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={v.value}
                                                        onChange={(e) => handleChange(index, "value", e.target.value)}
                                                        className="font-mono text-xs h-9 bg-muted/20 border-transparent focus:bg-background focus:border-blue-500/50 shadow-none transition-all"
                                                    />
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveRow(index)}
                                                    className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddRow}
                                        className="w-full h-10 mt-4 border-dashed border-2 bg-muted/5 hover:bg-blue-500/5 hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Define New Variable
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <DialogFooter className="p-6 bg-muted/30 border-t flex items-center justify-between sm:justify-between gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
                        <ShieldAlert className="w-3 h-3 text-amber-500" />
                        Credentials are encrypted and stored locally.
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={isSaving}
                            className="flex-1 sm:flex-none h-10 px-6"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || isLoading}
                            className="flex-1 sm:flex-none h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all font-semibold"
                        >
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Commit Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
