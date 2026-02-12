import { useCallback } from "react";
import { atom } from "jotai";
import { IpcClient } from "@/ipc/ipc_client";
import {
  appConsoleEntriesAtom,
  appUrlAtom,
  currentAppAtom,
  previewPanelKeyAtom,
  previewErrorMessageAtom,
  selectedAppIdAtom,
  previewStatusAtom,
} from "@/atoms/appAtoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AppOutput } from "@/ipc/ipc_types";
import { showInputRequest } from "@/lib/toast";
import { useNotifications } from "@/contexts/NotificationContext";

const useRunAppLoadingAtom = atom(false);

export function useRunApp() {
  const [loading, setLoading] = useAtom(useRunAppLoadingAtom);
  const [app, setApp] = useAtom(currentAppAtom);
  const setConsoleEntries = useSetAtom(appConsoleEntriesAtom);
  const [, setAppUrlObj] = useAtom(appUrlAtom);
  const setPreviewPanelKey = useSetAtom(previewPanelKeyAtom);
  const appId = useAtomValue(selectedAppIdAtom);
  const setPreviewErrorMessage = useSetAtom(previewErrorMessageAtom);
  const setPreviewStatus = useSetAtom(previewStatusAtom);

  const { addNotification } = useNotifications();

  const processProxyServerOutput = (output: AppOutput) => {
    const matchesProxyServerStart = output.message.includes(
      "[codiner-proxy-server]started=[",
    );
    if (matchesProxyServerStart) {
      // Extract both proxy URL and original URL using regex
      const proxyUrlMatch = output.message.match(
        /\[codiner-proxy-server\]started=\[(.*?)\]/,
      );
      const originalUrlMatch = output.message.match(/original=\[(.*?)\]/);

      if (proxyUrlMatch && proxyUrlMatch[1]) {
        const proxyUrl = proxyUrlMatch[1];
        const originalUrl = originalUrlMatch && originalUrlMatch[1];
        setAppUrlObj({
          appUrl: proxyUrl,
          appId: output.appId,
          originalUrl: originalUrl!,
        });

        // Add Notification
        addNotification({
          type: "success",
          title: "App Ready",
          message: `Your app is now running at ${proxyUrl}`,
          metadata: { appId: output.appId, url: proxyUrl }
        });

        // Proactively check if the app root is returning a 404
        IpcClient.getInstance()
          .fetchAppUrl(proxyUrl)
          .catch((err) => {
            if (err.message.includes("(404)")) {
              setPreviewErrorMessage({
                message: `App is running but the home page (/) returned a 404 error. This usually means your 'index.html' is missing or located in a subfolder that Vite isn't serving. Check your file structure.`,
                source: "preview-app",
              });
            }
          });
      }
    }
  };

  const processAppOutput = useCallback(
    (output: AppOutput) => {
      // Handle status updates
      if (output.type === "status") {
        setPreviewStatus(output.message);
        return;
      }

      // Handle input requests specially
      if (output.type === "input-requested") {
        showInputRequest(output.message, async (response) => {
          try {
            const ipcClient = IpcClient.getInstance();
            await ipcClient.respondToAppInput({
              appId: output.appId,
              response,
            });
          } catch (error) {
            console.error("Failed to respond to app input:", error);
          }
        });
        return; // Don't add to regular output
      }

      // Add to console entries
      let level: "error" | "warn" | "info" = "info";

      if (output.type === "stderr" || output.type === "client-error") {
        if (output.message.toLowerCase().includes("warn")) {
          level = "warn";
        } else {
          level = "error";
        }
      }
      setConsoleEntries((prev) => [
        ...prev,
        {
          level,
          type: "build-time",
          message: output.message,
          timestamp: output.timestamp,
          appId: output.appId,
        },
      ]);

      // Heuristic to detect critical startup errors
      const lowerMessage = output.message.toLowerCase();
      const isCriticalError =
        output.type === "stderr" ||
        level === "error" ||
        lowerMessage.includes("error:") ||
        output.message.includes("(!)");

      if (isCriticalError) {
        if (
          lowerMessage.includes("cannot find package") ||
          lowerMessage.includes("not found") ||
          lowerMessage.includes("could not auto-determine entry point") ||
          lowerMessage.includes("failed to load config") ||
          lowerMessage.includes("npm err!") ||
          lowerMessage.includes("error:") ||
          output.message.includes("(!)")
        ) {
          setPreviewErrorMessage({
            message: output.message,
            source: "preview-app",
          });
        }
      }

      // Process proxy server output
      processProxyServerOutput(output);
    },
    [setConsoleEntries],
  );
  const runApp = useCallback(
    async (appId: number) => {
      if (loading) return;
      setLoading(true);
      try {
        const ipcClient = IpcClient.getInstance();
        console.debug("Running app", appId);

        // Clear the URL and add start message
        setAppUrlObj((prevAppUrlObj) => {
          if (prevAppUrlObj?.appId !== appId) {
            return { appUrl: null, appId: null, originalUrl: null };
          }
          return prevAppUrlObj; // No change needed
        });

        setConsoleEntries((prev) => [
          ...prev,
          {
            level: "info",
            type: "build-time",
            message: "Starting app...",
            timestamp: Date.now(),
            appId,
          },
        ]);
        setPreviewStatus(null);
        const app = await ipcClient.getApp(appId);
        setApp(app);
        await ipcClient.runApp(appId, processAppOutput);
        setPreviewErrorMessage(undefined);
      } catch (error) {
        console.error(`Error running app ${appId}:`, error);
        setPreviewErrorMessage(
          error instanceof Error
            ? { message: error.message, source: "codiner-app" }
            : {
              message: error?.toString() || "Unknown error",
              source: "codiner-app",
            },
        );
      } finally {
        setLoading(false);
      }
    },
    [processAppOutput],
  );

  const stopApp = useCallback(async (appId: number) => {
    if (appId === null) {
      return;
    }

    setLoading(true);
    try {
      const ipcClient = IpcClient.getInstance();
      await ipcClient.stopApp(appId);

      setPreviewErrorMessage(undefined);
    } catch (error) {
      console.error(`Error stopping app ${appId}:`, error);
      setPreviewErrorMessage(
        error instanceof Error
          ? { message: error.message, source: "codiner-app" }
          : {
            message: error?.toString() || "Unknown error",
            source: "codiner-app",
          },
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const onHotModuleReload = useCallback(() => {
    setPreviewPanelKey((prevKey) => prevKey + 1);
  }, [setPreviewPanelKey]);

  const restartApp = useCallback(
    async ({
      removeNodeModules = false,
    }: { removeNodeModules?: boolean } = {}) => {
      if (appId === null || loading) {
        return;
      }
      setLoading(true);
      try {
        const ipcClient = IpcClient.getInstance();
        console.debug(
          "Restarting app",
          appId,
          removeNodeModules ? "with node_modules cleanup" : "",
        );

        // Clear the URL and add restart message
        setAppUrlObj({ appUrl: null, appId: null, originalUrl: null });
        setConsoleEntries((prev) => [
          ...prev,
          {
            level: "info",
            type: "build-time",
            message: "Restarting app...",
            timestamp: Date.now(),
            appId,
          },
        ]);

        setPreviewStatus(null);
        const app = await ipcClient.getApp(appId);
        setApp(app);
        await ipcClient.restartApp(
          appId,
          (output) => {
            // Handle HMR updates before processing
            if (
              output.message.includes("hmr update") &&
              output.message.includes("[vite]")
            ) {
              onHotModuleReload();
            }
            // Process normally (including input requests)
            processAppOutput(output);
          },
          removeNodeModules,
        );
      } catch (error) {
        console.error(`Error restarting app ${appId}:`, error);
        setPreviewErrorMessage(
          error instanceof Error
            ? { message: error.message, source: "codiner-app" }
            : {
              message: error?.toString() || "Unknown error",
              source: "codiner-app",
            },
        );
      } finally {
        setPreviewPanelKey((prevKey) => prevKey + 1);
        setLoading(false);
      }
    },
    [
      appId,
      setApp,
      setConsoleEntries,
      setAppUrlObj,
      setPreviewPanelKey,
      processAppOutput,
      onHotModuleReload,
    ],
  );

  const refreshAppIframe = useCallback(async () => {
    setPreviewPanelKey((prevKey) => prevKey + 1);
  }, [setPreviewPanelKey]);

  return {
    loading,
    runApp,
    stopApp,
    restartApp,
    app,
    refreshAppIframe,
  };
}
