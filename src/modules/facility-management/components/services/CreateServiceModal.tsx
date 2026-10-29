import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import Textarea from '@shared/components/Forms/Textarea';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateService: (service: { name: string; description: string }) => void;
}

export default function CreateServiceModal({
    isOpen,
    onClose,
    onCreateService,
}: CreateServiceModalProps) {
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!serviceName.trim()) {
            showWarningToast('Missing Field', 'Please enter a service name.');
            return;
        }
        if (!description.trim()) {
            showWarningToast('Missing Field', 'Please enter a description for this service.');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            onCreateService({
                name: serviceName.trim(),
                description: description.trim(),
            });
            showSuccessToast(
                'Service Created',
                `Service "${serviceName.trim()}" has been successfully added.`
            );
            setServiceName('');
            setDescription('');
            setIsSubmitting(false);
            onClose();
        }, 300);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={<h3 className="text-xl font-bold text-[#002E62]">Create Service</h3>}
            maxWidth="max-w-[500px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Service Name */}
                <Input
                    title="Service Name"
                    placeholder="Enter service type"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                />

                {/* Description */}
                <Textarea
                    title="Description"
                    placeholder="Description of request"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Service'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
