import React, { useState, useEffect, useCallback } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    Search,
    Zap,
    Layout,
    MessageCircle,
    Settings,
    Shield,
    BarChart3,
    Accessibility,
    Eye,
    Rocket,
    Plus,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { previewModeAtom, selectedAppIdAtom, appsListAtom } from "@/atoms/appAtoms";
import { activeSettingsSectionAtom } from "@/atoms/viewAtoms";

export function CommandCenter() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const setPreviewMode = useSetAtom(previewModeAtom);
    const setActiveSettingsSection = useSetAtom(activeSettingsSectionAtom);
    const apps = useAtomValue(appsListAtom);
    const setSelectedAppId = useSetAtom(selectedAppIdAtom);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => runCommand(() => navigate({ to: "/" }))}>
                        <Layout className="mr-2 h-4 w-4" />
                        <span>Go to Apps</span>
                        <CommandShortcut>⇧⌘A</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate({ to: "/chat" }))}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Open Chat</span>
                        <CommandShortcut>⇧⌘C</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => {
                        navigate({ to: "/settings" });
                        setActiveSettingsSection("appearance");
                    })}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Quick Actions">
                    <CommandItem onSelect={() => runCommand(() => {
                        // Logic for new prompt
                        navigate({ to: "/library" });
                    })}>
                        <Zap className="mr-2 h-4 w-4 text-amber-500" />
                        <span>New Prompt in Library</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => {
                        navigate({ to: "/hub" });
                    })}>
                        <Rocket className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Explore Hub</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Your Apps">
                    {apps.map((app) => (
                        <CommandItem
                            key={app.id}
                            onSelect={() => runCommand(() => {
                                setSelectedAppId(app.id);
                                navigate({ to: "/app-details", search: { appId: app.id } });
                            })}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                    {app.name.charAt(0).toUpperCase()}
                                </div>
                                <span>{app.name}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Diagnostics & Audits">
                    <CommandItem onSelect={() => runCommand(() => {
                        setPreviewMode("performance");
                        navigate({ to: "/chat" });
                    })}>
                        <BarChart3 className="mr-2 h-4 w-4 text-indigo-500" />
                        <span>Performance Audit</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => {
                        setPreviewMode("accessibility");
                        navigate({ to: "/chat" });
                    })}>
                        <Accessibility className="mr-2 h-4 w-4 text-fuchsia-500" />
                        <span>Accessibility Audit</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => {
                        setPreviewMode("security");
                        navigate({ to: "/chat" });
                    })}>
                        <Shield className="mr-2 h-4 w-4 text-red-500" />
                        <span>Security Scan</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
