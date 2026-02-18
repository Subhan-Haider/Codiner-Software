import { useNavigate } from "@tanstack/react-router";
import { PlusCircle, Search, LayoutGrid } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import { selectedAppIdAtom } from "@/atoms/appAtoms";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { selectedChatIdAtom } from "@/atoms/chatAtoms";
import { useLoadApps } from "@/hooks/useLoadApps";
import { useMemo, useState } from "react";
import { AppSearchDialog } from "./AppSearchDialog";
import { useAddAppToFavorite } from "@/hooks/useAddAppToFavorite";
import { AppItem } from "./appItem";
export function AppList({ show }: { show?: boolean }) {
  const navigate = useNavigate();
  const [selectedAppId, setSelectedAppId] = useAtom(selectedAppIdAtom);
  const setSelectedChatId = useSetAtom(selectedChatIdAtom);
  const { apps, loading, error } = useLoadApps();
  const { toggleFavorite, isLoading: isFavoriteLoading } =
    useAddAppToFavorite();
  // search dialog state
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const allApps = useMemo(
    () =>
      apps.map((a) => ({
        id: a.id,
        name: a.name,
        createdAt: a.createdAt,
        matchedChatTitle: null,
        matchedChatMessage: null,
      })),
    [apps],
  );

  const favoriteApps = useMemo(
    () => apps.filter((app) => app.isFavorite),
    [apps],
  );

  const nonFavoriteApps = useMemo(
    () => apps.filter((app) => !app.isFavorite),
    [apps],
  );

  if (!show) {
    return null;
  }

  const handleAppClick = (id: number) => {
    setSelectedAppId(id);
    setSelectedChatId(null);
    setIsSearchDialogOpen(false);
    navigate({
      to: "/",
      search: { appId: id },
    });
  };

  const handleNewApp = () => {
    navigate({ to: "/" });
    // We'll eventually need a create app workflow
  };

  const handleToggleFavorite = (appId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(appId);
  };

  return (
    <>
      <SidebarGroup
        className="overflow-y-auto h-[calc(100vh-112px)] py-4"
        data-testid="app-list-container"
      >
        <SidebarGroupContent>
          <div className="flex items-center justify-between px-4 py-2 mb-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <div className="text-xs font-bold text-foreground tracking-wider truncate whitespace-nowrap">APPS</div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => setIsSearchDialogOpen(true)}
                data-testid="search-apps-button"
                title="Search Apps"
              >
                <Search size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={handleNewApp}
                title="Create New App"
              >
                <PlusCircle size={16} />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground/50 gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              <span className="text-xs">Loading apps...</span>
            </div>
          ) : error ? (
            <div className="py-4 px-4 text-xs text-red-500 text-center bg-red-500/5 rounded-lg mx-2 border border-red-500/10">
              Failed to load apps
            </div>
          ) : apps.length === 0 ? (
            <div className="py-8 px-4 text-sm text-muted-foreground text-center">
              No apps found. Create one to get started!
            </div>
          ) : (
            <SidebarMenu className="space-y-1.5 px-2" data-testid="app-list">
              {favoriteApps.length > 0 && (
                <>
                  <div className="px-2 mt-4 mb-2 text-[10px] font-bold text-muted-foreground/50 tracking-wider uppercase">
                    Favorites
                  </div>
                  {favoriteApps.map((app) => (
                    <AppItem
                      key={app.id}
                      app={app}
                      handleAppClick={handleAppClick}
                      selectedAppId={selectedAppId}
                      handleToggleFavorite={handleToggleFavorite}
                      isFavoriteLoading={isFavoriteLoading}
                    />
                  ))}
                </>
              )}

              <div className="px-2 mt-4 mb-2 text-[10px] font-bold text-muted-foreground/50 tracking-wider uppercase">
                All Apps
              </div>
              {nonFavoriteApps.map((app) => (
                <AppItem
                  key={app.id}
                  app={app}
                  handleAppClick={handleAppClick}
                  selectedAppId={selectedAppId}
                  handleToggleFavorite={handleToggleFavorite}
                  isFavoriteLoading={isFavoriteLoading}
                />
              ))}
            </SidebarMenu>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
      <AppSearchDialog
        open={isSearchDialogOpen}
        onOpenChange={setIsSearchDialogOpen}
        onSelectApp={handleAppClick}
        allApps={allApps}
      />
    </>
  );
}
