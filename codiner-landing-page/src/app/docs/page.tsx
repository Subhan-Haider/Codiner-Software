"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, FileText, Code, Terminal, Zap, Shield, Database, Github, Search, Compass, Layers, Globe, Box } from "lucide-react";
import { useState } from "react";

export default function DocsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Premium Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">

                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase">
                            Codex <span className="text-gradient">Hub</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground leading-relaxed">
                            Everything you need to master Codiner. From your first project to advanced PAIKE orchestration.
                        </p>
                    </motion.div>

                    {/* Search bar */}
                    <div className="max-w-2xl mx-auto mb-24">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search documentation... (e.g. 'How to use PAIKE')"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-card border border-border focus:border-primary focus:outline-none transition-all shadow-2xl text-xl font-medium"
                            />
                        </div>
                    </div>

                    {/* Quick Start Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                        {[
                            { title: "Getting Started", icon: Compass, count: "12 articles", href: "/docs/getting-started" },
                            { title: "PAIKE Engine", icon: Zap, count: "8 articles", href: "/docs/paike-engine" },
                            { title: "Foundry CLI", icon: Terminal, count: "15 articles", href: "/docs/foundry-cli" },
                            { title: "API Reference", icon: Code, count: "142 endpoints", href: "/docs/api-reference" }
                        ].map((category, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group h-full"
                            >
                                <Link
                                    href={category.href}
                                    className="p-10 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl hover:border-primary/50 transition-all cursor-pointer block h-full shadow-xl"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <category.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black italic mb-2">{category.title}</h3>
                                    <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">{category.count}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Documentation Sections */}
                    <div className="grid md:grid-cols-2 gap-12 mb-32">
                        {[
                            {
                                title: "Architectural Foundations",
                                desc: "Understand Liberty core, Neural Pulse diagnostics, and how local LLMs communicate with your build pipeline.",
                                icon: Layers,
                                topics: ["Liberty Core", "Ollama Integration", "Vector Storage", "Semantic Indexing"]
                            },
                            {
                                title: "Deployment & Distribution",
                                desc: "Learn how to ship your code to production using our one-click pipelines for AWS, Vercel, and Docker.",
                                icon: Globe,
                                topics: ["Deployment Workflows", "CI/CD Setup", "Environment Props", "SSL & Domains"]
                            },
                            {
                                title: "Security & Privacy",
                                desc: "Codiner is built on a local-first philosophy. Explore our security audit protocols and data privacy standards.",
                                icon: Shield,
                                topics: ["Local Processing", "Data Encryption", "Auth0 Integration", "Compliance"]
                            },
                            {
                                title: "Database Systems",
                                desc: "Manage your persistent data layers with AI-assisted schema generation and real-time migration tools.",
                                icon: Database,
                                topics: ["Prisma Setup", "Migration Logic", "Query Optimization", "Supabase Flow"]
                            }
                        ].map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-12 rounded-[3.5rem] border border-border bg-card/50 shadow-2xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <section.icon className="w-40 h-40 text-primary" />
                                </div>

                                <h3 className="text-4xl font-black italic tracking-tighter mb-6">{section.title}</h3>
                                <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium">{section.desc}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    {section.topics.map(topic => (
                                        <Link
                                            key={topic}
                                            href={topic === "Deployment Workflows" ? "/docs/installation" : "#"}
                                            className="flex items-center gap-3 text-sm font-bold text-primary/80 hover:text-primary cursor-pointer transition-colors"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {topic}
                                        </Link>
                                    ))}
                                    {section.title === "Architectural Foundations" && (
                                        <Link href="/local-ai" className="flex items-center gap-3 text-sm font-black text-primary hover:scale-105 transition-transform col-span-2 mt-4 bg-primary/10 p-4 rounded-2xl border border-primary/20">
                                            <Box className="w-5 h-5" />
                                            Deep Dive: Local AI Stack & Ollama
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Help Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="p-16 rounded-[4rem] bg-gradient-to-br from-primary/5 to-blue-600/5 border border-primary/20 text-center max-w-5xl mx-auto shadow-2xl"
                    >
                        <h2 className="text-5xl font-black italic tracking-tight mb-8">Can't find what you're looking for?</h2>
                        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Our community is always ready to help. Reach out on Discord or start a discussion on GitHub.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a href="#" className="px-10 py-5 rounded-[2rem] bg-primary text-primary-foreground font-black text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                                Ask the Community
                            </a>
                            <a href="https://github.com/Subhan-Haider/Codiner-Software/issues" className="px-10 py-5 rounded-[2rem] border-2 border-border hover:border-primary font-bold text-lg hover:scale-105 transition-transform">
                                Report an Issue
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
