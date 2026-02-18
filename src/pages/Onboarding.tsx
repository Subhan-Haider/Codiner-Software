import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, Rocket, Shield, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
    "Welcome",
    "Terms",
    "Features",
    "Installation",
    "Ready"
];

const LANGUAGES = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "jp", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
];

const FEATURES = [
    { id: "core", name: "Core App", description: "The essential Codiner experience", required: true },
    { id: "auto-updates", name: "Auto Updates", description: "Automatically download and install updates on restart", required: false, default: true },
    { id: "cloud-sync", name: "Cloud Sync", description: "Sync your projects across devices", required: false, default: true },
    { id: "dev-tools", name: "Developer Tools", description: "Advanced debugging and performance metrics", required: false, default: false },
];

export default function Onboarding() {
    const navigate = useNavigate();
    const { settings, updateSettings } = useSettings();
    const [currentStep, setCurrentStep] = useState(0);
    const [language, setLanguage] = useState("en");
    const [agreed, setAgreed] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
        FEATURES.filter(f => f.required || f.default).map(f => f.id)
    );
    const [installProgress, setInstallProgress] = useState(0);
    const [installStatus, setInstallStatus] = useState("Preparing files...");

    // Auto-detect language
    useEffect(() => {
        const browserLang = navigator.language.split("-")[0];
        if (LANGUAGES.some(l => l.code === browserLang)) {
            setLanguage(browserLang);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < STAGES.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = async () => {
        await updateSettings({
            hasCompletedOnboarding: true,
            enableAutoUpdate: selectedFeatures.includes("auto-updates"),
            // Add other feature-related settings here if they exist
        });
        navigate({ to: "/" });
    };

    // Installation simulation
    useEffect(() => {
        if (currentStep === 3) {
            const interval = setInterval(() => {
                setInstallProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setCurrentStep(4), 500);
                        return 100;
                    }
                    const next = prev + Math.random() * 15;

                    if (next > 70) setInstallStatus("Finalizing setup...");
                    else if (next > 30) setInstallStatus("Installing components...");


                    return Math.min(next, 100);
                });
            }, 600);
            return () => clearInterval(interval);
        }
    }, [currentStep]);

    const progress = ((currentStep + 1) / STAGES.length) * 100;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30 backdrop-blur-sm">
            <div className="w-full max-w-2xl relative">
                {/* Progress indicator */}
                <div className="absolute -top-12 left-0 w-full px-2">
                    <div className="flex justify-between mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <span>Step {currentStep + 1} of {STAGES.length}</span>
                        <span>{STAGES[currentStep]}</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="shadow-2xl border-border/50 bg-background/95 backdrop-blur-sm overflow-hidden">
                            <CardContent className="pt-8 pb-8 px-8 sm:px-12">

                                {/* Step 1: Welcome */}
                                {currentStep === 0 && (
                                    <div className="text-center space-y-6 py-4">
                                        <div className="flex justify-center mb-4">
                                            <div className="p-4 rounded-3xl bg-primary/10 text-primary shadow-inner">
                                                <Rocket size={64} className="animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h1 className="text-4xl font-bold tracking-tight">Codiner</h1>
                                            <p className="text-xl text-muted-foreground font-medium italic">Build the future, faster.</p>
                                        </div>
                                        <p className="text-lg text-foreground/80">Welcome! Let's get everything ready for your first project.</p>

                                        <div className="bg-muted/30 border border-border/50 rounded-xl p-4 text-sm text-muted-foreground">
                                            <p className="mb-2">
                                                <strong className="text-foreground">Open Source:</strong> Install from{" "}
                                                <a
                                                    href="https://github.com/Subhan-Haider/Codiner-Software"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    GitHub
                                                </a>
                                            </p>
                                            <p>
                                                <strong className="text-foreground">Need Help?</strong> File issues or contribute on our{" "}
                                                <a
                                                    href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline font-medium"
                                                >
                                                    GitHub repository
                                                </a>
                                            </p>
                                        </div>

                                        <Button size="lg" onClick={handleNext} className="px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-primary/20 transition-all">
                                            Get Started <ChevronRight className="ml-2" />
                                        </Button>
                                    </div>
                                )}



                                {/* Step 2: Terms */}
                                {currentStep === 1 && (
                                    <div className="space-y-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <Shield size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold">Terms & Conditions</h2>
                                        </div>
                                        <ScrollArea className="h-64 w-full rounded-xl border bg-muted/20 p-6 text-sm text-muted-foreground leading-relaxed">
                                            <div className="space-y-4">
                                                <h3 className="font-bold text-foreground">1. Acceptance of Terms</h3>
                                                <p>By using Codiner, you agree to these terms. Please read them carefully before proceeding.</p>
                                                <h3 className="font-bold text-foreground">2. Privacy & Data</h3>
                                                <p>We value your privacy. Your local files remain private and are only processed locally unless you explicitly opt into cloud features.</p>
                                                <h3 className="font-bold text-foreground">3. Open Source</h3>
                                                <p>Codiner is an open-source project. You are free to use it for personal and commercial projects under the MIT License.</p>
                                                <h3 className="font-bold text-foreground">4. No Warranty</h3>
                                                <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY.</p>
                                                <p>... additional terms content would go here ...</p>
                                            </div>
                                        </ScrollArea>
                                        <div className="flex items-center space-x-2 bg-muted/20 p-4 rounded-xl border border-border/50 transition-colors hover:bg-muted/30">
                                            <Checkbox
                                                id="terms"
                                                checked={agreed}
                                                onCheckedChange={(checked) => setAgreed(checked === true)}
                                                className="w-5 h-5 rounded-md"
                                            />
                                            <label htmlFor="terms" className="text-sm font-medium cursor-pointer select-none">
                                                I agree to the Terms & Conditions and Privacy Policy
                                            </label>
                                        </div>
                                        <div className="pt-2 flex justify-end space-x-3">
                                            <Button variant="ghost" onClick={handleBack}>Back</Button>
                                            <Button onClick={handleNext} disabled={!agreed} className="rounded-lg px-6 shadow-md transition-all">
                                                Accept & Continue <ChevronRight className="ml-1" size={18} />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Features */}
                                {currentStep === 2 && (
                                    <div className="space-y-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                <Puzzle size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold">Customize Features</h2>
                                        </div>
                                        <p className="text-muted-foreground">Select the optional components you'd like to enable.</p>

                                        <div className="space-y-3 mt-4">
                                            {FEATURES.map((feature) => (
                                                <div
                                                    key={feature.id}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 rounded-xl border transition-all",
                                                        selectedFeatures.includes(feature.id)
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:bg-muted/30"
                                                    )}
                                                    onClick={() => {
                                                        if (feature.required) return;
                                                        setSelectedFeatures(prev =>
                                                            prev.includes(feature.id)
                                                                ? prev.filter(id => id !== feature.id)
                                                                : [...prev, feature.id]
                                                        );
                                                    }}
                                                >
                                                    <div className="space-y-0.5">
                                                        <div className="font-semibold flex items-center">
                                                            {feature.name}
                                                            {feature.required && (
                                                                <span className="ml-2 text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground uppercase">Required</span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                                                    </div>
                                                    <Checkbox
                                                        checked={selectedFeatures.includes(feature.id)}
                                                        disabled={feature.required}
                                                        className="w-5 h-5 rounded-md"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 flex justify-end space-x-3">
                                            <Button variant="ghost" onClick={handleBack}>Back</Button>
                                            <Button onClick={handleNext} className="rounded-lg px-6 shadow-md">Start Installation <ChevronRight className="ml-1" size={18} /></Button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Installation */}
                                {currentStep === 3 && (
                                    <div className="text-center py-12 space-y-8">
                                        <div className="space-y-3">
                                            <h2 className="text-2xl font-bold">Setting up Codiner</h2>
                                            <p className="text-muted-foreground">This will only take a moment. Preparing your workspace...</p>
                                        </div>

                                        <div className="max-w-md mx-auto space-y-4">
                                            <Progress value={installProgress} className="h-4 shadow-inner" />
                                            <div className="flex justify-between items-center px-1">
                                                <div className="flex items-center text-sm font-medium text-muted-foreground">
                                                    <Loader2 className="mr-2 animate-spin" size={16} />
                                                    {installStatus}
                                                </div>
                                                <span className="text-sm font-bold text-primary">{Math.round(installProgress)}%</span>
                                            </div>
                                        </div>

                                        <div className="mt-8 p-4 bg-muted/40 rounded-xl border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground italic">
                                            Did you know? Codiner uses local LLMs to keep your code private.
                                        </div>
                                    </div>
                                )}

                                {/* Step 5: Ready */}
                                {currentStep === 4 && (
                                    <div className="text-center py-8 space-y-8">
                                        <div className="flex justify-center">
                                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                                                <CheckCircle2 size={64} className="animate-bounce" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <h2 className="text-3xl font-extrabold tracking-tight">Setup Complete!</h2>
                                            <p className="text-xl text-muted-foreground font-medium">Your coding assistant is ready to launch.</p>
                                        </div>
                                        <div className="pt-4">
                                            <Button size="lg" onClick={handleFinish} className="px-12 py-7 text-xl rounded-2xl shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1 transition-all">
                                                Launch Codiner
                                            </Button>
                                        </div>
                                        <p className="text-sm text-muted-foreground pt-4">You can always change your preferences in the Settings panel.</p>
                                    </div>
                                )}

                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
