"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Cpu, Layers, Network, Boxes, ChevronRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PaikeEnginePage() {
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
                            Core Cognitive Engine
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            PAIKE <span className="text-gradient">Engine</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Peer AI Knowledge Exchange. The cognitive backbone that powers real-time project analysis and generation.
                        </p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto space-y-32">
                        {/* Anatomy of PAIKE */}
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-black italic tracking-tighter">Anatomy of an Orchestration</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                    PAIKE doesn't just "chat." It treats your entire directory as a multi-dimensional graph, indexing every class, function, and relationship into a local vector store.
                                </p>
                                <div className="space-y-4">
                                    <FeatureItem icon={Activity} title="Contextual awareness" text="Understands local imports and variable scope." />
                                    <FeatureItem icon={Network} title="Relationship Mapping" text="Builds a live AST-Graph of your project." />
                                    <FeatureItem icon={Boxes} title="Neural Stitching" text="Predicts where new code blocks should live." />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 p-8 rounded-[3rem] bg-black/40 border border-border shadow-inner">
                                <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
                                    <Cpu className="w-8 h-8 text-primary mb-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Local Inference</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center">
                                    <Layers className="w-8 h-8 text-primary mb-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Vector-store</span>
                                </div>
                                <div className="col-span-2 p-6 rounded-2xl bg-primary animate-pulse flex items-center justify-center gap-3">
                                    <Zap className="w-5 h-5 text-white" />
                                    <span className="text-sm font-black text-white uppercase tracking-widest">Active Neural Synch</span>
                                </div>
                            </div>
                        </div>

                        {/* Integration Path */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="p-16 rounded-[4rem] bg-card border border-border shadow-2xl relative overflow-hidden group"
                        >
                            <h3 className="text-4xl font-black italic tracking-tighter mb-8">Model agnostic processing</h3>
                            <p className="text-xl text-muted-foreground mb-12 font-medium">
                                PAIKE works with any LLM. We recommend Llama 3 for local privacy, but you can plug in Claude 3.5 or GPT-4o for heavy architectural redesigns.
                            </p>
                            <Link
                                href="/docs/api-reference"
                                className="inline-flex items-center gap-2 text-primary font-black text-lg hover:translate-x-2 transition-transform"
                            >
                                View Integration Specs
                                <ChevronRight className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FeatureItem({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
    return (
        <div className="flex gap-6 items-start">
            <div className="mt-1 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h4 className="text-xl font-bold italic mb-1">{title}</h4>
                <p className="text-muted-foreground font-medium">{text}</p>
            </div>
        </div>
    );
}

