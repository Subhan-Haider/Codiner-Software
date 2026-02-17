"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExternalLink, Star, Award } from "lucide-react";
import Image from "next/image";

export default function ShowcasePage() {
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
                            Project <span className="text-gradient">Showcase</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Amazing applications built by our community using Codiner
                        </p>
                    </motion.div>

                    {/* Featured Projects */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
                            >
                                {project.featured && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-xs font-semibold flex items-center gap-1">
                                        <Award className="w-3 h-3" />
                                        Featured
                                    </div>
                                )}

                                {/* Project Image Placeholder */}
                                <div className="w-full h-48 rounded-lg bg-linear-to-br from-purple-600/10 to-blue-600/10 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <div className="text-6xl">{project.icon}</div>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4" />
                                            {project.stars}
                                        </span>
                                        <span>by {project.author}</span>
                                    </div>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Submit Project CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-xl border-2 border-primary/50 bg-card/50 backdrop-blur-sm shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold mb-4">Share Your Project</h2>
                        <p className="text-muted-foreground mb-6">
                            Built something amazing with Codiner? We'd love to feature it in our showcase!
                        </p>
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                        >
                            Submit Your Project (via Issues)
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const projects = [
    {
        title: "TaskFlow Pro",
        description: "A modern task management app with real-time collaboration and AI-powered task suggestions",
        icon: "✓",
        tags: ["React", "TypeScript", "Prisma"],
        author: "Sarah Chen",
        stars: "1.2K",
        featured: true,
        link: "#",
    },
    {
        title: "DevDash Analytics",
        description: "Beautiful analytics dashboard for developers with GitHub integration and custom metrics",
        icon: "📊",
        tags: ["Next.js", "TailwindCSS"],
        author: "Alex Kumar",
        stars: "890",
        featured: true,
        link: "#",
    },
    {
        title: "CodeSnap",
        description: "Create beautiful code screenshots with syntax highlighting and custom themes",
        icon: "📸",
        tags: ["React", "Canvas API"],
        author: "Maria Garcia",
        stars: "2.3K",
        featured: true,
        link: "#",
    },
    {
        title: "ChatHub",
        description: "Real-time chat application with end-to-end encryption and file sharing",
        icon: "💬",
        tags: ["WebSocket", "Node.js"],
        author: "James Wilson",
        stars: "567",
        link: "#",
    },
    {
        title: "FinanceTracker",
        description: "Personal finance management with AI-powered insights and budget recommendations",
        icon: "💰",
        tags: ["React", "Chart.js"],
        author: "Lisa Park",
        stars: "1.5K",
        link: "#",
    },
    {
        title: "RecipeBox",
        description: "Discover and save recipes with meal planning and grocery list generation",
        icon: "🍳",
        tags: ["Next.js", "MongoDB"],
        author: "Tom Anderson",
        stars: "423",
        link: "#",
    },
    {
        title: "FitnessPal",
        description: "Track workouts, nutrition, and progress with personalized AI coaching",
        icon: "💪",
        tags: ["React Native", "AI"],
        author: "Emma Davis",
        stars: "789",
        link: "#",
    },
    {
        title: "MusicMixer",
        description: "Create and share music playlists with collaborative editing and recommendations",
        icon: "🎵",
        tags: ["React", "Spotify API"],
        author: "Mike Johnson",
        stars: "1.1K",
        link: "#",
    },
    {
        title: "StudyBuddy",
        description: "Study timer with Pomodoro technique, notes, and progress tracking for students",
        icon: "📚",
        tags: ["Vue.js", "TypeScript"],
        author: "Nina Patel",
        stars: "654",
        link: "#",
    },
];
