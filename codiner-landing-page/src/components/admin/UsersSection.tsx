"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    Cpu,
    Activity,
    Mail,
    Clock,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    Trash2,
    UserPlus
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UsersSection() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { role: newRole });
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to collapse this node? This action is non-reversible.")) return;
        try {
            await deleteDoc(doc(db, "users", userId));
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="space-y-12 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Neural <span className="text-gradient">Nodes</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Active participants in the codiner ecosystem.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-card border border-border font-black italic tracking-tight lowercase hover:border-primary transition-all shadow-xl">
                        Export Matrix
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:scale-105 transition-all shadow-xl">
                        Global Notify
                    </button>
                </div>
            </div>

            <div className="p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl">
                <div className="flex items-center justify-between mb-10 gap-6">
                    <div className="relative group flex-1 max-w-xl">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search user identity or node hash..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-8 py-5 rounded-2xl bg-white/5 border border-border focus:border-primary focus:outline-none transition-all font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border/50 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                                    <th className="pb-6 pl-4">Node Identity</th>
                                    <th className="pb-6">Access Tier</th>
                                    <th className="pb-6">Role</th>
                                    <th className="pb-6">Created</th>
                                    <th className="pb-6">Status</th>
                                    <th className="pb-6 text-right pr-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="group hover:bg-primary/2 transition-colors">
                                        <td className="py-8 pl-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary/20 to-blue-500/20 flex items-center justify-center font-black text-primary italic">
                                                    {user.name?.charAt(0) || user.email?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{user.name || "Anonymous Node"}</div>
                                                    <div className="text-xs text-muted-foreground font-medium">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <span className={cn(
                                                "text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest bg-card border border-border text-muted-foreground"
                                            )}>
                                                {user.tier || "Standard User"}
                                            </span>
                                        </td>
                                        <td className="py-8">
                                            <select
                                                value={user.role || 'user'}
                                                onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                                className="bg-transparent text-sm font-black italic lowercase focus:outline-none text-primary"
                                            >
                                                <option value="user">User</option>
                                                <option value="moderator">Moderator</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-2 text-muted-foreground font-bold italic text-sm">
                                                <Clock className="w-3 h-3" />
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    user.nodeStatus === "active" ? "bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                                                        user.nodeStatus === "unverified" ? "bg-amber-500" : "bg-red-500"
                                                )} />
                                                <span className="text-sm font-black italic lowercase">{user.nodeStatus || "active"}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-right pr-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="p-3 rounded-xl hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <button className="p-3 rounded-xl hover:bg-card transition-colors text-muted-foreground">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
