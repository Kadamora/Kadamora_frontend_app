import React, { useState, useCallback, useMemo } from 'react';
import MessageCard from './MessageCard';
import './styles/chat.css';
import Input from '@components/forms/Input';
import { ListFilter } from 'lucide-react';
import { 
    useGetUserChatsQuery, 
    useGetChatWithUserQuery, 
    useSendMessageMutation,
    useMarkMessagesReadMutation,
    messagesApi,
} from '@store/api/messages.api';
import type { ChatMessage, ChatPartner } from '@store/api/messages.api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useChatSocket } from '@hooks/useChatSocket';

function formatTime(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

const ChatListSkeleton = () => (
    <div className="animate-pulse space-y-4 px-4 py-2">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
            </div>
        ))}
    </div>
);

const ChatMessagesSkeleton = () => (
    <div className="animate-pulse flex flex-col gap-4 p-4 h-[400px]">
        <div className="self-end w-2/3 h-16 bg-[#E6F0FA]/50 rounded-2xl" />
        <div className="self-start w-2/3 h-16 bg-gray-100 rounded-2xl" />
        <div className="self-end w-1/2 h-16 bg-[#E6F0FA]/50 rounded-2xl" />
        <div className="self-start w-3/4 h-16 bg-gray-100 rounded-2xl" />
    </div>
);

