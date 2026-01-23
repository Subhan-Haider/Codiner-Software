import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { IpcClient } from "@/ipc/ipc_client";
import { AppAnalytics } from "@/ipc/ipc_types";
import { BarChart3, MessageSquare, Zap, Clock, Loader2 } from "lucide-react";

interface UsageAnalyticsDialogProps {
    appId: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UsageAnalyticsDialog({ appId, isOpen, onOpenChange }: UsageAnalyticsDialogProps) {
    const [stats, setStats] = useState<AppAnalytics | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadStats();
        }
    }, [isOpen]);

    const loadStats = async () => {
        try {
            setIsLoading(true);
            const data = await IpcClient.getInstance().getAppAnalytics(appId);
            setStats(data);
        } catch (error) {
            console.error("Failed to load analytics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Usage Analytics
                    </DialogTitle>
                    <DialogDescription>
                        Real-time metrics for this application.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : stats ? (
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col gap-2">
                            <Zap className="h-4 w-4 text-amber-500" />
                            <span className="text-2xl font-bold">{stats.totalTokensUsed.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Tokens Consumed</span>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span className="text-2xl font-bold">{stats.messageCount}</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Total Messages</span>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col gap-2">
                            <BarChart3 className="h-4 w-4 text-purple-500" />
                            <span className="text-2xl font-bold">{stats.chatCount}</span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Total Chats</span>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col gap-2">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm font-bold truncate">
                                {stats.lastActive ? new Date(stats.lastActive).toLocaleDateString() : "Never"}
                            </span>
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Last Active</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        No data available.
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
