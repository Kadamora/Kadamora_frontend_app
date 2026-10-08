import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface AgentProfile {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    state?: string;
    imgUrl?: string;
}

export interface AgentBusinessProfile {
    businessName?: string;
    businessEmail?: string;
    businessPhone?: string;
    businessAddress?: string;
    businessType?: string;
}

export interface NotificationPreferences {
    notifyIncomingRequests?: boolean;
    notifyDeclinedRequests?: boolean;
    notifyMessages?: boolean;
}

export interface GeneralNotificationPreferences {
    notifyIncomingRequests?: boolean;
    notifyDeclinedRequests?: boolean;
    notifyMessages?: boolean;
    emailNewMaintenanceRequests?: boolean;
    emailPaymentNotifications?: boolean;
    emailRentExpiryAlerts?: boolean;
    emailInspectionReminders?: boolean;
    smsEmergencyMaintenance?: boolean;
    autoPaymentReminder?: boolean;
}

export interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
}

export interface DeleteAccountPayload {
    password: string;
    reason?: string;
}

export interface AgentSettingsOverview {
    profile: AgentProfile;
    agentProfile: AgentBusinessProfile;
    notifications: NotificationPreferences;
    generalNotifications: GeneralNotificationPreferences;
    subscription: any;
}

export interface AgentSettingsApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    errors: any;
}

/* =======================
   API
======================= */

export const agentSettingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET full agent settings overview
        getAgentSettingsOverview: builder.query<AgentSettingsApiResponse<AgentSettingsOverview>, void>({
            query: () => ({
                url: '/api/v1/agents/settings/overview',
                method: 'GET',
            }),
            providesTags: ['AgentSettings'],
        }),

        // PUT update user profile settings
        updateAgentProfile: builder.mutation<AgentSettingsApiResponse, AgentProfile>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/profile',
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['AgentSettings'],
        }),

        // PUT update agent business profile
        updateAgentBusinessProfile: builder.mutation<AgentSettingsApiResponse, AgentBusinessProfile>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/agent-profile',
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['AgentSettings'],
        }),

        // GET notification preferences
        getNotificationPreferences: builder.query<AgentSettingsApiResponse<NotificationPreferences>, void>({
            query: () => ({
                url: '/api/v1/agents/settings/notifications',
                method: 'GET',
            }),
            providesTags: ['AgentSettings'],
        }),

        // PATCH update notification preferences
        updateNotificationPreferences: builder.mutation<AgentSettingsApiResponse, NotificationPreferences>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/notifications',
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ['AgentSettings'],
        }),

        // POST change account password
        changePassword: builder.mutation<AgentSettingsApiResponse, ChangePasswordPayload>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/change-password',
                method: 'POST',
                body: payload,
            }),
        }),

        // POST delete agent account
        deleteAgentAccount: builder.mutation<AgentSettingsApiResponse, DeleteAccountPayload>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/delete-account',
                method: 'POST',
                body: payload,
            }),
        }),

        // GET subscription details
        getAgentSubscription: builder.query<AgentSettingsApiResponse<any>, void>({
            query: () => ({
                url: '/api/v1/agents/settings/subscription',
                method: 'GET',
            }),
            providesTags: ['AgentSettings'],
        }),

        // GET general notification preferences
        getGeneralNotificationPreferences: builder.query<AgentSettingsApiResponse<GeneralNotificationPreferences>, void>({
            query: () => ({
                url: '/api/v1/agents/settings/general-notifications',
                method: 'GET',
            }),
            providesTags: ['AgentSettings'],
        }),

        // PATCH update general notification preferences
        updateGeneralNotificationPreferences: builder.mutation<AgentSettingsApiResponse, GeneralNotificationPreferences>({
            query: (payload) => ({
                url: '/api/v1/agents/settings/general-notifications',
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ['AgentSettings'],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetAgentSettingsOverviewQuery,
    useUpdateAgentProfileMutation,
    useUpdateAgentBusinessProfileMutation,
    useGetNotificationPreferencesQuery,
    useUpdateNotificationPreferencesMutation,
    useChangePasswordMutation,
    useDeleteAgentAccountMutation,
    useGetAgentSubscriptionQuery,
    useGetGeneralNotificationPreferencesQuery,
    useUpdateGeneralNotificationPreferencesMutation,
} = agentSettingsApi;
