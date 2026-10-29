import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';

import CommercialSelectionView from '../../components/commercial/CommercialSelectionView';
import WorkspaceLeasingView from '../../components/commercial/WorkspaceLeasingView';
import CorporateMaintenanceView from '../../components/commercial/CorporateMaintenanceView';
import NewRequestModal from '../../components/commercial/NewRequestModal';

// Enhanced Security Components
import EnhancedSecurityView from '../../components/commercial/security/EnhancedSecurityView';
import SecuritySystemsInventoryTable from '../../components/commercial/security/SecuritySystemsInventoryTable';
import AccessControlLogsTable from '../../components/commercial/security/AccessControlLogsTable';
import AddSecuritySystemModal from '../../components/commercial/security/AddSecuritySystemModal';
import EditSecuritySystemModal from '../../components/commercial/security/EditSecuritySystemModal';
import SecurityDetailsDrawer from '../../components/commercial/security/SecurityDetailsDrawer';
import VideoPlayerModal from '../../components/commercial/security/VideoPlayerModal';
import EntryModal from '../../components/commercial/security/EntryModal';
import EntryDetailsDrawer from '../../components/commercial/security/EntryDetailsDrawer';

// Corporate Tenant Management Components
import CorporateTenantManagementView from '../../components/commercial/tenant/CorporateTenantManagementView';
import AddEditTenantModal from '../../components/commercial/tenant/AddEditTenantModal';

