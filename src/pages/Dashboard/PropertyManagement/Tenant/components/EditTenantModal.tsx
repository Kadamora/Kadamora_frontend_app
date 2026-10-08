import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import React, { useState, useEffect } from 'react';
import { useUpdateTenantMutation, PropertyType, PaymentFrequency } from '@store/api/tenant.api';
import toast from 'react-hot-toast';

interface EditTenantModalProps {
    open: boolean;
    onClose: () => void;
    tenant: any; // The tenant object from the table
}

const propertyTypeOptions = [
    { label: 'Apartment', value: PropertyType.APARTMENT },
    { label: 'House', value: PropertyType.HOUSE },
    { label: 'Studio', value: PropertyType.STUDIO },
    { label: 'Duplex', value: PropertyType.DUPLEX },
    { label: 'Office', value: PropertyType.OFFICE },
    { label: 'Commercial', value: PropertyType.COMMERCIAL },
    { label: 'One Bedroom', value: PropertyType.ONEBEDROOM },
    { label: 'Two Bedroom', value: PropertyType.TWOBEDROOM },
    { label: 'Three Bedroom', value: PropertyType.THREEBEDROOM },
    { label: 'Four Bedroom', value: PropertyType.FOURBEDROOM },
    { label: 'Penthouse', value: PropertyType.PENTHOUSE },
    { label: 'Townhouse', value: PropertyType.TOWNHOUSE },
    { label: 'Villa', value: PropertyType.VILLA },
    { label: 'Terrace', value: PropertyType.TERRACE },
    { label: 'Semi Detached', value: PropertyType.SEMI_DETACHED },
    { label: 'Detached', value: PropertyType.DETACHED },
    { label: 'Quadplex', value: PropertyType.QUADPLEX },
    { label: 'Quintplex', value: PropertyType.QUINTPLEX },
    { label: 'Sextplex', value: PropertyType.SEXTPLEX },
    { label: 'Septplex', value: PropertyType.SEPTPLEX },
    { label: 'Octoplex', value: PropertyType.OCTOPLEX },
    { label: 'Non Residential', value: PropertyType.NON_RESIDENTIAL },
    { label: 'Maisonette', value: PropertyType.MAISONETTE },
];

const paymentFrequencyOptions = [
    { label: 'Monthly', value: PaymentFrequency.MONTHLY },
    { label: 'Quarterly', value: PaymentFrequency.QUARTERLY },
    { label: 'Yearly', value: PaymentFrequency.YEARLY },
];

const EditTenantModal: React.FC<EditTenantModalProps> = ({ open, onClose, tenant }) => {
    const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.APARTMENT);
    const [amount, setAmount] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>(PaymentFrequency.MONTHLY);
    const [currentDueDate, setCurrentDueDate] = useState('');

    const [updateTenant, { isLoading }] = useUpdateTenantMutation();

    // Pre-fill form when the tenant data changes or the modal opens
    useEffect(() => {
        if (tenant && open) {
            setPropertyType((tenant.propertyType as PropertyType) || PropertyType.APARTMENT);
            setAmount(tenant.rent?.amount ? String(tenant.rent.amount) : '');
            setPaymentFrequency((tenant.rent?.frequency as PaymentFrequency) || PaymentFrequency.MONTHLY);
            const dateStr = tenant.rent?.dueDate
                ? new Date(tenant.rent.dueDate).toISOString().split('T')[0]
                : '';
            setCurrentDueDate(dateStr);
        }
    }, [tenant, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenant?.id) return;

        try {
            await updateTenant({
                tenantId: tenant.id,
                propertyType,
                amount: Number(amount),
                paymentFrequency,
                currentDueDate: currentDueDate ? new Date(currentDueDate).toISOString() : undefined,
            }).unwrap();

            toast.success('Tenant updated successfully');
            onClose();
        } catch (error: any) {
            console.error('Failed to update tenant:', error);
            toast.error(error?.data?.message || 'Failed to update tenant');
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
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

                <h2 className="text-lg font-semibold mb-5 text-[#0A2D50]">Edit Tenant</h2>
                {/* {tenant?.name && (
                    <p className="text-[14px] text-[#64748B] mb-6">
                        Updating rent details for <span className="font-medium text-[#0A2D50]">{tenant.name}</span>
                    </p>
                )} */}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Select
                        title="Property Type"
                        name="propertyType"
                        placeholder="Select type"
                        options={propertyTypeOptions}
                        value={propertyType}
                        onChange={(val: string) => setPropertyType(val as PropertyType)}
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
                            title="Current Due Date"
                            name="currentDueDate"
                            placeholder="Select Date"
                            type="date"
                            required
                            className="flex-1"
                            value={currentDueDate}
                            onChange={(e) => setCurrentDueDate(e.target.value)}
                        />
                    </div>

                    <Select
                        title="Payment Frequency"
                        name="paymentFrequency"
                        placeholder="Select frequency"
                        options={paymentFrequencyOptions}
                        value={paymentFrequency}
                        onChange={(val: string) => setPaymentFrequency(val as PaymentFrequency)}
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full py-3 rounded-lg bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading && (
                            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {isLoading ? 'Updating...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTenantModal;
