import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />

            <section className="relative pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="text-gradient">Privacy Policy</span>
                        </h1>
                        <p className="text-muted-foreground mb-12">Last updated: February 14, 2026</p>

                        <div className="prose prose-invert prose-purple max-w-none space-y-8">
                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    At Codiner, we believe in complete transparency and user privacy. This
                                    policy explains how we handle your data when you use our software.
                                </p>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Codiner is a local-first application. This means:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>All your code and projects stay on your local machine</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>We do not collect, store, or transmit your source code</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>No tracking or analytics are embedded in the application</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>You have complete control over your data</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Optional Telemetry</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Codiner includes optional, anonymized telemetry that helps us improve the
                                    software. This is:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Completely opt-in (disabled by default)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Limited to usage statistics (e.g., feature usage, errors)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Never includes your code or personal data</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Can be disabled at any time in settings</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    When you choose to use certain features, you may interact with third-party
                                    services:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>AI Providers:</strong> If you use cloud AI services (OpenAI,
                                            Anthropic), your prompts are sent to their servers according to their
                                            privacy policies
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>Deployment Platforms:</strong> When deploying, your code is
                                            sent to your chosen platform (Vercel, Netlify, etc.)
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong>Package Managers:</strong> npm/yarn download dependencies from
                                            their registries
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Website Analytics</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Our website (codiner.online) may use privacy-respecting analytics to
                                    understand visitor traffic. This data is anonymized and does not track
                                    individual users.
                                </p>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Because Codiner is local-first and open-source:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>You own all your code and data</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>You can inspect the source code to verify our claims</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>You can modify the software to suit your needs</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-400 mt-1">✓</span>
                                        <span>You can delete all data by uninstalling the application</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-md">
                                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about this privacy policy or how we handle data,
                                    please contact us at{" "}
                                    <a
                                        href="mailto:privacy@codiner.online"
                                        className="text-primary hover:underline"
                                    >
                                        privacy@codiner.online
                                    </a>
                                </p>
                            </div>

                            <div className="p-6 rounded-xl border border-primary/50 bg-card/50 backdrop-blur-sm shadow-xl">
                                <h2 className="text-2xl font-bold mb-4">Open Source Transparency</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    As an open-source project, you can review our entire codebase on GitHub
                                    to verify that we follow these privacy practices. Transparency is not just
                                    a promise—it's built into our DNA.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
