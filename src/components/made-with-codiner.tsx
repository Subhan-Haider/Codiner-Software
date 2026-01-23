import { ExternalLink } from "lucide-react";

export const MadeWithCodiner = () => {
  return (
    <a
      href="https://codiner.online"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-[60] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-sm hover:bg-accent transition-colors text-[10px] font-medium text-muted-foreground group no-app-region-drag"
    >
      <span>Made with Codiner</span>
      <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
    </a>
  );
};
