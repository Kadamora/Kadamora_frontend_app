export interface Tenant {
    id: string;
    unitNo: string;
    property: string;
    fullName: string;
    phone: string;
    leaseStart: string;
    leaseEnd: string;
    type: 'Residential' | 'Commercial';
    status: 'Expiring' | 'Active';
}

export interface Payment {
    id: string;
    transactionId: string;
    unitNo: string;
    property: string;
    date: string;
    amount: number;
    paymentType: string;
    status: 'Paid' | 'Due' | 'Pending';
}

export interface EnergyPoint {
    month: string;
    generator: number;
    grid: number;
    trend?: string;
}

export interface NewTenantInput {
    email: string;
    phone: string;
    property: string;
    unit: string;
    leaseStartDate: string;
}
