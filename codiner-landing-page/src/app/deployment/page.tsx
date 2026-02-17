"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cloud, Rocket, Server, Globe, Zap, CheckCircle2, Box, Beaker, FileText, Gauge, Clock } from "lucide-react";

export default function DeploymentPage() {
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
                            One-Click <span className="text-gradient">Deployment</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Deploy your applications to production in seconds
                        </p>
                    </motion.div>

                    {/* Deployment Platforms */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                        {platforms.map((platform, index) => (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 group shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <platform.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{platform.name}</h3>
                                        {platform.recommended && (
                                            <span className="text-xs text-green-400">Recommended</span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-muted-foreground text-sm mb-4">{platform.description}</p>

                                <div className="space-y-2 mb-4">
                                    {platform.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-border">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Deploy time:</span>
                                        <span className="text-primary font-semibold">{platform.deployTime}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Deployment Process */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-16"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">Deployment Process</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {deploymentSteps.map((step, index) => (
                                <div key={step.title} className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                                        {index + 1}
                                    </div>
                                    <h3 className="font-semibold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Global Infrastructure Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 p-16 rounded-[4rem] bg-gradient-to-br from-primary/5 to-blue-600/5 border border-primary/20 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)]" />
                        </div>

                        <div className="relative z-10 text-center">
                            <Globe className="w-16 h-16 text-primary mx-auto mb-8 animate-pulse" />
                            <h2 className="text-5xl font-black italic tracking-tighter mb-8 lowercase">Global <span className="text-gradient">Edge</span> Network</h2>
                            <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                                Your applications are instantly replicated across 300+ global edge locations.
                                Deliver blazing-fast performance to users in every corner of the world.
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {[
                                    { label: "PoPs", value: "300+" },
                                    { label: "Uptime", value: "99.99%" },
                                    { label: "Latency", value: "<20ms" },
                                    { label: "Bandwidth", value: "Unlimited" }
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="text-4xl font-black text-primary italic">{stat.value}</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Advanced Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto mt-32"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">Advanced Deployment Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {advancedFeatures.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const platforms = [
    {
        name: "Vercel",
        icon: Rocket,
        description: "Optimized for Next.js and React applications with edge functions",
        recommended: true,
        features: [
            "Automatic HTTPS",
            "Global CDN",
            "Preview deployments",
            "Zero-config setup",
        ],
        deployTime: "~30 seconds",
    },
    {
        name: "Netlify",
        icon: Globe,
        description: "Perfect for static sites and JAMstack applications",
        recommended: true,
        features: [
            "Continuous deployment",
            "Form handling",
            "Serverless functions",
            "Split testing",
        ],
        deployTime: "~45 seconds",
    },
    {
        name: "AWS",
        icon: Cloud,
        description: "Enterprise-grade cloud infrastructure with full control",
        recommended: false,
        features: [
            "S3 + CloudFront",
            "Lambda functions",
            "Custom domains",
            "Auto-scaling",
        ],
        deployTime: "~2 minutes",
    },
    {
        name: "Railway",
        icon: Server,
        description: "Deploy full-stack apps with databases and services",
        recommended: false,
        features: [
            "Database hosting",
            "Docker support",
            "Auto-deploy on push",
            "Environment variables",
        ],
        deployTime: "~1 minute",
    },
    {
        name: "Render",
        icon: Zap,
        description: "Unified platform for web services, databases, and cron jobs",
        recommended: false,
        features: [
            "Free SSL",
            "PostgreSQL hosting",
            "Background workers",
            "Auto-deploy",
        ],
        deployTime: "~1 minute",
    },
    {
        name: "DigitalOcean",
        icon: Server,
        description: "Simple cloud hosting with app platform and droplets",
        recommended: false,
        features: [
            "App Platform",
            "Managed databases",
            "Load balancing",
            "Monitoring",
        ],
        deployTime: "~2 minutes",
    },
];

const deploymentSteps = [
    {
        title: "Configure",
        description: "Select your deployment platform and configure settings",
    },
    {
        title: "Build",
        description: "Codiner optimizes and builds your application",
    },
    {
        title: "Deploy",
        description: "Your app is deployed to the selected platform",
    },
    {
        title: "Live",
        description: "Get your production URL and monitor performance",
    },
];

const advancedFeatures = [
    {
        icon: Globe,
        title: "Custom Domains",
        description: "Connect your own domain with automatic SSL certificate provisioning",
    },
    {
        icon: Zap,
        title: "Environment Variables",
        description: "Manage environment-specific configurations securely",
    },
    {
        icon: Server,
        title: "Preview Deployments",
        description: "Every pull request gets its own preview URL for testing",
    },
    {
        icon: Rocket,
        title: "Rollback Support",
        description: "Instantly rollback to previous deployments if issues arise",
    },
    {
        icon: Cloud,
        title: "CI/CD Integration",
        description: "Automatic deployments on git push with GitHub Actions",
    },
    {
        icon: CheckCircle2,
        title: "Health Monitoring",
        description: "Real-time monitoring and alerts for your deployed applications",
    },
    {
        icon: Box,
        title: "Docker Containerization",
        description: "Automated Dockerfile generation for consistent deployments across any infrastructure",
    },
    {
        icon: Beaker,
        title: "Automated Testing Suite",
        description: "Run unit, integration, and End-to-End tests directly from your dashboard",
    },
    {
        icon: FileText,
        title: "API Documentation Hub",
        description: "Automated generation of Swagger/OpenAPI docs for your application backend",
    },
    {
        icon: Gauge,
        title: "Performance Monitoring",
        description: "Monitor Core Web Vitals, page speeds, and bundle sizes with one-click health checks",
    },
    {
        icon: Clock,
        title: "Cron Jobs & Automation",
        description: "Schedule background tasks and automation scripts with built-in job management",
    },
];
