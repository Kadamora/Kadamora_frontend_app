import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { MoreVertical, Search } from 'lucide-react';
import { useGetUserChatsQuery, messagesApi } from '@store/api/messages.api';
import type { ChatMessage, ChatPartner } from '@store/api/messages.api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useChatSocket } from '@hooks/useChatSocket';

function formatRelativeTime(dateStr: string): string {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 2) return 'Just now';
    if (mins < 60) return `${mins} m ago`;
    if (hrs < 24) return `${hrs}hrs ago`;
    if (days === 1) return '1 day ago';
    return `${days}days ago`;
}

function ChatListSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                    <div className="flex-shrink-0 relative">
                        <div className="w-11 h-11 rounded-full bg-gray-200" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-12" />
                </div>
            ))}
        </div>
    );
}

type ChatFilter = 'all' | 'unread' | 'archive';

export default function ChatListPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector((s) => s.auth.user?.id);

    const [filter, setFilter] = useState<ChatFilter>('all');
    const [search, setSearch] = useState('');

    // Fetch once on mount — WebSocket keeps it live
    const { data, isLoading, isError } = useGetUserChatsQuery();

    const chats: ChatPartner[] = data?.data?.chatPartners ?? [];

    // Real-time: update the chat list when a new message arrives on any conversation
    const handleNewMessage = useCallback(
        (incoming: ChatMessage) => {
            dispatch(
                messagesApi.util.updateQueryData('getUserChats', undefined, (draft) => {
                    const partners = draft.data?.chatPartners;
                    if (!partners) return;

                    const partnerId =
                        incoming.sender.id === currentUserId
                            ? incoming.recipient.id
                            : incoming.sender.id;

                    const idx = partners.findIndex((p) => p.partner.id === partnerId);

                    if (idx === -1) return; // unknown partner — let next REST fetch handle it

                    const updated = { ...partners[idx] };
                    // Update last message preview
                    updated.lastMessage = {
                        ...updated.lastMessage,
                        id: incoming.id,
                        createdAt: incoming.createdAt,
                        content: incoming.content,
                        isRead: incoming.sender.id === currentUserId, // mine = read
                        sender: incoming.sender.id,
                    };
                    // Bump unread only for messages from the other person
                    if (incoming.sender.id !== currentUserId) {
                        updated.unreadCount = (updated.unreadCount ?? 0) + 1;
                    }

                    // Move updated partner to top of list
                    draft.data.chatPartners = [
                        updated,
                        ...partners.filter((_, i) => i !== idx),
                    ];
                }),
            );
        },
        [dispatch, currentUserId],
    );

    // Listen globally (no roomId) — updates the list for ANY incoming message
    useChatSocket({ onNewMessage: handleNewMessage });

    const unreadCount = useMemo(
        () => chats.filter((c) => c.unreadCount > 0).length,
        [chats],
    );

    const filtered = useMemo(() => {
        let list = chats;
        if (filter === 'unread') list = list.filter((c) => c.unreadCount > 0);
        if (search.trim()) {
            const q = search.toLowerCase();
            const fullName = (c: ChatPartner) =>
                `${c.partner.firstName} ${c.partner.lastName}`.toLowerCase();
            list = list.filter(
                (c) =>
                    fullName(c).includes(q) ||
                    c.lastMessage?.content?.toLowerCase().includes(q),
            );
        }
        return list;
    }, [chats, filter, search]);

    return (
        <div className="min-h-screen pb-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Messages</h1>
                    <p className="text-gray-500 text-sm mt-1">All Messages</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Filter tabs + search row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                    {(['all', 'unread', 'archive'] as ChatFilter[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                filter === tab
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {tab === 'unread' && unreadCount > 0 && (
                                <span className="ml-1.5 bg-white text-[var(--color-primary)] rounded-full text-[11px] px-1.5">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-md md:ml-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Conversation"
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none transition"
                    />
                </div>
            </div>

            {/* Error state */}
            {isError && (
                <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    Failed to load conversations. Please refresh.
                </div>
            )}

            {/* Chat list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {isLoading ? (
                    <div className="p-4">
                        <ChatListSkeleton />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-3 opacity-40">
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="text-sm font-medium">No conversations found</p>
                    </div>
                ) : (
                    filtered.map((chat) => {
                        const partnerName = `${chat.partner.firstName} ${chat.partner.lastName}`;
                        return (
                            <button
                                key={chat.partner.id}
                                onClick={() =>
                                    navigate(`/dashboard/chat/${chat.partner.id}`, {
                                        state: { chat },
                                    })
                                }
                                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                            >
                                {/* Partner avatar */}
                                <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-white bg-gray-200 overflow-hidden flex items-center justify-center">
                                    {chat.partner.imgUrl ? (
                                        <img
                                            src={chat.partner.imgUrl}
                                            alt={partnerName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-bold text-gray-500">
                                            {partnerName.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-[var(--color-secondary)] text-sm truncate">
                                        {partnerName}
                                    </p>
                                    <p className="text-xs text-gray-400 truncate mt-0.5">
                                        {chat.lastMessage?.content ?? ''}
                                    </p>
                                </div>

                                {/* Time + unread badge */}
                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    <span className="text-xs text-gray-400 whitespace-nowrap">
                                        {formatRelativeTime(chat.lastMessage?.createdAt ?? '')}
                                    </span>
                                    {chat.unreadCount > 0 && (
                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}
