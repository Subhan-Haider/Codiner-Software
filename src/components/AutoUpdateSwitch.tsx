import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { IpcClient } from "@/ipc/ipc_client";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AutoUpdateSwitch() {
  const { settings, updateSettings } = useSettings();

  const [isChecking, setIsChecking] = useState(false);

  if (!settings) {
    return null;
  }

  const handleCheckNow = async () => {
    try {
      setIsChecking(true);
      await IpcClient.getInstance().checkForUpdates();
      toast.info("Update check initiated", {
        description: "Codiner is checking the nexus for optimizations.",
      });
    } catch (error) {
      console.error("Update check failed:", error);
      toast.error("Update check failed");
    } finally {
      setTimeout(() => setIsChecking(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center space-x-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 shadow-inner">
        <Switch
          id="enable-auto-update"
          checked={settings.enableAutoUpdate}
          onCheckedChange={(checked) => {
            updateSettings({ enableAutoUpdate: checked });
            toast("Auto-update settings changed", {
              description:
                "You will need to restart Codiner for your settings to take effect.",
              action: {
                label: "Restart Codiner",
                onClick: () => {
                  IpcClient.getInstance().restartCodiner();
                },
              },
            });
          }}
        />
        <Label htmlFor="enable-auto-update" className="text-xs font-black uppercase tracking-widest text-primary/70 cursor-pointer">
          Background Sync
        </Label>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCheckNow}
        disabled={isChecking}
        className="rounded-full px-6 font-black uppercase tracking-widest text-[10px] bg-white/50 dark:bg-black/20 hover:bg-primary hover:text-white transition-all duration-500 border-primary/20 shadow-lg hover:shadow-primary/20"
      >
        <RefreshCw className={cn("h-3 w-3 mr-2", isChecking && "animate-spin")} />
        {isChecking ? "Checking Nexus..." : "Check Now"}
      </Button>
    </div>
  );
}
