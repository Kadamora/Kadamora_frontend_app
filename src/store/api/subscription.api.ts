import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface SubscriptionPlanPrice {
    monthly: number;
    quarterly: number;
    annually: number;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    tierLabel?: string;
    targetUsers?: string;
    description?: string;
    features?: string;
    prices?: SubscriptionPlanPrice;
    // Fallback flat price fields if the API returns individual fields
    monthlyPrice?: number;
    quarterlyPrice?: number;
    annualPrice?: number;
}

export interface SubscribeToPlanInput {
    planId: string;
    billingCycle: "monthly" | "quarterly" | "annually";
}

export interface CreateSubscriptionPlanInput {
    name: string;
    description?: string;
    monthlyPrice: number;
    quarterlyPrice: number;
    annualPrice: number;
}

/* =======================
   API
======================= */

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSubscriptionPlans: builder.query<{ data: SubscriptionPlan[] }, void>({
            query: () => ({
                url: `/api/v1/subscriptions/plans`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        getSubscriptionById: builder.query<{ data: SubscriptionPlan }, string>({
            query: (id) => ({
                url: `/api/v1/subscriptions/plans/${id}`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        subscribeToPlan: builder.mutation<{ data: any }, SubscribeToPlanInput>({
            query: (body) => ({
                url: `/api/v1/subscriptions/subscribe`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Subscription"],
        }),
        createSubscriptionAdmin: builder.mutation<{ data: SubscriptionPlan }, CreateSubscriptionPlanInput>({
            query: (body) => ({
                url: `/api/v1/subscriptions/admin/plans`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Subscription"],
        }),
        updateSubscriptionAdmin: builder.mutation<{ data: SubscriptionPlan }, { id: string; body: Partial<CreateSubscriptionPlanInput> }>({
            query: ({ id, body }) => ({
                url: `/api/v1/subscriptions/admin/plans/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetAllSubscriptionPlansQuery,
    useGetSubscriptionByIdQuery,
    useSubscribeToPlanMutation,
    useCreateSubscriptionAdminMutation,
    useUpdateSubscriptionAdminMutation,
} = subscriptionApi;
