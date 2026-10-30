import { baseApi } from "./baseApi";

export interface SignupPayload {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isTermsAccepted: boolean;
    phoneNumber: string;
}
export interface SignupResponse {
    message?: string;
    data?: {
        message?: string;
    };
    statusCode?: number;
}

export interface ContactUsPayload {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    source: string;
}
export interface ContactUsResponse {
    message?: string;
}

export interface VerifyAccountPayload {
    otp: string;
    email: string;
}
export interface VerifyAccountData {
    accessToken: string;
    refreshToken: string;
    message: string;
    user?: any;
}
export interface VerifyAccountResponse {
    data: VerifyAccountData;
    statusCode: number;
}
export interface ResendVerificationPayload {
    email: string;
}
export interface ResendVerificationResponse {
    message?: string;
    statusCode?: number;
}
export interface LoginPayload {
    email: string;
    password: string;
}
export type LoginResponse = {
    data: VerifyAccountData;
    statusCode: number;
};

export interface ForgotPasswordPayload {
    email: string;
}
export interface ForgotPasswordResponse {
    message?: string;
}

export interface ResetPasswordPayload {
    email: string;
    newPassword: string;
    confirmPassword: string;
    otp: string;
}
export interface ResetPasswordResponse {
    success?: boolean;
    statusCode?: number;
    message?: string;
    data?: null;
    errors?: any;
}
export interface AccountData {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    imgUrl: string | null;
    role: string;
    isVerified: boolean;
    lastLoginAt: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface AccountResponse {
    data: AccountData;
    statusCode: number;
}
export interface AuthChangePasswordPayload {
    oldPassword?: string;
    currentPassword?: string;
    newPassword: string;
}
export interface AuthChangePasswordResponse {
    message?: string;
    success?: boolean;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/signup',
                method: 'POST',
                body: payload,
            }),
        }),
        contactUs: builder.mutation<ContactUsResponse, ContactUsPayload>({
            query: (payload) => ({
                url: '/api/v1/contact',
                method: 'POST',
                body: payload,
            }),
        }),
        verifyAccount: builder.mutation<VerifyAccountResponse, VerifyAccountPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/verify-account',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Account'],
        }),
        login: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Account'],
        }),
        requestPasswordReset: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/forgot-password',
                method: 'POST',
                body: payload,
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/reset-password',
                method: 'POST',
                body: payload,
            }),
        }),
        changePassword: builder.mutation<AuthChangePasswordResponse, AuthChangePasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/auth/change-password',
                method: 'POST',
                body: payload,
            }),
        }),
        resendVerification: builder.mutation<ResendVerificationResponse, ResendVerificationPayload>({
            query: ({ email }) => ({
                url: '/api/v1/auth/resend-verification',
                method: 'POST',
                body: { email },
            }),
        }),
        getAccount: builder.query<AccountResponse, void>({
            query: () => '/api/v1/auth/account',
            providesTags: ["Account"]
        })
    })
})

export const {
    useSignupMutation,
    useVerifyAccountMutation,
    useResendVerificationMutation,
    useLoginMutation,
    useRequestPasswordResetMutation,
    useResetPasswordMutation,
    useChangePasswordMutation: useAuthChangePasswordMutation,
    useGetAccountQuery,
    useContactUsMutation,
} = authApi
