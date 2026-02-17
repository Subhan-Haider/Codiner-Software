"use client";

import { useState, useEffect } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Activity, Globe, Monitor, Apple, Terminal, Zap, Cpu, ArrowUpRight, ArrowDownRight, TrendingUp, Users, Download, Database, Layout } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AnalyticsSection() {
    const [counts, setCounts] = useState({
        users: 0,
        templates: 0,
        releases: 0,
        activity: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            setLoading(true);
            try {
                const usersCount = (await getCountFromServer(collection(db, "users"))).data().count;
                const templatesCount = (await getCountFromServer(collection(db, "templates"))).data().count;
                const releasesCount = (await getCountFromServer(collection(db, "releases"))).data().count;
                const activityCount = (await getCountFromServer(collection(db, "activity"))).data().count;

                setCounts({
                    users: usersCount,
                    templates: templatesCount,
                    releases: releasesCount,
                    activity: activityCount
                });
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            }
            setLoading(false);
        };

        fetchAnalyticsData();
    }, []);

    const stats = [
        { label: "Matrix Reach", value: (counts.users * 12).toLocaleString(), change: "+14.2%", icon: Globe, trend: "up" },
        { label: "Active Nodes", value: counts.users.toLocaleString(), change: "+21.5%", icon: Users, trend: "up" },
        { label: "Logic Blueprints", value: counts.templates.toLocaleString(), change: "+5.1%", icon: Layout, trend: "up" },
        { label: "Neural Events", value: counts.activity.toLocaleString(), change: "Active", icon: Activity, trend: "up" }
    ];

    return (
        <div className="space-y-12 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Neural <span className="text-gradient">Metrix</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Advanced engagement and distribution analytics.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[2.5rem] border border-border bg-card/10 backdrop-blur-md">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className={cn("flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full", stat.trend === 'up' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-3xl font-black italic tracking-tighter mb-1">
                            {loading ? "..." : stat.value}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Traffic Distribution */}
                <div className="p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
                    <h4 className="text-2xl font-black italic tracking-tighter lowercase mb-10 flex items-center gap-4">
                        <TrendingUp className="w-6 h-6 text-primary" /> Reach <span className="text-muted-foreground opacity-30">Distro</span>
                    </h4>
                    <div className="space-y-8">
                        {[
                            { label: "Windows Node", percent: 62 },
                            { label: "macOS Foundry", percent: 28 },
                            { label: "Linux Interface", percent: 10 }
                        ].map((plat, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center text-sm font-black italic lowercase">
                                    <span>{plat.label}</span>
                                    <span>{plat.percent}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${plat.percent}%` }}
                                        transition={{ duration: i + 1, ease: "circOut" }}
                                        className="h-full bg-linear-to-r from-primary to-blue-500 rounded-full shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Used Tools */}
                <div className="p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
                    <h4 className="text-2xl font-black italic tracking-tighter lowercase mb-10">Popular <span className="text-gradient">Foundry Hooks</span></h4>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { name: "Ollama Auth", calls: "84k", icon: Cpu },
                            { name: "SQLite Hub", calls: "52k", icon: Database },
                            { name: "Neural CSS", calls: "41k", icon: Layout },
                            { name: "Logic Bridge", calls: "12k", icon: Terminal }
                        ].map((tool, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-white/2 border border-border/50 hover:border-primary/50 transition-all group">
                                <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                                <div className="font-black italic text-lg leading-none mb-2">{tool.name}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-primary">{tool.calls} Invokes</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
