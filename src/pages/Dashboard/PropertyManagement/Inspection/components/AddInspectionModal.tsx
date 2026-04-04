
import React, { useState, useEffect, useCallback } from 'react';
import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import RadioGroup from '@components/forms/RadioGroup';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
// import { useGetManagedPropertiesQuery } from '@store/api/propertyMgt.api';

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

const dateOptions = [
    { label: 'Select Date', value: '' },
    { label: 'Tomorrow, Oct 16', value: '2025-10-16' },
    { label: 'Next Monday, Oct 20', value: '2025-10-20' },
];

const timeOptions = [
    { label: 'Select Time', value: '' },
    { label: '10:00 AM', value: '10:00' },
    { label: '02:00 PM', value: '14:00' },
    { label: '04:00 PM', value: '16:00' },
];

const AddInspectionModal: React.FC<AddInspectionModalProps> = ({ open, onClose }) => {
    const [type, setType] = useState<'Virtual' | 'Physical' | 'Hybrid'>('Virtual');
    const [propertyName, setPropertyName] = useState('');
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
            setPropertyName('');
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

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit Inspection:', { type, propertyName, unit, date, time, meetingLink });
        handleClose();
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

                    <Input
                        title="Property Name"
                        placeholder="Enter property name"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
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
                            <Select
                                title="Date"
                                placeholder="Select Date"
                                options={dateOptions}
                                value={date}
                                onChange={setDate}
                                    />
                        </div>
                        <div className="flex-1">
                            <Select
                                title="Time"
                                placeholder="Select Time"
                                options={timeOptions}
                                value={time}
                                onChange={setTime}
                                    />
                        </div>
                    </div>

                    {type !== 'Physical' && (
                        <Select
                            title="Meeting Link"
                            placeholder="Select Unit"
                            options={unitOptions} // Reusing unitOptions as placeholder structure similar to mockup image
                            value={meetingLink}
                            onChange={setMeetingLink}
                            />
                    )}

                    <button
                        type="submit"
                        className="w-28 py-3 rounded-md bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors mt-4"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddInspectionModal;
