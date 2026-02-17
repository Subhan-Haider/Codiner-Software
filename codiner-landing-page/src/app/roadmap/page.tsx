"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export default function RoadmapPage() {
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
                            Product <span className="text-gradient">Roadmap</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            See what we're building and what's coming next for Codiner
                        </p>
                    </motion.div>

                    {/* Roadmap Timeline */}
                    <div className="max-w-4xl mx-auto space-y-12">
                        {roadmapItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline Line */}
                                {index < roadmapItems.length - 1 && (
                                    <div className="absolute left-6 top-16 w-0.5 h-full bg-border" />
                                )}

                                <div className="flex gap-6">
                                    {/* Status Icon */}
                                    <div className="shrink-0">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center ${item.status === "completed"
                                                ? "bg-green-600/10 border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                                : item.status === "in-progress"
                                                    ? "bg-blue-600/10 border-2 border-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                                    : "bg-muted border-2 border-border"
                                                }`}
                                        >
                                            {item.status === "completed" ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            ) : item.status === "in-progress" ? (
                                                <Clock className="w-6 h-6 text-primary animate-pulse" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-12">
                                        <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-lg">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "completed"
                                                        ? "bg-green-600/10 text-green-600 border border-green-500/30"
                                                        : item.status === "in-progress"
                                                            ? "bg-blue-600/10 text-primary border border-primary/30"
                                                            : "bg-muted text-muted-foreground border border-border"
                                                        }`}
                                                >
                                                    {item.status === "completed"
                                                        ? "✓ Completed"
                                                        : item.status === "in-progress"
                                                            ? "⚡ In Progress"
                                                            : "📅 Planned"}
                                                </span>
                                            </div>

                                            <p className="text-muted-foreground mb-4">{item.description}</p>

                                            {item.quarter && (
                                                <div className="text-sm text-primary mb-4">
                                                    Target: {item.quarter}
                                                </div>
                                            )}

                                            <ul className="space-y-2">
                                                {item.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feedback CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-xl border-2 border-primary/50 bg-card/50 backdrop-blur-sm shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">Have a Feature Request?</h2>
                        <p className="text-muted-foreground mb-6">
                            We'd love to hear your ideas! Share your feature requests and vote on what
                            matters most to you.
                        </p>
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                        >
                            Request a Feature
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const roadmapItems = [
    {
        title: "v0.32.0 - AI Revolution",
        status: "completed" as const,
        quarter: "Q1 2026",
        description: "Major AI enhancements and UI redesign",
        features: [
            "Enhanced AI code generation with GPT-4 support",
            "Visual component editor with drag-and-drop",
            "Real-time collaboration features",
            "Built-in database schema designer",
            "Advanced debugging tools with AI suggestions",
        ],
    },
    {
        title: "v0.33.0 - Cross-Platform Support",
        status: "in-progress" as const,
        quarter: "Q2 2026",
        description: "Bringing Codiner to macOS and Linux",
        features: [
            "macOS native application (Apple Silicon + Intel)",
            "Linux support (Debian, Ubuntu, Fedora)",
            "Cross-platform settings sync",
            "Universal keyboard shortcuts",
            "Platform-specific optimizations",
        ],
    },
    {
        title: "v0.34.0 - Team Collaboration",
        status: "planned" as const,
        quarter: "Q2 2026",
        description: "Built for teams and collaborative development",
        features: [
            "Real-time code collaboration",
            "Team workspaces and project sharing",
            "Built-in code review tools",
            "Team chat and notifications",
            "Shared component libraries",
        ],
    },
    {
        title: "v0.35.0 - Mobile Development",
        status: "planned" as const,
        quarter: "Q3 2026",
        description: "Build mobile apps with React Native",
        features: [
            "React Native project templates",
            "Mobile device preview and testing",
            "iOS and Android build support",
            "Mobile-specific AI suggestions",
            "App store deployment integration",
        ],
    },
    {
        title: "v0.36.0 - Plugin Ecosystem",
        status: "planned" as const,
        quarter: "Q3 2026",
        description: "Extend Codiner with custom plugins",
        features: [
            "Plugin API and SDK",
            "Plugin marketplace",
            "Custom AI model integration",
            "Theme and UI customization",
            "Third-party service integrations",
        ],
    },
    {
        title: "v0.37.0 - Advanced AI Features",
        status: "planned" as const,
        quarter: "Q4 2026",
        description: "Next-generation AI capabilities",
        features: [
            "AI-powered code refactoring",
            "Automatic bug detection and fixes",
            "Performance optimization suggestions",
            "Security vulnerability scanning",
            "Natural language to full app generation",
        ],
    },
    {
        title: "v1.0.0 - Stable Release",
        status: "planned" as const,
        quarter: "Q4 2026",
        description: "Production-ready stable release",
        features: [
            "Complete feature set stabilization",
            "Comprehensive documentation",
            "Enterprise support options",
            "Long-term support (LTS) commitment",
            "Performance and security hardening",
        ],
    },
];
