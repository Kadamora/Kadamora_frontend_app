import { io, type Socket, type ManagerOptions, type SocketOptions } from 'socket.io-client';
import { getAccessToken, refreshTokens } from '@shared/services/auth/authRefresh';

export const WS_BASE_URL: string =
    import.meta.env.VITE_WS_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '');

export type SocketClientOptions = Partial<ManagerOptions & SocketOptions>;

/**
 * Creates and configures a Socket.IO client instance following the security update:
 * 1. Reads the current token dynamically on every (re)connect via auth callback.
 * 2. On a `connect_error` starting with "Authentication error", refreshes tokens
 *    via single-flight coordinator, then reconnects.
 */
export function createAuthenticatedSocket(
    url: string = WS_BASE_URL,
    options?: SocketClientOptions
): Socket {
    let isRefreshing = false;

    const socket = io(url, {
        ...options,
        auth: (cb: (data: { token: string | null }) => void) => {
            cb({ token: getAccessToken() });
        },
    });

    socket.on('connect_error', async (err: Error) => {
        const msg = (err.message || '').toLowerCase();
        if (msg.includes('support') || msg.includes('disabled') || msg.includes('inactive')) {
            import('@shared/services/auth/authRefresh').then(({ handleInactiveAccountLogout }) => {
                handleInactiveAccountLogout(err.message);
            });
            socket.disconnect();
            return;
        }

        if (err.message && err.message.startsWith('Authentication error')) {
            if (isRefreshing) return;
            isRefreshing = true;

            try {
                await refreshTokens();
                socket.connect();
            } catch (refreshErr) {
                console.error('[Socket] Re-authentication failed after token refresh:', refreshErr);
            } finally {
                isRefreshing = false;
            }
        }
    });

    return socket;
}
