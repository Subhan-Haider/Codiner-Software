import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, AlertTriangle, X, FileSearch, Globe, Hash, Link } from "lucide-react";

interface SEOIssue {
  type: "success" | "warning" | "error";
  message: string;
  suggestion?: string;
}

export function SEOTools() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [issues, setIssues] = useState<SEOIssue[]>([]);

  const analyzeSEO = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setIssues([]);

    // Simulate SEO analysis
    setTimeout(() => {
      const mockIssues: SEOIssue[] = [
        { type: "success", message: "Meta description is present and optimal length (120-160 characters)" },
        { type: "success", message: "Page title is under 60 characters" },
        { type: "warning", message: "Missing structured data markup", suggestion: "Add JSON-LD structured data" },
        { type: "warning", message: "Low keyword density for primary keywords" },
        { type: "error", message: "Missing alt text on some images", suggestion: "Add descriptive alt attributes to all images" },
        { type: "error", message: "Page load speed is slow (>3 seconds)", suggestion: "Optimize images and enable compression" },
      ];

      setIssues(mockIssues);
      setSeoScore(72);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            SEO Analysis Tool
          </CardTitle>
          <CardDescription>
            Enter a URL to perform a comprehensive SEO audit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={analyzeSEO}
              disabled={isAnalyzing || !url.trim()}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze SEO"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO Score */}
      {seoScore > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSearch className="h-5 w-5" />
              SEO Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(seoScore)}`}>
                {seoScore}
              </div>
              <Progress value={seoScore} className="h-3 mb-4" />
              <Badge
                className={`${getScoreBg(seoScore)} text-white`}
              >
                {seoScore >= 80 ? "Excellent" : seoScore >= 60 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues List */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Issues Found</CardTitle>
            <CardDescription>
              Review these issues and implement the suggested fixes
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
                    <div>
                      <p className="font-medium">{issue.message}</p>
                      {issue.suggestion && (
                        <p className="text-sm text-muted-foreground mt-1">
                          💡 {issue.suggestion}
                        </p>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            SEO Best Practices
          </CardTitle>
          <CardDescription>
            Essential SEO elements to check
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">On-Page SEO</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Title tag (50-60 characters)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Meta description (120-160 characters)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  H1 tag (one per page)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  URL structure
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Technical SEO</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Mobile-friendly design
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Page speed optimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  SSL certificate
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  XML sitemap
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
