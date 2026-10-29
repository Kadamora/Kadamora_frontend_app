import { useState, useEffect, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';
import type {
    SecuritySystem,
    SecuritySystemType,
    CameraResolution,
    SecuritySystemStatus,
} from '../../../types/commercialFacilities';

interface EditSecuritySystemModalProps {
    isOpen: boolean;
    onClose: () => void;
    system: SecuritySystem | null;
    onSave: (updated: SecuritySystem) => void;
}

export default function EditSecuritySystemModal({
    isOpen,
    onClose,
    system,
    onSave,
}: EditSecuritySystemModalProps) {
    const [name, setName] = useState('');
    const [systemType, setSystemType] = useState<SecuritySystemType | ''>('');
    const [resolution, setResolution] = useState<CameraResolution | ''>('');
    const [status, setStatus] = useState<SecuritySystemStatus>('Online');
    const [property, setProperty] = useState('');
    const [location, setLocation] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (system) {
            setName(system.name);
            setSystemType(system.type);
            setResolution(system.resolution);
            setStatus(system.status);
            setProperty(system.property);
            setLocation(system.location);
        }
    }, [system]);

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

    const statusOptions = [
        { label: 'Online', value: 'Online' },
        { label: 'Maintenance', value: 'Maintenance' },
        { label: 'Offline', value: 'Offline' },
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

        if (!system) return;

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

        setIsSaving(true);

        const updated: SecuritySystem = {
            ...system,
            name: name.trim(),
            type: systemType as SecuritySystemType,
            resolution: resolution as CameraResolution,
            status,
            property,
            location: location.trim(),
        };

        setTimeout(() => {
            onSave(updated);
            showSuccessToast(
                'Changes Saved',
                `${updated.name} (${updated.id}) has been updated.`
            );
            setIsSaving(false);
            onClose();
        }, 300);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={<h3 className="text-xl font-bold text-[#002E62]">Edit Security System</h3>}
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

                {/* Camera Status */}
                <Select
                    title="Camera Status"
                    placeholder="Select status"
                    options={statusOptions}
                    value={status}
                    onChange={(val) => setStatus(val as SecuritySystemStatus)}
                    required
                />

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
                        disabled={isSaving}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
