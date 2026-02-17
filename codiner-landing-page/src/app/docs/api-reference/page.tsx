"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Terminal, Zap, Shield, ChevronRight, Database, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ApiReferencePage() {
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
                            Developer Reference
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            API <span className="text-gradient">Reference</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Integrate Codiner's PAIKE engine directly into your own tools and workflows.
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16">
                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Introduction</h3>
                                <ul className="space-y-4 font-bold text-muted-foreground">
                                    <li className="text-foreground">Authentication</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Rate Limiting</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Errors</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Workspace</h3>
                                <ul className="space-y-4 font-bold text-muted-foreground">
                                    <li className="hover:text-primary transition-colors cursor-pointer">Project Init (12)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Template Config (8)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Team Synch (15)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Orchestration</h3>
                                <ul className="space-y-4 font-bold text-muted-foreground">
                                    <li className="hover:text-primary transition-colors cursor-pointer">Start Synch (5)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Query Graph (24)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Apply Patch (12)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Neural Engine</h3>
                                <ul className="space-y-4 font-bold text-muted-foreground">
                                    <li className="hover:text-primary transition-colors cursor-pointer">Inference (42)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Vector Ops (18)</li>
                                    <li className="hover:text-primary transition-colors cursor-pointer">Model Tuning (6)</li>
                                </ul>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="space-y-20">
                            {/* Endpoint Card */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 rounded bg-green-500/20 text-green-500 text-xs font-black">POST</span>
                                    <code className="text-xl font-bold italic tracking-tight">/v1/orchestrate/synch</code>
                                </div>
                                <p className="text-lg text-muted-foreground font-medium">
                                    Triggers a deep neural scan of the target repository and populates the local vector store.
                                </p>

                                <div className="p-8 rounded-[2.5rem] bg-white border border-border shadow-xl font-mono text-sm relative overflow-hidden">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-muted-foreground/60 uppercase tracking-widest text-xs">Request Body</span>
                                        <span className="text-primary hover:text-primary/70 cursor-pointer text-xs font-black uppercase tracking-widest">Copy JSON</span>
                                    </div>
                                    <pre className="text-purple-400">
                                        {`{
  "path": "./src",
  "engine": "llama-3-local",
  "options": {
    "depth": "ast-full",
    "indexing": "semantic"
  }
}`}
                                    </pre>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="font-black italic text-xl">Parameters</h4>
                                    <ParamRow name="path" type="string" desc="Absolute file path to the project root." />
                                    <ParamRow name="engine" type="enum" desc="Choice of AI engine: 'llama-3-local' | 'gpt-4o' | 'claude-3-5'." />
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="p-10 rounded-[3rem] border border-primary/20 bg-primary/5 flex gap-8 items-start">
                                <Shield className="w-10 h-10 text-primary shrink-0" />
                                <div>
                                    <h4 className="text-2xl font-black italic mb-2">Security Notice</h4>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        Local-first API calls do not require Auth tokens if running in 'Headless Foundry' mode on the same machine.
                                    </p>
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

function ParamRow({ name, type, desc }: { name: string, type: string, desc: string }) {
    return (
        <div className="flex items-start justify-between py-4 border-b border-border">
            <div className="space-y-1">
                <code className="text-primary font-bold">{name}</code>
                <p className="text-sm text-muted-foreground font-medium">{desc}</p>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/40">{type}</span>
        </div>
    );
}
