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
            query: () => ({
                url: `/api/v1/timeline/create-post`,
                method: "POST",
            }),
            invalidatesTags: ["Timeline"],
        }),
        createAnnouncement: builder.mutation({
            query: () => ({
                url: `/api/v1/timeline/create-announcement`,
                method: "POST",
            }),
            invalidatesTags: ["Timeline"],
        }),
        createEvent: builder.mutation({
            query: () => ({
                url: `/api/v1/timeline/create-event`,
                method: "POST",
            }),
            invalidatesTags: ["Timeline"],
        }),
        createComment: builder.mutation({
            query: ({postId, data}: {postId: string, data: any}) => ({
                url: `/api/v1/timeline/posts/${postId}/comment`,
                method: "POST",
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
