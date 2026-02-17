"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Settings, Globe, Shield, Zap, Search, Layout, Save, Terminal, Database, Bell, Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SettingsSection() {
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        siteTitle: "Codiner - Neural AI App Foundry",
        siteDescription: "Build full-stack applications with AI. Free, local, and neural-powered.",
        requireAuthForDownload: true,
        telemetryEnabled: true,
        globalBetaAccess: false,
        maintenanceMode: false
    });

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "settings", "global");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setSettings({ ...settings, ...docSnap.data() });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await setDoc(doc(db, "settings", "global"), settings);
            alert("Matrix parameters updated successfully.");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to sync matrix parameters.");
        }
        setIsSaving(false);
    };

    const toggleFlag = (flag: keyof typeof settings) => {
        setSettings({ ...settings, [flag]: !settings[flag] as any });
    };

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 text-left relative">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">System <span className="text-gradient">Config</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Global foundry and website parameters.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:scale-105 transition-all shadow-2xl shadow-primary/30 disabled:opacity-50"
                >
                    {isSaving ? (
                        <div className="w-5 h-5 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    Deploy Changes
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* General Site Config */}
                <div className="space-y-8">
                    <section className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <Globe className="w-6 h-6 text-primary" />
                            <h4 className="text-2xl font-black italic tracking-tight lowercase">Neural SEO & Meta</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Site Title Matrix</label>
                                <input
                                    type="text"
                                    value={settings.siteTitle}
                                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none font-bold italic"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Meta Pulse Description</label>
                                <textarea
                                    rows={3}
                                    value={settings.siteDescription}
                                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none font-bold italic resize-none"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <Palette className="w-6 h-6 text-blue-500" />
                            <h4 className="text-2xl font-black italic tracking-tight lowercase">Interface Aesthetic</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Primary Pulse</label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border opacity-50 cursor-not-allowed">
                                    <div className="w-8 h-8 rounded-lg bg-primary" />
                                    <span className="font-bold text-sm tracking-widest">#9B59B6</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Matrix Background</label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border opacity-50 cursor-not-allowed">
                                    <div className="w-8 h-8 rounded-lg bg-[#0d1117]" />
                                    <span className="font-bold text-sm tracking-widest">#0D1117</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-[10px] text-muted-foreground italic font-medium lowercase">* Aesthetic overrides are currently locked for stability.</p>
                    </section>
                </div>

                {/* Security and Feature Flags */}
                <div className="space-y-8">
                    <section className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl text-left">
                        <div className="flex items-center gap-4 mb-8">
                            <Shield className="w-6 h-6 text-red-500" />
                            <h4 className="text-2xl font-black italic tracking-tight lowercase">Safety & Shield</h4>
                        </div>
                        <div className="space-y-6">
                            {[
                                { key: "requireAuthForDownload", label: "Require Auth for Download", desc: "Forced logic sync before binary access" },
                                { key: "telemetryEnabled", label: "Telemetry & Usage", desc: "Anonymous pulse collection for optimization" },
                                { key: "globalBetaAccess", label: "Global Beta Access", desc: "Allow experimental neural features" },
                                { key: "maintenanceMode", label: "Maintenance Lockout", desc: "Restrict matrix access for updates" }
                            ].map((f, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-white/2 border border-border/50">
                                    <div className="flex-1 pr-6">
                                        <div className="font-black italic lowercase text-lg leading-tight mb-1">{f.label}</div>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{f.desc}</p>
                                    </div>
                                    <div
                                        onClick={() => toggleFlag(f.key as any)}
                                        className={cn(
                                            "w-14 h-8 rounded-full border border-border p-1 relative cursor-pointer transition-colors",
                                            (settings as any)[f.key] ? "bg-primary/20 border-primary" : "bg-white/5"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-full shadow-xl transition-all flex items-center justify-center",
                                            (settings as any)[f.key] ? "translate-x-6 bg-primary" : "translate-x-0 bg-white/20"
                                        )}>
                                            {(settings as any)[f.key] && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
