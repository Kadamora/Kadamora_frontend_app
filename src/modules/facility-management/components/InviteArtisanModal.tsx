import { useState, type FormEvent, useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';
import Select from '@shared/components/Forms/Select';
import Input from '@shared/components/Forms/Input';
import Button from '@shared/components/Button/Button';

export interface InviteArtisanModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultServiceType?: string;
    onInvite: (data: { serviceType: string; email: string }) => void;
}

const SERVICE_TYPE_OPTIONS = [
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Plumbing', value: 'Plumbing' },
    { label: 'HVAC Technician', value: 'HVAC' },
    { label: 'General Maintenance', value: 'General Maintenance' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'Painter', value: 'Painter' },
];

export default function InviteArtisanModal({
    isOpen,
    onClose,
    defaultServiceType = 'Electrician',
    onInvite,
}: InviteArtisanModalProps) {
    const [serviceType, setServiceType] = useState(defaultServiceType);
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (defaultServiceType) {
            setServiceType(defaultServiceType);
        }
    }, [defaultServiceType]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        onInvite({
            serviceType: serviceType || 'Electrician',
            email: email.trim(),
        });

        setEmail('');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Invite New Artisan"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-[fadeIn_.2s_ease-out]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-[480px] bg-white rounded-2xl p-6 sm:p-7 z-10 text-left shadow-2xl space-y-5 border border-slate-100 animate-[fadeScale_.2s_ease-out]">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5]">
                    <h3 className="text-base sm:text-lg font-bold text-[#091E42]">
                        Invite New Artisan
                    </h3>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close invite dialog"
                        className="h-7 w-7 rounded-full bg-[#E0F2FE] text-[#0284C7] hover:bg-[#BAE6FD] flex items-center justify-center transition-colors cursor-pointer"
                    >
                        <FiX className="h-3.5 w-3.5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Service Type */}
                    <div>
                        <Select
                            title="Service Type"
                            options={SERVICE_TYPE_OPTIONS}
                            value={serviceType}
                            onChange={setServiceType}
                            placeholder="Select service type"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <Input
                            title="Email Address"
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Notice Box */}
                    <div className="rounded-xl border border-[#D0E2FF] bg-[#F0F7FF] p-3.5 sm:p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#002E62]">
                            <FiInfo className="h-3.5 w-3.5 text-[#0284C7] shrink-0" />
                            <span>Note:</span>
                        </div>
                        <p className="text-xs text-[#52525B] leading-relaxed pl-5">
                            The artisan you added will receive a welcome email with a temporary password to log in.
                        </p>
                    </div>

                    {/* Action */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            className="rounded-lg px-6 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
                        >
                            Send Invite
                        </Button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes fadeScale {
                    0% { opacity: 0; transform: scale(0.96); }
                    100% { opacity: 1; transform: scale(1); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
