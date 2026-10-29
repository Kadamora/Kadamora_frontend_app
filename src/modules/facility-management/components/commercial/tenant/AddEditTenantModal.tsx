import { useState, useEffect, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';
import type { CorporateTenant } from '../../../types/commercialFacilities';

interface AddEditTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: CorporateTenant | null;
    onSubmit: (tenant: CorporateTenant) => void;
}

export default function AddEditTenantModal({
    isOpen,
    onClose,
    mode,
    initialData,
    onSubmit,
}: AddEditTenantModalProps) {
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [property, setProperty] = useState('');
    const [leaseStartDate, setLeaseStartDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setCompanyName(initialData.companyName);
            setContactName(initialData.contactPerson);
            setEmail(initialData.email || '');
            setPhoneNumber(initialData.phoneNumber || '');
            setProperty(initialData.property);
            setLeaseStartDate(initialData.leaseStartDate || '');
        } else {
            setCompanyName('');
            setContactName('');
            setEmail('');
            setPhoneNumber('');
            setProperty('');
            setLeaseStartDate('');
        }
    }, [mode, initialData, isOpen]);

    const propertyOptions = [
        { label: 'Sunset GroveA', value: 'Sunset GroveA' },
        { label: 'Meadow viewB', value: 'Meadow viewB' },
        { label: 'Riverbend 10', value: 'Riverbend 10' },
        { label: 'Cedarwood 3A', value: 'Cedarwood 3A' },
        { label: 'Cedarwood 3B', value: 'Cedarwood 3B' },
        { label: 'Lakeside F', value: 'Lakeside F' },
        { label: 'Brookstone A', value: 'Brookstone A' },
        { label: 'Brookstone G', value: 'Brookstone G' },
        { label: 'Hilcreast', value: 'Hilcreast' },
        { label: 'Diamond', value: 'Diamond' },
        { label: 'Sunny Estate', value: 'Sunny Estate' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!companyName.trim()) {
            showWarningToast('Missing Field', 'Please enter company name.');
            return;
        }
        if (!contactName.trim()) {
            showWarningToast('Missing Field', 'Please enter contact person name.');
            return;
        }
        if (!email.trim()) {
            showWarningToast('Missing Field', 'Please enter email address.');
            return;
        }
        if (!phoneNumber.trim()) {
            showWarningToast('Missing Field', 'Please enter phone number.');
            return;
        }
        if (!property) {
            showWarningToast('Missing Field', 'Please select a property.');
            return;
        }
        if (mode === 'create' && !leaseStartDate) {
            showWarningToast('Missing Field', 'Please select lease start date.');
            return;
        }

        setIsSubmitting(true);

        const tenantId =
            mode === 'edit' && initialData
                ? initialData.id
                : `TEN${String(Math.floor(100 + Math.random() * 900))}`;

        const currentYear = new Date().getFullYear();
        const formattedTerm =
            mode === 'edit' && initialData
                ? initialData.leaseTerm
                : `${leaseStartDate || 'Jan 15, ' + currentYear} - Jan 15, ${currentYear + 1}`;

        const updated: CorporateTenant = {
            id: tenantId,
            companyName: companyName.trim(),
            contactPerson: contactName.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            property,
            leaseAmount: initialData?.leaseAmount || '45,000.00',
            leaseTerm: formattedTerm,
            leaseStartDate,
            status: initialData?.status || 'Active',
        };

        setTimeout(() => {
            onSubmit(updated);
            showSuccessToast(
                mode === 'edit' ? 'Tenant Details Updated' : 'New Tenant Registered',
                mode === 'edit'
                    ? `${updated.companyName} details have been updated.`
                    : `${updated.companyName} (${updated.id}) has been added to tenant directory.`
            );
            setIsSubmitting(false);
            onClose();
        }, 300);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                <h3 className="text-xl font-bold text-[#002E62]">
                    {mode === 'edit' ? 'Edit Tenant Details' : 'Add New Tenant'}
                </h3>
            }
            maxWidth="max-w-[540px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Company Name */}
                <Input
                    title="Company Name"
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />

                {/* Contact Name */}
                <Input
                    title="Contact Name"
                    placeholder="Enter contact person name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                />

                {/* Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        title="Email"
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        title="Phone Number"
                        type="tel"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                {/* Property */}
                <Select
                    title="Property"
                    placeholder="Select property"
                    options={propertyOptions}
                    value={property}
                    onChange={(val) => setProperty(val)}
                    required
                />

                {/* Lease Start Date (Visible in create mode matching Image 2) */}
                {mode === 'create' && (
                    <Input
                        title="Lease Start Date"
                        type="date"
                        placeholder="Select date"
                        value={leaseStartDate}
                        onChange={(e) => setLeaseStartDate(e.target.value)}
                        required
                    />
                )}

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting
                            ? 'Processing...'
                            : mode === 'edit'
                            ? 'Save Changes'
                            : 'Add Tenant'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
