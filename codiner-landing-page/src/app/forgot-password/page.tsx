"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, ChevronLeft, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await sendPasswordResetEmail(auth, email);
            setIsSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset link");
        }
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
            </div>

            <div className="w-full max-w-lg relative z-10 text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group font-black uppercase tracking-widest text-[10px]"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Node Login
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 rounded-[3.5rem] border border-border bg-card/30 backdrop-blur-3xl shadow-3xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary/2 pointer-events-none" />

                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-10 shadow-inner group">
                        <KeyRound className="w-10 h-10 text-primary group-hover:rotate-12 transition-transform" />
                    </div>

                    <h1 className="text-4xl font-black italic tracking-tighter lowercase mb-4">
                        forgot <span className="text-gradient">pulse key?</span>
                    </h1>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight mb-10">
                        {isSent
                            ? "Check your neural link for the recovery coordinates."
                            : "Enter your node email to receive a recovery link."}
                    </p>

                    {isSent ? (
                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-4 text-left">
                                <CheckCircle2 className="w-8 h-8 shrink-0" />
                                <div className="text-sm font-bold"> Recovery coordinates dispatched to your link. Pulse will expire in 60 minutes.</div>
                            </div>
                            <Link
                                href="/login"
                                className="w-full block py-5 rounded-3xl bg-primary text-primary-foreground font-black text-xl lowercase italic tracking-tight hover:scale-[1.02] transition-all"
                            >
                                Return to Matrix
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {error && (
                                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-3">
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4 text-left">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-4">Neural Link (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="subhan@codiner.io"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-16 pr-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary focus:outline-none transition-all shadow-inner text-lg font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-2xl lowercase italic tracking-tight",
                                    isLoading ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:shadow-primary/25"
                                )}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Request Recovery <ArrowRight className="w-6 h-6" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
