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
  const [updateAvailable, setUpdateAvailable] = useState<any>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadPath, setDownloadPath] = useState<string | null>(null);

  useEffect(() => {
    const ipc = IpcClient.getInstance();

    const unsubsProgress = ipc.onUpdateProgress((percent) => {
      setDownloadProgress(percent);
    });

    const unsubsDone = ipc.onUpdateDone((path) => {
      setDownloadPath(path);
      setDownloadProgress(100);
      toast.success("Download complete!", {
        description: "You can now install the update from your downloads folder.",
        action: {
          label: "Install Now",
          onClick: () => {
            ipc.showItemInFolder(path);
          }
        }
      });
    });

    return () => {
      unsubsProgress();
      unsubsDone();
    };
  }, []);

  if (!settings) {
    return null;
  }

  const handleCheckNow = async () => {
    try {
      setIsChecking(true);
      const latest = await IpcClient.getInstance().getLatestRelease();
      const latestVersion = latest.tag_name.replace("v", "");

      if (latestVersion !== currentVersion) {
        setUpdateAvailable(latest);
        toast.info(`New version ${latestVersion} available!`, {
          description: "An optimization payload is ready for deployment.",
        });
      } else {
        toast.success("System aggregate is optimal", {
          description: "You are running the latest version of Codiner.",
        });
      }
    } catch (error) {
      console.error("Update check failed:", error);
      toast.error("Nexus sync failed", {
        description: "Could not reach the update server. Check your connection."
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownload = async () => {
    if (!updateAvailable) return;
    try {
      setDownloadProgress(0);
      await IpcClient.getInstance().downloadUpdate(updateAvailable);
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed");
      setDownloadProgress(null);
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
        {!updateAvailable && !downloadProgress && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCheckNow}
            disabled={isChecking}
            className="w-full rounded-2xl h-12 font-black uppercase tracking-widest text-[11px] bg-white/50 dark:bg-black/20 hover:bg-primary hover:text-white transition-all duration-500 border-primary/20 shadow-lg hover:shadow-primary/20"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isChecking && "animate-spin")} />
            {isChecking ? "Synchronizing..." : "Check for Updates"}
          </Button>
        )}

        {updateAvailable && !downloadProgress && (
          <div className="glass-card p-6 rounded-[2rem] border-primary/20 bg-primary/5 flex flex-col items-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-primary animate-bounce" />
              <span className="font-black text-sm uppercase tracking-tighter">New Version Detected</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
              Version {updateAvailable.tag_name} is ready for architectural sync.
            </p>
            <Button
              onClick={handleDownload}
              className="w-full rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
            >
              Begin Download
            </Button>
          </div>
        )}

        {downloadProgress !== null && (
          <div className="w-full space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                {downloadProgress < 100 ? "Syncing Payload..." : "Sync Complete"}
              </span>
              <span className="text-xs font-mono font-black">{downloadProgress}%</span>
            </div>
            <Progress value={downloadProgress} className="h-3 shadow-inner" />

            {downloadProgress === 100 && downloadPath && (
              <Button
                variant="default"
                onClick={() => IpcClient.getInstance().showItemInFolder(downloadPath)}
                className="w-full rounded-xl font-black uppercase tracking-widest text-[10px] bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Open Installer
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-40">
        <div className="h-1 w-1 rounded-full bg-primary" />
        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Manual Install Protocol Enabled</span>
      </div>
    </div>
  );
}
