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

    // Comprehensive content library for blog posts
    const posts: Record<string, any> = {
        "v0-32-0-release": {
            title: "Introducing Codiner v0.32.0: AI-Powered Development Reimagined",
            date: "Feb 14, 2026",
            category: "Release",
            icon: "🚀",
            content: `
We're excited to announce the latest release of Codiner, featuring enhanced AI capabilities, improved performance, and a completely redesigned user interface. This release represents months of work and feedback from our amazing community.

### What's New?
1. **PAIKE Engine v2**: Now with 40% faster inference and deep structural project understanding. It doesn't just suggest lines; it architects modules.
2. **Glassmorphism UI**: A completely overhauled interface that prioritizes focus and aesthetic excellence.
3. **Local-first Sync**: Secure, end-to-end encrypted project synchronization that never hits our servers.

### The Future of Local AI
With v0.32.0, we're doubling down on our commitment to local-first development. By leveraging the latest optimizations in Apple Silicon and NVIDIA's Cuda cores, Codiner now runs Llama 3 models with sub-millisecond latency.

This is just the beginning of our journey in 2026.
            `
        },
        "10-tips-ai-apps": {
            title: "10 Tips for Building Better Apps with AI",
            date: "Feb 12, 2026",
            category: "Tutorial",
            icon: "💡",
            content: `
Building applications with AI is a new paradigm that requires a shift in how we think about the development lifecycle. Here are 10 tips to help you master the AI-first workflow in Codiner.

### 1. Be Specific with Architecture
Don't just ask for a "login page". Ask for a "responsive login page using Tailwind CSS, including client-side validation and a forgot password link".

### 2. Leverage PAIKE's Memory
Codiner understands your entire directory. Mention specific files to get more cohesive results.

### 3. Review, Don't Just Accept
AI is a co-pilot, not the captain. Always review the generated logic to ensure it meets your specific security and performance standards.
            `
        },
        "understanding-typescript": {
            title: "Understanding TypeScript in Codiner",
            date: "Feb 10, 2026",
            category: "Technical",
            icon: "🔷",
            content: `
TypeScript is more than just types; it's the backbone of reliable AI-generated code. In this deep dive, we explore how Codiner leverages TypeScript's AST to generate superior code.

### The Power of Type Inference
When you use a local model through Codiner, it actively parses your Type definitions. This means the AI knows exactly what properties are available on your components across the whole codebase.

### Reducing Hallucinations
By enforcing strict type checking during the generation phase, Codiner can self-correct when an AI attempts to use a non-existent method or property.
            `
        },
        "community-spotlight": {
            title: "Community Spotlight: Amazing Projects",
            date: "Feb 8, 2026",
            category: "Community",
            icon: "🌟",
            content: `
Our community has been busy building incredible things with the Codiner AI Foundry. This month, we're highlighting standout projects that showcase the power of local-first development.

### 1. HOSH - Privacy Browser
A browser extension built entirely using PAIKE that helps users manage their digital footprint without sending data to the cloud.

### 2. NeuralNotes
A local-first note-taking app that uses AI to automatically categorize and cross-link your thoughts as you write them.
            `
        },
        "deploying-your-first-app": {
            title: "Deploying Your First App",
            date: "Feb 5, 2026",
            category: "Tutorial",
            icon: "🚢",
            content: `
You've built your masterpiece locally—now it's time to share it with the world. Codiner makes deployment a breeze.

### Step 1: Production Build
Run 'npm run build' to generate an optimized version of your app. Codiner automatically applies tree shaking to minimize bundle sizes.

### Step 2: Choose Your Platform
Whether it's Vercel, Netlify, or custom Docker, Codiner provides one-click configuration for major providers.
            `
        },
        "security-best-practices": {
            title: "Security Best Practices",
            date: "Feb 3, 2026",
            category: "Security",
            icon: "🛡️",
            content: `
Security is our foundation. When building with AI, there are unique considerations you need to keep in mind to keep your data safe.

### 1. Local-First Advantage
The biggest advantage of Codiner is that your code remains on your machine. However, you should still be careful with API keys.

### 2. Environment Variables
Never hardcode secrets. Use '.env' files and ensure they are added to your '.gitignore'.
            `
        },
        "roadmap-2026": {
            title: "Roadmap: What's Coming in 2026",
            date: "Feb 1, 2026",
            category: "Announcement",
            icon: "🗓️",
            content: `
2026 is shaping up to be ambitious for Codiner. Here's what we're working on for the coming quarters.

### Q2: Forge Collaborative Edit
We're bringing real-time collaboration to the AI Foundry. All synchronization remains peer-to-peer and fully encrypted.

### Q3: Native Mobile Apps
PAIKE will soon support React Native, allowing you to build iOS and Android apps with the same AI interface.
            `
        }
    };

    const post = posts[slug] || posts["v0-32-0-release"];

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
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
                    <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-50" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">{post.icon}</span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none space-y-8 text-muted-foreground font-medium leading-relaxed">
                    <p className="text-2xl text-foreground font-bold italic lowercase mb-12 border-l-4 border-primary pl-6 py-2">
                        {post.content.trim().split('\n')[0]}
                    </p>
                    <div className="whitespace-pre-wrap">
                        {post.content.trim().split('\n').slice(1).join('\n')}
                    </div>
                </div>

                <div className="mt-20 pt-12 border-t border-border flex flex-wrap gap-8 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors group">
                            <Share2 className="w-5 h-5 group-hover:animate-bounce" /> share
                        </button>
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors group">
                            <Bookmark className="w-5 h-5 group-hover:fill-primary" /> save
                        </button>
                        <button className="flex items-center gap-2 font-bold hover:text-primary transition-colors group">
                            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" /> 12 comments
                        </button>
                    </div>
                    <Link
                        href="/blog"
                        className="px-8 py-3 rounded-xl bg-card border border-border font-bold hover:border-primary/50 transition-all text-sm italic"
                    >
                        More Articles →
                    </Link>
                </div>
            </article>

            <Footer />
        </main>
    );
}
