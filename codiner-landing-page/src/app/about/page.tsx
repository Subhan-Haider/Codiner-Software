"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Heart, Target, Zap } from "lucide-react";

export default function AboutPage() {
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
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            About <span className="text-gradient">Codiner</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Empowering developers to build amazing applications with AI
                        </p>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto mb-20"
                    >
                        <div className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                            <p className="text-lg text-muted-foreground text-center leading-relaxed">
                                To democratize software development by providing free, powerful, and
                                accessible AI-powered tools that enable anyone to build professional
                                applications. We believe in a future where creating software is as easy as
                                describing what you want to build.
                            </p>
                        </div>
                    </motion.div>

                    {/* Values */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
                        <div className="space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                Codiner was born from a simple observation: building software is too hard.
                                Despite decades of progress in development tools, creating even a basic
                                application still requires extensive knowledge of programming languages,
                                frameworks, and deployment processes.
                            </p>
                            <p>
                                We set out to change that. By combining the power of AI with modern
                                development practices, we created a tool that understands what you want to
                                build and helps you create it - whether you're a seasoned developer or just
                                starting out.
                            </p>
                            <p>
                                Today, Codiner is used by thousands of developers worldwide to build
                                everything from simple websites to complex full-stack applications. And
                                we're just getting started.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative py-20 border-t border-border">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const values = [
    {
        icon: Users,
        title: "Community First",
        description: "Built by developers, for developers. Open source and collaborative.",
    },
    {
        icon: Heart,
        title: "User-Centric",
        description: "Every feature is designed with the developer experience in mind.",
    },
    {
        icon: Target,
        title: "Quality Focused",
        description: "We prioritize reliability, performance, and code quality.",
    },
    {
        icon: Zap,
        title: "Innovation",
        description: "Pushing the boundaries of what's possible with AI and development tools.",
    },
];

const team = [
    {
        name: "Subhan Haider",
        role: "Lead Architect",
        bio: "Visionary behind the PAIKE engine and the Liberty core.",
        avatar: "SH"
    },
    {
        name: "Sarah Chen",
        role: "AI Research",
        bio: "Expert in local LLM optimization and semantic orchestration.",
        avatar: "SC"
    },
    {
        name: "Marcus Thorne",
        role: "Lead Engineer",
        bio: "Focused on cross-platform stability and high-performance builds.",
        avatar: "MT"
    }
];

const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Projects Created" },
    { value: "100%", label: "Open Source" },
    { value: "$0", label: "Cost" },
];
