import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import { previewModeAtom } from "@/atoms/appAtoms";
import { useNavigate } from "@tanstack/react-router";
import {
    Zap,
    BarChart3,
    ShieldCheck,
    Smartphone,
    Search,
    Accessibility,
    FlaskConical,
    Eye,
    Rocket
} from "lucide-react";

type LabTool = {
    id: string;
    label: string;
    description: string;
    icon: any;
    color: string;
};

const LAB_TOOLS: LabTool[] = [
    {
        id: "simulator",
        label: "Device Simulator",
        description: "Multi-device framing & network throttling",
        icon: Smartphone,
        color: "text-blue-500"
    },
    {
        id: "accessibility",
        label: "Accessibility Audit",
        description: "Scan for WCAG compliance issues",
        icon: Accessibility,
        color: "text-fuchsia-500"
    },
    {
        id: "performance",
        label: "Performance",
        description: "Core Web Vitals & bundle metrics",
        icon: BarChart3,
        color: "text-indigo-500"
    },
    {
        id: "security",
        label: "Security Audit",
        description: "Dependency & code vulnerability scan",
        icon: ShieldCheck,
        color: "text-red-500"
    },
    {
        id: "seo",
        label: "SEO Engine",
        description: "Search visibility & metadata optimization",
        icon: Search,
        color: "text-emerald-500"
    },
];

export function LabsList({ show }: { show: boolean }) {
    const [previewMode, setPreviewMode] = useAtom(previewModeAtom);
    const navigate = useNavigate();

    if (!show) {
        return null;
    }

    const handleToolClick = (id: any) => {
        setPreviewMode(id);
        navigate({ to: "/chat" });
    };

    return (
        <div className="flex flex-col h-full py-4 bg-background overflow-hidden select-none">
            <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <FlaskConical className="h-4 w-4" />
                    </div>
                    <div className="text-xs font-bold text-foreground tracking-wider">NEURAL LABS</div>
                </div>
            </div>

            <ScrollArea className="flex-grow">
                <div className="flex flex-col gap-4 py-2 px-3">
                    <div className="space-y-1.5">
                        <div className="px-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2">Diagnostic Tools</div>
                        {LAB_TOOLS.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => handleToolClick(tool.id)}
                                className={cn(
                                    "w-full flex flex-col items-start gap-1 p-3 rounded-2xl text-sm transition-all duration-300 group border border-transparent active:scale-[0.98]",
                                    previewMode === tool.id
                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 border-primary"
                                        : "bg-muted/30 hover:bg-muted/60"
                                )}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className={cn(
                                        "p-2 rounded-xl transition-all duration-300",
                                        previewMode === tool.id
                                            ? "bg-white/20 text-white"
                                            : "bg-background/80 text-muted-foreground group-hover:bg-background group-hover:text-primary"
                                    )}>
                                        <tool.icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
                                        <span className={cn(
                                            "text-xs font-bold leading-snug mb-0.5 transition-colors break-words",
                                            previewMode === tool.id ? "text-white" : "text-foreground"
                                        )}>{tool.label}</span>
                                        <span className={cn(
                                            "text-[10px] w-full transition-colors leading-normal",
                                            previewMode === tool.id ? "text-white/80" : "text-muted-foreground"
                                        )}>{tool.description}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Zap className="h-12 w-12 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary mb-2">
                            <Zap className="h-3 w-3 fill-primary/20" />
                            <span>AI POWERED</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium relative z-10">
                            All neuro-diagnostic tools are powered by our core entropy reduction engine.
                        </p>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
