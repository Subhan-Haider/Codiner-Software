"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Download, Plus, Search, FileText, Globe, Monitor, Apple, Terminal, MoreVertical, CheckCircle2, X, Trash2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function DownloadsSection() {
    const [releases, setReleases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [releaseForm, setReleaseForm] = useState({
        version: "",
        type: "Stable",
        windowsUrl: "",
        macosUrl: "",
        linuxUrl: "",
        releaseNotes: "",
        status: "Active"
    });

    useEffect(() => {
        const fetchReleases = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "releases"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const releasesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setReleases(releasesList);
            } catch (error) {
                console.error("Error fetching releases:", error);
            }
            setLoading(false);
        };

        fetchReleases();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newRelease = {
                ...releaseForm,
                createdAt: serverTimestamp(),
                os: [
                    ...(releaseForm.windowsUrl ? ["windows"] : []),
                    ...(releaseForm.macosUrl ? ["macos"] : []),
                    ...(releaseForm.linuxUrl ? ["linux"] : [])
                ]
            };
            const docRef = await addDoc(collection(db, "releases"), newRelease);
            setReleases([{ id: docRef.id, ...newRelease, createdAt: new Date().toISOString() }, ...releases]);
            setIsModalOpen(false);
            setReleaseForm({ version: "", type: "Stable", windowsUrl: "", macosUrl: "", linuxUrl: "", releaseNotes: "", status: "Active" });
        } catch (error) {
            console.error("Error adding release:", error);
        }
    };

    const handleDeleteRelease = async (id: string) => {
        if (!confirm("Decommission this build from the distributed network?")) return;
        try {
            await deleteDoc(doc(db, "releases", id));
            setReleases(releases.filter(r => r.id !== id));
        } catch (error) {
            console.error("Error deleting release:", error);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "releases", id), { status: newStatus });
            setReleases(releases.map(r => r.id === id ? { ...r, status: newStatus } : r));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="space-y-12 text-left relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Manage <span className="text-gradient">Releases</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Deploy new builds to the neural network.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    New Build
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Release Stats */}
                <div className="lg:col-span-1 p-8 rounded-[2.5rem] border border-border bg-card/10 backdrop-blur-xl flex flex-col justify-between">
                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                            <Download className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-2xl font-black italic tracking-tighter lowercase mb-2">Build Distribution</h4>
                        <div className="text-5xl font-black italic tracking-tighter text-gradient mb-4">
                            {releases.length > 0 ? (releases[0].version) : "v0.0.0"}
                        </div>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">Latest stable production build</p>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-bold italic text-muted-foreground"><Monitor className="w-4 h-4" /> Windows Node</div>
                            <span className="font-black text-primary">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-bold italic text-muted-foreground"><Apple className="w-4 h-4" /> Silicon/Intel</div>
                            <span className="font-black text-primary">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 font-bold italic text-muted-foreground"><Terminal className="w-4 h-4" /> Linux Kernel</div>
                            <span className="font-black text-primary">Active</span>
                        </div>
                    </div>
                </div>

                {/* Release List */}
                <div className="lg:col-span-2 p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl">
                    <div className="overflow-x-auto text-left">
                        {loading ? (
                            <div className="py-20 flex justify-center">
                                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border/50 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                                        <th className="pb-6 pl-4">Build Identity</th>
                                        <th className="pb-6">Dist Date</th>
                                        <th className="pb-6">Platforms</th>
                                        <th className="pb-6">Status</th>
                                        <th className="pb-6 text-right pr-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30">
                                    {releases.map((release, i) => (
                                        <tr key={release.id} className="group hover:bg-primary/2 transition-colors">
                                            <td className="py-8 pl-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center font-black text-primary italic">
                                                        {release.version?.charAt(1) || release.version?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-lg leading-none mb-1 group-hover:text-primary transition-colors">{release.version}</div>
                                                        <div className="text-xs text-muted-foreground font-black uppercase tracking-widest">{release.type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-8">
                                                <div className="text-sm font-bold italic text-muted-foreground">
                                                    {release.createdAt ? (typeof release.createdAt === 'string' ? new Date(release.createdAt).toLocaleDateString() : release.createdAt.toDate().toLocaleDateString()) : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="py-8">
                                                <div className="flex gap-2">
                                                    {release.os?.map((os: string) => (
                                                        <div key={os} className="p-2 rounded-lg bg-card border border-border text-muted-foreground">
                                                            {os === 'windows' && <Monitor className="w-3 h-3" />}
                                                            {os === 'macos' && <Apple className="w-3 h-3" />}
                                                            {os === 'linux' && <Terminal className="w-3 h-3" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="py-8">
                                                <select
                                                    value={release.status}
                                                    onChange={(e) => handleUpdateStatus(release.id, e.target.value)}
                                                    className="bg-transparent text-[10px] font-black uppercase tracking-widest text-primary focus:outline-none"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Archived">Archived</option>
                                                    <option value="Legacy">Legacy</option>
                                                </select>
                                            </td>
                                            <td className="py-8 text-right pr-4">
                                                <button
                                                    onClick={() => handleDeleteRelease(release.id)}
                                                    className="p-3 rounded-xl hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Deploy Release Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full max-w-2xl bg-card/90 backdrop-blur-2xl border border-border p-10 rounded-[3.5rem] shadow-3xl overflow-y-auto max-h-[90vh]"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-4xl font-black italic tracking-tighter lowercase">Deploy <span className="text-gradient">Build</span></h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Build Version</label>
                                    <input
                                        type="text"
                                        required
                                        value={releaseForm.version}
                                        onChange={(e) => setReleaseForm({ ...releaseForm, version: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                        placeholder="v1.4.3"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Release Type</label>
                                    <select
                                        value={releaseForm.type}
                                        onChange={(e) => setReleaseForm({ ...releaseForm, type: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold text-primary italic lowercase"
                                    >
                                        <option value="Stable">Stable Prod</option>
                                        <option value="Beta">Neural Beta</option>
                                        <option value="Nightly">Nightly Pulse</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2"><Monitor className="w-3 h-3" /> Windows (.exe/.msi) URL</label>
                                    <input
                                        type="url"
                                        value={releaseForm.windowsUrl}
                                        onChange={(e) => setReleaseForm({ ...releaseForm, windowsUrl: e.target.value })}
                                        className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-medium text-sm"
                                        placeholder="https://forge.codiner.io/dist/win/v1.4.3.exe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2"><Apple className="w-3 h-3" /> macOS (.dmg/.pkg) URL</label>
                                    <input
                                        type="url"
                                        value={releaseForm.macosUrl}
                                        onChange={(e) => setReleaseForm({ ...releaseForm, macosUrl: e.target.value })}
                                        className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-medium text-sm"
                                        placeholder="https://forge.codiner.io/dist/mac/v1.4.3.dmg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4 flex items-center gap-2"><Terminal className="w-3 h-3" /> Linux (.AppImage/.deb) URL</label>
                                    <input
                                        type="url"
                                        value={releaseForm.linuxUrl}
                                        onChange={(e) => setReleaseForm({ ...releaseForm, linuxUrl: e.target.value })}
                                        className="w-full px-8 py-4 rounded-2xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-medium text-sm"
                                        placeholder="https://forge.codiner.io/dist/linux/v1.4.3.AppImage"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Deployment Notes (Changelog)</label>
                                <textarea
                                    className="w-full px-8 py-5 rounded-4xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold h-32"
                                    value={releaseForm.releaseNotes}
                                    onChange={(e) => setReleaseForm({ ...releaseForm, releaseNotes: e.target.value })}
                                    placeholder="Implemented new Ollama logic nodes..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-6 rounded-4xl bg-primary text-primary-foreground font-black italic text-xl tracking-tight lowercase hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
                            >
                                <Zap className="w-6 h-6 fill-current" />
                                Initiate Build Broadcast
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
