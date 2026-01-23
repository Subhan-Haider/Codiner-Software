import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, Trash2, Clipboard, Check } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { showSuccess, showError } from "@/lib/toast";
import { IpcClient } from "@/ipc/ipc_client";

export function GitHubIntegration() {
  const { settings, refreshSettings, updateSettings } = useSettings();
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // --- GitHub Device Flow State ---
  const [githubUserCode, setGithubUserCode] = useState<string | null>(null);
  const [githubVerificationUri, setGithubVerificationUri] = useState<
    string | null
  >(null);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [githubStatusMessage, setGithubStatusMessage] = useState<string | null>(
    null,
  );
  const [codeCopied, setCodeCopied] = useState(false);

  useEffect(() => {
    const cleanupFunctions: (() => void)[] = [];

    // Listener for updates (user code, verification uri, status messages)
    const removeUpdateListener =
      IpcClient.getInstance().onGithubDeviceFlowUpdate((data) => {
        if (data.userCode) {
          setGithubUserCode(data.userCode);
        }
        if (data.verificationUri) {
          setGithubVerificationUri(data.verificationUri);
        }
        if (data.message) {
          setGithubStatusMessage(data.message);
        }
        setGithubError(null);
        setIsConnecting(true);
      });
    cleanupFunctions.push(removeUpdateListener);

    // Listener for success
    const removeSuccessListener =
      IpcClient.getInstance().onGithubDeviceFlowSuccess((data) => {
        setGithubStatusMessage("Successfully connected to GitHub!");
        setGithubUserCode(null);
        setGithubVerificationUri(null);
        setGithubError(null);
        setIsConnecting(false);
        refreshSettings();
        showSuccess("Successfully connected to GitHub!");
      });
    cleanupFunctions.push(removeSuccessListener);

    // Listener for errors
    const removeErrorListener = IpcClient.getInstance().onGithubDeviceFlowError(
      (data) => {
        setGithubError(data.error || "An unknown error occurred.");
        setGithubStatusMessage(null);
        setGithubUserCode(null);
        setGithubVerificationUri(null);
        setIsConnecting(false);
      },
    );
    cleanupFunctions.push(removeErrorListener);

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [refreshSettings]);

  const handleDisconnectFromGithub = async () => {
    setIsDisconnecting(true);
    try {
      const result = await updateSettings({
        githubAccessToken: undefined,
        githubUser: undefined,
      });
      if (result) {
        showSuccess("Successfully disconnected from GitHub");
      } else {
        showError("Failed to disconnect from GitHub");
      }
    } catch (err: any) {
      showError(
        err.message || "An error occurred while disconnecting from GitHub",
      );
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleConnectToGithub = async () => {
    setIsConnecting(true);
    setGithubError(null);
    setGithubUserCode(null);
    setGithubVerificationUri(null);
    setGithubStatusMessage("Initiating GitHub connection...");

    try {
      IpcClient.getInstance().startGithubDeviceFlow(null);
    } catch (err: any) {
      setIsConnecting(false);
      setGithubError(err.message || "Failed to start GitHub connection");
    }
  };

  const isConnected = !!settings?.githubAccessToken;

  return (
    <div className="flex flex-col items-center text-center space-y-4 p-6 md:p-8 bg-zinc-500/5 rounded-[2rem] md:rounded-3xl border border-zinc-500/10 transition-all hover:bg-zinc-500/10">
      <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl shadow-sm border border-zinc-500/10">
        <Github className="h-6 w-6 md:h-8 md:w-8 text-[#181717] dark:text-white" />
      </div>

      {!isConnected ? (
        <>
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-black tracking-tight leading-none">
              GitHub Infrastructure
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-medium max-w-sm mx-auto">
              Connect your GitHub account to sync repositories and enable collaboration
            </p>
            <p className="text-xs text-muted-foreground/60 font-medium">
              Secure GitHub Device Flow OAuth
            </p>
          </div>

          <Button
            onClick={handleConnectToGithub}
            disabled={isConnecting}
            className="h-12 md:h-14 px-6 md:px-8 rounded-xl font-black gap-3 shadow-lg shadow-blue-500/10 text-xs md:text-sm uppercase tracking-widest bg-[#238636] hover:bg-[#2ea043] text-white"
          >
            {isConnecting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Connecting...
              </>
            ) : (
              "Connect to GitHub"
            )}
            <Github className="h-4 w-4" />
          </Button>

          {/* Device Flow Connection UI */}
          {(githubUserCode || githubStatusMessage || githubError) && (
            <div className="mt-4 w-full max-w-md p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-500/10 shadow-xl space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500">
                GitHub Connection Step
              </h4>

              {githubError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                  {githubError}
                </div>
              )}

              {githubUserCode && githubVerificationUri && (
                <div className="space-y-4 py-2">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-zinc-400">1. Open Verification Page</p>
                    <a
                      href={githubVerificationUri}
                      onClick={(e) => {
                        e.preventDefault();
                        IpcClient.getInstance().openExternalUrl(githubVerificationUri);
                      }}
                      className="text-blue-500 hover:text-blue-400 font-bold break-all underline decoration-2 underline-offset-4"
                    >
                      {githubVerificationUri}
                    </a>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold text-zinc-400">2. Enter This Code</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 font-mono text-2xl font-black tracking-widest text-zinc-900 dark:text-white">
                        {githubUserCode}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-xl h-10 w-10 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => {
                          navigator.clipboard.writeText(githubUserCode).then(() => {
                            setCodeCopied(true);
                            setTimeout(() => setCodeCopied(false), 2000);
                          });
                        }}
                      >
                        {codeCopied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clipboard className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {githubStatusMessage && (
                <p className="text-sm font-medium text-zinc-500 animate-pulse">
                  {githubStatusMessage}
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-black tracking-tight leading-none">
              GitHub Infrastructure
            </h3>
            <p className="text-sm md:text-base text-muted-foreground font-medium max-w-sm mx-auto">
              Connected as{" "}
              <span className="text-white font-bold bg-zinc-500/20 px-2 py-0.5 rounded-lg items-center gap-2 inline-flex">
                {settings?.githubUser?.avatarUrl && (
                  <img
                    src={settings.githubUser.avatarUrl}
                    alt="GitHub Avatar"
                    className="h-4 w-4 rounded-full"
                  />
                )}
                {settings?.githubUser?.login || settings?.githubUser?.email || "Authenticated User"}
              </span>
            </p>
            <p className="text-xs text-muted-foreground/60 font-medium">
              Link active via GitHub secure protocols
            </p>
          </div>

          <Button
            onClick={handleDisconnectFromGithub}
            variant="destructive"
            disabled={isDisconnecting}
            className="h-12 md:h-14 px-6 md:px-8 rounded-xl font-black gap-3 shadow-lg shadow-red-500/10 text-xs md:text-sm uppercase tracking-widest"
          >
            {isDisconnecting ? "Disconnecting..." : "Terminate GitHub Session"}
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}

