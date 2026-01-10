import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, Shield, Rocket, Menu, X, ChevronRight, CheckCircle, AlertTriangle, Info, Settings, BarChart3, Eye, FileSearch, Download } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SEOTools } from "./components/SEOTools";
import { AccessibilityChecker } from "./components/AccessibilityChecker";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { SetupWizard } from "./components/SetupWizard";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  tags: string[];
}

const features: Feature[] = [
  {
    id: "seo",
    title: "SEO Audit",
    description: "Comprehensive SEO analysis with actionable recommendations",
    icon: FileSearch,
    category: "SEO",
    tags: ["seo", "audit", "performance"]
  },
  {
    id: "performance",
    title: "Performance Monitor",
    description: "Real-time performance metrics and optimization suggestions",
    icon: BarChart3,
    category: "Performance",
    tags: ["performance", "speed", "optimization"]
  },
  {
    id: "accessibility",
    title: "Accessibility Checker",
    description: "WCAG compliance testing and accessibility improvements",
    icon: Eye,
    category: "Accessibility",
    tags: ["a11y", "wcag", "inclusive"]
  },
  {
    id: "react",
    title: "React 18",
    description: "Latest React with concurrent features and automatic batching",
    icon: Rocket,
    category: "Framework",
    tags: ["react", "framework", "modern"]
  }
];

