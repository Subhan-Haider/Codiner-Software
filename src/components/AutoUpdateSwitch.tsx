import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { IpcClient } from "@/ipc/ipc_client";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppVersion } from "@/hooks/useAppVersion";
import { Progress } from "@/components/ui/progress";

export function AutoUpdateSwitch() {
  const { settings, updateSettings } = useSettings();
  const currentVersion = useAppVersion();

  const [isChecking, setIsChecking] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  useEffect(() => {
    const ipc = IpcClient.getInstance();

    // Listen for auto-updater events
    const unsubscribe = ipc.onAutoUpdaterEvent((event) => {
      switch (event.event) {
        case "update-available":
          toast.info(`New version ${event.data.version} available!`, {
            description: "Update will download in the background.",
          });
          break;

        case "download-progress":
          setDownloadProgress(event.data.percent);
          break;

        case "update-downloaded":
          setDownloadProgress(100);
          toast.success("Update downloaded!", {
            description: "Restart to install the update.",
            action: {
              label: "Restart Now",
              onClick: async () => {
                await ipc.invoke("auto-updater:quit-and-install");
              },
            },
          });
          break;

        case "update-not-available":
          if (isChecking) {
            toast.success("You're up to date!", {
              description: `Codiner ${currentVersion} is the latest version.`,
            });
          }
          break;

        case "update-error":
          toast.error("Update check failed", {
            description: event.data?.message || "An error occurred while checking for updates.",
          });
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isChecking, currentVersion]);

  if (!settings) {
    return null;
  }

  const handleCheckNow = async () => {
    try {
      setIsChecking(true);
      // Use the new auto-updater IPC
      await IpcClient.getInstance().invoke("auto-updater:check-for-updates");
    } catch (error) {
      console.error("Update check failed:", error);
      toast.error("Could not check for updates", {
        description: "Unable to reach update server. You can try again later or check manually on GitHub.",
        duration: 3000,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      <div className="flex items-center space-x-3 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 shadow-inner">
        <Switch
          id="enable-auto-update"
          checked={settings.enableAutoUpdate}
          onCheckedChange={(checked) => {
            updateSettings({ enableAutoUpdate: checked });
            toast("Auto-update preference saved");
          }}
        />
        <Label htmlFor="enable-auto-update" className="text-[10px] font-black uppercase tracking-widest text-primary/70 cursor-pointer">
          Background Polling
        </Label>
      </div>

      <div className="w-full space-y-4">
        {!downloadProgress && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCheckNow}
            disabled={isChecking}
            className="w-full rounded-2xl h-12 font-black uppercase tracking-widest text-[11px] bg-white/50 dark:bg-black/20 hover:bg-primary hover:text-white transition-all duration-500 border-primary/20 shadow-lg hover:shadow-primary/20"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isChecking && "animate-spin")} />
            {isChecking ? "Checking..." : "Check for Updates"}
          </Button>
        )}

        {downloadProgress !== null && downloadProgress < 100 && (
          <div className="w-full space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Downloading Update...
              </span>
              <span className="text-xs font-mono font-black">{Math.round(downloadProgress)}%</span>
            </div>
            <Progress value={downloadProgress} className="h-3 shadow-inner" />
          </div>
        )}

        {downloadProgress === 100 && (
          <div className="glass-card p-6 rounded-[2rem] border-primary/20 bg-primary/5 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 animate-bounce" />
              <span className="font-black text-sm uppercase tracking-tighter">Update Ready</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
              Restart Codiner to complete the installation
            </p>
            <Button
              onClick={async () => {
                await IpcClient.getInstance().invoke("auto-updater:quit-and-install");
              }}
              className="w-full rounded-xl font-black uppercase tracking-widest text-[10px] bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Restart Now
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 opacity-40">
          <div className="h-1 w-1 rounded-full bg-primary" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em]">Auto-Update Cloud Sync</span>
        </div>

        <button
          onClick={() => IpcClient.getInstance().invoke("open-external-url", "https://github.com/Subhan-Haider/Codiner-Software/releases")}
          className="text-[9px] text-muted-foreground hover:text-primary underline decoration-dotted underline-offset-4 transition-colors font-medium tracking-wide"
        >
          Check Releases Manually
        </button>
      </div>
    </div>
  );
}
