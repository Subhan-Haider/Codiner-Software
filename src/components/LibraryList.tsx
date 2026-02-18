import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, PlusCircle } from "lucide-react";
import { usePrompts } from "@/hooks/usePrompts";
import { useSidebar } from "@/components/ui/sidebar";

export function LibraryList({ show }: { show: boolean }) {
    const navigate = useNavigate();
    const { prompts, isLoading } = usePrompts();

    if (!show) {
        return null;
    }

    return (
        <div className="flex flex-col h-full py-4 bg-background overflow-hidden select-none">
            <ScrollArea className="flex-grow">
                <div className="flex flex-col gap-5 py-2 px-3">
                    <button
                        onClick={() => navigate({ to: "/library" })}
                        className="w-full py-2.5 px-3 rounded-xl bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-tight hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        Manage Prompts
                    </button>

                    <div className="space-y-1.5">
                        <div className="px-1 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider mb-2">Saved Prompts</div>
                        {isLoading ? (
                            <div className="px-4 py-4 text-[10px] text-muted-foreground animate-pulse">Loading prompts...</div>
                        ) : prompts.length === 0 ? (
                            <div className="px-4 py-8 text-[10px] text-muted-foreground text-center italic opacity-60">No prompts saved yet.</div>
                        ) : (
                            prompts.slice(0, 10).map((prompt) => (
                                <button
                                    key={prompt.id}
                                    onClick={() => navigate({ to: "/library" })}
                                    className="w-full flex items-center gap-3 px-2 py-2 rounded-xl text-sm transition-all duration-200 group hover:bg-muted/60 text-left"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                                        <Sparkles className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div className="flex flex-col min-w-0 flex-1 gap-1">
                                        <span className="font-semibold text-foreground text-xs leading-snug">{prompt.title}</span>
                                        <span className="text-[10px] text-muted-foreground/80 font-medium leading-relaxed">
                                            {prompt.description || "Reusable blueprint"}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
