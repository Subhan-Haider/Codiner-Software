"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Search, Gauge, Map, Zap, Shield, Database, Sparkles, TrendingUp, BarChart, Lock } from "lucide-react";

export default function PAIKEPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">New Feature: PAIKE Engine</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                            Meet <span className="text-gradient">PAIKE</span>: Your Personal AI Knowledge Engine
                        </h1>
                        <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
                            The advanced system that learns from every line you write, adapts to your style, and builds a living knowledge base that evolves with you.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
                            >
                                <div className="text-3xl font-bold mb-1 text-primary">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-24 border-t border-border bg-muted-card transition-colors duration-300">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Core Capabilities</h2>
                        <p className="text-muted-foreground">Four engines working together to supercharge your workflow</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {capabilities.map((cap, index) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-2xl border border-border bg-card hover:border-primary transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <cap.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{cap.title}</h3>
                                <p className="text-muted-foreground mb-6">{cap.description}</p>
                                <ul className="space-y-3">
                                    {cap.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Learns */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">The Learning Cycle</h2>
                        <p className="text-muted-foreground">PAIKE doesn't just generate code; it evolves with your decisions.</p>
                    </div>

                    <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden lg:block -translate-y-1/2 z-0" />
                        <div className="grid lg:grid-cols-4 gap-12 relative z-10">
                            {learningSteps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center mx-auto mb-6 font-bold text-xl shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Section */}
            <section className="py-24 border-t border-border bg-primary/5">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto p-12 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <Shield className="w-32 h-32 text-primary/10 rotate-12" />
                        </div>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl font-bold mb-6">Privacy-First Intelligence</h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                PAIKE operates entirely on your local machine. Your coding patterns, solved problems, and style preferences never leave your device.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 font-semibold">
                                        <Database className="w-5 h-5 text-primary" />
                                        Local SQLite Storage
                                    </div>
                                    <div className="flex items-center gap-3 font-semibold">
                                        <Lock className="w-5 h-5 text-primary" />
                                        Opt-in Learning
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 font-semibold">
                                        <Zap className="w-5 h-5 text-primary" />
                                        No Cloud Sync Required
                                    </div>
                                    <div className="flex items-center gap-3 font-semibold">
                                        <Shield className="w-5 h-5 text-primary" />
                                        Encrypted Metadata
                                    </div>
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

const stats = [
    { label: "Recognition Confidence", value: "98.4%" },
    { label: "Optimal SEO Score", value: "100/100" },
    { label: "Personalization Index", value: "Active" },
    { label: "Local Memory", value: "Persistent" },
];

const capabilities = [
    {
        icon: Brain,
        title: "Pattern Recognition",
        description: "Learns your coding style, naming conventions, and architecture choices automatically.",
        features: [
            "AST-based code analysis",
            "Functional vs Class learning",
            "Naming convention tracking",
            "Library choice persistence",
        ],
    },
    {
        icon: Search,
        title: "Auto SEO Engine",
        description: "Automatically generates and injects optimal metadata for all your pages.",
        features: [
            "Smart Title generation",
            "Meta description optimization",
            "Open Graph & Twitter tags",
            "Schema.org structured data",
        ],
    },
    {
        icon: Gauge,
        title: "Performance Optimizer",
        description: "PAIKE monitors and fixes performance bottlenecks in real-time.",
        features: [
            "Image WebP conversion",
            "Critical CSS extraction",
            "Bundle size monitoring",
            "Resource hint injection",
        ],
    },
    {
        icon: Map,
        title: "Smart Sitemap Gen",
        description: "AI-driven sitemaps that understand your project's hierarchy and priorities.",
        features: [
            "Dynamic XML/HTML/JSON",
            "Intelligent priority scores",
            "Change frequency tracking",
            "Automatic build updates",
        ],
    },
];

const learningSteps = [
    {
        title: "Write Code",
        description: "Develop your application as you normally would, using your preferred tools and styles.",
    },
    {
        title: "Pattern Analysis",
        description: "PAIKE analyzes your changes in the background, identifying recurring patterns and choices.",
    },
    {
        title: "Knowledge Storage",
        description: "Learned insights are stored in your local SQLite knowledge base with increasing confidence.",
    },
    {
        title: "Tailored Assistance",
        description: "AI suggestions become increasingly aligned with your personal coding style and standards.",
    },
];
