import {
  Home,
  Inbox,
  Settings,
  HelpCircle,
  Store,
  BookOpen,
  Beaker,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useSidebar } from "@/components/ui/sidebar"; // import useSidebar hook
import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom } from "jotai";
import { dropdownOpenAtom } from "@/atoms/uiAtoms";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { GripVertical, ChevronLeft, ChevronRight, ArrowLeftRight, MoveHorizontal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChatList } from "./ChatList";
import { AppList } from "./AppList";
import { HelpDialog } from "./HelpDialog"; // Import the new dialog
import { SettingsList } from "./SettingsList";
import { LabsList } from "./LabsList";
import { HubList } from "./HubList";
import { LibraryList } from "./LibraryList";
// @ts-ignore
import logo from "../../assets/logo.png";

// Menu items.
const items = [
  {
    title: "Apps",
    to: "/",
    icon: Home,
  },
  {
    title: "Chat",
    to: "/chat",
    icon: Inbox,
  },
  {
    title: "Library",
    to: "/library",
    icon: BookOpen,
  },
  {
    title: "Hub",
    to: "/hub",
    icon: Store,
  },
  {
    title: "Labs",
    to: "/labs",
    icon: Beaker,
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
  },
];

// Hover state types
type HoverState =
  | "start-hover:app"
  | "start-hover:chat"
  | "start-hover:settings"
  | "start-hover:library"
  | "start-hover:hub"
  | "start-hover:labs"
  | "clear-hover"
  | "no-hover";

