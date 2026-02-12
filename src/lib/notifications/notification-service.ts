/**
 * Notification Service
 * 
 * Logic for creating, managing, and retrieving notifications.
 * Works with the database for persistence and Electron for toasts.
 */

import { db } from '../../db';
import { notifications } from '../../db/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import type { Notification, NewNotification } from '../../db/schema';

export class NotificationService {
    /**
     * Create a new notification
     */
    async create(notification: NewNotification): Promise<Notification> {
        const [result] = await db.insert(notifications).values(notification).returning();
        return result;
    }

    /**
     * Get all notifications
     */
    async getAll(limit = 50, offset = 0): Promise<Notification[]> {
        return db
            .select()
            .from(notifications)
            .orderBy(desc(notifications.createdAt))
            .limit(limit)
            .offset(offset);
    }

    /**
     * Get unread notification count
     */
    async getUnreadCount(): Promise<number> {
        const result = await db
            .select({ count: sql<number>`count(*)` })
            .from(notifications)
            .where(eq(notifications.isRead, false));
        return result[0]?.count || 0;
    }

    /**
     * Mark a notification as read
     */
    async markAsRead(id: number): Promise<void> {
        await db
            .update(notifications)
            .set({ isRead: true })
            .where(eq(notifications.id, id));
    }

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(): Promise<void> {
        await db
            .update(notifications)
            .set({ isRead: true })
            .where(eq(notifications.isRead, false));
    }

    /**
     * Delete a notification
     */
    async delete(id: number): Promise<void> {
        await db.delete(notifications).where(eq(notifications.id, id));
    }

    /**
     * Clear all notifications
     */
    async clearAll(): Promise<void> {
        await db.delete(notifications);
    }

    /**
     * Cleanup old notifications (older than 30 days)
     */
    async cleanup(): Promise<void> {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        await db.delete(notifications).where(sql`${notifications.createdAt} < ${thirtyDaysAgo.getTime() / 1000}`);
    }
}

export const notificationService = new NotificationService();
