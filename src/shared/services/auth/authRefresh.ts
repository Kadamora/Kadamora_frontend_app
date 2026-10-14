import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from './authStorage';
import { logout, setTokens } from '@store/auth/auth.slice';

import type { UnknownAction } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type DispatchFn = (action: UnknownAction) => void;

let storeDispatch: DispatchFn | null = null;
let refreshPromise: Promise<string> | null = null;

export function setAuthRefreshDispatch(dispatch: DispatchFn): void {
    storeDispatch = dispatch;
}

/**
 * Checks if an RTK Query error is due to an expired access token.
 */
export function isTokenExpiredError(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false;
    const err = error as { status?: number | string; data?: { message?: string } };
    return err.status === 401 && err.data?.message === 'Token expired';
}

/**
 * Checks if an Axios error is due to an expired access token.
 */
export function isAxiosTokenExpiredError(error: unknown): boolean {
    if (!error || typeof error !== 'object') return false;
    const err = error as {
        response?: {
            status?: number;
            data?: {
                message?: string;
            };
        };
    };
    return err.response?.status === 401 && err.response?.data?.message === 'Token expired';
}

/**
 * Single-flight refresh token coordinator.
 * Ensures only one POST /auth/refresh request is executed at a time.
 * If multiple requests fail concurrently, they all await the same refresh promise.
 */
export async function refreshTokens(customDispatch?: DispatchFn): Promise<string> {
    const dispatch = customDispatch || storeDispatch;

    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const refreshToken = getRefreshToken();
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            const json = await response.json();

            // Backend envelope: { success, statusCode, message, data: { accessToken, refreshToken, accessTokenExpiresAt }, errors }
            if (!response.ok || !json.data?.accessToken || !json.data?.refreshToken) {
                const message = json.message || 'Token refresh failed';
                throw new Error(message);
            }

            const { accessToken, refreshToken: newRefreshToken } = json.data;
            saveTokens({ accessToken, refreshToken: newRefreshToken });

            if (dispatch) {
                dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
            }

            return accessToken;
        } catch (error) {
            // Refresh token invalid, expired, or revoked -> clear session & logout
            clearTokens();
            if (dispatch) {
                dispatch(logout());
            }
            throw error;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

/**
 * Checks if an error is a 403 error for an inactive/disabled account mentioning support.
 */
export function isInactiveAccountError(error: unknown): { isInactive: boolean; message: string } {
    if (!error || typeof error !== 'object') {
        return { isInactive: false, message: '' };
    }

    const err = error as any;
    const status = err.status ?? err.response?.status ?? err.statusCode;

    if (status !== 403 && status !== '403') {
        return { isInactive: false, message: '' };
    }

    const message: string =
        err.data?.message ||
        err.response?.data?.message ||
        err.message ||
        '';

    const normalizedMsg = message.toLowerCase();
    const mentionsSupport =
        normalizedMsg.includes('support') ||
        normalizedMsg.includes('disabled') ||
        normalizedMsg.includes('deactivated') ||
        normalizedMsg.includes('inactive');

    if (mentionsSupport) {
        return {
            isInactive: true,
            message: message || 'Your account is inactive. Please contact support at support@kadamora.com.',
        };
    }

    return { isInactive: false, message: '' };
}

/**
 * Logs out the user when an account is disabled/deactivated, stores the message,
 * and navigates to the login screen.
 */
export function handleInactiveAccountLogout(message: string, customDispatch?: DispatchFn): void {
    const dispatch = customDispatch || storeDispatch;
    clearTokens();
    if (dispatch) {
        dispatch(logout());
    }

    const fallbackMsg = message || 'Your account is inactive. Please contact support at support@kadamora.com.';
    try {
        sessionStorage.setItem('authErrorMessage', fallbackMsg);
    } catch (e) {
        console.error('Failed to store auth error message', e);
    }

    if (typeof window !== 'undefined') {
        const isAdmin = window.location.pathname.startsWith('/admin');
        const isHT = window.location.pathname.startsWith('/hospitality-tours');
        const loginPath = isAdmin
            ? '/admin/auth/login'
            : isHT
            ? '/hospitality-tours/auth/login'
            : '/auth/login';

        if (!window.location.pathname.includes('/login')) {
            window.location.href = loginPath;
        }
    }
}

export { getAccessToken, getRefreshToken };
