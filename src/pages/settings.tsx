import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ProviderSettingsGrid } from "@/components/ProviderSettings";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { IpcClient } from "@/ipc/ipc_client";
import { showSuccess, showError } from "@/lib/toast";
import { AutoApproveSwitch } from "@/components/AutoApproveSwitch";
import { TelemetrySwitch } from "@/components/TelemetrySwitch";
import { MaxChatTurnsSelector } from "@/components/MaxChatTurnsSelector";
import { ThinkingBudgetSelector } from "@/components/ThinkingBudgetSelector";
import { useSettings } from "@/hooks/useSettings";
import { useAppVersion } from "@/hooks/useAppVersion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Monitor,
  Activity,
  Fingerprint,
  Trash2,
  AlertTriangle,
  Github,
  Globe,
  Settings,
  Workflow,
  Cpu,
  HelpCircle,
  Palette,
  Box,
  Command,
  Beaker,
  Maximize,
  Minimize,
  Layers,
  Layout,
  Zap,
  Hand,
  Maximize2,
  Minimize2,
  Sparkles,
  Smartphone,
  Type,
  Code,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GitHubIntegration } from "@/components/GitHubIntegration";
import { VercelIntegration } from "@/components/VercelIntegration";
import { FirebaseIntegration } from "@/components/FirebaseIntegration";
import { SupabaseIntegration } from "@/components/SupabaseIntegration";
import { SlackIntegration } from "@/components/SlackIntegration";
import { Switch } from "@/components/ui/switch";
import { AutoFixProblemsSwitch } from "@/components/AutoFixProblemsSwitch";
import { AutoUpdateSwitch } from "@/components/AutoUpdateSwitch";
import { ReleaseChannelSelector } from "@/components/ReleaseChannelSelector";


