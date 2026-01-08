import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings } from "lucide-react";

interface SettingsSection {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    component: React.ComponentType;
}

export function SettingsPager({ sections }: { sections: SettingsSection[] }) {
    const [activeTab, setActiveTab] = useState(sections[0]?.id);

    const ActiveComponent = sections.find(s => s.id === activeTab)?.component || (() => null);

    return (
        <div className="flex glass-card border-primary/10 rounded-[2.5rem] overflow-hidden shadow-2xl h-[80vh] bg-background/60 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-700">
            {/* Sidebar Navigation */}
            <aside className="w-72 border-r border-primary/5 bg-primary/[0.02] flex flex-col p-6 space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20">
                        <Settings className="h-5 w-5 text-white animate-spin-slow" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-black text-lg tracking-tighter text-gradient leading-tight">System Core</h2>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Architect v0.32</span>
                    </div>
                </div>

                <ScrollArea className="flex-1 -mx-2">
                    <nav className="space-y-2 px-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.1em] transition-all duration-500 relative group",
                                    activeTab === section.id
                                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02] translate-x-1"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-xl transition-all duration-500",
                                    activeTab === section.id ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10"
                                )}>
                                    <section.icon className="h-4 w-4" />
                                </div>
                                {section.label}
                                {activeTab === section.id && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full shadow-glow" />
                                )}
                            </button>
                        ))}
                    </nav>
                </ScrollArea>

                <div className="pt-6 border-t border-primary/5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 shadow-inner">
                        <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-orange-600">Sync Active</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto relative bg-gradient-to-b from-primary/[0.01] to-transparent">
                <div className="max-w-4xl mx-auto py-16 px-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <ActiveComponent />
                </div>
            </main>
        </div>
    );
}
