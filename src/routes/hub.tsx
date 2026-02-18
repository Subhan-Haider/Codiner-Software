import { createRoute } from "@tanstack/react-router";
import HubPage from "../pages/hub";
import { rootRoute } from "./root";

export const hubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hub",
  component: HubPage,
});
