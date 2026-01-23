
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { showSuccess, showError } from "@/lib/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Save, Trash2 } from "lucide-react";

export function FirebaseIntegration() {
    const { settings, updateSettings } = useSettings();
    const [isEditing, setIsEditing] = useState(false);
    const [config, setConfig] = useState({
        apiKey: settings?.firebase?.apiKey?.value || "",
        authDomain: settings?.firebase?.authDomain || "",
        projectId: settings?.firebase?.projectId || "",
        storageBucket: settings?.firebase?.storageBucket || "",
        messagingSenderId: settings?.firebase?.messagingSenderId || "",
        appId: settings?.firebase?.appId || "",
    });

    const handleSave = async () => {
        try {
            await updateSettings({
                firebase: {
                    apiKey: { value: config.apiKey },
                    authDomain: config.authDomain,
                    projectId: config.projectId,
                    storageBucket: config.storageBucket,
                    messagingSenderId: config.messagingSenderId,
                    appId: config.appId,
                },
            });
            setIsEditing(false);
            showSuccess("Firebase configuration saved");
        } catch (e) {
            showError("Failed to save Firebase configuration");
        }
    };

    const handleClear = async () => {
        try {
            await updateSettings({ firebase: undefined });
            setConfig({
                apiKey: "",
                authDomain: "",
                projectId: "",
                storageBucket: "",
                messagingSenderId: "",
                appId: "",
            });
            showSuccess("Firebase configuration cleared");
        } catch (e) {
            showError("Failed to clear Firebase configuration");
        }
    };

    const hasConfig = !!settings?.firebase?.projectId;

    return (
        <div className="flex flex-col space-y-4 p-6 md:p-8 bg-orange-500/5 rounded-[2rem] md:rounded-3xl border border-orange-500/10 transition-all hover:bg-orange-500/10">
            <div className="flex items-center gap-4">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-orange-500/10">
                    <Flame className="h-6 w-6 md:h-8 md:w-8 text-[#FFCA28]" />
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-black tracking-tight leading-none text-orange-600 dark:text-orange-400">
                        Firebase
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                        Backend-as-a-Service Platform
                    </p>
                </div>
            </div>

            {!isEditing && !hasConfig ? (
                <div className="space-y-4">
                    <p className="text-sm md:text-base text-muted-foreground font-medium max-w-sm">
                        Connect your Firebase project to enable authentication, database, and storage features.
                    </p>
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="h-12 px-6 rounded-xl font-bold bg-[#FFCA28] text-black hover:bg-[#FFC107] shadow-lg shadow-orange-500/10"
                    >
                        Connect
                    </Button>
                </div>
            ) : (
                <div className="space-y-4 w-full max-w-md">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Project ID</Label>
                            <Input
                                value={config.projectId}
                                onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                                placeholder="my-project-id"
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>API Key</Label>
                            <Input
                                type="password"
                                value={config.apiKey}
                                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                                placeholder="AIza..."
                                className="bg-background/50"
                            />
                        </div>
                        {/* Extended fields can be added here if needed, keeping it simple for now */}
                        <div className="space-y-2">
                            <Label>Auth Domain (Optional)</Label>
                            <Input
                                value={config.authDomain}
                                onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                                placeholder="my-project.firebaseapp.com"
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
                <div className="flex items-center justify-between bg-background/50 p-4 rounded-xl border border-orange-500/10">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Connected Project</span>
                        <span className="font-mono font-bold text-orange-500">{settings?.firebase?.projectId}</span>
                    </div>
                    <Button onClick={() => setIsEditing(true)} size="sm" variant="outline" className="h-8">
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
}
