import { baseApi } from "./baseApi";

export const announcementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAnnouncement: builder.mutation({
            query: (data) => ({
                url: `/api/v1/announcements/create-announcement`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        getAnnouncements: builder.query({
            query: () => ({
                url: `/api/v1/announcements/my-announcements`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        getAnnouncementsByProperty: builder.query({
            query: (propertyId) => ({
                url: `/api/v1/announcements/property/${propertyId}`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        updateAnnouncement: builder.mutation({
            query: ({ announcementId, data }) => ({
                url: `/api/v1/announcements/update-announcement/${announcementId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        deleteAnnouncement: builder.mutation({
            query: (announcementId) => ({
                url: `/api/v1/announcements/delete-announcement/${announcementId}`,
                method: "PUT",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
    }),
});

export const {
    useCreateAnnouncementMutation,
    useGetAnnouncementsQuery,
    useGetAnnouncementsByPropertyQuery,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation,
} = announcementApi;
