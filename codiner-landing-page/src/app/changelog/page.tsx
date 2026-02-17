"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, GitCommit, Search, Filter, Bug, Rocket, Sparkles, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ChangelogPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredLogs = changelogData.filter(
        (log) =>
            log.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.changes.some((change) => change.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter italic">
                            Product <span className="text-gradient">Pulse</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Stay up to date with the latest features, improvements, and fixes in the Codiner ecosystem.
                        </p>
                    </motion.div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-16 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search versions or features..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary focus:outline-none transition-colors shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Changelog Timeline */}
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent hidden md:block" />

                        <div className="space-y-16">
                            {filteredLogs.map((log, index) => (
                                <motion.div
                                    key={log.version}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-0 md:pl-20"
                                >
                                    {/* Version Dot */}
                                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                        <GitCommit className="w-6 h-6 text-primary" />
                                    </div>

                                    <div className="p-8 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <log.mainIcon className="w-32 h-32 text-primary" />
                                        </div>

                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                            <div>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                                                    {log.date}
                                                </div>
                                                <h2 className="text-3xl font-black italic tracking-tight">{log.version} — {log.title}</h2>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {log.tags.map(tag => (
                                                    <div key={tag} className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-[10px] font-bold uppercase">
                                                        {tag[0]}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {log.changes.map((change, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                                        change.type === 'feature' ? "bg-green-500/10 text-green-500" :
                                                            change.type === 'fix' ? "bg-red-500/10 text-red-500" :
                                                                "bg-blue-500/10 text-blue-500"
                                                    )}>
                                                        {change.type === 'feature' ? <Sparkles className="w-5 h-5" /> :
                                                            change.type === 'fix' ? <Bug className="w-5 h-5" /> :
                                                                <RefreshCcw className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg mb-1">{change.title}</h4>
                                                        <p className="text-muted-foreground leading-relaxed">{change.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const changelogData = [
    {
        version: "v0.32.0",
        title: "The PAIKE Integration",
        date: "Feb 14, 2026",
        mainIcon: Zap,
        tags: ["PAIKE", "Local", "Core"],
        changes: [
            {
                type: "feature",
                title: "Personal AI Knowledge Engine (PAIKE)",
                desc: "Launch of our revolutionary local-first AI engine that learns from your code patterns and context.",
            },
            {
                type: "improvement",
                title: "AST Semantic Analysis",
                desc: "Greatly improved code understanding by moving from token-based to AST-based knowledge extraction.",
            },
            {
                type: "fix",
                title: "Ollama Port Conflict",
                desc: "Resolved issue where Codiner would fail to communicate with Ollama if running on non-default ports.",
            }
        ]
    },
    {
        version: "v0.31.5",
        title: "Neural Stability Update",
        date: "Feb 01, 2026",
        mainIcon: RefreshCcw,
        tags: ["Stability", "Perf"],
        changes: [
            {
                type: "improvement",
                title: "Neural Pulse Latency",
                desc: "Reduced background monitoring latency by 45% through aggressive caching of UI components.",
            },
            {
                type: "feature",
                title: "Dark Mode 2.0",
                desc: "A completely revamped dark theme with enhanced glassmorphism and sub-pixel antialiasing.",
            }
        ]
    },
    {
        version: "v0.31.0",
        title: "Foundry Launch",
        date: "Jan 15, 2026",
        mainIcon: Rocket,
        tags: ["Launch", "UI"],
        changes: [
            {
                type: "feature",
                title: "Initial Foundry Release",
                desc: "The public debut of the Codiner Foundry, enabling one-click project scaffolding for 20+ frameworks.",
            },
            {
                type: "feature",
                title: "Stripe Integration Flow",
                desc: "Added first-class support for Stripe Checkout and Subscriptions in AI-generated templates.",
            }
        ]
    }
];
