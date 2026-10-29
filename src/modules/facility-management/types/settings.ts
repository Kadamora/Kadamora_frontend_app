import type { SupportTicketItem } from '@shared/components/Settings/SupportTicketsTable';
import type { UserManagementMember } from '@shared/components/Settings/UserManagementTable';
import type { NotificationOptionItem } from '@shared/components/Settings/NotificationToggleList';
import type { ActivityLogEntry } from '@shared/components/Settings/ActivityLogTimeline';

export type SettingsTabId =
    | 'profile'
    | 'support'
    | 'users'
    | 'activity'
    | 'notifications';

export interface PersonalDetailsData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
}

export type {
    SupportTicketItem,
    UserManagementMember,
    NotificationOptionItem,
    ActivityLogEntry,
};
