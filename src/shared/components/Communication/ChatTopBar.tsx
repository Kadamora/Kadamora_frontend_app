import {
    FiMoreHorizontal,
    FiDownload,
    FiPhone,
    FiVideo,
    FiTrash2,
    FiUsers,
} from 'react-icons/fi';
import ContextMenu from '../ContextMenu/ContextMenu';
import type { ChatConversation } from './types';

export interface ChatTopBarProps {
    conversation: ChatConversation;
    onDownloadChat?: () => void;
    onVoiceCall?: () => void;
    onConferenceCall?: () => void;
    onDeleteChat?: () => void;
    onScheduleMeeting?: () => void;
    onInstantMeeting?: () => void;
    className?: string;
}

export default function ChatTopBar({
    conversation,
    onDownloadChat,
    onVoiceCall,
    onConferenceCall,
    onDeleteChat,
    className = '',
}: ChatTopBarProps) {
    const isGroup = conversation.type === 'group';

    return (
        <div
            className={`flex items-center justify-between p-4 sm:px-6 border-b border-[#E2E8F0] bg-white ${className}`}
        >
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    {isGroup ? (
                        <div className="w-11 h-11 rounded-full bg-[#F3E8FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA]">
                            <FiUsers className="h-5 w-5" />
                        </div>
                    ) : conversation.avatar ? (
                        <img
                            src={conversation.avatar}
                            alt={conversation.name}
                            className="w-11 h-11 rounded-full object-cover border border-[#E2E8F0]"
                        />
                    ) : (
                        <div className="w-11 h-11 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] flex items-center justify-center font-bold text-[#002E62]">
                            {conversation.name.slice(0, 2).toUpperCase()}
                        </div>
                    )}

                    {/* Online status green dot */}
                    {conversation.isOnline !== false && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#12B76A] ring-2 ring-white" />
                    )}
                </div>

                <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#002E62] leading-tight">
                        {conversation.name}
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        {isGroup
                            ? conversation.subtitle || `${conversation.memberCount || 23} Members`
                            : conversation.subtitle || 'Active Now'}
                    </p>
                </div>
            </div>

            {/* Right: Actions Menu */}
            <ContextMenu
                trigger={
                    <button
                        type="button"
                        className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#002E62] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                        title="Conversation Actions"
                    >
                        <FiMoreHorizontal className="h-4 w-4" />
                    </button>
                }
                items={[
                    {
                        label: 'Download Chat',
                        icon: <FiDownload className="h-4 w-4 text-[#002E62]" />,
                        onClick: () => onDownloadChat?.(),
                    },
                    {
                        label: 'Voice Call',
                        icon: <FiPhone className="h-4 w-4 text-[#002E62]" />,
                        onClick: () => onVoiceCall?.(),
                    },
                    {
                        label: 'Conference Call',
                        icon: <FiVideo className="h-4 w-4 text-[#002E62]" />,
                        onClick: () => onConferenceCall?.(),
                    },
                    {
                        label: 'Delete',
                        icon: <FiTrash2 className="h-4 w-4 text-[#F43F5E]" />,
                        danger: true,
                        onClick: () => onDeleteChat?.(),
                    },
                ]}
            />
        </div>
    );
}
