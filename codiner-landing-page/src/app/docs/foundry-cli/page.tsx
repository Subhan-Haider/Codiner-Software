"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Shield, Zap, Search, ChevronRight, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FoundryCliPage() {
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
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary mb-8">
                            Command Line Interface
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            Foundry <span className="text-gradient">CLI</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Control the AI Code Foundry from your terminal. Automate project generation, indexing, and deployment.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Terminal Mockup */}
                        <div className="p-8 rounded-[3rem] bg-black/60 border border-border shadow-3xl font-mono text-sm">
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                                <div className="w-3 h-3 rounded-full bg-green-500/40" />
                            </div>
                            <div className="space-y-4">
                                <CommandLine cmd="npm install -g @codiner/foundry" out="Added 142 packages in 3s" />
                                <CommandLine cmd="foundry init my-app" out="Creating workspace... Done." />
                                <CommandLine cmd="foundry paike --scan ." out="Mapping 12,450 AST nodes... Neural synch complete." />
                            </div>
                        </div>

                        {/* Commands Reference */}
                        <div className="grid gap-6">
                            <h2 className="text-4xl font-black italic tracking-tighter mb-4">Core Commands</h2>
                            <CommandRow cmd="foundry init [name]" desc="Initialize a new AI-native project from a template." />
                            <CommandRow cmd="foundry paike --scan" desc="Manually trigger a deep neural scan of your directory." />
                            <CommandRow cmd="foundry login" desc="Authenticates with your cloud providers for model access." />
                            <CommandRow cmd="foundry deploy" desc="Orchestrate one-click deployment to Vercel or AWS." />
                        </div>

                        {/* Global Flags */}
                        <div className="p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl">
                            <h3 className="text-2xl font-black italic mb-6">Global Options</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <div className="text-primary font-bold">--local-only</div>
                                    <div className="text-sm text-muted-foreground font-medium">Prevents any cloud-based API calls. High privacy mode.</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-primary font-bold">--verbose</div>
                                    <div className="text-sm text-muted-foreground font-medium">Shows real-time neural indexing progress and AST logs.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function CommandLine({ cmd, out }: { cmd: string, out: string }) {
    return (
        <div className="space-y-1">
            <div className="flex gap-2 text-primary">
                <span className="opacity-50">$</span>
                <span>{cmd}</span>
            </div>
            <div className="text-muted-foreground opacity-60 ml-4 pb-4">{out}</div>
        </div>
    );
}

function CommandRow({ cmd, desc }: { cmd: string, desc: string }) {
    return (
        <div className="p-6 rounded-2xl border border-border bg-card/20 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-card/40 transition-all">
            <code className="text-primary font-bold text-lg">{cmd}</code>
            <p className="text-muted-foreground font-medium text-right">{desc}</p>
        </div>
    );
}
