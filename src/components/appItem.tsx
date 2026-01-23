import { formatDistanceToNow } from "date-fns";
import { Star, Box } from "lucide-react";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { App } from "@/ipc/ipc_types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type AppItemProps = {
  app: App;
  handleAppClick: (id: number) => void;
  selectedAppId: number | null;
  handleToggleFavorite: (appId: number, e: React.MouseEvent) => void;
  isFavoriteLoading: boolean;
};

export function AppItem({
  app,
  handleAppClick,
  selectedAppId,
  handleToggleFavorite,
  isFavoriteLoading,
}: AppItemProps) {
  const isSelected = selectedAppId === app.id;

  return (
    <SidebarMenuItem className="mb-0.5 relative group px-2">
      <div
        onClick={() => handleAppClick(app.id)}
        className={`
          flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200
          ${isSelected
            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
          }
        `}
        data-testid={`app-list-item-${app.name}`}
      >
        {/* App Icon/Avatar */}
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-md shrink-0 border
          ${isSelected
            ? "bg-background border-border text-foreground"
            : "bg-muted/50 border-transparent text-muted-foreground group-hover:bg-background group-hover:border-border"
          }
        `}>
          <Box size={16} strokeWidth={1.5} />
        </div>

        {/* Text Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-sm font-medium truncate leading-none mb-1">
            {app.name}
          </span>
          <span className="text-[10px] text-muted-foreground/70 truncate">
            {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* Favorite Button - Visible on hover or if favorited */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => handleToggleFavorite(app.id, e)}
          disabled={isFavoriteLoading}
          className={`
            h-6 w-6 shrink-0 transition-opacity duration-200
            ${app.isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
          data-testid="favorite-button"
        >
          <Star
            size={12}
            className={app.isFavorite ? "fill-orange-400 text-orange-400" : "text-muted-foreground hover:text-orange-400"}
          />
        </Button>
      </div>
    </SidebarMenuItem>
  );
}
