import { baseApi } from "./baseApi";

/* =======================
   Types
======================= */

export interface ChatUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imgUrl: string | null;
    role: string;
}

export interface ChatPropertyListing {
    id: string;
    title: string;
    location: string;
    price: string;
    propertyType: string;
}

export interface ChatMessage {
    id: string;
    createdAt: string;
    updatedAt: string;
    sender: ChatUser;
    recipient: ChatUser;
    propertyListing: ChatPropertyListing | null;
    subject: string;
    content: string;
    isRead: boolean;
}

/** A chat partner's last message as returned in the chat list */
export interface ChatListLastMessage {
    id: string;
    createdAt: string;
    sender: string;           // sender's user ID (string only in list response)
    recipient: ChatUser;      // full user object
    propertyListing: string | null;  // property ID (string only in list response)
    subject: string;
    content: string;
    isRead: boolean;
}

/** One entry in the chat partners list */
export interface ChatPartner {
    partner: ChatUser;
    lastMessage: ChatListLastMessage;
    unreadCount: number;
}
export interface ChatPreview {
    userId: string;
    userName: string;
    userAvatar?: string;
    lastMessage: string;
    lastMessageAt: string;
}

export interface SendMessageInput {
    recipientId: string;
    content: string;
    propertyId?: string;
}

export interface UnreadCountResponse {
    unreadCount: number;
}

/* =======================
   API
======================= */

export const messagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /** GET /messages/chats — Get user chats (conversation list) */
        getUserChats: builder.query<{ data: { chatPartners: ChatPartner[] } }, void>({
            query: () => ({
                url: `/api/v1/messages/chats`,
                method: "GET",
            }),
            providesTags: ["Messages"],
        }),

        /** GET /messages/chat/{userId} — Get chat messages with a specific user */
        getChatWithUser: builder.query<{ data: { messages: ChatMessage[] } }, string>({
            query: (userId) => ({
                url: `/api/v1/messages/chat/${userId}`,
                method: "GET",
            }),
            providesTags: (_, __, userId) => [{ type: "Messages", id: userId }],
        }),

        /** GET /messages/unread-count — Get total unread message count */
        getUnreadMessageCount: builder.query<{ data: UnreadCountResponse }, void>({
            query: () => ({
                url: `/api/v1/messages/unread-count`,
                method: "GET",
            }),
            providesTags: ["Messages"],
        }),

        /** POST /messages/send — Send a message */
        sendMessage: builder.mutation<{ data: ChatMessage }, SendMessageInput>({
            query: (body) => ({
                url: `/api/v1/messages/send`,
                method: "POST",
                body,
            }),
            // No invalidatesTags — socket pushes the new message into cache directly
        }),

        /** POST /messages/mark-read/{userId} — Mark all messages from a user as read */
        markMessagesRead: builder.mutation<void, string>({
            query: (userId) => ({
                url: `/api/v1/messages/mark-read/${userId}`,
                method: "POST",
            }),
            // No invalidatesTags — avoids REST refetch; marking read is fire-and-forget
        }),
    }),
});

/* =======================
   Hooks
======================= */

export const {
    useGetUserChatsQuery,
    useGetChatWithUserQuery,
    useGetUnreadMessageCountQuery,
    useSendMessageMutation,
    useMarkMessagesReadMutation,
} = messagesApi;