import { RuntimeModeSelector } from "@/components/RuntimeModeSelector";
import { NodePathSelector } from "@/components/NodePathSelector";
import { ToolsMcpSettings } from "@/components/settings/ToolsMcpSettings";
import { AgentToolsSettings } from "@/components/settings/AgentToolsSettings";
import { WorkspaceTopology } from "@/components/settings/WorkspaceTopology";
import { NeuralSystemDiagnostics } from "@/components/settings/NeuralSystemDiagnostics";
import { ZoomSelector } from "@/components/ZoomSelector";
import { AccentColorPicker } from "@/components/AccentColorPicker";
import { useAtom } from "jotai";
import { activeSettingsSectionAtom } from "@/atoms/viewAtoms";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const [activeTab] = useAtom(activeSettingsSectionAtom);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const appVersion = useAppVersion();

  const handleResetEverything = async () => {
    setIsResetting(true);
    try {
      const ipcClient = IpcClient.getInstance();
      await ipcClient.resetAll();
      showSuccess("Successfully reset everything. Restart the application.");
    } catch (error) {
      console.error("Error resetting:", error);
      showError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsResetting(false);
      setIsResetDialogOpen(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings, component: () => <GeneralSettings appVersion={appVersion} /> },
    { id: "identity", label: "Identity", icon: Fingerprint, component: IdentitySettings },
    { id: "appearance", label: "Appearance", icon: Palette, component: VisualMechanics },
    { id: "workflow", label: "Workflow", icon: Workflow, component: WorkflowSettings },
    { id: "models", label: "Models", icon: Globe, component: ProviderSettingsGrid },
    {
      id: "integrations",
      label: "Integrations",
      icon: Github,
      component: () => (
        <div className="space-y-6">
          <GitHubIntegration />
          <VercelIntegration />
          <FirebaseIntegration />
          <SupabaseIntegration />
          <SlackIntegration />
        </div>
      ),
    },
    {
      id: "mobile",
      label: "Mobile",
      icon: Smartphone,
      component: () => (
        <div className="space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-card/40 border border-border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-primary" /> Capacitor Controls
            </h3>
            <p className="text-muted-foreground mb-6">
              Manage your mobile deployment targets and simulator settings.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background/50 border border-border">
                <span className="font-bold">iOS Target</span>
                <p className="text-xs text-muted-foreground">Not configured</p>
              </div>
              <div className="p-4 rounded-2xl bg-background/50 border border-border">
                <span className="font-bold">Android Target</span>
                <p className="text-xs text-muted-foreground">Not configured</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tools",
      label: "Tools",
      icon: Box,
      component: () => (
        <div className="space-y-6">
          <ToolsMcpSettings />
          <AgentToolsSettings />
          <WorkspaceTopology />
        </div>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: Activity,
      component: () => (
        <div className="space-y-6">
          <NeuralSystemDiagnostics />
          <div className="p-8 border border-border rounded-3xl bg-card/30 backdrop-blur-sm shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Activity className="text-primary h-6 w-6" /> Telemetry Control
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Help us improve Codiner by sending anonymous usage data. No personal information or code is ever transmitted.
            </p>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
              <span className="font-semibold text-sm">Enable anonymous telemetry</span>
              <TelemetrySwitch />
            </div>
          </div>
        </div>
      ),
    },
    { id: "labs", label: "Labs", icon: Beaker, component: LabsSettings },
    {
      id: "reset",
      label: "Reset",
      icon: Trash2,
      component: () => (
        <div className="flex flex-col items-center text-center gap-6 p-12 border-2 border-destructive/20 rounded-[3rem] bg-destructive/5 backdrop-blur-md">
          <div className="p-6 rounded-[2rem] bg-destructive/10 text-destructive mb-2 animate-pulse-soft">
            <AlertTriangle className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black tracking-tight text-destructive">Protocol Zero</h3>
            <p className="text-muted-foreground max-w-sm font-medium">
              A total factory reset. All projects, secrets, and intelligence will be purged irreversibly.
            </p>
          </div>
          <Button
            variant="destructive"
            size="lg"
            className="rounded-2xl px-12 h-14 font-black shadow-xl shadow-destructive/20 hover:scale-105 transition-transform"
            onClick={() => setIsResetDialogOpen(true)}
          >
            {isResetting ? "Executing Purge..." : "Initiate Factory Reset"}
          </Button>
        </div>
      ),
    },
    { id: "support", label: "Support", icon: HelpCircle, component: SupportSection },
  ];

  // If no tab is active, default to General. But atom is usually set.
  // We use `general` as fallback if atom is somehow empty, though Sidebar will set it.
  const currentTabId = activeTab || "general";
  const ActiveComponent = tabs.find((t) => t.id === currentTabId)?.component || (() => <div>Section not found</div>);

  return (
    <div className="flex flex-col flex-1 w-full h-full p-8 md:p-12 overflow-y-auto bg-background animate-in fade-in duration-300">
      <header className="mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {tabs.find((t) => t.id === currentTabId)?.label || "Settings"}
          </h1>
          <p className="text-muted-foreground">
            Manage your application preferences and workspace configuration.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-0">
        <ActiveComponent />
      </div>

      <ConfirmationDialog
        isOpen={isResetDialogOpen}
        title="Critical System Reset"
        message="Are you sure you want to proceed? Every single application, chat message, and configured setting will be permanently deleted from this machine."
        confirmText="Yes, Destroy Everything"
        cancelText="Cancel Operation"
        onConfirm={handleResetEverything}
        onCancel={() => setIsResetDialogOpen(false)}
      />
    </div>
  );
}

function GeneralSettings({ appVersion }: { appVersion: string | null }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-10">
      <Section title="Application Lifecycle" icon={Settings}>
        <div className="grid gap-8 p-1">
          <div className="flex items-center justify-between p-6 rounded-3xl bg-primary/5 hover:bg-primary/10 transition-colors group">
            <div className="space-y-1">
              <Label className="text-lg font-black group-hover:text-primary transition-colors">Software Updates</Label>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Keep Codiner at peak performance with automated delta-patch updates.
              </p>
            </div>
            <AutoUpdateSwitch />
          </div>
          <div className="flex items-center justify-between p-6 rounded-3xl bg-primary/5 hover:bg-primary/10 transition-colors group">
            <div className="space-y-1">
              <Label className="text-lg font-black group-hover:text-primary transition-colors">Release Channel</Label>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Opt-in to experimental builds or stay on the proven stable track.
              </p>
            </div>
            <ReleaseChannelSelector />
          </div>
        </div>
      </Section>

      <Section title="Environment Visuals" icon={Palette}>
        <div className="p-6 rounded-3xl bg-secondary/30 backdrop-blur-sm border border-primary/5">
          <ZoomSelector />
        </div>
      </Section>

      <Section title="Architecture Engine" icon={Cpu}>
        <div className="space-y-6 p-1">
          <div className="p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 space-y-8">
            <RuntimeModeSelector />
            <div className="pt-6 border-t border-primary/10">
              <NodePathSelector />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function IdentitySettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-10">
      <Section title="Creator Persona" icon={Fingerprint}>
        <div className="p-8 rounded-[2.5rem] bg-card shadow-2xl border border-primary/5 group transition-all hover:shadow-primary/5 hover:translate-y-[-2px]">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="architect-name" className="text-sm font-black uppercase tracking-widest text-muted-foreground/80">Display Alias</Label>
              <Input
                id="architect-name"
                value={settings?.userName || ""}
                onChange={(e) => updateSettings({ userName: e.target.value })}
                placeholder="How the system should address you..."
                className="h-14 px-6 text-lg rounded-2xl border-2 border-primary/10 focus:border-primary/50 transition-all bg-muted/20"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Cognitive Alignment" icon={Cpu}>
        <div className="p-8 rounded-[2.5rem] bg-indigo-500/[0.03] backdrop-blur-xl border border-indigo-500/10 shadow-lg group">
          <div className="grid gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                <Command className="h-4 w-4" />
              </div>
              <Label className="text-base font-black">Global Context Directives</Label>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl italic">
              These directives act as a permanent cognitive layer for all AI interactions, ensuring the system adheres to your unique coding philosophies.
            </p>
            <Textarea
              value={settings?.customSystemPrompt || ""}
              onChange={(e) =>
                updateSettings({ customSystemPrompt: e.target.value })
              }
              placeholder="e.g. Always prioritize performance, use functional TypeScript patterns, emphasize accessibility..."
              className="min-h-[220px] p-6 text-base rounded-2xl border-2 border-indigo-500/20 bg-white/50 dark:bg-zinc-900/50 focus:border-indigo-500/50 transition-all font-mono leading-relaxed"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

function VisualMechanics() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-12">
      <Section title="Luminary Preferences" icon={Monitor}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "light", icon: SunIcon, label: "Luminary" },
            { id: "dark", icon: MoonIcon, label: "Eclipse" },
            { id: "system", icon: Monitor, label: "Adaptive" },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={cn(
                  "relative group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.3)] scale-[1.02]"
                    : "border-primary/5 bg-card/40 hover:border-primary/30 hover:bg-card hover:scale-105"
                )}
              >
                <div className={cn(
                  "p-4 rounded-2xl mb-4 transition-all duration-500",
                  isSelected ? "bg-primary text-primary-foreground scale-110 rotate-[360deg]" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{t.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="theme-selection-glow"
                    className="absolute inset-0 bg-primary/5 pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Interface Density" icon={Maximize2}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "compact", icon: Minimize2, label: "Compressed" },
            { id: "balanced", icon: Monitor, label: "Balanced" },
            { id: "spacious", icon: Maximize2, label: "Expanded" },
          ].map((d) => {
            const Icon = d.icon;
            const isSelected = (settings?.uiDensity || "balanced") === d.id;
            return (
              <button
                key={d.id}
                onClick={() => updateSettings({ uiDensity: d.id as any })}
                className={cn(
                  "relative group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.2)]"
                    : "border-primary/5 bg-card/40 hover:border-primary/30 hover:bg-card hover:scale-105"
                )}
              >
                <div className={cn(
                  "p-4 rounded-2xl mb-4 transition-all duration-500",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{d.label}</span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Typography & Code" icon={Type}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                <Type className="h-5 w-5" />
              </div>
              <Label className="text-lg font-black">App Typography</Label>
            </div>

            <div className="space-y-6">
              {/* Font Family */}
              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground mb-3 block tracking-widest">Font Family</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "inter", label: "Inter (Default)" },
                    { id: "system", label: "System UI" },
                    { id: "mono", label: "Monospace" },
                    { id: "dyslexic", label: "OpenDyslexic" },
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => updateSettings({ appFontFamily: font.id as any })}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                        (settings?.appFontFamily || "inter") === font.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-background/50 hover:bg-background hover:border-primary/10"
                      )}
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Weight */}
              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground mb-3 block tracking-widest">Text Weight</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "normal", label: "Normal" },
                    { id: "medium", label: "Medium" },
                    { id: "bold", label: "Bold" },
                  ].map((weight) => (
                    <button
                      key={weight.id}
                      onClick={() => updateSettings({ appFontWeight: weight.id as any })}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                        (settings?.appFontWeight || "normal") === weight.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-background/50 hover:bg-background hover:border-primary/10"
                      )}
                    >
                      {weight.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <Label className="text-xs font-bold uppercase text-muted-foreground mb-3 block tracking-widest">Global Font Size</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "small", label: "Small" },
                    { id: "normal", label: "Standard" },
                    { id: "large", label: "Large" },
                    { id: "extra-large", label: "Extra Large" },
                  ].map((size) => (
                    <button
                      key={size.id}
                      onClick={() => updateSettings({ appFontSize: size.id as any })}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                        (settings?.appFontSize || "normal") === size.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-transparent bg-background/50 hover:bg-background hover:border-primary/10"
                      )}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                <Code className="h-5 w-5" />
              </div>
              <Label className="text-lg font-black">Editor Visuals</Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "vs-dark", label: "VS Code Dark" },
                { id: "vs-light", label: "VS Code Light" },
                { id: "hc-black", label: "High Contrast" },
                { id: "monokai", label: "Monokai" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => updateSettings({ editorTheme: theme.id as any })}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                    (settings?.editorTheme || "vs-dark") === theme.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent bg-background/50 hover:bg-background hover:border-primary/10"
                  )}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Cognitive Enhancements" icon={Sparkles}>
        <div className="grid gap-6">
          <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                <Layers className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Label className="text-xl font-black">Glassmorphism Protocol</Label>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Enable translucent, multi-layered interfaces for increased depth and focus.
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.enableGlassmorphism ?? true}
              onCheckedChange={(val) => updateSettings({ enableGlassmorphism: val })}
            />
          </div>

          <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-500 group-hover:block transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Label className="text-xl font-black">Neural Motion</Label>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Activate high-frequency UI transitions and cognitive animations.
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.enableAnimations ?? true}
              onCheckedChange={(val) => updateSettings({ enableAnimations: val })}
            />
          </div>

          <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <Hand className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Label className="text-xl font-black">Haptic Synapse</Label>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Enable subtle tactile feedback for interactions (macOS/Mobile only).
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.enableHaptics ?? false}
              onCheckedChange={(val) => updateSettings({ enableHaptics: val })}
            />
          </div>

          <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                <Layout className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <Label className="text-xl font-black">Intelligent Sidebar</Label>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Automatically expand and collapse the sidebar on hover for a cleaner workspace.
                </p>
              </div>
            </div>
            <Switch
              checked={settings?.enableSidebarHover ?? true}
              onCheckedChange={(val) => updateSettings({ enableSidebarHover: val })}
            />
          </div>
        </div>
      </Section>

      <Section title="Core Aesthetic" icon={Palette}>
        <div className="p-8 rounded-[3rem] bg-card shadow-2xl border border-primary/5">
          <AccentColorPicker />
        </div>
      </Section>
    </div>
  );
}