function App() {
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [seoScore, setSeoScore] = useState(85);
  const [accessibilityScore, setAccessibilityScore] = useState(92);
  const [performanceScore, setPerformanceScore] = useState(78);

  // SEO Audit simulation
  const [seoIssues, setSeoIssues] = useState([
    { type: "success", message: "Meta description is present and optimal length" },
    { type: "warning", message: "Missing structured data markup" },
    { type: "error", message: "Page title is too long (over 60 characters)" }
  ]);

  const filteredFeatures = useMemo(() => {
    return features.filter(feature => {
      const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          feature.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || feature.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = ["All", ...Array.from(new Set(features.map(f => f.category)))];

  useEffect(() => {
    // Simulate real-time performance monitoring
    const interval = setInterval(() => {
      setPerformanceScore(prev => Math.min(95, prev + Math.random() * 2 - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>React Official Template - Professional UI with Advanced Features</title>
        <meta name="description" content="A beautifully designed React template with search functionality, SEO audit, accessibility checker, and performance monitoring. Built with TypeScript, Tailwind CSS, and modern React patterns." />
        <meta name="keywords" content="React, TypeScript, Tailwind CSS, SEO, Accessibility, Performance, Modern Web Development" />
        <meta property="og:title" content="React Official Template - Professional UI" />
        <meta property="og:description" content="Beautifully designed React template with advanced features" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://your-domain.com" />
      </Helmet>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                React Pro
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "home"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "features"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("tools")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "tools"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Developer Tools
              </button>
              <Button
                onClick={() => setShowSetupWizard(true)}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Quick Setup
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t bg-background"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <button
                    onClick={() => { setActiveTab("home"); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => { setActiveTab("features"); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => { setActiveTab("tools"); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                  >
                    Developer Tools
                  </button>
                  <button
                    onClick={() => { setShowSetupWizard(true); setIsMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700"
                  >
                    <Download className="h-4 w-4 inline mr-2" />
                    Quick Setup
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-8"
            >
              {/* Hero Section */}
              <div className="text-center mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Professional React Template
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
                >
                  Beautifully designed with advanced features including search, SEO audit,
                  accessibility checking, and performance monitoring. Built for modern web development.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
                >
                  <Button size="lg" className="text-lg px-8 py-6">
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setActiveTab("tools")}>
                    <Zap className="mr-2 h-5 w-5" />
                    Try Developer Tools
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-3"
                >
                  <Badge variant="secondary">React 18</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">SEO Optimized</Badge>
                  <Badge variant="outline">Accessibility Ready</Badge>
                  <Badge variant="outline">Performance Focused</Badge>
                </motion.div>
              </div>

              {/* Quick Setup Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-4xl mx-auto mb-16"
              >
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                      <Rocket className="h-6 w-6 text-blue-600" />
                      One-Click Installation
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Get started with automated setup in seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Automated Setup</h3>
                        <p className="text-sm text-muted-foreground">One command installs everything</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Environment Ready</h3>
                        <p className="text-sm text-muted-foreground">Auto-configures all settings</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Development Ready</h3>
                        <p className="text-sm text-muted-foreground">Start coding immediately</p>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Installation Command:</span>
                        <Badge variant="secondary">Copy & Run</Badge>
                      </div>
                      <code className="block bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm font-mono">
                        npm run install-template
                      </code>
                      <p className="text-xs text-muted-foreground mt-2">
                        This will automatically install dependencies, configure environment, and start the development server
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => {
                          navigator.clipboard?.writeText('npm run install-template');
                          alert('Command copied to clipboard! Open your terminal and paste it.');
                        }}
                      >
                        <Rocket className="mr-2 h-5 w-5" />
                        Copy Install Command
                      </Button>
                      <Button variant="outline" size="lg">
                        <FileSearch className="mr-2 h-5 w-5" />
                        View Setup Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Interactive Counter Demo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="max-w-md mx-auto mb-16"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Interactive Counter</CardTitle>
                    <CardDescription className="text-center">
                      Experience smooth animations and state management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-bold text-primary mb-6"
                      >
                        {count}
                      </motion.div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={() => setCount(count - 1)}
                          variant="outline"
                          size="lg"
                        >
                          -1
                        </Button>
                        <Button
                          onClick={() => setCount(0)}
                          variant="secondary"
                          size="lg"
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={() => setCount(count + 1)}
                          size="lg"
                        >
                          +1
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-8"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Advanced Features</h1>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search features..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredFeatures.map((feature, index) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <feature.icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                                <Badge variant="secondary" className="text-xs">
                                  {feature.category}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-4">
                              {feature.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-1">
                              {feature.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "tools" && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="container mx-auto px-4 py-8"
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Developer Tools</h1>
                <p className="text-muted-foreground mb-6">
                  Professional development tools for SEO, accessibility, and performance analysis.
                </p>

                {/* Performance Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileSearch className="h-5 w-5" />
                        SEO Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span>{seoScore}/100</span>
                        </div>
                        <Progress value={seoScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Accessibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span>{accessibilityScore}/100</span>
                        </div>
                        <Progress value={accessibilityScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span>{performanceScore}/100</span>
                        </div>
                        <Progress value={performanceScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tools Tabs */}
                <Tabs defaultValue="seo" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="seo">SEO Audit</TabsTrigger>
                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="seo">
                    <Card>
                      <CardHeader>
                        <CardTitle>SEO Audit Results</CardTitle>
                        <CardDescription>
                          Comprehensive SEO analysis of your page
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {seoIssues.map((issue, index) => (
                            <Alert key={index}>
                              {issue.type === 'success' && <CheckCircle className="h-4 w-4" />}
                              {issue.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                              {issue.type === 'error' && <X className="h-4 w-4" />}
                              <AlertDescription>{issue.message}</AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="accessibility">
                    <AccessibilityChecker />
                  </TabsContent>

                  <TabsContent value="performance">
                    <PerformanceMonitor />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Setup Wizard Modal */}
      <AnimatePresence>
        {showSetupWizard && (
          <SetupWizard onClose={() => setShowSetupWizard(false)} />
        )}
      </AnimatePresence>
    </>
  )

        {/* Demo Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Components Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Component Library
              </CardTitle>
              <CardDescription>
                Showcase of Shadcn/UI components with modern design patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
          </Card>

          {/* Progress & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Progress & Status
              </CardTitle>
              <CardDescription>
                Visual indicators and interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Project Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  Increase Progress
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge>React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                  <Badge variant="destructive">Error</Badge>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is a demo of the Alert component. You can customize its appearance and content.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Demo */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
            <CardDescription>
              Organize content into multiple sections with tabs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="docs">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <h3 className="text-lg font-semibold">Welcome to the Template</h3>
                <p className="text-muted-foreground">
                  This official React template provides everything you need to build modern web applications.
                  It combines the best practices and tools in the React ecosystem.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Fast Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Vite provides lightning-fast development with hot module replacement.
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Type Safety</h4>
                    <p className="text-sm text-muted-foreground">
                      TypeScript ensures type safety and better developer experience.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-lg font-semibold">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Modern React with hooks and functional components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Shadcn/UI component library with Radix UI primitives
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tailwind CSS for utility-first styling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    TypeScript for type safety and better DX
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ESLint and Prettier for code quality
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Vite for fast development and optimized builds
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="docs" className="space-y-4">
                <h3 className="text-lg font-semibold">Documentation</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Getting Started</h4>
                    <p className="text-sm text-muted-foreground">
                      Run <code className="bg-muted px-1 py-0.5 rounded text-xs">npm install</code> to install dependencies,
                      then <code className="bg-muted px-1 py-0.5 rounded text-xs">npm run dev</code> to start development.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Building for Production</h4>
                    <p className="text-sm text-muted-foreground">
                      Use <code className="bg-muted px-1 py-0.5 rounded text-xs">npm run build</code> to create an optimized production build.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Adding Components</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the Shadcn/UI CLI to add new components: <code className="bg-muted px-1 py-0.5 rounded text-xs">npx shadcn-ui@latest add [component]</code>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-12">
        <div className="container flex h-16 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            Built with React, Vite, Shadcn/UI, Tailwind CSS, and TypeScript
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
