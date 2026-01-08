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
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GitHubIntegration } from "@/components/GitHubIntegration";
import { VercelIntegration } from "@/components/VercelIntegration";
import { SupabaseIntegration } from "@/components/SupabaseIntegration";
import { Switch } from "@/components/ui/switch";
import { AutoFixProblemsSwitch } from "@/components/AutoFixProblemsSwitch";
import { AutoUpdateSwitch } from "@/components/AutoUpdateSwitch";
import { ReleaseChannelSelector } from "@/components/ReleaseChannelSelector";
import { NeonIntegration } from "@/components/NeonIntegration";
import { RuntimeModeSelector } from "@/components/RuntimeModeSelector";
import { NodePathSelector } from "@/components/NodePathSelector";
import { ToolsMcpSettings } from "@/components/settings/ToolsMcpSettings";
import { AgentToolsSettings } from "@/components/settings/AgentToolsSettings";
import { WorkspaceTopology } from "@/components/settings/WorkspaceTopology";
import { NeuralSystemDiagnostics } from "@/components/settings/NeuralSystemDiagnostics";
import { ZoomSelector } from "@/components/ZoomSelector";
import { AccentColorPicker } from "@/components/AccentColorPicker";
import { useSetAtom } from "jotai";
import { activeSettingsSectionAtom } from "@/atoms/viewAtoms";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
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
    {
      id: "general",
      label: "General",
      icon: Settings,
      component: () => <GeneralSettings appVersion={appVersion} />,
    },
    {
      id: "identity",
      label: "Identity",
      icon: Fingerprint,
      component: IdentitySettings,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
      component: VisualMechanics,
    },
    {
      id: "workflow",
      label: "Workflow",
      icon: Workflow,
      component: WorkflowSettings,
    },
    {
      id: "models",
      label: "Models",
      icon: Globe,
      component: ProviderSettingsGrid,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Github,
      component: () => (
        <div className="space-y-8">
          <GitHubIntegration />
          <VercelIntegration />
          <SupabaseIntegration />
          <NeonIntegration />
        </div>
      ),
    },
    {
      id: "tools",
      label: "Tools",
      icon: Box,
      component: () => (
        <div className="space-y-8">
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
        <div className="space-y-8">
          <NeuralSystemDiagnostics />
          <div className="p-6 border rounded-lg bg-card/40">
            <h3 className="text-lg font-medium mb-4">Telemetry</h3>
            <TelemetrySwitch />
          </div>
        </div>
      ),
    },
    {
      id: "labs",
      label: "Labs",
      icon: Beaker,
      component: LabsSettings,
    },
    {
      id: "reset",
      label: "Reset",
      icon: Trash2,
      component: () => (
        <div className="flex flex-col items-start gap-4 p-6 border border-destructive/20 rounded-lg bg-destructive/5">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-bold">Dangerous Area</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            This will handle a complete factory reset of the application. All data will be lost.
          </p>
          <Button
            variant="destructive"
            onClick={() => setIsResetDialogOpen(true)}
          >
            {isResetting ? "Resetting..." : "Reset Everything"}
          </Button>
        </div>
      ),
    },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      component: SupportSection,
    },
  ];

  const ActiveComponent =
    tabs.find((t) => t.id === activeTab)?.component ||
    (() => <div>Select a section</div>);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/10 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Link
              to="/"
              className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="font-bold text-xl tracking-tight">Settings</h1>
          </div>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Codiner v{appVersion || "..."}</span>
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8 md:p-12 pb-24 mt-38">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <ActiveComponent />
        </div>
      </main>

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
    <div className="space-y-8">
      <Section title="Application">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Updates</Label>
              <p className="text-sm text-muted-foreground">
                Manage how Codiner receives updates.
              </p>
            </div>
            <AutoUpdateSwitch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Release Channel</Label>
              <p className="text-sm text-muted-foreground">
                Choose between Stable or Beta builds.
              </p>
            </div>
            <ReleaseChannelSelector />
          </div>
        </div>
      </Section>

      <Section title="Zoom & Scale">
        <ZoomSelector />
      </Section>

      <Section title="Runtime">
        <div className="space-y-4">
          <RuntimeModeSelector />
          <NodePathSelector />
        </div>
      </Section>
    </div>
  );
}

function IdentitySettings() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <Section title="Your Profile">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="architect-name">Display Name</Label>
            <Input
              id="architect-name"
              value={settings?.userName || ""}
              onChange={(e) => updateSettings({ userName: e.target.value })}
              placeholder="Enter your name"
              className="max-w-md"
            />
          </div>
        </div>
      </Section>

      <Section title="System Instructions">
        <div className="grid gap-2">
          <Label>Custom Instructions</Label>
          <p className="text-sm text-muted-foreground mb-2">
            These instructions will be added to every request you make.
          </p>
          <Textarea
            value={settings?.customSystemPrompt || ""}
            onChange={(e) =>
              updateSettings({ customSystemPrompt: e.target.value })
            }
            placeholder="e.g. Always use TypeScript, prefer functional components..."
            className="min-h-[150px]"
          />
        </div>
      </Section>
    </div>
  );
}

