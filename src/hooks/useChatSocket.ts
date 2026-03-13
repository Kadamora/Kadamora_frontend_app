import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@store/hooks';
import type { ChatMessage } from '@store/api/messages.api';

const WS_URL = import.meta.env.VITE_WS_URL ;
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
    const token = useAppSelector((state) => state.auth.accessToken);

    // Keep callback ref up to date without triggering re-subscriptions
    useEffect(() => {
        onNewMessageRef.current = onNewMessage;
    }, [onNewMessage]);

    useEffect(() => {
        const socket = io(WS_URL, {
            auth: { token },
            autoConnect: true,
            // transports: ['websocket']
        });

        socketRef.current = socket;

        socket.on('connect', () => {
            if (roomId) {
                // TODO: Replace 'join_room_placeholder' with the actual join event name
                socket.emit("join_room", { roomId });
            }
        });

        socket.on(CHAT_EVENT, (message: ChatMessage) => {
            onNewMessageRef.current(message);
        });

        socket.on('connect_error', (err) => {
            console.warn('[ChatSocket] Connection error:', err.message);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    // Re-connect when roomId or token changes
    }, [roomId, token]);

    return socketRef;
}
