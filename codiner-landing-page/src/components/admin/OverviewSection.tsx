"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, query, getDocs, getCountFromServer, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Cpu, Activity, Zap, Shield, ArrowUpRight, Clock, MessageSquare, Terminal, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function OverviewSection() {
    const [counts, setCounts] = useState({
        users: 0,
        templates: 0,
        tickets: 0,
        downloads: 0
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            setLoading(true);
            try {
                // Fetch Counts
                const usersCount = (await getCountFromServer(collection(db, "users"))).data().count;
                const templatesCount = (await getCountFromServer(collection(db, "templates"))).data().count;
                const ticketsCount = (await getCountFromServer(query(collection(db, "support"), orderBy("createdAt", "desc"), limit(5)))).data().count;

                setCounts({
                    users: usersCount,
                    templates: templatesCount,
                    tickets: ticketsCount,
                    downloads: 1240 // Mock for now until we have a downloads tracker
                });

                // Fetch Recent Activity (assuming an 'activity' collection exists)
                const activityQuery = query(collection(db, "activity"), orderBy("timestamp", "desc"), limit(5));
                const activitySnap = await getDocs(activityQuery);
                const activityList = activitySnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRecentActivity(activityList);

            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
            setLoading(false);
        };

        fetchOverviewData();
    }, []);

    const stats = [
        { label: "Neural Nodes", value: counts.users.toLocaleString(), change: "+12%", icon: Cpu, color: "text-primary" },
        { label: "Matrix Blueprints", value: counts.templates.toLocaleString(), change: "+5%", icon: Activity, color: "text-blue-500" },
        { label: "Total Forge Events", value: counts.downloads.toLocaleString(), change: "+24%", icon: Zap, color: "text-amber-500" },
        { label: "Foundry Health", value: "99.9%", change: "Stable", icon: Shield, color: "text-green-500" }
    ];

    return (
        <div className="space-y-12 text-left">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2.5rem] border border-border bg-card/30 backdrop-blur-xl shadow-xl group hover:border-primary/30 transition-all"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3")}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-widest">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-black italic tracking-tighter mb-1">
                            {loading ? "..." : stat.value}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-3xl font-black italic tracking-tighter lowercase">Neural <span className="text-gradient">Activity</span></h3>
                        <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Full Log</button>
                    </div>

                    <div className="space-y-6">
                        {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                    <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-lg italic lowercase">{item.userEmail || "Anonymous"}</span>
                                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-black opacity-50 px-2 py-0.5 rounded-md bg-white/5">{item.action}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate font-medium">{item.details}</p>
                                </div>
                                <div className="text-right flex flex-col items-end gap-1">
                                    <div className="text-xs font-black italic text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'now'}
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center text-muted-foreground italic lowercase font-medium">No recent pulses detected in the matrix.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Status */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] border border-border bg-linear-to-br from-primary/5 to-transparent">
                        <h4 className="text-xl font-black italic tracking-tight lowercase mb-6 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" /> System Gateways
                        </h4>
                        <div className="space-y-4">
                            {[
                                { name: "Ollama Node", status: "Active" },
                                { name: "Firebase Auth", status: "Verified" },
                                { name: "GitHub Sync", status: "Enabled" }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-card/40 border border-border/50">
                                    <span className="font-bold italic lowercase text-sm">{s.name}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-green-500">{s.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] border border-border bg-card/20 backdrop-blur-md">
                        <h4 className="text-xl font-black italic tracking-tight lowercase mb-4">Neural Feedback</h4>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <div>
                                <div className="text-sm font-black italic lowercase text-primary">{counts.tickets} New Support Requests</div>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Awaiting response</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
