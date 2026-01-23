import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { IpcClient } from "@/ipc/ipc_client";
import { SecurityFinding } from "@/ipc/ipc_types";
import { ShieldCheck, AlertTriangle, Info, ShieldAlert, Loader2 } from "lucide-react";

interface SecurityAuditDialogProps {
    appId: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SecurityAuditDialog({ appId, isOpen, onOpenChange }: SecurityAuditDialogProps) {
    const [findings, setFindings] = useState<SecurityFinding[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            runAudit();
        }
    }, [isOpen]);

    const runAudit = async () => {
        try {
            setIsLoading(true);
            const results = await IpcClient.getInstance().runSecurityAudit(appId);
            setFindings(results);
        } catch (error) {
            console.error("Failed to run security audit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case "critical": return <ShieldAlert className="h-5 w-5 text-red-600" />;
            case "high": return <AlertTriangle className="h-5 w-5 text-orange-600" />;
            case "medium": return <Info className="h-5 w-5 text-yellow-600" />;
            default: return <ShieldCheck className="h-5 w-5 text-green-600" />;
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "critical": return "bg-red-50 border-red-200";
            case "high": return "bg-orange-50 border-orange-200";
            case "medium": return "bg-yellow-50 border-yellow-200";
            default: return "bg-green-50 border-green-200";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        Security & Privacy Audit
                    </DialogTitle>
                    <DialogDescription>
                        Automated scan for secrets, vulnerabilities, and best practices.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 max-h-[400px] overflow-y-auto space-y-3">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p>Scanning codebase...</p>
                        </div>
                    ) : findings.length > 0 ? (
                        findings.map((finding, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border ${getLevelColor(finding.level)} flex gap-3`}>
                                <div className="mt-1">{getLevelIcon(finding.level)}</div>
                                <div>
                                    <h4 className="font-semibold text-sm capitalize">{finding.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{finding.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            No findings to report.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
