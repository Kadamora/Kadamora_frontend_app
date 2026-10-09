import React, { useState } from 'react';
import { FiArrowLeft, FiCalendar, FiSend, FiXCircle } from 'react-icons/fi';

interface TicketDetailProps {
    ticketId?: string;
    ticketTitle?: string;
    onBack: () => void;
}

export default function HTTicketDetailView({
    ticketId = '#ticket-001',
    ticketTitle = 'Request for maintenance in common areas',
    onBack,
}: TicketDetailProps) {
    const [replyText, setReplyText] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 'msg-1',
            sender: 'Technical Support',
            time: '04 June, 2025 - 03:34 AM',
            text: "I've investigated your login issue and found that your account was temporarily locked due to multiple failed login attempts. I've now unlocked your account. Please try logging in again and let me know if you continue to experience issues.",
        },
    ]);
    const [ticketStatus, setTicketStatus] = useState<'Open' | 'Closed'>('Open');

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'Charles John',
            time: 'Just now',
            text: replyText.trim(),
        };

        setMessages((prev) => [...prev, newMsg]);
        setReplyText('');
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
            {/* Top Back Navigation Header */}
            <div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="p-1.5 rounded-lg text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Back to Tickets"
                    >
                        <FiArrowLeft className="h-5 w-5 stroke-[2.5]" />
                    </button>
                    <h1 className="text-2xl font-bold text-[#002E62]">Settings</h1>
                </div>
                <p className="text-sm text-[#52525B] mt-1 pl-8">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            {/* Card 1: Ticket Overview & Information */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
                {/* Header Row: ID, Subtitle & Close Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">Ticket {ticketId}</h2>
                        <p className="text-xs text-[#64748B] mt-0.5">Unable to login to my account</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setTicketStatus(ticketStatus === 'Open' ? 'Closed' : 'Open');
                            alert(`Ticket mark as ${ticketStatus === 'Open' ? 'Closed' : 'Open'}`);
                        }}
                        className="px-4 py-2.5 bg-[#F43F5E] hover:bg-[#E11D48] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
                    >
                        <FiXCircle className="h-4 w-4 stroke-[2.2]" />
                        {ticketStatus === 'Open' ? 'Close Ticket' : 'Reopen Ticket'}
                    </button>
                </div>

                {/* Inside Box: Ticket Information */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Ticket Information</h3>

                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#E0F2FE] text-[#0284C7]">
                                Open Ticket
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#FFE4E6] text-[#E11D48]">
                                High
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
                    <h4 className="text-sm font-bold text-[#0F172A] pt-1">{ticketTitle}</h4>

                    {/* Gray Description Box */}
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#475467] leading-relaxed">
                        The system was unable to locate and assign a suitable Medical Director within my location. As a result, I was unable to proceed with the necessary steps for my request or consultation, which has caused a delay in moving forward with the process.
                    </div>
                </div>
            </div>

            {/* Card 2: Conversation */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">Conversation</h3>
                    <p className="text-xs font-semibold text-[#0284C7] cursor-pointer hover:underline">
                        {messages.length} {messages.length === 1 ? 'Reply' : 'Replies'}
                    </p>
                </div>

                <div className="space-y-3 pt-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="bg-[#EFF6FF] border border-[#BFDBFE] border-l-4 border-l-[#0070F3] rounded-xl p-4 sm:p-5 space-y-2"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <h4 className="text-xs sm:text-sm font-bold text-[#0070F3]">{msg.sender}</h4>
                                <span className="text-xs text-[#64748B]">{msg.time}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">{msg.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 3: Your Message */}
            <div className="bg-white border border-[#BED3EB] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">Your Message</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">Your reply will be sent to our support team</p>
                </div>

                <form onSubmit={handleSendReply} className="space-y-4">
                    <textarea
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Respond to Supports..."
                        className="w-full p-4 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62] focus:bg-white transition-colors"
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
