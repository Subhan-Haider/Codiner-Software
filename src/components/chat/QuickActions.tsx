import React from "react";
import { Sparkles, Zap, ShieldCheck, Accessibility, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStreamChat } from "@/hooks/useStreamChat";
import { useAtomValue } from "jotai";
import { selectedChatIdAtom } from "@/atoms/chatAtoms";

interface QuickAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    prompt: string;
    color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
    {
        id: "optimize",
        label: "Optimize Perf",
        icon: <Zap size={14} />,
        prompt: "Analyze the current project and suggest or implement performance optimizations.",
        color: "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20",
    },
    {
        id: "security",
        label: "Audit Security",
        icon: <ShieldCheck size={14} />,
        prompt: "Perform a security audit on the current codebase and fix any vulnerabilities found.",
        color: "text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20",
    },
    {
        id: "accessibility",
        label: "Fix A11y",
        icon: <Accessibility size={14} />,
        prompt: "Audit the project for accessibility (A11y) issues and implement fixes to meet WCAG standards.",
        color: "text-blue-500 bg-blue-500/10 hover:bg-blue-500/20",
    },
    {
        id: "tests",
        label: "Add Unit Tests",
        icon: <TestTube size={14} />,
        prompt: "Write comprehensive unit tests for the main components and logic in this project.",
        color: "text-purple-500 bg-purple-500/10 hover:bg-purple-500/20",
    },
];

export function QuickActions() {
    const { streamMessage, isStreaming } = useStreamChat();
    const chatId = useAtomValue(selectedChatIdAtom);

    const handleAction = (action: QuickAction) => {
        if (!chatId || isStreaming) return;

        streamMessage({
            prompt: action.prompt,
            chatId,
        });
    };

    if (!chatId) return null;

    return (
        <div className="flex items-center gap-2 px-1 py-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 grayscale-[0.5] hover:grayscale-0 transition-all">
                {QUICK_ACTIONS.map((action) => (
                    <Button
                        key={action.id}
                        variant="ghost"
                        size="sm"
                        disabled={isStreaming}
                        onClick={() => handleAction(action)}
                        className={`h-8 gap-1.5 text-[11px] font-medium rounded-full border border-transparent hover:border-border/50 transition-all ${action.color}`}
                    >
                        {action.icon}
                        {action.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
