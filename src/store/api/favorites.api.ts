import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */



/* =======================
   API
======================= */

export const favoritesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getFavorites: builder.query({
            query: () => `/api/v1/favorites`,
            providesTags: ["Favorites"],
        }),

        markFavorite: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/api/v1/favorites/${id}/toggle`,
                method: "POST",
            }),
            invalidatesTags: ["Favorites"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetFavoritesQuery,
    useMarkFavoriteMutation,
} = favoritesApi;
