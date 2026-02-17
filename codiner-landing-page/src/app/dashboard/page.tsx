"use client";

import { motion } from "framer-motion";
import {
    Download,
    Layout,
    Sparkles,
    Clock,
    Star,
    ArrowRight,
    Cpu,
    Zap,
    Terminal,
    ShieldAlert,
    ChevronRight,
    Search,
    MessageSquare,
    Globe
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserDashboard() {
    const { user, profile, loading, refreshUser } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [sendingVerification, setSendingVerification] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);

    if (loading) return null;
    if (!user) {
        window.location.href = "/login";
        return null;
    }

    const handleResendVerification = async () => {
        setSendingVerification(true);
        try {
            const { sendEmailVerification } = await import("firebase/auth");
            await sendEmailVerification(user);
            setVerificationSent(true);
            setTimeout(() => setVerificationSent(false), 5000);
        } catch (error) {
            console.error("Error resending verification:", error);
        }
        setSendingVerification(false);
    };

    const quickLinks = [
        { title: "Download Forge", desc: "Get the latest Codiner binary.", icon: Download, color: "text-blue-500", href: "/download" },
        { title: "Browse Blueprints", desc: "Explore community patterns.", icon: Layout, color: "text-primary", href: "/templates" },
        { title: "Neural Docs", desc: "Master the foundry logic.", icon: Terminal, color: "text-amber-500", href: "/docs" },
        { title: "Model Hub", desc: "Configure your AI engines.", icon: Cpu, color: "text-green-500", href: "/local-ai" }
    ];

    const recentPatterns = [
        { name: "Next.js Neural Admin", time: "2h ago", icon: Layout },
        { name: "FastAPI Bridge", time: "5h ago", icon: Zap },
        { name: "Ollama Chat Node", time: "1d ago", icon: Cpu }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <div className="pt-40 pb-20 px-6 container mx-auto">
                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Verification Notice */}
                    {!user.emailVerified && user.providerData.some(p => p.providerId === 'password') && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 rounded-4xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                                    <ShieldAlert className="w-8 h-8 text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black italic tracking-tighter lowercase">Neural Link <span className="text-amber-500">Unverified</span></h4>
                                    <p className="text-sm text-muted-foreground font-medium italic lowercase tracking-tight">Your cloud consciousness is fragmented. Verify your email to enable full sync.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={refreshUser}
                                    className="px-8 py-3 rounded-xl bg-card border border-border font-black uppercase text-[10px] tracking-widest hover:border-primary transition-all"
                                >
                                    Check Status
                                </button>
                                <button
                                    onClick={handleResendVerification}
                                    disabled={sendingVerification || verificationSent}
                                    className="px-8 py-3 rounded-xl bg-amber-500 text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {sendingVerification ? "Transmitting..." : verificationSent ? "Signal Sent" : "Resend Link"}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Node Active: {user.email} {user.emailVerified && <span className="text-green-500">[Verified]</span>}
                            </div>
                            <h1 className="text-6xl font-black italic tracking-tighter lowercase">
                                welcome, <span className="text-gradient">{profile?.name || "foundry master"}</span>
                            </h1>
                            <p className="text-muted-foreground font-medium italic lowercase tracking-tight mt-2 max-w-xl">
                                Your neural project foundry is synchronized and ready for inference.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search matrix..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-14 pr-8 py-5 rounded-4xl bg-card/50 border border-border focus:border-primary focus:outline-none transition-all w-80 font-medium lowercase italic"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Start Matrix */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickLinks.map((link, i) => (
                            <Link key={i} href={link.href}>
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="p-10 rounded-4xl border border-border bg-card/20 backdrop-blur-xl shadow-2xl group relative overflow-hidden h-full flex flex-col justify-between"
                                >
                                    <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className={cn("w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center mb-10 transition-transform group-hover:scale-110", link.color)}>
                                        <link.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black italic tracking-tighter lowercase mb-2 group-hover:text-primary transition-colors">{link.title}</h3>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.1em]">{link.desc}</p>
                                    </div>
                                    <ArrowRight className="absolute bottom-10 right-10 w-6 h-6 text-primary translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Interaction Area */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* AI Quick Start */}
                            <section className="p-12 rounded-4xl border border-border bg-linear-to-br from-primary/10 to-transparent shadow-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12">
                                    <Sparkles className="w-16 h-16 text-primary opacity-20 group-hover:rotate-12 transition-transform" />
                                </div>
                                <div className="relative z-10 max-w-lg">
                                    <h2 className="text-4xl font-black italic tracking-tighter lowercase mb-6">neural <span className="text-gradient">assistant</span> start</h2>
                                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight mb-10 leading-relaxed text-lg">
                                        Instantly generate full-stack foundations using your preferred AI engine ({profile?.aiSettings?.preferredModel || "llama3.1"}).
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3">
                                            <MessageSquare className="w-5 h-5" /> Start New Inference
                                        </button>
                                        <button className="px-10 py-5 rounded-2xl bg-card border border-border font-black italic tracking-tight lowercase hover:border-primary transition-all">
                                            Continue Draft
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Saved Patterns */}
                            <section>
                                <div className="flex items-center justify-between mb-8 px-4">
                                    <h2 className="text-3xl font-black italic tracking-tighter lowercase flex items-center gap-4">
                                        <Star className="w-6 h-6 text-amber-500" /> Favorite <span className="text-gradient">Patterns</span>
                                    </h2>
                                    <Link href="/templates" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Manage Foundry →</Link>
                                </div>

                                {(!profile?.savedTemplates || profile.savedTemplates.length === 0) ? (
                                    <div className="p-20 rounded-4xl border border-dashed border-border bg-card/5 text-center space-y-6">
                                        <Layout className="w-16 h-16 text-muted-foreground mx-auto opacity-10" />
                                        <p className="text-xl text-muted-foreground font-medium lowercase italic">Your pattern vault is empty.</p>
                                        <Link href="/templates" className="inline-flex items-center px-8 py-3 rounded-2xl bg-primary/10 text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/20 transition-all">
                                            Populate Matrix
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {/* Templates list would go here */}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar Activity */}
                        <div className="space-y-12">
                            <section className="p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
                                <h2 className="text-2xl font-black italic tracking-tighter lowercase mb-8 flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-primary" /> recent <span className="text-gradient">actions</span>
                                </h2>
                                <div className="space-y-6">
                                    {recentPatterns.map((action, i) => (
                                        <div key={i} className="flex items-center gap-6 group cursor-pointer p-2 rounded-2xl hover:bg-white/2 transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                                <action.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold italic text-sm lowercase truncate group-hover:text-primary transition-colors">{action.name}</h4>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">{action.time}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-10 py-4 rounded-2xl bg-white/2 border border-border text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">View All Pulse Logs</button>
                            </section>

                            <section className="p-10 rounded-[3.5rem] border border-border bg-linear-to-br from-blue-500/10 to-transparent shadow-2xl group">
                                <Globe className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black italic tracking-tighter lowercase mb-4">Cloud Sync Status</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 text-xs font-bold italic lowercase">
                                        <span>AI Settings</span>
                                        <span className="text-primary font-black uppercase tracking-widest text-[8px]">Synced</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 text-xs font-bold italic lowercase">
                                        <span>Templates</span>
                                        <span className="text-primary font-black uppercase tracking-widest text-[8px]">Synced</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
