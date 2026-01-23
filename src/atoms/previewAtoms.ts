import { ComponentSelection, VisualEditingChange } from "@/ipc/ipc_types";
import { atom } from "jotai";

export const selectedComponentsPreviewAtom = atom<ComponentSelection[]>([]);

export const visualEditingSelectedComponentAtom =
  atom<ComponentSelection | null>(null);

export const currentComponentCoordinatesAtom = atom<{
  top: number;
  left: number;
  width: number;
  height: number;
} | null>(null);

export const previewIframeRefAtom = atom<HTMLIFrameElement | null>(null);

export const annotatorModeAtom = atom<boolean>(false);

export const screenshotDataUrlAtom = atom<string | null>(null);
export const pendingVisualChangesAtom = atom<Map<string, VisualEditingChange>>(
  new Map(),
);

// Device Simulation Atoms
export const deviceTypeAtom = atom<"desktop" | "iphone-14-pro" | "pixel-7" | "ipad-air" | "galaxy-s22">("desktop");
export const isLandscapeAtom = atom<boolean>(false);
export const networkThrottlingAtom = atom<"none" | "3g" | "4g" | "offline">("none");
