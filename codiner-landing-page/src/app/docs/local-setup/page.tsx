"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, ChevronRight, Terminal, Box, Zap, Cpu, HardDrive, Shield, Sparkles, ExternalLink, Globe, Monitor, Apple, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LocalSetupPage() {
    const steps = [
        {
            id: "01",
            title: "Install Ollama",
            icon: Globe,
            desc: "Ollama is the engine that powers local AI on your machine. It's lightweight, open-source, and highly optimized.",
            content: (
                <div className="space-y-6">
                    <p className="text-muted-foreground">Download the appropriate version for your OS from the official site:</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { name: "macOS", icon: Apple, link: "https://ollama.ai/download/mac" },
                            { name: "Windows", icon: Monitor, link: "https://ollama.ai/download/windows" },
                            { name: "Linux", icon: Terminal, link: "https://ollama.ai/download/linux" }
                        ].map((os) => (
                            <a
                                key={os.name}
                                href={os.link}
                                target="_blank"
                                className="p-4 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-colors flex flex-col items-center gap-3 group"
                            >
                                <os.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-sm tracking-tight">{os.name}</span>
                            </a>
                        ))}
                    </div>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="flex items-start gap-4">
                            <Shield className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <p className="text-sm text-primary/80 font-medium">
                                <strong>Pro Tip:</strong> Ensure you have at least 8GB of RAM for the best experience with 7B parameter models.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "02",
            title: "Download Models",
            icon: Box,
            desc: "Once Ollama is running, you need to pull the models you want to use. We recommend start-of-the-art coding models.",
            content: (
                <div className="space-y-6">
                    <p className="text-muted-foreground">Open your terminal and run the following commands to get the best models for Codiner:</p>
                    <div className="space-y-4">
                        <div className="p-6 rounded-3xl bg-white border border-border font-mono text-sm shadow-xl group">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-black text-primary uppercase tracking-widest">General Purpose</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">LLAMA 3.1</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Terminal className="w-4 h-4 text-primary" />
                                <code className="text-foreground font-bold">ollama run llama3.1</code>
                            </div>
                        </div>
                        <div className="p-6 rounded-3xl bg-white border border-border font-mono text-sm shadow-xl group">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Coding Specialist</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">DeepSeek Coder V2</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Terminal className="w-4 h-4 text-blue-500" />
                                <code className="text-foreground font-bold">ollama run deepseek-coder-v2</code>
                            </div>
                        </div>
                        <div className="p-6 rounded-3xl bg-white border border-border font-mono text-sm shadow-xl group">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Ultra Fast</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Qwen 2.5 Coder</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Terminal className="w-4 h-4 text-indigo-500" />
                                <code className="text-foreground font-bold">ollama run qwen2.5-coder:7b</code>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "03",
            title: "Connect to Codiner",
            icon: Zap,
            desc: "The final step is to pair Codiner with your local engine. This happens automatically but can be customized in settings.",
            content: (
                <div className="space-y-6">
                    <p className="text-muted-foreground">Launch the Codiner Desktop app or CLI, then follow these instructions:</p>
                    <div className="p-8 rounded-[2.5rem] bg-linear-to-br from-primary to-indigo-600 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Command className="w-32 h-32" />
                        </div>
                        <ol className="relative z-10 space-y-4 font-bold text-lg list-decimal list-inside lowercase italic tracking-tight">
                            <li>Open Settings {'>'} AI Engine</li>
                            <li>Select "Ollama" as the Provider</li>
                            <li>Codiner will detect models automatically</li>
                            <li>Choose your default model (e.g., Llama 3)</li>
                            <li>Click "Test Connection"</li>
                        </ol>
                        <div className="mt-8 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 w-fit">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Sync Enabled</span>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <section className="relative pt-40 pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto mb-24"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary mb-8 shadow-sm">
                            <Box className="w-3 h-3" />
                            Local Setup Guide
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            local <span className="text-gradient">foundry</span> setup
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto lowercase italic tracking-tight">
                            Unlock true data sovereignty by running high-performance models on your own silicon.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-24">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="flex flex-col md:flex-row gap-12">
                                    <div className="md:w-1/3 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                                <step.icon className="w-8 h-8 text-primary" />
                                            </div>
                                            <span className="text-8xl font-black text-primary/5 italic leading-none">{step.id}</span>
                                        </div>
                                        <h2 className="text-4xl font-black italic tracking-tighter lowercase">{step.title}</h2>
                                        <p className="text-lg text-muted-foreground font-medium leading-relaxed italic lowercase tracking-tight">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <div className="md:w-2/3 p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group-hover:border-primary/30 transition-colors">
                                        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {step.content}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Verification & Help */}
                    <div className="mt-40 max-w-5xl mx-auto p-12 rounded-[4rem] border border-border bg-card/10 backdrop-blur-2xl text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Zap className="w-12 h-12 text-primary mx-auto mb-8 animate-bounce-slow" />
                        <h3 className="text-4xl font-black italic mb-6 lowercase tracking-tighter">Everything working?</h3>
                        <p className="text-xl text-muted-foreground mb-12 font-medium max-w-2xl mx-auto italic lowercase tracking-tight">
                            Run the verification command in your terminal to ensure Codiner can access your local neural foundry.
                        </p>
                        <div className="inline-flex items-center gap-4 px-8 py-5 rounded-3xl bg-white border border-border font-mono text-sm shadow-2xl group/cmd hover:scale-105 transition-transform mb-12">
                            <span className="text-primary font-black">$</span>
                            <span className="font-bold">codiner status --neural</span>
                            <div className="ml-4 flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                Local-Only
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="/docs/api-reference" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-lg hover:scale-105 transition-transform lowercase italic tracking-tight">
                                Explore API Reference
                                <ChevronRight className="w-5 h-5" />
                            </a>
                            <a href="https://discord.gg/codiner" className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-border font-black text-lg hover:bg-card transition-colors lowercase italic tracking-tight">
                                Join Discord Support
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
