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
        <div className="flex flex-col h-full py-4 bg-background overflow-hidden select-none">
            <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Store className="h-4 w-4" />
                    </div>
                    <div className="text-xs font-bold text-foreground tracking-wider leading-snug">TEMPLATE HUB</div>
                </div>
            </div>

            <ScrollArea className="flex-grow">
                <div className="flex flex-col gap-5 py-2 px-3">
                    <button
                        onClick={() => navigate({ to: "/hub" })}
                        className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-tight hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        Explore All Templates
                    </button>

                    <div className="space-y-1.5">
                        <div className="px-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2">Featured Blueprints</div>
                        {featuredTemplates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => navigate({ to: "/hub" })}
                                className="w-full flex items-center gap-3 px-2 py-2 rounded-xl text-sm transition-all duration-200 group hover:bg-muted/60 text-left"
                            >
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/40 shrink-0 group-hover:border-primary/20 transition-colors">
                                    {template.imageUrl ? (
                                        <img src={template.imageUrl} alt="" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300" />
                                    ) : (
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
                                    <span className="font-semibold w-full text-foreground text-xs leading-snug break-words">{template.title}</span>
                                    <div className="flex items-center gap-1.5">
                                        {template.isOfficial && (
                                            <span className="text-[8px] bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold leading-none tracking-tight">PRO</span>
                                        )}
                                        <span className="text-[10px] text-muted-foreground/80 font-medium leading-normal">Starter kit</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/40 relative overflow-hidden group">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/80 mb-2">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500/20" />
                            <span>OUR COMMUNITY</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed font-medium break-words">
                            Join 5,000+ developers sharing production-ready templates.
                        </p>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
