import { baseApi } from './baseApi';

export interface SupportTicket {
    id: string;
    subject: string;
    description: string;
    status: 'Open' | 'Closed' | 'Pending';
    priority: 'Low' | 'Medium' | 'High';
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface TicketMessage {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    createdAt: string;
}

export interface TicketDetails extends SupportTicket {
    messages: TicketMessage[];
}

export interface SupportTicketResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export const supportTicketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSupportTicket: builder.mutation<SupportTicketResponse<SupportTicket>, Partial<SupportTicket>>({
            query: (body) => ({
                url: '/api/v1/support-tickets',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['SupportTicket'],
        }),
        getSupportTickets: builder.query<SupportTicketResponse<SupportTicket[]>, void>({
            query: () => ({
                url: '/api/v1/support-tickets',
                method: 'GET',
            }),
            providesTags: ['SupportTicket'],
        }),
        getSupportTicketStats: builder.query<SupportTicketResponse<any>, void>({
            query: () => ({
                url: '/api/v1/support-tickets/stats',
                method: 'GET',
            }),
            providesTags: ['SupportTicket'],
        }),
        getSupportTicketDetails: builder.query<SupportTicketResponse<TicketDetails>, string>({
            query: (ticketId) => ({
                url: `/api/v1/support-tickets/${ticketId}`,
                method: 'GET',
            }),
            providesTags: (_, __, ticketId) => [{ type: 'SupportTicket', id: ticketId }],
        }),
        sendTicketMessage: builder.mutation<SupportTicketResponse<TicketMessage>, { ticketId: string; content: string }>({
            query: ({ ticketId, content }) => ({
                url: `/api/v1/support-tickets/${ticketId}/messages`,
                method: 'POST',
                body: { content },
            }),
            invalidatesTags: (_, __, { ticketId }) => [{ type: 'SupportTicket', id: ticketId }],
        }),
        closeSupportTicket: builder.mutation<SupportTicketResponse<SupportTicket>, string>({
            query: (ticketId) => ({
                url: `/api/v1/support-tickets/${ticketId}/close`,
                method: 'PATCH',
            }),
            invalidatesTags: ['SupportTicket'],
        }),
    }),
});

export const {
    useCreateSupportTicketMutation,
    useGetSupportTicketsQuery,
    useGetSupportTicketStatsQuery,
    useGetSupportTicketDetailsQuery,
    useSendTicketMessageMutation,
    useCloseSupportTicketMutation,
} = supportTicketApi;
