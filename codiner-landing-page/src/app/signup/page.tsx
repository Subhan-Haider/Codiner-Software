"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Github, Mail, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, Cpu, Zap, Lock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getStrength = (pass: string) => {
        let score = 0;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[!@#$%^&*]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (strength < 3) {
            setError("Your Pulse Key (Password) is not secure enough. Sync failed.");
            return;
        }

        setIsLoading(true);
        setError("");
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const { sendEmailVerification } = await import("firebase/auth");
            await sendEmailVerification(user);
            await updateProfile(user, { displayName: name });

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                role: email === 'setupg98@gmail.com' ? 'admin' : 'user',
                createdAt: new Date().toISOString(),
                nodeStatus: "unverified",
                aiSettings: {
                    provider: "ollama",
                    preferredModel: "llama3.1",
                    temperature: 0.7
                },
                savedTemplates: []
            });

            window.location.href = "/dashboard?new=true";
        } catch (err: any) {
            setError(err.message || "Failed to create node");
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (providerName: 'github' | 'google') => {
        const provider = providerName === 'github' ? new GithubAuthProvider() : new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            window.location.href = "/docs";
        } catch (err: any) {
            setError(err.message || `Failed to sign up with ${providerName}`);
        }
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 flex overflow-hidden font-sans">
            {/* Left Side - Neural Immersive Visual */}
            <div className="hidden lg:flex flex-col justify-between w-[48%] p-20 relative border-r border-slate-200 bg-slate-50 overflow-hidden">
                {/* Immersive Background Layers */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent h-20 w-full animate-scan opacity-20" />
                    <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)]" />

                    {/* Abstract Hex Particles */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                                animate={{ opacity: [0.2, 0.4, 0.2], y: ["110%", "-10%"] }}
                                transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear", delay: i * 3 }}
                                className="absolute text-[8px] font-mono text-primary/60 whitespace-nowrap"
                            >
                                SYM link_{i} // 0x{Math.random().toString(16).substring(2, 6)}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <Link href="/" className="relative z-10 flex items-center gap-4 group w-fit">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 shadow-xl shadow-primary/10">
                        <img src="/logo.png" alt="Codiner" className="w-7 h-7 object-contain" />
                    </div>
                    <span className="font-black italic lowercase tracking-tighter text-2xl text-slate-900 group-hover:text-primary transition-colors">codiner<span className="text-primary italic">.</span>site</span>
                </Link>

                <div className="relative z-10 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-6">
                            <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
                            Establishing Neural Link
                        </div>
                        <h2 className="text-7xl font-black italic tracking-tighter leading-[0.85] lowercase mb-8 text-slate-900">
                            claim your <br />
                            <span className="text-gradient">identity pulse</span>
                        </h2>
                        <p className="text-slate-600 text-xl font-medium italic lowercase tracking-tight max-w-lg leading-relaxed border-l-2 border-primary/20 pl-8">
                            Join the elite foundry. Claim your local-first identity and begin building the future of autonomous systems across your decentralized node network.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 max-w-md">
                        {[
                            { label: "Encrypted Node", icon: Lock },
                            { label: "Local Foundry", icon: Cpu },
                            { label: "Instant Sync", icon: Zap },
                            { label: "Shielded Auth", icon: ShieldCheck }
                        ].map((item, i) => (
                            <div key={i} className="px-6 py-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 hover:border-primary/20 transition-all cursor-default shadow-sm">
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 whitespace-nowrap">
                        &copy; 2026 Codiner Neural Systems // establish link
                    </p>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white relative overflow-y-auto">
                <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
                    <div className="absolute inset-0 bg-size-[30px_30px] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)]" />
                </div>

                <div className="w-full max-w-lg relative z-10 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <div className="text-center lg:text-left space-y-4">
                            <h1 className="text-5xl font-black italic tracking-tighter lowercase text-slate-900">
                                initiate <span className="text-gradient">entry</span>
                            </h1>
                            <p className="text-slate-500 font-medium italic lowercase tracking-tight text-lg">
                                establish your global neural node profile
                            </p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                className="p-5 rounded-3xl bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-widest text-center"
                            >
                                error_log: {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6 group-focus-within:text-primary transition-colors">Nominal Designation / Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Subhan Haider"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:border-primary/30 focus:bg-white focus:outline-none transition-all font-medium text-lg placeholder:text-slate-300 shadow-sm"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6 group-focus-within:text-primary transition-colors">Neural Link / Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="subhan@codiner.io"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-18 pr-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:border-primary/30 focus:bg-white focus:outline-none transition-all font-medium text-lg placeholder:text-slate-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 group">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6 group-focus-within:text-primary transition-colors">Secure Pulse / Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-18 pr-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:border-primary/30 focus:bg-white focus:outline-none transition-all font-medium text-lg placeholder:text-slate-300 shadow-sm"
                                        />
                                    </div>

                                    {password && (
                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 space-y-4 pt-2">
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "h-1.5 flex-1 rounded-full transition-all duration-700",
                                                            i <= strength
                                                                ? strength <= 1 ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : strength <= 2 ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                                                                : "bg-slate-100"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                <span className={cn("italic transition-colors", strength <= 1 ? "text-red-500" : strength <= 2 ? "text-amber-500" : "text-primary")}>
                                                    {strength <= 1 ? "vulnerable link" : strength <= 2 ? "weak pulse" : strength <= 3 ? "secure node" : "elite cipher"}
                                                </span>
                                                <span className="opacity-40 text-slate-300">Entropy_lvl: {strength * 25}%</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full py-6 rounded-3xl font-black text-2xl relative overflow-hidden transition-all transform active:scale-95 lowercase italic tracking-tighter group",
                                    isLoading ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:shadow-primary/40"
                                )}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    {isLoading ? (
                                        <div className="w-7 h-7 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Establish Node <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
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
                            <span className="relative px-6 bg-white text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">sync existing identity</span>
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

                        <div className="text-center pt-8">
                            <p className="text-slate-500 text-sm font-medium italic lowercase tracking-tight mb-4">
                                already established in the matrix?
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-3 text-primary font-black text-2xl hover:underline underline-offset-10 transition-all decoration-primary"
                            >
                                Log In to Node →
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
