import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { selectedAppIdAtom } from "@/atoms/appAtoms";
import { useAtomValue } from "jotai";
import { showError } from "@/lib/toast";
import { useLoadApp } from "@/hooks/useLoadApp";

interface CodinerAddIntegrationProps {
  node: {
    properties: {
      provider: string;
    };
  };
  children: React.ReactNode;
}

export const CodinerAddIntegration: React.FC<CodinerAddIntegrationProps> = ({
  node,
  children,
}) => {
  const navigate = useNavigate();

  const { provider } = node.properties;
  const appId = useAtomValue(selectedAppIdAtom);
  const { app } = useLoadApp(appId);

  const handleSetupClick = () => {
    if (!appId) {
      showError("No app ID found");
      return;
    }
    navigate({ to: "/app-details", search: { appId } });
  };



  return (
    <div className="flex flex-col gap-2 my-2 p-3 border rounded-md bg-secondary/10">
      <div className="text-sm">
        <div className="font-medium">Integrate with {provider}?</div>
        <div className="text-muted-foreground text-xs">{children}</div>
      </div>
      <Button onClick={handleSetupClick} className="self-start w-full">
        Set up {provider}
      </Button>
    </div>
  );
};
