export type ServiceType = 'Plumbing' | 'Electrical' | 'HVAC' | 'General Maintenance';

export type RequestPriority = 'High' | 'Medium' | 'Low';
export type RequestStatus = 'Pending' | 'In- Progress' | 'Completed' | 'Scheduled' | 'Assigned';

export interface MaintenanceRequest {
    id: string; // e.g. REQ003, REQ032
    title: string;
    unit: string;
    tenantName: string;
    tenantLocation: string;
    serviceType: ServiceType;
    priority: RequestPriority;
    status: RequestStatus;
    raisedOn: string;
    availableTime: string;
    description: string;
    bulletPoints?: string[];
    imageUrl?: string;
    assignedTo?: string;
    scheduledDate?: string;
    progress?: number; // 0 - 100
    assignedArtisanIds?: string[];
}

export interface Artisan {
    id: string;
    name: string;
    rating: number;
    description: string;
    isInvited: boolean;
    avatarUrl: string;
    trade: ServiceType;
}

export interface NewRequestFormData {
    service: string;
    unit: string;
    priority: string;
    timeRange: string;
    title: string;
    description: string;
    files: File[];
}