const Chat: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentUserId = useAppSelector((s) => s.auth.user?.id);

    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messageText, setMessageText] = useState('');
    const [search, setSearch] = useState('');
    const [showList, setShowList] = useState(false);

    // Queries
    const { data: chatsData, isLoading: isLoadingChats } = useGetUserChatsQuery();
    const partners: ChatPartner[] = chatsData?.data?.chatPartners || [];

    const { data: messagesData, isLoading: isLoadingMessages } = useGetChatWithUserQuery(activeChatId as string, {
        skip: !activeChatId,
    });
    const messages = messagesData?.data?.messages || [];

    const [sendMessage] = useSendMessageMutation();
    const [markRead] = useMarkMessagesReadMutation();

    // Mark messages as read when looking at them
    React.useEffect(() => {
        if (activeChatId) {
            markRead(activeChatId).catch(console.error);
        }
    }, [activeChatId, markRead]);

    // Setup active tab automatically if none
    React.useEffect(() => {
        if (!activeChatId && partners.length > 0) {
            setActiveChatId(partners[0].partner.id);
        }
    }, [partners, activeChatId]);

    // Socket
    const handleNewMessage = useCallback(
        (incoming: ChatMessage) => {
            // Update List
            dispatch(
                messagesApi.util.updateQueryData('getUserChats', undefined, (draft) => {
                    const list = draft.data?.chatPartners;
                    if (!list) return;

                    const pId = incoming.sender.id === currentUserId ? incoming.recipient.id : incoming.sender.id;
                    const idx = list.findIndex((p) => p.partner.id === pId);
                    if (idx === -1) return;

                    const updated = { ...list[idx] };
                    updated.lastMessage = {
                        ...updated.lastMessage,
                        id: incoming.id,
                        createdAt: incoming.createdAt,
                        content: incoming.content,
                        isRead: incoming.sender.id === currentUserId || activeChatId === pId,
                        sender: incoming.sender.id,
                    };
                    
                    if (incoming.sender.id !== currentUserId && activeChatId !== pId) {
                        updated.unreadCount = (updated.unreadCount ?? 0) + 1;
                    }

                    draft.data.chatPartners = [updated, ...list.filter((_, i) => i !== idx)];
                }),
            );

            // Update active chat window if it's open
            const activePartnerId = incoming.sender.id === currentUserId ? incoming.recipient.id : incoming.sender.id;
            if (activeChatId === activePartnerId) {
                dispatch(
                    messagesApi.util.updateQueryData('getChatWithUser', activePartnerId, (draft) => {
                        const exists = draft.data?.messages.some((m) => m.id === incoming.id);
                        if (!exists) {
                            draft.data?.messages.push(incoming);
                        }
                    }),
                );
            }
        },
        [dispatch, currentUserId, activeChatId],
    );

    useChatSocket({ onNewMessage: handleNewMessage });

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!messageText.trim() || !activeChatId) return;

        try {
            await sendMessage({
                recipientId: activeChatId,
                content: messageText.trim(),
            }).unwrap();
            setMessageText('');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    const filteredPartners = useMemo(() => {
        return partners.filter((c) => {
            const name = `${c.partner.firstName} ${c.partner.lastName}`.toLowerCase();
            return name.includes(search.toLowerCase());
        });
    }, [partners, search]);

    const activePartnerObj = partners.find(p => p.partner.id === activeChatId)?.partner;

    return (
        <div className="flex h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden flex-col md:flex-row">
            {/* Sidebar Chat List (left) */}
            <aside
                className={`md:w-85 min-w-65 max-w-90 border-r border-[#EDF1F5] flex flex-col bg-white z-20 md:static fixed top-0 left-0 h-full md:h-auto transition-transform duration-200 ${showList ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="px-6 pt-2 pb-3 mt-4">
                    <h3 className="text-[17px] font-semibold text-[#002E62] mb-2">Chat</h3>
                    <div className="flex items-center gap-2">
                        <Input
                            containerClassName='w-full'
                            placeholder="Search"
                            className="py-2! text-[15px]!"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            title="Filter"
                            className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E0DEF7] bg-white text-[#64748B]"
                        >
                            <ListFilter />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pb-4">
                    {isLoadingChats ? (
                        <ChatListSkeleton />
                    ) : filteredPartners.length === 0 ? (
                        <div className="text-center text-[#98A2B3] mt-10 text-[14px]">No chats found</div>
                    ) : (
                        filteredPartners.map((chat) => (
                            <MessageCard
                                key={chat.partner.id}
                                name={`${chat.partner.firstName} ${chat.partner.lastName}`}
                                subtitle={chat.partner.role}
                                lastMessage={chat.lastMessage?.content || ''}
                                time={formatDate(chat.lastMessage?.createdAt) || ''}
                                unreadCount={chat.unreadCount}
                                avatar={chat.partner.imgUrl || undefined}
                                online={true}
                                selected={chat.partner.id === activeChatId}
                                onClick={() => {
                                    setActiveChatId(chat.partner.id);
                                    setShowList(false);
                                }}
                            />
                        ))
                    )}
                </div>
            </aside>

            {/* Chat Box (right) */}
            <section className="flex-1 flex flex-col bg-[#FAFAFA] relative min-w-0">
                {/* Mobile: show chat list toggle */}
                <div className="md:hidden flex items-center gap-2 px-4 py-2 border-b border-[#EDF1F5] bg-white mt-4">
                    <button
                        title="Open chat list"
                        onClick={() => setShowList(true)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E0DEF7] bg-white text-[#64748B]"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path d="M4 6h12M4 10h12M4 14h12" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <span className="font-semibold text-[#0A2D50] text-[16px]">Chat</span>
                </div>

                {/* Chat header */}
                <div className="hidden md:flex items-center gap-4 px-8 py-6 border-b border-[#EDF1F5] bg-white h-[98px]">
                    {activePartnerObj ? (
                        <>
                            <div className="h-12 w-12 rounded-full bg-[#F1F9FF] flex items-center justify-center text-xl font-bold text-[#0A66B2] overflow-hidden">
                                {activePartnerObj.imgUrl ? (
                                    <img
                                        src={activePartnerObj.imgUrl}
                                        alt="avatar"
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                ) : (
                                    activePartnerObj.firstName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <div className="font-semibold text-[#0A2D50] text-[16px]">
                                    {activePartnerObj.firstName} {activePartnerObj.lastName}{' '}
                                    <span className="text-xs text-[#64748B] font-medium capitalize ml-1 border border-[#E4E7EC] px-2 py-0.5 rounded-full bg-[#FAFAFA]">
                                        {activePartnerObj.role}
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="h-full w-full flex items-center">
                            {isLoadingChats && <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>}
                        </div>
                    )}
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4 chat-bg bg-[#FAFAFA]">
                    {isLoadingMessages ? (
                        <ChatMessagesSkeleton />
                    ) : messages.length === 0 && activeChatId ? (
                        <div className="flex-1 flex items-center justify-center text-center text-[#98A2B3] text-[14px]">
                            Start a conversation with {activePartnerObj?.firstName || 'this user'}
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isMine = msg.sender.id === currentUserId;
                            return (
                                <div
                                    key={msg.id}
                                    className={`max-w-[90%] md:max-w-[60%] rounded-2xl px-5 py-3 text-[15px] ${isMine ? 'ml-auto bg-[#E6F0FA] text-[#002E62]' : 'bg-white border border-[#E4E7EC] shadow-sm text-[#475467]'}`}
                                >
                                    {msg.content}
                                    <div className={`text-xs mt-2 ${isMine ? 'text-[#0A66B2]/70 text-right' : 'text-[#9CA3AF] text-left'}`}>
                                        {formatTime(msg.createdAt)}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Message input */}
                <form
                    className="flex flex-col gap-0 px-0 md:px-0 pt-0 pb-0 border-t border-[#EDF1F5] bg-white shrink-0"
                    onSubmit={handleSend}
                    style={{ boxShadow: '0px -1px 0px #EDF1F5' }}
                >
                    <textarea
                        className="w-full resize-none border-none outline-none bg-transparent px-4 md:px-8 pt-4 text-[15px] text-[#101828] placeholder-[#98A2B3] min-h-[60px] max-h-[120px] focus:ring-0"
                        placeholder="Write a message ..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={2}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
                            }
                        }}
                        disabled={!activeChatId}
                    />
                    <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-t border-[#F2F4F7]">
                        <div className="flex items-center gap-2">
                            {/* Toolbar Buttons (placeholder visual icons from mockup) */}
                            {['Attachment', 'Video', 'Mic', 'Document'].map((tool, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    title={tool}
                                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7] text-[#98A2B3]"
                                >
                                    <div className="w-4 h-4 bg-[#98A2B3] rounded-sm opacity-50"></div>
                                </button>
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={!activeChatId || !messageText.trim()}
                            className="h-10 px-6 rounded-lg bg-[#002E62] text-white font-semibold flex items-center gap-2 hover:bg-[#002E62]/90 disabled:opacity-50 transition-colors"
                        >
                            Send
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path
                                    d="M3.75 10h8.75m0 0l-3.5-3.5m3.5 3.5l-3.5 3.5"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Chat;
