"use client";

import { motion } from "framer-motion";
import {
    Users,
    Zap,
    Shield,
    Search,
    Settings,
    LayoutDashboard,
    Activity,
    Database,
    Mail,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    ArrowUpRight,
    Cpu,
    Globe,
    Terminal,
    Download,
    Layout,
    FileText,
    MessageSquare,
    TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { OverviewSection } from "@/components/admin/OverviewSection";
import { DownloadsSection } from "@/components/admin/DownloadsSection";
import { TemplatesSection } from "@/components/admin/TemplatesSection";
import { BlogSection } from "@/components/admin/BlogSection";
import { UsersSection } from "@/components/admin/UsersSection";
import { AnalyticsSection } from "@/components/admin/AnalyticsSection";
import { SupportSection } from "@/components/admin/SupportSection";
import { SettingsSection } from "@/components/admin/SettingsSection";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const { user, profile, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || profile?.role !== 'admin')) {
            router.push("/");
        }
    }, [user, profile, loading, router]);

    if (loading || !user || profile?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const sidebarItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "downloads", label: "Downloads", icon: Download },
        { id: "templates", label: "Templates", icon: Layout },
        { id: "blog", label: "Blog Hub", icon: FileText },
        { id: "users", label: "Neural Nodes", icon: Users },
        { id: "analytics", label: "Analytics", icon: TrendingUp },
        { id: "support", label: "Support", icon: MessageSquare },
        { id: "settings", label: "Site Config", icon: Settings }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6 ml-4">Management Matrix</h2>
                                <nav className="space-y-2">
                                    {sidebarItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={cn(
                                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold lowercase italic tracking-tight text-lg group",
                                                activeTab === item.id
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                                            )}
                                        >
                                            <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-primary-foreground" : "text-primary")} />
                                            {item.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-8 rounded-4xl bg-linear-to-br from-primary/10 to-blue-500/10 border border-primary/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/2 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Zap className="w-8 h-8 text-primary mb-4 animate-pulse" />
                                <h4 className="font-black italic text-sm mb-2">Neural Foundry</h4>
                                <p className="text-xs text-muted-foreground font-medium mb-4">Core engine uptime: 99.98%</p>
                                <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "92%" }}
                                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="space-y-12"
                        >
                            {activeTab === "overview" && <OverviewSection />}
                            {activeTab === "downloads" && <DownloadsSection />}
                            {activeTab === "templates" && <TemplatesSection />}
                            {activeTab === "blog" && <BlogSection />}
                            {activeTab === "users" && <UsersSection />}
                            {activeTab === "analytics" && <AnalyticsSection />}
                            {activeTab === "support" && <SupportSection />}
                            {activeTab === "settings" && <SettingsSection />}
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
