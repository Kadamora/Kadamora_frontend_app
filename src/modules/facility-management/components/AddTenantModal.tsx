import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Button from '@shared/components/Button/Button';
import { FiInfo } from 'react-icons/fi';
import type { NewTenantInput } from '../types';

export interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NewTenantInput) => void;
    defaultProperty?: string;
}

const PROPERTY_OPTIONS = [
    { label: 'Sunset Gardens', value: 'Sunset Gardens' },
    { label: 'Hilltop', value: 'Hilltop' },
    { label: 'Dominion Estate', value: 'Dominion Estate' },
    { label: 'Hilton Estate', value: 'Hilton Estate' },
    { label: 'De Villa', value: 'De Villa' },
    { label: 'Oak City', value: 'Oak City' },
    { label: 'Blissful Acres', value: 'Blissful Acres' },
    { label: 'Sunset Ridge', value: 'Sunset Ridge' },
    { label: 'Whispering Pines', value: 'Whispering Pines' },
    { label: 'Dreamscape Estate', value: 'Dreamscape Estate' },
    { label: 'Elysian Grove', value: 'Elysian Grove' },
    { label: 'Radiant Valley', value: 'Radiant Valley' },
    { label: 'Majestic Hills', value: 'Majestic Hills' },
];

export default function AddTenantModal(props: AddTenantModalProps) {
    if (!props.isOpen) return null;

    return (
        <AddTenantModalContent
            key={props.defaultProperty || 'new'}
            {...props}
        />
    );
}

function AddTenantModalContent({
    isOpen,
    onClose,
    onSubmit,
    defaultProperty,
}: AddTenantModalProps) {
    const [formData, setFormData] = useState<NewTenantInput>({
        email: '',
        phone: '',
        property: defaultProperty || '',
        unit: '',
        leaseStartDate: '',
    });

    const handleChange = (field: keyof NewTenantInput, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.property) {
            return;
        }
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Tenant" className='max-h-[88vh] overflow-hidden overflow-y-auto hide-scrollbar' maxWidth="max-w-[550px]">
            {/* Note banner */}
            <div className="rounded-md bg-[#F2F8FF] p-4 mb-6">
                <div className="flex items-start">
                    <div className="space-y-0">
                        <div className="flex items-center gap-1">
                            <FiInfo className="h-4 w-4 text-[#004493]" />
                            <span className="text-sm font-semibold text-[#004493] block">Note:</span>
                        </div>
                        <p className="text-xs text-[#475467] leading-relaxed mt-0.5">
                            The tenant you added will receive a welcome email with a temporary password to log in.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        title="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter Email"
                    />

                    <Input
                        title="Phone Number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                    />
                </div>

                <Select
                    title="Property"
                    required
                    placeholder="Select property"
                    value={formData.property}
                    onChange={(val) => handleChange('property', val)}
                    options={PROPERTY_OPTIONS}
                />

                <Input
                    title="Unit"
                    type="text"
                    required
                    value={formData.unit}
                    onChange={(e) => handleChange('unit', e.target.value)}
                    placeholder="Enter Unit"
                />

                <Input
                    title="Lease Start Date"
                    type="date"
                    required
                    value={formData.leaseStartDate}
                    onChange={(e) => handleChange('leaseStartDate', e.target.value)}
                />

                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className="rounded-xl px-7 py-3 font-semibold text-sm"
                    >
                        Invite Tenant
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
