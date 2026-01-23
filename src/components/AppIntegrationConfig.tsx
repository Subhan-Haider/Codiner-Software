import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { useLoadApps } from "@/hooks/useLoadApps";

interface AppIntegrationConfigProps {
    appId: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    fieldName: string;
    label: string;
    placeholder: string;
    initialValue: string | null;
}

export function AppIntegrationConfig({
    appId,
    isOpen,
    onOpenChange,
    title,
    description,
    fieldName,
    label,
    placeholder,
    initialValue,
}: AppIntegrationConfigProps) {
    const [value, setValue] = useState(initialValue || "");
    const [isSaving, setIsSaving] = useState(false);
    const { refreshApps } = useLoadApps();

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await IpcClient.getInstance().updateAppConfig(appId, {
                [fieldName]: value,
            });
            await refreshApps();
            showSuccess(`${title} configuration updated`);
            onOpenChange(false);
        } catch (error) {
            showError(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="config-value">{label}</Label>
                        <Input
                            id="config-value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
