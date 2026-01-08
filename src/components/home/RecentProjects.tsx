import React from "react";
import { App } from "@/ipc/ipc_types";
import { useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { selectedAppIdAtom } from "@/atoms/appAtoms";
import { Folder, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentProjects({ apps }: { apps: App[] }) {
    const navigate = useNavigate();
    const setSelectedAppId = useSetAtom(selectedAppIdAtom);

    const handleOpenApp = (app: App) => {
        setSelectedAppId(app.id);
        navigate({ to: "/app-details", search: { appId: app.id } });
    };

    if (!apps || apps.length === 0) return null;

    // Show last 4 apps
    const recentApps = [...apps].sort((a, b) => b.id - a.id).slice(0, 4);

    return (
        <div className="w-full space-y-6 pt-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Recent Masterpieces
                </h3>
                <button
                    onClick={() => {
                        // Logic to view all apps could go here
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                >
                    View All <ArrowRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentApps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => handleOpenApp(app)}
                        className="group relative flex items-center gap-4 p-5 rounded-3xl border border-border/50
                       bg-white/40 dark:bg-black/20 backdrop-blur-xl shadow-lg
                       transition-all duration-500 hover:border-primary/40 hover:scale-[1.02] active:scale-[0.98]
                       text-left overflow-hidden hover:shadow-primary/5"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center
                           text-primary shadow-inner group-hover:scale-110 transition-transform duration-500">
                            <Folder size={24} />
                        </div>

                        <div className="relative flex-1 min-w-0">
                            <h4 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                {app.name}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate opacity-70">
                                {app.path}
                            </p>
                        </div>

                        <div className="relative p-2 rounded-xl bg-muted/50 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                            <ArrowRight size={18} className="text-primary" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
