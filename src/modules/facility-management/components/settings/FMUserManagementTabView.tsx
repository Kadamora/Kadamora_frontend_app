import { useState } from 'react';
import UserManagementTable from '@shared/components/Settings/UserManagementTable';
import { mockUserMembers } from '../../data/settingsMock';
import type { UserManagementMember } from '../../types/settings';

export default function FMUserManagementTabView() {
    const [users, setUsers] = useState<UserManagementMember[]>(mockUserMembers);

    const handleToggleStatus = (userId: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? { ...u, status: u.status === 'Active' ? 'In-Active' : 'Active' }
                    : u
            )
        );
    };

    const handleInviteUser = (data: { name: string; email: string; role: string }) => {
        const newUser: UserManagementMember = {
            id: `u-${Date.now()}`,
            name: data.name,
            email: data.email,
            phone: '08000000000',
            role: data.role,
            status: 'Active',
        };
        setUsers((prev) => [newUser, ...prev]);
    };

    return (
        <UserManagementTable
            users={users}
            roleOptions={['Owner', 'Estate Manager', 'Admin']}
            onToggleStatus={handleToggleStatus}
            onInviteUser={handleInviteUser}
        />
    );
}
