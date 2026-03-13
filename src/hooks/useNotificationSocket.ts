import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@store/hooks';
import type { Notification } from '@store/api/notification.api';

// Real event names provided by the backend
const WS_URL = import.meta.env.VITE_WS_URL;
const NOTIFICATION_EVENT = 'notification_received';
const UNREAD_COUNT_EVENT = 'unread_count_update';

interface UnreadCountPayload {
    unreadCount: number;
}

interface UseNotificationSocketOptions {
    /** Called when a new notification arrives */
    onNotification?: (notification: Notification) => void;
    /** Called when the unread count changes */
    onUnreadCountUpdate?: (payload: UnreadCountPayload) => void;
}

/**
 * Establishes a Socket.io connection for real-time notification updates.
 *
 * Listens for:
 *   - `notification_received` — a new notification payload
 *   - `unread_count_update`   — an updated unread count
 */
export function useNotificationSocket({
    onNotification,
    onUnreadCountUpdate,
}: UseNotificationSocketOptions) {
    const socketRef = useRef<Socket | null>(null);
    const onNotificationRef = useRef(onNotification);
    const onUnreadCountRef = useRef(onUnreadCountUpdate);
    const token = useAppSelector((state) => state.auth.accessToken);

    // Keep refs up to date without triggering re-subscriptions
    useEffect(() => {
        onNotificationRef.current = onNotification;
        onUnreadCountRef.current = onUnreadCountUpdate;
    }, [onNotification, onUnreadCountUpdate]);

    useEffect(() => {
        if (!token) return;

        const socket = io(WS_URL, {
            auth: { token },
            autoConnect: true,
        });

        socketRef.current = socket;

        socket.on(NOTIFICATION_EVENT, (notification: Notification) => {
            onNotificationRef.current?.(notification);
        });

        socket.on(UNREAD_COUNT_EVENT, (payload: UnreadCountPayload) => {
            onUnreadCountRef.current?.(payload);
        });

        socket.on('connect_error', (err) => {
            console.warn('[NotificationSocket] Connection error:', err.message);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [token]); // disconnect and reconnect if token changes

    return socketRef;
}
