import React, { useState } from 'react';
import TicketList from './Support/TicketList';
import TicketDetail from './Support/TicketDetail';
import { useGetSupportTicketsQuery } from '@store/api/supportTicket.api';

const SupportSettings: React.FC = () => {
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const { data: ticketsData, isLoading } = useGetSupportTicketsQuery();

    const tickets = ticketsData?.data || [];

    const handleBack = () => setSelectedTicketId(null);

    if (selectedTicketId) {
        return <TicketDetail ticketId={selectedTicketId} onBack={handleBack} />;
    }

    return (
        <TicketList 
            onSelectTicket={(id) => setSelectedTicketId(id)} 
            tickets={tickets} 
            isLoading={isLoading}
        />
    );
};

export default SupportSettings;
