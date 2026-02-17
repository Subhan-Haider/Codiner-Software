"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ChevronRight, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic lowercase">
                            Our <span className="text-gradient">Blog</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                            Latest updates, tutorials, and insights from the Codiner team.
                        </p>
                    </motion.div>

                    {/* Featured Post */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative group mb-32"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-[4rem] opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                        <div className="relative p-12 rounded-[4rem] border border-border bg-card/40 backdrop-blur-xl overflow-hidden shadow-3xl">
                            <div className="flex flex-col lg:flex-row gap-16 items-center">
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">Featured</span>
                                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> Feb 14, 2026
                                        </span>
                                    </div>
                                    <Link href="/blog/v0-32-0-release" className="block group/title">
                                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight group-hover/title:text-primary transition-colors">
                                            Introducing Codiner v0.32.0: AI-Powered Development Reimagined
                                        </h2>
                                    </Link>
                                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                        We're excited to announce the latest release of Codiner, featuring enhanced AI capabilities, improved performance, and a completely redesigned user interface. This release represents months of work and feedback from our amazing community.
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <Link
                                            href="/blog/v0-32-0-release"
                                            className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black italic flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl"
                                        >
                                            read more <ChevronRight className="w-5 h-5" />
                                        </Link>
                                        <div className="flex gap-4">
                                            <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-card transition-colors"><Share2 className="w-5 h-5" /></button>
                                            <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-card transition-colors"><Bookmark className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/blog/v0-32-0-release" className="flex-1 w-full">
                                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-linear-to-br from-primary/20 to-blue-600/20 border border-primary/10 group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
                                        <div className="absolute inset-0 flex items-center justify-center text-9xl">🚀</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid Section */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-40">
                        <BlogCard
                            date="Feb 12, 2026"
                            category="Tutorial"
                            title="10 Tips for Building Better Apps with AI"
                            desc="Learn how to leverage AI effectively in your development workflow with these proven strategies."
                            icon="💡"
                            href="/blog/10-tips-ai-apps"
                        />
                        <BlogCard
                            date="Feb 10, 2026"
                            category="Technical"
                            title="Understanding TypeScript in Codiner"
                            desc="A deep dive into how Codiner uses TypeScript to provide type-safe development experiences."
                            icon="🔷"
                            href="/blog/understanding-typescript"
                        />
                        <BlogCard
                            date="Feb 8, 2026"
                            category="Community"
                            title="Community Spotlight: Amazing Projects"
                            desc="Showcasing incredible applications built by our community members using Codiner."
                            icon="🌟"
                            href="/blog/community-spotlight"
                        />
                        <BlogCard
                            date="Feb 5, 2026"
                            category="Tutorial"
                            title="Deploying Your First App"
                            desc="Step-by-step guide to deploying your Codiner application to production."
                            icon="🚢"
                            href="/blog/deploying-your-first-app"
                        />
                        <BlogCard
                            date="Feb 3, 2026"
                            category="Security"
                            title="Security Best Practices"
                            desc="Essential security considerations when building applications with Codiner."
                            icon="🛡️"
                            href="/blog/security-best-practices"
                        />
                        <BlogCard
                            date="Feb 1, 2026"
                            category="Announcement"
                            title="Roadmap: What's Coming in 2026"
                            desc="A look at our plans for Codiner in the coming year, including exciting new features."
                            icon="🗓️"
                            href="/blog/roadmap-2026"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function BlogCard({ date, category, title, desc, icon, href }: { date: string, category: string, title: string, desc: string, icon: string, href: string }) {
    return (
        <Link href={href} className="group">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full"
            >
                <div className="relative aspect-video w-full rounded-4xl bg-card border border-border mb-8 overflow-hidden group-hover:border-primary/50 transition-all shadow-xl">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500">{icon}</div>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">{category}</span>
                        <span className="text-xs font-bold text-muted-foreground">{date}</span>
                    </div>
                    <h3 className="text-2xl font-black italic tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-foreground font-medium leading-relaxed line-clamp-2">
                        {desc}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-primary font-black italic uppercase text-sm tracking-widest group-hover:translate-x-2 transition-all">
                        read more <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
