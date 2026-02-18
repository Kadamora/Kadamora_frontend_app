import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */



/* =======================
   API
======================= */

export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getPosts: builder.query({
            query: () => ({
                url: `/api/v1/timeline/posts`,
                method: "GET",
            }),
            providesTags: ["Timeline"],
        }),
        getAnnouncements: builder.query({
            query: () => ({
                url: `/api/v1/timeline/announcements`,
                method: "GET",
            }),
            providesTags: ["Timeline"],
        }),
        getEvents: builder.query({
            query: () => ({
                url: `/api/v1/timeline/events`,
                method: "GET",
            }),
            providesTags: ["Timeline"],
        }),
        getCommentsByPostId: builder.query({
            query: (postId) => ({
                url: `/api/v1/timeline/posts/${postId}/comments`,
                method: "GET",
            }),
            providesTags: ["Timeline"],
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: `/api/v1/timeline/create-post`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Timeline"],
        }),
        createAnnouncement: builder.mutation({
            query: (data) => ({
                url: `/api/v1/timeline/create-announcement`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Timeline"],
        }),
        createEvent: builder.mutation({
            query: (data) => ({
                url: `/api/v1/timeline/create-event`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Timeline"],
        }),
        createComment: builder.mutation({
            query: (data) => ({
                url: `/api/v1/timeline/create-comment`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Timeline"],
        }),
        createLikeUnlikePost: builder.mutation({
            query: (postId) => ({
                url: `/api/v1/timeline/posts/${postId}/like`,
                method: "POST",
            }),
            invalidatesTags: ["Timeline"],
        }),
        
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetPostsQuery,
    useGetAnnouncementsQuery,
    useGetEventsQuery,
    useCreatePostMutation,
    useCreateAnnouncementMutation,
    useCreateEventMutation,
    useCreateCommentMutation,
    useCreateLikeUnlikePostMutation,
    useGetCommentsByPostIdQuery,
} = subscriptionApi;
