import { useState, type FormEvent } from 'react';
import Modal from '@shared/components/Modal/Modal';
import Input from '@shared/components/Forms/Input';
import { FiInfo } from 'react-icons/fi';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';

interface InviteArtisanServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryTitle: string; // e.g. "Plumbers", "Electricians"
    onInvite: (email: string) => void;
}

export default function InviteArtisanServiceModal({
    isOpen,
    onClose,
    categoryTitle,
    onInvite,
}: InviteArtisanServiceModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const singular =
        categoryTitle === 'Plumbers'
            ? 'Plumber'
            : categoryTitle === 'Electricians'
            ? 'Electrician'
            : categoryTitle === 'Mechanics'
            ? 'Mechanic'
            : 'Artisan';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            showWarningToast('Missing Field', 'Please enter an email address.');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            onInvite(email.trim());
            showSuccessToast(
                'Invite Sent',
                `An invitation has been sent to ${email.trim()}.`
            );
            setEmail('');
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
                    Invite New {singular}
                </h3>
            }
            maxWidth="max-w-[480px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Email Address */}
                <Input
                    title="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Info Note Banner (Image 4 Right) */}
                <div className="bg-[#EFF8FF] border border-[#B2DDFF] rounded-xl p-4 space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#002E62]">
                        <FiInfo className="w-4 h-4 text-[#002E62]" />
                        <span>Note:</span>
                    </div>
                    <p className="text-xs text-[#52525B] leading-relaxed">
                        The artisan you added will receive a welcome email with a temporary password to log in.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#002E62] hover:bg-[#002047] disabled:opacity-50 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Invite'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
