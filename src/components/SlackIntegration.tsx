
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { showSuccess, showError } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, Save, Trash2, Send } from "lucide-react";

export function SlackIntegration() {
    const { settings, updateSettings } = useSettings();
    const [isEditing, setIsEditing] = useState(false);
    const [config, setConfig] = useState({
        webhookUrl: settings?.slack?.webhookUrl?.value || "",
        channel: settings?.slack?.channel || "",
    });

    const handleSave = async () => {
        try {
            await updateSettings({
                slack: {
                    webhookUrl: { value: config.webhookUrl },
                    channel: config.channel,
                },
            });
            setIsEditing(false);
            showSuccess("Slack configuration saved");
        } catch (e) {
            showError("Failed to save Slack configuration");
        }
    };

    const handleClear = async () => {
        try {
            await updateSettings({ slack: undefined });
            setConfig({ webhookUrl: "", channel: "" });
            showSuccess("Slack configuration cleared");
        } catch (e) {
            showError("Failed to clear Slack configuration");
        }
    };

    const hasConfig = !!settings?.slack?.webhookUrl?.value;

    return (
        <div className="flex flex-col space-y-4 p-6 md:p-8 bg-purple-500/5 rounded-[2rem] md:rounded-3xl border border-purple-500/10 transition-all hover:bg-purple-500/10">
            <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-purple-500/10">
                    <Hash className="h-6 w-6 md:h-8 md:w-8 text-[#4A154B] dark:text-[#E01E5A]" />
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-black tracking-tight leading-none text-purple-900 dark:text-purple-400">
                        Slack
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                        Automated Notifications & Alerts
                    </p>
                </div>
            </div>

            {!isEditing && !hasConfig ? (
                <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground font-medium max-w-sm">
                        Receive build status, deployment notifications, and AI alerts directly in your Slack workspace.
                    </p>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="h-12 px-6 rounded-xl font-bold bg-[#4A154B] text-white hover:bg-[#360e36] shadow-lg shadow-purple-500/10"
                    >
                        Connect
                    </Button>
                </div>
            ) : (
                <div className="space-y-4 w-full max-w-md">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Webhook URL</Label>
                            <Input
                                type="password"
                                value={config.webhookUrl}
                                onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                                placeholder="https://hooks.slack.com/services/..."
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Channel (Optional)</Label>
                            <Input
                                value={config.channel}
                                onChange={(e) => setConfig({ ...config, channel: e.target.value })}
                                placeholder="#deployments"
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
                <div className="flex items-center justify-between bg-background/50 p-4 rounded-xl border border-purple-500/10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Webhook</span>
                        <span className="font-mono font-bold text-purple-500 truncate max-w-[200px]">configured</span>
                    </div>
                    <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" className="h-8">
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
}
