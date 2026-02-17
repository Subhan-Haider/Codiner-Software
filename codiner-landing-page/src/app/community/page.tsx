"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Github, Twitter, MessageSquare, Heart, Globe, MessageCircle, Star, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-24"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic">
                            The <span className="text-gradient">Foundry</span> Community
                        </h1>
                        <p className="text-2xl text-muted-foreground leading-relaxed">
                            Join over 10,000 developers building the future of AI-powered applications.
                            Collaborate, share, and grow together.
                        </p>
                    </motion.div>

                    {/* Community Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                        {[
                            { label: "Contributors", value: "450+", icon: Heart },
                            { label: "GitHub Stars", value: "8.2K", icon: Star },
                            { label: "Discord Members", value: "12K", icon: MessageCircle },
                            { label: "Apps Built", value: "50K+", icon: Globe }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl border border-border bg-card/30 backdrop-blur-xl text-center"
                            >
                                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                                <div className="text-4xl font-black mb-1">{stat.value}</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Channels */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {[
                            {
                                title: "Discord",
                                desc: "Join our active chat room for real-time support and community hangouts.",
                                icon: MessageCircle,
                                color: "bg-[#5865F2]",
                                link: "#",
                                label: "Join Discord"
                            },
                            {
                                title: "GitHub",
                                desc: "Contribute to the core engine, report bugs, or start a discussion.",
                                icon: Github,
                                color: "bg-[#24292e]",
                                link: "https://github.com/Subhan-Haider/Codiner-Software",
                                label: "Star on GitHub"
                            },
                            {
                                title: "Twitter",
                                desc: "Follow us for the latest news, updates, and community showcases.",
                                icon: Twitter,
                                color: "bg-[#1DA1F2]",
                                link: "#",
                                label: "Follow Us"
                            }
                        ].map((channel, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[3rem] border border-border bg-card/30 backdrop-blur-xl hover:scale-105 transition-all shadow-2xl relative overflow-hidden"
                            >
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl", channel.color)}>
                                    <channel.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 italic">{channel.title}</h3>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{channel.desc}</p>
                                <a
                                    href={channel.link}
                                    className="inline-flex items-center gap-2 text-primary font-bold text-lg hover:underline"
                                >
                                    {channel.label} →
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Featured Contributors */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black italic tracking-tight mb-4">Top Foundrymen</h2>
                            <p className="text-muted-foreground text-lg">Recognizing our most active community members</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[
                                { name: "Elias Thorne", role: "Elite Dev", avatar: "https://i.pravatar.cc/150?u=elias" },
                                { name: "Sophie Chen", role: "Core Contributor", avatar: "https://i.pravatar.cc/150?u=sophie" },
                                { name: "Xavier Vance", role: "Bug Hunter", avatar: "https://i.pravatar.cc/150?u=xavier" },
                                { name: "Elena Rossi", role: "Plugin Master", avatar: "https://i.pravatar.cc/150?u=elena" },
                                { name: "David Kim", role: "Elite Dev", avatar: "https://i.pravatar.cc/150?u=david" },
                                { name: "Aria Singh", role: "Community Lead", avatar: "https://i.pravatar.cc/150?u=aria" },
                            ].map((user, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center p-6 rounded-3xl border border-border bg-card/50 hover:border-primary transition-all group"
                                >
                                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border border-primary/30 group-hover:border-primary transition-colors">
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div className="font-bold text-sm tracking-tight">{user.name}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{user.role}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center p-16 rounded-[4rem] bg-linear-to-br from-primary/5 to-blue-600/5 border border-primary/20 shadow-2xl max-w-5xl mx-auto"
                    >
                        <UserPlus className="w-16 h-16 text-primary mx-auto mb-8" />
                        <h2 className="text-5xl font-black italic tracking-tighter mb-8">Ready to Join the Revolution?</h2>
                        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                            Be part of the global community that's redefining the limits of software development.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href="#"
                                className="px-12 py-6 rounded-4xl bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)]"
                            >
                                Join our Discord
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