function VisualMechanics() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <Section title="Theme">
        <div className="grid grid-cols-3 gap-4 max-w-md">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t as any)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
                theme === t
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "hover:bg-muted/50",
              )}
            >
              {t === "light" && <SunIcon className="h-6 w-6 mb-2" />}
              {t === "dark" && <MoonIcon className="h-6 w-6 mb-2" />}
              {t === "system" && <Monitor className="h-6 w-6 mb-2" />}
              <span className="capitalize text-sm font-medium">{t}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Accent Color">
        <AccentColorPicker />
      </Section>
    </div>
  );
}

function WorkflowSettings() {
  return (
    <div className="space-y-8">
      <Section title="Automation">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Auto-approve Changes</Label>
            <p className="text-sm text-muted-foreground">
              Skip confirmation for file edits.
            </p>
          </div>
          <AutoApproveSwitch />
        </div>
      </Section>

      <Section title="Diagnostics">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Auto-fix Problems</Label>
            <p className="text-sm text-muted-foreground">
              Attempt to verify and fix lint errors automatically.
            </p>
          </div>
          <AutoFixProblemsSwitch />
        </div>
      </Section>
    </div>
  );
}

function AISettings() {
  return (
    <div className="space-y-8">
      <Section title="Limits">
        <MaxChatTurnsSelector />
      </Section>
      <Section title="Thinking Budget">
        <ThinkingBudgetSelector />
      </Section>
    </div>
  )
}


function SupportSection() {
  return (
    <div className="space-y-6">
      <Section title="Resources">
        <div className="grid gap-4">
          <a
            href="https://github.com/Subhan-Haider/Codiner-SH/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Github className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">Report an Issue</div>
              <div className="text-sm text-muted-foreground">
                Found a bug? Let us know on GitHub.
              </div>
            </div>
          </a>
          <a
            href="https://codiner.online"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Globe className="h-5 w-5 mr-3" />
            <div>
              <div className="font-medium">Documentation</div>
              <div className="text-sm text-muted-foreground">
                Read the official docs and guides.
              </div>
            </div>
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
    { key: "enableGhostText", label: "Ghost Text", description: "Show inline AI code completions as you type." },
    { key: "enableSemanticSearch", label: "Semantic Search", description: "Use embeddings for deeper code search and understanding." },
    { key: "enableAutoRefactor", label: "Auto-Refactor", description: "Automatically clean up and format code on save." },
    { key: "enableVimMode", label: "Vim Mode", description: "Enable Vim keybindings for the editor." },
    { key: "enableVoiceControl", label: "Voice Control", description: "Control the IDE with voice commands." },
    { key: "enableLiveCollaboration", label: "Live Collaboration", description: "Share your session with others in real-time." },
    { key: "enableCloudSync", label: "Cloud Sync", description: "Sync your settings and snippets across devices." },
    { key: "enableTerminalMultiplexer", label: "Terminal Multiplexer", description: "Advanced terminal management with split panes." },
    { key: "enableGpuAcceleration", label: "GPU Acceleration", description: "Use local GPU for accelerated model inference." },
    { key: "enablePrivacyMode", label: "Privacy Mode", description: "Blur sensitive data like API keys and tokens in the UI." },
    { key: "enableZenMode", label: "Zen Mode", description: "Distraction-free coding environment." },
    { key: "enableAutoUpdateDependencies", label: "Auto-Update Dependencies", description: "Automatically check and update npm packages." },
    { key: "enableGitLens", label: "Git Lens", description: "Show git blame information inline." },
    { key: "enableSnippetManager", label: "Snippet Manager", description: "Manage and insert code snippets easily." },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg mb-6">
        <div className="flex items-center gap-2 text-yellow-500 mb-2">
          <Beaker className="h-5 w-5" />
          <h3 className="font-bold">Experimental Features</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          These features are in active development and may be unstable. Toggle them on to test the latest capabilities of Codiner.
        </p>
      </div>

      <div className="grid gap-6">
        {featureFlags.map((feature) => (
          <div key={feature.key} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="space-y-1">
              <Label className="text-base">{feature.label}</Label>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
            <Switch
              checked={!!experiments[feature.key as keyof typeof experiments]}
              onCheckedChange={() => toggleExperiment(feature.key as any)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
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
  )
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
