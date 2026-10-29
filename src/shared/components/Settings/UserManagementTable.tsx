import { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiMoreHorizontal, FiXCircle, FiMessageSquare } from 'react-icons/fi';
import Table, { type Column } from '../Table/Table';
import ContextMenu from '../ContextMenu/ContextMenu';
import InviteUserModal from './InviteUserModal';
import { showSuccessToast } from '../Toast/Toast';

export interface UserManagementMember {
    id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    status: 'Active' | 'In-Active';
}

export interface UserManagementTableProps {
    users: UserManagementMember[];
    roleOptions?: string[];
    onToggleStatus?: (userId: string) => void;
    onMessageUser?: (user: UserManagementMember) => void;
    onInviteUser?: (data: { name: string; email: string; role: string }) => void;
    className?: string;
}

export default function UserManagementTable({
    users,
    roleOptions = ['Owner', 'Estate Manager', 'Admin'],
    onToggleStatus,
    onMessageUser,
    onInviteUser,
    className = '',
}: UserManagementTableProps) {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
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
    }, [users, search, roleFilter, statusFilter]);

    const columns: Column<UserManagementMember>[] = [
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
            render: (role: string) => {
                let badgeStyle = 'bg-[#E0F2FE] text-[#0284C7]';
                const lower = (role || '').toLowerCase();
                if (lower.includes('estate manager') || lower.includes('event manager')) {
                    badgeStyle = 'bg-[#FFEDD5] text-[#EA580C]';
                } else if (lower.includes('admin')) {
                    badgeStyle = 'bg-[#DCFCE7] text-[#16A34A]';
                } else if (lower.includes('tour guide')) {
                    badgeStyle = 'bg-[#F3E8FF] text-[#9333EA]';
                }

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
            render: (status: string) => {
                const isActive = status === 'Active';
                const badgeStyle = isActive
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
                            icon: <FiXCircle className="h-5 w-5 text-[#002E62]" />,
                            onClick: () => {
                                onToggleStatus?.(item.id);
                                showSuccessToast('Status Changed', `Toggled status for ${item.name}`);
                            },
                        },
                        {
                            label: 'Message',
                            icon: <FiMessageSquare className="h-5 w-5 text-[#002E62]" />,
                            onClick: () => {
                                onMessageUser?.(item);
                                showSuccessToast('Chat', `Opening conversation with ${item.name}`);
                            },
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="bg-white border border-[#BED3EB] rounded-2xl overflow-hidden shadow-2xs">
                {/* Header Title */}
                <div className="px-6 py-5 border-b border-[#F0F2F5]">
                    <h2 className="text-base sm:text-lg font-bold text-[#002E62]">User Management</h2>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:px-6 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-56">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:border-[#002E62]"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">Role</option>
                                {roleOptions.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none pl-3.5 pr-8 py-2 text-xs sm:text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] cursor-pointer focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                                <option value="In-Active">In-Active</option>
                            </select>
                            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsInviteModalOpen(true)}
                        className="px-5 py-2.5 bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
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
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                roleOptions={roleOptions}
                onInvite={(data) => {
                    onInviteUser?.(data);
                    showSuccessToast('Invitation Sent', `User invitation sent to ${data.email}`);
                }}
            />
        </div>
    );
}
