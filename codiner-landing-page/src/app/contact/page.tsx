"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Globe, Send, ShieldCheck, Zap, Github, Twitter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground leading-relaxed">
                            Have questions about our enterprise solutions, security protocols, or contribution guidelines? We're here to help.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-10 md:p-12 rounded-[3.5rem] bg-card/30 border border-border backdrop-blur-xl shadow-2xl"
                        >
                            <form className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full bg-background/50 border border-border rounded-2xl p-4 focus:border-primary outline-none transition-all"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-background/50 border border-border rounded-2xl p-4 focus:border-primary outline-none transition-all"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Subject</label>
                                    <select
                                        className="w-full bg-background/50 border border-border rounded-2xl p-4 focus:border-primary outline-none transition-all appearance-none"
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    >
                                        <option>General Inquiry</option>
                                        <option>Enterprise Support</option>
                                        <option>Partnerships</option>
                                        <option>Security Reports</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="How can we help you?"
                                        className="w-full bg-background/50 border border-border rounded-2xl p-4 focus:border-primary outline-none transition-all resize-none"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    />
                                </div>

                                <button
                                    className="w-full py-6 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)] flex items-center justify-center gap-3"
                                >
                                    <Send className="w-6 h-6" />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col justify-center space-y-16"
                        >
                            <div className="space-y-12">
                                {[
                                    {
                                        icon: Mail,
                                        title: "Email Us",
                                        value: "support@codiner.online",
                                        desc: "Direct support for high-priority inquiries"
                                    },
                                    {
                                        icon: MessageSquare,
                                        title: "Community Chat",
                                        value: "Discord / Slack",
                                        desc: "Real-time developer collaboration"
                                    },
                                    {
                                        icon: Globe,
                                        title: "Open Source",
                                        value: "GitHub Issues",
                                        desc: "Public feature requests and bug reports"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <item.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black italic mb-1">{item.title}</h3>
                                            <div className="text-xl font-bold text-primary mb-1">{item.value}</div>
                                            <p className="text-muted-foreground font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-12 border-t border-border space-y-8">
                                <h3 className="text-2xl font-black italic">Connect Socially</h3>
                                <div className="flex gap-6">
                                    {[
                                        { icon: Github, link: "https://github.com/Subhan-Haider/Codiner-Software" },
                                        { icon: Twitter, link: "#" },
                                        { icon: Globe, link: "#" }
                                    ].map((social, i) => (
                                        <a key={i} href={social.link} target="_blank" className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-border hover:border-primary hover:text-primary flex items-center justify-center transition-all bg-card/30">
                                            <social.icon className="w-8 h-8" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
