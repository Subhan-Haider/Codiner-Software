"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plug, Database, Cloud, Code, Palette, Shield } from "lucide-react";

export default function IntegrationsPage() {
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
                            <span className="text-gradient">Integrations</span> & Extensions
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Connect with your favorite tools and services seamlessly
                        </p>
                    </motion.div>

                    {/* Integration Categories */}
                    {integrationCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.2 }}
                            className="mb-16"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center">
                                    <category.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold">{category.title}</h2>
                                    <p className="text-muted-foreground">{category.description}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.integrations.map((integration, index) => (
                                    <motion.div
                                        key={integration.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: categoryIndex * 0.2 + index * 0.05 }}
                                        className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary transition-all duration-300 group shadow-lg"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-3xl">{integration.logo}</div>
                                            <div>
                                                <h3 className="font-bold">{integration.name}</h3>
                                                {integration.official && (
                                                    <span className="text-xs text-green-600 dark:text-green-400">✓ Official</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {integration.features.map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">Ready to link</span>
                                            <button className="px-4 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-semibold transition-colors">
                                                Connect
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Custom Integration CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-xl border-2 border-primary/50 bg-card/50 backdrop-blur-sm shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4">Need a Custom Integration?</h2>
                        <p className="text-muted-foreground mb-6">
                            Build your own integrations using our API or request support for your favorite tools
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/docs"
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                            >
                                View API Docs
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors font-semibold"
                            >
                                Request Integration
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const integrationCategories = [
    {
        title: "Databases",
        description: "Connect to popular databases with built-in ORMs",
        icon: Database,
        integrations: [
            {
                name: "PostgreSQL",
                logo: "🐘",
                description: "Powerful open-source relational database",
                official: true,
                features: ["Prisma", "TypeORM", "Migrations"],
            },
            {
                name: "MongoDB",
                logo: "🍃",
                description: "Flexible NoSQL document database",
                official: true,
                features: ["Mongoose", "Aggregations", "Atlas"],
            },
            {
                name: "MySQL",
                logo: "🐬",
                description: "Popular open-source relational database",
                official: true,
                features: ["Prisma", "Sequelize", "Migrations"],
            },
            {
                name: "Supabase",
                logo: "⚡",
                description: "Open-source Firebase alternative",
                official: true,
                features: ["Auth", "Storage", "Realtime"],
            },
            {
                name: "Redis",
                logo: "🔴",
                description: "In-memory data structure store",
                official: true,
                features: ["Caching", "Sessions", "Pub/Sub"],
            },
            {
                name: "SQLite",
                logo: "💾",
                description: "Lightweight embedded database",
                official: true,
                features: ["Local", "Fast", "Zero-config"],
            },
        ],
    },
    {
        title: "Cloud Services",
        description: "Integrate with major cloud providers",
        icon: Cloud,
        integrations: [
            {
                name: "AWS",
                logo: "☁️",
                description: "Amazon Web Services integration",
                official: true,
                features: ["S3", "Lambda", "DynamoDB"],
            },
            {
                name: "Google Cloud",
                logo: "🌐",
                description: "Google Cloud Platform services",
                official: true,
                features: ["Storage", "Functions", "Firestore"],
            },
            {
                name: "Azure",
                logo: "🔷",
                description: "Microsoft Azure cloud services",
                official: true,
                features: ["Blob Storage", "Functions", "CosmosDB"],
            },
            {
                name: "Cloudflare",
                logo: "🟠",
                description: "CDN and edge computing platform",
                official: true,
                features: ["Workers", "R2", "KV"],
            },
            {
                name: "Firebase",
                logo: "🔥",
                description: "Google's app development platform",
                official: true,
                features: ["Auth", "Firestore", "Hosting"],
            },
            {
                name: "Vercel",
                logo: "▲",
                description: "Frontend cloud platform",
                official: true,
                features: ["Deployment", "Edge", "Analytics"],
            },
        ],
    },
    {
        title: "Version Control",
        description: "Seamless Git integration and collaboration",
        icon: Code,
        integrations: [
            {
                name: "GitHub",
                logo: "🐙",
                description: "World's leading development platform",
                official: true,
                features: ["Actions", "Issues", "PRs"],
            },
            {
                name: "GitLab",
                logo: "🦊",
                description: "Complete DevOps platform",
                official: true,
                features: ["CI/CD", "Registry", "Issues"],
            },
            {
                name: "Bitbucket",
                logo: "🪣",
                description: "Git solution for teams",
                official: true,
                features: ["Pipelines", "PRs", "Jira"],
            },
        ],
    },
    {
        title: "UI & Design",
        description: "Design tools and component libraries",
        icon: Palette,
        integrations: [
            {
                name: "Figma",
                logo: "🎨",
                description: "Collaborative design tool",
                official: false,
                features: ["Import", "Sync", "Components"],
            },
            {
                name: "Tailwind CSS",
                logo: "💨",
                description: "Utility-first CSS framework",
                official: true,
                features: ["IntelliSense", "JIT", "Plugins"],
            },
            {
                name: "Shadcn UI",
                logo: "🎭",
                description: "Re-usable components",
                official: true,
                features: ["Copy-paste", "Customizable", "Accessible"],
            },
            {
                name: "Framer Motion",
                logo: "🎬",
                description: "Animation library for React",
                official: true,
                features: ["Animations", "Gestures", "Variants"],
            },
        ],
    },
    {
        title: "Authentication",
        description: "Secure authentication providers",
        icon: Shield,
        integrations: [
            {
                name: "Auth0",
                logo: "🔐",
                description: "Universal authentication platform",
                official: true,
                features: ["SSO", "MFA", "Social"],
            },
            {
                name: "Clerk",
                logo: "👤",
                description: "Complete user management",
                official: true,
                features: ["Auth", "User Profiles", "Organizations"],
            },
            {
                name: "NextAuth",
                logo: "🔑",
                description: "Authentication for Next.js",
                official: true,
                features: ["OAuth", "Email", "Credentials"],
            },
            {
                name: "Supabase Auth",
                logo: "⚡",
                description: "Open-source authentication",
                official: true,
                features: ["Email", "Social", "Magic Links"],
            },
        ],
    },
    {
        title: "APIs & Services",
        description: "Third-party API integrations",
        icon: Plug,
        integrations: [
            {
                name: "Stripe",
                logo: "💳",
                description: "Payment processing platform",
                official: true,
                features: ["Payments", "Subscriptions", "Invoices"],
            },
            {
                name: "SendGrid",
                logo: "📧",
                description: "Email delivery service",
                official: true,
                features: ["Transactional", "Marketing", "Templates"],
            },
            {
                name: "Twilio",
                logo: "📱",
                description: "Communications platform",
                official: true,
                features: ["SMS", "Voice", "Video"],
            },
            {
                name: "OpenAI",
                logo: "🤖",
                description: "AI and machine learning APIs",
                official: true,
                features: ["GPT-4", "DALL-E", "Whisper"],
            },
            {
                name: "Algolia",
                logo: "🔍",
                description: "Search and discovery API",
                official: true,
                features: ["Search", "Recommendations", "Analytics"],
            },
            {
                name: "Sentry",
                logo: "🐛",
                description: "Error tracking and monitoring",
                official: true,
                features: ["Error Tracking", "Performance", "Alerts"],
            },
        ],
    },
    {
        title: "Communication",
        description: "Connect with team messaging platforms",
        icon: Plug,
        integrations: [
            {
                name: "Slack",
                logo: "💬",
                description: "Business communication platform",
                official: true,
                features: ["Notifications", "Slash Commands", "Workspaces"],
            },
            {
                name: "Discord",
                logo: "👾",
                description: "Voice, video and text communication service",
                official: true,
                features: ["Webhooks", "Bot integration", "Rich Presence"],
            },
        ],
    },
];
