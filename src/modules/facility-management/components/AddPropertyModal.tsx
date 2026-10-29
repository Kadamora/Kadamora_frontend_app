import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';
import Button from '@shared/components/Button/Button';

export interface PropertyFormData {
    id?: string | number;
    name: string;
    category: string;
    address: string;
}

export interface AddPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PropertyFormData) => void;
    initialData?: PropertyFormData | null;
}

const CATEGORY_OPTIONS = [
    { label: 'Residential', value: 'Residential' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Mixed-Use', value: 'Mixed-Use' },
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Hospitality', value: 'Hospitality' },
];

interface PropertyFormProps {
    initialData?: PropertyFormData | null;
    onSubmit: (data: PropertyFormData) => void;
    onClose: () => void;
}

function PropertyForm({ initialData, onSubmit, onClose }: PropertyFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [address, setAddress] = useState(initialData?.address || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({
            id: initialData?.id,
            name: name.trim(),
            category: category || 'Residential',
            address: address.trim(),
        });
        onClose();
    };

    const isEdit = Boolean(initialData?.id);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                title="Property Name"
                required
                placeholder="Hilltop Estate"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Select
                title="Category Name"
                placeholder="Select a category name"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={setCategory}
            />

            <Input
                title="Address"
                required
                placeholder="12, Amino Kano Crescent, Wuse 2, Abuja"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <div className="pt-2">
                <Button
                    type="submit"
                    variant="primary"
                    className="rounded-xl px-7 py-3 font-semibold text-sm"
                >
                    {isEdit ? 'Save Changes' : 'Add Property'}
                </Button>
            </div>
        </form>
    );
}

export default function AddPropertyModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: AddPropertyModalProps) {
    const isEdit = Boolean(initialData?.id);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? 'Edit Property' : 'Add New Property'}
            maxWidth="max-w-[480px]"
        >
            {isOpen && (
                <PropertyForm
                    key={initialData?.id ?? 'create'}
                    initialData={initialData}
                    onSubmit={onSubmit}
                    onClose={onClose}
                />
            )}
        </Modal>
    );
}
