"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MessageSquare, Search, MoreVertical, Mail, User, Clock, CheckCircle2, AlertCircle, Send, ArrowUpRight, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function SupportSection() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        active: 0,
        resolved: 0,
        latency: "24m" // Mock or calculated
    });

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "support"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const supportList: any[] = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTickets(supportList);

                const active = supportList.filter(t => t.status === "Open" || t.status === "In-Progress").length;
                const closed = supportList.filter(t => t.status === "Closed").length;
                const total = supportList.length;

                setStats({
                    active,
                    resolved: total > 0 ? Math.round((closed / total) * 100) : 0,
                    latency: "12m"
                });
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
            setLoading(false);
        };

        fetchTickets();
    }, []);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "support", id), { status: newStatus });
            setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
        } catch (error) {
            console.error("Error updating ticket status:", error);
        }
    };

    const handleDeleteTicket = async (id: string) => {
        if (!confirm("Permanently archive this assistance thread?")) return;
        try {
            await deleteDoc(doc(db, "support", id));
            setTickets(tickets.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error deleting ticket:", error);
        }
    };

    const [showBroadcastModal, setShowBroadcastModal] = useState(false);
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const [isBroadcasting, setIsBroadcasting] = useState(false);

    const handleSendBroadcast = async () => {
        if (!broadcastMessage.trim()) return;
        setIsBroadcasting(true);
        try {
            await addDoc(collection(db, "notifications"), {
                message: broadcastMessage,
                type: "global",
                createdAt: serverTimestamp(),
                active: true
            });
            setShowBroadcastModal(false);
            setBroadcastMessage("");
            alert("Neural signal broadcasted across all nodes.");
        } catch (error) {
            console.error("Error sending broadcast:", error);
            alert("Signal transmission failed.");
        }
        setIsBroadcasting(false);
    };

    return (
        <div className="space-y-12 text-left relative">
            {/* Broadcast Modal */}
            {showBroadcastModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-background/80">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg p-10 rounded-4xl border border-border bg-card shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-2xl font-black italic tracking-tighter lowercase">Neural <span className="text-primary italic">Broadcast</span></h4>
                            <button onClick={() => setShowBroadcastModal(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Signal Payload</label>
                                <textarea
                                    value={broadcastMessage}
                                    onChange={(e) => setBroadcastMessage(e.target.value)}
                                    placeholder="Enter system announcement..."
                                    rows={4}
                                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none font-bold italic resize-none"
                                />
                            </div>
                            <button
                                onClick={handleSendBroadcast}
                                disabled={isBroadcasting || !broadcastMessage.trim()}
                                className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-wide lowercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                            >
                                {isBroadcasting ? "Transmitting..." : "Initiate System Broadcast"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Support <span className="text-gradient">Pulse</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Manage the neural assistance console.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Statistics Cards */}
                <div className="space-y-6">
                    {[
                        { label: "Active Nodes", value: stats.active, icon: AlertCircle, color: "text-amber-500" },
                        { label: "Downtime Cycle", value: `${stats.resolved}%`, icon: CheckCircle2, color: "text-green-500" },
                        { label: "Neural Latency", value: stats.latency, icon: Clock, color: "text-primary" }
                    ].map((stat, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] border border-border bg-card/10 backdrop-blur-md flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center">
                                <stat.icon className={cn("w-7 h-7", stat.color)} />
                            </div>
                            <div>
                                <div className="text-3xl font-black italic tracking-tighter mb-0.5">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">{stat.label}</div>
                            </div>
                        </div>
                    ))}

                    <div className="p-10 rounded-[3rem] border border-border bg-linear-to-br from-primary/10 to-transparent relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <MessageSquare className="w-12 h-12 text-primary mb-6" />
                        <h4 className="text-2xl font-black italic tracking-tighter lowercase mb-4">Neural Broadcast</h4>
                        <p className="text-sm text-muted-foreground font-medium mb-8 leading-relaxed">Send a global pulse notification to all active foundry nodes.</p>
                        <button
                            onClick={() => setShowBroadcastModal(true)}
                            className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:underline"
                        >
                            Initiate Broadcast <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Ticket List */}
                <div className="lg:col-span-2 p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl">
                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {tickets.length > 0 ? tickets.map((ticket, i) => (
                                <div key={ticket.id} className="group p-8 rounded-[2.5rem] bg-white/2 border border-border/50 hover:border-primary/50 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 flex gap-2">
                                        <button
                                            onClick={() => handleDeleteTicket(ticket.id)}
                                            className="p-3 rounded-xl hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-black italic text-muted-foreground">ID</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-4 mb-2">
                                            <select
                                                value={ticket.status}
                                                onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                                                className={cn(
                                                    "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-transparent border focus:outline-none",
                                                    ticket.status === "Open" ? "text-amber-500 border-amber-500/20" :
                                                        ticket.status === "In-Progress" ? "text-blue-500 border-blue-500/20" :
                                                            "text-green-500 border-green-500/20"
                                                )}
                                            >
                                                <option value="Open">Open</option>
                                                <option value="In-Progress">In-Progress</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                            <div className="flex items-center gap-2 text-xs font-bold italic text-muted-foreground lowercase">
                                                <Clock className="w-3 h-3" />
                                                {ticket.createdAt ? (typeof ticket.createdAt === 'string' ? new Date(ticket.createdAt).toLocaleDateString() : ticket.createdAt.toDate().toLocaleDateString()) : 'N/A'}
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-black italic tracking-tighter lowercase group-hover:text-primary transition-colors truncate mb-1">{ticket.subject}</h4>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Node: {ticket.userEmail || "Anonymous"}</div>
                                        {ticket.priority && (
                                            <div className={cn(
                                                "mt-3 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block",
                                                ticket.priority === "High" ? "bg-red-500/20 text-red-500" :
                                                    ticket.priority === "Medium" ? "bg-amber-500/20 text-amber-500" :
                                                        "bg-green-500/20 text-green-500"
                                            )}>
                                                {ticket.priority} Priority
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="p-4 rounded-2xl bg-primary text-primary-foreground hover:scale-105 transition-all shadow-xl shadow-primary/20">
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-20 text-center italic text-muted-foreground lowercase font-medium">Neural assistance console is silent. No signals detected.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
