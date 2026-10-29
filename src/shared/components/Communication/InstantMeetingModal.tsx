import React, { useState, useMemo, useRef, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Forms/Input';
import Textarea from '../Forms/Textarea';
import { FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';

export interface InstantMeetingMember {
    id: string;
    name: string;
    roleOrUnit: string;
    category: 'Vendors' | 'Tenants';
    avatar: string;
}

export const defaultMeetingMembers: InstantMeetingMember[] = [
    {
        id: 'v-1',
        name: 'Felix Jones',
        roleOrUnit: 'Plumber',
        category: 'Vendors',
        avatar: '/assets/images/avatar_felix_jones.jpg',
    },
    {
        id: 'v-2',
        name: 'Serah Ibrahim',
        roleOrUnit: 'Electrician',
        category: 'Vendors',
        avatar: '/assets/images/avatar_serah_ibrahim.jpg',
    },
    {
        id: 'v-3',
        name: 'Henry Banjo',
        roleOrUnit: 'Plumber',
        category: 'Vendors',
        avatar: '/assets/images/avatar_henry_banjo.jpg',
    },
    {
        id: 't-1',
        name: 'Charles James',
        roleOrUnit: 'Diamond Unit C',
        category: 'Tenants',
        avatar: '/assets/images/avatar_charles_james.jpg',
    },
];

export interface InstantMeetingFormData {
    title: string;
    description: string;
    type: 'Public' | 'Private';
    members: string[];
}

export interface InstantMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateMeeting: (data: InstantMeetingFormData) => void;
    membersList?: InstantMeetingMember[];
}

export default function InstantMeetingModal({
    isOpen,
    onClose,
    onCreateMeeting,
    membersList = defaultMeetingMembers,
}: InstantMeetingModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'Public' | 'Private'>('Private');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close member dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleClose = () => {
        setTitle('');
        setDescription('');
        setType('Private');
        setIsDropdownOpen(false);
        setSearchQuery('');
        setSelectedMemberIds([]);
        onClose();
    };

    // Filter members by search query
    const filteredMembers = useMemo(() => {
        if (!searchQuery.trim()) return membersList;
        const q = searchQuery.toLowerCase();
        return membersList.filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                m.roleOrUnit.toLowerCase().includes(q) ||
                m.category.toLowerCase().includes(q)
        );
    }, [membersList, searchQuery]);

    const vendors = useMemo(
        () => filteredMembers.filter((m) => m.category === 'Vendors'),
        [filteredMembers]
    );

    const tenants = useMemo(
        () => filteredMembers.filter((m) => m.category === 'Tenants'),
        [filteredMembers]
    );

    const isAllSelected =
        membersList.length > 0 &&
        membersList.every((m) => selectedMemberIds.includes(m.id));

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedMemberIds([]);
        } else {
            setSelectedMemberIds(membersList.map((m) => m.id));
        }
    };

    const toggleMember = (id: string) => {
        setSelectedMemberIds((prev) =>
            prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
        );
    };

    const toggleGroup = (groupMembers: InstantMeetingMember[]) => {
        const groupIds = groupMembers.map((m) => m.id);
        const allGroupSelected = groupIds.every((id) =>
            selectedMemberIds.includes(id)
        );

        if (allGroupSelected) {
            setSelectedMemberIds((prev) =>
                prev.filter((id) => !groupIds.includes(id))
            );
        } else {
            setSelectedMemberIds((prev) =>
                Array.from(new Set([...prev, ...groupIds]))
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateMeeting({
            title: title.trim() || 'Instant Facility Meeting',
            description: description.trim(),
            type,
            members: selectedMemberIds,
        });
        handleClose();
    };

    const selectedMembersSummary = useMemo(() => {
        if (selectedMemberIds.length === 0) return 'Select members';
        const names = membersList
            .filter((m) => selectedMemberIds.includes(m.id))
            .map((m) => m.name);
        if (names.length <= 2) return names.join(', ');
        return `${names.slice(0, 2).join(', ')} (+${names.length - 2})`;
    }, [selectedMemberIds, membersList]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Instant Meeting"
            maxWidth="max-w-[490px]"
        >
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Title Input */}
                <Input
                    title="Title"
                    placeholder="Enter meeting  title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {/* Description Input */}
                <Textarea
                    title="Description"
                    placeholder="Description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Meeting Type Radio Group */}
                <div className="space-y-2 pt-1">
                    <label className="block text-xs font-bold text-[#002E62]">
                        Meeting Type
                    </label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                    type === 'Public'
                                        ? 'border-[#12B76A]'
                                        : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
                                }`}
                            >
                                {type === 'Public' && (
                                    <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
                                )}
                            </div>
                            <span
                                className={`text-xs sm:text-sm font-medium ${
                                    type === 'Public'
                                        ? 'text-[#002E62] font-semibold'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                Public
                            </span>
                            <input
                                type="radio"
                                name="instantMeetingType"
                                value="Public"
                                checked={type === 'Public'}
                                onChange={() => setType('Public')}
                                className="hidden"
                            />
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                    type === 'Private'
                                        ? 'border-[#12B76A]'
                                        : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
                                }`}
                            >
                                {type === 'Private' && (
                                    <div className="w-2 h-2 rounded-full bg-[#12B76A]" />
                                )}
                            </div>
                            <span
                                className={`text-xs sm:text-sm font-medium ${
                                    type === 'Private'
                                        ? 'text-[#002E62] font-semibold'
                                        : 'text-[#64748B]'
                                }`}
                            >
                                Private
                            </span>
                            <input
                                type="radio"
                                name="instantMeetingType"
                                value="Private"
                                checked={type === 'Private'}
                                onChange={() => setType('Private')}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Add Members Multi-Select Dropdown */}
                <div className="space-y-1 relative" ref={dropdownRef}>
                    <label className="block text-xs font-bold text-[#002E62]">
                        Add Members
                    </label>

                    {/* Trigger Button */}
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full py-3 px-4 border rounded-lg bg-[#F7F7FD] flex items-center justify-between transition-colors text-left cursor-pointer ${
                            isDropdownOpen
                                ? 'border-[#002E62] ring-2 ring-[#002E62]/10 bg-white'
                                : 'border-[#E0DEF7] hover:border-[#CBD5E1]'
                        }`}
                    >
                        <span
                            className={`text-[14px] truncate ${
                                selectedMemberIds.length > 0
                                    ? 'text-[#002E62] font-medium'
                                    : 'text-[#52525B]'
                            }`}
                        >
                            {selectedMembersSummary}
                        </span>
                        <FiChevronDown
                            className={`h-4 w-4 text-[#64748B] shrink-0 transition-transform duration-200 ${
                                isDropdownOpen ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    {/* Dropdown Menu (Image 2) */}
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-4 z-40 animate-scale-in max-h-[360px] overflow-y-auto space-y-4">
                            {/* Search bar + Select all */}
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={toggleSelectAll}
                                    className="px-3 py-2 rounded-xl bg-[#EBF3FF] hover:bg-[#DBEAFE] text-[#002E62] border border-[#BFDBFE] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                                >
                                    <div
                                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                                            isAllSelected
                                                ? 'bg-[#002E62] border-[#002E62] text-white'
                                                : 'border-[#94A3B8] bg-white'
                                        }`}
                                    >
                                        {isAllSelected && <FiCheck className="h-3 w-3 stroke-[3]" />}
                                    </div>
                                    <span>Select all</span>
                                </button>
                            </div>

                            {/* Section 1: Vendors */}
                            {vendors.length > 0 && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                        <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                            Vendors
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => toggleGroup(vendors)}
                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                                vendors.every((v) =>
                                                    selectedMemberIds.includes(v.id)
                                                )
                                                    ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                    : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                            }`}
                                        >
                                            {vendors.every((v) =>
                                                selectedMemberIds.includes(v.id)
                                            ) && <FiCheck className="h-3 w-3 stroke-[3]" />}
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {vendors.map((vendor) => {
                                            const isChecked = selectedMemberIds.includes(vendor.id);
                                            return (
                                                <div
                                                    key={vendor.id}
                                                    onClick={() => toggleMember(vendor.id)}
                                                    className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={vendor.avatar}
                                                            alt={vendor.name}
                                                            className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                                                        />
                                                        <div>
                                                            <h5 className="text-xs sm:text-sm font-bold text-[#002E62] leading-tight">
                                                                {vendor.name}
                                                            </h5>
                                                            <p className="text-[11px] text-[#64748B]">
                                                                {vendor.roleOrUnit}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                            isChecked
                                                                ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                                : 'border-[#CBD5E1] bg-white'
                                                        }`}
                                                    >
                                                        {isChecked && (
                                                            <FiCheck className="h-3 w-3 stroke-[3]" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Section 2: Tenants */}
                            {tenants.length > 0 && (
                                <div className="space-y-2 pt-1">
                                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                        <span className="text-xs sm:text-sm font-bold text-[#1E293B]">
                                            Tenants
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => toggleGroup(tenants)}
                                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                                tenants.every((t) =>
                                                    selectedMemberIds.includes(t.id)
                                                )
                                                    ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                    : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                                            }`}
                                        >
                                            {tenants.every((t) =>
                                                selectedMemberIds.includes(t.id)
                                            ) && <FiCheck className="h-3 w-3 stroke-[3]" />}
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {tenants.map((tenant) => {
                                            const isChecked = selectedMemberIds.includes(tenant.id);
                                            return (
                                                <div
                                                    key={tenant.id}
                                                    onClick={() => toggleMember(tenant.id)}
                                                    className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={tenant.avatar}
                                                            alt={tenant.name}
                                                            className="w-9 h-9 rounded-full object-cover border border-[#E2E8F0]"
                                                        />
                                                        <div>
                                                            <h5 className="text-xs sm:text-sm font-bold text-[#002E62] leading-tight">
                                                                {tenant.name}
                                                            </h5>
                                                            <p className="text-[11px] text-[#64748B]">
                                                                {tenant.roleOrUnit}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                                            isChecked
                                                                ? 'bg-[#12B76A] border-[#12B76A] text-white'
                                                                : 'border-[#CBD5E1] bg-white'
                                                        }`}
                                                    >
                                                        {isChecked && (
                                                            <FiCheck className="h-3 w-3 stroke-[3]" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action button (Image 3) */}
                <div className="pt-3">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-xs"
                    >
                        Create Meeting
                    </button>
                </div>
            </form>
        </Modal>
    );
}
