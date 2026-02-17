"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative border-t border-border bg-card/30 backdrop-blur-sm transition-colors duration-300">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">Codiner</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            AI-powered development platform. Free, open-source, and built for developers.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/Subhan-Haider/Codiner-Software"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:support@codiner.online"
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/ai-features" className="text-muted-foreground hover:text-primary transition-colors">
                                    AI Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href="/integrations" className="text-muted-foreground hover:text-primary transition-colors">
                                    Integrations
                                </Link>
                            </li>
                            <li>
                                <Link href="/deployment" className="text-muted-foreground hover:text-primary transition-colors">
                                    Deployment
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                                    Roadmap
                                </Link>
                            </li>
                            <li>
                                <Link href="/paike" className="hover:text-primary transition-colors font-semibold text-primary/80">
                                    PAIKE Engine ✨
                                </Link>
                            </li>
                            <li>
                                <Link href="/local-ai" className="text-muted-foreground hover:text-primary transition-colors font-semibold">
                                    Local AI Stack 🤖
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/changelog" className="text-muted-foreground hover:text-primary transition-colors">
                                    Changelog
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/showcase" className="text-muted-foreground hover:text-primary transition-colors">
                                    Showcase
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Subhan-Haider/Codiner-Software"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold mb-4">Community</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                                    Community Hub
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Issues & Feedback
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Issues
                                </a>
                            </li>
                            <li>
                                <Link href="/github" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contribute
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/download" className="text-muted-foreground hover:text-primary transition-colors">
                                    Download
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Subhan-Haider/Codiner-Software/blob/main/LICENSE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    License (MIT)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 Codiner. Open source under MIT License.</p>
                    <p>
                        Made with ❤️ by the{" "}
                        <a
                            href="https://github.com/Subhan-Haider/Codiner-Software/graphs/contributors"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            community
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
