import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApi, type AccountData } from "@shared/api/auth.api";
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from "@shared/services/auth/authStorage";

interface AuthState {
    user: AccountData | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState : AuthState = {
    user: null,
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    isAuthenticated: Boolean(getAccessToken()),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            clearTokens();
        },
        setCredentials(
            state,
            action: PayloadAction<{ user: AccountData | null; accessToken: string; refreshToken: string }>,
        ) {
            const { user, accessToken, refreshToken } = action.payload;
            if (!accessToken || !refreshToken) return;
            saveTokens({ accessToken, refreshToken });
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = user ?? state.user;
            state.isAuthenticated = true;
        },
        setTokens(
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>,
        ) {
            const { accessToken, refreshToken } = action.payload;
            if (!accessToken || !refreshToken) return;
            saveTokens({ accessToken, refreshToken });
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.verifyAccount.matchFulfilled,
            (state, { payload }) => {
                const data = payload.data;
                if (!data?.accessToken || !data?.refreshToken) return;
                saveTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                });
                state.accessToken = data.accessToken;
                state.refreshToken = data.refreshToken;
                state.user = data.user;
                state.isAuthenticated = true;
            },
        );

        builder.addMatcher(
            authApi.endpoints.getAccount.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.data;
                state.isAuthenticated = true;
            },
        );
    },
});

export const { logout, setCredentials, setTokens } = authSlice.actions;
export default authSlice.reducer;
