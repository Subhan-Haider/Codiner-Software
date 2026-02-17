"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, Cpu, Lock, Terminal, Box, WifiOff, HardDrive, Sparkles, Server } from "lucide-react";

export default function LocalAIPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    >
                        <WifiOff className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">100% Offline Capable</span>
                    </motion.div>

                    <div className="max-w-4xl mb-24">
                        <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter italic lowercase">
                            Local <span className="text-gradient">Intelligence</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-medium">
                            Codiner is built on the philosophy that AI should be a private tool,
                            running on your hardware, under your control. No clouds, no subscriptions, no compromises.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                        {[
                            { label: "Data Shared", value: "Zero" },
                            { label: "Latency", value: "Local" },
                            { label: "Providers", value: "Ollama" },
                            { label: "Requirement", value: "GPU/CPU" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-xl"
                            >
                                <div className="text-4xl font-black mb-1 text-primary italic lowercase">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ollama Integration Section */}
            <section className="py-24 border-t border-border bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 space-y-8">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF4500] to-primary flex items-center justify-center shadow-2xl">
                                <Box className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-5xl font-black italic tracking-tighter lowercase">the <span className="text-gradient">Ollama</span> stack</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                We leverage the power of Ollama to orchestrate local LLMs.
                                Simply install Ollama, and Codiner will automatically detect and optimize
                                your local models for code generation, chat, and AST analysis.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "One-click model switching",
                                    "Optimized context window management",
                                    "Hardware-aware inference (NVIDIA/AMD/Metal)",
                                    "Persistent local vector storage"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-lg font-bold">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl bg-card border border-border p-10 rounded-[3.5rem] shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3 mb-8">
                                <Terminal className="w-6 h-6 text-primary" />
                                <span className="font-mono text-sm font-bold uppercase tracking-widest">ollama list --local</span>
                            </div>
                            <div className="space-y-6 font-mono text-sm">
                                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/40 border border-primary/20">
                                    <span className="text-green-400 font-bold">llama3:8b</span>
                                    <span className="text-xs text-muted-foreground">READY</span>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/20 border border-border">
                                    <span className="text-primary font-bold">deepseek-coder:v2</span>
                                    <span className="text-xs text-muted-foreground">CACHED</span>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/20 border border-border">
                                    <span className="text-white">qwen2.5-coder:7b</span>
                                    <span className="text-xs text-muted-foreground">DETECTED</span>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary animate-pulse uppercase tracking-widest">
                                <Sparkles className="w-4 h-4" />
                                Codiner Link: Active
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Local AI? */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl font-black italic tracking-tighter mb-6 lowercase">Why build <span className="text-gradient">Locally</span>?</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Beyond privacy, local execution offers technical advantages that cloud providers simply cannot match.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Hardened Privacy",
                                desc: "Your intellectual property never touches a third-party server. Ideal for proprietary enterprise codebases."
                            },
                            {
                                icon: Zap,
                                title: "Zero Latency",
                                desc: "No round-trip API calls. Information flows at the speed of your local hardware and PCIe lanes."
                            },
                            {
                                icon: Cpu,
                                title: "Cost-Effective",
                                desc: "Stop paying for tokens. Your hardware, your electricity, unlimited generations for life."
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-12 rounded-[3.5rem] border border-border bg-card/50 hover:border-primary/50 transition-all shadow-2xl group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <benefit.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl font-black italic mb-4 lowercase tracking-tight">{benefit.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed font-medium">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hardware Guide */}
            <section className="py-24 border-y border-border bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 max-w-6xl mx-auto">
                        <div className="flex-1">
                            <h2 className="text-5xl font-black italic tracking-tighter mb-8 lowercase text-gradient">The Requirements</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 p-8 rounded-3xl bg-card border border-border">
                                    <HardDrive className="w-12 h-12 text-primary shrink-0" />
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Memory (RAM/VRAM)</h4>
                                        <p className="text-muted-foreground">8GB minimum for 7B models. 16GB+ recommended for high-speed coding assistance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 p-8 rounded-3xl bg-card border border-border">
                                    <Server className="w-12 h-12 text-primary shrink-0" />
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">GPU Acceleration</h4>
                                        <p className="text-muted-foreground">Direct integration with NVIDIA CUDA, AMD ROCm, and Apple Metal for blazing-fast inference.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full text-center p-16 rounded-[4rem] bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl">
                            <Cpu className="w-20 h-20 mx-auto mb-8 animate-spin-slow" />
                            <h3 className="text-4xl font-black italic mb-6">Foundry Engine V1.2</h3>
                            <p className="text-xl font-medium mb-10 opacity-90">
                                Our bridge between your hardware and AI. Tested on over 200 hardware configurations.
                            </p>
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/20 font-black uppercase tracking-widest text-sm">
                                System Status: Optimized
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto p-20 rounded-[4rem] border border-primary/20 bg-card shadow-[0_0_50px_rgba(var(--primary),0.1)]"
                    >
                        <h2 className="text-6xl font-black italic tracking-tighter mb-10 lowercase">Ready to unlock <br /> <span className="text-gradient">Local Power</span>?</h2>
                        <p className="text-2xl text-muted-foreground mb-12 font-medium">
                            Join the hundreds of thousands of developers reclaiming their privacy and speed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="https://ollama.ai" target="_blank" className="px-10 py-5 rounded-[2rem] border-2 border-border hover:border-primary font-bold text-lg transition-all">
                                Get Ollama
                            </a>
                            <a href="/docs" className="px-10 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg hover:scale-105 transition-all shadow-xl">
                                Setup Guide
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

