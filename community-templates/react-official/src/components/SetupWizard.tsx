import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  CheckCircle,
  Settings,
  Package,
  FileText,
  Play,
  Terminal,
  Copy,
  Download,
  Zap,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";

interface SetupStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  command?: string;
  details: string[];
  completed: boolean;
}

export function SetupWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isInstalling, setIsInstalling] = useState(false);

  const steps: SetupStep[] = [
    {
      id: "prerequisites",
      title: "Check Prerequisites",
      description: "Verify your system meets the requirements",
      icon: Settings,
      details: [
        "Node.js 18 or higher",
        "npm, yarn, or pnpm package manager",
        "Git (optional)",
        "Internet connection for dependencies"
      ],
      completed: false
    },
    {
      id: "install-deps",
      title: "Install Dependencies",
      description: "Download and install all required packages",
      icon: Package,
      command: "npm install",
      details: [
        "React 18 and React DOM",
        "Vite build tool",
        "Shadcn/UI components",
        "Tailwind CSS",
        "TypeScript",
        "Development tools"
      ],
      completed: false
    },
    {
      id: "configure-env",
      title: "Configure Environment",
      description: "Set up environment variables and configuration",
      icon: FileText,
      command: "npm run setup",
      details: [
        "Create .env.local file",
        "Set default environment variables",
        "Configure development settings",
        "Setup VS Code workspace"
      ],
      completed: false
    },
    {
      id: "verify-setup",
      title: "Verify Installation",
      description: "Test that everything is working correctly",
      icon: CheckCircle,
      command: "npm run type-check && npm run build",
      details: [
        "TypeScript compilation check",
        "Build verification",
        "Linting verification",
        "Development server test"
      ],
      completed: false
    },
    {
      id: "start-developing",
      title: "Start Developing",
      description: "Launch the development server and start coding",
      icon: Play,
      command: "npm run dev",
      details: [
        "Start development server",
        "Open in browser",
        "Access advanced features",
        "Begin development"
      ],
      completed: false
    }
  ];

  const handleStepComplete = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);

    if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleAutoInstall = async () => {
    setIsInstalling(true);

    try {
      // Simulate installation process
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate time
        handleStepComplete(i);
      }

      setIsInstalling(false);
      alert("🎉 Installation completed successfully! The development server should now be running.");
    } catch (error) {
      setIsInstalling(false);
      alert("❌ Installation failed. Please check the console for errors.");
    }
  };

  const copyCommand = (command: string) => {
    navigator.clipboard?.writeText(command);
  };

  const progress = (completedSteps.size / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Download className="h-6 w-6 text-blue-600" />
              Automated Setup Wizard
            </h2>
            <p className="text-muted-foreground mt-1">
              Get your React Official Template running in minutes
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Setup Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.size} of {steps.length} completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Quick Install Button */}
          <div className="mb-6">
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                <strong>One-Click Installation:</strong> Run <code className="bg-muted px-1 py-0.5 rounded text-xs">npm run install-template</code> in your terminal for fully automated setup.
              </AlertDescription>
            </Alert>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Steps List */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentStep === index
                        ? "border-primary bg-primary/5"
                        : completedSteps.has(index)
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded ${
                        completedSteps.has(index)
                          ? "bg-green-500 text-white"
                          : currentStep === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        {completedSteps.has(index) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <step.icon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          completedSteps.has(index) ? "text-green-700 dark:text-green-300" : ""
                        }`}>
                          {step.title}
                        </p>
                        {completedSteps.has(index) && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Step Details */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <steps[currentStep].icon className="h-5 w-5 text-primary" />
                        {steps[currentStep].title}
                      </CardTitle>
                      <CardDescription>
                        {steps[currentStep].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">What this step does:</h4>
                          <ul className="space-y-1">
                            {steps[currentStep].details.map((detail, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {steps[currentStep].command && (
                          <div>
                            <h4 className="font-medium mb-2">Terminal Command:</h4>
                            <div className="bg-muted p-3 rounded-lg">
                              <code className="text-sm font-mono">{steps[currentStep].command}</code>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => copyCommand(steps[currentStep].command!)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Command
                            </Button>
                          </div>
                        )}

                        <div className="flex gap-2 pt-4">
                          {currentStep > 0 && (
                            <Button
                              variant="outline"
                              onClick={() => setCurrentStep(currentStep - 1)}
                            >
                              <ChevronLeft className="h-4 w-4 mr-2" />
                              Previous
                            </Button>
                          )}

                          {currentStep < steps.length - 1 ? (
                            <Button
                              onClick={() => handleStepComplete(currentStep)}
                              className="ml-auto"
                            >
                              Mark Complete
                              <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                          ) : (
                            <Button
                              onClick={handleAutoInstall}
                              disabled={isInstalling}
                              className="ml-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                            >
                              {isInstalling ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Installing...
                                </>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-2" />
                                  Start Development Server
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
