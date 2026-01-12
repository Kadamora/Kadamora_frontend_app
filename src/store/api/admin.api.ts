import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export type AgentStatus = "pending" | "approved" | "rejected";

export type AgentDocumentsMap = Record<string, string[] | null | undefined>;

export interface AgentProfile {
    id: string;
    userId?: string;
    agencyCompanyName?: string;
    position?: string;
    yearsOfExperience?: number;
    areaOfOperation?: string;
    registrationLicenseNumber?: string;
    bio?: string;
    website?: string | null;
    linkedinProfile?: string | null;
    status?: AgentStatus | Uppercase<AgentStatus>;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
    isVerified?: boolean;
    canListProperties?: boolean;
    approvedAt?: string | null;
    rejectedAt?: string | null;
    rejectionReason?: string | null;
    documents?: AgentDocumentsMap | null;
    createdAt?: string;
    updatedAt?: string;
    companyName?: string;
    companyAddress?: string;
    companyEmail?: string;
    companyPhoneNumber?: string;
    companyDescription?: string;
    companyWebsite?: string | null;
    data?: any
}

export interface AgentProfileResponse {
    data: AgentProfile;
    message?: string;
    statusCode: number;
}

/* =======================
   API
======================= */

export const adminAgentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminAgent: builder.query<AgentProfile, void>({
            query: () => ({
                url: "/api/v1/admin/admin-agents",
                method: "GET",
            }),
            providesTags: ["AdminAgent"],
        }),
        getAdminAgentById: builder.query<any, void>({
            query: (agentId) => ({
                url: `/api/v1/admin/admin-agents/${agentId}`,
                method: "GET",
            }),
            providesTags: ["AdminAgent"],
        }),
        approveAgent: builder.mutation<void, string>({
            query: (agentId) => ({
                url: `/admin/${agentId}/approve`,
                method: "POST",
            }),
            invalidatesTags: ["AdminAgent"],
        }),

        rejectAgent: builder.mutation<void, string>({
            query: (agentId) => ({
                url: `/admin/${agentId}/reject`,
                method: "POST",
            }),
            invalidatesTags: ["AdminAgent"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetAdminAgentQuery,
    useApproveAgentMutation,
    useRejectAgentMutation,
    useGetAdminAgentByIdQuery,
} = adminAgentApi;