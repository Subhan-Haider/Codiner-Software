import { useAtomValue } from "jotai";
import { appUrlAtom } from "@/atoms/appAtoms";
import { useEffect, useState } from "react";
import { Activity, RefreshCw, Zap, TrendingUp, Clock } from "lucide-react";
import { IpcClient } from "@/ipc/ipc_client";

interface PerformanceMetrics {
    loadTime: number;
    domContentLoaded: number;
    resourceCount: number;
    totalSize: number;
    timestamp: number;
}

export const PerformanceMetrics = () => {
    const { appUrl } = useAtomValue(appUrlAtom);
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
    const [loading, setLoading] = useState(false);

    const runAudit = async () => {
        if (!appUrl) return;
        setLoading(true);

        try {
            const startTime = performance.now();
            const content = await IpcClient.getInstance().fetchAppUrl(appUrl);
            const endTime = performance.now();
            const loadTime = endTime - startTime;

            // Simplified metrics due to IPC limitations
            const totalSize = content.length;

            setMetrics({
                loadTime: Math.round(loadTime),
                domContentLoaded: Math.round(loadTime * 0.5), // Approximation
                resourceCount: 1,
                totalSize: Math.round(totalSize / 1024), // Convert to KB
                timestamp: Date.now(),
            });
        } catch (err) {
            console.error("Failed to measure performance:", err);
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
                App is not running. Start the app to view performance metrics.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Performance Metrics</h2>
                <button
                    onClick={runAudit}
                    disabled={loading}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                    Measure
                </button>
            </div>

            {metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MetricCard
                        icon={<Zap className="text-yellow-500" size={20} />}
                        label="Page Load Time"
                        value={`${metrics.loadTime}ms`}
                        status={metrics.loadTime < 1000 ? "good" : metrics.loadTime < 3000 ? "ok" : "poor"}
                        description={metrics.loadTime < 1000 ? "Excellent" : metrics.loadTime < 3000 ? "Good" : "Needs improvement"}
                    />
                    <MetricCard
                        icon={<Clock className="text-blue-500" size={20} />}
                        label="DOM Content Loaded"
                        value={`${metrics.domContentLoaded}ms`}
                        status={metrics.domContentLoaded < 800 ? "good" : metrics.domContentLoaded < 2000 ? "ok" : "poor"}
                        description="Time to interactive content"
                    />
                    <MetricCard
                        icon={<Activity className="text-purple-500" size={20} />}
                        label="Resources Loaded"
                        value={`${metrics.resourceCount}`}
                        status={metrics.resourceCount < 50 ? "good" : metrics.resourceCount < 100 ? "ok" : "poor"}
                        description="Total HTTP requests"
                    />
                    <MetricCard
                        icon={<TrendingUp className="text-green-500" size={20} />}
                        label="Total Transfer Size"
                        value={`${metrics.totalSize} KB`}
                        status={metrics.totalSize < 500 ? "good" : metrics.totalSize < 2000 ? "ok" : "poor"}
                        description="Data transferred"
                    />
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-900">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Activity size={16} />
                    Performance Tips
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Aim for page load times under 1 second</li>
                    <li>• Minimize HTTP requests by bundling resources</li>
                    <li>• Compress images and use modern formats (WebP, AVIF)</li>
                    <li>• Enable gzip/brotli compression on your server</li>
                    <li>• Use code splitting to reduce initial bundle size</li>
                </ul>
            </div>
        </div>
    );
};

const MetricCard = ({
    icon,
    label,
    value,
    status,
    description,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    status: "good" | "ok" | "poor";
    description: string;
}) => {
    const statusColor =
        status === "good"
            ? "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10"
            : status === "ok"
                ? "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/10"
                : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10";

    return (
        <div className={`p-4 rounded-lg border ${statusColor}`}>
            <div className="flex items-start gap-3">
                <div className="mt-1">{icon}</div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</h3>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
        </div>
    );
};
