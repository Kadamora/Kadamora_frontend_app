export type CommercialSection =
    | 'selection'
    | 'workspace-leasing'
    | 'corporate-maintenance'
    | 'enhanced-security'
    | 'tenant-management';

export type MaintenanceTab = 'Maintenance Requests' | 'Service Schedule';

export type WorkspaceTab = 'Available Properties' | 'Active Leases' | 'Customization Request';

export interface CommercialMaintenanceRequest {
    id: string;
    title: string;
    property: string;
    fullName: string;
    requestType: 'Electrical' | 'HVAC' | 'Maintenance' | 'Plumbing' | 'Janitorial' | 'Security';
    requestDate: string;
    status: 'Pending' | 'Assigned';
    priority?: 'Low' | 'Medium' | 'High' | 'Critical';
    unit?: string;
    description?: string;
    isRecurring?: boolean;
    recurrenceInterval?: string;
    attachments?: string[];
}

export interface ServiceScheduleItem {
    id: string;
    title: string;
    category: 'upcoming' | 'recurring';
    badgeText: string;
    badgeType: 'pending' | 'recurring';
    description: string;
    date: string;
    time: string;
}

export interface WorkspaceProperty {
    id: string;
    tag: string;
    title: string;
    price: string;
    location: string;
    imageUrl: string;
    features: string[];
    category?: 'AFFORDABLE' | 'LUXURIOUS' | 'ULTRA-LUXURIOUS';
    categoryType?: string;
    size?: string;
    furnishingStatus?: string;
    leaseDuration?: string;
    renewalOption?: string;
    maintenanceResponsibility?: string;
    securityDeposit?: string;
    additionalCharges?: string;
    amenities?: string[];
    documents?: string[];
    photos?: string[];
}

export interface LeasePropertyFormData {
    id?: string;
    category: 'AFFORDABLE' | 'LUXURIOUS' | 'ULTRA-LUXURIOUS';
    categoryType: string;
    propertyType: string;
    title: string;
    location: string;
    size: string;
    furnishingStatus: string;
    facilities: Record<string, number | null>;
    amenities: string[];
    leasePrice: string;
    leaseDuration: string;
    renewalOption: 'Yes' | 'No' | '';
    maintenanceResponsibility: 'Tenant' | 'Landlord' | 'Shared' | '';
    securityDeposit: string;
    additionalCharges: string;
    documents: string[];
    photos: string[];
    videoFileName?: string;
}

export interface ActiveLeaseAgreement {
    id: string;
    leaseId: string;
    tenantName: string;
    startDate: string;
    endDate: string;
    amountPerYear: string;
    status: 'Active' | 'Expiring';
}

export interface CustomizationRequestItem {
    id: string;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Assigned';
    description: string;
    raisedOn: string;
    availableTime: string;
    tenantName: string;
    tenantProperty: string;
    serviceType: string;
    imageUrl?: string;
    assignedArtisan?: string;
}

export interface ArtisanItem {
    id: string;
    name: string;
    category: 'invited' | 'kadamora';
    avatarUrl: string;
    description: string;
    rating: number;
    profession: string;
}

export type CameraResolution = '4k' | '1080p' | '750p' | '720p';

export type SecuritySystemType =
    | 'Multi-camera System'
    | 'Access control camera'
    | 'Multipoint system'
    | 'PTZ Dome Camera'
    | 'Thermal Sensor Camera';

export type SecuritySystemStatus = 'Online' | 'Maintenance' | 'Offline';

export interface SecurityVideoRecording {
    id: string;
    fileName: string;
    timestamp: string;
    duration: string;
    size?: string;
    previewUrl?: string;
}

export interface SecuritySystem {
    id: string;
    name: string;
    type: SecuritySystemType;
    property: string;
    location: string;
    resolution: CameraResolution;
    status: SecuritySystemStatus;
    imageUrl: string;
    captures: SecurityVideoRecording[];
}

export interface SecurityActivityItem {
    id: string;
    type: 'motion' | 'restored' | 'added';
    title: string;
    location: string;
    time: string;
}

export interface AccessControlLogItem {
    id: string;
    userName: string;
    userRole: 'Tenant' | 'Staff' | 'Visitor';
    property: string;
    accessPoint: string;
    timestamp: string;
    status: 'Granted' | 'Denied';
    badgeId: string;
}

export interface AccessControlEntry {
    id: string; // e.g. "ENT002"
    visitorName: string; // e.g. "Emma Grace Thompson"
    unit: string; // e.g. "Hilcreast - Unit002"
    purpose: string; // e.g. "Visiting"
    entryTime: string; // e.g. "04:15 AM"
    exitTime: string; // e.g. "04:15 PM"
    securityNote?: string;
    property?: string;
    date?: string;
}

export interface CorporateTenant {
    id: string; // e.g. "TEN003"
    companyName: string; // e.g. "TechStart Inc."
    contactPerson: string; // e.g. "David Johnson"
    email?: string;
    phoneNumber?: string;
    property: string; // e.g. "Sunset GroveA"
    leaseAmount: string; // e.g. "45,000.00"
    leaseTerm: string; // e.g. "Dec 15, 2025 - Dec 16, 2026"
    leaseStartDate?: string;
    status: 'Active' | 'Expiring';
}
