/**
 * Code Review Bot UI Component
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
    Shield,
    Zap,
    CheckCircle,
    AlertTriangle,
    AlertCircle,
    Info,
    Eye,
    RefreshCw,
} from "lucide-react";

interface ReviewIssue {
    severity: "critical" | "high" | "medium" | "low" | "info";
    category: "quality" | "security" | "performance" | "best-practice" | "style";
    line?: number;
    message: string;
    suggestion?: string;
    code?: string;
}

interface CodeReview {
    file: string;
    language: string;
    issues: ReviewIssue[];
    score: number;
    summary: string;
    timestamp: Date;
}

interface CodeReviewBotProps {
    filePath: string;
    fileName?: string;
    autoReviewEnabled?: boolean;
}

export function CodeReviewBot({
    filePath,
    fileName = "File",
    autoReviewEnabled = false,
}: CodeReviewBotProps) {
    const [review, setReview] = useState<CodeReview | null>(null);
    const [loading, setLoading] = useState(false);
    const [autoReview, setAutoReview] = useState(autoReviewEnabled);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Listen for auto-review results
        const handleAutoReview = (data: { filePath: string; review: CodeReview }) => {
            if (data.filePath === filePath) {
                setReview(data.review);
            }
        };

        window.electron.ipcRenderer.on("code-review:auto-review-complete", handleAutoReview);

        return () => {
            window.electron.ipcRenderer.removeListener(
                "code-review:auto-review-complete",
                handleAutoReview
            );
        };
    }, [filePath]);

    const handleReview = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await window.electron.ipcRenderer.invoke(
                "code-review:review-file",
                filePath,
                true
            );

            if (result.success) {
                setReview(result.review);
            } else {
                setError(result.error || "Review failed");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoReview = async (enabled: boolean) => {
        try {
            if (enabled) {
                await window.electron.ipcRenderer.invoke(
                    "code-review:enable-auto-review",
                    filePath
                );
            } else {
                await window.electron.ipcRenderer.invoke(
                    "code-review:disable-auto-review",
                    filePath
                );
            }
            setAutoReview(enabled);
        } catch (error) {
            console.error("Failed to toggle auto-review:", error);
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "critical":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            case "high":
                return <AlertTriangle className="h-4 w-4 text-orange-500" />;
            case "medium":
                return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
            case "low":
                return <Info className="h-4 w-4 text-blue-500" />;
            default:
                return <Info className="h-4 w-4 text-gray-500" />;
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical":
                return "bg-red-500";
            case "high":
                return "bg-orange-500";
            case "medium":
                return "bg-yellow-500";
            case "low":
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "security":
                return <Shield className="h-3 w-3" />;
            case "performance":
                return <Zap className="h-3 w-3" />;
            case "quality":
                return <CheckCircle className="h-3 w-3" />;
            default:
                return <Eye className="h-3 w-3" />;
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-green-500";
        if (score >= 75) return "text-blue-500";
        if (score >= 60) return "text-yellow-500";
        if (score >= 40) return "text-orange-500";
        return "text-red-500";
    };

    const issuesByCategory = review?.issues.reduce((acc, issue) => {
        if (!acc[issue.category]) acc[issue.category] = [];
        acc[issue.category].push(issue);
        return acc;
    }, {} as Record<string, ReviewIssue[]>);

    return (
        <div className="space-y-4">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Code Review Bot
                        </div>
                        {review && (
                            <div className={`text-3xl font-bold ${getScoreColor(review.score)}`}>
                                {review.score}/100
                            </div>
                        )}
                    </CardTitle>
                    <CardDescription>
                        AI-powered code review for {fileName}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={autoReview}
                                onCheckedChange={handleToggleAutoReview}
                            />
                            <span className="text-sm">Auto-review on save</span>
                        </div>
                        <Button
                            onClick={handleReview}
                            disabled={loading}
                            size="sm"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Reviewing...
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Review Now
                                </>
                            )}
                        </Button>
                    </div>

                    {review && (
                        <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>{review.summary}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Error */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Score Breakdown */}
            {review && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Overall Quality</span>
                                <span className={`font-bold ${getScoreColor(review.score)}`}>
                                    {review.score}%
                                </span>
                            </div>
                            <Progress value={review.score} className="h-2" />

                            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-3 w-3 text-red-500" />
                                    <span>Security: {review.issues.filter(i => i.category === "security").length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="h-3 w-3 text-yellow-500" />
                                    <span>Performance: {review.issues.filter(i => i.category === "performance").length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-blue-500" />
                                    <span>Quality: {review.issues.filter(i => i.category === "quality").length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-3 w-3 text-purple-500" />
                                    <span>Best Practices: {review.issues.filter(i => i.category === "best-practice").length}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Issues */}
            {review && review.issues.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">
                            Issues Found ({review.issues.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {review.issues.map((issue, index) => (
                            <div
                                key={index}
                                className="p-3 border rounded-lg space-y-2"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        {getSeverityIcon(issue.severity)}
                                        <Badge className={getSeverityColor(issue.severity)}>
                                            {issue.severity}
                                        </Badge>
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            {getCategoryIcon(issue.category)}
                                            {issue.category}
                                        </Badge>
                                        {issue.line && (
                                            <span className="text-xs text-muted-foreground">
                                                Line {issue.line}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm font-medium">{issue.message}</p>

                                {issue.code && (
                                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                        <code>{issue.code}</code>
                                    </pre>
                                )}

                                {issue.suggestion && (
                                    <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 p-2 rounded">
                                        <span className="font-semibold">💡 Suggestion: </span>
                                        {issue.suggestion}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* No Issues */}
            {review && review.issues.length === 0 && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        No issues found! Your code looks great! 🎉
                    </AlertDescription>
                </Alert>
            )}

            {/* Features */}
            {!review && !loading && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">What Gets Checked</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Shield className="h-4 w-4 text-red-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Security</p>
                                    <p className="text-xs text-muted-foreground">
                                        XSS, SQL injection, hardcoded secrets
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Performance</p>
                                    <p className="text-xs text-muted-foreground">
                                        Inefficient code, memory leaks
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Code Quality</p>
                                    <p className="text-xs text-muted-foreground">
                                        Complexity, maintainability, smells
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <Eye className="h-4 w-4 text-purple-500 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Best Practices</p>
                                    <p className="text-xs text-muted-foreground">
                                        Conventions, patterns, standards
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