function WorkflowSettings() {
  return (
    <div className="space-y-10">
      <Section title="Machine Intelligence" icon={Workflow}>
        <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-card/60 shadow-xl border border-primary/5 group hover:border-primary/20 transition-all">
          <div className="space-y-2">
            <Label className="text-xl font-black group-hover:text-primary transition-colors">Neural Auto-Commit</Label>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Bypass confirmation gates for AI-driven file manipulations. Caution: High-velocity mode.
            </p>
          </div>
          <AutoApproveSwitch />
        </div>
      </Section>

      <Section title="System Integrity" icon={Beaker}>
        <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-indigo-500/[0.03] shadow-lg border border-indigo-500/10 group hover:border-indigo-500/30 transition-all">
          <div className="space-y-2">
            <Label className="text-xl font-black group-hover:text-indigo-500 transition-colors">Autonomic Restoration</Label>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Automatically identify and reconcile linting discrepancies post-generation.
            </p>
          </div>
          <AutoFixProblemsSwitch />
        </div>
      </Section>

      <AISettings />
    </div>
  );
}

function AISettings() {
  return (
    <div className="space-y-8 mt-12 pt-12 border-t border-primary/10">
      <Section title="Cognitive Capacity" icon={Cpu}>
        <div className="grid gap-8">
          <div className="p-8 rounded-[2.5rem] bg-card border border-primary/5 shadow-xl">
            <MaxChatTurnsSelector />
          </div>
          <div className="p-8 rounded-[2.5rem] bg-card border border-primary/5 shadow-xl">
            <ThinkingBudgetSelector />
          </div>
        </div>
      </Section>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="space-y-10">
      <Section title="Knowledge Nexus" icon={HelpCircle}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="https://github.com/Subhan-Haider/Codiner_Windows/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-card border border-primary/5 hover:border-primary/20 hover:bg-primary/5 transition-all shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 group-hover:scale-150 group-hover:rotate-12">
              <Github size={120} />
            </div>
            <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
              <Github size={24} />
            </div>
            <h4 className="text-xl font-black mb-2 group-hover:text-primary transition-colors">Signal for Assistance</h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Encountered a glitch in the collective? Open a transmission on GitHub.
            </p>
          </a>

          <a
            href="https://codiner.online"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-indigo-500/[0.03] border border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-500/[0.06] transition-all shadow-xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 group-hover:scale-150 group-hover:rotate-12">
              <Globe size={120} />
            </div>
            <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 w-fit mb-6 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h4 className="text-xl font-black mb-2 group-hover:text-indigo-500 transition-colors">Master Archives</h4>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Deep-dive into the official core documentation and architectural patterns.
            </p>
          </a>
        </div>
      </Section>
    </div>
  );
}

