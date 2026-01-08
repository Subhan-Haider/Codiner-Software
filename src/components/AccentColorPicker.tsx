import React, { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const COLORS = [
    { name: "Default", value: "#3b82f6" }, // Blue
    { name: "Purple", value: "#8b5cf6" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Green", value: "#22c55e" },
    { name: "Emerald", value: "#10b981" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Sky", value: "#0ea5e9" },
    { name: "Indigo", value: "#6366f1" },
    { name: "Slate", value: "#64748b" },
];

export function AccentColorPicker() {
    const { settings, updateSettings } = useSettings();
    const currentAccent = settings?.accentColor || "#3b82f6";

    const handleColorChange = (color: string) => {
        updateSettings({ accentColor: color });
    };

    useEffect(() => {
        if (settings?.accentColor) {
            document.documentElement.style.setProperty("--primary", hexToHsl(settings.accentColor));
        } else {
            document.documentElement.style.removeProperty("--primary");
        }
    }, [settings?.accentColor]);

    return (
        <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium">Accent Color</Label>
                <p className="text-xs text-muted-foreground">
                    Personalize your workspace with a custom accent color.
                </p>
            </div>
            <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => handleColorChange(color.value)}
                        className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 flex items-center justify-center",
                            currentAccent === color.value ? "border-white shadow-lg" : "border-transparent"
                        )}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                    >
                        {currentAccent === color.value && <Check size={16} className="text-white drop-shadow-md" />}
                    </button>
                ))}
                <div className="relative w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/50 hover:border-primary transition-colors overflow-hidden">
                    <input
                        type="color"
                        value={currentAccent}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="absolute inset-0 w-[150%] h-[150%] -translate-x-[20%] -translate-y-[20%] cursor-pointer opacity-0"
                    />
                    <div className="w-full h-full flex items-center justify-center text-[20px] pointer-events-none">
                        🎨
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper to convert hex to HSL string compatible with Tailwind's --primary expectation
// Tailwind usually expects "221.2 83.2% 53.3%" but shadcn/ui variables often use HSL values directly.
function hexToHsl(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }

    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
