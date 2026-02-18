import { createRoute } from "@tanstack/react-router";
import { ProviderSettingsPage } from "@/components/settings/ProviderSettingsPage";
import { settingsRoute } from "../../settings";

export const providerSettingsRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: "providers/$provider",
  component: function ProviderSettingsRouteComponent() {
    const { provider } = providerSettingsRoute.useParams();

    return <ProviderSettingsPage provider={provider} />;
  },
});
