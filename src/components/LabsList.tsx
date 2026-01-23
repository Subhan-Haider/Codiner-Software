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
        <div className="flex flex-col h-full py-4 bg-background">
            <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground tracking-tight uppercase">Neural Labs</h2>
                </div>
            </div>

            <ScrollArea className="flex-grow px-2">
                <div className="space-y-4 pt-2">
                    {LAB_TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => handleToolClick(tool.id)}
                            className={cn(
                                "w-full flex flex-col items-start gap-1 p-3 rounded-xl text-sm transition-all duration-300 group border border-transparent",
                                previewMode === tool.id
                                    ? "bg-primary/10 border-primary/20 shadow-sm"
                                    : "hover:bg-muted/50 hover:border-border"
                            )}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className={cn(
                                    "p-2 rounded-lg transition-colors",
                                    previewMode === tool.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                                )}>
                                    <tool.icon className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col items-start min-w-0">
                                    <span className={cn(
                                        "font-bold truncate",
                                        previewMode === tool.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                    )}>{tool.label}</span>
                                    <span className="text-[10px] text-muted-foreground truncate w-full">{tool.description}</span>
                                </div>
                            </div>
                        </button>
                    ))}

                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
                            <Zap className="h-3 w-3" />
                            <span>AI POWERED</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            All neuro-diagnostic tools are powered by our core entropy reduction engine.
                        </p>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
