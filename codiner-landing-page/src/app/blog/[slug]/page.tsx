"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ChevronLeft, Share2, Bookmark, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    // Dummy content based on slug
    const posts: Record<string, any> = {
        "v0-32-0-release": {
            title: "Introducing Codiner v0.32.0: AI-Powered Development Reimagined",
            date: "Feb 14, 2026",
            category: "Release",
            icon: "🚀",
            content: `
                We're excited to announce the latest release of Codiner, featuring enhanced AI capabilities, improved performance, and a completely redesigned user interface. This release represents months of work and feedback from our amazing community.

                ### What's New?
                1. **PAIKE Engine v2**: Now with 40% faster inference and deep structural project understanding.
                2. **Glassmorphism UI**: A completely overhauled interface that prioritizes focus and aesthetic excellence.
                3. **Local-first Sync**: Secure, end-to-end encrypted project synchronization that never hits our servers.

                This is just the beginning of our journey in 2026.
            `
        },
        "10-tips-ai-apps": {
            title: "10 Tips for Building Better Apps with AI",
            date: "Feb 12, 2026",
            category: "Tutorial",
            icon: "💡",
            content: "Learn how to leverage AI effectively in your development workflow with these proven strategies..."
        }
    };

    const post = posts[slug] || posts["v0-32-0-release"];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <article className="pt-40 pb-20 container mx-auto px-6 max-w-4xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-bold italic lowercase tracking-tight group"
                >
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> back to blog
                </Link>

                <div className="space-y-8 mb-16">
                    <div className="flex items-center gap-4">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">{post.category}</span>
                        <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> {post.date}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight lowercase">
                        {post.title}
                    </h1>
                </div>

                <div className="aspect-video w-full rounded-[3rem] bg-card border border-border mb-16 flex items-center justify-center text-9xl shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <span className="relative z-10">{post.icon}</span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none space-y-8 text-muted-foreground font-medium leading-relaxed">
                    <p className="text-2xl text-foreground font-bold italic lowercase mb-12">
                        {post.content.split('\n')[0]}
                    </p>
                    <div className="whitespace-pre-wrap">
                        {post.content.split('\n').slice(1).join('\n')}
                    </div>
                </div>

                <div className="mt-20 pt-12 border-t border-border flex flex-wrap gap-8 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors"><Share2 className="w-5 h-5" /> share</button>
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors"><Bookmark className="w-5 h-5" /> save</button>
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors"><MessageSquare className="w-5 h-5" /> 12 comments</button>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
