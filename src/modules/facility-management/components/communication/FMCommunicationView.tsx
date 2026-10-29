import { useState, useMemo } from 'react';
import {
    FiSearch,
    FiList,
    FiArrowLeft,
    FiPlus,
    FiUsers,
} from 'react-icons/fi';
import ChatTopBar from '@shared/components/Communication/ChatTopBar';
import ChatInputBar from '@shared/components/Communication/ChatInputBar';
import MeetingTemplateMessage from '@shared/components/Communication/MeetingTemplateMessage';
import CreateGroupDrawer from '@shared/components/Communication/CreateGroupDrawer';
import CreateMeetingDropdown from '@shared/components/Communication/CreateMeetingDropdown';
import ScheduleMeetingModal, {
    type ScheduleMeetingFormData,
} from '@shared/components/Communication/ScheduleMeetingModal';
import InstantMeetingModal, {
    type InstantMeetingFormData,
} from '@shared/components/Communication/InstantMeetingModal';
import VideoMeetingRoomModal from '@shared/components/Communication/VideoMeetingRoomModal';
import DeleteChatModal from '@shared/components/Communication/DeleteChatModal';
import type {
    ChatConversation,
    ChatMessage,
    CreateGroupFormData,
} from '@shared/components/Communication/types';
import {
    mockConversations,
    mockGroupMessages,
    mockDirectMessages,
} from '../../data/communicationMock';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMCommunicationView() {
    const [conversations, setConversations] =
        useState<ChatConversation[]>(mockConversations);
    const [activeChatId, setActiveChatId] = useState<string>('c-group-1');
    const [viewMode, setViewMode] = useState<'all' | 'groups'>('all');
    const [selectedCategory, setSelectedCategory] = useState<
        'All' | 'Tenants' | 'Vendors'
    >('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Dropdown for search filter (Unread / Group)
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    // Create Group Drawer
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

    // Meeting Modals & Video Room state
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [scheduleModalInitialTab, setScheduleModalInitialTab] = useState<'schedule' | 'instant'>('schedule');
    const [isInstantModalOpen, setIsInstantModalOpen] = useState(false);
    const [isVideoRoomOpen, setIsVideoRoomOpen] = useState(false);
    const [videoRoomExpanded, setVideoRoomExpanded] = useState(false);

    // Delete Chat Modal State (Image 3)
    const [isDeleteChatModalOpen, setIsDeleteChatModalOpen] = useState(false);

    // Messages state mapped by conversationId
    const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({
        'c-group-1': mockGroupMessages,
        'c-direct-1': mockDirectMessages,
    });

    const activeConversation = useMemo(() => {
        return (
            conversations.find((c) => c.id === activeChatId) || conversations[0]
        );
    }, [conversations, activeChatId]);

    const activeMessages = useMemo(() => {
        return messagesMap[activeChatId] || mockDirectMessages;
    }, [messagesMap, activeChatId]);

    // Filter conversations based on viewMode, category tab, and search
    const filteredConversations = useMemo(() => {
        return conversations.filter((c) => {
            const matchesViewMode =
                viewMode === 'groups' ? c.type === 'group' : true;
            const matchesCategory =
                selectedCategory === 'All' || c.category === selectedCategory;
            const matchesSearch =
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesViewMode && matchesCategory && matchesSearch;
        });
    }, [conversations, viewMode, selectedCategory, searchQuery]);

    const handleSendMessage = (text: string) => {
        const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'You',
            text,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isOutgoing: true,
        };

        setMessagesMap((prev) => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), newMsg],
        }));

        // Update conversation lastMessage
        setConversations((prev) =>
            prev.map((c) =>
                c.id === activeChatId
                    ? { ...c, lastMessage: text, lastMessageTime: 'Just now' }
                    : c
            )
        );
    };

    const handleSaveGroup = (data: CreateGroupFormData) => {
        const newGroup: ChatConversation = {
            id: `c-group-${Date.now()}`,
            name: data.name,
            type: 'group',
            category: (data.userType as any) || 'Tenants',
            subtitle: `${data.members.length + 1} Members`,
            lastMessage: 'Group created',
            lastMessageTime: 'Just now',
            memberCount: data.members.length + 1,
            tintColor: 'purple',
            isOnline: true,
        };

        setConversations((prev) => [newGroup, ...prev]);
        setActiveChatId(newGroup.id);
        showSuccessToast('Group Created', `${data.name} group has been created successfully.`);
    };

    const handleScheduleMeeting = (data: ScheduleMeetingFormData) => {
        const meetingMsg: ChatMessage = {
            id: `msg-schedule-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'You',
            text: '',
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isOutgoing: false,
            isMeetingTemplate: true,
            meetingDetails: {
                hostName: 'You',
                title: `${data.title} (${data.date} at ${data.time})`,
                attendeeAvatars: [
                    '/assets/images/avatar_felix_jones.jpg',
                    '/assets/images/avatar_serah_ibrahim.jpg',
                    '/assets/images/avatar_charles_james.jpg',
                ],
                attendeeCountText: data.type === 'Public' ? '+15 Others' : 'Private',
                linkText: 'Join Now',
                onJoin: () => {
                    setVideoRoomExpanded(false);
                    setIsVideoRoomOpen(true);
                },
            },
        };

        setMessagesMap((prev) => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), meetingMsg],
        }));

        showSuccessToast('Meeting Scheduled', `${data.title} scheduled for ${data.date} at ${data.time}.`);
    };

    const handleCreateInstantMeeting = (data: InstantMeetingFormData) => {
        const meetingMsg: ChatMessage = {
            id: `msg-instant-${Date.now()}`,
            senderId: 'current-user',
            senderName: 'You',
            text: '',
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isOutgoing: false,
            isMeetingTemplate: true,
            meetingDetails: {
                hostName: 'You',
                title: data.title || 'Instant Facility Operations Sync',
                attendeeAvatars: [
                    '/assets/images/avatar_felix_jones.jpg',
                    '/assets/images/avatar_serah_ibrahim.jpg',
                    '/assets/images/avatar_charles_james.jpg',
                ],
                attendeeCountText: data.members.length > 0 ? `+${data.members.length} Members` : '+12 Others',
                linkText: 'Join Now',
                onJoin: () => {
                    setVideoRoomExpanded(false);
                    setIsVideoRoomOpen(true);
                },
            },
        };

        setMessagesMap((prev) => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), meetingMsg],
        }));

        // Immediately launch video room in windowed mode (Image 4)
        setVideoRoomExpanded(false);
        setIsVideoRoomOpen(true);
    };

    const handleConfirmDeleteChat = () => {
        setMessagesMap((prev) => ({
            ...prev,
            [activeChatId]: [],
        }));
        setConversations((prev) =>
            prev.map((c) =>
                c.id === activeChatId
                    ? { ...c, lastMessage: 'Chat deleted', lastMessageTime: 'Just now', unreadCount: 0 }
                    : c
            )
        );
        showSuccessToast('Chat Deleted', 'Conversation messages have been permanently removed.');
    };

    const getGroupBadgeColor = (tint?: string) => {
        switch (tint) {
            case 'green':
                return 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]';
            case 'pink':
                return 'bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3]';
            case 'yellow':
                return 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]';
            case 'purple':
            default:
                return 'bg-[#F3E8FF] text-[#9333EA] border-[#E9D5FF]';
        }
    };

    return (
        <div className="space-y-6 pb-12 animate-fade-in">
            {/* Header: Page Title and "Create Meeting" Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                    Communication
                </h1>

                <CreateMeetingDropdown
                    onScheduleLater={() => {
                        setScheduleModalInitialTab('schedule');
                        setIsScheduleModalOpen(true);
                    }}
                    onInstantMeeting={() => {
                        setScheduleModalInitialTab('instant');
                        setIsScheduleModalOpen(true);
                    }}
                />
            </div>

            {/* Main Chat Layout Container */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl shadow-xs overflow-hidden flex flex-col md:flex-row min-h-[680px]">
                {/* LEFT COLUMN: Chat & Groups List */}
                <div className="w-full md:w-[340px] lg:w-[380px] border-r border-[#E2E8F0] flex flex-col shrink-0 bg-white">
                    {/* Top Bar of Left Column */}
                    <div className="p-4 sm:p-5 border-b border-[#F0F2F5] space-y-3">
                        {/* Title Header: either "Chat" or "← Group" */}
                        {viewMode === 'groups' ? (
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('all')}
                                    className="p-1 rounded-lg text-[#002E62] hover:bg-slate-100 transition-colors cursor-pointer"
                                    title="Back to all chats"
                                >
                                    <FiArrowLeft className="h-5 w-5 stroke-[2.2]" />
                                </button>
                                <h2 className="text-base sm:text-lg font-bold text-[#002E62]">
                                    Group
                                </h2>
                            </div>
                        ) : (
                            <h2 className="text-base sm:text-lg font-bold text-[#002E62]">
                                Chat
                            </h2>
                        )}

                        {/* Search Bar + Filter/Create Group Button */}
                        <div className="flex items-center gap-2 relative">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search"
                                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                                />
                            </div>

                            {/* If in group mode: '+' Button. If in all mode: filter button with dropdown */}
                            {viewMode === 'groups' ? (
                                <button
                                    type="button"
                                    onClick={() => setIsCreateGroupOpen(true)}
                                    className="p-2.5 rounded-xl bg-[#EBF3FF] hover:bg-[#DBEAFE] text-[#002E62] border border-[#BFDBFE] transition-colors cursor-pointer shadow-2xs"
                                    title="Create Group"
                                >
                                    <FiPlus className="h-4 w-4 stroke-[2.5]" />
                                </button>
                            ) : (
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsFilterDropdownOpen(!isFilterDropdownOpen)
                                        }
                                        className="p-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#002E62] border border-[#BFDBFE] transition-colors cursor-pointer shadow-2xs"
                                        title="Filter Chats"
                                    >
                                        <FiList className="h-4 w-4 stroke-[2.2]" />
                                    </button>

                                    {/* Dropdown with "Unread (20)" and "Group (06)" */}
                                    {isFilterDropdownOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 z-30 animate-scale-in">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsFilterDropdownOpen(false);
                                                    showSuccessToast(
                                                        'Unread Messages',
                                                        'Filtered to show 20 unread conversations.'
                                                    );
                                                }}
                                                className="w-full px-4 py-2 text-left text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                            >
                                                Unread (20)
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsFilterDropdownOpen(false);
                                                    setViewMode('groups');
                                                }}
                                                className="w-full px-4 py-2 text-left text-xs sm:text-sm font-semibold text-[#1E293B] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                                            >
                                                Group (06)
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Category Filter Pills: All (28) / Tenants / Vendors */}
                        <div className="flex items-center gap-2 pt-1">
                            {(['All', 'Tenants', 'Vendors'] as const).map((cat) => {
                                const isSelected = selectedCategory === cat;
                                const label = cat === 'All' ? 'All (28)' : cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            isSelected
                                                ? 'bg-[#EBF3FF] text-[#002E62] border border-[#BFDBFE]'
                                                : 'text-[#64748B] hover:text-[#002E62] border border-transparent'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F9]">
                        {filteredConversations.map((item) => {
                            const isSelected = item.id === activeChatId;
                            const isGroup = item.type === 'group';

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveChatId(item.id)}
                                    className={`w-full text-left p-4 sm:px-5 flex items-start gap-3.5 transition-colors cursor-pointer ${
                                        isSelected
                                            ? 'bg-[#F4F8FC]'
                                            : 'hover:bg-slate-50'
                                    }`}
                                >
                                    {/* Avatar / Group Badge */}
                                    <div className="relative shrink-0">
                                        {isGroup ? (
                                            <div
                                                className={`w-11 h-11 rounded-full border flex items-center justify-center ${getGroupBadgeColor(
                                                    item.tintColor
                                                )}`}
                                            >
                                                <FiUsers className="h-5 w-5" />
                                            </div>
                                        ) : item.avatar ? (
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-11 h-11 rounded-full object-cover border border-[#E2E8F0]"
                                            />
                                        ) : (
                                            <div className="w-11 h-11 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] flex items-center justify-center font-bold text-[#002E62] text-xs">
                                                {item.name.slice(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1">
                                            <h4 className="text-xs sm:text-sm font-bold text-[#002E62] truncate">
                                                {item.name}
                                            </h4>
                                            <span className="text-[11px] text-[#94A3B8] shrink-0 font-medium">
                                                {item.lastMessageTime}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-2 mt-1">
                                            <p className="text-xs text-[#64748B] truncate">
                                                {item.lastMessage}
                                            </p>
                                            {item.unreadCount ? (
                                                <span className="h-4.5 w-4.5 rounded-full bg-[#12B76A] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                                                    {item.unreadCount}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        {filteredConversations.length === 0 && (
                            <div className="py-12 text-center text-slate-400 text-xs">
                                No conversations found.
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Active Chat Messages Thread */}
                <div className="flex-1 flex flex-col bg-white min-w-0">
                    {/* Top Bar */}
                    <ChatTopBar
                        conversation={activeConversation}
                        onDownloadChat={() =>
                            showSuccessToast('Download', 'Chat history download started.')
                        }
                        onVoiceCall={() => {
                            setVideoRoomExpanded(false);
                            setIsVideoRoomOpen(true);
                        }}
                        onConferenceCall={() => {
                            setVideoRoomExpanded(true);
                            setIsVideoRoomOpen(true);
                        }}
                        onDeleteChat={() => setIsDeleteChatModalOpen(true)}
                        onScheduleMeeting={() => {
                            setScheduleModalInitialTab('schedule');
                            setIsScheduleModalOpen(true);
                        }}
                        onInstantMeeting={() => {
                            setScheduleModalInitialTab('instant');
                            setIsScheduleModalOpen(true);
                        }}
                    />

                    {/* Messages Scroll Area with Map Watermark Overlay */}
                    <div
                        className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 relative"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 10px 10px, rgba(0, 46, 98, 0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '24px 24px',
                        }}
                    >
                        {activeMessages.map((msg) => {
                            if (msg.isMeetingTemplate && msg.meetingDetails) {
                                return (
                                    <MeetingTemplateMessage
                                        key={msg.id}
                                        meeting={msg.meetingDetails}
                                        time={msg.time}
                                        onJoin={() => {
                                            setVideoRoomExpanded(false);
                                            setIsVideoRoomOpen(true);
                                        }}
                                    />
                                );
                            }

                            if (msg.isOutgoing) {
                                return (
                                    <div
                                        key={msg.id}
                                        className="flex flex-col items-end space-y-1"
                                    >
                                        <div className="max-w-md bg-[#E0F2FE] border border-[#BAE6FD] text-[#002E62] rounded-2xl rounded-tr-xs p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs">
                                            {msg.text}
                                        </div>
                                        <span className="text-[11px] text-[#94A3B8] font-medium pr-1">
                                            {msg.time}
                                        </span>
                                    </div>
                                );
                            }

                            // Incoming message
                            return (
                                <div
                                    key={msg.id}
                                    className="flex flex-col items-start space-y-1 max-w-lg"
                                >
                                    {msg.senderUnit && (
                                        <span className="text-xs font-bold text-[#002E62] pl-1">
                                            {msg.senderUnit}
                                        </span>
                                    )}
                                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] rounded-2xl rounded-tl-xs p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs">
                                        {msg.text}
                                    </div>
                                    <span className="text-[11px] text-[#94A3B8] font-medium pl-1">
                                        {msg.time}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Chat Input Bar */}
                    <ChatInputBar
                        onSendMessage={handleSendMessage}
                        onAttachFile={() =>
                            showSuccessToast('Attachment', 'File attachment selector opened.')
                        }
                        onVideoCall={() => {
                            setVideoRoomExpanded(false);
                            setIsVideoRoomOpen(true);
                        }}
                        onRecordVoice={() =>
                            showSuccessToast('Voice Note', 'Recording voice note...')
                        }
                    />
                </div>
            </div>

            {/* Create Group Slide-out Drawer */}
            <CreateGroupDrawer
                isOpen={isCreateGroupOpen}
                onClose={() => setIsCreateGroupOpen(false)}
                onSaveGroup={handleSaveGroup}
            />

            {/* Schedule Meeting Modal (Images 1 & 2) */}
            <ScheduleMeetingModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                initialTab={scheduleModalInitialTab}
                onSchedule={handleScheduleMeeting}
                onStartInstantMeeting={(data) => {
                    handleCreateInstantMeeting({
                        title: data.title,
                        description: data.description,
                        type: 'Private',
                        members: [],
                    });
                }}
            />

            {/* Instant Meeting Modal (with member selector) */}
            <InstantMeetingModal
                isOpen={isInstantModalOpen}
                onClose={() => setIsInstantModalOpen(false)}
                onCreateMeeting={handleCreateInstantMeeting}
            />

            {/* Delete Chat Confirmation Modal (Image 3) */}
            <DeleteChatModal
                isOpen={isDeleteChatModalOpen}
                onClose={() => setIsDeleteChatModalOpen(false)}
                onConfirm={handleConfirmDeleteChat}
            />

            {/* Video Meeting Room (Windowed Mode - Image 4 & Fullscreen - Image 5) */}
            <VideoMeetingRoomModal
                isOpen={isVideoRoomOpen}
                onClose={() => setIsVideoRoomOpen(false)}
                initialExpanded={videoRoomExpanded}
                workspaceName="Charles John's Workspace"
            />
        </div>
    );
}
