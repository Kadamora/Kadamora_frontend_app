import { useState } from 'react';
import SupportTicketsTable from '@shared/components/Settings/SupportTicketsTable';
import SupportTicketDetail from '@shared/components/Settings/SupportTicketDetail';
import { mockSupportTickets } from '../../data/settingsMock';
import type { SupportTicketItem } from '../../types/settings';

export default function FMSupportTabView() {
    const [tickets, setTickets] = useState<SupportTicketItem[]>(mockSupportTickets);
    const [selectedTicket, setSelectedTicket] = useState<SupportTicketItem | null>(null);

    const handleCloseTicket = (ticketId: string) => {
        setTickets((prev) =>
            prev.map((t) =>
                t.id === ticketId
                    ? { ...t, status: t.status === 'Closed' ? 'Open' : 'Closed' }
                    : t
            )
        );
    };

    if (selectedTicket) {
        return (
            <SupportTicketDetail
                ticket={selectedTicket}
                onBack={() => setSelectedTicket(null)}
                onCloseTicket={handleCloseTicket}
            />
        );
    }

    return (
        <SupportTicketsTable
            tickets={tickets}
            onViewTicket={(ticket) => setSelectedTicket(ticket)}
        />
    );
}
