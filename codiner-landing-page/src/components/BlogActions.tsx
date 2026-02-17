"use client";

import { Share2, Bookmark, MessageSquare, Check } from "lucide-react";
import { useState } from "react";

export default function BlogActions({ postTitle }: { postTitle: string }) {
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: postTitle,
                    url: url,
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSave = () => {
        setSaved(!saved);
        // In a real app, this would persist to localStorage or a DB
    };

    return (
        <div className="flex items-center gap-8">
            <button
                onClick={handleShare}
                className="flex items-center gap-2 font-bold hover:text-primary transition-colors group"
            >
                {copied ? (
                    <span className="flex items-center gap-2 text-green-500 animate-in fade-in transition-all">
                        <Check className="w-5 h-5" /> link copied
                    </span>
                ) : (
                    <>
                        <Share2 className="w-5 h-5 group-hover:animate-bounce" /> share
                    </>
                )}
            </button>
            <button
                onClick={handleSave}
                className="flex items-center gap-2 font-bold hover:text-primary transition-colors group"
            >
                <Bookmark className={`w-5 h-5 transition-all ${saved ? "fill-primary text-primary" : "group-hover:fill-primary/20"}`} />
                {saved ? "saved" : "save"}
            </button>
            <a
                href="https://github.com/Subhan-Haider/Codiner-Software/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold hover:text-primary transition-colors group"
            >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" /> 12 comments
            </a>
        </div>
    );
}
