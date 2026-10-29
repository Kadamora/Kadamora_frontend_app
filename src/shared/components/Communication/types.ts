export interface MeetingDetails {
    hostName: string;
    title: string;
    attendeeAvatars: string[];
    attendeeCountText: string; // e.g. "+50 Others"
    linkText?: string;
    onJoin?: () => void;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    senderUnit?: string; // e.g. "Ayobami Dende (Unit A)"
    text: string;
    time: string;
    isOutgoing: boolean;
    isMeetingTemplate?: boolean;
    meetingDetails?: MeetingDetails;
}

export interface ChatConversation {
    id: string;
    name: string;
    type: 'direct' | 'group';
    category: 'Tenants' | 'Vendors' | 'All';
    avatar?: string;
    subtitle?: string; // e.g. "DiamondA" or "23 Members"
    lastMessage: string;
    lastMessageTime: string;
    unreadCount?: number;
    memberCount?: number;
    isOnline?: boolean;
    tintColor?: 'purple' | 'green' | 'pink' | 'yellow' | 'blue';
}

export interface CreateGroupFormData {
    name: string;
    userType: string;
    description: string;
    members: string[];
}
