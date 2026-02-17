"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Zap, Cpu, Lock, Terminal, Box, WifiOff, HardDrive, Sparkles, Server } from "lucide-react";

export default function LocalAIPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                {/* Animated background highlights */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/2 right-0 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full animate-pulse delay-700" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-12 shadow-sm"
                    >
                        <WifiOff className="w-4 h-4 text-primary" />
                        <span className="text-xs font-black uppercase tracking-widest text-primary">100% Offline Capable</span>
                    </motion.div>

                    <div className="max-w-4xl mb-32">
                        <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter italic lowercase">
                            Local <br /> <span className="text-gradient">Intelligence</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-medium italic lowercase tracking-tight max-w-2xl">
                            Codiner is built on the philosophy that AI should be a private tool,
                            running on your hardware, under your control.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-40">
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
                                className="p-10 rounded-[2.5rem] border border-border/50 bg-card/20 backdrop-blur-xl shadow-2xl group hover:border-primary/30 transition-all duration-500"
                            >
                                <div className="text-4xl font-black mb-2 text-primary italic lowercase group-hover:scale-110 transition-transform">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ollama Integration Section */}
            <section className="py-32 border-t border-border/50 bg-background/50 relative">
                <div className="absolute inset-0 bg-primary/2 pointer-events-none" />
                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="flex-1 space-y-10">
                            <div className="w-24 h-24 rounded-4xl bg-linear-to-br from-orange-500 to-primary flex items-center justify-center shadow-2xl group animate-bounce-slow">
                                <Box className="w-12 h-12 text-white group-hover:rotate-12 transition-transform" />
                            </div>
                            <h2 className="text-6xl font-black italic tracking-tighter lowercase">the <span className="text-gradient">Ollama</span> stack</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium italic lowercase tracking-tight">
                                We leverage the power of Ollama to orchestrate local LLMs.
                                Simply install Ollama, and Codiner will automatically detect and optimize
                                your local models for code generation, chat, and AST analysis.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    "One-click model switching",
                                    "Optimized context windows",
                                    "Hardware-aware inference",
                                    "Persistent local storage"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-base font-black italic lowercase tracking-tight">
                                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl bg-white border border-border p-12 rounded-[3.5rem] shadow-[0_0_80px_rgba(0,0,0,0.05)] relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 rounded-2xl bg-primary/10">
                                    <Terminal className="w-6 h-6 text-primary" />
                                </div>
                                <span className="font-mono text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">ollama list --local</span>
                            </div>
                            <div className="space-y-6 font-mono text-sm relative z-10">
                                <div className="flex justify-between items-center p-5 rounded-3xl bg-white border border-primary/20 shadow-xl group/item hover:scale-[1.02] transition-transform">
                                    <span className="text-green-600 font-black tracking-tight">llama3:8b</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">READY</span>
                                </div>
                                <div className="flex justify-between items-center p-5 rounded-3xl bg-zinc-50 border border-border group/item hover:scale-[1.02] transition-transform">
                                    <span className="text-primary font-black tracking-tight">deepseek-coder:v2</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">CACHED</span>
                                </div>
                                <div className="flex justify-between items-center p-5 rounded-3xl bg-zinc-50 border border-border group/item hover:scale-[1.02] transition-transform">
                                    <span className="text-zinc-600 font-black tracking-tight">qwen2.5-coder:7b</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-zinc-200 px-3 py-1 rounded-full">DETECTED</span>
                                </div>
                            </div>
                            <div className="mt-10 flex items-center gap-3 text-[10px] font-black text-primary animate-pulse uppercase tracking-[0.4em]">
                                <Sparkles className="w-4 h-4" />
                                Codiner Link: Active
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Local AI? */}
            <section className="py-40 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-32">
                        <h2 className="text-6xl font-black italic tracking-tighter mb-8 lowercase">Why build <span className="text-gradient">Locally</span>?</h2>
                        <p className="text-2xl text-muted-foreground leading-relaxed font-medium italic lowercase tracking-tight">
                            Beyond privacy, local execution offers technical advantages that cloud providers simply cannot match.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Hardened Privacy",
                                desc: "Your intellectual property never touches a third-party server. Ideal for proprietary code."
                            },
                            {
                                icon: Zap,
                                title: "Zero Latency",
                                desc: "No round-trip API calls. Information flows at the speed of your local hardware lanes."
                            },
                            {
                                icon: Cpu,
                                title: "Zero Token Cost",
                                desc: "Stop paying for usage. Your hardware, your electricity, unlimited generations for life."
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl hover:border-primary/50 transition-all duration-500 shadow-2xl group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                    <benefit.icon className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-3xl font-black italic mb-6 lowercase tracking-tighter">{benefit.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed font-medium italic lowercase tracking-tight">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hardware Guide */}
            <section className="py-40 border-y border-border/50 bg-background/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[150px] -right-1/2 rounded-full" />
                <div className="container mx-auto px-6 relative">
                    <div className="flex flex-col lg:flex-row gap-20 max-w-6xl mx-auto">
                        <div className="flex-1">
                            <h2 className="text-6xl font-black italic tracking-tighter mb-12 lowercase text-gradient">The Requirements</h2>
                            <div className="space-y-8">
                                <div className="flex gap-8 p-10 rounded-[2.5rem] bg-card/30 border border-border backdrop-blur-xl hover:border-primary/30 transition-colors">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <HardDrive className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black italic lowercase tracking-tighter mb-3">Memory (RAM/VRAM)</h4>
                                        <p className="text-muted-foreground font-medium leading-relaxed">8GB minimum for 7B models. 16GB+ recommended for high-speed assistance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 p-10 rounded-[2.5rem] bg-card/30 border border-border backdrop-blur-xl hover:border-primary/30 transition-colors">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Server className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black italic lowercase tracking-tighter mb-3">GPU Acceleration</h4>
                                        <p className="text-muted-foreground font-medium leading-relaxed">Direct integration with NVIDIA CUDA, AMD ROCm, and Apple Metal.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full text-center p-20 rounded-[4rem] bg-linear-to-br from-primary via-blue-600 to-indigo-600 text-white shadow-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <Cpu className="w-24 h-24 mx-auto mb-10 animate-spin-slow opacity-90" />
                            <h3 className="text-5xl font-black italic mb-6 lowercase tracking-tighter">Foundry Engine</h3>
                            <p className="text-xl font-medium mb-12 opacity-80 italic lowercase tracking-tight">
                                Our power bridge between your hardware and the models.
                            </p>
                            <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 font-black uppercase tracking-[0.3em] text-xs backdrop-blur-md">
                                System Status: Optimized
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto p-24 rounded-4xl border border-primary/20 bg-card/30 backdrop-blur-3xl shadow-3xl"
                    >
                        <h2 className="text-7xl font-black italic tracking-tighter mb-10 lowercase">Ready to unlock <br /> <span className="text-gradient">Local Power</span>?</h2>
                        <p className="text-2xl text-muted-foreground mb-16 font-medium italic lowercase tracking-tight">
                            Join the hundreds of thousands of developers reclaiming their privacy and speed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="https://ollama.ai" target="_blank" className="px-12 py-6 rounded-4xl border-2 border-border hover:border-primary font-black text-xl transition-all lowercase italic tracking-tight">
                                Get Ollama
                            </a>
                            <a href="/docs/local-setup" className="px-12 py-6 rounded-4xl bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-transform shadow-3xl lowercase italic tracking-tight text-center">
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


