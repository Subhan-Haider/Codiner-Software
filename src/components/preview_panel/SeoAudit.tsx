import { useAtomValue } from "jotai";
import { appUrlAtom } from "@/atoms/appAtoms";
import { useEffect, useState, useCallback } from "react";
import {
    AlertTriangle,
    CheckCircle,
    Info,
    RefreshCw,
    Globe,
    Share2,
    FileText,
    Layout,
    ExternalLink,
    ChevronRight,
    Gauge
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { IpcClient } from "@/ipc/ipc_client";

interface SeoCheck {
    id: string;
    label: string;
    status: "ok" | "warn" | "error" | "info";
    message: string;
    details?: string;
    category: "content" | "meta" | "social" | "other";
}

interface SeoResult {
    score: number;
    checks: SeoCheck[];
    metadata: {
        title: string;
        description: string;
        canonical: string;
        lang: string;
    };
}

export const SeoAudit = () => {
    const { appUrl } = useAtomValue(appUrlAtom);
    const [results, setResults] = useState<SeoResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runAudit = useCallback(async () => {
        if (!appUrl) return;
        setLoading(true);
        setError(null);

        try {
            const text = await IpcClient.getInstance().fetchAppUrl(appUrl);
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            const checks: SeoCheck[] = [];

            // 1. Content Checks
            const title = doc.querySelector("title")?.textContent || "";
            checks.push({
                id: "title",
                category: "content",
                label: "Title Tag",
                status: !title ? "error" : title.length < 30 || title.length > 60 ? "warn" : "ok",
                message: !title
                    ? "Missing title tag"
                    : title.length < 30
                        ? "Title is too short (<30 chars)"
                        : title.length > 60
                            ? "Title is too long (>60 chars)"
                            : "Ideal title length",
                details: title || "Not found"
            });

            const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
            checks.push({
                id: "description",
                category: "content",
                label: "Meta Description",
                status: !description ? "error" : description.length < 120 || description.length > 160 ? "warn" : "ok",
                message: !description
                    ? "Missing meta description"
                    : description.length < 120
                        ? "Description is too short (<120 chars)"
                        : description.length > 160
                            ? "Description is too long (>160 chars)"
                            : "Ideal description length",
                details: description || "Not found"
            });

            const h1s = doc.querySelectorAll("h1");
            checks.push({
                id: "h1",
                category: "content",
                label: "H1 Heading",
                status: h1s.length === 0 ? "error" : h1s.length > 1 ? "warn" : "ok",
                message: h1s.length === 0
                    ? "Missing H1 tag"
                    : h1s.length > 1
                        ? `Found ${h1s.length} H1 tags (should be 1)`
                        : "Perfect, single H1 tag",
                details: h1s[0]?.textContent || "None"
            });

            // 2. Meta & Technical
            const viewport = doc.querySelector('meta[name="viewport"]');
            checks.push({
                id: "viewport",
                category: "meta",
                label: "Viewport Tag",
                status: !!viewport ? "ok" : "error",
                message: !!viewport ? "Responsive viewport configured" : "Missing viewport tag (mobile unfriendly)",
            });

            const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
            checks.push({
                id: "canonical",
                category: "meta",
                label: "Canonical URL",
                status: !!canonical ? "ok" : "warn",
                message: !!canonical ? "Canonical link is present" : "Missing canonical link",
                details: canonical || "None"
            });

            const lang = doc.querySelector("html")?.getAttribute("lang") || "";
            checks.push({
                id: "lang",
                category: "meta",
                label: "Language Attribute",
                status: !!lang ? "ok" : "error",
                message: !!lang ? `Language set to: ${lang}` : "Missing lang attribute on <html>",
            });

            const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
            checks.push({
                id: "robots",
                category: "meta",
                label: "Robots Tag",
                status: !!robots ? "ok" : "info",
                message: !!robots ? `Robots: ${robots}` : "No robots meta tag (defaults to index, follow)",
                details: robots || "Not found"
            });

            const charset = doc.querySelector('meta[charset]') || doc.querySelector('meta[http-equiv="Content-Type"]');
            checks.push({
                id: "charset",
                category: "meta",
                label: "Character Set",
                status: !!charset ? "ok" : "error",
                message: !!charset ? "Charset is defined" : "Missing character set definition",
            });

            // 3. Social Media
            const ogTitle = doc.querySelector('meta[property="og:title"]');
            const ogDesc = doc.querySelector('meta[property="og:description"]');
            const ogImage = doc.querySelector('meta[property="og:image"]');
            const socialCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
            checks.push({
                id: "social-og",
                category: "social",
                label: "Open Graph Tags",
                status: socialCount === 3 ? "ok" : socialCount > 0 ? "warn" : "error",
                message: socialCount === 3
                    ? "All essential OG tags present"
                    : socialCount > 0
                        ? "Some Open Graph tags are missing"
                        : "No Open Graph tags found",
            });

            const twitterCard = doc.querySelector('meta[name="twitter:card"]');
            checks.push({
                id: "social-twitter",
                category: "social",
                label: "Twitter Cards",
                status: !!twitterCard ? "ok" : "warn",
                message: !!twitterCard ? "Twitter card configured" : "Twitter card tags missing",
            });

            // 4. Other
            const images = doc.querySelectorAll("img");
            const missingAlt = Array.from(images).filter(img => !img.alt).length;
            checks.push({
                id: "images-alt",
                category: "other",
                label: "Image Alt Text",
                status: images.length === 0 ? "info" : missingAlt === 0 ? "ok" : "warn",
                message: images.length === 0
                    ? "No images found to check"
                    : missingAlt === 0
                        ? "All images have alt text"
                        : `${missingAlt} image(s) missing alt text`,
                details: `Total images: ${images.length}`
            });

            // Calculate score
            const scoreWeight = { ok: 10, warn: 5, error: 0, info: 10 };
            const totalPossible = checks.length * 10;
            const actualScore = checks.reduce((sum, check) => sum + scoreWeight[check.status], 0);
            const score = Math.round((actualScore / totalPossible) * 100);

            setResults({
                score,
                checks,
                metadata: {
                    title,
                    description,
                    canonical,
                    lang
                }
            });
        } catch (err: any) {
            setError(err.message || "Failed to conduct SEO audit");
        } finally {
            setLoading(false);
        }
    }, [appUrl]);

    useEffect(() => {
        runAudit();
    }, [runAudit]);

    if (!appUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-4">
                <div className="p-4 rounded-full bg-muted/30">
                    <Globe size={48} className="opacity-20" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">No Active Session</h3>
                    <p className="text-sm max-w-xs mx-auto">Start your application to begin analyzing SEO performance and search visibility.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[var(--background-darkest)]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Gauge size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">SEO Analyzer</h2>
                        <p className="text-xs text-muted-foreground">Search engine optimization and visibility report</p>
                    </div>
                </div>
                <button
                    onClick={runAudit}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    {loading ? "Analyzing..." : "Refresh Audit"}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive flex gap-3"
                        >
                            <AlertTriangle size={20} className="shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm">Audit Failed</h4>
                                <p className="text-xs opacity-80">{error}</p>
                            </div>
                        </motion.div>
                    ) : results ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            {/* Score Overview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1 p-6 rounded-2xl bg-background border border-border flex flex-col items-center justify-center text-center space-y-4 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-20" />
                                    <div className="relative">
                                        <svg className="w-32 h-32 transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                className="text-muted/10"
                                            />
                                            <motion.circle
                                                cx="64"
                                                cy="64"
                                                r="58"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={364.4}
                                                initial={{ strokeDashoffset: 364.4 }}
                                                animate={{ strokeDashoffset: 364.4 - (364.4 * results.score) / 100 }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={cn(
                                                    results.score >= 90 ? "text-green-500" : results.score >= 70 ? "text-amber-500" : "text-red-500"
                                                )}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black tracking-tighter">{results.score}</span>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Score</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Vital Performance</h3>
                                        <p className="text-xs text-muted-foreground">Based on {results.checks.length} critical SEO checks</p>
                                    </div>
                                </div>

                                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                    <StatCard
                                        label="Content"
                                        count={results.checks.filter(c => c.category === 'content' && c.status === 'ok').length}
                                        total={results.checks.filter(c => c.category === 'content').length}
                                        icon={<FileText size={16} />}
                                    />
                                    <StatCard
                                        label="Technical"
                                        count={results.checks.filter(c => c.category === 'meta' && c.status === 'ok').length}
                                        total={results.checks.filter(c => c.category === 'meta').length}
                                        icon={<Layout size={16} />}
                                    />
                                    <StatCard
                                        label="Social"
                                        count={results.checks.filter(c => c.category === 'social' && c.status === 'ok').length}
                                        total={results.checks.filter(c => c.category === 'social').length}
                                        icon={<Share2 size={16} />}
                                    />
                                    <StatCard
                                        label="Others"
                                        count={results.checks.filter(c => c.category === 'other' && c.status === 'ok').length}
                                        total={results.checks.filter(c => c.category === 'other').length}
                                        icon={<Info size={16} />}
                                    />
                                </div>
                            </div>

                            {/* Categorized Audits */}
                            <div className="space-y-6 pb-12">
                                <AuditSection
                                    title="Content Visibility"
                                    checks={results.checks.filter(c => c.category === 'content')}
                                />
                                <AuditSection
                                    title="Technical & Meta"
                                    checks={results.checks.filter(c => c.category === 'meta')}
                                />
                                <AuditSection
                                    title="Social & Graph"
                                    checks={results.checks.filter(c => c.category === 'social')}
                                />
                                <AuditSection
                                    title="Accessibility & Assets"
                                    checks={results.checks.filter(c => c.category === 'other')}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                            <RefreshCw size={32} className="animate-spin text-muted-foreground mb-4 opacity-50 transition-all" />
                            <p className="text-muted-foreground font-medium">Running diagnostic audit...</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const StatCard = ({ label, count, total, icon }: { label: string; count: number; total: number; icon: React.ReactNode }) => {
    const percentage = (count / total) * 100;
    return (
        <div className="p-4 rounded-xl bg-background border border-border shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-muted text-muted-foreground">
                    {icon}
                </div>
                <span className="text-xs font-bold">{count}/{total}</span>
            </div>
            <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{label}</h4>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={cn(
                            "h-full rounded-full",
                            percentage >= 90 ? "bg-green-500" : percentage >= 50 ? "bg-amber-500" : "bg-red-500"
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

const AuditSection = ({ title, checks }: { title: string; checks: SeoCheck[] }) => {
    if (checks.length === 0) return null;
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60 px-1">{title}</h3>
            <div className="space-y-2">
                {checks.map((check, idx) => (
                    <AuditItem key={check.id} check={check} index={idx} />
                ))}
            </div>
        </div>
    );
};

const AuditItem = ({ check, index }: { check: SeoCheck; index: number }) => {
    const [expanded, setExpanded] = useState(false);

    const statusColors = {
        ok: "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400",
        warn: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
        error: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
        info: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400"
    };

    const StatusIcon = {
        ok: <CheckCircle size={16} />,
        warn: <AlertTriangle size={16} />,
        error: <AlertTriangle size={16} />,
        info: <Info size={16} />
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
                "group rounded-xl border border-border bg-background transition-all hover:shadow-md overflow-hidden",
                expanded && "ring-1 ring-primary/20 bg-background/80"
            )}
        >
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-full border", statusColors[check.status])}>
                        {StatusIcon[check.status]}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{check.label}</h4>
                        <p className="text-xs text-muted-foreground">{check.message}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {check.details && !expanded && (
                        <span className="text-[10px] font-mono bg-muted px-2 py-1 rounded text-muted-foreground truncate max-w-[150px] hidden md:block">
                            {check.details}
                        </span>
                    )}
                    <motion.div
                        animate={{ rotate: expanded ? 90 : 0 }}
                        className="text-muted-foreground"
                    >
                        <ChevronRight size={16} />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border bg-muted/20"
                    >
                        <div className="p-4 space-y-3">
                            {check.details && (
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Extracted Content</span>
                                    <div className="p-3 rounded-lg bg-background border border-border font-mono text-xs break-all leading-relaxed shadow-inner">
                                        {check.details}
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-muted-foreground italic">Check ID: {check.id}</span>
                                <button className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                                    LEARN MORE <ExternalLink size={10} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
