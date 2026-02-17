"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Check, Monitor, Apple, Github, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DownloadPage() {
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
                            Download <span className="text-gradient">Codiner</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Free, open-source, and ready to use. Choose your platform below.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Latest: v0.32.0</span>
                        </div>
                    </motion.div>

                    {/* Download Options */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Windows */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className={cn(
                                "p-8 rounded-xl border-2 border-primary/50",
                                "bg-card/50 backdrop-blur-sm",
                                "hover:border-primary transition-all duration-300",
                                "group shadow-xl"
                            )}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600/10 to-blue-600/10 flex items-center justify-center">
                                    <Monitor className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Windows</h3>
                                    <p className="text-muted-foreground">Windows 10/11 (64-bit)</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Installer (.exe)</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Auto-update support</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Standard Setup</span>
                                </li>
                            </ul>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-Setup-0.32.0.exe"
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold",
                                    "bg-gradient-to-r from-purple-600 to-blue-600",
                                    "hover:from-purple-500 hover:to-blue-500",
                                    "transform hover:scale-105 transition-all duration-200"
                                )}
                            >
                                <Download className="w-5 h-5" />
                                Download for Windows
                            </a>
                        </motion.div>

                        {/* macOS */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className={cn(
                                "p-8 rounded-xl border-2 border-primary/50",
                                "bg-card/50 backdrop-blur-sm",
                                "hover:border-primary transition-all duration-300",
                                "group shadow-xl"
                            )}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-700/20 to-gray-800/20 flex items-center justify-center">
                                    <Apple className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">macOS</h3>
                                    <p className="text-muted-foreground">Intel & Silicon (Universal)</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Disk Image (.dmg)</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Native Performance</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Easy Install</span>
                                </li>
                            </ul>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-0.32.0.dmg"
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold",
                                    "bg-gradient-to-r from-purple-600 to-blue-600",
                                    "hover:from-purple-500 hover:to-blue-500",
                                    "transform hover:scale-105 transition-all duration-200"
                                )}
                            >
                                <Download className="w-5 h-5" />
                                Download for macOS
                            </a>
                        </motion.div>

                        {/* Linux */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={cn(
                                "p-8 rounded-xl border-2 border-primary/50",
                                "bg-card/50 backdrop-blur-sm",
                                "hover:border-primary transition-all duration-300",
                                "group shadow-xl"
                            )}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-600/10 to-red-600/10 flex items-center justify-center">
                                    <Terminal className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Linux</h3>
                                    <p className="text-muted-foreground">x64 (Zip/Portable)</p>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Portable ZIP Bundle</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Works on any Distro</span>
                                </li>
                                <li className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="w-5 h-5 text-green-500" />
                                    <span>Open Source</span>
                                </li>
                            </ul>

                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software/releases/latest/download/Codiner-linux-x64-0.32.0.zip"
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold",
                                    "bg-gradient-to-r from-purple-600 to-blue-600",
                                    "hover:from-purple-500 hover:to-blue-500",
                                    "transform hover:scale-105 transition-all duration-200"
                                )}
                            >
                                <Download className="w-5 h-5" />
                                Download for Linux
                            </a>
                        </motion.div>
                    </div>

                    {/* Alternative Download */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-muted-foreground mb-4">Or download from GitHub Releases</p>
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software/releases"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors bg-card/30"
                        >
                            <Github className="w-5 h-5" />
                            View All Releases
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* System Requirements */}
            <section className="relative py-20 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center">System Requirements</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">Minimum</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Windows 10 (64-bit)</li>
                                    <li>• 4 GB RAM</li>
                                    <li>• 500 MB disk space</li>
                                    <li>• Node.js 20+ (auto-installed)</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">Recommended</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Windows 11 (64-bit)</li>
                                    <li>• 8 GB RAM or more</li>
                                    <li>• 2 GB disk space</li>
                                    <li>• SSD for better performance</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
