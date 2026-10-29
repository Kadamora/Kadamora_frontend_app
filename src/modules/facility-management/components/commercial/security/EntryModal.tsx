import { useState, useEffect, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Textarea from '@shared/components/Forms/Textarea';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';
import type { AccessControlEntry } from '../../../types/commercialFacilities';

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: AccessControlEntry | null;
    onSubmit: (entry: AccessControlEntry) => void;
}

export default function EntryModal({
    isOpen,
    onClose,
    mode,
    initialData,
    onSubmit,
}: EntryModalProps) {
    const [visitorName, setVisitorName] = useState('');
    const [entryTime, setEntryTime] = useState('');
    const [exitTime, setExitTime] = useState('');
    const [unit, setUnit] = useState('');
    const [purpose, setPurpose] = useState('');
    const [securityNote, setSecurityNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setVisitorName(initialData.visitorName);
            setEntryTime(initialData.entryTime);
            setExitTime(initialData.exitTime);
            setUnit(initialData.unit);
            setPurpose(initialData.purpose);
            setSecurityNote(initialData.securityNote || '');
        } else {
            setVisitorName('');
            setEntryTime('');
            setExitTime('');
            setUnit('');
            setPurpose('');
            setSecurityNote('');
        }
    }, [mode, initialData, isOpen]);

    const timeOptions = [
        { label: '04:15 AM', value: '04:15 AM' },
        { label: '05:30 AM', value: '05:30 AM' },
        { label: '06:45 AM', value: '06:45 AM' },
        { label: '07:00 AM', value: '07:00 AM' },
        { label: '08:20 AM', value: '08:20 AM' },
        { label: '09:00 AM', value: '09:00 AM' },
        { label: '09:35 AM', value: '09:35 AM' },
        { label: '10:50 AM', value: '10:50 AM' },
        { label: '12:00 PM', value: '12:00 PM' },
        { label: '01:30 PM', value: '01:30 PM' },
        { label: '03:00 PM', value: '03:00 PM' },
        { label: '04:15 PM', value: '04:15 PM' },
        { label: '05:30 PM', value: '05:30 PM' },
        { label: '06:45 PM', value: '06:45 PM' },
        { label: '07:00 PM', value: '07:00 PM' },
        { label: '07:45 PM', value: '07:45 PM' },
        { label: '08:20 PM', value: '08:20 PM' },
        { label: '09:35 PM', value: '09:35 PM' },
        { label: '10:50 PM', value: '10:50 PM' },
    ];

    const unitOptions = [
        { label: 'Hilcreast - Unit002', value: 'Hilcreast - Unit002' },
        { label: 'Diamond - Unit004', value: 'Diamond - Unit004' },
        { label: 'Sunny Estate - Unit005', value: 'Sunny Estate - Unit005' },
        { label: 'Blesssed - Unit009', value: 'Blesssed - Unit009' },
        { label: 'Swift - Unit003', value: 'Swift - Unit003' },
        { label: 'Hilcreast - Unit004', value: 'Hilcreast - Unit004' },
        { label: 'Hilcrest - Unit001', value: 'Hilcrest - Unit001' },
    ];

    const purposeOptions = [
        { label: 'Visiting', value: 'Visiting' },
        { label: 'Client Meeting', value: 'Client Meeting' },
        { label: 'Delivery / Courier', value: 'Delivery' },
        { label: 'Contractor Work', value: 'Contractor' },
        { label: 'Maintenance Service', value: 'Maintenance' },
        { label: 'Facility Inspection', value: 'Inspection' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!visitorName.trim()) {
            showWarningToast('Missing Field', 'Please enter visitor name.');
            return;
        }
        if (!entryTime) {
            showWarningToast('Missing Field', 'Please select entry time.');
            return;
        }
        if (!exitTime) {
            showWarningToast('Missing Field', 'Please select exit time.');
            return;
        }
        if (!unit) {
            showWarningToast('Missing Field', 'Please select a unit.');
            return;
        }
        if (!purpose) {
            showWarningToast('Missing Field', 'Please select purpose of visit.');
            return;
        }

        setIsSubmitting(true);

        const propertyName = unit.split(' - ')[0] || 'Commercial Facility';
        const entryId =
            mode === 'edit' && initialData
                ? initialData.id
                : `ENT${String(Math.floor(100 + Math.random() * 900))}`;

        const entry: AccessControlEntry = {
            id: entryId,
            visitorName: visitorName.trim(),
            entryTime,
            exitTime,
            unit,
            purpose,
            property: propertyName,
            date: 'Today',
            securityNote:
                securityNote.trim() ||
                'Routine visitor entry log recorded at facility reception.',
        };

        setTimeout(() => {
            onSubmit(entry);
            showSuccessToast(
                mode === 'edit' ? 'Entry Updated' : 'Entry Logged',
                mode === 'edit'
                    ? `Log ${entry.id} for ${entry.visitorName} has been updated.`
                    : `New entry log ${entry.id} recorded successfully.`
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
                    {mode === 'edit' ? 'Edit Entry' : 'Create New Entry'}
                </h3>
            }
            maxWidth="max-w-[540px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Visitor Name */}
                <Input
                    title="Visitor Name"
                    placeholder="Enter Visitor Name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    required
                />

                {/* Entry Time & Exit Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        title="Entry Time"
                        placeholder="Select Time"
                        options={timeOptions}
                        value={entryTime}
                        onChange={(val) => setEntryTime(val)}
                        required
                    />

                    <Select
                        title="Exit Time"
                        placeholder="Select Time"
                        options={timeOptions}
                        value={exitTime}
                        onChange={(val) => setExitTime(val)}
                        required
                    />
                </div>

                {/* Unit */}
                <Select
                    title="Unit"
                    placeholder="Select Unit"
                    options={unitOptions}
                    value={unit}
                    onChange={(val) => setUnit(val)}
                    required
                />

                {/* Purpose of Visit */}
                <Select
                    title="Purpose of Visit"
                    placeholder="Select Purpose"
                    options={purposeOptions}
                    value={purpose}
                    onChange={(val) => setPurpose(val)}
                    required
                />

                {/* Security Note */}
                <Textarea
                    title="Security Note"
                    placeholder="Enter Security Note"
                    rows={4}
                    value={securityNote}
                    onChange={(e) => setSecurityNote(e.target.value)}
                />

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
                            : 'Add Entry Log'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
