import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import Input from '@shared/components/Forms/Input';
import { useChangePasswordMutation } from '@shared/api/agentSettings.api';
import { useAppDispatch } from '@store/hooks';
import { logout } from '@store/auth/auth.slice';
import { showSuccessToast, showErrorToast } from '@shared/components/Toast/Toast';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [recentPassword, setRecentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const [showRecent, setShowRecent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    if (!isOpen) return null;

    const handleClose = () => {
        setRecentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!recentPassword || !newPassword || !confirmPassword) {
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
            const response = await changePassword({ oldPassword: recentPassword, newPassword }).unwrap();
            if (response.success) {
                sessionStorage.setItem('authSuccessMessage', 'Password changed. Please log in again.');
                showSuccessToast('Password Changed', 'Password changed. Please log in again.');
                dispatch(logout());
                handleClose();
                navigate('/hospitality-tours/auth/login', {
                    replace: true,
                    state: { message: 'Password changed. Please log in again.' },
                });
            }
        } catch (err: any) {
            const msg = err?.data?.message || 'Failed to update password. Please try again.';
            setError(msg);
            showErrorToast('Change Password Failed', msg);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] p-6 sm:p-8 space-y-6 animate-scale-in relative">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
                    title="Close"
                >
                    <FiX className="h-4 w-4" />
                </button>

                {/* Modal Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">Change Password</h3>

                {error ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                    >
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Recent Password */}
                    <div className="relative">
                        <Input
                            title="Recent Password"
                            type={showRecent ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={recentPassword}
                            onChange={(e) => setRecentPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowRecent(!showRecent)}
                            className="absolute right-3.5 top-[38px] text-slate-500 hover:text-[#002E62] transition-colors"
                        >
                            {showRecent ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
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
                            className="absolute right-3.5 top-[38px] text-slate-500 hover:text-[#002E62] transition-colors"
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
                            className="absolute right-3.5 top-[38px] text-slate-500 hover:text-[#002E62] transition-colors"
                        >
                            {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            {isLoading ? 'Saving...' : 'Save Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
