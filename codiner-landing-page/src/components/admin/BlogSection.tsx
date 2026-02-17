"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FileText, Plus, Search, Calendar, User, Eye, ArrowUpRight, Clock, Image as ImageIcon, MoreVertical, CheckCircle2, X, Trash2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BlogSection() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postForm, setPostForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        author: "Subhan Haider",
        status: "Draft",
        coverImage: ""
    });

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const postsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postsList);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPost = {
                ...postForm,
                createdAt: serverTimestamp(),
                views: 0,
                slug: postForm.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
            };
            const docRef = await addDoc(collection(db, "posts"), newPost);
            setPosts([{ id: docRef.id, ...newPost, createdAt: new Date().toISOString() }, ...posts]);
            setIsModalOpen(false);
            setPostForm({ title: "", excerpt: "", content: "", author: "Subhan Haider", status: "Draft", coverImage: "" });
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Permanently erase this logic thread from the matrix?")) return;
        try {
            await deleteDoc(doc(db, "posts", id));
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleUpdateStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "Published" ? "Draft" : "Published";
        try {
            await updateDoc(doc(db, "posts", id), { status: newStatus });
            setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="space-y-12 text-left relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-4xl font-black italic tracking-tighter lowercase mb-2">Manage <span className="text-gradient">Logic Hub</span></h3>
                    <p className="text-muted-foreground font-medium italic lowercase tracking-tight">Compose articles, tutorials, and announcements.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black italic tracking-tight lowercase hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    New Article
                </button>
            </div>

            <div className="p-10 rounded-[3.5rem] border border-border bg-card/20 backdrop-blur-3xl shadow-3xl">
                {loading ? (
                    <div className="py-20 flex justify-center">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.length > 0 ? posts.map((post, i) => (
                            <div key={post.id} className="group p-8 rounded-[2.5rem] bg-white/2 border border-border/50 hover:border-primary/50 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 flex gap-2">
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="p-3 rounded-xl hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="w-32 h-20 rounded-2xl bg-card border border-border flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform relative">
                                    {post.coverImage ? (
                                        <img src={post.coverImage} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                                    )}
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-2">
                                        <button
                                            onClick={() => handleUpdateStatus(post.id, post.status)}
                                            className={cn(
                                                "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-colors",
                                                post.status === "Published" ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                                            )}
                                        >
                                            {post.status}
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await updateDoc(doc(db, "posts", post.id), { featured: !post.featured });
                                                setPosts(posts.map(p => p.id === post.id ? { ...p, featured: !p.featured } : p));
                                            }}
                                            className={cn(
                                                "p-1.5 rounded-lg border transition-all",
                                                post.featured ? "bg-amber-500/20 border-amber-500/50 text-amber-500" : "bg-white/5 border-border text-muted-foreground hover:border-amber-500/50"
                                            )}
                                        >
                                            <Star className={cn("w-3 h-3 transition-transform", post.featured && "fill-amber-500 scale-110")} />
                                        </button>
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                                            {post.createdAt ? (typeof post.createdAt === 'string' ? new Date(post.createdAt).toLocaleDateString() : post.createdAt.toDate().toLocaleDateString()) : 'N/A'}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black italic tracking-tighter lowercase group-hover:text-primary transition-colors truncate pr-12">{post.title}</h4>
                                    <div className="flex items-center gap-6 mt-4">
                                        <div className="flex items-center gap-2 text-xs font-bold italic text-muted-foreground lowercase">
                                            <User className="w-3 h-3" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold italic text-muted-foreground lowercase">
                                            <Eye className="w-3 h-3" />
                                            {post.views || 0} Views
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-8">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-sm font-black italic tracking-tight lowercase hover:border-primary transition-all">
                                        Edit Flow <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="p-20 text-center italic text-muted-foreground lowercase font-medium">No logic threads discovered in the matrix yet.</div>
                        )}
                    </div>
                )}
            </div>

            {/* Create Post Modal */}
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
                            <h2 className="text-4xl font-black italic tracking-tighter lowercase">Compose <span className="text-gradient">Logic</span></h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Article Identity</label>
                                <input
                                    type="text"
                                    required
                                    value={postForm.title}
                                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                                    className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                    placeholder="The Neural Foundry Revolution"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Cover Image Matrix URL</label>
                                <input
                                    type="url"
                                    value={postForm.coverImage}
                                    onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                                    className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold text-sm"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Logic Excerpt</label>
                                <textarea
                                    className="w-full px-8 py-5 rounded-4xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold h-24"
                                    value={postForm.excerpt}
                                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                                    placeholder="A brief signal of what's inside..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Full Matrix Content (Markdown enabled)</label>
                                <textarea
                                    className="w-full px-8 py-5 rounded-4xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold h-64"
                                    value={postForm.content}
                                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                                    placeholder="Inject your logic here..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Node Author</label>
                                    <input
                                        type="text"
                                        required
                                        value={postForm.author}
                                        onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Initial State</label>
                                    <select
                                        value={postForm.status}
                                        onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}
                                        className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-border focus:border-primary outline-none transition-all font-bold text-primary italic lowercase"
                                    >
                                        <option value="Draft">Draft Mode</option>
                                        <option value="Published">Broadcast Live</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-6 rounded-4xl bg-primary text-primary-foreground font-black italic text-xl tracking-tight lowercase hover:scale-105 transition-all shadow-2xl shadow-primary/20"
                            >
                                Dispatch Signal
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
