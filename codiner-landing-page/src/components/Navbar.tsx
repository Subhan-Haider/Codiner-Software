"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Github, Menu, X, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, profile, loading } = useAuth();

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center">
                        <div className="w-12 h-12 rounded-xl overflow-hidden group-hover:scale-110 transition-transform">
                            <img
                                src="/logo.png"
                                alt="Codiner Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
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
                            href="/blog"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Blog
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
                        <Link
                            href="/admin"
                            className="text-primary/70 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest border border-primary/20 px-2 py-1 rounded-md bg-primary/5"
                        >
                            Admin
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <ThemeToggle />
                        {loading ? (
                            <div className="w-24 h-10 bg-muted animate-pulse rounded-xl" />
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black italic lowercase tracking-tight hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary transition-all group relative"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-[10px] text-primary transition-transform group-hover:scale-110">
                                        {profile?.name?.charAt(0) || user.email?.charAt(0)}
                                    </div>
                                    <span className="text-sm font-black italic lowercase">{profile?.name || "node"}</span>
                                    {!user.emailVerified && user.providerData.some(p => p.providerId === 'password') && (
                                        <div className="absolute -top-1 -right-1">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-amber-500 animate-ping rounded-full opacity-75" />
                                                <ShieldAlert className="w-3 h-3 text-amber-500 relative bg-background rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                </Link>
                                <Link
                                    href="/download"
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-sm",
                                        "bg-primary text-primary-foreground shadow-lg shadow-primary/20",
                                        "hover:scale-105 transition-all duration-200"
                                    )}
                                >
                                    <Download className="w-5 h-5" />
                                    Download
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-6 py-2.5 rounded-xl border border-primary/20 bg-primary/10 text-primary font-black text-sm uppercase tracking-widest hover:bg-primary/20 transition-all"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border border-border hover:border-primary transition-colors hover:bg-accent group"
                        >
                            <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                        </a>
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
                            href="/blog"
                            className="block text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
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
                                    "bg-linear-to-r from-purple-600 to-blue-600",
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
