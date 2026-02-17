"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Github, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-110 transition-transform">
                            <img
                                src="/logo.png"
                                alt="Codiner Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold">Codiner</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Features
                        </Link>
                        <Link
                            href="/docs"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Documentation
                        </Link>
                        <Link
                            href="/paike"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            PAIKE
                        </Link>
                        <Link
                            href="/showcase"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Showcase
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary transition-colors hover:bg-accent"
                        >
                            <Github className="w-5 h-5 text-foreground" />
                            <span className="text-foreground">GitHub</span>
                        </a>
                        <Link
                            href="/download"
                            className={cn(
                                "flex items-center gap-2 px-6 py-2 rounded-lg font-semibold",
                                "bg-gradient-to-r from-purple-600 to-blue-600",
                                "hover:from-purple-500 hover:to-blue-500",
                                "transform hover:scale-105 transition-all duration-200"
                            )}
                        >
                            <Download className="w-5 h-5" />
                            Download
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pt-4 pb-2 space-y-4"
                    >
                        <Link
                            href="/"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/docs"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Documentation
                        </Link>
                        <Link
                            href="/paike"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            PAIKE
                        </Link>
                        <Link
                            href="/showcase"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Showcase
                        </Link>
                        <Link
                            href="/pricing"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <div className="pt-4 space-y-2">
                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary transition-colors hover:bg-accent"
                            >
                                <Github className="w-5 h-5 text-foreground" />
                                <span className="text-foreground">GitHub</span>
                            </a>
                            <Link
                                href="/download"
                                className={cn(
                                    "flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-semibold",
                                    "bg-gradient-to-r from-purple-600 to-blue-600",
                                    "hover:from-purple-500 hover:to-blue-500"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                <Download className="w-5 h-5" />
                                Download
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
