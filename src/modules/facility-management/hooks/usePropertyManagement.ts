import { useState, useMemo } from 'react';
import {
    mockMaintenanceRequests,
    mockArtisans,
} from '../data/propertyManagementMock';
import type {
    MaintenanceRequest,
    Artisan,
    ServiceType,
    RequestPriority,
    NewRequestFormData,
} from '../types/propertyManagement';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export function usePropertyManagement() {
    const [activeTab, setActiveTab] = useState<'Service Builder' | 'Maintenance' | 'Notification'>('Service Builder');
    const [selectedService, setSelectedService] = useState<ServiceType | 'All'>('All');
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    // Inner filter tab for Maintenance view
    const [maintenanceStatusTab, setMaintenanceStatusTab] = useState<
        'Pending' | 'In- Progress' | 'Scheduled' | 'Completed'
    >('Pending');
    const [searchQuery, setSearchQuery] = useState('');

    const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
    const [artisans] = useState<Artisan[]>(mockArtisans);

    // Drawers & Modals
    const [selectedRequestForDetails, setSelectedRequestForDetails] = useState<MaintenanceRequest | null>(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);

    const [selectedRequestForAssign, setSelectedRequestForAssign] = useState<MaintenanceRequest | null>(null);
    const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);

    const [isLogRequestModalOpen, setIsLogRequestModalOpen] = useState(false);

    // Dynamic counts for status cards
    const statusCounts = useMemo(() => {
        const pending = requests.filter((r) => r.status === 'Pending').length;
        const inProgress = requests.filter((r) => r.status === 'In- Progress' || r.status === 'Assigned').length;
        const scheduled = requests.filter((r) => r.status === 'Scheduled').length;
        const completed = requests.filter((r) => r.status === 'Completed').length;

        return {
            pending: String(pending).padStart(2, '0'),
            inProgress: String(inProgress).padStart(2, '0'),
            scheduled: String(scheduled).padStart(2, '0'),
            completed: String(completed).padStart(2, '0'),
        };
    }, [requests]);

    // Filtered requests by selected service (for Service Builder)
    const serviceBuilderRequests = useMemo(() => {
        if (selectedService === 'All') return requests;
        return requests.filter((r) => r.serviceType === selectedService);
    }, [requests, selectedService]);

    // Filtered requests for Maintenance view
    const maintenanceRequests = useMemo(() => {
        return requests.filter((r) => {
            const matchesStatus =
                maintenanceStatusTab === 'Pending'
                    ? r.status === 'Pending'
                    : maintenanceStatusTab === 'In- Progress'
                    ? (r.status === 'In- Progress' || r.status === 'Assigned')
                    : maintenanceStatusTab === 'Scheduled'
                    ? r.status === 'Scheduled'
                    : r.status === 'Completed';

            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                r.title.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q) ||
                r.unit.toLowerCase().includes(q) ||
                (r.assignedTo ? r.assignedTo.toLowerCase().includes(q) : false);

            return matchesStatus && matchesSearch;
        });
    }, [requests, maintenanceStatusTab, searchQuery]);

    const handleSelectService = (service: ServiceType) => {
        setSelectedService((prev) => (prev === service ? 'All' : service));
    };

    const handleOpenDetails = (request: MaintenanceRequest) => {
        setSelectedRequestForDetails(request);
        setIsDetailsDrawerOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsDrawerOpen(false);
    };

    const handleOpenAssign = (request: MaintenanceRequest) => {
        setSelectedRequestForAssign(request);
        setIsAssignDrawerOpen(true);
    };

    const handleCloseAssign = () => {
        setIsAssignDrawerOpen(false);
    };

    const handleAssignFromDetails = () => {
        if (selectedRequestForDetails) {
            setSelectedRequestForAssign(selectedRequestForDetails);
            setIsDetailsDrawerOpen(false);
            setIsAssignDrawerOpen(true);
        }
    };

    const handleAssignArtisans = (requestId: string, artisanIds: string[]) => {
        setRequests((prev) =>
            prev.map((r) =>
                r.id === requestId
                    ? {
                          ...r,
                          status: 'Assigned',
                          assignedArtisanIds: artisanIds,
                          assignedTo: 'Chukwu & Co Plumbing Services',
                          scheduledDate: '03 June, 2025',
                          progress: 40,
                      }
                    : r
            )
        );
        showSuccessToast('Request Assigned', `Request ${requestId} has been assigned.`);
        setIsAssignDrawerOpen(false);
    };

    const handleCreateRequest = (data: NewRequestFormData) => {
        const newReq: MaintenanceRequest = {
            id: `REQ0${String(Math.floor(10 + Math.random() * 90))}`,
            title: data.title || 'New Maintenance Request',
            unit: data.unit || 'Hilltop DiamondA',
            tenantName: 'Michael Chamberlain',
            tenantLocation: 'Hilltop DiamondA',
            serviceType: (data.service as ServiceType) || 'Plumbing',
            priority: (data.priority as RequestPriority) || 'High',
            status: 'Pending',
            raisedOn: '03 June, 2025',
            availableTime: data.timeRange || '09:00 AM - 08:30 PM',
            description:
                data.description ||
                'The bathroom faucet is leaking continuously, even when turned off completely.',
            bulletPoints: [
                'Difficult to get hot water to flow properly',
                'Water pressure is inconsistent',
                'Leak is getting worse over time',
                'Water pooling slightly around the base of the faucet',
                'Potential water waste and risk of further damage',
            ],
            imageUrl:
                data.service === 'Electrical'
                    ? '/assets/images/circuit_repair.jpg'
                    : '/assets/images/bathroom_faucet.jpg',
        };

        setRequests((prev) => [newReq, ...prev]);
        showSuccessToast('Request Logged', `Your request ${newReq.id} has been submitted.`);
        setIsLogRequestModalOpen(false);
    };

    return {
        activeTab,
        setActiveTab,
        selectedService,
        setSelectedService,
        handleSelectService,
        viewMode,
        setViewMode,
        maintenanceStatusTab,
        setMaintenanceStatusTab,
        searchQuery,
        setSearchQuery,
        serviceBuilderRequests,
        maintenanceRequests,
        statusCounts,
        artisans,
        selectedRequestForDetails,
        isDetailsDrawerOpen,
        handleOpenDetails,
        handleCloseDetails,
        handleAssignFromDetails,
        selectedRequestForAssign,
        isAssignDrawerOpen,
        handleOpenAssign,
        handleCloseAssign,
        handleAssignArtisans,
        isLogRequestModalOpen,
        setIsLogRequestModalOpen,
        handleCreateRequest,
    };
}
