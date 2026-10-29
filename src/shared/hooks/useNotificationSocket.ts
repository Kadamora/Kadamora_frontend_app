import { useEffect, useRef } from 'react';
import type { Socket } from 'socket.io-client';
import { useAppSelector } from '@store/hooks';
import type { Notification } from '@shared/api/notification.api';
import { createAuthenticatedSocket, WS_BASE_URL } from '@shared/services/socket/socketClient';

// Real event names provided by the backend
const NOTIFICATION_EVENT = 'notification_received';
const UNREAD_COUNT_EVENT = 'unread_count_update';

interface UnreadCountPayload {
    unreadCount: number;
}

interface UseNotificationSocketOptions {
    onNotification?: (notification: Notification) => void;
    onUnreadCountUpdate?: (payload: UnreadCountPayload) => void;
}

export function useNotificationSocket({
    onNotification,
    onUnreadCountUpdate,
}: UseNotificationSocketOptions) {
    const socketRef = useRef<Socket | null>(null);
    const onNotificationRef = useRef(onNotification);
    const onUnreadCountRef = useRef(onUnreadCountUpdate);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Keep refs up to date without triggering re-subscriptions
    useEffect(() => {
        onNotificationRef.current = onNotification;
        onUnreadCountRef.current = onUnreadCountUpdate;
    }, [onNotification, onUnreadCountUpdate]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const socket = createAuthenticatedSocket(WS_BASE_URL, {
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
            if (!err.message?.startsWith('Authentication error')) {
                console.warn('[NotificationSocket] Connection error:', err.message);
            }
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [isAuthenticated]);

    return socketRef;
}

