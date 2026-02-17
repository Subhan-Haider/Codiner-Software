"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Code, Terminal, Zap, Shield, ChevronRight, Database, Globe, Lock, AlertCircle, Key, Activity, Cpu, Search, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ApiReferencePage() {
    const [activeSection, setActiveSection] = useState("Introduction");

    const menu = [
        {
            title: "Introduction",
            items: ["Authentication", "Rate Limiting", "Errors"]
        },
        {
            title: "Workspace",
            items: ["Project Init (12)", "Template Config (8)", "Team Synch (15)"]
        },
        {
            title: "Orchestration",
            items: ["Start Synch (5)", "Query Graph (24)", "Apply Patch (12)"]
        },
        {
            title: "Security",
            items: ["Neural Audit (9)", "Vulnerability Scan (4)"]
        },
        {
            title: "System",
            items: ["Health Check (1)", "Telemetry (8)"]
        },
        {
            title: "Integrations",
            items: ["Webhooks (5)", "SDKs (3)"]
        },
        {
            title: "Resources",
            items: ["Architecture (1)", "Support (4)"]
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <section className="relative pt-40 pb-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs font-black uppercase tracking-widest text-primary mb-8">
                            Developer Reference
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic lowercase">
                            API <span className="text-gradient">Reference</span>
                        </h1>
                        <p className="text-2xl text-muted-foreground font-medium leading-relaxed">
                            Integrate Codiner's PAIKE engine directly into your own tools and workflows.
                        </p>
                    </motion.div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-16">
                        {/* Sidebar */}
                        <aside className="space-y-12 shrink-0">
                            <div className="sticky top-32 space-y-12 h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-hide">
                                {menu.map((section) => (
                                    <div key={section.title}>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">{section.title}</h3>
                                        <ul className="space-y-4 font-bold text-muted-foreground">
                                            {section.items.map((item) => (
                                                <li
                                                    key={item}
                                                    onClick={() => {
                                                        setActiveSection(item);
                                                        document.getElementById(item.toLowerCase().replace(/\s+/g, '-').replace(/\(\d+\)/, '').trim())?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className={cn(
                                                        "transition-all cursor-pointer hover:text-primary flex items-center justify-between group text-sm",
                                                        activeSection === item && "text-foreground translate-x-1"
                                                    )}
                                                >
                                                    {item}
                                                    <ChevronRight className={cn(
                                                        "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                                                        activeSection === item && "opacity-100 text-primary"
                                                    )} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* Content Area */}
                        <div className="space-y-32">
                            {/* Introduction Content */}
                            <section id="introduction" className="space-y-24">
                                <div id="authentication" className="space-y-12">
                                    <h2 className="text-4xl font-black italic tracking-tighter lowercase border-b border-border pb-6">Authentication</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Codiner uses standard Bearer tokens for cloud-based orchestration. Local-first requests skip authentication if executed on the same network node.
                                    </p>
                                    <div className="p-10 rounded-[3rem] bg-white border border-border shadow-2xl space-y-6">
                                        <div className="flex items-center gap-4 text-primary">
                                            <Key className="w-6 h-6" />
                                            <span className="font-bold uppercase tracking-widest">Example Header</span>
                                        </div>
                                        <div className="bg-muted/30 p-6 rounded-2xl font-mono text-sm border border-border">
                                            Authorization: Bearer CODINER_API_KEY
                                        </div>
                                    </div>
                                </div>

                                <div id="rate-limiting" className="space-y-12">
                                    <h2 className="text-4xl font-black italic tracking-tighter lowercase border-b border-border pb-6">Rate Limiting</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Cloud tiers are restricted based on your neural credit balance. Local inference has zero rate limits, governed only by your hardware capabilities.
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="p-8 rounded-3xl border border-border bg-card/50">
                                            <div className="text-primary font-black text-2xl mb-2">1,000</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Free Tier / Mo</div>
                                        </div>
                                        <div className="p-8 rounded-3xl border border-primary/30 bg-primary/5 shadow-inner">
                                            <div className="text-primary font-black text-2xl mb-2">Unlimited</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Local Node</div>
                                        </div>
                                        <div className="p-8 rounded-3xl border border-border bg-card/50">
                                            <div className="text-primary font-black text-2xl mb-2">50k+</div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Foundry Max</div>
                                        </div>
                                    </div>
                                </div>

                                <div id="errors" className="space-y-12">
                                    <h2 className="text-4xl font-black italic tracking-tighter lowercase border-b border-border pb-6">Error Response</h2>
                                    <div className="p-8 rounded-[3rem] bg-white border border-border shadow-xl font-mono text-sm relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                                <span className="text-red-500 font-bold uppercase tracking-widest text-xs">401 Unauthorized</span>
                                            </div>
                                        </div>
                                        <pre className="text-purple-600">
                                            {`{
  "error": "invalid_api_key",
  "message": "The provided credentials do not exist in the foundry.",
  "requestId": "fd_9120asnk1"
}`}
                                        </pre>
                                    </div>
                                </div>
                            </section>

                            {/* Workspace Content */}
                            <section id="workspace" className="space-y-24">
                                <div id="project-init" className="space-y-12">
                                    <SectionHeader badge="Workspace" title="Project Init" />
                                    <EndpointCard
                                        method="POST"
                                        path="/v1/workspace/init"
                                        description="Creates a new directory structure based on the specified template and neural profile."
                                        body={{
                                            name: "my-next-app",
                                            template: "next-foundry-pro",
                                            auth_provider: "clerk"
                                        }}
                                        params={[
                                            { name: "name", type: "string", desc: "The name of the resulting directory." },
                                            { name: "template", type: "string", desc: "ID of the Codiner template to clone." }
                                        ]}
                                    />
                                </div>

                                <div id="team-synch" className="space-y-12">
                                    <SectionHeader badge="Workspace" title="Team Synch" />
                                    <EndpointCard
                                        method="GET"
                                        path="/v1/workspace/synch/status"
                                        description="Retrieve the current neural alignment status of all active teammates on the project."
                                        body={null}
                                        params={[
                                            { name: "projectId", type: "id", desc: "Unique identifier for the project node." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* Orchestration Content */}
                            <section id="orchestration" className="space-y-24">
                                <div id="start-synch" className="space-y-12">
                                    <SectionHeader badge="Orchestration" title="Start Synch" />
                                    <EndpointCard
                                        method="POST"
                                        path="/v1/orchestrate/synch"
                                        description="Triggers a deep neural scan of the target repository and populates the local vector store."
                                        body={{
                                            path: "./src",
                                            engine: "llama-3-local",
                                            options: { depth: "ast-full", indexing: "semantic" }
                                        }}
                                        params={[
                                            { name: "path", type: "string", desc: "Absolute file path to the project root." },
                                            { name: "engine", type: "enum", desc: "Choice of AI engine model." }
                                        ]}
                                    />
                                </div>

                                <div id="apply-patch" className="space-y-12">
                                    <SectionHeader badge="Orchestration" title="Apply Patch" />
                                    <EndpointCard
                                        method="PUT"
                                        path="/v1/orchestrate/patch"
                                        description="Atomically applies neural-suggested code changes across multiple files while maintaining AST sanity."
                                        body={{
                                            patchId: "p_8812",
                                            files: ["src/app/page.tsx", "src/components/Nav.tsx"]
                                        }}
                                        params={[
                                            { name: "patchId", type: "string", desc: "The ID of the generated code improvement." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* Neural Engine Content */}
                            <section id="neural-engine" className="space-y-24">
                                <div id="inference" className="space-y-12">
                                    <SectionHeader badge="Neural Engine" title="Inference" />
                                    <EndpointCard
                                        method="POST"
                                        path="/v1/neural/inference"
                                        description="Direct access to the underlying LLM with pre-loaded project context and PAIKE filters."
                                        body={{
                                            prompt: "Add a dark mode toggle to the Navbar component.",
                                            context_window: 16384
                                        }}
                                        params={[
                                            { name: "prompt", type: "string", desc: "The natural language instruction." },
                                            { name: "context_window", type: "int", desc: "Token limit for this specific query." }
                                        ]}
                                    />
                                </div>

                                <div id="vector-ops" className="space-y-12">
                                    <SectionHeader badge="Neural Engine" title="Vector Ops" />
                                    <EndpointCard
                                        method="POST"
                                        path="/v1/neural/vector/query"
                                        description="Perform semantic search within your project's neural index. Find logic, not keywords."
                                        body={{
                                            embedding: "authentication middleware logic",
                                            top_k: 5
                                        }}
                                        params={[
                                            { name: "embedding", type: "string", desc: "The semantic Query string." },
                                            { name: "top_k", type: "int", desc: "Number of relevant blocks to return." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* Templates Content */}
                            <section id="templates" className="space-y-24">
                                <div id="list-templates" className="space-y-12">
                                    <SectionHeader badge="Templates" title="List Templates" />
                                    <EndpointCard
                                        method="GET"
                                        path="/v1/templates"
                                        description="Fetches all available AI-native project templates from the foundry gallery."
                                        body={null}
                                        params={[
                                            { name: "category", type: "string", desc: "Filter templates by category (e.g., 'web', 'mobile')." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* Security Content */}
                            <section id="security" className="space-y-24">
                                <div id="neural-audit" className="space-y-12">
                                    <SectionHeader badge="Security" title="Neural Audit" />
                                    <EndpointCard
                                        method="POST"
                                        path="/v1/security/audit"
                                        description="Runs a multi-agent diagnostic on your code to identify logic flaws and potential zero-day exploits."
                                        body={{
                                            scope: "auth-layer",
                                            strict_mode: true
                                        }}
                                        params={[
                                            { name: "scope", type: "string", desc: "Specific project path or logical layer to audit." }
                                        ]}
                                    />
                                </div>

                                <div id="vulnerability-scan" className="space-y-12">
                                    <SectionHeader badge="Security" title="Vulnerability Scan" />
                                    <EndpointCard
                                        method="GET"
                                        path="/v1/security/scan/report"
                                        description="Retrieve the latest security report generated by the PAIKE engine."
                                        body={null}
                                        params={[
                                            { name: "format", type: "string", desc: "Report format: 'json' | 'pdf' | 'html'." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* System Content */}
                            <section id="system" className="space-y-24">
                                <div id="health-check" className="space-y-12">
                                    <SectionHeader badge="System" title="Health Check" />
                                    <EndpointCard
                                        method="GET"
                                        path="/v1/system/health"
                                        description="Check the operational status of the PAIKE engine, local models, and vector stores."
                                        body={null}
                                        params={[]}
                                    />
                                </div>

                                <div id="telemetry" className="space-y-12">
                                    <SectionHeader badge="System" title="Telemetry" />
                                    <EndpointCard
                                        method="GET"
                                        path="/v1/system/telemetry"
                                        description="Retrieve real-time token consumption, latency metrics, and hardware utilization stats."
                                        body={null}
                                        params={[
                                            { name: "realtime", type: "boolean", desc: "Whether to return live streaming telemetry." }
                                        ]}
                                    />
                                </div>
                            </section>

                            {/* Integrations Content */}
                            <section id="integrations" className="space-y-24">
                                <div id="webhooks" className="space-y-12">
                                    <SectionHeader badge="Integrations" title="Webhooks" />
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Subscribe to project events and receive real-time notifications about deployment status, neural scan completions, and security vulnerabilities.
                                    </p>
                                    <div className="p-8 rounded-[3rem] bg-white border border-border shadow-xl">
                                        <h4 className="font-black italic mb-4">Available Events</h4>
                                        <ul className="space-y-2 font-mono text-sm">
                                            <li className="text-primary">deployment.success</li>
                                            <li className="text-primary">neural.scan.complete</li>
                                            <li className="text-primary">security.alert.high</li>
                                            <li className="text-primary">team.synch.error</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="sdks" className="space-y-12">
                                    <SectionHeader badge="Integrations" title="SDKs" />
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="p-8 rounded-3xl border border-border bg-card/30 flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold">JS</div>
                                            <div>
                                                <div className="font-bold">Node.js SDK</div>
                                                <div className="text-xs text-muted-foreground font-mono">npm install @codiner/sdk</div>
                                            </div>
                                        </div>
                                        <div className="p-8 rounded-3xl border border-border bg-card/30 flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold">PY</div>
                                            <div>
                                                <div className="font-bold">Python SDK</div>
                                                <div className="text-xs text-muted-foreground font-mono">pip install codiner-sdk</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Resources Content */}
                            <section id="resources" className="space-y-24">
                                <div id="architecture" className="space-y-12">
                                    <SectionHeader badge="Resources" title="Architecture" />
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Codiner operates via a hybrid local-proxy architecture. The PAIKE engine runs on your local node, while the cloud gateway handles team synchronization and credit management.
                                    </p>
                                    <div className="p-10 rounded-[3rem] bg-white border border-border shadow-2xl overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-8">
                                            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center gap-3">
                                                <Cpu className="w-8 h-8 text-primary" />
                                                <span className="text-xs font-black uppercase tracking-widest">Local Node</span>
                                            </div>
                                            <div className="h-px w-24 bg-border hidden md:block" />
                                            <div className="p-6 rounded-2xl bg-primary flex flex-col items-center gap-3">
                                                <Zap className="w-8 h-8 text-white" />
                                                <span className="text-xs font-black uppercase text-white tracking-[0.3em]">PAIKE PROXY</span>
                                            </div>
                                            <div className="h-px w-24 bg-border hidden md:block" />
                                            <div className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center gap-3">
                                                <Layers className="w-8 h-8 text-primary" />
                                                <span className="text-xs font-black uppercase tracking-widest">Cloud Sync</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="support" className="space-y-12">
                                    <SectionHeader badge="Resources" title="Support" />
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {[
                                            { title: "Discord", desc: "Join 5k+ developers in our neural foundry.", link: "#" },
                                            { title: "GitHub", desc: "Report issues and contribute to SDKs.", link: "#" },
                                            { title: "Twitter", desc: "Follow for neural engine updates.", link: "#" },
                                            { title: "Email", desc: "Direct support for Enterprise nodes.", link: "#" }
                                        ].map((item) => (
                                            <div key={item.title} className="p-8 rounded-[2.5rem] border border-border bg-card/20 hover:bg-card/40 transition-colors group cursor-pointer">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-2xl font-black italic lowercase tracking-tight">{item.title}</h4>
                                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                                <p className="text-muted-foreground font-medium">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Info */}
            <section className="py-20 border-t border-border bg-muted/20">
                <div className="container mx-auto px-6">
                    <div className="p-10 rounded-[3rem] border border-primary/20 bg-white shadow-2xl flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Shield className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-3xl font-black italic mb-4 lowercase tracking-tighter">Security & Privacy First</h4>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
                                All API calls to `/v1/*` endpoints are processed through our proprietary local proxy if running in CLI mode. Your source code artifacts are never transmitted during orchestration unless cloud-inference is explicitly requested.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function SectionHeader({ badge, title }: { badge: string, title: string }) {
    return (
        <div className="space-y-4">
            <div className="text-primary text-xs font-black uppercase tracking-[0.3em]">{badge}</div>
            <h2 className="text-5xl font-black italic tracking-tighter lowercase">{title}</h2>
        </div>
    );
}

function EndpointCard({ method, path, description, body, params }: {
    method: string,
    path: string,
    description: string,
    body: any,
    params: { name: string, type: string, desc: string }[]
}) {
    const methodColor = method === "GET" ? "bg-blue-500/10 text-blue-500" :
        method === "POST" ? "bg-green-500/10 text-green-500" :
            "bg-yellow-500/10 text-yellow-500";

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <span className={cn("px-4 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase shadow-sm", methodColor)}>
                    {method}
                </span>
                <code className="text-2xl font-black italic tracking-tighter text-foreground/80">{path}</code>
            </div>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {description}
            </p>

            {body && (
                <div className="p-8 rounded-[2.5rem] bg-white border border-border shadow-xl font-mono text-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-muted-foreground/60 uppercase tracking-widest text-xs font-bold">Request Body</span>
                        <span className="text-primary hover:text-primary/70 cursor-pointer text-xs font-black uppercase tracking-widest">Copy JSON</span>
                    </div>
                    <pre className="text-purple-600">
                        {JSON.stringify(body, null, 2)}
                    </pre>
                </div>
            )}

            <div className="space-y-6">
                <h4 className="font-black italic text-xl tracking-tight">Parameters</h4>
                <div className="divide-y divide-border border-t border-border">
                    {params.map((p) => (
                        <div key={p.name} className="flex items-start justify-between py-6">
                            <div className="space-y-2">
                                <code className="text-primary font-black text-lg">{p.name}</code>
                                <p className="text-sm text-muted-foreground font-bold tracking-tight">{p.desc}</p>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 bg-muted/30 px-2 py-1 rounded">
                                {p.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
