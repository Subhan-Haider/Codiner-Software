import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IpcClient } from "@/ipc/ipc_client";
import { useSettings } from "@/hooks/useSettings";
import { Database, ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface NeonRequiredDialogProps {
    isOpen: boolean;
    onClose: () => void;
    templateTitle?: string;
}

export function NeonRequiredDialog({
    isOpen,
    onClose,
    templateTitle,
}: NeonRequiredDialogProps) {
    const { settings } = useSettings();

    const handleConnect = async () => {
        if (settings?.isTestMode) {
            await IpcClient.getInstance().fakeHandleNeonConnect();
        } else {
            await IpcClient.getInstance().openExternalUrl(
                "https://oauth.codiner.online/api/integrations/neon/login",
            );
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl bg-background/95 backdrop-blur-xl">
                <div className="relative h-2 bg-cyan-500/20">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        className="h-full bg-cyan-500"
                    />
                </div>

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 shadow-inner">
                                <Database size={28} />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl font-black tracking-tight">Neon Connection Required</DialogTitle>
                                <DialogDescription className="text-muted-foreground font-medium">
                                    {templateTitle ? (
                                        <>
                                            The <span className="text-cyan-500 font-bold">{templateTitle}</span> template requires a serverless Postgres database to function.
                                        </>
                                    ) : (
                                        "This template requires a Neon database connection."
                                    )}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 mb-8">
                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="mt-1 p-0.5 rounded-full bg-cyan-500/20 text-cyan-500">
                                        <Zap size={12} />
                                    </div>
                                    <span>Instant serverless Postgres provisioned in seconds.</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="mt-1 p-0.5 rounded-full bg-cyan-500/20 text-cyan-500">
                                        <Zap size={12} />
                                    </div>
                                    <span>Generous free tier included (no credit card required).</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <div className="mt-1 p-0.5 rounded-full bg-cyan-500/20 text-cyan-500">
                                        <Zap size={12} />
                                    </div>
                                    <span>Automatic schema synchronization with Codiner.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <DialogFooter className="flex !justify-between items-center sm:gap-0">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-xl px-6 font-semibold hover:bg-muted"
                        >
                            Maybe Later
                        </Button>
                        <Button
                            onClick={handleConnect}
                            className="rounded-xl px-8 h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-95 flex items-center gap-2"
                        >
                            Connect Neon <ExternalLink size={18} />
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog >
    );
}
