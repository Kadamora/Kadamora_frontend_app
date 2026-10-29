import React, { useState, type FormEvent } from 'react';
import {
    FiPlus,
    FiVideo,
    FiMic,
    FiFileText,
    FiSend,
} from 'react-icons/fi';

export interface ChatInputBarProps {
    onSendMessage: (text: string) => void;
    onAttachFile?: () => void;
    onRecordVoice?: () => void;
    onVideoCall?: () => void;
    placeholder?: string;
    className?: string;
}

export default function ChatInputBar({
    onSendMessage,
    onAttachFile,
    onRecordVoice,
    onVideoCall,
    placeholder = 'Write a message ...',
    className = '',
}: ChatInputBarProps) {
    const [text, setText] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSendMessage(text.trim());
        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`p-4 bg-white border-t border-[#E2E8F0] space-y-3 ${className}`}
        >
            <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] focus:outline-none resize-none bg-transparent"
            />

            <div className="flex items-center justify-between pt-1">
                {/* Media & Attachment actions */}
                <div className="flex items-center gap-2 text-[#64748B]">
                    <button
                        type="button"
                        onClick={onAttachFile}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Add Attachment"
                    >
                        <FiPlus className="h-4 w-4 stroke-[2.2]" />
                    </button>

                    <button
                        type="button"
                        onClick={onVideoCall}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Video Message"
                    >
                        <FiVideo className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onRecordVoice}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Voice Note"
                    >
                        <FiMic className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onAttachFile}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#002E62] transition-colors cursor-pointer"
                        title="Attach Document"
                    >
                        <FiFileText className="h-4 w-4" />
                    </button>
                </div>

                {/* Send button */}
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="px-5 py-2 bg-[#002E62] hover:bg-[#072440] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
                >
                    <span>Send</span>
                    <FiSend className="h-3.5 w-3.5" />
                </button>
            </div>
        </form>
    );
}
