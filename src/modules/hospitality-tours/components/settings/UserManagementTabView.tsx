import React, { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiMoreHorizontal, FiXCircle, FiMessageSquare } from 'react-icons/fi';
import ContextMenu from '@shared/components/ContextMenu/ContextMenu';
import Table, { type Column } from '@shared/components/Table/Table';
import InviteUserModal from './InviteUserModal';

interface UserMember {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: 'Owner' | 'Event Manager' | 'Tour Guide' | 'Admin';
    status: 'Active' | 'In-Active';
}

const MOCK_USERS: UserMember[] = [
    { id: 'u1', name: 'Sophia Reynolds', phone: '08067231712', email: 'user1@example.com', role: 'Owner', status: 'Active' },
    { id: 'u2', name: 'Liam Carter', phone: '08067231712', email: 'user2@example.com', role: 'Event Manager', status: 'In-Active' },
    { id: 'u3', name: 'Emma Thompson', phone: '08097231721', email: 'user3@example.com', role: 'Tour Guide', status: 'In-Active' },
    { id: 'u4', name: 'James Anderson', phone: '08067231712', email: 'user4@example.com', role: 'Tour Guide', status: 'Active' },
    { id: 'u5', name: 'Olivia Martinez', phone: '08089231712', email: 'user5@example.com', role: 'Event Manager', status: 'Active' },
    { id: 'u6', name: 'Noah Harris', phone: '07067290712', email: 'user6@example.com', role: 'Admin', status: 'In-Active' },
    { id: 'u7', name: 'Ava White', phone: '08067231712', email: 'user7@example.com', role: 'Admin', status: 'Active' },
    { id: 'u8', name: 'Isabella King', phone: '08097231721', email: 'user8@example.com', role: 'Admin', status: 'In-Active' },
    { id: 'u9', name: 'Mason Scott', phone: '08027231742', email: 'user9@example.com', role: 'Admin', status: 'Active' },
    { id: 'u10', name: 'Mia Turner', phone: '09067231714', email: 'user10@example.com', role: 'Event Manager', status: 'In-Active' },
];

export default function UserManagementTabView() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter((u) => {
            const matchesSearch =
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase()) ||
                u.phone.includes(search);
            const matchesRole =
                roleFilter === 'all' || u.role.toLowerCase() === roleFilter.toLowerCase();
            const matchesStatus =
                statusFilter === 'all' || u.status.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [search, roleFilter, statusFilter]);

    const columns: Column<UserMember>[] = [
        {
            key: 'name',
            label: 'NAME',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm font-semibold text-[#1E293B]',
        },
        {
            key: 'phone',
            label: 'PHONE NUMBER',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#64748B]',
        },
        {
            key: 'email',
            label: 'EMAIL',
            cellClassName: 'px-6 py-4 text-xs sm:text-sm text-[#64748B]',
        },
        {
            key: 'role',
            label: 'Role',
            cellClassName: 'px-6 py-4',
            render: (role: UserMember['role']) => {
                let badgeStyle = 'bg-[#E0F2FE] text-[#0284C7]';
                if (role === 'Event Manager') badgeStyle = 'bg-[#FFEDD5] text-[#EA580C]';
                if (role === 'Tour Guide') badgeStyle = 'bg-[#F3E8FF] text-[#9333EA]';
                if (role === 'Admin') badgeStyle = 'bg-[#DCFCE7] text-[#16A34A]';

                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${badgeStyle}`}>
                        {role}
                    </span>
                );
            },
        },
        {
            key: 'status',
            label: 'Status',
            cellClassName: 'px-6 py-4',
            render: (status: UserMember['status']) => {
                const badgeStyle =
                    status === 'Active'
                        ? 'bg-[#DCFCE7] text-[#16A34A]'
                        : 'bg-[#FFE4E6] text-[#E11D48]';

                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${badgeStyle}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'action',
            label: 'ACTION',
            align: 'center',
            cellClassName: 'px-6 py-4',
            render: (_, item) => (
                <ContextMenu
                    trigger={
                        <button
                            type="button"
                            className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#002E62] text-slate-500 hover:text-[#002E62] flex items-center justify-center transition-colors cursor-pointer"
                            title="Member Actions"
                        >
                            <FiMoreHorizontal className="h-4 w-4" />
                        </button>
                    }
                    items={[
                        {
                            label: item.status === 'Active' ? 'Deactivate' : 'Activate',
                            icon: <FiXCircle className="h-6 w-6 text-[#002E62] stroke-[2]" />,
                            onClick: () => alert(`Toggled status for ${item.name}`),
                        },
                        {
                            label: 'Message',
                            icon: <FiMessageSquare className="h-6 w-6 text-[#002E62] stroke-[2]" />,
                            onClick: () => alert(`Opening chat message with ${item.name}`),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-white border border-[#BED3EB] rounded-2xl overflow-hidden shadow-2xs">
                {/* Header Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-[#E2E8F0]">
                    {/* Left: Search & Filters */}
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-56">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-slate-800 focus:outline-none focus:border-[#002E62]"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">Role</option>
                                <option value="Owner">Owner</option>
                                <option value="Event Manager">Event Manager</option>
                                <option value="Tour Guide">Tour Guide</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                                <option value="In-Active">In-Active</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Right: Invite User Button */}
                    <button
                        type="button"
                        onClick={() => setInviteModalOpen(true)}
                        className="px-5 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer shadow-2xs whitespace-nowrap self-end sm:self-auto"
                    >
                        Invite User
                    </button>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredUsers}
                    showPagination={false}
                />
            </div>

            {/* Invite User Modal */}
            <InviteUserModal
                isOpen={inviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
            />
        </div>
    );
}
