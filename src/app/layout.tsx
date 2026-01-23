import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";
import { DeepLinkProvider } from "../contexts/DeepLinkContext";
import { MadeWithCodiner } from "@/components/made-with-codiner";
import { TitleBar } from "./TitleBar";
import { CommandCenter } from "@/components/CommandCenter";
import { useEffect, type ReactNode } from "react";
import { useRunApp } from "@/hooks/useRunApp";
import { useAtomValue, useSetAtom } from "jotai";
import {
  appConsoleEntriesAtom,
  previewModeAtom,
  selectedAppIdAtom,
} from "@/atoms/appAtoms";
import { activeSettingsSectionAtom } from "@/atoms/viewAtoms";
import { useSettings } from "@/hooks/useSettings";
import type { ZoomLevel } from "@/lib/schemas";
import { selectedComponentsPreviewAtom } from "@/atoms/previewAtoms";
import { chatInputValueAtom } from "@/atoms/chatAtoms";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const DEFAULT_ZOOM_LEVEL: ZoomLevel = "100";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { refreshAppIframe } = useRunApp();
  const previewMode = useAtomValue(previewModeAtom);
  const { settings, loading } = useSettings();
  const setSelectedComponentsPreview = useSetAtom(
    selectedComponentsPreviewAtom,
  );
  const setChatInput = useSetAtom(chatInputValueAtom);
  const selectedAppId = useAtomValue(selectedAppIdAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const setConsoleEntries = useSetAtom(appConsoleEntriesAtom);

  const isOnboarding = location.pathname === "/onboarding";

  useEffect(() => {
    // Redirect if onboarding is not completed
    if (settings && settings.hasCompletedOnboarding === false && !isOnboarding) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [settings?.hasCompletedOnboarding, isOnboarding, navigate]);

  useEffect(() => {
    const zoomLevel = settings?.zoomLevel ?? DEFAULT_ZOOM_LEVEL;
    const zoomFactor = Number(zoomLevel) / 100;

    const electronApi = (
      window as Window & {
        electron?: {
          webFrame?: {
            setZoomFactor: (factor: number) => void;
          };
        };
      }
    ).electron;

    if (electronApi?.webFrame?.setZoomFactor) {
      electronApi.webFrame.setZoomFactor(zoomFactor);

      return () => {
        electronApi.webFrame?.setZoomFactor(Number(DEFAULT_ZOOM_LEVEL) / 100);
      };
    }
  }, [settings?.zoomLevel]);

  useEffect(() => {
    // Prevent style thrashing/resetting while loading
    if (loading) return;

    if (settings?.accentColor) {
      document.documentElement.style.setProperty("--primary", settings.accentColor);
      document.documentElement.style.setProperty("--ring", settings.accentColor);
      document.documentElement.style.setProperty("--sidebar-primary", settings.accentColor);
    } else {
      document.documentElement.style.removeProperty("--primary");
      document.documentElement.style.removeProperty("--ring");
      document.documentElement.style.removeProperty("--sidebar-primary");
    }

    if (settings?.appFontFamily) {
      const fontMap: Record<string, string> = {
        inter: "Inter, sans-serif",
        system: "system-ui, -apple-system, sans-serif",
        mono: "monospace",
        dyslexic: "OpenDyslexic, sans-serif",
      };
      const font = fontMap[settings.appFontFamily] || fontMap.inter;
      document.body.style.fontFamily = font;
    } else {
      document.body.style.removeProperty("font-family");
    }

    if (settings?.appFontWeight) {
      const weightMap: Record<string, string> = {
        normal: "400",
        medium: "500",
        bold: "600"
      };
      // Apply to body and maybe force it on all elements via css var or direct style if needed
      // For now, body style inheritance is standard.
      document.body.style.fontWeight = weightMap[settings.appFontWeight] || "400";
    } else {
      document.body.style.removeProperty("font-weight");
    }

    if (settings?.appFontSize) {
      const sizeMap: Record<string, string> = {
        small: "14px",
        normal: "16px",
        large: "18px",
        "extra-large": "20px",
      };
      document.documentElement.style.fontSize = sizeMap[settings.appFontSize] || "16px";
    } else {
      document.documentElement.style.removeProperty("font-size");
    }
  }, [settings?.accentColor, settings?.appFontFamily, settings?.appFontWeight, settings?.appFontSize, loading]);

  // Global keyboard listener for refresh events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+R (Windows/Linux) or Cmd+R (macOS)
      if (event.key === "r" && (event.ctrlKey || event.metaKey)) {
        if (previewMode === "preview") {
          event.preventDefault(); // Prevent default browser refresh
          refreshAppIframe(); // Use our custom refresh function instead
        }
        // Otherwise, allow the standard browser/Electron refresh to happen
      }
    };

    // Add event listener to document
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [refreshAppIframe, previewMode]);

  useEffect(() => {
    setChatInput("");
    setSelectedComponentsPreview([]);
    setConsoleEntries([]);
  }, [selectedAppId]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background relative selection:bg-primary/30">
      <ThemeProvider>
        <DeepLinkProvider>
          <div className="flex flex-col h-screen w-full overflow-hidden">
            {!isOnboarding && <TitleBar />}

            <SidebarProvider className="flex-1 overflow-hidden">
              {!isOnboarding && <CommandCenter />}

              <div className="flex-1 flex overflow-hidden w-full h-full relative">
                {/* Sidebar */}
                {!isOnboarding && (
                  <div className="mt-11 h-[calc(100vh-44px)]">
                    <AppSidebar className="!top-[44px] !h-[calc(100vh-44px)]" />
                  </div>
                )}

                {/* Main content */}
                <main
                  id="layout-main-content-container"
                  className={cn(
                    "flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-in-out h-[calc(100vh-88px)]",
                    !isOnboarding ? "mt-14" : "m-0"
                  )}
                >
                  <div className={cn(
                    "flex-1 w-full h-full overflow-x-hidden overflow-y-auto border-l border-border/40 bg-background",
                    isOnboarding ? "border-none" : ""
                  )}>
                    {children}
                  </div>
                </main>
              </div>

              {!isOnboarding && <MadeWithCodiner />}
            </SidebarProvider>
          </div>
        </DeepLinkProvider>
      </ThemeProvider>
    </div>
  );
}
