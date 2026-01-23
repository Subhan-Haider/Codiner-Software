import { useAtomValue } from "jotai";
import { appUrlAtom } from "@/atoms/appAtoms";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Info, RefreshCw } from "lucide-react";
import { IpcClient } from "@/ipc/ipc_client";

interface A11yResult {
    images: { total: number; missingAlt: number; status: "ok" | "warn" | "error"; message: string };
    labels: { total: number; missingLabels: number; status: "ok" | "warn" | "error"; message: string };
    headingStructure: { status: "ok" | "warn" | "error"; message: string; details: string };
    ariaLabels: { total: number; withAria: number; status: "ok" | "warn" | "error" | "info"; message: string };
    colorContrast: { status: "ok" | "warn" | "info"; message: string };
    lang: { hasLang: boolean; status: "ok" | "error"; message: string };
}

export const AccessibilityAudit = () => {
    const { appUrl } = useAtomValue(appUrlAtom);
    const [results, setResults] = useState<A11yResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runAudit = async () => {
        if (!appUrl) return;
        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const text = await IpcClient.getInstance().fetchAppUrl(appUrl);
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");

            // Check images
            const images = doc.querySelectorAll("img");
            const missingAlt = Array.from(images).filter(img => !img.alt || img.alt.trim() === "").length;

            // Check form labels
            const inputs = doc.querySelectorAll("input, select, textarea");
            const missingLabels = Array.from(inputs).filter(input => {
                const id = input.id;
                if (!id) return true;
                const label = doc.querySelector(`label[for="${id}"]`);
                return !label && !input.getAttribute("aria-label");
            }).length;

            // Check heading structure
            const h1s = doc.querySelectorAll("h1");
            const h2s = doc.querySelectorAll("h2");
            const h3s = doc.querySelectorAll("h3");
            let headingStatus: "ok" | "warn" | "error" = "ok";
            let headingMessage = "Proper heading hierarchy";
            let headingDetails = `H1: ${h1s.length}, H2: ${h2s.length}, H3: ${h3s.length}`;

            if (h1s.length === 0) {
                headingStatus = "error";
                headingMessage = "Missing H1 heading";
            } else if (h1s.length > 1) {
                headingStatus = "warn";
                headingMessage = "Multiple H1 headings found";
            }

            // Check ARIA labels
            const ariaElements = doc.querySelectorAll("[aria-label], [aria-labelledby], [role]");

            // Check lang attribute
            const htmlElement = doc.querySelector("html");
            const hasLang = !!htmlElement?.getAttribute("lang");

            const audit: A11yResult = {
                images: {
                    total: images.length,
                    missingAlt,
                    status: missingAlt === 0 ? "ok" : missingAlt > images.length / 2 ? "error" : "warn",
                    message: missingAlt === 0 ? "All images have alt text" : `${missingAlt} image(s) missing alt text`,
                },
                labels: {
                    total: inputs.length,
                    missingLabels,
                    status: missingLabels === 0 ? "ok" : missingLabels > inputs.length / 2 ? "error" : "warn",
                    message: missingLabels === 0 ? "All inputs have labels" : `${missingLabels} input(s) missing labels`,
                },
                headingStructure: {
                    status: headingStatus,
                    message: headingMessage,
                    details: headingDetails,
                },
                ariaLabels: {
                    total: ariaElements.length,
                    withAria: ariaElements.length,
                    status: ariaElements.length > 0 ? "ok" : "info",
                    message: ariaElements.length > 0 ? `${ariaElements.length} elements with ARIA attributes` : "No ARIA attributes found",
                },
                colorContrast: {
                    status: "info",
                    message: "Manual color contrast testing recommended",
                },
                lang: {
                    hasLang,
                    status: hasLang ? "ok" : "error",
                    message: hasLang ? `Language set: ${htmlElement?.getAttribute("lang")}` : "Missing lang attribute on <html>",
                },
            };

            setResults(audit);
        } catch (err: any) {
            setError(err.message || "Failed to run audit");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        runAudit();
    }, [appUrl]);

    if (!appUrl) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                App is not running. Start the app to audit accessibility.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Accessibility Audit</h2>
                <button
                    onClick={runAudit}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Run Audit
                </button>
            </div>

            {error && (
                <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-md border border-red-200 dark:border-red-900 flex gap-2">
                    <AlertTriangle size={16} />
                    {error}
                </div>
            )}

            {results && (
                <div className="space-y-4">
                    <AuditItem
                        label="Image Alt Text"
                        status={results.images.status}
                        message={results.images.message}
                        details={`Total images: ${results.images.total}`}
                    />
                    <AuditItem
                        label="Form Labels"
                        status={results.labels.status}
                        message={results.labels.message}
                        details={`Total inputs: ${results.labels.total}`}
                    />
                    <AuditItem
                        label="Heading Structure"
                        status={results.headingStructure.status}
                        message={results.headingStructure.message}
                        details={results.headingStructure.details}
                    />
                    <AuditItem
                        label="ARIA Attributes"
                        status={results.ariaLabels.status}
                        message={results.ariaLabels.message}
                        details={`Elements with ARIA: ${results.ariaLabels.withAria}`}
                    />
                    <AuditItem
                        label="Language Attribute"
                        status={results.lang.status}
                        message={results.lang.message}
                        details={results.lang.hasLang ? "Helps screen readers" : "Required for accessibility"}
                    />
                    <AuditItem
                        label="Color Contrast"
                        status={results.colorContrast.status}
                        message={results.colorContrast.message}
                        details="Use browser DevTools for detailed analysis"
                    />
                </div>
            )}
        </div>
    );
};

const AuditItem = ({
    label,
    status,
    message,
    details,
}: {
    label: string;
    status: "ok" | "warn" | "error" | "info";
    message: string;
    details?: string;
}) => {
    const statusColor =
        status === "ok"
            ? "text-green-500"
            : status === "warn"
                ? "text-amber-500"
                : status === "error"
                    ? "text-red-500"
                    : "text-blue-500";

    const Icon = status === "ok" ? CheckCircle : status === "info" ? Info : AlertTriangle;

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-border shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</h3>
                    <p className={`text-sm mt-1 font-medium ${statusColor} flex items-center gap-1.5`}>
                        <Icon size={14} />
                        {message}
                    </p>
                </div>
                <div className="text-right max-w-xs">
                    <code className="text-xs bg-gray-100 dark:bg-gray-950 px-2 py-1 rounded text-muted-foreground block truncate">
                        {details}
                    </code>
                </div>
            </div>
        </div>
    );
};
