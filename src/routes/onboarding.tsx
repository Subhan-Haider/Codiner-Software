import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import Onboarding from "../pages/Onboarding";

export const onboardingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/onboarding",
    component: Onboarding,
});
