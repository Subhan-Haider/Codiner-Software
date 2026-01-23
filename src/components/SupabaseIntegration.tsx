
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { showSuccess, showError } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, Save, Trash2, Eye, EyeOff } from "lucide-react";

export function SupabaseIntegration() {
    const { settings, updateSettings } = useSettings();
    const [isEditing, setIsEditing] = useState(false);
    const [showKeys, setShowKeys] = useState(false);
    const [config, setConfig] = useState({
        url: settings?.supabase?.projectUrl || "",
        anonKey: settings?.supabase?.anonKey?.value || "",
        serviceRoleKey: settings?.supabase?.serviceRoleKey?.value || "",
    });

    const handleSave = async () => {
        try {
            await updateSettings({
                supabase: {
                    projectUrl: config.url,
                    anonKey: { value: config.anonKey },
                    serviceRoleKey: config.serviceRoleKey ? { value: config.serviceRoleKey } : undefined,
                },
            });
            setIsEditing(false);
            showSuccess("Supabase configuration saved");
        } catch (e) {
            showError("Failed to save Supabase configuration");
        }
    };

    const handleClear = async () => {
        try {
            await updateSettings({ supabase: undefined });
            setConfig({ url: "", anonKey: "", serviceRoleKey: "" });
            showSuccess("Supabase configuration cleared");
        } catch (e) {
            showError("Failed to clear Supabase configuration");
        }
    };

    const hasConfig = !!settings?.supabase?.projectUrl;

    return (
        <div className="flex flex-col space-y-4 p-6 md:p-8 bg-emerald-500/5 rounded-[2rem] md:rounded-3xl border border-emerald-500/10 transition-all hover:bg-emerald-500/10">
            <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-emerald-500/10">
                    <Database className="h-6 w-6 md:h-8 md:w-8 text-[#3ECF8E]" />
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-black tracking-tight leading-none text-emerald-600 dark:text-emerald-400">
                        Supabase
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                        Open Source Firebase Alternative
                    </p>
                </div>
            </div>

            {!isEditing && !hasConfig ? (
                <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground font-medium max-w-sm">
                        Connect your Supabase project for PostgreSQL database, Auth, and Edge Functions.
                    </p>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="h-12 px-6 rounded-xl font-bold bg-[#3ECF8E] text-white hover:bg-[#34b27b] shadow-lg shadow-emerald-500/10"
                    >
                        Connect
                    </Button>
                </div>
            ) : (
                <div className="space-y-4 w-full max-w-md">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Project URL</Label>
                            <Input
                                value={config.url}
                                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                                placeholder="https://xyz.supabase.co"
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Anon Key (Public)</Label>
                                <Button variant="ghost" size="sm" className="h-4 p-0 text-xs text-muted-foreground" onClick={() => setShowKeys(!showKeys)}>
                                    {showKeys ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
                                    {showKeys ? "Hide" : "Show"}
                                </Button>
                            </div>
                            <Input
                                type={showKeys ? "text" : "password"}
                                value={config.anonKey}
                                onChange={(e) => setConfig({ ...config, anonKey: e.target.value })}
                                placeholder="eyJh..."
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Service Role Key (Optional - for Admin tasks)</Label>
                            <Input
                                type={showKeys ? "text" : "password"}
                                value={config.serviceRoleKey}
                                onChange={(e) => setConfig({ ...config, serviceRoleKey: e.target.value })}
                                placeholder="eyJh..."
                                className="bg-background/50"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button onClick={handleSave} className="flex-1 gap-2 font-bold">
                            <Save className="h-4 w-4" /> Connect
                        </Button>
                        {hasConfig && (
                            <Button onClick={handleClear} variant="destructive" size="icon" className="rounded-xl">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                        <Button onClick={() => setIsEditing(false)} variant="ghost" className="font-bold">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {hasConfig && !isEditing && (
                <div className="flex items-center justify-between bg-background/50 p-4 rounded-xl border border-emerald-500/10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Connected Project</span>
                        <span className="font-mono font-bold text-emerald-500 truncate max-w-[200px]">{settings?.supabase?.projectUrl}</span>
                    </div>
                    <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" className="h-8">
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
}
