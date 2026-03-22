import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface InviteTenantPayload {
    propertyId: string;
    tenants: Array<{
        email: string;
        propertyType: string;
        amount: number;
        paymentFrequency: string;
        rentStartDate: string;
    }>;
}

export interface RecordPaymentPayload {
    tenantId: string;
    amount: number;
    paymentDate: string;
}

export interface UpdateTenantPayload {
    tenantId: string;
    unit?: string;
    rentPrice?: number | string;
    rentDueDate?: string;
    type?: string;
}

export interface TenantResponse {
    message: string;
    data?: {
        total: number;
        tenants: any[];
    };
}

/* =======================
   API
======================= */

export const tenantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        inviteTenant: builder.mutation<TenantResponse, InviteTenantPayload>({
            query: ({ propertyId, tenants }) => ({
                url: `/api/v1/tenants/invite-tenant/${propertyId}`,
                method: "POST",
                body: { tenants },
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        recordPayment: builder.mutation<TenantResponse, RecordPaymentPayload>({
            query: (payload) => ({
                url: `/api/v1/tenants/record-payment`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getOverdueRents: builder.query<TenantResponse, void>({
            query: () => ({
                url: `/api/v1/tenants/overdue-rents`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        updateTenant: builder.mutation<TenantResponse, UpdateTenantPayload>({
            query: ({ tenantId, ...payload }) => ({
                url: `/api/v1/tenants/update-tenant/${tenantId}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getAllTenants: builder.query<TenantResponse, void>({
            query: () => ({
                url: `/api/v1/tenants`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        leaveProperty: builder.mutation<TenantResponse, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/tenants/leave-property/${propertyId}`,
                method: "PUT",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useInviteTenantMutation,
    useRecordPaymentMutation,
    useGetOverdueRentsQuery,
    useUpdateTenantMutation,
    useGetAllTenantsQuery,
    useLeavePropertyMutation,
} = tenantApi;
