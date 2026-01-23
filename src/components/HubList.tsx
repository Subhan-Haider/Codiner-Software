import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Store, Star, Layout, Zap, Package } from "lucide-react";
import { useTemplates } from "@/hooks/useTemplates";

export function HubList({ show }: { show: boolean }) {
    const navigate = useNavigate();
    const { templates } = useTemplates();

    if (!show) {
        return null;
    }

    // Show a few featured templates in the sidebar
    const featuredTemplates = templates?.slice(0, 6) || [];

    return (
        <div className="flex flex-col h-full py-4 bg-background">
            <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground tracking-tight uppercase">Template Hub</h2>
                </div>
            </div>

            <ScrollArea className="flex-grow px-2">
                <div className="space-y-4 pt-2">
                    <div className="px-2 mb-4">
                        <button
                            onClick={() => navigate({ to: "/hub" })}
                            className="w-full py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Explore All Templates
                        </button>
                    </div>

                    <div className="space-y-1">
                        <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Featured Blueprints</h3>
                        {featuredTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => navigate({ to: "/hub" })}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group hover:bg-muted/50"
                            >
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/50">
                                    {template.imageUrl ? (
                                        <img src={template.imageUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex flex-col items-start min-w-0">
                                    <span className="font-medium truncate w-full text-foreground text-xs">{template.title}</span>
                                    <div className="flex items-center gap-1">
                                        {template.isOfficial && <span className="text-[8px] bg-blue-500/10 text-blue-500 px-1 rounded">OFFICIAL</span>}
                                        <span className="text-[9px] text-muted-foreground truncate">Starter kit</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-muted/30 border border-border/50 mx-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            <span>COMMUNITY</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Join 5,000+ developers sharing production-ready templates.
                        </p>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
