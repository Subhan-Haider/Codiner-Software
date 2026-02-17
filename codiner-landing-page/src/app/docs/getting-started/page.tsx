"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, Rocket, Zap, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function GettingStartedPage() {
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
                            Tutorials & Guides
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            Getting <span className="text-gradient">Started</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Welcome to the future of development. Let's get you set up and building your first AI-native application.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto grid gap-12">
                        {/* Quick Start Path */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <GuideCard
                                icon={Rocket}
                                title="Installation"
                                desc="Get Codiner running on your OS in under 2 minutes."
                                href="/docs/installation"
                            />
                            <GuideCard
                                icon={Zap}
                                title="Core Concepts"
                                desc="Understand how PAIKE and Foundry work together."
                                href="#concepts"
                            />
                        </div>

                        {/* Step By Step */}
                        <div className="space-y-12 py-20">
                            <h2 className="text-4xl font-black italic tracking-tighter mb-12">The Quickstar Flow</h2>

                            <Step
                                num="01"
                                title="initialize your Workspace"
                                text="Codiner works best when it understands your project structure. Open any folder or use the 'New Project' wizard to start from a template."
                            />
                            <Step
                                num="02"
                                title="Choose Your AI Engine"
                                text="Select between Local-first models (Llama 3, Mistral via Ollama) or Cloud-based providers (OpenAI, Anthropic) for your PAIKE orchestration."
                            />
                            <Step
                                num="03"
                                title="Begin Architectural Chat"
                                text="Use CMD+K (or CTRL+K) to talk to PAIKE. Ask it to 'scaffold a dashboard with authentication' or 'explain the existing project graph'."
                            />
                        </div>

                        {/* Call to Action */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="p-16 rounded-[4rem] bg-card border border-border shadow-2xl text-center relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-4xl font-black italic tracking-tighter mb-6 underline decoration-primary/30 decoration-8">Ready to Build?</h3>
                            <p className="text-xl text-muted-foreground mb-10 font-medium max-w-xl mx-auto">
                                Now that you know the basics, dive into the CLI for advanced project management.
                            </p>
                            <Link
                                href="/docs/foundry-cli"
                                className="inline-flex items-center gap-2 px-10 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg hover:scale-105 transition-transform"
                            >
                                Explorer CLI Docs
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function GuideCard({ icon: Icon, title, desc, href }: { icon: any, title: string, desc: string, href: string }) {
    return (
        <Link href={href} className="group p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-all flex flex-col h-full shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-black italic mb-4">{title}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">{desc}</p>
        </Link>
    );
}

function Step({ num, title, text }: { num: string, title: string, text: string }) {
    return (
        <div className="flex gap-8 group">
            <div className="text-5xl font-black italic text-primary/10 group-hover:text-primary/30 transition-colors shrink-0 leading-none">
                {num}
            </div>
            <div className="space-y-4">
                <h4 className="text-2xl font-black italic tracking-tight">{title}</h4>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">{text}</p>
                <div className="h-px w-full bg-border" />
            </div>
        </div>
    );
}
