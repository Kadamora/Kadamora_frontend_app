import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import React, { useState } from 'react';
import { useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';
import { useInviteTenantMutation } from '@store/api/tenant.api';

interface AddTenantModalProps {
    open: boolean;
    onClose: () => void;
    defaultPropertyId?: string; // Optional if opened from a specific context
}

const propertyTypeOptions = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
];

const paymentFrequencyOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
];

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onClose, defaultPropertyId }) => {
    const [propertyId, setPropertyId] = useState(defaultPropertyId || '');
    const [email, setEmail] = useState('');
    const [propertyType, setPropertyType] = useState('residential');
    const [amount, setAmount] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('monthly');
    const [rentStartDate, setRentStartDate] = useState('');

    const { data: propertiesData } = useGetManagedPropertiesQuery(undefined, { skip: !open });
    const [inviteTenant, { isLoading }] = useInviteTenantMutation();

    const propertiesOptions = propertiesData?.data?.map((p: any) => ({
        label: p.name,
        value: p.id
    })) || [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!propertyId) {
            console.error("Property must be selected");
            return;
        }

        try {
            await inviteTenant({
                propertyId,
                tenants: [
                    {
                        email,
                        propertyType,
                        amount: Number(amount),
                        paymentFrequency,
                        rentStartDate: new Date(rentStartDate).toISOString(),
                    }
                ]
            }).unwrap();

            // Clear form and close on success
            setEmail('');
            setPropertyType('residential');
            setAmount('');
            setPaymentFrequency('monthly');
            setRentStartDate('');
            setPropertyId(defaultPropertyId || '');
            onClose();
        } catch (error) {
            console.error('Failed to invite tenant:', error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 animate-[fadeIn_.25s_ease] relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#94A3B8]"
                    aria-label="Close"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold mb-6">Invite Tenant</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Select
                        title="Property"
                        name="propertyId"
                        placeholder="Select property"
                        options={propertiesOptions}
                        value={propertyId}
                        onChange={setPropertyId}
                        required
                    />
                    <Input
                        title="Tenant Email"
                        name="email"
                        placeholder="Enter tenant email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Select
                        title="Property Type"
                        name="propertyType"
                        placeholder="Select type"
                        options={propertyTypeOptions}
                        value={propertyType}
                        onChange={setPropertyType}
                        required
                    />
                    <div className="flex gap-4">
                        <Input
                            title="Rent Amount"
                            name="amount"
                            placeholder="Enter amount"
                            type="number"
                            required
                            className="flex-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <Input
                            title="Rent Start Date"
                            name="rentStartDate"
                            placeholder="Select Date"
                            type="date"
                            required
                            className="flex-1"
                            value={rentStartDate}
                            onChange={(e) => setRentStartDate(e.target.value)}
                        />
                    </div>
                    <Select
                        title="Payment Frequency"
                        name="paymentFrequency"
                        placeholder="Select frequency"
                        options={paymentFrequencyOptions}
                        value={paymentFrequency}
                        onChange={setPaymentFrequency}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 rounded-lg bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTenantModal;
