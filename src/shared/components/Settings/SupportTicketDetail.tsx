import { useState, type FormEvent } from 'react';
import { FiArrowLeft, FiCalendar, FiSend, FiXCircle } from 'react-icons/fi';
import type { SupportTicketItem } from './SupportTicketsTable';
import { showSuccessToast } from '../Toast/Toast';

export interface SupportTicketMessage {
    id: string;
    sender: string;
    time: string;
    text: string;
    isSupport?: boolean;
}

export interface SupportTicketDetailProps {
    ticket: SupportTicketItem;
    onBack: () => void;
    onCloseTicket?: (ticketId: string) => void;
    onSendReply?: (replyText: string) => void;
    initialMessages?: SupportTicketMessage[];
    className?: string;
}

export default function SupportTicketDetail({
    ticket,
    onBack,
    onCloseTicket,
    onSendReply,
    initialMessages,
    className = '',
}: SupportTicketDetailProps) {
    const [replyText, setReplyText] = useState('');
    const [status, setStatus] = useState<string>(ticket.status);
    const [messages, setMessages] = useState<SupportTicketMessage[]>(
        initialMessages || [
            {
                id: 'msg-1',
                sender: 'Technical Support',
                time: '04 June, 2025 - 03:34 AM',
                text: "I've investigated your login issue and found that your account was temporarily locked due to multiple failed login attempts. I've now unlocked your account. Please try logging in again and let me know if you continue to experience issues.",
                isSupport: true,
            },
        ]
    );

    const handleToggleTicketStatus = () => {
        const next = status === 'Closed' ? 'Open' : 'Closed';
        setStatus(next);
        if (onCloseTicket) {
            onCloseTicket(ticket.id);
        }
        showSuccessToast('Ticket Status Updated', `Ticket is now marked as ${next}.`);
    };

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newMsg: SupportTicketMessage = {
            id: `msg-${Date.now()}`,
            sender: ticket.user || 'You',
            time: 'Just now',
            text: replyText.trim(),
            isSupport: false,
        };

        setMessages((prev) => [...prev, newMsg]);
        onSendReply?.(replyText.trim());
        setReplyText('');
        showSuccessToast('Reply Sent', 'Your message has been sent to the support team.');
    };

    return (
        <div className={`space-y-6 animate-fade-in ${className}`}>
            {/* Top Navigation & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[#002E62] transition-colors cursor-pointer shadow-2xs"
                        title="Back to Tickets"
                    >
                        <FiArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#002E62]">
                            Ticket {ticket.id}
                        </h2>
                        <p className="text-xs text-[#64748B]">
                            Unable to login to my account
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleToggleTicketStatus}
                    className="px-4 py-2.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
                >
                    <FiXCircle className="h-4 w-4" />
                    {status === 'Closed' ? 'Reopen Ticket' : 'Close Ticket'}
                </button>
            </div>

            {/* Card 1: Ticket Information */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between gap-4 border-b border-[#F1F5F9] pb-4">
                    <h3 className="text-sm sm:text-base font-bold text-[#002E62]">
                        Ticket Information
                    </h3>

                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#E0F2FE] text-[#0284C7]">
                            {status === 'Closed' ? 'Closed Ticket' : 'Open Ticket'}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#FFE4E6] text-[#E11D48]">
                            {ticket.priority || 'High'}
                        </span>
                    </div>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-1 text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                        <FiCalendar className="h-4 w-4 text-[#94A3B8]" />
                        <span>
                            <strong className="font-semibold text-[#334155]">Created:</strong> 04 June, 2025 - 03:34 AM
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FiCalendar className="h-4 w-4 text-[#94A3B8]" />
                        <span>
                            <strong className="font-semibold text-[#334155]">Updated:</strong> 04 June, 2025 - 03:34 AM
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-[#002E62] pt-1">
                    {ticket.title}
                </h4>

                {/* Description Box */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {ticket.description ||
                        'The system was unable to locate and assign a suitable Medical Director within my location. As a result, I was unable to proceed with the necessary steps for my request or consultation, which has caused a delay in moving forward with the process.'}
                </div>
            </div>

            {/* Card 2: Conversation Thread */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
                <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#002E62]">Conversation</h3>
                    <p className="text-xs font-semibold text-[#0284C7]">
                        {messages.length} {messages.length === 1 ? 'Reply' : 'Replies'}
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`rounded-xl p-4 sm:p-5 space-y-2 border ${
                                msg.isSupport !== false
                                    ? 'bg-[#EFF6FF] border-[#BFDBFE] border-l-4 border-l-[#0070F3]'
                                    : 'bg-[#F8FAFC] border-[#E2E8F0] border-l-4 border-l-[#12B76A]'
                            }`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h4
                                    className={`text-xs sm:text-sm font-bold ${
                                        msg.isSupport !== false ? 'text-[#0070F3]' : 'text-[#12B76A]'
                                    }`}
                                >
                                    {msg.sender}
                                </h4>
                                <span className="text-xs text-[#64748B]">{msg.time}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                                {msg.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 3: Your Message Box */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
                <div>
                    <h3 className="text-base font-bold text-[#002E62]">Your Message</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                        Your reply will be sent to our support team
                    </p>
                </div>

                <form onSubmit={handleSend} className="space-y-4">
                    <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Respond to Supports..."
                        className="w-full p-4 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62] focus:bg-white transition-colors resize-none"
                    />

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                        >
                            <FiSend className="h-4 w-4" />
                            Send Reply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
