import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */



/* =======================
   API
======================= */

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSubscriptionPlans: builder.query({
            query: () => ({
                url: `/api/v1/subscriptions/plans`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        getSubscriptionById: builder.query({
            query: (id) => ({
                url: `/api/v1/subscriptions/plans/${id}`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        subscribeToPlan: builder.mutation({
            query: () => ({
                url: `/api/v1/subscriptions/subscribe`,
                method: "POST",
            }),
            invalidatesTags: ["Subscription"],
        }),
        createSubscriptionAdmin: builder.mutation({
            query: () => ({
                url: `/api/v1/subscriptions/admin/plans`,
                method: "POST",
            }),
            invalidatesTags: ["Subscription"],
        }),
        updateSubscriptionAdmin: builder.mutation({
            query: (id) => ({
                url: `/api/v1/subscriptions/admin/plans/${id}`,
                method: "PUT",
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