function LabsSettings() {
  const { settings, updateSettings } = useSettings();
  const experiments = settings?.experiments || {};

  const toggleExperiment = (key: keyof typeof experiments) => {
    updateSettings({
      experiments: {
        ...experiments,
        [key]: !experiments[key],
      },
    });
  };

  const featureFlags = [
    { key: "enableGhostText", label: "Neural Proxy (Ghost Text)", description: "Real-time inline code synthesis as you architect." },
    { key: "enableSemanticSearch", label: "Neural Indexing", description: "Deep vector-based mapping of your entire logic codebase." },
    { key: "enableAutoRefactor", label: "Entropy Reduction", description: "Automatic architectural refinement and standard alignment." },
    { key: "enableVimMode", label: "Vim Synthesis", description: "High-velocity keyboard-centric navigation protocol." },
    { key: "enableVoiceControl", label: "Sonic Commands", description: "Direct neural-to-logic voice interface." },
    { key: "enableLiveCollaboration", label: "Co-Neural Bridge", description: "Real-time workspace synchronization with distant nodes." },
    { key: "enableCloudSync", label: "Cloud Synchronization", description: "Seamless personality syncing across the global mesh." },
    { key: "enableTerminalMultiplexer", label: "IO Multiplexer", description: "Parallel stream management within a single neural shell." },
    { key: "enableGpuAcceleration", label: "Hardware Acceleration", description: "Harness local silicon for accelerated inference." },
    { key: "enablePrivacyMode", label: "Data Obfuscation", description: "Automatic zero-visibility masking for sensitive tokens." },
    { key: "enableZenMode", label: "Cognitive Silence", description: "Zero-distraction isolation for deep architecture focus." },
  ];

  return (
    <div className="space-y-12">
      <div className="group relative p-10 rounded-[3rem] border-2 border-amber-500/20 bg-amber-500/5 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.1] transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 animate-spin-slow">
          <Beaker size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-amber-500 mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/10">
              <Beaker className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-black tracking-tight">Experimental Research</h3>
          </div>
          <p className="text-base font-medium italic opacity-80 leading-relaxed max-w-2xl text-amber-500/70">
            Welcome to the frontier. These modules are in active neural development. Use them to shape the future of Codiner, but beware of unstable frequencies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureFlags.map((feature) => (
          <div
            key={feature.key}
            className="group flex flex-col justify-between p-8 rounded-[2.5rem] border border-primary/5 bg-card/40 hover:border-primary/30 hover:bg-card hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-500"
          >
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between">
                <Label className="text-xl font-black tracking-tight group-hover:text-primary transition-colors cursor-pointer" onClick={() => toggleExperiment(feature.key as any)}>{feature.label}</Label>
                <Switch
                  checked={!!experiments[feature.key as keyof typeof experiments]}
                  onCheckedChange={() => toggleExperiment(feature.key as any)}
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic opacity-80">{feature.description}</p>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
              <div className={cn("h-1.5 w-1.5 rounded-full", !!experiments[feature.key as keyof typeof experiments] ? "bg-primary animate-pulse" : "bg-muted")} />
              {!!experiments[feature.key as keyof typeof experiments] ? "Active Module" : "Dormant"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
        {Icon && (
          <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Icon size={18} />
          </div>
        )}
        <h3 className="text-xs font-black text-muted-foreground/50 uppercase tracking-[0.3em]">
          {title}
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
      </div>
      <div>{children}</div>
    </div>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
