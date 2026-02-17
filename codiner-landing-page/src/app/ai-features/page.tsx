"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Sparkles, Wand2, MessageSquare, Code2, Lightbulb, Activity, ShieldCheck, Microscope, Box, Lock, Zap } from "lucide-react";

export default function AIFeaturesPage() {
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
                            AI-Powered <span className="text-gradient">Development</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Build applications faster with cutting-edge AI assistance
                        </p>
                    </motion.div>

                    {/* AI Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                        {aiFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 group shadow-lg"
                            >
                                <div className="w-16 h-16 rounded-lg bg-linear-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground mb-6">{feature.description}</p>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
                                        Capabilities
                                    </h4>
                                    <ul className="space-y-2">
                                        {feature.capabilities.map((capability, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{capability}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Models Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">Supported AI Models</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {aiModels.map((model, index) => (
                                <motion.div
                                    key={model.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm text-center"
                                >
                                    <div className="text-4xl mb-3">{model.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{model.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-3">{model.provider}</p>
                                    <div className="flex items-center justify-center gap-2">
                                        {model.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* How It Works */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-bold mb-8">The Local-First Revolution</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                                "We believe the future of development is private. That's why Codiner natively supports local inference through Ollama."
                            </p>
                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all">
                                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                                        <Box className="w-5 h-5 text-primary" />
                                        Ollama Orchestration
                                    </h4>
                                    <p className="text-muted-foreground">Automatically detect and manage local models like Llama 3, DeepSeek, and Mistral without manual config.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all">
                                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-primary" />
                                        Private Logic Layer
                                    </h4>
                                    <p className="text-muted-foreground">Your source code never leaves your workstation. AI analysis happens entirely in RAM/VRAM.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-all">
                                    <h4 className="text-xl font-bold mb-2 flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-primary" />
                                        Hardware Acceleration
                                    </h4>
                                    <p className="text-muted-foreground">Optimized for NVIDIA CUDA, Apple Silicon (Metal), and AMD ROCm for peak local performance.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-4xl bg-linear-to-br from-primary/5 to-blue-600/5 border border-primary/20 shadow-2xl flex flex-col justify-center"
                        >
                            <h3 className="text-2xl font-black italic mb-6 tracking-tight uppercase">AI Assistance Workflow</h3>
                            <div className="space-y-6">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        className="flex gap-6 p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm group hover:bg-card transition-colors"
                                    >
                                        <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                                            <p className="text-sm text-gray-400">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const aiFeatures = [
    {
        icon: Brain,
        title: "Natural Language to Code",
        description: "Describe what you want to build in plain English, and AI generates the code",
        capabilities: [
            "Generate complete components from descriptions",
            "Create API endpoints and database schemas",
            "Build entire pages with routing and logic",
            "Understand context from your existing codebase",
        ],
    },
    {
        icon: Sparkles,
        title: "Intelligent Code Completion",
        description: "AI-powered suggestions that understand your intent and coding style",
        capabilities: [
            "Context-aware code suggestions",
            "Multi-line completions",
            "Import statement auto-generation",
            "Type-safe completions for TypeScript",
        ],
    },
    {
        icon: Wand2,
        title: "Automatic Refactoring",
        description: "Let AI improve your code quality and performance automatically",
        capabilities: [
            "Extract functions and components",
            "Optimize performance bottlenecks",
            "Apply best practices and patterns",
            "Convert between frameworks and libraries",
        ],
    },
    {
        icon: MessageSquare,
        title: "AI Chat Assistant",
        description: "Ask questions and get instant answers about your code",
        capabilities: [
            "Explain complex code sections",
            "Debug errors and suggest fixes",
            "Provide documentation and examples",
            "Answer technical questions in real-time",
        ],
    },
    {
        icon: Code2,
        title: "Smart Bug Detection",
        description: "AI identifies potential bugs before they become problems",
        capabilities: [
            "Detect logic errors and edge cases",
            "Find security vulnerabilities",
            "Identify performance issues",
            "Suggest preventive solutions",
        ],
    },
    {
        icon: Lightbulb,
        title: "Code Optimization",
        description: "AI analyzes and optimizes your code for better performance",
        capabilities: [
            "Reduce bundle sizes automatically",
            "Optimize database queries",
            "Improve rendering performance",
            "Suggest caching strategies",
        ],
    },
    {
        icon: Activity,
        title: "Neural Pulse Monitor",
        description: "Real-time health monitoring of your AI connectivity and performance",
        capabilities: [
            "Track real-time response latency (ms)",
            "Visual status indicators for all AI nodes",
            "Auto-detection of model capabilities",
            "Persistent connectivity history",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Auto-Verification Protocol",
        description: "Self-healing connection management that ensures zero downtime",
        capabilities: [
            "Automated background connection health tests",
            "Smart triggers on configuration changes",
            "Plain-English diagnostic reports",
            "Actionable guidance for API issues",
        ],
    },
    {
        icon: Microscope,
        title: "AI Model Optimization",
        description: "Fine-tune AI performance on a per-project basis",
        capabilities: [
            "Select specific models for different tasks",
            "Project-specific default model persistence",
            "Context-window optimization",
            "Hardware-accelerated local inference",
        ],
    },
];

const aiModels = [
    {
        name: "GPT-4",
        provider: "OpenAI",
        icon: "🤖",
        features: ["Code", "Chat"],
    },
    {
        name: "Claude 3",
        provider: "Anthropic",
        icon: "🧠",
        features: ["Code", "Analysis"],
    },
    {
        name: "Gemini Pro",
        provider: "Google",
        icon: "✨",
        features: ["Code", "Multi-modal"],
    },
    {
        name: "Llama 3",
        provider: "Meta (Local)",
        icon: "🦙",
        features: ["Local", "Fast"],
    },
    {
        name: "CodeLlama",
        provider: "Meta (Local)",
        icon: "💻",
        features: ["Code", "Local"],
    },
    {
        name: "Qwen 2.5",
        provider: "Alibaba (Local)",
        icon: "⚡",
        features: ["Code", "Fast"],
    },
    {
        name: "DeepSeek V3",
        provider: "DeepSeek (Local/Cloud)",
        icon: "🐳",
        features: ["Code", "Logic"],
    },
    {
        name: "Mistral Large",
        provider: "Mistral AI",
        icon: "🌪️",
        features: ["Code", "Chat"],
    },
    {
        name: "Gemma 2",
        provider: "Google (Local)",
        icon: "💎",
        features: ["Local", "Fast"],
    },
];

const steps = [
    {
        title: "Describe Your Intent",
        description:
            "Type what you want to build in natural language. Be as detailed or high-level as you like.",
    },
    {
        title: "AI Analyzes Context",
        description:
            "The AI understands your project structure, dependencies, and coding patterns to provide relevant suggestions.",
    },
    {
        title: "Code Generation",
        description:
            "AI generates production-ready code that follows best practices and integrates seamlessly with your project.",
    },
    {
        title: "Review & Refine",
        description:
            "Review the generated code, make adjustments, and ask the AI to refine specific parts as needed.",
    },
];
