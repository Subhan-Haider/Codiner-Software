"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, GitFork, Eye, Code, Users, Activity } from "lucide-react";
import { useState, useEffect } from "react";

export default function GitHubPage() {
    const [stats, setStats] = useState({
        stars: "2.1K",
        forks: "340",
        watchers: "156",
        contributors: "45",
        commits: "1,234",
        issues: "12",
    });

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <section className="relative pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Open Source on <span className="text-gradient">GitHub</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Codiner is built in the open. Contribute, fork, or just explore the codebase.
                        </p>
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                        >
                            <Star className="w-5 h-5" />
                            Star on GitHub
                        </a>
                    </motion.div>

                    {/* GitHub Stats */}
                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-16">
                        {[
                            { icon: Star, label: "Stars", value: stats.stars, color: "text-yellow-400" },
                            { icon: GitFork, label: "Forks", value: stats.forks, color: "text-blue-400" },
                            { icon: Eye, label: "Watchers", value: stats.watchers, color: "text-green-400" },
                            { icon: Users, label: "Contributors", value: stats.contributors, color: "text-purple-400" },
                            { icon: Code, label: "Commits", value: stats.commits, color: "text-pink-400" },
                            { icon: Activity, label: "Open Issues", value: stats.issues, color: "text-orange-400" },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md text-center hover:shadow-lg transition-all"
                            >
                                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                <div className="text-muted-foreground text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Repository Info */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">Repository Structure</h2>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="text-blue-400">📁</span> src/
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground pl-4">
                                    <span className="text-blue-400">📁</span> app/
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground pl-4">
                                    <span className="text-blue-400">📁</span> components/
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground pl-4">
                                    <span className="text-blue-400">📁</span> ipc/
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground pl-4">
                                    <span className="text-blue-400">📁</span> main/
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="text-green-400">📄</span> package.json
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="text-green-400">📄</span> forge.config.ts
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="text-green-400">📄</span> README.md
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">TypeScript</span>
                                    <span className="text-blue-400">95.2%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: "95.2%" }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">CSS</span>
                                    <span className="text-purple-400">3.1%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: "3.1%" }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">JavaScript</span>
                                    <span className="text-yellow-400">1.7%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "1.7%" }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {quickLinks.map((link, index) => (
                            <motion.a
                                key={link.title}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 group shadow-md hover:shadow-lg"
                            >
                                <link.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                                <p className="text-muted-foreground text-sm">{link.description}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const quickLinks = [
    {
        icon: Code,
        title: "Source Code",
        description: "Browse the complete source code and implementation",
        href: "https://github.com/Subhan-Haider/Codiner-Software",
    },
    {
        icon: Activity,
        title: "Issues",
        description: "Report bugs or request new features",
        href: "https://github.com/Subhan-Haider/Codiner-Software/issues",
    },
    {
        icon: GitFork,
        title: "Pull Requests",
        description: "Contribute code and review PRs",
        href: "https://github.com/Subhan-Haider/Codiner-Software/pulls",
    },
];
