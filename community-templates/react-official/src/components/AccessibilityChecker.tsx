import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertTriangle, X, Eye, Users, Zap, Monitor } from "lucide-react";

interface AccessibilityIssue {
  type: "success" | "warning" | "error";
  rule: string;
  description: string;
  impact: "minor" | "moderate" | "serious" | "critical";
  wcag: string;
  suggestion: string;
}

export function AccessibilityChecker() {
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [level, setLevel] = useState<"A" | "AA" | "AAA">("AA");

  useEffect(() => {
    // Auto-run accessibility check on component mount
    runAccessibilityCheck();
  }, []);

  const runAccessibilityCheck = () => {
    setIsChecking(true);

    // Simulate accessibility analysis
    setTimeout(() => {
      const mockIssues: AccessibilityIssue[] = [
        {
          type: "error",
          rule: "Missing alt text",
          description: "Images must have alt text",
          impact: "critical",
          wcag: "1.1.1 Non-text Content",
          suggestion: "Add descriptive alt attributes to all images"
        },
        {
          type: "warning",
          rule: "Color contrast",
          description: "Text contrast ratio should be at least 4.5:1",
          impact: "moderate",
          wcag: "1.4.3 Contrast (Minimum)",
          suggestion: "Increase contrast between text and background colors"
        },
        {
          type: "success",
          rule: "Heading structure",
          description: "Heading hierarchy is logical",
          impact: "minor",
          wcag: "1.3.1 Info and Relationships",
          suggestion: "Maintain proper heading hierarchy"
        },
        {
          type: "error",
          rule: "Keyboard navigation",
          description: "All interactive elements must be keyboard accessible",
          impact: "serious",
          wcag: "2.1.1 Keyboard",
          suggestion: "Ensure all buttons and links can be accessed with Tab key"
        },
        {
          type: "warning",
          rule: "Focus indicators",
          description: "Focus indicators should be clearly visible",
          impact: "moderate",
          wcag: "2.4.7 Focus Visible",
          suggestion: "Add visible focus outlines to interactive elements"
        }
      ];

      setIssues(mockIssues);
      setScore(78);
      setIsChecking(false);
    }, 2500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "text-red-600 bg-red-50";
      case "serious": return "text-orange-600 bg-orange-50";
      case "moderate": return "text-yellow-600 bg-yellow-50";
      case "minor": return "text-blue-600 bg-blue-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getIssueCount = (type: string) => {
    return issues.filter(issue => issue.type === type).length;
  };

  return (
    <div className="space-y-6">
      {/* Accessibility Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Score
          </CardTitle>
          <CardDescription>
            WCAG {level} compliance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(score)}`}>
              {score}
            </div>
            <Progress value={score} className="h-3 mb-4" />
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant={level === "A" ? "default" : "outline"} onClick={() => setLevel("A")}>
                WCAG A
              </Badge>
              <Badge variant={level === "AA" ? "default" : "outline"} onClick={() => setLevel("AA")}>
                WCAG AA
              </Badge>
              <Badge variant={level === "AAA" ? "default" : "outline"} onClick={() => setLevel("AAA")}>
                WCAG AAA
              </Badge>
            </div>
          </div>

          {/* Issue Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{getIssueCount("error")}</div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{getIssueCount("warning")}</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getIssueCount("success")}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{issues.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={runAccessibilityCheck} disabled={isChecking} className="w-full">
              {isChecking ? "Checking..." : "Run Accessibility Check"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Issues</CardTitle>
            <CardDescription>
              Detailed breakdown of accessibility violations and recommendations
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
                        <h4 className="font-semibold">{issue.rule}</h4>
                        <Badge className={getImpactColor(issue.impact)}>
                          {issue.impact}
                        </Badge>
                      </div>
                      <p className="text-sm">{issue.description}</p>
                      <p className="text-xs text-muted-foreground">WCAG: {issue.wcag}</p>
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm font-medium mb-1">💡 Suggestion:</p>
                        <p className="text-sm">{issue.suggestion}</p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accessibility Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Accessibility Guidelines
          </CardTitle>
          <CardDescription>
            Key principles for creating accessible web experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Monitor className="h-4 w-4" />
                  Perceivable
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Provide text alternatives for non-text content</li>
                  <li>• Create content that can be presented in different ways</li>
                  <li>• Make it easier for users to see and hear content</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4" />
                  Operable
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Make all functionality available from a keyboard</li>
                  <li>• Give users enough time to read and use content</li>
                  <li>• Do not design content in a way that is known to cause seizures</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4" />
                  Understandable
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Make text content readable and understandable</li>
                  <li>• Make web pages appear and operate in predictable ways</li>
                  <li>• Help users avoid and correct mistakes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4" />
                  Robust
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Maximize compatibility with current and future user agents</li>
                  <li>• Ensure content is accessible with assistive technologies</li>
                  <li>• Follow web standards and best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
