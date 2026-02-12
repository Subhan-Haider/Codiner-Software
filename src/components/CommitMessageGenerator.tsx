/**
 * AI Commit Message Generator UI Component
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, RefreshCw, Check, AlertCircle, FileCode } from "lucide-react";

interface CommitMessageSuggestion {
    message: string;
    type: string;
    scope?: string;
    description: string;
    confidence: number;
}

interface GitDiff {
    file: string;
    additions: number;
    deletions: number;
}

interface CommitMessageGeneratorProps {
    projectPath: string;
    onCommitMessageSelect?: (message: string) => void;
}

export function CommitMessageGenerator({
    projectPath,
    onCommitMessageSelect,
}: CommitMessageGeneratorProps) {
    const [suggestions, setSuggestions] = useState<CommitMessageSuggestion[]>([]);
    const [selectedMessage, setSelectedMessage] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [stagedFiles, setStagedFiles] = useState<GitDiff[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validation, setValidation] = useState<{
        valid: boolean;
        errors: string[];
    } | null>(null);

    useEffect(() => {
        loadStagedFiles();
    }, [projectPath]);

    const loadStagedFiles = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke(
                "git:get-staged-files",
                projectPath
            );

            if (result.success) {
                setStagedFiles(result.files);
            }
        } catch (error) {
            console.error("Error loading staged files:", error);
        }
    };

    const generateSuggestions = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await window.electron.ipcRenderer.invoke(
                "git:generate-commit-message",
                projectPath
            );

            if (result.success) {
                setSuggestions(result.suggestions);
                if (result.suggestions.length > 0) {
                    setSelectedMessage(result.suggestions[0].message);
                    setCustomMessage(result.suggestions[0].message);
                }
            } else {
                setError(result.error || "Failed to generate commit message");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const validateMessage = async (message: string) => {
        try {
            const result = await window.electron.ipcRenderer.invoke(
                "git:validate-commit-message",
                message
            );

            if (result.success) {
                setValidation(result.validation);
            }
        } catch (error) {
            console.error("Error validating message:", error);
        }
    };

    const handleMessageChange = (message: string) => {
        setCustomMessage(message);
        validateMessage(message);
    };

    const handleSelectSuggestion = (suggestion: CommitMessageSuggestion) => {
        setSelectedMessage(suggestion.message);
        setCustomMessage(suggestion.message);
        validateMessage(suggestion.message);
        onCommitMessageSelect?.(suggestion.message);
    };

    const handleUseMessage = () => {
        onCommitMessageSelect?.(customMessage);
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            feat: "bg-green-500",
            fix: "bg-red-500",
            docs: "bg-blue-500",
            style: "bg-purple-500",
            refactor: "bg-yellow-500",
            perf: "bg-orange-500",
            test: "bg-cyan-500",
            build: "bg-gray-500",
            ci: "bg-indigo-500",
            chore: "bg-slate-500",
        };
        return colors[type] || "bg-gray-500";
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return "text-green-500";
        if (confidence >= 0.6) return "text-yellow-500";
        return "text-red-500";
    };

    if (stagedFiles.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        AI Commit Message
                    </CardTitle>
                    <CardDescription>
                        No staged changes found. Stage files to generate commit messages.
                    </CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Staged Files Summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                        <FileCode className="h-4 w-4" />
                        Staged Changes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1 text-sm">
                        {stagedFiles.slice(0, 5).map((file) => (
                            <div key={file.file} className="flex items-center justify-between">
                                <span className="text-muted-foreground truncate flex-1">
                                    {file.file}
                                </span>
                                <span className="text-xs ml-2">
                                    <span className="text-green-500">+{file.additions}</span>
                                    {" / "}
                                    <span className="text-red-500">-{file.deletions}</span>
                                </span>
                            </div>
                        ))}
                        {stagedFiles.length > 5 && (
                            <p className="text-xs text-muted-foreground">
                                +{stagedFiles.length - 5} more files
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
                onClick={generateSuggestions}
                disabled={loading}
                className="w-full"
                size="lg"
            >
                {loading ? (
                    <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Commit Message
                    </>
                )}
            </Button>

            {/* Error */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectSuggestion(suggestion)}
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedMessage === suggestion.message
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50"
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className={getTypeColor(suggestion.type)}>
                                                {suggestion.type}
                                            </Badge>
                                            {suggestion.scope && (
                                                <Badge variant="outline">{suggestion.scope}</Badge>
                                            )}
                                            <span
                                                className={`text-xs ${getConfidenceColor(suggestion.confidence)}`}
                                            >
                                                {Math.round(suggestion.confidence * 100)}%
                                            </span>
                                        </div>
                                        <p className="text-sm font-mono break-all">
                                            {suggestion.message}
                                        </p>
                                    </div>
                                    {selectedMessage === suggestion.message && (
                                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Custom Message Editor */}
            {suggestions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Edit Message</CardTitle>
                        <CardDescription>
                            Customize the commit message or write your own
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Textarea
                            value={customMessage}
                            onChange={(e) => handleMessageChange(e.target.value)}
                            placeholder="feat(scope): description"
                            className="font-mono text-sm"
                            rows={3}
                        />

                        {/* Validation */}
                        {validation && !validation.valid && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    <ul className="list-disc list-inside text-xs">
                                        {validation.errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        {validation && validation.valid && (
                            <Alert>
                                <Check className="h-4 w-4" />
                                <AlertDescription className="text-xs">
                                    Valid conventional commit message ✓
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            onClick={handleUseMessage}
                            disabled={!validation?.valid}
                            className="w-full"
                        >
                            <Check className="h-4 w-4 mr-2" />
                            Use This Message
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Format Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Conventional Commits Format</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground space-y-2">
                        <p className="font-mono">
                            &lt;type&gt;(&lt;scope&gt;): &lt;description&gt;
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="font-semibold">Types:</p>
                                <ul className="list-disc list-inside">
                                    <li>feat - New feature</li>
                                    <li>fix - Bug fix</li>
                                    <li>docs - Documentation</li>
                                    <li>style - Formatting</li>
                                    <li>refactor - Code restructure</li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold">Examples:</p>
                                <ul className="list-disc list-inside font-mono text-xs">
                                    <li>feat(auth): add login</li>
                                    <li>fix(api): handle errors</li>
                                    <li>docs: update README</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
