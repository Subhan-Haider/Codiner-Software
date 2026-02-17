"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LogIn, Github, Mail, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, Lock as LockIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/docs";
        } catch (err: any) {
            setError(err.message || "Failed to log in");
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (providerName: 'github' | 'google') => {
        const provider = providerName === 'github' ? new GithubAuthProvider() : new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            window.location.href = "/docs";
        } catch (err: any) {
            setError(err.message || `Failed to log in with ${providerName}`);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 flex overflow-hidden font-sans">
            {/* Left Side - Neural Immersive Visual */}
            <div className="hidden lg:flex flex-col justify-between w-[48%] p-20 relative border-r border-slate-200 bg-slate-50 overflow-hidden">
                {/* Immersive Background Layers */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Animated Grid */}
                    <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-20 w-full animate-scan opacity-20" />

                    {/* Glows */}
                    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.05),transparent_50%)]" />

                    {/* Abstract Data Particles */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                                animate={{
                                    opacity: [0.1, 0.4, 0.1],
                                    y: ["-10%", "110%"]
                                }}
                                transition={{
                                    duration: Math.random() * 10 + 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 2
                                }}
                                className="absolute text-[10px] font-mono text-primary whitespace-nowrap"
                            >
                                {Math.random().toString(16).substring(2, 10).toUpperCase()} // NODE_PULSE_{i}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <Link href="/" className="relative z-10 flex items-center gap-4 group w-fit">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-2xl shadow-primary/10">
                        <img src="/logo.png" alt="Codiner" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-black italic lowercase tracking-tighter text-2xl group-hover:text-primary transition-colors">codiner<span className="text-primary opacity-50 italic">.</span>site</span>
                </Link>

                <div className="relative z-10 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6">
                            <span className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                            Session Gateway Active
                        </div>
                        <h2 className="text-7xl font-black italic tracking-tighter leading-[0.85] lowercase mb-8">
                            re-initialize <br />
                            <span className="text-gradient">your matrix</span>
                        </h2>
                        <p className="text-muted-foreground text-xl font-medium italic lowercase tracking-tight max-w-lg leading-relaxed border-l-2 border-primary/20 pl-8">
                            authorize your connection to the neural foundry. your local-first nodes and cloud-synced datasets await synthesis.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap gap-4">
                        {[
                            { label: "Neural Layer 4", icon: ShieldCheck },
                            { label: "Foundry Core v4", icon: Sparkles },
                            { label: "Local-First TLS", icon: LockIcon }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                key={i}
                                className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 whitespace-nowrap">
                        ESTABLISHED 2026 // NEURAL FOUNDRY
                    </p>
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-[10px] font-mono text-white/20">0xCF420</span>
                </div>
            </div>

            {/* Right Side - Clean Tech Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
                {/* Mobile Background */}
                <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08),transparent_60%)]" />
                    <div className="absolute inset-0 bg-size-[30px_30px] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-12"
                    >
                        <div className="text-center lg:text-left space-y-4">
                            <h1 className="text-5xl font-black italic tracking-tighter lowercase text-slate-900">
                                node <span className="text-gradient">access</span>
                            </h1>
                            <p className="text-slate-500 font-medium italic lowercase tracking-tight text-lg">
                                transmit authorization credentials
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                className="p-5 rounded-3xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest text-center shadow-sm"
                            >
                                error: {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-8">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6 group-focus-within:text-primary transition-colors">Neural link / Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="subhan@foundry.io"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-18 pr-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:border-primary/30 focus:bg-white focus:outline-none transition-all font-medium text-lg placeholder:text-slate-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3 group">
                                    <div className="flex items-center justify-between px-6">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-primary transition-colors">Pulse key / Password</label>
                                        <Link href="/forgot-password" title="Recover Link" className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">
                                            lost access?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <LockIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary group-focus-within:scale-110 transition-all" />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-18 pr-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:border-primary/30 focus:bg-white focus:outline-none transition-all font-medium text-lg placeholder:text-slate-300 shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full py-6 rounded-3xl font-black text-2xl relative overflow-hidden transition-all transform active:scale-95 lowercase italic tracking-tighter group",
                                    isLoading ? "bg-muted text-muted-foreground shadow-none" : "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:shadow-primary/40"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    {isLoading ? (
                                        <div className="w-7 h-7 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Establish Link <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </button>
                        </form>

                        <div className="relative py-2 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <span className="relative px-6 bg-white text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">alternative authorization</span>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('github')}
                                className="px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20 transition-all flex items-center justify-center gap-4 group shadow-sm text-slate-600"
                            >
                                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span className="font-black text-sm lowercase italic">GitHub</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="px-8 py-5 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/20 transition-all flex items-center justify-center gap-4 group shadow-sm text-slate-600"
                            >
                                <Sparkles className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                                <span className="font-black text-sm lowercase italic">Google</span>
                            </button>
                        </div>

                        <div className="text-center pt-6">
                            <p className="text-slate-500 text-sm font-medium italic lowercase tracking-tight mb-4">
                                node not established in the foundry?
                            </p>
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-3 text-primary font-black text-2xl hover:underline underline-offset-10 transition-all decoration-primary group"
                            >
                                Claim Identity Pulse <Sparkles className="w-5 h-5 animate-pulse" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
