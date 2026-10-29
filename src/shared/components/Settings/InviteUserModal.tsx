import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Forms/Input';
import Select from '../Forms/Select';

export interface InviteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite?: (data: { name: string; email: string; role: string }) => void;
    roleOptions?: string[];
}

export default function InviteUserModal({
    isOpen,
    onClose,
    onInvite,
    roleOptions = ['Owner', 'Estate Manager', 'Admin'],
}: InviteUserModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const selectOptions = roleOptions.map((r) => ({ label: r, value: r }));

    const handleClose = () => {
        setName('');
        setEmail('');
        setRole('');
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !role) return;

        onInvite?.({ name, email, role });
        handleClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Invite User"
            maxWidth="max-w-[480px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
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

                {/* Role */}
                <Select
                    title="Role"
                    placeholder="Select role"
                    options={selectOptions}
                    value={role}
                    onChange={(val) => setRole(val)}
                    required
                />

                {/* Submit Button */}
                <div className="pt-3">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        Invite User
                    </button>
                </div>
            </form>
        </Modal>
    );
}
