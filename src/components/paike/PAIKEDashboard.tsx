/**
 * PAIKE Dashboard Component
 * 
 * Main dashboard for the Personal AI Knowledge Engine showing
 * personalization score, learned patterns, and recommendations.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    TrendingUp,
    Lightbulb,
    Target,
    Zap,
    BookOpen,
    Settings,
    Download,
    Trash2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// ============================================================================
// Types
// ============================================================================

interface PAIKEStats {
    personalizationScore: number;
    patternsLearned: number;
    problemsSolved: number;
    preferencesIdentified: number;
}

interface Recommendation {
    type: string;
    suggestion: string;
    confidence: number;
    reasoning: string;
}

// ============================================================================
// Component
// ============================================================================

export function PAIKEDashboard() {
    const [stats, setStats] = useState<PAIKEStats>({
        personalizationScore: 0,
        patternsLearned: 0,
        problemsSolved: 0,
        preferencesIdentified: 0,
    });
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
        loadRecommendations();
    }, []);

    const loadStats = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('paike:get-stats');
            if (result.success) {
                setStats(result.data);
            }
        } catch (error) {
            console.error('Error loading PAIKE stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadRecommendations = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('paike:get-recommendations', {
                fileType: 'typescript',
                fileName: 'current',
            });
            if (result.success) {
                setRecommendations(result.data);
            }
        } catch (error) {
            console.error('Error loading recommendations:', error);
        }
    };

    const handleExportData = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke('paike:export-data');
            if (result.success) {
                // Download as JSON
                const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `paike-export-${new Date().toISOString()}.json`;
                a.click();
            }
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    const handleClearData = async () => {
        if (!confirm('Are you sure you want to clear all PAIKE data? This cannot be undone.')) {
            return;
        }

        try {
            const result = await window.electron.ipcRenderer.invoke('paike:clear-data');
            if (result.success) {
                setStats({
                    personalizationScore: 0,
                    patternsLearned: 0,
                    problemsSolved: 0,
                    preferencesIdentified: 0,
                });
                setRecommendations([]);
            }
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };

    const getScoreColor = (score: number) => {
        if (score < 25) return 'text-red-500';
        if (score < 50) return 'text-orange-500';
        if (score < 75) return 'text-yellow-500';
        return 'text-green-500';
    };

    const getScoreLabel = (score: number) => {
        if (score < 25) return 'Just Started';
        if (score < 50) return 'Learning';
        if (score < 75) return 'Adapting';
        return 'Personalized';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Brain className="w-8 h-8 text-primary" />
                        Personal AI Knowledge Engine
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Your AI learns from every problem you solve
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                    <Button variant="destructive" onClick={handleClearData}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Data
                    </Button>
                </div>
            </div>

            {/* Personalization Score */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Personalization Score
                        </CardTitle>
                        <CardDescription>
                            How well PAIKE knows your coding style
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={`text-6xl font-bold ${getScoreColor(stats.personalizationScore)}`}>
                                    {stats.personalizationScore}%
                                </span>
                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                    {getScoreLabel(stats.personalizationScore)}
                                </Badge>
                            </div>
                            <Progress value={stats.personalizationScore} className="h-3" />
                            <p className="text-sm text-muted-foreground">
                                {stats.personalizationScore < 25 && "Keep coding! PAIKE is learning your style."}
                                {stats.personalizationScore >= 25 && stats.personalizationScore < 50 && "PAIKE is recognizing your patterns."}
                                {stats.personalizationScore >= 50 && stats.personalizationScore < 75 && "PAIKE is adapting to your preferences."}
                                {stats.personalizationScore >= 75 && "PAIKE knows your style and provides personalized suggestions!"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Patterns Learned</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.patternsLearned}</div>
                            <p className="text-xs text-muted-foreground">
                                Coding patterns identified
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                            <Lightbulb className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.problemsSolved}</div>
                            <p className="text-xs text-muted-foreground">
                                Solutions in your library
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Preferences</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.preferencesIdentified}</div>
                            <p className="text-xs text-muted-foreground">
                                Personal preferences tracked
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="recommendations">
                        <Zap className="w-4 h-4 mr-2" />
                        Recommendations
                    </TabsTrigger>
                    <TabsTrigger value="patterns">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Patterns
                    </TabsTrigger>
                    <TabsTrigger value="insights">
                        <Brain className="w-4 h-4 mr-2" />
                        Insights
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="recommendations" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Recommendations</CardTitle>
                            <CardDescription>
                                Personalized suggestions based on your coding patterns
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recommendations.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No recommendations yet. Start coding to get personalized suggestions!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recommendations.map((rec, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="outline">{rec.type.replace('_', ' ')}</Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            {Math.round(rec.confidence * 100)}% confidence
                                                        </span>
                                                    </div>
                                                    <p className="font-medium mb-1">{rec.suggestion}</p>
                                                    <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="patterns">
                    <Card>
                        <CardHeader>
                            <CardTitle>Learned Patterns</CardTitle>
                            <CardDescription>
                                Coding patterns PAIKE has identified from your work
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Pattern details coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="insights">
                    <Card>
                        <CardHeader>
                            <CardTitle>AI Insights</CardTitle>
                            <CardDescription>
                                Deep insights about your coding journey
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Insights coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
