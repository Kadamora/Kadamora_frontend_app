import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';
import type {
    SecuritySystem,
    SecuritySystemType,
    CameraResolution,
} from '../../../types/commercialFacilities';

interface AddSecuritySystemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSystem: (newSystem: SecuritySystem) => void;
}

export default function AddSecuritySystemModal({
    isOpen,
    onClose,
    onAddSystem,
}: AddSecuritySystemModalProps) {
    const [name, setName] = useState('');
    const [systemType, setSystemType] = useState<SecuritySystemType | ''>('');
    const [resolution, setResolution] = useState<CameraResolution | ''>('');
    const [property, setProperty] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const typeOptions = [
        { label: 'Multi-camera System', value: 'Multi-camera System' },
        { label: 'Access control camera', value: 'Access control camera' },
        { label: 'Multipoint system', value: 'Multipoint system' },
        { label: 'PTZ Dome Camera', value: 'PTZ Dome Camera' },
        { label: 'Thermal Sensor Camera', value: 'Thermal Sensor Camera' },
    ];

    const resolutionOptions = [
        { label: '4K Ultra HD', value: '4k' },
        { label: '1080p Full HD', value: '1080p' },
        { label: '750p HD', value: '750p' },
        { label: '720p HD', value: '720p' },
    ];

    const propertyOptions = [
        { label: 'Hilcrest', value: 'Hilcrest' },
        { label: 'Diamond', value: 'Diamond' },
        { label: 'Sunny Estate', value: 'Sunny Estate' },
        { label: 'Blesssed', value: 'Blesssed' },
        { label: 'Swift', value: 'Swift' },
        { label: 'Hilltop Diamond A', value: 'Hilltop Diamond A' },
        { label: 'CityVille Block K', value: 'CityVille Block K' },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            showWarningToast('Missing Field', 'Please enter a system name.');
            return;
        }
        if (!systemType) {
            showWarningToast('Missing Field', 'Please select a system type.');
            return;
        }
        if (!resolution) {
            showWarningToast('Missing Field', 'Please select a camera resolution.');
            return;
        }
        if (!property) {
            showWarningToast('Missing Field', 'Please select a property.');
            return;
        }
        if (!location.trim()) {
            showWarningToast('Missing Field', 'Please enter a camera location.');
            return;
        }

        setIsSubmitting(true);

        const newId = `CAM${String(Math.floor(100 + Math.random() * 900))}`;
        const newSystem: SecuritySystem = {
            id: newId,
            name: name.trim(),
            type: systemType as SecuritySystemType,
            property,
            location: location.trim(),
            resolution: resolution as CameraResolution,
            status: 'Online',
            imageUrl:
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
            captures: [
                {
                    id: `cap-${Date.now()}-1`,
                    fileName: '2025-10-05_08-00-00.mp4',
                    timestamp: 'Oct 05, 2025 08:00:00',
                    duration: '15:28',
                    size: '220 MB',
                },
                {
                    id: `cap-${Date.now()}-2`,
                    fileName: '2025-10-05_08-00-00.mp4',
                    timestamp: 'Oct 05, 2025 10:30:00',
                    duration: '12:10',
                    size: '180 MB',
                },
            ],
        };

        setTimeout(() => {
            onAddSystem(newSystem);
            showSuccessToast(
                'Security System Added',
                `${newSystem.name} (${newSystem.id}) has been registered.`
            );
            // Reset fields
            setName('');
            setSystemType('');
            setResolution('');
            setProperty('');
            setLocation('');
            setIsSubmitting(false);
            onClose();
        }, 300);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={<h3 className="text-xl font-bold text-[#002E62]">Add Security System</h3>}
            maxWidth="max-w-[540px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* System Name */}
                <Input
                    title="System Name"
                    placeholder="Enter system name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                {/* System Type & Resolution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                        title="System Type"
                        placeholder="Select system type"
                        options={typeOptions}
                        value={systemType}
                        onChange={(val) => setSystemType(val as SecuritySystemType)}
                        required
                    />

                    <Select
                        title="Resolution"
                        placeholder="Select camera resolution"
                        options={resolutionOptions}
                        value={resolution}
                        onChange={(val) => setResolution(val as CameraResolution)}
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

                {/* Location */}
                <Input
                    title="Location"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting ? 'Adding...' : 'Add System'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
