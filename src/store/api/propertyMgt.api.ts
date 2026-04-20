import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface CreatePropertyPayload {
    role: "property_manager" | "owner" | "tenant";
    name: string;
    categoryType: string;
    address: string;
    estateManagerEmail: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
}

export interface UpdatePropertyPayload extends Partial<CreatePropertyPayload> {
    propertyId: string;
}

export interface CreatePropertyResponse {
    message: string;
    data?: unknown;
}

export interface DashboardSummaryResponse {
    message: string;
    data: {
        totalRevenue: any;
        activeTenants: number;
        maintenanceRequests: number;
        totalProperties: number;
    };
}

export interface Property {
    id: string;
    name: string;
    categoryType: string;
    address: string;
    estateManagerEmail: string;
    tenants?: unknown[];
}

export interface GetPropertiesResponse {
    message: string;
    data: Property[];
}

export interface UploadDocumentPayload {
    propertyId: string;
    title: string;
    category: string;
    relatedToLabel: string;
    fileUrl: string;
    status: string;
}

export interface UpdateDocumentStatusPayload {
    documentId: string;
    status: string;
}

export interface CreateInspectionPayload {
    propertyId: string;
    unitName: string;
    type: "Virtual" | "Physical";
    scheduledDate: string;
    scheduledTime: string;
    hostingLink: string;
}

export interface UpdateInspectionStatusPayload {
    inspectionId: string;
    status: string;
}

export interface CreateMaintenancePayload {
    propertyId: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    imageUrls: string[];
}

export interface AssignMaintenancePayload {
    requestId: string;
    assignedTo: string;
}

export interface UpdateMaintenanceStatusPayload {
    requestId: string;
    status: string;
}

export interface UpdateSettingsPayload {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    autoPaymentReminder?: boolean;
    emailNewMaintenanceRequests?: boolean;
    emailPaymentNotifications?: boolean;
    emailRentExpiryAlerts?: boolean;
    emailInspectionReminders?: boolean;
    smsEmergencyMaintenance?: boolean;
}

export interface SettingsData {
    bankName: string;
    accountNumber: string;
    accountName: string;
    autoPaymentReminder: boolean;
    emailNewMaintenanceRequests: boolean;
    emailPaymentNotifications: boolean;
    emailRentExpiryAlerts: boolean;
    emailInspectionReminders: boolean;
    smsEmergencyMaintenance: boolean;
}

export interface GetAllSettingsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: SettingsData;
    errors: any;
}
/* =======================
   API
======================= */

export const propertyMgtApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createProperty: builder.mutation<CreatePropertyResponse, CreatePropertyPayload>({
            query: (payload) => ({
                url: "/api/v1/management/create-property",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        updateProperty: builder.mutation<CreatePropertyResponse, UpdatePropertyPayload>({
            query: ({ propertyId, ...payload }) => ({
                url: `/api/v1/management/update-property/${propertyId}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        deleteProperty: builder.mutation<CreatePropertyResponse, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/management/delete-property/${propertyId}`,
                method: "PUT",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getDashboardSummary: builder.query<DashboardSummaryResponse, void>({
            query: () => ({
                url: "/api/v1/management/dashboard-summary",
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        getManagedProperties: builder.query<GetPropertiesResponse, void>({
            query: () => ({
                url: "/api/v1/management/properties",
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        removeTenantFromProperty: builder.mutation<CreatePropertyResponse, { propertyId: string; tenantId: string }>({
            query: ({ propertyId, tenantId }) => ({
                url: `/api/v1/management/delete-tenant/${propertyId}/${tenantId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        uploadDocument: builder.mutation<CreatePropertyResponse, UploadDocumentPayload>({
            query: ({ propertyId, ...payload }) => ({
                url: `/api/v1/documents/${propertyId}`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getDocumentsByProperty: builder.query<any, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/documents/${propertyId}`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        updateDocumentStatus: builder.mutation<CreatePropertyResponse, UpdateDocumentStatusPayload>({
            query: ({ documentId, status }) => ({
                url: `/api/v1/documents/${documentId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        getAllDocuments: builder.query<any, void>({
            query: () => ({
                url: `/api/v1/management/documents`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        createInspection: builder.mutation<CreatePropertyResponse, CreateInspectionPayload>({
            query: ({ propertyId, ...payload }) => ({
                url: `/api/v1/inspections/${propertyId}`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getInspectionsByProperty: builder.query<any, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/inspections/${propertyId}`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        getSettingByProperty: builder.query<any, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/inspections/${propertyId}`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        getAllSettings: builder.query<GetAllSettingsResponse, void>({
            query: () => ({
                url: `/api/v1/management/settings/`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        updateInspectionStatus: builder.mutation<CreatePropertyResponse, UpdateInspectionStatusPayload>({
            query: ({ inspectionId, status }) => ({
                url: `/api/v1/inspections/${inspectionId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        getAllInspections: builder.query<any, void>({
            query: () => ({
                url: `/api/v1/management/inspections`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        createMaintenance: builder.mutation<CreatePropertyResponse, CreateMaintenancePayload>({
            query: ({ propertyId, ...payload }) => ({
                url: `/api/v1/maintenance/${propertyId}`,
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        getMaintenanceByProperty: builder.query<any, { propertyId: string }>({
            query: ({ propertyId }) => ({
                url: `/api/v1/maintenance/${propertyId}`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),

        assignMaintenance: builder.mutation<CreatePropertyResponse, AssignMaintenancePayload>({
            query: ({ requestId, ...payload }) => ({
                url: `/api/v1/maintenance/${requestId}/assign`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),

        updateMaintenanceStatus: builder.mutation<CreatePropertyResponse, UpdateMaintenanceStatusPayload>({
            query: ({ requestId, status }) => ({
                url: `/api/v1/maintenance/${requestId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
        getAllMaintenances: builder.query<any, void>({
            query: () => ({
                url: `/api/v1/management/maintenances`,
                method: "GET",
            }),
            providesTags: ["PropertyMgt"],
        }),
        updateSettings: builder.mutation<CreatePropertyResponse, UpdateSettingsPayload>({
            query: ({ ...payload }) => ({
                url: `/api/v1/management/update-settings`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["PropertyMgt"],
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useCreatePropertyMutation,
    useUpdatePropertyMutation,
    useDeletePropertyMutation,
    useGetDashboardSummaryQuery,
    useGetManagedPropertiesQuery,
    useRemoveTenantFromPropertyMutation,
    useUploadDocumentMutation,
    useGetDocumentsByPropertyQuery,
    useUpdateDocumentStatusMutation,

    useCreateInspectionMutation,
    useGetInspectionsByPropertyQuery,
    useUpdateInspectionStatusMutation,

    useCreateMaintenanceMutation,
    useGetMaintenanceByPropertyQuery,
    useAssignMaintenanceMutation,
    useUpdateMaintenanceStatusMutation,
    useUpdateSettingsMutation,
    useGetAllInspectionsQuery,
    useGetAllMaintenancesQuery,
    useGetAllDocumentsQuery,
    useGetAllSettingsQuery,
} = propertyMgtApi;
