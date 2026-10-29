import React, { useState } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import Input from '../Forms/Input';
import Select from '../Forms/Select';
import Textarea from '../Forms/Textarea';
import type { CreateGroupFormData } from './types';

export interface CreateGroupDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveGroup: (data: CreateGroupFormData) => void;
}

export default function CreateGroupDrawer({
    isOpen,
    onClose,
    onSaveGroup,
}: CreateGroupDrawerProps) {
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [members, setMembers] = useState<string[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);

    if (!isOpen) return null;

    const userTypeOptions = [
        { label: 'Tenants', value: 'Tenants' },
        { label: 'Vendors', value: 'Vendors' },
        { label: 'All Users', value: 'All' },
        { label: 'Association Members', value: 'Association Members' },
    ];

    const memberOptions = [
        { label: 'Ayomide Bamidele', value: 'Ayomide Bamidele' },
        { label: 'Felix Ayobami', value: 'Felix Ayobami' },
        { label: 'Sophia Reynolds', value: 'Sophia Reynolds' },
        { label: 'Liam Carter', value: 'Liam Carter' },
        { label: 'Emma Thompson', value: 'Emma Thompson' },
        { label: 'James Anderson', value: 'James Anderson' },
    ];

    const handleAddMember = (val: string) => {
        setSelectedUser(val);
        if (val && !members.includes(val)) {
            setMembers((prev) => [...prev, val]);
        }
    };

    const handleRemoveMember = (m: string) => {
        setMembers((prev) => prev.filter((item) => item !== m));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSaveGroup({
            name,
            userType: userType || 'Tenants',
            description,
            members,
        });

        // Reset
        setName('');
        setUserType('');
        setDescription('');
        setMembers([]);
        setFileName(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
                    <h3 className="text-lg font-bold text-[#002E62]">Create Group</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        title="Close"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1">
                    {/* Group Name */}
                    <Input
                        title="Group Name"
                        placeholder="Enter group name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    {/* User Type */}
                    <Select
                        title="User Type"
                        placeholder="Select user type"
                        options={userTypeOptions}
                        value={userType}
                        onChange={(val) => setUserType(val)}
                        required
                    />

                    {/* Description */}
                    <Textarea
                        title="Description"
                        placeholder="Description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* Group Profile Upload */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-[#0F172A]">
                            Group profile
                        </label>
                        <label className="border-2 border-dashed border-[#BFDBFE] hover:border-[#002E62] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAFC] transition-colors group">
                            <FiUploadCloud className="h-7 w-7 text-[#002E62] group-hover:scale-105 transition-transform mb-2" />
                            <span className="text-xs text-[#64748B] font-medium">
                                {fileName || 'Drag and drop or select file to upload'}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        setFileName(e.target.files[0].name);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    {/* Add Users */}
                    <div className="space-y-2">
                        <Select
                            title="Add Users"
                            placeholder="Select group members"
                            options={memberOptions}
                            value={selectedUser}
                            onChange={handleAddMember}
                        />

                        {members.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {members.map((m) => (
                                    <span
                                        key={m}
                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EBF3FF] text-[#002E62]"
                                    >
                                        <span>{m}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMember(m)}
                                            className="hover:text-red-600 transition-colors"
                                        >
                                            <FiX className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-7 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                            Save Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
