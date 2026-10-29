import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Input from '@shared/components/Forms/Input';
import Select from '@shared/components/Forms/Select';

interface InviteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite?: (data: { name: string; email: string; role: string }) => void;
}

const ROLE_OPTIONS = [
    { label: 'Event Manager', value: 'Event Manager' },
    { label: 'Tour Guide', value: 'Tour Guide' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Owner', value: 'Owner' },
];

export default function InviteUserModal({ isOpen, onClose, onInvite }: InviteUserModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onInvite) {
            onInvite({ name, email, role });
        } else {
            alert(`Invitation sent to ${email}`);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-[480px] p-6 sm:p-8 space-y-6 animate-scale-in relative">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
                    title="Close"
                >
                    <FiX className="h-4 w-4" />
                </button>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">Invite User</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <Input
                        title="Name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <Input
                        title="Email"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Role Select */}
                    <Select
                        title="Role"
                        placeholder="Select role"
                        options={ROLE_OPTIONS}
                        value={role}
                        onChange={(val) => setRole(val)}
                        required
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                        >
                            Invite User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
