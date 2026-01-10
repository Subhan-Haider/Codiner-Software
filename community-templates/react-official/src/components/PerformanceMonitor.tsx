import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { BarChart3, TrendingUp, Clock, HardDrive, Zap, Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface Metric {
  name: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "poor";
  description: string;
}

interface PerformanceIssue {
  type: "success" | "warning" | "error";
  title: string;
  description: string;
  impact: string;
  solution: string;
}

export function PerformanceMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [issues, setIssues] = useState<PerformanceIssue[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    // Initialize with mock performance data
    const initialMetrics: Metric[] = [
      {
        name: "First Contentful Paint",
        value: 1.2,
        unit: "s",
        status: "good",
        description: "Time to first contentful paint"
      },
      {
        name: "Largest Contentful Paint",
        value: 2.8,
        unit: "s",
        status: "warning",
        description: "Time to largest contentful paint"
      },
      {
        name: "First Input Delay",
        value: 45,
        unit: "ms",
        status: "good",
        description: "First input delay"
      },
      {
        name: "Cumulative Layout Shift",
        value: 0.08,
        unit: "",
        status: "good",
        description: "Cumulative layout shift score"
      },
      {
        name: "Total Blocking Time",
        value: 120,
        unit: "ms",
        status: "warning",
        description: "Total blocking time"
      },
      {
        name: "Speed Index",
        value: 2.1,
        unit: "s",
        status: "good",
        description: "Speed index"
      }
    ];

    const initialIssues: PerformanceIssue[] = [
      {
        type: "warning",
        title: "Large JavaScript bundle",
        description: "Your JavaScript bundle is 2.4MB, which may slow down initial page load",
        impact: "High",
        solution: "Consider code splitting, tree shaking, and lazy loading"
      },
      {
        type: "error",
        title: "Unoptimized images",
        description: "Several images are not optimized and could be compressed",
        impact: "Medium",
        solution: "Use modern image formats (WebP, AVIF) and proper sizing"
      },
      {
        type: "success",
        title: "Good caching strategy",
        description: "Static assets are properly cached with appropriate headers",
        impact: "Low",
        solution: "Continue monitoring cache headers"
      },
      {
        type: "warning",
        title: "Third-party scripts",
        description: "Multiple third-party scripts are loading synchronously",
        impact: "High",
        solution: "Load non-critical scripts asynchronously or defer them"
      }
    ];

    setMetrics(initialMetrics);
    setIssues(initialIssues);
    setOverallScore(72);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "poor": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getIssueCount = (type: string) => {
    return issues.filter(issue => issue.type === type).length;
  };

  return (
    <div className="space-y-6">
      {/* Overall Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Score
          </CardTitle>
          <CardDescription>
            Overall performance rating based on Core Web Vitals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getOverallScoreColor(overallScore)}`}>
              {overallScore}
            </div>
            <Progress value={overallScore} className="h-3 mb-4" />
            <Badge className={`${getStatusBg(overallScore >= 90 ? "good" : overallScore >= 50 ? "warning" : "poor")} text-white`}>
              {overallScore >= 90 ? "Excellent" : overallScore >= 50 ? "Needs Improvement" : "Poor"}
            </Badge>
          </div>

          {/* Issue Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{getIssueCount("error")}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{getIssueCount("warning")}</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getIssueCount("success")}</div>
              <div className="text-sm text-muted-foreground">Good</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{issues.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "default" : "outline"}
              className="flex-1"
            >
              <Activity className="mr-2 h-4 w-4" />
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Core Web Vitals
          </CardTitle>
          <CardDescription>
            Essential metrics for a healthy site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{metric.name}</h4>
                  <Badge
                    variant="outline"
                    className={getStatusColor(metric.status)}
                  >
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {metric.value.toFixed(1)}{metric.unit}
                </div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Issues */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Issues</CardTitle>
            <CardDescription>
              Areas that need optimization for better performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <Alert key={index}>
                  {issue.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {issue.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                  {issue.type === 'error' && <X className="h-4 w-4 text-red-500" />}
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{issue.title}</h4>
                        <Badge variant="outline" className={
                          issue.impact === "High" ? "text-red-600" :
                          issue.impact === "Medium" ? "text-yellow-600" :
                          "text-green-600"
                        }>
                          {issue.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-sm">{issue.description}</p>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium mb-1">💡 Solution:</p>
                        <p className="text-sm">{issue.solution}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimization Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Optimization Checklist
          </CardTitle>
          <CardDescription>
            Best practices for optimal performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend Optimization</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Minify and compress assets
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Use modern image formats (WebP, AVIF)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Implement lazy loading
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Optimize fonts loading
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Backend Optimization</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Enable compression (Gzip, Brotli)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Set proper cache headers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Use CDN for static assets
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Optimize database queries
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
