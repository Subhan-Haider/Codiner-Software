import { createRouter, Navigate } from "@tanstack/react-router";
import { rootRoute } from "./routes/root";
import { homeRoute } from "./routes/home";
import { chatRoute } from "./routes/chat";
import { settingsRoute } from "./routes/settings";
import { providerSettingsRoute } from "./routes/settings/providers/$provider";
import { appDetailsRoute } from "./routes/app-details";
import { hubRoute } from "./routes/hub";
import { libraryRoute } from "./routes/library";
import { onboardingRoute } from "./routes/onboarding";
import * as React from "react";

const routes = [
  homeRoute,
  onboardingRoute,
  hubRoute,
  libraryRoute,
  chatRoute,
  appDetailsRoute,
  settingsRoute,
].filter(Boolean);

// Define nested routes
if (settingsRoute && providerSettingsRoute) {
  settingsRoute.addChildren([providerSettingsRoute]);
}

const routeTree = rootRoute.addChildren(routes);

export function RouterErrorBoundary({ error }: { error: any }) {
  console.error("Router Error:", error);
  return (
    <div className="p-8 flex items-center justify-center min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-md w-full p-10 border border-destructive/20 bg-destructive/5 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(var(--destructive-rgb),0.2)] backdrop-blur-xl animate-in zoom-in duration-500">
        <div className="p-4 rounded-2xl bg-destructive/10 text-destructive w-fit mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-destructive mb-3 tracking-tight">Neural Router Disruption</h2>
        <p className="text-muted-foreground font-medium mb-8 leading-relaxed opacity-80">
          The navigation logic encountered a critical exception. This anomaly has been isolated for system integrity.
        </p>
        <div className="p-5 bg-black/10 dark:bg-black/40 rounded-2xl font-mono text-[11px] overflow-auto mb-8 border border-destructive/10 text-destructive-foreground/70">
          <span className="text-destructive font-bold mr-2">[CRITICAL_FAULT]</span>
          {error?.message || "Unknown routing anomaly"}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-destructive text-destructive-foreground font-black rounded-2xl shadow-lg shadow-destructive/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Re-initialize Collective
        </button>
      </div>
    </div>
  );
}

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <Navigate to="/" replace />,
  defaultErrorComponent: RouterErrorBoundary,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 30_000,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
