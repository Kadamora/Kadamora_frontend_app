import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Select from '../Forms/Select';

export interface FilterLogsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilter?: (filters: {
        service: string;
        unit: string;
        user: string;
        date: string;
    }) => void;
}

export default function FilterLogsModal({
    isOpen,
    onClose,
    onApplyFilter,
}: FilterLogsModalProps) {
    const [service, setService] = useState('');
    const [unit, setUnit] = useState('');
    const [user, setUser] = useState('');
    const [date, setDate] = useState('');

    const serviceOptions = [
        { label: 'Timeline', value: 'Timeline' },
        { label: 'Facilities', value: 'Facilities' },
        { label: 'Tenants', value: 'Tenants' },
        { label: 'Payments', value: 'Payments' },
    ];

    const unitOptions = [
        { label: 'Unit 1', value: 'Unit 1' },
        { label: 'Unit 2', value: 'Unit 2' },
        { label: 'Block A - 3B', value: 'Block A - 3B' },
        { label: 'Commercial Wing', value: 'Commercial Wing' },
    ];

    const userOptions = [
        { label: 'Jackson Hall', value: 'Jackson Hall' },
        { label: 'Noah Hill', value: 'Noah Hill' },
        { label: 'Liam King', value: 'Liam King' },
        { label: 'Shawn White', value: 'Shawn White' },
    ];

    const dateOptions = [
        { label: 'Today', value: 'Today' },
        { label: 'This Week', value: 'This Week' },
        { label: 'This Month', value: 'This Month' },
        { label: 'Past 90 Days', value: 'Past 90 Days' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyFilter?.({ service, unit, user, date });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Filter Logs"
            maxWidth="max-w-[480px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Service and Unit row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        title="Service"
                        placeholder="Select service type"
                        options={serviceOptions}
                        value={service}
                        onChange={(val) => setService(val)}
                    />
                    <Select
                        title="Unit"
                        placeholder="Select Unit"
                        options={unitOptions}
                        value={unit}
                        onChange={(val) => setUnit(val)}
                    />
                </div>

                {/* User */}
                <Select
                    title="User"
                    placeholder="Select user"
                    options={userOptions}
                    value={user}
                    onChange={(val) => setUser(val)}
                />

                {/* Date */}
                <Select
                    title="Date"
                    placeholder="Select Date"
                    options={dateOptions}
                    value={date}
                    onChange={(val) => setDate(val)}
                />

                {/* Filter Log Button */}
                <div className="pt-3">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        Filter Log
                    </button>
                </div>
            </form>
        </Modal>
    );
}
