import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { activeSettingsSectionAtom } from "@/atoms/viewAtoms";
import { useNavigate } from "@tanstack/react-router";
import { Settings, User, Monitor, Workflow, Globe, Box, Smartphone, Activity, Beaker, Trash2, HelpCircle, Layers } from "lucide-react";

type SettingsSection = {
  id: string;
  label: string;
  icon?: any;
};

// Matched exactly with SettingsPage tabs
const SETTINGS_SECTIONS: SettingsSection[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "identity", label: "Identity", icon: User },
  { id: "appearance", label: "Appearance", icon: Monitor },
  { id: "workflow", label: "Workflow", icon: Workflow },
  { id: "models", label: "Models", icon: Globe },
  { id: "integrations", label: "Integrations", icon: Layers },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "tools", label: "Tools", icon: Box },
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "labs", label: "Labs", icon: Beaker },
  { id: "support", label: "Support", icon: HelpCircle },
  { id: "reset", label: "Danger Zone", icon: Trash2 },
];

export function SettingsList({ show }: { show: boolean }) {
  const [activeSection, setActiveSection] = useAtom(activeSettingsSectionAtom);
  const navigate = useNavigate();

  if (!show) {
    return null;
  }

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    navigate({ to: "/settings" });
  };

  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
        <h2 className="text-sm font-semibold text-foreground tracking-tight">Settings</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-0.5 px-2">
          {SETTINGS_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                activeSection === section.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <section.icon className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                activeSection === section.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="truncate">{section.label}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
