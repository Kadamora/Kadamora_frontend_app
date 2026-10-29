import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import Input from '../Forms/Input';
import { showSuccessToast, showErrorToast } from '../Toast/Toast';

export interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: { currentPassword: string; newPassword: string }) => Promise<void> | void;
    isLoading?: boolean;
}

export default function ChangePasswordModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
}: ChangePasswordModalProps) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [internalLoading, setInternalLoading] = useState(false);

    const handleClose = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setError('New password must be at least 8 characters long.');
            return;
        }

        try {
            setInternalLoading(true);
            if (onSubmit) {
                await onSubmit({ currentPassword, newPassword });
            } else {
                // Simulated success
                await new Promise((r) => setTimeout(r, 600));
                showSuccessToast('Password Updated', 'Your password has been changed successfully.');
            }
            handleClose();
        } catch (err: any) {
            const msg = err?.data?.message || err?.message || 'Failed to update password. Please try again.';
            setError(msg);
            showErrorToast('Change Password Failed', msg);
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Change Password"
            maxWidth="max-w-[480px]"
        >
            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs sm:text-sm text-red-600 font-medium"
                >
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Current Password */}
                <div className="relative">
                    <Input
                        title="Recent Password"
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3.5 top-[38px] text-slate-400 hover:text-[#002E62] transition-colors cursor-pointer"
                        tabIndex={-1}
                    >
                        {showCurrent ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                    </button>
                </div>

                {/* New Password */}
                <div className="relative">
                    <Input
                        title="New Password"
                        type={showNew ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3.5 top-[38px] text-slate-400 hover:text-[#002E62] transition-colors cursor-pointer"
                        tabIndex={-1}
                    >
                        {showNew ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <Input
                        title="Confirm Password"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-[38px] text-slate-400 hover:text-[#002E62] transition-colors cursor-pointer"
                        tabIndex={-1}
                    >
                        {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                    </button>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={isLoading || internalLoading}
                        className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        {isLoading || internalLoading ? 'Saving...' : 'Save Password'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
