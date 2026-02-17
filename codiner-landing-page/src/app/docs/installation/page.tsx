"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Check, Monitor, Apple, Terminal, Shield, Zap, Cpu, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InstallationPage() {
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
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            Installation <span className="text-gradient">Guide</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Follow these simple steps to get Codiner running on your machine.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Requirements */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl shadow-2xl"
                        >
                            <h2 className="text-3xl font-black italic mb-8 flex items-center gap-4">
                                <Shield className="w-8 h-8 text-primary" />
                                System Requirements
                            </h2>
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-primary">Minimum</h3>
                                    <ul className="space-y-3 text-muted-foreground font-medium">
                                        <li className="flex items-center gap-2"><Cpu className="w-4 h-4" /> 4 GB RAM</li>
                                        <li className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> 500 MB Space</li>
                                        <li className="flex items-center gap-2">Windows 10 / macOS 12+</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-primary">Recommended</h3>
                                    <ul className="space-y-3 text-muted-foreground font-medium">
                                        <li className="flex items-center gap-2"><Cpu className="w-4 h-4" /> 16 GB RAM</li>
                                        <li className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> SSD storage</li>
                                        <li className="flex items-center gap-2">NVIDIA GPU / Apple Silicon</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-8xl font-black opacity-[0.03] italic">01</div>
                            <h2 className="text-3xl font-black italic mb-6">Download the Installer</h2>
                            <p className="text-lg text-muted-foreground mb-8 font-medium">
                                Choose the version for your operating system from our download page.
                            </p>
                            <a
                                href="/download"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black hover:scale-105 transition-transform"
                            >
                                <Download className="w-5 h-5" />
                                Go to Download Page
                            </a>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-8xl font-black opacity-[0.03] italic">02</div>
                            <h2 className="text-3xl font-black italic mb-6">Run the Setup</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <Monitor className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">Windows</h4>
                                        <p className="text-muted-foreground">Double-click <code>Codiner-Windows-Setup.exe</code> and follow the prompts.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Apple className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <h4 className="font-bold mb-1">macOS</h4>
                                        <p className="text-muted-foreground">Open the <code>.dmg</code> and drag Codiner to your Applications folder.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[3rem] border border-border bg-card/40 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 text-8xl font-black opacity-[0.03] italic">03</div>
                            <h2 className="text-3xl font-black italic mb-6 text-gradient">Configure Local AI</h2>
                            <p className="text-lg text-muted-foreground mb-8 font-medium">
                                Upon first launch, Codiner will help you set up <strong>Ollama</strong> or connect to your preferred AI provider.
                            </p>
                            <div className="p-6 rounded-2xl bg-white border border-border font-mono text-sm text-slate-900 shadow-inner">
                                <div className="flex items-center gap-2 mb-2">
                                    <Terminal className="w-4 h-4 text-primary" />
                                    <span className="font-bold">$ codiner --init-paike</span>
                                </div>
                                <div className="text-slate-500">Initializing neural project graph... Done.</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Support */}
                    <div className="mt-32 text-center">
                        <Zap className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
                        <h3 className="text-3xl font-black italic mb-4">Need help?</h3>
                        <p className="text-xl text-muted-foreground mb-10 font-medium">Our documentation covers every edge case.</p>
                        <a href="/docs" className="text-primary font-black text-lg hover:underline underline-offset-8">
                            Browse Docs Hub →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
