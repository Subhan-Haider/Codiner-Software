"use client";

import { motion } from "framer-motion";
import { Download, Github, Sparkles, Zap, Code2, Rocket, Shield, Lock, EyeOff, Terminal, Cpu, MessageSquare, ChevronDown, Globe, Layers, Monitor, HardDrive, Layout, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background highlights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-inner"
              >
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold tracking-wide uppercase text-primary">The AI Code Foundry is here</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter"
              >
                Build Apps with <br />
                <span className="text-gradient drop-shadow-sm">Pure AI Power</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-medium whitespace-pre-wrap"
              >
                The world's first local-first AI development engine.
                Build production-grade apps without ever leaving your machine.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
              >
                <a
                  href="/download"
                  className={cn(
                    "group relative px-10 py-5 rounded-[2rem] font-black text-lg",
                    "bg-primary text-primary-foreground",
                    "transform hover:scale-105 transition-all duration-300",
                    "shadow-[0_0_50px_-10px_rgba(var(--primary),0.5)] flex items-center gap-3"
                  )}
                >
                  <Download className="w-6 h-6" />
                  Free Download
                  <span className="absolute -top-3 -right-3 px-3 py-1 text-xs bg-green-500 text-white rounded-full font-bold border-4 border-background">
                    v0.32.0
                  </span>
                </a>

                <a
                  href="https://github.com/Subhan-Haider/Codiner-Software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-10 py-5 rounded-[2rem] font-bold text-lg",
                    "border-2 border-border hover:border-primary bg-card/50 backdrop-blur-sm",
                    "transform hover:scale-105 transition-all duration-300",
                    "flex items-center gap-3"
                  )}
                >
                  <Github className="w-6 h-6" />
                  GitHub Repo
                </a>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center lg:justify-start gap-10 pt-4"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black">10K+</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Active Users</span>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black">1.5K+</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">GitHub Stars</span>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-2xl font-black">100%</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Free & Local</span>
                </div>
              </motion.div>
            </div>

            {/* Virtual UI Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
              className="flex-1 hidden lg:block perspective-1000"
            >
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-2xl rounded-[3rem] group-hover:blur-3xl transition-all opacity-50" />

                {/* Mockup Window */}
                <div className="relative bg-[#0d1117] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-video transform-gpu border-b-4 border-white/5">
                  <div className="h-10 border-b border-white/10 bg-black/40 flex items-center px-6 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <div className="ml-4 text-xs text-white/30 font-mono italic">projects/my-new-app/src/page.tsx</div>
                  </div>
                  <div className="p-8 font-mono text-sm leading-relaxed space-y-4">
                    <div className="flex gap-4">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-400">app</span>
                      <span className="text-white">=</span>
                      <span className="text-yellow-400">"Codiner PAIKE Interface"</span>
                    </div>
                    <div className="text-white/60 pl-4 border-l-2 border-primary/20 bg-primary/5 py-4 my-6 italic">
                      {"// PAIKE: Architecting neural code flows..."}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Box 1: Neural Graph */}
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-1 bg-primary/30 rounded-full" />
                          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        </div>
                        <div className="space-y-2">
                          <div className="w-full h-1 bg-white/10 rounded-full" />
                          <div className="w-3/4 h-1 bg-white/10 rounded-full" />
                          <div className="w-1/2 h-1 bg-primary/40 rounded-full" />
                        </div>
                        <div className="text-[10px] text-primary/60 font-mono">Neural-AST Graphing...</div>
                      </div>

                      {/* Box 2: Model Status */}
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-3">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-3 h-3 text-blue-400" />
                          <div className="text-[10px] text-blue-400 font-bold">Llama-3 (Local)</div>
                        </div>
                        <div className="flex items-end gap-1 h-8">
                          {[40, 70, 45, 90, 65].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-blue-400/30 rounded-t-sm animate-pulse"
                              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                            />
                          ))}
                        </div>
                        <div className="text-[10px] text-blue-400/60 font-mono">Optimizing... 98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-12">
            Trusted by developers from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="text-2xl font-black">GITHUB</span>
            <span className="text-2xl font-black">AWS</span>
            <span className="text-2xl font-black">META</span>
            <span className="text-2xl font-black">GOOGLE</span>
            <span className="text-2xl font-black">MICROSOFT</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">Why the World chooses Codiner?</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
              We've combined PAIKE orchestration with local-first processing to give you the ultimate development edge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 mb-32">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "p-10 rounded-3xl border border-border shadow-xl",
                  "bg-card/50 backdrop-blur-sm",
                  "hover:border-primary/50 transition-all duration-300",
                  "group relative overflow-hidden"
                )}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* PAIKE Cognitive Architecture Visual */}
          <div className="max-w-6xl mx-auto p-12 rounded-[4rem] bg-black/40 border border-border/50 relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  Foundry Core Architecture
                </div>
                <h3 className="text-5xl font-black italic tracking-tighter lowercase">The <span className="text-gradient">PAIKE</span> Mind</h3>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Codiner isn't just an IDE. It's a cognitive engine that analyzes your entire project graph in real-time, predicting your next architecture move.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-primary font-black text-2xl italic">AST-Graph</div>
                    <div className="text-sm text-muted-foreground">Deep structural project understanding</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-primary font-black text-2xl italic">Neural-Synch</div>
                    <div className="text-sm text-muted-foreground">Local model orchestration</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center py-10">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/20 animate-spin-slow" />
                  <div className="absolute inset-8 rounded-full border-2 border-primary/40 animate-reverse-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Cpu className="w-20 h-20 text-primary animate-pulse" />
                  </div>
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                      style={{
                        top: `${(50 + 45 * Math.sin(angle * Math.PI / 180)).toFixed(2)}%`,
                        left: `${(50 + 45 * Math.cos(angle * Math.PI / 180)).toFixed(2)}%`,
                      }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-muted/50 border-y border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black italic tracking-tighter">Developer Love</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Codiner PAIKE has completely changed how I architect my Next.js apps. It's like having a brilliant co-pilot that lives on my SSD.",
                author: "Alex Rivers",
                role: "Frontend Architect"
              },
              {
                quote: "Finally, an AI tool that doesn't sacrifice privacy for power. Local-first is the only way forward for enterprise development.",
                author: "Sarah Jenkins",
                role: "Security Lead"
              },
              {
                quote: "The one-click deployment to Vercel and AWS makes the transition from dev to prod feel like magic. Best tool of 2026.",
                author: "Marcus Thorne",
                role: "Fullstack Developer"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border shadow-lg italic"
              >
                <p className="text-lg mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 border-t border-border bg-muted-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 italic tracking-tight">Build Faster than Ever</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              From concept to production in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Template",
                desc: "Pick from 20+ production-ready framework templates.",
              },
              {
                step: "02",
                title: "AI Generation",
                desc: "Describe your features and let PAIKE architect the logic.",
              },
              {
                step: "03",
                title: "Local Build",
                desc: "Run and test everything locally with instant hot reload.",
              },
              {
                step: "04",
                title: "One-Click Ship",
                desc: "Deploy to Vercel, Netlify, or Docker with a single command.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors"
              >
                <div className="text-6xl font-black text-primary/5 absolute -top-4 -left-2 select-none">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{s.title}</h3>
                <p className="text-muted-foreground relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black italic tracking-tighter mb-6 lowercase">The <span className="text-gradient">Codiner</span> Edge</h2>
            <p className="text-2xl text-muted-foreground font-medium">Why developers are switching from traditional IDEs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Old Way */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-muted/30 border border-border flex flex-col justify-between"
            >
              <div>
                <h3 className="text-3xl font-black mb-8 opacity-40 italic">Traditional Dev</h3>
                <ul className="space-y-6">
                  {[
                    "Hours searching through StackOverflow",
                    "Manual boilerplate configuration",
                    "Context switching between docs and IDE",
                    "Cloud-dependent AI with high latency",
                    "Subscription-locked premium features"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-muted-foreground line-through opacity-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Codiner Way */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-primary/10 border-2 border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.1)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Sparkles className="w-24 h-24 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-black mb-8 text-primary italic">AI Code Foundry</h3>
                <ul className="space-y-6">
                  {[
                    "Natural language to production code",
                    "Autonomic PAIKE orchestration",
                    "100% Local-first model execution",
                    "Sub-millisecond inference response",
                    "Free, Open Source, and Extensible"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-bold text-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-primary/20 text-primary text-center font-black uppercase tracking-widest text-sm">
                4x Faster Time-to-Ship
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section (NEW) */}
      <section className="py-32 border-t border-border bg-black/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <h2 className="text-6xl font-black italic tracking-tighter mb-8 lowercase">The <span className="text-gradient">Security</span> Fortress</h2>
              <p className="text-2xl text-muted-foreground leading-relaxed mb-12 font-medium">
                Privacy is not a feature, it's our foundation. Codiner is built for industries where data leaks are not an option.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Shield, title: "Zero Data Exfil", desc: "No code ever leaves your PCIe lanes." },
                  { icon: EyeOff, title: "Zero Telemetry", desc: "We don't track what you build. Ever." },
                  { icon: Globe, title: "Offline Airgap", desc: "Works perfectly without an internet connection." },
                  { icon: Lock, title: "AES-256 Local", desc: "Encrypted project state on your disk." }
                ].map((item, i) => (
                  <div key={i} className="space-y-4 p-6 rounded-3xl bg-card border border-border shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-bold italic lowercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl p-1 rounded-[3.5rem] bg-gradient-to-br from-primary/30 to-blue-600/30">
              <div className="bg-background rounded-[3.4rem] p-12 text-center overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Lock className="w-64 h-64 -mr-20 -mt-20 transform rotate-12" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-7xl font-black text-primary mb-4 italic">200%</h4>
                  <div className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground mb-8">Privacy Rating</div>
                  <p className="text-lg font-bold mb-10 leading-relaxed italic">
                    The only AI developer tool trusted by government contractors and fintech giants around the globe.
                  </p>
                  <button className="px-8 py-4 rounded-full border-2 border-primary text-primary font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">
                    Security Whitepaper
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Strategy Section (NEW) */}
      <section className="py-32 bg-muted/20 border-y border-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-6 lowercase">Build for <span className="text-gradient">Desktop</span> Properly</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              We've architected the ultimate path for Windows, Mac, and Linux applications.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* The Stack */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Layout,
                  title: "Electron Framework",
                  desc: "The industry standard for cross-platform apps. Used by Discord, Slack, and VS Code.",
                  tags: ["Windows", "Mac", "Linux"]
                },
                {
                  icon: Code2,
                  title: "VS Code Integration",
                  desc: "Codiner PAIKE works natively with Visual Studio Code for the best dev experience.",
                  tags: ["Extensions", "Intellisense"]
                },
                {
                  icon: Terminal,
                  title: "Foundry CLI",
                  desc: "Streamline your build process with our specialized electron-builder wrappers.",
                  tags: ["Automated", "Fast"]
                },
                {
                  icon: Monitor,
                  title: "Native UI Kits",
                  desc: "Access proprietary desktop-first components that look and feel native.",
                  tags: ["GPU-Accel", "Smooth"]
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 italic lowercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2 py-1 rounded bg-primary/5 border border-primary/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Path Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-gradient-to-br from-primary to-blue-600 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <CheckCircle2 className="w-32 h-32 -mr-12 -mt-12" />
              </div>
              <h3 className="text-3xl font-black italic mb-8 lowercase tracking-tight">Our Recommendation</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/20">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">1</div>
                  <div>
                    <div className="font-bold">VS Code + Electron</div>
                    <div className="text-sm opacity-80">Best balance of power and ease of use.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/20">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">2</div>
                  <div>
                    <div className="font-bold">PAIKE Engine</div>
                    <div className="text-sm opacity-80">Let AI handle the complex desktop logic.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start bg-white/10 p-4 rounded-2xl border border-white/20">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black">3</div>
                  <div>
                    <div className="font-bold">Electron-Builder</div>
                    <div className="text-sm opacity-80">One-click installers for Windows & Mac.</div>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/20 text-center">
                <div className="text-2xl font-black italic mb-2">Professional Path</div>
                <div className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">Ready for Production</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Marquee */}
      <section className="py-24 border-t border-border bg-black/20 overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-border" />
            <h2 className="text-xl font-black italic tracking-widest text-muted-foreground uppercase">Ecosystem Support</h2>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[
              "React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "Rust",
              "Docker", "AWS", "Vercel", "Supabase", "Prisma", "PostgreSQL", "Redis",
              "React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python", "Rust"
            ].map((tech, i) => (
              <span key={i} className="text-5xl md:text-7xl font-black italic opacity-20 hover:opacity-100 hover:text-primary transition-all cursor-default lowercase tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-16 animate-marquee-reverse whitespace-nowrap">
            {[
              "Github", "Gitlab", "Ollama", "Llama 3", "DeepSeek", "Mistral", "GPT-4",
              "Claude", "Gemini", "Vite", "Turborepo", "Bun", "Deno", "ESLint",
              "Github", "Gitlab", "Ollama", "Llama 3", "DeepSeek", "Mistral", "GPT-4"
            ].map((tech, i) => (
              <span key={i} className="text-5xl md:text-7xl font-black italic opacity-20 hover:opacity-100 hover:text-blue-500 transition-all cursor-default lowercase tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Neural Pulse: Global Activity */}
      <section className="py-24 border-t border-border bg-black/40 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6 uppercase tracking-widest">
                Live Neural Pulse
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter mb-6 lowercase">Ecosystem <span className="text-gradient">Activity</span></h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-8">
                Thousands of developers are building with Codiner right now. Watch PAIKE instances synchronize and optimize codebases in real-time.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-3xl font-black text-primary">12.4K</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Sessions</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">1.2M</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lines Generated/Hr</div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl bg-card/30 border border-border p-8 rounded-[2.5rem] backdrop-blur-xl relative shadow-2xl overflow-hidden font-mono text-sm">
              <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-bold text-primary uppercase text-xs">Live Stream</span>
                </div>
                <span className="text-muted-foreground text-xs uppercase">Foundry Node #412</span>
              </div>
              <div className="space-y-3 opacity-80">
                <div className="flex gap-4"><span className="text-primary/50">[14:22:01]</span> <span className="text-green-400">PAIKE_CORE:</span> Analyzing Prisma schema...</div>
                <div className="flex gap-4"><span className="text-primary/50">[14:22:02]</span> <span className="text-blue-400">PATTERN:</span> Choice identified: React Query Hooks</div>
                <div className="flex gap-4"><span className="text-primary/50">[14:22:03]</span> <span className="text-purple-400">FOUNDRY:</span> Generating Next.js route handlers...</div>
                <div className="flex gap-4"><span className="text-primary/50">[14:22:05]</span> <span className="text-green-400">PAIKE_CORE:</span> Optimizing bundle for Edge...</div>
                <div className="flex gap-4"><span className="text-primary/50">[14:22:06]</span> <span className="text-yellow-400">SYNC:</span> Project metadata persisted to local SQLite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (NEW) */}
      <section className="py-32 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black italic tracking-tighter mb-6 lowercase">Common <span className="text-gradient">Queries</span></h2>
            <p className="text-xl text-muted-foreground font-medium italic">Everything you need to know about the AI Foundry</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is it really free for commercial use?", a: "Yes. Codiner is open source and licensed under MIT. You can build, ship, and sell anything you create without royalties or seats." },
              { q: "How much hardware do I need for Local AI?", a: "For a smooth experience, 16GB RAM and a decent GPU (NVIDIA 30-series or Apple M-series) is recommended. However, small models run fine on CPU." },
              { q: "Can I use it with my own LLM API?", a: "Absolutely. While we prioritize local models via Ollama, you can plug in any OpenAI-compatible API key for GPT-4 or Claude." },
              { q: "Does Codiner support back-end development?", a: "Yes. Use PAIKE to generate Node.js, Python, and Rust APIs, database migrations, and edge functions automatically." }
            ].map((faq, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-card/30 border border-border hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between cursor-pointer">
                  <h4 className="text-xl font-bold italic tracking-tight">{faq.q}</h4>
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="mt-4 text-muted-foreground leading-relaxed font-medium text-lg">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-border bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[4rem] bg-card border border-border shadow-2xl max-w-5xl mx-auto relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <Rocket className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
            <h2 className="text-5xl md:text-6xl font-bold mb-8 italic tracking-tight">Ready to start building?</h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers building the future of the web with Codiner.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/download"
                className="px-12 py-6 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)]"
              >
                Download Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Development",
    description:
      "Build applications using natural language. Let AI handle the heavy lifting.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance with instant hot reload and efficient builds.",
  },
  {
    icon: Code2,
    title: "Full TypeScript Support",
    description:
      "Type-safe development with full IntelliSense and error checking.",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description:
      "Deploy your applications with confidence. Battle-tested and reliable.",
  },
  {
    icon: Github,
    title: "Open Source",
    description:
      "Free forever. Contribute, customize, and build together with the community.",
  },
  {
    icon: Download,
    title: "Local First",
    description:
      "Your data stays on your machine. No cloud dependencies required.",
  },
];
