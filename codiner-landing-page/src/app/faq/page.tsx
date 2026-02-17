"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFAQs = faqs.filter(
        (faq) =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Find answers to common questions about Codiner
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </motion.div>

                    {/* FAQ Accordion */}
                    <div className="max-w-3xl mx-auto space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                                >
                                    <span className="text-lg font-semibold pr-8">{faq.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "w-5 h-5 text-primary flex-shrink-0 transition-transform",
                                            openIndex === index && "rotate-180"
                                        )}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}

                        {filteredFAQs.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No questions found matching "{searchQuery}"
                            </div>
                        )}
                    </div>

                    {/* Still have questions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-xl border border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                    >
                        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-muted-foreground mb-6">
                            Can't find what you're looking for? Our community and support team are here
                            to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 font-semibold"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/community"
                                className="px-6 py-3 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors font-semibold"
                            >
                                Join Community
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

const faqs = [
    {
        question: "Is Codiner really free?",
        answer:
            "Yes! Codiner is completely free and open-source. There are no hidden costs, subscriptions, or premium tiers. You get full access to all features forever.",
    },
    {
        question: "What platforms does Codiner support?",
        answer:
            "Currently, Codiner is available for Windows 10/11 (64-bit). macOS and Linux support are coming soon. You can track progress on our GitHub repository.",
    },
    {
        question: "Do I need an internet connection to use Codiner?",
        answer:
            "Codiner works completely offline. All AI processing happens locally on your machine. However, you'll need internet for deploying applications and downloading dependencies.",
    },
    {
        question: "What programming languages does Codiner support?",
        answer:
            "Codiner primarily focuses on modern web development with full support for TypeScript, JavaScript, React, Next.js, and Node.js. We're continuously adding support for more frameworks and languages.",
    },
    {
        question: "Can I use my own AI models with Codiner?",
        answer:
            "Yes! Codiner supports integration with various AI providers including OpenAI, Anthropic, and local models through Ollama. You can configure your preferred AI provider in the settings.",
    },
    {
        question: "How do I update Codiner?",
        answer:
            "Codiner includes an auto-update feature. When a new version is available, you'll be notified and can update with a single click. You can also manually download updates from our website or GitHub.",
    },
    {
        question: "Is my code and data private?",
        answer:
            "Absolutely. Codiner is local-first, meaning all your code and data stays on your machine. We don't collect, store, or transmit your code to any servers. Your privacy is our priority.",
    },
    {
        question: "Can I contribute to Codiner's development?",
        answer:
            "Yes! Codiner is open-source and we welcome contributions. You can submit pull requests, report bugs, suggest features, or help with documentation on our GitHub repository.",
    },
    {
        question: "What are the system requirements?",
        answer:
            "Minimum: Windows 10 (64-bit), 4GB RAM, 500MB disk space. Recommended: Windows 11 (64-bit), 8GB+ RAM, SSD, and 2GB disk space for optimal performance.",
    },
    {
        question: "Does Codiner work with existing projects?",
        answer:
            "Yes! You can import existing projects into Codiner. It works with standard Node.js projects and supports popular frameworks like React, Next.js, Vue, and more.",
    },
    {
        question: "How does AI code generation work?",
        answer:
            "Codiner uses advanced AI models to understand your natural language descriptions and generate code. You describe what you want to build, and Codiner creates the necessary files, components, and logic.",
    },
    {
        question: "Can I deploy my apps directly from Codiner?",
        answer:
            "Yes! Codiner includes one-click deployment to popular platforms like Vercel, Netlify, and AWS. You can also export your project and deploy it manually anywhere you like.",
    },
    {
        question: "What if I encounter a bug?",
        answer:
            "Please report bugs on our GitHub Issues page. Include details about your system, steps to reproduce, and any error messages. Our community and team will help resolve it quickly.",
    },
    {
        question: "Is there a mobile version of Codiner?",
        answer:
            "Not currently. Codiner is designed for desktop development workflows. However, you can use it to build mobile-responsive web applications and PWAs.",
    },
    {
        question: "How can I get help if I'm stuck?",
        answer:
            "We have multiple support channels: comprehensive documentation, community forums, GitHub Issues, Discord server, and email support. The community is very active and helpful!",
    },
];
