import { useState } from 'react';
import Input from '@shared/components/Forms/Input';
import { useHTListingForm } from '../useHTListingForm';
import { FiPlus, FiTrash2, FiTag } from 'react-icons/fi';

/**
 * Ticketing step — used by Parks & Nature AND Events & Festivals
 * Lets the user define ticket types (name, price, description) and a booking link
 */
export default function TicketingStep() {
    const { state, addTicketType, removeTicketType, updateField } = useHTListingForm();

    const [newTicket, setNewTicket] = useState({ name: '', price: '', description: '' });
    const [error, setError] = useState('');

    const handleAddTicket = () => {
        if (!newTicket.name.trim() || !newTicket.price.trim()) {
            setError('Please enter ticket name and price.');
            return;
        }
        setError('');
        addTicketType(newTicket);
        setNewTicket({ name: '', price: '', description: '' });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-[18px] font-semibold text-[#002E62]">Ticketing</h2>
                <p className="text-sm text-[#71717A] mt-1">
                    Set up ticket types and pricing for entry into your listing.
                </p>
            </div>

            {/* Add ticket type */}
            <div className="border border-[#E0DEF7] rounded-xl p-5 bg-[#F7F7FD] space-y-4">
                <h3 className="text-sm font-semibold text-[#002E62]">Add Ticket Type</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        id="ticket-name"
                        title="Ticket Name"
                        placeholder="e.g. General Admission"
                        value={newTicket.name}
                        onChange={(e) => setNewTicket((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                        id="ticket-price"
                        title="Price (₦)"
                        placeholder="e.g. 2,500 or Free"
                        value={newTicket.price}
                        onChange={(e) => setNewTicket((prev) => ({ ...prev, price: e.target.value }))}
                    />
                </div>
                <Input
                    id="ticket-description"
                    title="Description (optional)"
                    placeholder="e.g. Includes access to main arena"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket((prev) => ({ ...prev, description: e.target.value }))}
                />

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                    type="button"
                    onClick={handleAddTicket}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                    <FiPlus className="h-4 w-4" />
                    Add Ticket Type
                </button>
            </div>

            {/* Added ticket types */}
            {state.ticketTypes.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-[#002E62]">Ticket Types</h3>
                    {state.ticketTypes.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="flex items-start justify-between p-4 border border-[#E2E8F0] rounded-xl bg-white"
                        >
                            <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-full bg-[#E8F5EF] flex items-center justify-center shrink-0">
                                    <FiTag className="h-4 w-4 text-[#359F6A]" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#002E62]">{ticket.name}</p>
                                    <p className="text-sm text-[#359F6A] font-medium">₦{ticket.price}</p>
                                    {ticket.description && (
                                        <p className="text-xs text-[#71717A] mt-0.5">{ticket.description}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeTicketType(ticket.id)}
                                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                aria-label="Remove ticket"
                            >
                                <FiTrash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Ticketing Platform / Booking Link */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#002E62]">Ticketing Platform</h3>
                <Input
                    id="ticketing-platform"
                    title="Platform Name (optional)"
                    placeholder="e.g. Eventbrite, Nairabox, Paystack"
                    value={state.ticketingPlatform}
                    onChange={(e) => updateField('ticketingPlatform', e.target.value)}
                />
                <Input
                    id="booking-link"
                    title="Booking / Purchase Link"
                    placeholder="https://"
                    type="url"
                    value={state.bookingLink}
                    onChange={(e) => updateField('bookingLink', e.target.value)}
                />
            </div>
        </div>
    );
}
