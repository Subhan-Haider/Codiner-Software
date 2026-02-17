"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Check, Monitor, Apple, Github, Terminal, Cpu, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DownloadPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Premium Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 flex flex-col items-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-inner mb-8"
                        >
                            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                            <span className="text-sm font-black uppercase tracking-widest text-primary">Live: Production Ready</span>
                            <span className="text-muted-foreground">|</span>
                            <span className="text-sm font-bold">Build v0.32.0</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic lowercase">
                            Get <span className="text-gradient">Codiner</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            Experience the power of local-first AI development. Secure, open-source, and lightning fast.
                        </p>
                    </motion.div>

                    {/* Download Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                        {/* Windows */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "group p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl",
                                "hover:border-primary/50 transition-all duration-500",
                                "flex flex-col h-full shadow-2xl relative overflow-hidden"
                            )}
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center border border-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                    <Monitor className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black italic tracking-tighter">Windows</h3>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">x64 Installer</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-12 grow">
                                <FeatureItem text="Windows 10/11 Compatible" />
                                <FeatureItem text="Automatic Updates" />
                                <FeatureItem text="Desktop Integration" />
                                <FeatureItem text="One-click Setup" />
                            </div>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-Windows-Setup.exe"
                                className={cn(
                                    "w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg",
                                    "bg-primary text-primary-foreground overflow-hidden relative",
                                    "transform hover:scale-[1.03] active:scale-95 transition-all duration-300",
                                    "shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]"
                                )}
                            >
                                <Download className="w-6 h-6" />
                                Download .exe
                            </a>
                        </motion.div>

                        {/* macOS */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={cn(
                                "group p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl",
                                "hover:border-primary/50 transition-all duration-500",
                                "flex flex-col h-full shadow-2xl relative overflow-hidden"
                            )}
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />

                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-gray-700/20 to-gray-800/20 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:-rotate-3 transition-all">
                                    <Apple className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black italic tracking-tighter">macOS</h3>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Universal DMG</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-12 grow">
                                <FeatureItem text="Intel & Apple Silicon" />
                                <FeatureItem text="Optimized Performance" />
                                <FeatureItem text="Native Experience" />
                                <FeatureItem text="App Bundle Support" />
                            </div>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-Mac-Universal.dmg"
                                className={cn(
                                    "w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg",
                                    "bg-primary text-primary-foreground",
                                    "transform hover:scale-[1.03] active:scale-95 transition-all duration-300",
                                    "shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]"
                                )}
                            >
                                <Download className="w-6 h-6" />
                                Download .dmg
                            </a>
                        </motion.div>

                        {/* Linux */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className={cn(
                                "group p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl",
                                "hover:border-primary/50 transition-all duration-500",
                                "flex flex-col h-full shadow-2xl relative overflow-hidden"
                            )}
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/5 rounded-full blur-3xl group-hover:bg-orange-600/10 transition-all duration-500" />

                            <div className="flex items-center gap-6 mb-10">
                                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-600/10 to-red-600/10 flex items-center justify-center border border-orange-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all">
                                    <Terminal className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black italic tracking-tighter">Linux</h3>
                                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Portable x64</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-12 grow">
                                <FeatureItem text="Portable ZIP Bundle" />
                                <FeatureItem text="Works on any Distro" />
                                <FeatureItem text="Open Source Core" />
                                <FeatureItem text="Lightweight Build" />
                            </div>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-Linux-Portable.zip"
                                className={cn(
                                    "w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg",
                                    "bg-primary text-primary-foreground",
                                    "transform hover:scale-[1.03] active:scale-95 transition-all duration-300",
                                    "shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)]"
                                )}
                            >
                                <Download className="w-6 h-6" />
                                Download .zip
                            </a>
                        </motion.div>
                    </div>

                    {/* Secondary Options */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-32 flex flex-col items-center gap-8"
                    >
                        <div className="h-px w-24 bg-linear-to-r from-transparent via-border to-transparent" />
                        <div className="flex flex-wrap justify-center gap-8">
                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-all hover:-translate-y-1"
                            >
                                <Github className="w-5 h-5" />
                                All GitHub Releases
                            </a>
                            <a
                                href="/docs/installation"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary font-bold transition-all hover:-translate-y-1"
                            >
                                <Check className="w-5 h-5" />
                                Installation Guide
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Extra Info Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <InfoCard
                            icon={Shield}
                            title="100% Secure"
                            desc="Your data never leaves your machine. Local-first means you are the owner of your AI."
                        />
                        <InfoCard
                            icon={Zap}
                            title="Zero Latency"
                            desc="Run AI models directly on your hardware. No cloud delays, no subscription fees."
                        />
                        <InfoCard
                            icon={Cpu}
                            title="High Powered"
                            desc="Optimized for M1/M2/M3 Silicon and NVIDIA RTX GPUs for the smoothest experience."
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-green-500" />
            </div>
            <span className="text-muted-foreground font-medium">{text}</span>
        </div>
    );
}

function InfoCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="text-center group p-8 rounded-3xl border border-transparent hover:border-border hover:bg-card/30 transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">{desc}</p>
        </div>
    );
}