export function AppSidebar({ className }: { className?: string }) {
  const { state, toggleSidebar } = useSidebar(); // retrieve current sidebar state
  const [hoverState, setHoverState] = useState<HoverState>("no-hover");
  const expandedByHover = useRef(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false); // State for dialog
  const [isDropdownOpen] = useAtom(dropdownOpenAtom);

  const [width, setWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 280 && newWidth < 600) {
        setWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      document.body.classList.add('resizing');
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    } else {
      document.body.classList.remove('resizing');
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    }
    return () => {
      document.body.classList.remove('resizing');
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const { settings } = useSettings();
  const isHoverEnabled = settings?.enableSidebarHover ?? true;

  useEffect(() => {
    if (!isHoverEnabled) return;

    if (hoverState.startsWith("start-hover") && state === "collapsed") {
      expandedByHover.current = true;
      toggleSidebar();
    }
    if (
      hoverState === "clear-hover" &&
      state === "expanded" &&
      expandedByHover.current &&
      !isDropdownOpen
    ) {
      toggleSidebar();
      expandedByHover.current = false;
      setHoverState("no-hover");
    }
  }, [hoverState, toggleSidebar, state, setHoverState, isDropdownOpen, isHoverEnabled]);

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAppRoute = pathname === "/" || pathname.startsWith("/app-details");
  const isChatRoute = pathname === "/chat";
  const isSettingsRoute = pathname.startsWith("/settings");


  let selectedItem: string | null = null;
  if (hoverState.startsWith("start-hover:")) {
    const hoverItem = hoverState.split(":")[1];
    // Map hover state to selectedItem
    const hoverMap: Record<string, string> = {
      app: "Apps",
      chat: "Chat",
      settings: "Settings",
      library: "Library",
      hub: "Hub",
      labs: "Labs",
    };
    selectedItem = hoverMap[hoverItem] || null;
  } else if (state === "expanded") {
    // Determine selected item based on current route if not hovering
    if (pathname === "/" || pathname.startsWith("/app-details")) {
      selectedItem = "Apps";
    } else if (pathname.startsWith("/chat")) {
      selectedItem = "Chat";
    } else if (pathname.startsWith("/settings")) {
      selectedItem = "Settings";
    } else if (pathname.startsWith("/library")) {
      selectedItem = "Library";
    } else if (pathname.startsWith("/hub")) {
      selectedItem = "Hub";
    } else if (pathname.startsWith("/labs")) {
      selectedItem = "Labs";
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      data-resizing={isResizing}
      onMouseLeave={() => {
        if (!isDropdownOpen) {
          setHoverState("clear-hover");
        }
      }}
      className={cn(
        "border-r border-border h-full",
        !isResizing && "transition-all duration-300",
        className
      )}
      style={{
        "--sidebar-width": `${width}px`,
        width: state === "expanded" ? `${width}px` : "var(--sidebar-width-icon)",
      } as React.CSSProperties}
    >
      <SidebarContent className="overflow-hidden">
        {/* Main Flex Container */}
        <div className="flex h-full">

          {/* Left Column: Icon Rail */}
          {/* Added pt-12 to account for window drag region */}
          <div className="flex flex-col items-center border-r border-border/50 bg-secondary/20 w-[72px] pt-0 pb-4 gap-2 h-full z-20">
            <AppIcons onHoverChange={setHoverState} />
          </div>

          {/* Right Column: Content List */}
          {/* Hidden when collapsed to prevent crushing */}
          <div className={`
                min-w-0 bg-background transition-all duration-300 ease-in-out pt-0
                ${state === "collapsed" ? "w-0 min-w-0 flex-none opacity-0 overflow-hidden pointer-events-none" : "flex-1 min-w-0 w-auto opacity-100"}
            `}>
            <div className="h-full w-full px-1">
              <AppList show={selectedItem === "Apps"} />
              <ChatList show={selectedItem === "Chat"} />
              <LibraryList show={selectedItem === "Library"} />
              <SettingsList show={selectedItem === "Settings"} />
              <LabsList show={selectedItem === "Labs"} />
              <HubList show={selectedItem === "Hub"} />
            </div>
          </div>

          {/* Resize Handle */}
          {state === "expanded" && (
            <div
              onMouseDown={startResizing}
              className={cn(
                "absolute -right-1.5 top-0 w-3 h-full cursor-col-resize z-[100] group",
                isResizing && "bg-transparent"
              )}
            >
              {/* The visual line is removed for a cleaner look, the handle remains functional */}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none scale-90 group-hover:scale-100">
                <div className="bg-primary text-primary-foreground p-1 px-2.5 rounded-full shadow-xl border-2 border-background flex items-center justify-center gap-1 min-w-10 h-8">
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-current" />
                  <div className="w-2.5 h-0.5 bg-current rounded-full" />
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-current" />
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Footer and Rail removed/simplified as they are integrated above or unused */}
    </Sidebar>
  );
}

function AppIcons({
  onHoverChange,
}: {
  onHoverChange: (state: HoverState) => void;
}) {
  const { toggleSidebar, state } = useSidebar();
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-2 items-center w-full">
          {items.map((item) => {
            // "Active" logic (simplified)
            const isActive =
              (item.to === "/" && pathname === "/") ||
              (item.to !== "/" && pathname.startsWith(item.to));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{ children: item.title, side: "right" }}
                  className="w-12 h-12 p-0 justify-center group"
                >
                  <Link
                    to={item.to}
                    className={`
                      flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                      ${isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                    onMouseEnter={() => {
                      // Keep hover logic for expanding sub-menus if desired
                      if (item.title === "Apps") onHoverChange("start-hover:app");
                      else if (item.title === "Chat") onHoverChange("start-hover:chat");
                      else if (item.title === "Settings") onHoverChange("start-hover:settings");
                      else if (item.title === "Library") onHoverChange("start-hover:library");
                      else if (item.title === "Hub") onHoverChange("start-hover:hub");
                      else if (item.title === "Labs") onHoverChange("start-hover:labs");
                    }}
                  >
                    <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                    {/* Tiny text label is optionally removed for a cleaner look, or kept if desired. 
                        Let's remove the text label for a pure rail look, relying on Tooltips. */}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}

          {/* Help and Toggle Button moved here to be part of the bottom rail flow */}
          <div className="mt-auto pt-4 border-t w-8 border-border/50 mb-2" />


          <SidebarMenuItem>
            <HelpButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SidebarMenuButton
        className="w-12 h-12 p-0 justify-center"
        onClick={() => setIsOpen(true)}
        tooltip={{ children: "Help", side: "right" }}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <HelpCircle className="h-5 w-5" />
        </div>
      </SidebarMenuButton>
      <HelpDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
