"use client";

import { motion } from "framer-motion";
import {
    User,
    Settings,
    Save,
    Database,
    Cpu,
    Zap,
    Shield,
    Star,
    Clock,
    LogOut,
    ChevronRight,
    Sparkles,
    Layout
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        preferredModel: "",
        provider: "",
        temperature: 0.7
    });

    useEffect(() => {
        if (profile?.aiSettings) {
            setSettings(profile.aiSettings);
        }
    }, [profile]);

    if (loading) return null;
    if (!user) {
        window.location.href = "/login";
        return null;
    }

    const handleSaveSettings = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, { aiSettings: settings });
            // Show toast or notification
        } catch (err) {
            console.error(err);
        }
        setIsSaving(false);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            window.location.href = "/";
        });
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <div className="pt-40 pb-20 px-6 container mx-auto">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Nav */}
                    <aside className="lg:w-72 space-y-12">
                        <div className="flex flex-col items-center text-center p-8 rounded-[3rem] border border-border bg-card/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-primary to-blue-600 p-1 mb-6 relative">
                                <div className="w-full h-full rounded-[1.25rem] bg-card flex items-center justify-center overflow-hidden">
                                    <User className="w-12 h-12 text-primary" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-4 border-background flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-black italic tracking-tighter lowercase">{profile?.name || "Neural Node"}</h2>
                            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-2">{profile?.email}</p>

                            <button
                                onClick={handleLogout}
                                className="mt-8 flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                            >
                                <LogOut className="w-4 h-4" />
                                Terminate Session
                            </button>
                        </div>

                        <nav className="space-y-4">
                            {[
                                { id: "profile", label: "Foundry Identity", icon: User },
                                { id: "settings", label: "Neural Config", icon: Settings },
                                { id: "templates", label: "Saved Patterns", icon: Layout },
                                { id: "security", label: "Shield Status", icon: Shield }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-8 py-5 rounded-4xl transition-all font-black lowercase italic tracking-tight text-xl group",
                                        activeTab === item.id
                                            ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                                            : "text-muted-foreground hover:bg-card hover:text-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </div>
                                    <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", activeTab === item.id && "opacity-100")} />
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">
                        {activeTab === "profile" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                                <section>
                                    <h3 className="text-5xl font-black italic tracking-tighter lowercase mb-8">Node <span className="text-gradient">Identity</span></h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="p-8 rounded-[2.5rem] border border-border bg-card/10 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Display Name</label>
                                            <p className="text-xl font-bold italic lowercase">{profile?.name}</p>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] border border-border bg-card/10 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Pulse Email</label>
                                            <p className="text-xl font-bold italic lowercase">{profile?.email}</p>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] border border-border bg-card/10 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Node Created</label>
                                            <p className="text-xl font-bold italic lowercase">{new Date(profile?.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] border border-border bg-card/10 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Tier Status</label>
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                                <p className="text-xl font-black italic lowercase text-primary">Foundry Master</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === "settings" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                                <section>
                                    <h3 className="text-5xl font-black italic tracking-tighter lowercase mb-8">Neural <span className="text-gradient">Config</span></h3>
                                    <div className="p-12 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl space-y-10">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 mb-2">
                                                <Cpu className="w-6 h-6 text-primary" />
                                                <h4 className="text-2xl font-black italic tracking-tight lowercase">Inference Engine</h4>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Preferred Provider</label>
                                                    <select
                                                        value={settings.provider}
                                                        onChange={(e) => setSettings({ ...settings, provider: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none font-bold italic transition-all"
                                                    >
                                                        <option value="ollama">Ollama (Local)</option>
                                                        <option value="openai">OpenAI (Cloud)</option>
                                                        <option value="anthropic">Anthropic (Cloud)</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Core Model</label>
                                                    <select
                                                        value={settings.preferredModel}
                                                        onChange={(e) => setSettings({ ...settings, preferredModel: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none font-bold italic transition-all"
                                                    >
                                                        <option value="llama3.1">Llama 3.1</option>
                                                        <option value="deepseek-coder">DeepSeek Coder</option>
                                                        <option value="gpt-4o">GPT-4o</option>
                                                        <option value="claude-3-5">Claude 3.5 Sonnet</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-4 border-t border-border/50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Zap className="w-6 h-6 text-amber-500" />
                                                    <h4 className="text-2xl font-black italic tracking-tight lowercase">Neural Temperature</h4>
                                                </div>
                                                <span className="text-xl font-bold text-primary">{settings.temperature}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={settings.temperature}
                                                onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
                                                className="w-full accent-primary bg-primary/20 h-2 rounded-full appearance-none cursor-pointer"
                                            />
                                            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                                                <span>Precise Logic</span>
                                                <span>Creative Pulse</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleSaveSettings}
                                            disabled={isSaving}
                                            className="w-full py-6 rounded-4xl bg-primary text-primary-foreground font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20"
                                        >
                                            {isSaving ? (
                                                <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Save className="w-6 h-6" />
                                                    Sync Neural Settings
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </section>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12 text-left">
                                <h3 className="text-5xl font-black italic tracking-tighter lowercase mb-8">Shield <span className="text-gradient">Protocol</span></h3>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <section className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl space-y-8">
                                        <div className="flex items-center gap-4">
                                            <Shield className="w-6 h-6 text-primary" />
                                            <h4 className="text-2xl font-black italic tracking-tight lowercase">Pulse Key Lockmark</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium italic lowercase tracking-tight leading-relaxed">
                                            Update your neural access key. We recommend an elite 16-character sequence with non-linear symbols.
                                        </p>
                                        <button
                                            onClick={() => window.location.href = "/forgot-password"}
                                            className="w-full py-5 rounded-2xl bg-white/5 border border-border font-black italic tracking-wide text-sm hover:border-primary transition-all lowercase"
                                        >
                                            Initiate Recovery Sequence
                                        </button>
                                    </section>

                                    <section className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl space-y-8">
                                        <div className="flex items-center gap-4">
                                            <Database className="w-6 h-6 text-blue-500" />
                                            <h4 className="text-2xl font-black italic tracking-tight lowercase">Linked Synapses</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { name: "GitHub Matrix", linked: true, icon: Database },
                                                { name: "Google Spark", linked: false, icon: Sparkles }
                                            ].map((link, i) => (
                                                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/2 border border-border/50">
                                                    <div className="flex items-center gap-3">
                                                        <link.icon className={cn("w-4 h-4", link.linked ? "text-primary" : "text-muted-foreground")} />
                                                        <span className="font-bold italic text-sm lowercase">{link.name}</span>
                                                    </div>
                                                    <span className={cn(
                                                        "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                                        link.linked ? "bg-primary/10 text-primary" : "bg-card text-muted-foreground"
                                                    )}>
                                                        {link.linked ? "Linked" : "Connect"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <section className="p-12 rounded-[3.5rem] border border-red-500/10 bg-linear-to-br from-red-500/5 to-transparent shadow-2xl relative overflow-hidden group">
                                    <h4 className="text-3xl font-black italic tracking-tight text-red-500 lowercase mb-4">Termination Phase</h4>
                                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight mb-8 max-w-2xl leading-relaxed">
                                        Deleting your node will permanently collapse your neural foundry, stored models, saved patterns, and billing cycles. This action is non-reversible.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="px-10 py-5 rounded-2xl border border-red-500/30 text-red-500 font-black italic tracking-tight lowercase hover:bg-red-500/10 transition-all">
                                            Collapse Identity
                                        </button>
                                        <button className="px-10 py-5 rounded-2xl bg-card border border-border font-black italic tracking-tight lowercase hover:border-primary transition-all">
                                            Export Matrix Data
                                        </button>
                                    </div>
                                </section>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
