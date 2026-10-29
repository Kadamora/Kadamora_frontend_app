import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import RichTextEditor from '@shared/components/Forms/RichTextEditor';
import FileDropzone from '@shared/components/Forms/FileDropzone';
import Button from '@shared/components/Button/Button';
import type { NewRequestFormData } from '../types/propertyManagement';

export interface LogNewRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: NewRequestFormData) => void;
}

const SERVICE_OPTIONS = [
    { label: 'Plumbing', value: 'Plumbing' },
    { label: 'Electrical', value: 'Electrical' },
    { label: 'HVAC', value: 'HVAC' },
    { label: 'General Maintenance', value: 'General Maintenance' },
];

const UNIT_OPTIONS = [
    { label: 'Sunset GroveA', value: 'Sunset GroveA' },
    { label: 'Meadow viewB', value: 'Meadow viewB' },
    { label: 'Riverbend 10', value: 'Riverbend 10' },
    { label: 'Cedarwood 3A', value: 'Cedarwood 3A' },
    { label: 'Cedarwood 3B', value: 'Cedarwood 3B' },
    { label: 'Lakeside F', value: 'Lakeside F' },
    { label: 'Brookstone A', value: 'Brookstone A' },
    { label: 'Brookstone G', value: 'Brookstone G' },
    { label: 'Rosewood J', value: 'Rosewood J' },
];

const PRIORITY_OPTIONS = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
];

const TIME_RANGE_OPTIONS = [
    { label: '09:00 AM - 12:00 PM', value: '09:00 AM - 12:00 PM' },
    { label: '12:00 PM - 04:00 PM', value: '12:00 PM - 04:00 PM' },
    { label: '04:00 PM - 08:30 PM', value: '04:00 PM - 08:30 PM' },
    { label: 'Full Day (09:00 AM - 08:30 PM)', value: '09:00 AM - 08:30 PM' },
];

export default function LogNewRequestModal({
    isOpen,
    onClose,
    onSubmit,
}: LogNewRequestModalProps) {
    const [service, setService] = useState('');
    const [unit, setUnit] = useState('');
    const [priority, setPriority] = useState('');
    const [timeRange, setTimeRange] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            service,
            unit,
            priority,
            timeRange,
            title,
            description,
            files,
        });
        // Reset form
        setService('');
        setUnit('');
        setPriority('');
        setTimeRange('');
        setTitle('');
        setDescription('');
        setFiles([]);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New Request"
            maxWidth="max-w-[560px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1 max-h-[75vh] overflow-y-auto px-1 hide-scrollbar">
                {/* Service & Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        title="Service"
                        placeholder="Select service type"
                        options={SERVICE_OPTIONS}
                        value={service}
                        onChange={setService}
                        required
                    />

                    <Select
                        title="Unit"
                        placeholder="Select Unit"
                        options={UNIT_OPTIONS}
                        value={unit}
                        onChange={setUnit}
                        required
                    />
                </div>

                {/* Priority & Available Time Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        title="Priority"
                        placeholder="Select priority"
                        options={PRIORITY_OPTIONS}
                        value={priority}
                        onChange={setPriority}
                        required
                    />

                    <Select
                        title="Available Time Range"
                        placeholder="Select Time"
                        options={TIME_RANGE_OPTIONS}
                        value={timeRange}
                        onChange={setTimeRange}
                        required
                    />
                </div>

                {/* Title */}
                <Input
                    title="Title"
                    placeholder="Enter ticket title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* Description */}
                <div>
                    <RichTextEditor
                        label="Description"
                        placeholder="Enter Message Here"
                        value={description}
                        onChange={setDescription}
                        rows={3}
                    />
                </div>

                {/* Upload File */}
                <div>
                    <FileDropzone
                        label="Upload File"
                        onFiles={(uploaded) => setFiles((prev) => [...prev, ...uploaded])}
                    />
                    {files.length > 0 && (
                        <div className="mt-2 text-xs text-slate-500">
                            {files.length} file(s) selected: {files.map((f) => f.name).join(', ')}
                        </div>
                    )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        className="rounded-xl px-7 py-3 font-semibold text-sm"
                    >
                        Send Request
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
