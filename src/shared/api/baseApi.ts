import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@store/index';
import {
    isTokenExpiredError,
    refreshTokens,
    getAccessToken,
    isInactiveAccountError,
    handleInactiveAccountLogout,
} from '@shared/services/auth/authRefresh';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kadamora-test-app-38pdp.ondigitalocean.app';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const stateToken = (getState() as RootState).auth?.accessToken;
        const token = stateToken || getAccessToken();
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Track the token in use when this request was dispatched
    const tokenUsed = (api.getState() as RootState).auth?.accessToken || getAccessToken();

    let result = await rawBaseQuery(args, api, extraOptions);

    // If 403 inactive account mentioning support: log out and redirect to login
    if (result.error) {
        const { isInactive, message } = isInactiveAccountError(result.error);
        if (isInactive) {
            handleInactiveAccountLogout(message, api.dispatch);
            return result;
        }
    }

    // Only refresh on 401 "Token expired"
    if (result.error && isTokenExpiredError(result.error)) {
        const currentToken = (api.getState() as RootState).auth?.accessToken || getAccessToken();

        try {
            // If another request hasn't already refreshed the token, trigger single-flight refresh
            if (!currentToken || currentToken === tokenUsed) {
                await refreshTokens(api.dispatch);
            }

            // Retry original request once with new token
            result = await rawBaseQuery(args, api, extraOptions);

            // Re-check retried request for 403 inactive account
            if (result.error) {
                const { isInactive, message } = isInactiveAccountError(result.error);
                if (isInactive) {
                    handleInactiveAccountLogout(message, api.dispatch);
                    return result;
                }
            }
        } catch {
            // refreshTokens handles logout & clearTokens if refresh fails or is revoked
            return result;
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Account', 'AdminAgent', 'AgentProfile', 'Property', 'Location', 'Notification', 'PropertyMgt', 'Favorites', 'Subscription', 'ServiceMarket', 'Timeline', 'Messages', 'AgentSettings', 'SupportTicket'
    ] as const,
    endpoints: () => ({})
});