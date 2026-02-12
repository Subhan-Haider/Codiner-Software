import { useQuery } from "@tanstack/react-query";
import { IpcClient } from "@/ipc/ipc_client";
import type { LanguageModelProvider } from "@/ipc/ipc_types";
import { useSettings } from "./useSettings";
import {
  cloudProviders,
  VertexProviderSetting,
  AzureProviderSetting,
} from "@/lib/schemas";

export function useLanguageModelProviders() {
  const ipcClient = IpcClient.getInstance();
  const { settings, envVars } = useSettings();

  const queryResult = useQuery<LanguageModelProvider[], Error>({
    queryKey: ["languageModelProviders"],
    queryFn: async () => {
      return ipcClient.getLanguageModelProviders();
    },
  });

  const { data: ollamaStatus, isLoading: isOllamaLoading } = useQuery({
    queryKey: ["ollamaStatus", settings?.customOllamaPath],
    queryFn: async () => {
      try {
        const installed = await ipcClient.checkOllamaInstalled(settings?.customOllamaPath || undefined);
        if (!installed) return { installed: false, running: false };
        const running = await ipcClient.checkOllamaRunning();
        return { installed, running };
      } catch (error) {
        console.warn("Failed to check Ollama status:", error);
        return { installed: false, running: false };
      }
    },
    refetchInterval: 10000, // Poll every 10s
    enabled: !!settings,
  });

  const isProviderSetup = (provider: string) => {
    const providerSettings = settings?.providerSettings[provider];
    const isLoading = queryResult.isLoading || isOllamaLoading;

    if (isLoading) {
      return false;
    }

    if (provider === "ollama") {
      return !!(ollamaStatus?.installed && ollamaStatus?.running);
    }

    // Vertex uses service account credentials instead of an API key
    if (provider === "vertex") {
      const vertexSettings = providerSettings as VertexProviderSetting;
      if (
        vertexSettings?.serviceAccountKey?.value &&
        vertexSettings?.projectId &&
        vertexSettings?.location
      ) {
        return true;
      }
      return false;
    }
    if (provider === "azure") {
      const azureSettings = providerSettings as AzureProviderSetting;
      const hasSavedSettings = Boolean(
        (azureSettings?.apiKey?.value ?? "").trim() &&
        (azureSettings?.resourceName ?? "").trim(),
      );
      if (hasSavedSettings) {
        return true;
      }
      if (envVars["AZURE_API_KEY"] && envVars["AZURE_RESOURCE_NAME"]) {
        return true;
      }
      return false;
    }
    if (providerSettings?.apiKey?.value) {
      return true;
    }
    const providerData = queryResult.data?.find((p) => p.id === provider);
    if (providerData?.envVarName && envVars[providerData.envVarName]) {
      return true;
    }
    return false;
  };

  const isAnyProviderSetup = () => {
    // Check hardcoded cloud providers
    if (cloudProviders.some((provider) => isProviderSetup(provider))) {
      return true;
    }

    // Check Ollama
    if (isProviderSetup("ollama")) {
      return true;
    }

    // Check custom providers
    const customProviders = queryResult.data?.filter(
      (provider) => provider.type === "custom",
    );
    return (
      customProviders?.some((provider) => isProviderSetup(provider.id)) ?? false
    );
  };

  return {
    ...queryResult,
    isLoading: queryResult.isLoading || isOllamaLoading,
    isProviderSetup,
    isAnyProviderSetup,
  };
}
