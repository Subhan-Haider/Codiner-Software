import React from "react";
import { useAtom } from "jotai";
import { Smartphone, Tablet, Monitor, Laptop, RotateCcw, Wifi, WifiOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deviceTypeAtom, isLandscapeAtom, networkThrottlingAtom } from "@/atoms/previewAtoms";

export function DeviceSimulator() {
    const [deviceType, setDeviceType] = useAtom(deviceTypeAtom);
    const [isLandscape, setIsLandscape] = useAtom(isLandscapeAtom);
    const [network, setNetwork] = useAtom(networkThrottlingAtom);

    const devices = [
        { id: "mobile", icon: Smartphone, label: "Mobile" },
        { id: "tablet", icon: Tablet, label: "Tablet" },
        { id: "laptop", icon: Laptop, label: "Laptop" },
        { id: "desktop", icon: Monitor, label: "Desktop" },
    ];

    return (
        <div className="flex flex-col h-full bg-background p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Device Simulator</h2>
                <p className="text-muted-foreground">Preview your application on different devices and network conditions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Select Device</label>
                    <div className="grid grid-cols-2 gap-3">
                        {devices.map((device) => (
                            <Button
                                key={device.id}
                                variant={deviceType === device.id ? "default" : "outline"}
                                className={cn(
                                    "h-20 flex flex-col gap-2 rounded-2xl transition-all",
                                    deviceType === device.id && "shadow-lg shadow-primary/20 scale-[1.02]"
                                )}
                                onClick={() => setDeviceType(device.id as any)}
                            >
                                <device.icon className="h-6 w-6" />
                                <span className="text-xs font-bold uppercase">{device.label}</span>
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl gap-2 hover:bg-primary/5"
                        onClick={() => setIsLandscape(!isLandscape)}
                    >
                        <RotateCcw className={cn("h-4 w-4 transition-transform duration-500", isLandscape && "rotate-90")} />
                        {isLandscape ? "Switch to Portrait" : "Switch to Landscape"}
                    </Button>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Network Throttling</label>
                    <div className="space-y-3">
                        {[
                            { id: "none", label: "No Throttling (Fast)", icon: Wifi, color: "text-emerald-500" },
                            { id: "4g", label: "4G LTE (Good)", icon: Wifi, color: "text-blue-500" },
                            { id: "3g", label: "3G (Slow)", icon: Wifi, color: "text-amber-500" },
                            { id: "offline", label: "Offline", icon: WifiOff, color: "text-red-500" },
                        ].map((n) => (
                            <Button
                                key={n.id}
                                variant={network === n.id ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start h-14 px-4 rounded-xl gap-4 border border-transparent",
                                    network === n.id && "border-primary/20 bg-primary/5 shadow-sm"
                                )}
                                onClick={() => setNetwork(n.id as any)}
                            >
                                <n.icon className={cn("h-5 w-5", n.color)} />
                                <div className="flex flex-col items-start">
                                    <span className="font-bold text-sm">{n.label}</span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                        {n.id === "none" ? "Unrestricted speed" : `Simulating ${n.id} network`}
                                    </span>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mt-auto">
                <div className="flex items-center gap-4 text-primary font-bold">
                    <Zap className="h-5 w-5" />
                    <span>Active Simulation</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    Your preview will now render using the <strong>{isLandscape ? "Landscape" : "Portrait"} {deviceType}</strong> viewport
                    with <strong>{network === "none" ? "normal" : network}</strong> connectivity.
                </p>
            </div>
        </div>
    );
}
