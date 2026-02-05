import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */



/* =======================
   API
======================= */

export const serviceMarketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllListings: builder.query({
            query: () => ({
                url: `/api/v1/services/all`,
                method: "GET",
            }),
            providesTags: ["ServiceMarket"],
        }),
        registerServiceProvider: builder.mutation({
            query: () => ({
                url: `/api/v1/services/onboard`,
                method: "POST",
            }),
            invalidatesTags: ["ServiceMarket"],
        }),
        createServiceListing: builder.mutation({
            query: () => ({
                url: `/api/v1/services/listings`,
                method: "POST",
            }),
            invalidatesTags: ["ServiceMarket"],
        }),
        updateServiceListing: builder.mutation({
            query: (id) => ({
                url: `/api/v1/services/listings/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["ServiceMarket"],
        }),
        deleteServiceListing: builder.mutation({
            query: (id) => ({
                url: `/api/v1/services/listings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ServiceMarket"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetAllListingsQuery,
    useRegisterServiceProviderMutation,
    useCreateServiceListingMutation,
    useUpdateServiceListingMutation,
    useDeleteServiceListingMutation,
} = serviceMarketApi;
