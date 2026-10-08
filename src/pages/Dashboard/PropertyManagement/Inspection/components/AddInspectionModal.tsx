
import React, { useState, useEffect, useCallback } from 'react';
import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import RadioGroup from '@components/forms/RadioGroup';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import { useCreateInspectionMutation, useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';

interface AddInspectionModalProps {
    open: boolean;
    onClose: () => void;
}

const inspectionTypeOptions = [
    { label: 'VIRTUAL', value: 'Virtual' },
    { label: 'PHYSICAL', value: 'Physical' },
    { label: 'HYBRID', value: 'Hybrid' },
];

const unitOptions = [
    { label: 'Unit A12', value: 'unit-a12' },
    { label: 'Unit B5', value: 'unit-b5' },
    { label: 'Unit C3', value: 'unit-c3' },
];



const AddInspectionModal: React.FC<AddInspectionModalProps> = ({ open, onClose }) => {
    const [propertyId, setPropertyId] = useState('');
    const [type, setType] = useState<'Virtual' | 'Physical' | 'Hybrid'>('Virtual');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [meetingLink, setMeetingLink] = useState('');

    // const { data: propertiesData } = useGetManagedPropertiesQuery();

    const handleClose = useCallback(() => {
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
            setType('Virtual');
            setPropertyId('');
            setUnit('');
            setDate('');
            setTime('');
            setMeetingLink('');
        }, 300);
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handler);
        };
    }, [open, handleClose]);

    const [createInspection, { isLoading }] = useCreateInspectionMutation();
        const { data: propertiesData } = useGetManagedPropertiesQuery(undefined, { skip: !open });
const propertiesOptions = propertiesData?.data?.map((p: any) => ({
        label: p.name,
        value: p.id
    })) || [];

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createInspection({
                propertyId: propertyId || 'dummy-property-id', // Now uses the real selected propertyId
                unitName: unit || 'default-unit',
                type: type as any,
                scheduledDate: date,
                scheduledTime: time,
                hostingLink: meetingLink
            }).unwrap();
            handleClose();
        } catch (err) {
            console.error('Failed to create inspection', err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[22px] font-semibold text-[#001731]">Add Inspection</h2>
                    <CloseButton onClick={handleClose} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <p className="mb-1 text-[#002E62] font-semibold text-[15px]">Inspection Type</p>
                        <RadioGroup
                            name="type"
                            value={type}
                            onChange={(val) => setType(val as any)}
                            options={inspectionTypeOptions}
                            className="flex gap-x-6"
                        />
                    </div>

                    <Select
                                            title="Property"
                                            name="propertyId"
                                            placeholder="Select property"
                                            options={propertiesOptions}
                                            value={propertyId}
                                            onChange={setPropertyId}
                                            required
                                        />

                    <Select
                        title="Unit"
                        placeholder="Select Unit"
                        options={unitOptions}
                        value={unit}
                        onChange={setUnit}
                    />

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                title="Date"
                                name="date"
                                placeholder="Select Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <Input
                                title="Time"
                                name="time"
                                placeholder="Select Time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {type !== 'Physical' && (
                        <Input
                            title="Meeting Link"
                            name="meetingLink"
                            placeholder="Enter meeting link"
                            type="text"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            required
                        />
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-28 py-3 rounded-md bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors mt-4 disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddInspectionModal;
