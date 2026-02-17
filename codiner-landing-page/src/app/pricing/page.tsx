"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
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
                            Simple, <span className="text-gradient">Transparent Pricing</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Codiner is completely free and open-source. Forever.
                        </p>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={cn(
                                "p-8 rounded-xl border border-border",
                                "bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                            )}
                        >
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <p className="text-muted-foreground mb-6">For individuals and hobbyists</p>
                            <div className="mb-8">
                                <span className="text-5xl font-bold">$0</span>
                                <span className="text-muted-foreground">/forever</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Unlimited projects</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">AI code generation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Local-first</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Community support</span>
                                </li>
                            </ul>
                            <a
                                href="/download"
                                className="w-full block text-center px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors font-semibold"
                            >
                                Get Started
                            </a>
                        </motion.div>

                        {/* Pro (Highlighted) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "p-8 rounded-xl border-2 border-primary shadow-2xl scale-105 z-10",
                                "bg-card/50 backdrop-blur-sm",
                                "relative"
                            )}
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold">
                                Most Popular
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-muted-foreground mb-6">For professional developers</p>
                            <div className="mb-8">
                                <span className="text-5xl font-bold">$0</span>
                                <span className="text-muted-foreground">/forever</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Everything in Free</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Advanced AI features</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Priority support</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Team collaboration</span>
                                </li>
                            </ul>
                            <a
                                href="/download"
                                className={cn(
                                    "w-full block text-center px-6 py-3 rounded-lg font-semibold",
                                    "bg-linear-to-r from-purple-600 to-blue-600",
                                    "hover:from-purple-500 hover:to-blue-500",
                                    "transition-all duration-200"
                                )}
                            >
                                Get Started
                            </a>
                        </motion.div>

                        {/* Enterprise */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={cn(
                                "p-8 rounded-xl border border-border",
                                "bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                            )}
                        >
                            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                            <p className="text-muted-foreground mb-6">For large organizations</p>
                            <div className="mb-8">
                                <span className="text-5xl font-bold">$0</span>
                                <span className="text-muted-foreground">/forever</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Everything in Pro</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Self-hosted option</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Custom integrations</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                                    <span className="text-muted-foreground">Dedicated support</span>
                                </li>
                            </ul>
                            <a
                                href="/contact"
                                className="w-full block text-center px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors font-semibold"
                            >
                                Contact Us
                            </a>
                        </motion.div>
                    </div>

                    {/* Comparison Table */}
                    <div className="mt-32 overflow-hidden rounded-3xl border border-border bg-card/30 backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted-card/50">
                                        <th className="p-8 text-xl font-bold">Feature</th>
                                        <th className="p-8 text-xl font-bold">Free</th>
                                        <th className="p-8 text-xl font-bold">Pro</th>
                                        <th className="p-8 text-xl font-bold">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { f: "Unlimited Projects", free: true, pro: true, ent: true },
                                        { f: "Local AI Execution", free: true, pro: true, ent: true },
                                        { f: "AST Code Analysis", free: true, pro: true, ent: true },
                                        { f: "Cloud Sync", free: false, pro: true, ent: true },
                                        { f: "Team Collaboration", free: false, pro: true, ent: true },
                                        { f: "Admin Dashboard", free: false, pro: false, ent: true },
                                        { f: "Custom Domain Support", free: true, pro: true, ent: true },
                                        { f: "SLA Support", free: false, pro: false, ent: true }
                                    ].map((row, i) => (
                                        <tr key={i} className="border-t border-border hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-medium">{row.f}</td>
                                            <td className="p-6">{row.free ? <Check className="text-green-500" /> : "-"}</td>
                                            <td className="p-6">{row.pro ? <Check className="text-green-500" /> : "-"}</td>
                                            <td className="p-6">{row.ent ? <Check className="text-green-500" /> : "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Why Free Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center max-w-4xl mx-auto p-16 rounded-4xl bg-linear-to-br from-primary/5 to-blue-600/5 border border-primary/20 shadow-2xl"
                    >
                        <h2 className="text-4xl font-bold mb-8 italic tracking-tight">Why is Codiner Free?</h2>
                        <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                            We believe that powerful development tools should be accessible to everyone.
                            Codiner is open-source and community-driven, funded by contributions from
                            developers like you. No hidden costs, no subscriptions, no limits.
                        </p>
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-4xl bg-primary text-primary-foreground font-black text-lg hover:scale-105 transition-transform"
                        >
                            Become a Sponsor
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
