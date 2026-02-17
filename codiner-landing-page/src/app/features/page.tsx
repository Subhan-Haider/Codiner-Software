"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Sparkles,
    Zap,
    Code2,
    Shield,
    Database,
    Rocket,
    Cpu,
    GitBranch,
    Terminal,
    Layers,
    Cloud,
    Lock,
    CreditCard,
    Languages,
    Search,
    Split,
    Users,
    Bug,
    BarChart3,
    Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                {/* Animated background highlights */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
                </div>

                <div className="container mx-auto px-6 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto mb-32"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic lowercase">
                            Built for the <span className="text-gradient">Next Era</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed lowercase tracking-tight">
                            Everything you need to build, deploy, and scale applications with AI. No compromises.
                        </p>
                    </motion.div>

                    {/* Featured Sections */}
                    <div className="space-y-40">
                        {/* Core Features */}
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-[0.2em]">
                                    Foundry Core
                                </div>
                                <h2 className="text-5xl font-black italic tracking-tighter lowercase">The power of <span className="text-gradient">PAIKE</span></h2>
                                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                    Our proprietary AI engine doesn't just suggest code - it architects entire systems. Experience sub-second generations that understand your project dependencies.
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-8">
                                    <div>
                                        <div className="text-3xl font-black text-primary mb-2">0.4s</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Generation Latency</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-primary mb-2">100%</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Local Execution</div>
                                    </div>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative aspect-square max-w-lg mx-auto bg-card/30 border border-border rounded-[3rem] backdrop-blur-3xl p-12 flex items-center justify-center shadow-3xl"
                            >
                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full animate-pulse" />
                                <Cpu className="w-32 h-32 text-primary animate-pulse" />
                                {/* Floating Orbs */}
                                <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-blue-500 animate-bounce" />
                                <div className="absolute bottom-20 left-10 w-6 h-6 rounded-full bg-purple-500 animate-bounce delay-300" />
                            </motion.div>
                        </div>

                        {/* Feature Grid Section */}
                        <div className="space-y-16">
                            <div className="text-center">
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter lowercase mb-4">Complete <span className="text-gradient">Capabilities</span></h2>
                                <p className="text-xl text-muted-foreground italic lowercase tracking-tight">Every tool in the foundry, at your disposal.</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className={cn(
                                            "p-10 rounded-[2.5rem] border border-border/50 bg-card/20 backdrop-blur-xl",
                                            "hover:border-primary/50 transition-all duration-500 shadow-2xl relative overflow-hidden group"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                            <feature.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-black italic tracking-tighter lowercase mb-4">{feature.title}</h3>
                                        <p className="text-muted-foreground font-medium mb-8 leading-relaxed line-clamp-2">
                                            {feature.description}
                                        </p>
                                        <ul className="space-y-3 relative z-10">
                                            {feature.points.map((point, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-bold">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-background border-t border-border overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <Rocket className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 lowercase">Experience the <span className="text-gradient">Foundry</span></h2>
                        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed italic lowercase tracking-tight">
                            Join the revolution of local-first, AI-native development.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="/download"
                                className="px-12 py-6 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)]"
                            >
                                Download Now
                            </a>
                            <a
                                href="/docs"
                                className="px-12 py-6 rounded-[2rem] border border-border bg-card/50 backdrop-blur-xl font-black text-xl hover:border-primary/50 transition-all italic text-foreground"
                            >
                                View Docs
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Code Generation",
        description: "Generate full-stack applications using natural language prompts",
        points: [
            "Natural language to code",
            "Context-aware suggestions",
            "Multi-file generation",
            "Smart refactoring",
        ],
    },
    {
        icon: Zap,
        title: "Lightning Fast Performance",
        description: "Optimized for speed with instant hot reload and efficient builds",
        points: [
            "Sub-second hot reload",
            "Incremental compilation",
            "Optimized bundle sizes",
            "Lazy loading support",
        ],
    },
    {
        icon: Code2,
        title: "Full TypeScript Support",
        description: "Type-safe development with complete IntelliSense and error checking",
        points: [
            "Full type inference",
            "Auto-completion",
            "Real-time error detection",
            "Refactoring tools",
        ],
    },
    {
        icon: Shield,
        title: "Built-in Security",
        description: "Enterprise-grade security features built into every project",
        points: [
            "Automatic vulnerability scanning",
            "Secure by default",
            "OWASP compliance",
            "Dependency auditing",
        ],
    },
    {
        icon: Database,
        title: "Database Integration",
        description: "Seamless integration with popular databases and ORMs",
        points: [
            "PostgreSQL, MySQL, MongoDB",
            "Prisma & Drizzle ORM",
            "Migration management",
            "Query optimization",
        ],
    },
    {
        icon: Rocket,
        title: "One-Click Deployment",
        description: "Deploy to popular platforms with a single command",
        points: [
            "Vercel, Netlify, AWS",
            "Docker support",
            "CI/CD integration",
            "Environment management",
        ],
    },
    {
        icon: Cpu,
        title: "Local-First Architecture",
        description: "All processing happens on your machine - no cloud required",
        points: [
            "Complete privacy",
            "Offline capable",
            "No data tracking",
            "Full control",
        ],
    },
    {
        icon: GitBranch,
        title: "Version Control",
        description: "Built-in Git integration for seamless version management",
        points: [
            "Auto-commit on save",
            "Branch management",
            "Conflict resolution",
            "History tracking",
        ],
    },
    {
        icon: Terminal,
        title: "Integrated Terminal",
        description: "Powerful terminal with command history and autocomplete",
        points: [
            "Multi-terminal support",
            "Command history",
            "Custom shortcuts",
            "Script execution",
        ],
    },
    {
        icon: Layers,
        title: "Component Library",
        description: "Pre-built components and templates to accelerate development",
        points: [
            "100+ UI components",
            "Customizable themes",
            "Responsive design",
            "Accessibility built-in",
        ],
    },
    {
        icon: Cloud,
        title: "API Integration",
        description: "Connect to any API with built-in request management",
        points: [
            "REST & GraphQL",
            "Authentication flows",
            "Request caching",
            "Error handling",
        ],
    },
    {
        icon: Lock,
        title: "Environment Management",
        description: "Secure environment variable management across all environments",
        points: [
            "Encrypted storage",
            "Per-environment configs",
            "Secret rotation",
            "Team sharing",
        ],
    },
    {
        icon: CreditCard,
        title: "Stripe Payments",
        description: "Instant setup for checkouts, subscriptions, and billing in your apps",
        points: [
            "Ready-to-use checkout flows",
            "Subscription management",
            "Secure payment processing",
            "Automated billing setup",
        ],
    },
    {
        icon: Languages,
        title: "i18n Localization",
        description: "Manage multi-language support and translations with ease",
        points: [
            "Auto-language detection",
            "Translation management",
            "Dynamic RTL support",
            "Cultural formatting",
        ],
    },
    {
        icon: Search,
        title: "SEO Engine",
        description: "Optimize your web visibility with built-in SEO tools",
        points: [
            "Meta tag management",
            "Sitemap auto-generation",
            "Search ranking monitor",
            "Social preview control",
        ],
    },
    {
        icon: Split,
        title: "A/B Testing",
        description: "Run split experiments to optimize user engagement and conversion",
        points: [
            "Simple cohort creation",
            "Real-time result tracking",
            "Traffic allocation control",
            "Conversion analytics",
        ],
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Shared access and role management for development teams",
        points: [
            "Multi-user workspaces",
            "Granular permission roles",
            "Audit logs & history",
            "Real-time pair sessions",
        ],
    },
    {
        icon: Bug,
        title: "Error Tracking",
        description: "One-click integration with crash monitoring and error logs",
        points: [
            "Sentry & LogRocket sync",
            "Crash stack traces",
            "User session recording",
            "Instant alert system",
        ],
    },
    {
        icon: BarChart3,
        title: "Usage Analytics",
        description: "Deep insights into application usage and neural token metrics",
        points: [
            "Token consumption charts",
            "User activity heatmap",
            "Build time analytics",
            "Cost projections",
        ],
    },
    {
        icon: Smartphone,
        title: "PWA & Mobile Appearance",
        description: "Optimize your app for mobile and progressive web experiences",
        points: [
            "One-click PWA manifest",
            "Custom app icons & splashes",
            "Mobile theme management",
            "Offline-first strategies",
        ],
    },
];
