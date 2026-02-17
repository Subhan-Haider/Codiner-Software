"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Zap, Rocket, Database, Layout, Smartphone } from "lucide-react";
import Link from "next/link";

export default function TemplatesPage() {
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
                            Project <span className="text-gradient">Templates</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Start building faster with our pre-configured project templates
                        </p>
                    </motion.div>

                    {/* Trending Section */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-black italic mb-8 tracking-tighter uppercase text-center md:text-left">Trending <span className="text-gradient">Today</span></h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    name: "Next.js AI Chatbot",
                                    desc: "A fully functional AI chatbot with streaming responses, integrated with PAIKE and Vercel AI SDK.",
                                    img: "🤖",
                                    stats: "Daily: 1.2K installs"
                                },
                                {
                                    name: "Solaris Dashboard",
                                    desc: "High-performance data visualization dashboard for real-time analytics and neural monitoring.",
                                    img: "☀️",
                                    stats: "Daily: 850 installs"
                                }
                            ].map((trending, i) => (
                                <a
                                    key={i}
                                    href="https://github.com/Subhan-Haider/Codiner-Template"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/20 flex gap-8 items-center group cursor-pointer hover:border-primary transition-all shadow-2xl h-full"
                                    >
                                        <div className="text-6xl group-hover:scale-110 transition-transform">{trending.img}</div>
                                        <div>
                                            <h3 className="text-2xl font-black italic mb-2 tracking-tight">{trending.name}</h3>
                                            <p className="text-muted-foreground font-medium mb-4">{trending.desc}</p>
                                            <div className="text-xs font-black uppercase tracking-widest text-primary">{trending.stats}</div>
                                        </div>
                                    </motion.div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Template Categories */}
                    <div className="mb-12">
                        <div className="flex flex-wrap gap-4 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className="px-6 py-3 rounded-2xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold bg-card/50 backdrop-blur-sm shadow-lg"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {templates.map((template, index) => (
                            <motion.div
                                key={template.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 shadow-lg"
                            >
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <template.icon className="w-8 h-8 text-primary" />
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className="text-xl font-bold">{template.name}</h3>
                                    {template.popular && (
                                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <p className="text-muted-foreground text-sm mb-4">{template.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{template.downloads} downloads</span>
                                    <a
                                        href="https://github.com/Subhan-Haider/Codiner-Template"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary transition-colors font-semibold"
                                    >
                                        Use Template →
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Custom Template CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-xl border-2 border-primary/50 bg-card/50 backdrop-blur-sm shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">Need a Custom Template?</h2>
                        <p className="text-muted-foreground mb-6">
                            Use AI to generate a custom template tailored to your specific needs. Just
                            describe what you want to build!
                        </p>
                        <Link
                            href="/download"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                        >
                            Get Started with AI
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const categories = [
    "All Templates",
    "Web Apps",
    "APIs",
    "Full Stack",
    "E-commerce",
    "Dashboards",
    "Landing Pages",
    "Mobile",
];

const templates = [
    {
        name: "Next.js Starter",
        description: "Full-stack Next.js app with TypeScript, Tailwind, and authentication",
        icon: Rocket,
        tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
        downloads: "12.5K",
        popular: true,
    },
    {
        name: "React Dashboard",
        description: "Admin dashboard with charts, tables, and data visualization",
        icon: Layout,
        tech: ["React", "TypeScript", "Chart.js", "TailwindCSS"],
        downloads: "8.3K",
        popular: true,
    },
    {
        name: "REST API",
        description: "Express.js REST API with authentication and database",
        icon: Database,
        tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
        downloads: "6.7K",
        popular: false,
    },
    {
        name: "E-commerce Store",
        description: "Full e-commerce solution with cart, checkout, and payments",
        icon: Code,
        tech: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
        downloads: "9.2K",
        popular: true,
    },
    {
        name: "Landing Page",
        description: "Modern landing page with animations and contact form",
        icon: Zap,
        tech: ["React", "Framer Motion", "TailwindCSS"],
        downloads: "15.1K",
        popular: true,
    },
    {
        name: "Mobile App",
        description: "React Native app with navigation and state management",
        icon: Smartphone,
        tech: ["React Native", "TypeScript", "Expo"],
        downloads: "4.8K",
        popular: false,
    },
    {
        name: "Blog Platform",
        description: "Full-featured blog with CMS, comments, and SEO",
        icon: Code,
        tech: ["Next.js", "MDX", "Contentful", "TailwindCSS"],
        downloads: "7.4K",
        popular: false,
    },
    {
        name: "SaaS Starter",
        description: "Complete SaaS template with subscriptions and billing",
        icon: Rocket,
        tech: ["Next.js", "Stripe", "Supabase", "TailwindCSS"],
        downloads: "11.2K",
        popular: true,
    },
    {
        name: "Portfolio Site",
        description: "Personal portfolio with projects showcase and contact",
        icon: Layout,
        tech: ["Next.js", "Framer Motion", "TailwindCSS"],
        downloads: "13.6K",
        popular: true,
    },
];
