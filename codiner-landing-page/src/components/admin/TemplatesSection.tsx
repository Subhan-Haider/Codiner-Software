"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Layout, Plus, Search, Code, Cpu, Globe, Database, Star, Download, MoreVertical, Edit2, Trash2, X, Check, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function TemplatesSection() {
    const [templates, setTemplates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [templateForm, setTemplateForm] = useState({
        name: "",
        description: "",
        stack: "",
        difficulty: "Intermediate",
        type: "Web",
        isFeatured: false
    });

    useEffect(() => {
        const fetchTemplates = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "templates"));
                const querySnapshot = await getDocs(q);
                const templatesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTemplates(templatesList);
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
            setLoading(false);
        };

        fetchTemplates();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newTemplate = {
                ...templateForm,
                createdAt: serverTimestamp(),
                downloads: 0,
                rating: 5.0
            };
            const docRef = await addDoc(collection(db, "templates"), newTemplate);
            setTemplates([{ id: docRef.id, ...newTemplate }, ...templates]);
            setIsModalOpen(false);
            setTemplateForm({ name: "", description: "", stack: "", difficulty: "Intermediate", type: "Web", isFeatured: false });
        } catch (error) {
            console.error("Error adding template:", error);
        }
    };

    const handleDeleteTemplate = async (id: string) => {
        if (!confirm("Delete this pattern from the foundry?")) return;
        try {
            await deleteDoc(doc(db, "templates", id));
            setTemplates(templates.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error deleting template:", error);
        }
    };

    const handleToggleFeatured = async (id: string, current: boolean) => {
        try {
            await updateDoc(doc(db, "templates", id), { isFeatured: !current });
            setTemplates(templates.map(t => t.id === id ? { ...t, isFeatured: !current } : t));
        } catch (error) {
            console.error("Error toggling featured status:", error);
        }
    };

    return (
        <div className="space-y-12 text-left relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Build <span className="text-gradient">Blueprints</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Manage the project pattern foundry.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    New Pattern
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, i) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] border border-border bg-card/20 backdrop-blur-xl group hover:border-primary/50 transition-all shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 flex gap-2">
                                <button
                                    onClick={() => handleToggleFeatured(template.id, template.isFeatured)}
                                    className={cn(
                                        "p-3 rounded-xl bg-card border border-border transition-all",
                                        template.isFeatured ? "text-amber-500 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                                    )}
                                >
                                    <Star className={cn("w-5 h-5", template.isFeatured && "fill-amber-500")} />
                                </button>
                                <button
                                    onClick={() => handleDeleteTemplate(template.id)}
                                    className="p-3 rounded-xl bg-card border border-border text-muted-foreground opacity-0 group-hover:opacity-100 transition-all hover:text-red-500"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all font-black text-2xl text-primary italic">
                                {template.name?.charAt(0)}
                            </div>

                            <h4 className="text-2xl font-black italic tracking-tighter lowercase mb-4 group-hover:text-primary transition-colors">{template.name}</h4>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {template.stack?.split(',').map((tech: string) => (
                                    <span key={tech} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-white/5 border border-border/50 px-3 py-1 rounded-lg italic">{tech.trim()}</span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border/50">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-1">Usage</div>
                                    <div className="flex items-center gap-2 font-black italic tracking-tight">
                                        <Activity className="w-4 h-4 text-primary" />
                                        {template.downloads || 0}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-1">Logic Rating</div>
                                    <div className="flex items-center gap-2 font-black italic tracking-tight">
                                        <Star className="w-4 h-4 text-amber-500" />
                                        {template.rating || 5.0}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl",
                                    template.difficulty === "Elite" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                                        template.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                            "bg-green-500/10 text-green-500 border border-green-500/20"
                                )}>
                                    {template.difficulty}
                                </span>
                                <button className="p-4 rounded-2xl bg-card border border-border hover:border-primary hover:scale-110 transition-all">
                                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-10 rounded-[3rem] border border-border border-dashed bg-card/5 hover:bg-card/10 hover:border-primary transition-all flex flex-col items-center justify-center gap-6 group"
                    >
                        <div className="w-16 h-16 rounded-full border border-border/50 flex items-center justify-center group-hover:scale-110 transition-all">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="text-xl font-black italic tracking-tight lowercase text-muted-foreground">Add New Pattern</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-30 mt-1">Foundry Blueprints</div>
                        </div>
                    </button>
                </div>
            )}

            {/* Create Template Modal */}
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
                            <h2 className="text-4xl font-black italic tracking-tighter lowercase">Forge <span className="text-gradient">Pattern</span></h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Pattern Identity</label>
                                    <input
                                        type="text"
                                        required
                                        value={templateForm.name}
                                        onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                        placeholder="React Neural Interface"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Logic Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        required
                                        value={templateForm.stack}
                                        onChange={(e) => setTemplateForm({ ...templateForm, stack: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                        placeholder="Next.js, Tailwind, Framer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Detailed Description</label>
                                <textarea
                                    className="w-full px-8 py-5 rounded-4xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold h-32"
                                    value={templateForm.description}
                                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                                    placeholder="Premium dashboard pattern for advanced AI nodes..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Access Difficulty</label>
                                    <select
                                        value={templateForm.difficulty}
                                        onChange={(e) => setTemplateForm({ ...templateForm, difficulty: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold text-primary italic lowercase"
                                    >
                                        <option value="Entry">Entry</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Elite">Elite</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Pattern Type</label>
                                    <select
                                        value={templateForm.type}
                                        onChange={(e) => setTemplateForm({ ...templateForm, type: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold text-primary italic lowercase"
                                    >
                                        <option value="Web">Web Foundry</option>
                                        <option value="Mobile">Mobile Node</option>
                                        <option value="Full-Stack">Vertical Stack</option>
                                        <option value="AI-enabled">Neural Active</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-border group hover:border-amber-500/50 transition-all cursor-pointer"
                                onClick={() => setTemplateForm({ ...templateForm, isFeatured: !templateForm.isFeatured })}>
                                <div className={cn(
                                    "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                                    templateForm.isFeatured ? "bg-amber-500 border-amber-500 text-white" : "border-border text-transparent"
                                )}>
                                    <Check className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-black italic lowercase">Promote to Featured</div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Pin to matrix top level</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-6 rounded-4xl bg-primary text-primary-foreground font-black italic text-xl tracking-tight lowercase hover:scale-105 transition-all shadow-2xl shadow-primary/20"
                            >
                                Dispatch Pattern
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
