import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    X,
    CheckCheck,
    Trash2,
    Info,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Sparkles,
    Settings
} from "lucide-react";
import { useNotifications } from "../../contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const NotificationCenter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
    } = useNotifications();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <CheckCircle2 className="w-4 h-4 text-green-400" />;
            case "error": return <XCircle className="w-4 h-4 text-red-400" />;
            case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
            case "ai": return <Sparkles className="w-4 h-4 text-purple-400" />;
            case "system": return <Settings className="w-4 h-4 text-blue-400" />;
            default: return <Info className="w-4 h-4 text-blue-400" />;
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all active:scale-95 group"
            >
                <Bell className={cn(
                    "w-5 h-5 transition-colors",
                    isOpen ? "text-indigo-400" : "text-white/60 group-hover:text-white"
                )} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-500 text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-3 w-80 md:w-96 rounded-2xl bg-[#0c0c0e] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[9999] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-white text-base">Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-indigo-400 transition-colors"
                                    title="Mark all as read"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); clearAll(); }}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-colors"
                                    title="Clear all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar bg-[#0c0c0e]">
                            {notifications.length === 0 ? (
                                <div className="p-8 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                                        <Bell className="w-6 h-6 text-white/20" />
                                    </div>
                                    <p className="text-white/40 text-sm">All caught up!</p>
                                    <p className="text-white/20 text-xs mt-1">No new notifications to show.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {notifications.map((notification) => (
                                        <motion.div
                                            layout
                                            key={notification.id}
                                            className={cn(
                                                "p-4 hover:bg-white/[0.04] transition-colors relative group",
                                                !notification.isRead && "bg-indigo-500/[0.05]"
                                            )}
                                            onMouseEnter={() => !notification.isRead && markAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className="mt-0.5 flex-shrink-0">
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className={cn(
                                                            "text-[13px] font-bold leading-tight mb-1",
                                                            notification.isRead ? "text-white/70" : "text-white"
                                                        )}>
                                                            {notification.title}
                                                        </h4>
                                                        <span className="text-[10px] text-white/30 whitespace-nowrap">
                                                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                                        </span>
                                                    </div>
                                                    <p className="text-[12px] text-white/50 line-clamp-2 leading-snug">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-white/10 text-white/30 hover:text-red-400 transition-all h-fit"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            {!notification.isRead && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-3 bg-white/[0.03] border-t border-white/5 text-center">
                                <button className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest font-black">
                                    View History
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
