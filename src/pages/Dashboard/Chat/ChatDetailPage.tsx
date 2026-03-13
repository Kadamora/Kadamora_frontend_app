import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useLocation, Link } from 'react-router';
import { MoreVertical, Send, ChevronRight } from 'lucide-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { EmojiStyle } from "emoji-picker-react";
import {
    useGetChatWithUserQuery,
    useSendMessageMutation,
    useMarkMessagesReadMutation,
    messagesApi,
} from '@store/api/messages.api';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import type {  ChatMessage } from '@store/api/messages.api';
import { useChatSocket } from '@hooks/useChatSocket';

function formatTime(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function MessageSkeleton() {
    return (
        <div className="animate-pulse space-y-4 p-4">
            {[120, 180, 100, 160].map((w, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div
                        className="h-10 bg-gray-200 rounded-2xl"
                        style={{ width: w }}
                    />
                </div>
            ))}
        </div>
    );
}

export default function ChatDetailPage() {
    const { userId } = useParams<{ userId: string }>();
    const location = useLocation();
    const chatPreview = location.state?.chat as any | undefined;

    const currentUserId = useAppSelector((s) => s.auth.user?.id);
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    // WebSocket is the sole real-time mechanism — no polling needed
    const { data, isLoading } = useGetChatWithUserQuery(userId!, {
        skip: !userId,
    });

    const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
    const [markRead] = useMarkMessagesReadMutation();

    const messages = data?.data?.messages ?? [];
    // Derive property context from messages if chatPreview state wasn't passed
    const propertyFromMsg = messages[0]?.propertyListing ?? null;

    // Real-time: inject incoming socket message into the RTK Query cache
    const handleNewMessage = useCallback(
        (incoming: ChatMessage) => {
            if (!userId) return;
            dispatch(
                messagesApi.util.updateQueryData('getChatWithUser', userId, (draft) => {
                    // Avoid duplicates
                    const alreadyExists = draft.data?.messages?.some((m) => m.id === incoming.id);
                    if (!alreadyExists) {
                        // Backend returns newest first, so we add to the start of the array
                        draft.data.messages = [incoming, ...(draft.data?.messages ?? [])];
                    }
                }),
            );
        },
        [dispatch, userId],
    );

    useChatSocket({ roomId: userId, onNewMessage: handleNewMessage });

    // Mark messages as read when chat opens
    useEffect(() => {
        if (userId) markRead(userId);
    }, [userId, markRead]);

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }
        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    // const handleSend = async () => {
    //     const text = message.trim();
    //     if (!text || !userId || sending) return;
    //     setMessage('');
    //     try {
    //         await sendMessage({
    //             recipientId: userId,
    //             content: text,
    //             propertyId: chatPreview?.propertyId,
    //         }).unwrap();
    //     } catch {
    //         // Error silently — optimistic could be added
    //     }
    // };
    const handleSend = async () => {
    const text = message.trim();
    if (!text || !userId || sending) return;

    setMessage('');

    const optimisticMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        content: text,
        createdAt: new Date().toISOString(),
        sender: {
            id: currentUserId!,
            firstName: '',
            lastName: '',
        },
    } as ChatMessage;

    // Optimistically update cache (add to the top of the newest-first array)
    dispatch(
        messagesApi.util.updateQueryData('getChatWithUser', userId, (draft) => {
            draft.data.messages.unshift(optimisticMessage);
        })
    );

    try {
        await sendMessage({
            recipientId: userId,
            content: text,
            propertyId: chatPreview?.propertyId,
        }).unwrap();
    } catch {
        console.error("Message failed to send");
    }
};

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    console.log("chatPreview", chatPreview)
    const fullName = `${chatPreview?.partner?.firstName} ${chatPreview?.partner?.lastName}`;
    return (
        <div className="flex flex-col h-[calc(100vh-90px)] rounded-xl overflow-hidden">
            {/* Top header: name + info */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="">
                {/* <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/dashboard/chat')}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        aria-label="Back to messages"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-100">
                            {chatPreview?.partner?.imgUrl ? (
                                <img src={chatPreview.partner.imgUrl} alt={chatPreview.partner.firstName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="font-bold text-gray-500 text-sm">
                                    {chatPreview?.partner?.firstName?.charAt(0)?.toUpperCase() ?? '?'}
                                </span>
                            )}
                        </div>
                        {chatPreview?.isOnline && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                        )}
                    </div>
                    <span className="font-bold text-[var(--color-secondary)]">
                        {fullName ?? 'Chat'}
                    </span>
                </div> */}
                <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Messages</h1>
                {/* Breadcrumb */}
                <div className="hidden md:flex items-center gap-1 text-sm text-gray-400">
                    <Link to="/dashboard/chat" className="text-gray-600  font-medium">
                        All Messages
                    </Link>
                    <ChevronRight size={14} />
                    <span className="text-[#359F6A]">{fullName ?? userId}</span>
                </div>
                </div>

                

                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <MoreVertical size={18} />
                </button>
            </div>

            {/* Property context card — from route state or first message */}
            {(chatPreview?.propertyName ?? propertyFromMsg?.title) && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            {chatPreview?.propertyImage ? (
                                <img src={chatPreview.propertyImage} alt={chatPreview.propertyName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs font-bold text-gray-500">
                                    {(chatPreview?.propertyName ?? propertyFromMsg?.title ?? '').charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-[var(--color-secondary)] text-sm">
                                {chatPreview?.propertyName ?? propertyFromMsg?.title}
                            </p>
                            <p className="text-xs text-gray-400">{propertyFromMsg?.location ?? 'Property Discussion'}</p>
                        </div>
                    </div>
                    {(chatPreview?.propertyId ?? propertyFromMsg?.id) && (
                        <Link
                            to={`/dashboard/property-view/${chatPreview?.propertyId ?? propertyFromMsg?.id}`}
                            className="px-4 py-1.5 border border-[#A2E9C1] text-[#002E62] bg-[#E8FAF0] text-xs font-semibold rounded-sm transition-colors"
                        >
                            View Property
                        </Link>
                    )}
                </div>
            )}

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white">
                {isLoading ? (
                    <MessageSkeleton />
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <p className="text-sm">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    // Reverse the array so the newest message (index 0) renders at the bottom
                    [...messages].reverse().map((msg) => {
                        const isMine = msg?.sender?.id === currentUserId;
                        const senderName = `${msg.sender?.firstName} ${msg.sender?.lastName}`.trim();
                        return (
                            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                                {!isMine && (
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 mr-2 flex-shrink-0 self-end mb-4 overflow-hidden">
                                        {msg?.sender?.imgUrl ? (
                                            <img src={msg?.sender?.imgUrl} alt={senderName} className="w-full h-full object-cover" />
                                        ) : (
                                            senderName.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                )}
                                <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} `}>
                                    <div
                                        className={`px-4 flex flex-col py-3 rounded-2xl text-sm leading-relaxed ${
                                            isMine
                                                ? 'bg-[#E6F1FE] text-gray-800 rounded-br-sm'
                                                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                                        }`}
                                    >
                                        {msg?.content}
                                    <span className="text-[11px] text-gray-400 mt-1 px-1">
                                        {formatTime(msg?.createdAt)}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition overflow-hidden">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={2}
                        placeholder="Write a message ..."
                        className="w-full bg-transparent px-4 pt-3 pb-1 text-sm resize-none outline-none text-gray-700 placeholder-gray-400"
                    />
                    <div className="flex items-center justify-between px-3 pb-2.5">
                        <div className="flex items-center gap-3 text-gray-400">
                            {/* <button title="Add attachment" type="button" className="hover:text-gray-600 transition-colors">
                                <Plus size={18} />
                            </button>
                            <button title="Record audio" type="button" className="hover:text-gray-600 transition-colors">
                                <Mic size={18} />
                            </button>
                            <button title="Add image" type="button" className="hover:text-gray-600 transition-colors">
                                <Image size={18} />
                            </button> */}
                            <div className="relative" ref={emojiPickerRef}>
                                {/* <button
                                    onClick={() => setShowEmojiPicker((p) => !p)}
                                    title="Add emoji"
                                    type="button"
                                    className={`transition-colors ${showEmojiPicker ? 'text-[var(--color-primary)]' : 'hover:text-gray-600'}`}
                                >
                                    <Smile size={18} />
                                </button> */}
                                
                                {showEmojiPicker && (
                                    <div className="absolute bottom-full left-0 mb-2 z-50 w-[320px]">
                                        {/* <EmojiPicker 
                                            onEmojiClick={onEmojiClick}
                                            theme={Theme.LIGHT}
                                            lazyLoadEmojis={true}
                                            searchDisabled={true}
                                            skinTonesDisabled={true}
                                            width={300}
                                            height={350}
                                        /> */}
                                        <EmojiPicker
                                            onEmojiClick={onEmojiClick}
                                            theme={Theme.LIGHT}
                                            emojiStyle={EmojiStyle.NATIVE}
                                            width={300}
                                            height={100}
                                            />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || sending}
                            className="flex items-center gap-2 px-4 py-1.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-95 transition disabled:opacity-50"
                        >
                            Send
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