import {
    mockCommercialRequests,
    mockUpcomingServices,
    mockRecurringServices,
    mockSecuritySystems,
    mockSecurityActivities,
    mockAccessControlLogs,
    mockAccessControlEntries,
    mockCorporateTenants,
} from '../../data/commercialFacilitiesMock';
import type {
    CommercialSection,
    CommercialMaintenanceRequest,
    ServiceScheduleItem,
    SecuritySystem,
    SecurityVideoRecording,
    AccessControlEntry,
    CorporateTenant,
} from '../../types/commercialFacilities';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMCommercialFacilitiesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sectionParam = searchParams.get('section') as CommercialSection | null;

    const [currentSection, setCurrentSection] = useState<CommercialSection>(
        sectionParam || 'selection'
    );

    // State for maintenance requests & schedules
    const [requestsList, setRequestsList] =
        useState<CommercialMaintenanceRequest[]>(mockCommercialRequests);
    const [upcomingServices] =
        useState<ServiceScheduleItem[]>(mockUpcomingServices);
    const [recurringServices] =
        useState<ServiceScheduleItem[]>(mockRecurringServices);

    // State for Enhanced Security
    const [systemsList, setSystemsList] =
        useState<SecuritySystem[]>(mockSecuritySystems);
    const [securityActivities] = useState(mockSecurityActivities);
    const [accessLogs] = useState(mockAccessControlLogs);
    const [accessEntriesList, setAccessEntriesList] =
        useState<AccessControlEntry[]>(mockAccessControlEntries);
    const [securitySubView, setSecuritySubView] = useState<
        'overview' | 'inventory' | 'access-logs'
    >('overview');

    // Security Modals and Drawers
    const [isAddSecurityModalOpen, setIsAddSecurityModalOpen] = useState(false);
    const [isEditSecurityModalOpen, setIsEditSecurityModalOpen] = useState(false);
    const [editingSystem, setEditingSystem] = useState<SecuritySystem | null>(null);
    const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<SecuritySystem | null>(null);
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [playingSystem, setPlayingSystem] = useState<SecuritySystem | null>(null);
    const [playingVideoTitle, setPlayingVideoTitle] = useState<string | undefined>(undefined);
    const [playingVideoDuration, setPlayingVideoDuration] = useState<string | undefined>(undefined);

    // Access Control Log Modals & Drawers
    const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
    const [entryModalMode, setEntryModalMode] = useState<'create' | 'edit'>('create');
    const [editingEntry, setEditingEntry] = useState<AccessControlEntry | null>(null);
    const [isEntryDetailsDrawerOpen, setIsEntryDetailsDrawerOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<AccessControlEntry | null>(null);

    // State for Corporate Tenant Management (Image 1)
    const [tenantsList, setTenantsList] =
        useState<CorporateTenant[]>(mockCorporateTenants);
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
    const [tenantModalMode, setTenantModalMode] = useState<'create' | 'edit'>('create');
    const [editingTenant, setEditingTenant] = useState<CorporateTenant | null>(null);

    // Modal states
    const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);

    const handleSelectSection = (section: CommercialSection) => {
        setCurrentSection(section);
        if (section === 'enhanced-security') {
            setSecuritySubView('overview');
        }
        if (section === 'selection') {
            searchParams.delete('section');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ section });
        }
    };

    const handleCreateNewRequest = (newReq: CommercialMaintenanceRequest) => {
        setRequestsList((prev) => [newReq, ...prev]);
    };

    const handleViewRequestAction = (req: CommercialMaintenanceRequest) => {
        showSuccessToast('Request Selected', `Opening ticket ${req.id} details.`);
    };

    // Security System Handlers
    const handleAddSecuritySystem = (newSys: SecuritySystem) => {
        setSystemsList((prev) => [newSys, ...prev]);
    };

    const handleUpdateSecuritySystem = (updated: SecuritySystem) => {
        setSystemsList((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
        );
        if (selectedSystem?.id === updated.id) {
            setSelectedSystem(updated);
        }
    };

    const handlePreviewSystem = (sys: SecuritySystem) => {
        setPlayingSystem(sys);
        const firstCapture = sys.captures[0];
        setPlayingVideoTitle(
            firstCapture ? `${sys.id} - ${firstCapture.fileName}` : `${sys.id} Live Stream`
        );
        setPlayingVideoDuration(firstCapture?.duration || '15:28');
        setIsVideoPlayerOpen(true);
    };

    const handleViewDetails = (sys: SecuritySystem) => {
        setSelectedSystem(sys);
        setIsDetailsDrawerOpen(true);
    };

    const handleEditSystem = (sys: SecuritySystem) => {
        setEditingSystem(sys);
        setIsEditSecurityModalOpen(true);
    };

    const handlePlayRecording = (sys: SecuritySystem, cap: SecurityVideoRecording) => {
        setPlayingSystem(sys);
        setPlayingVideoTitle(`${sys.id} - ${cap.fileName}`);
        setPlayingVideoDuration(cap.duration);
        setIsVideoPlayerOpen(true);
    };

    // Access Control Entry Handlers
    const handleSaveEntry = (entry: AccessControlEntry) => {
        if (entryModalMode === 'edit') {
            setAccessEntriesList((prev) =>
                prev.map((e) => (e.id === entry.id ? entry : e))
            );
            if (selectedEntry?.id === entry.id) {
                setSelectedEntry(entry);
            }
        } else {
            setAccessEntriesList((prev) => [entry, ...prev]);
        }
    };

    // Corporate Tenant Handlers
    const handleSaveTenant = (tenant: CorporateTenant) => {
        if (tenantModalMode === 'edit') {
            setTenantsList((prev) =>
                prev.map((t) => (t.id === tenant.id ? tenant : t))
            );
        } else {
            setTenantsList((prev) => [tenant, ...prev]);
        }
    };

    const handleChatTenant = (tenant: CorporateTenant) => {
        showSuccessToast(
            'Chat Initialized',
            `Opening communication channel with ${tenant.companyName} (${tenant.contactPerson}).`
        );
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header & Breadcrumb Trail */}
            {currentSection === 'selection' ? (
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[#002E62]">
                        Commercial Facility Management
                    </h1>
                </div>
            ) : currentSection === 'workspace-leasing' ? (
                <div className="space-y-1">
                    <PageHeader
                        title="Workspace Leasing"
                        crumbs={[
                            {
                                label: 'Commercial Facility Mgt',
                                onClick: () => handleSelectSection('selection'),
                            },
                            { label: 'Workspace Leasing' },
                        ]}
                    />
                </div>
            ) : currentSection === 'corporate-maintenance' ? (
                <div className="space-y-1">
                    <PageHeader
                        title="Corporate Maintenance"
                        crumbs={[
                            {
                                label: 'Commercial Facility Mgt',
                                onClick: () => handleSelectSection('selection'),
                            },
                            { label: 'Maintenance' },
                        ]}
                    />
                </div>
            ) : currentSection === 'enhanced-security' ? (
                <div className="space-y-1">
                    <PageHeader
                        title="Enhanced Security"
                        crumbs={
                            securitySubView === 'overview'
                                ? [
                                      {
                                          label: 'Commercial Facility Mgt',
                                          onClick: () => handleSelectSection('selection'),
                                      },
                                      { label: 'Enhanced Security' },
                                  ]
                                : [
                                      {
                                          label: 'Commercial Facility Mgt',
                                          onClick: () => handleSelectSection('selection'),
                                      },
                                      {
                                          label: 'Enhanced Security',
                                          onClick: () => setSecuritySubView('overview'),
                                      },
                                      { label: 'Security System' },
                                  ]
                        }
                        action={
                            securitySubView === 'access-logs' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingEntry(null);
                                        setEntryModalMode('create');
                                        setIsEntryModalOpen(true);
                                    }}
                                    className="bg-[#002E62] hover:bg-[#002047] text-white px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    <span>Add New Entry</span>
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsAddSecurityModalOpen(true)}
                                    className="bg-[#002E62] hover:bg-[#002047] text-white px-4 sm:px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    <span>Add Security System</span>
                                </button>
                            )
                        }
                    />
                </div>
            ) : (
                <div className="space-y-1">
                    <PageHeader
                        title="Tenant Management"
                        crumbs={[
                            {
                                label: 'Commercial Facility Mgt',
                                onClick: () => handleSelectSection('selection'),
                            },
                            { label: 'Tenant Management' },
                        ]}
                    />
                </div>
            )}

            {/* VIEW 1: Commercial Selection Cards */}
            {currentSection === 'selection' && (
                <CommercialSelectionView onSelectSection={handleSelectSection} />
            )}

            {/* VIEW 2: Workspace Leasing */}
            {currentSection === 'workspace-leasing' && (
                <WorkspaceLeasingView />
            )}

            {/* VIEW 3: Corporate Maintenance */}
            {currentSection === 'corporate-maintenance' && (
                <CorporateMaintenanceView
                    requests={requestsList}
                    upcomingServices={upcomingServices}
                    recurringServices={recurringServices}
                    onCreateRequest={() => setIsCreateRequestModalOpen(true)}
                    onViewAction={handleViewRequestAction}
                />
            )}

            {/* VIEW 4: Enhanced Security (Images 1, 3, & Access Control Logs) */}
            {currentSection === 'enhanced-security' && (
                <>
                    {securitySubView === 'overview' && (
                        <EnhancedSecurityView
                            systems={systemsList}
                            activities={securityActivities}
                            accessLogs={accessLogs}
                            onOpenInventory={() => setSecuritySubView('inventory')}
                            onOpenAccessLogs={() => setSecuritySubView('access-logs')}
                            onPreviewSystem={handlePreviewSystem}
                        />
                    )}

                    {securitySubView === 'inventory' && (
                        <SecuritySystemsInventoryTable
                            systems={systemsList}
                            onPreview={handlePreviewSystem}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEditSystem}
                        />
                    )}

                    {securitySubView === 'access-logs' && (
                        <AccessControlLogsTable
                            entries={accessEntriesList}
                            onViewDetails={(entry) => {
                                setSelectedEntry(entry);
                                setIsEntryDetailsDrawerOpen(true);
                            }}
                            onEditEntry={(entry) => {
                                setEditingEntry(entry);
                                setEntryModalMode('edit');
                                setIsEntryModalOpen(true);
                            }}
                        />
                    )}
                </>
            )}

            {/* VIEW 5: Tenant Management (Image 1) */}
            {currentSection === 'tenant-management' && (
                <CorporateTenantManagementView
                    tenants={tenantsList}
                    onAddTenant={() => {
                        setEditingTenant(null);
                        setTenantModalMode('create');
                        setIsTenantModalOpen(true);
                    }}
                    onEditTenant={(tenant) => {
                        setEditingTenant(tenant);
                        setTenantModalMode('edit');
                        setIsTenantModalOpen(true);
                    }}
                    onChatTenant={handleChatTenant}
                />
            )}

            {/* MODALS & DRAWERS */}
            {/* Modal: New Maintenance Request */}
            <NewRequestModal
                isOpen={isCreateRequestModalOpen}
                onClose={() => setIsCreateRequestModalOpen(false)}
                onSubmit={handleCreateNewRequest}
            />

            {/* Modal: Add Security System */}
            <AddSecuritySystemModal
                isOpen={isAddSecurityModalOpen}
                onClose={() => setIsAddSecurityModalOpen(false)}
                onAddSystem={handleAddSecuritySystem}
            />

            {/* Modal: Edit Security System */}
            <EditSecuritySystemModal
                isOpen={isEditSecurityModalOpen}
                onClose={() => setIsEditSecurityModalOpen(false)}
                system={editingSystem}
                onSave={handleUpdateSecuritySystem}
            />

            {/* Drawer: Security Details (Slides in from the right, Image 5) */}
            <SecurityDetailsDrawer
                isOpen={isDetailsDrawerOpen}
                onClose={() => setIsDetailsDrawerOpen(false)}
                system={selectedSystem}
                onEditDetails={(sys) => {
                    setIsDetailsDrawerOpen(false);
                    setEditingSystem(sys);
                    setIsEditSecurityModalOpen(true);
                }}
                onPlayRecording={handlePlayRecording}
            />

            {/* Modal: Video Player */}
            <VideoPlayerModal
                isOpen={isVideoPlayerOpen}
                onClose={() => setIsVideoPlayerOpen(false)}
                system={playingSystem}
                videoTitle={playingVideoTitle}
                videoDuration={playingVideoDuration}
            />

            {/* Modal: Create / Edit Access Control Entry (Image 2) */}
            <EntryModal
                isOpen={isEntryModalOpen}
                onClose={() => setIsEntryModalOpen(false)}
                mode={entryModalMode}
                initialData={editingEntry}
                onSubmit={handleSaveEntry}
            />

            {/* Drawer: Entry Details (Slides in from the right, Image 4) */}
            <EntryDetailsDrawer
                isOpen={isEntryDetailsDrawerOpen}
                onClose={() => setIsEntryDetailsDrawerOpen(false)}
                entry={selectedEntry}
            />

            {/* Modal: Add / Edit Corporate Tenant (Images 2 & 3) */}
            <AddEditTenantModal
                isOpen={isTenantModalOpen}
                onClose={() => setIsTenantModalOpen(false)}
                mode={tenantModalMode}
                initialData={editingTenant}
                onSubmit={handleSaveTenant}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
