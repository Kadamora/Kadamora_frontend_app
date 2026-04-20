import { useState } from 'react';
import { 
    useGetSupportTicketDetailsQuery, 
    useSendTicketMessageMutation, 
    useCloseSupportTicketMutation 
} from '@store/api/supportTicket.api';
import { Loader2 } from 'lucide-react';

const TicketDetail = ({ ticketId, onBack }: { ticketId: string, onBack: () => void }) => {
    const { data: detailsData, isLoading } = useGetSupportTicketDetailsQuery(ticketId);
    const [sendMessage, { isLoading: isSending }] = useSendTicketMessageMutation();
    const [closeTicket, { isLoading: isClosing }] = useCloseSupportTicketMutation();
    
    const [replyContent, setReplyContent] = useState('');
    const ticket = detailsData?.data;

    const handleSendReply = async () => {
        if (!replyContent.trim()) return;
        try {
            await sendMessage({ ticketId, content: replyContent }).unwrap();
            setReplyContent('');
        } catch (err) {
            console.error('Failed to send message:', err);
        }
    };

    const handleCloseTicket = async () => {
        try {
            await closeTicket(ticketId).unwrap();
        } catch (err) {
            console.error('Failed to close ticket:', err);
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-[#E4E7EC]">
                <Loader2 className="w-10 h-10 animate-spin text-[#0A66B2] mb-4" />
                <p className="text-[#71717A]">Loading ticket details...</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="w-full p-8 bg-white rounded-xl border border-[#E4E7EC] text-center">
                <p className="text-red-500 mb-4">Ticket not found or failed to load.</p>
                <button onClick={onBack} className="text-[#0A66B2] font-semibold">Back to Tickets</button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-6 cursor-pointer text-[#0A66B2] hover:underline" onClick={onBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span className="font-semibold text-[14px]">Back to Tickets</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#E4E7EC] p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-[20px] font-bold text-[#002E62] mb-1">Ticket #{ticket.id.slice(-6)}</h2>
                        <p className="text-[14px] text-[#71717A]">{ticket.subject}</p>
                    </div>
                    {ticket.status !== 'Closed' && (
                        <button 
                            onClick={handleCloseTicket}
                            disabled={isClosing}
                            className="flex items-center gap-2 px-4 py-2 bg-[#FF1E3F] text-white rounded-lg text-[14px] font-semibold hover:bg-[#E01A38] transition-colors disabled:opacity-60"
                        >
                            {isClosing ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            )}
                            Close Ticket
                        </button>
                    )}
                </div>

                {/* Ticket Info Box */}
                <div className="border border-[#E4E7EC] rounded-xl p-5 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h3 className="text-[16px] font-bold text-[#002E62]">Ticket Information</h3>
                        <div className="flex gap-2">
                            <span className="bg-[#F0F7FF] text-[#0A66B2] text-[12px] font-bold px-3 py-1 rounded-md">{ticket.status} Ticket</span>
                            <span className={`text-[12px] font-bold px-3 py-1 rounded-md 
                                ${ticket.priority === 'High' ? 'bg-red-50 text-red-600' : ''}
                                ${ticket.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : ''}
                                ${ticket.priority === 'Low' ? 'bg-blue-50 text-blue-600' : ''}
                            `}>
                                {ticket.priority} Priority
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-12 mb-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-[12px] text-[#71717A] mb-0.5">Created</p>
                                <p className="text-[13px] text-[#002E62] font-medium">{formatDate(ticket.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-[12px] text-[#71717A] mb-0.5">Updated</p>
                                <p className="text-[13px] text-[#002E62] font-medium">{formatDate(ticket.updatedAt)}</p>
                            </div>
                        </div>
                    </div>

                    <h4 className="text-[15px] font-bold text-[#002E62] mb-3">{ticket.subject}</h4>
                    <div className="bg-[#F8FAFC] border border-[#E4E7EC] rounded-lg p-5 text-[14px] text-[#475467] leading-relaxed">
                        {ticket.description}
                    </div>
                </div>

                {/* Conversation Box */}
                {ticket.messages && ticket.messages.length > 0 && (
                    <div className="border border-[#E4E7EC] rounded-xl p-5 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[16px] font-bold text-[#002E62]">Conversation</h3>
                            <a href="#reply" className="text-[#0A66B2] text-[14px] font-medium hover:underline">Reply</a>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {ticket.messages.map((msg, idx) => (
                                <div key={msg.id || idx} className={`p-5 rounded-lg border-l-[3px] 
                                    ${msg.senderName === 'Technical Support' || msg.senderName === 'Support' 
                                        ? 'bg-[#F0F7FF] border-[#0A66B2]' 
                                        : 'bg-[#F8FAFC] border-gray-300'}
                                `}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-[#002E62] text-[14px]">{msg.senderName}</span>
                                        <span className="text-[#9CA3AF] text-[12px]">{formatDate(msg.createdAt)}</span>
                                    </div>
                                    <p className="text-[14px] text-[#475467] leading-relaxed">
                                        {msg.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reply Box */}
                {ticket.status !== 'Closed' && (
                    <div className="border border-[#E4E7EC] rounded-xl p-5" id="reply">
                        <h3 className="text-[16px] font-bold text-[#002E62] mb-1">Your Message</h3>
                        <p className="text-[13px] text-[#71717A] mb-4">Your reply will be sent to our support team</p>
                        
                        <textarea 
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full bg-[#F8FAFC] border border-[#E4E7EC] rounded-lg p-4 text-[14px] focus:outline-none focus:border-[#0A66B2] focus:ring-1 focus:ring-[#0A66B2]"
                            rows={4}
                            placeholder="Respond to Support..."
                        ></textarea>
                        
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={handleSendReply}
                                disabled={isSending || !replyContent.trim()}
                                className="flex items-center gap-2 px-6 py-2.5 bg-[#002E62] text-white rounded-lg text-[14px] font-semibold hover:bg-[#003d82] transition-colors disabled:opacity-60"
                            >
                                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                )}
                                Send Reply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetail;
