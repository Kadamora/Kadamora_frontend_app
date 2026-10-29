import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import {
    getAccessToken,
    isAxiosTokenExpiredError,
    refreshTokens,
    isInactiveAccountError,
    handleInactiveAccountLogout,
} from '@shared/services/auth/authRefresh';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kadamora-test-app-38pdp.ondigitalocean.app';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Attach current access token to outgoing requests if available
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 403 Inactive account & 401 "Token expired" with single-flight refresh and single retry
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If 403 inactive account mentioning support: log out and redirect to login
        const { isInactive, message } = isInactiveAccountError(error);
        if (isInactive) {
            handleInactiveAccountLogout(message);
            throw error;
        }

        const original = error.config;
        const expired = isAxiosTokenExpiredError(error);

        if (!expired || original?._retried) {
            throw error;
        }

        original._retried = true;

        try {
            const token = await refreshTokens();
            if (original.headers) {
                original.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(original);
        } catch (e) {
            // refreshTokens handles clearing tokens and logout
            throw e;
        }
    },
);

export type RequestConfig<TData = unknown> = AxiosRequestConfig<TData>;

export async function request<TResponse, TData = unknown>(config: RequestConfig<TData>): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(
        config,
    );
    return response.data;
}

export function setAuthToken(token: string | null): void {
    if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
        return;
    }

    delete apiClient.defaults.headers.common.Authorization;
}

export default apiClient;

