import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { Notification, NewNotification } from '../db/schema';

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    addNotification: (notification: Omit<NewNotification, 'createdAt' | 'isRead'>) => Promise<void>;
    markAsRead: (id: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    deleteNotification: (id: number) => Promise<void>;
    clearAll: () => Promise<void>;
    refresh: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            const [listRes, countRes] = await Promise.all([
                window.electron.ipcRenderer.invoke('notification:get-all'),
                window.electron.ipcRenderer.invoke('notification:get-unread-count')
            ]);

            if (listRes.success) setNotifications(listRes.data);
            if (countRes.success) setUnreadCount(countRes.data);
        } catch (error) {
            console.error('Failed to refresh notifications:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const addNotification = async (notif: Omit<NewNotification, 'createdAt' | 'isRead'>) => {
        try {
            const res = await window.electron.ipcRenderer.invoke('notification:create', notif);
            if (res.success) {
                // Show toast
                switch (notif.type) {
                    case 'success':
                        toast.success(notif.title, { description: notif.message });
                        break;
                    case 'error':
                        toast.error(notif.title, { description: notif.message });
                        break;
                    case 'warning':
                        toast.warning(notif.title, { description: notif.message });
                        break;
                    default:
                        toast.info(notif.title, { description: notif.message });
                }
                refresh();
            }
        } catch (error) {
            console.error('Failed to create notification:', error);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            const res = await window.electron.ipcRenderer.invoke('notification:mark-as-read', id);
            if (res.success) refresh();
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await window.electron.ipcRenderer.invoke('notification:mark-all-as-read');
            if (res.success) refresh();
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const deleteNotification = async (id: number) => {
        try {
            const res = await window.electron.ipcRenderer.invoke('notification:delete', id);
            if (res.success) refresh();
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const clearAll = async () => {
        try {
            const res = await window.electron.ipcRenderer.invoke('notification:clear-all');
            if (res.success) refresh();
        } catch (error) {
            console.error('Failed to clear notifications:', error);
        }
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                loading,
                addNotification,
                markAsRead,
                markAllAsRead,
                deleteNotification,
                clearAll,
                refresh
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
