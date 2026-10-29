import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Forms/Input';
import Select from '../Forms/Select';
import Textarea from '../Forms/Textarea';

export interface ScheduleMeetingFormData {
    title: string;
    description: string;
    date: string;
    time: string;
    type?: 'Public' | 'Private';
}

export interface ScheduleMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSchedule: (data: ScheduleMeetingFormData) => void;
    onStartInstantMeeting?: (data: { title: string; description: string }) => void;
    initialTab?: 'schedule' | 'instant';
}

export default function ScheduleMeetingModal({
    isOpen,
    onClose,
    onSchedule,
    onStartInstantMeeting,
    initialTab = 'schedule',
}: ScheduleMeetingModalProps) {
    const [activeTab, setActiveTab] = useState<'schedule' | 'instant'>(initialTab);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    const dateOptions = [
        { label: 'Today - June 20, 2025', value: '2025-06-20' },
        { label: 'Tomorrow - June 21, 2025', value: '2025-06-21' },
        { label: 'Monday - June 23, 2025', value: '2025-06-23' },
        { label: 'Wednesday - June 25, 2025', value: '2025-06-25' },
    ];

    const timeOptions = [
        { label: '09:00 AM', value: '09:00 AM' },
        { label: '11:00 AM', value: '11:00 AM' },
        { label: '01:00 PM', value: '01:00 PM' },
        { label: '03:00 PM', value: '03:00 PM' },
        { label: '05:00 PM', value: '05:00 PM' },
    ];

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');
        setActiveTab('schedule');
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const meetingTitle = title.trim() || (activeTab === 'schedule' ? 'Scheduled Facility Meeting' : 'Instant Meeting');

        if (activeTab === 'instant') {
            onStartInstantMeeting?.({
                title: meetingTitle,
                description: description.trim(),
            });
        } else {
            onSchedule({
                title: meetingTitle,
                description: description.trim(),
                date: date || '2025-06-20',
                time: time || '10:00 AM',
            });
        }

        handleClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Schedule Meeting"
            maxWidth="max-w-[500px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Segmented Control / Tabs (Images 1 & 2) */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveTab('schedule')}
                        className={`px-4 py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer ${
                            activeTab === 'schedule'
                                ? 'bg-[#F0F7FF] text-[#002E62] border border-[#BFDBFE] font-bold shadow-2xs'
                                : 'bg-white text-[#64748B] border border-[#E2E8F0] font-medium hover:text-[#002E62]'
                        }`}
                    >
                        Schedule Meeting
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('instant')}
                        className={`px-4 py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer ${
                            activeTab === 'instant'
                                ? 'bg-[#F0F7FF] text-[#002E62] border border-[#BFDBFE] font-bold shadow-2xs'
                                : 'bg-white text-[#64748B] border border-[#E2E8F0] font-medium hover:text-[#002E62]'
                        }`}
                    >
                        Instant Meeting
                    </button>
                </div>

                {/* Title Input */}
                <Input
                    title="Title"
                    placeholder="Enter meeting  title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* Description Textarea */}
                <Textarea
                    title="Description"
                    placeholder="Description of request"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Date & Time Row - Only displayed in Schedule Meeting tab (Image 1) */}
                {activeTab === 'schedule' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                        <Select
                            title="Date"
                            placeholder="Select Date"
                            options={dateOptions}
                            value={date}
                            onChange={(val) => setDate(val)}
                            required={activeTab === 'schedule'}
                        />

                        <Select
                            title="Time"
                            placeholder="Select Time"
                            options={timeOptions}
                            value={time}
                            onChange={(val) => setTime(val)}
                            required={activeTab === 'schedule'}
                        />
                    </div>
                )}

                {/* Action button */}
                <div className="pt-3">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        Schedule Meeting
                    </button>
                </div>
            </form>
        </Modal>
    );
}
