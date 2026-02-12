/**
 * Notification IPC Handlers
 * 
 * Exposes notification functionality to the renderer process.
 */

import { ipcMain } from 'electron';
import { notificationService } from '../../lib/notifications/notification-service';
import type { NewNotification } from '../../db/schema';

export function registerNotificationHandlers() {
    /**
     * Create a notification
     */
    ipcMain.handle('notification:create', async (_, notification: NewNotification) => {
        try {
            const result = await notificationService.create(notification);
            return { success: true, data: result };
        } catch (error) {
            console.error('Error creating notification:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Get all notifications
     */
    ipcMain.handle('notification:get-all', async (_, limit?: number, offset?: number) => {
        try {
            const notifications = await notificationService.getAll(limit, offset);
            return { success: true, data: notifications };
        } catch (error) {
            console.error('Error getting notifications:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Get unread count
     */
    ipcMain.handle('notification:get-unread-count', async () => {
        try {
            const count = await notificationService.getUnreadCount();
            return { success: true, data: count };
        } catch (error) {
            console.error('Error getting unread count:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Mark as read
     */
    ipcMain.handle('notification:mark-as-read', async (_, id: number) => {
        try {
            await notificationService.markAsRead(id);
            return { success: true };
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Mark all as read
     */
    ipcMain.handle('notification:mark-all-as-read', async () => {
        try {
            await notificationService.markAllAsRead();
            return { success: true };
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Delete notification
     */
    ipcMain.handle('notification:delete', async (_, id: number) => {
        try {
            await notificationService.delete(id);
            return { success: true };
        } catch (error) {
            console.error('Error deleting notification:', error);
            return { success: false, error: String(error) };
        }
    });

    /**
     * Clear all notifications
     */
    ipcMain.handle('notification:clear-all', async () => {
        try {
            await notificationService.clearAll();
            return { success: true };
        } catch (error) {
            console.error('Error clearing notifications:', error);
            return { success: false, error: String(error) };
        }
    });
}
