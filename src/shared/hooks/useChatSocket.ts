import { useEffect, useRef } from 'react';
import type { Socket } from 'socket.io-client';
import { useAppSelector } from '@store/hooks';
import type { ChatMessage } from '@shared/api/messages.api';
import { createAuthenticatedSocket, WS_BASE_URL } from '@shared/services/socket/socketClient';

const CHAT_EVENT = 'new_message';

interface UseChatSocketOptions {
    roomId?: string;
    onNewMessage: (message: ChatMessage) => void;
}

/**
 * Establishes a Socket.io connection for real-time chat updates.
 * Listens for `new_message` events.
 * When `roomId` is provided, emits a join-room event on connect.
 */
export function useChatSocket({ roomId, onNewMessage }: UseChatSocketOptions) {
    const socketRef = useRef<Socket | null>(null);
    const onNewMessageRef = useRef(onNewMessage);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    // Keep callback ref up to date without triggering re-subscriptions
    useEffect(() => {
        onNewMessageRef.current = onNewMessage;
    }, [onNewMessage]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const socket = createAuthenticatedSocket(WS_BASE_URL, {
            autoConnect: true,
            // transports: ['websocket']
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            if (roomId) {
                socket.emit("join_room", { roomId });
            }
        });

        socket.on(CHAT_EVENT, (message: ChatMessage) => {
            onNewMessageRef.current(message);
        });

        socket.on('connect_error', (err) => {
            if (!err.message?.startsWith('Authentication error')) {
                console.warn('[ChatSocket] Connection error:', err.message);
            }
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    // Re-connect when roomId or authentication state changes
    }, [roomId, isAuthenticated]);

    return socketRef;
}

