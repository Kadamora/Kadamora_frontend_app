import PageHeader from '@shared/components/Dashboard/PageHeader';
import Button from '@shared/components/Button/Button';
import Tabs from '@shared/components/Tabs';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import AvailableServicesCard from '../../components/AvailableServicesCard';
import RecentRequestsGrid from '../../components/RecentRequestsGrid';
import RecentRequestsTable from '../../components/RecentRequestsTable';
import MaintenanceView from '../../components/MaintenanceView';
import MaintenanceDetailsDrawer from '../../components/MaintenanceDetailsDrawer';
import AssignArtisanDrawer from '../../components/AssignArtisanDrawer';
import LogNewRequestModal from '../../components/LogNewRequestModal';
import { usePropertyManagement } from '../../hooks/usePropertyManagement';
import PropertyNotificationView from '../../components/PropertyNotificationView';
import { FiGrid, FiList } from 'react-icons/fi';

export default function FMPropertyManagementPage() {
    const {
        activeTab,
        setActiveTab,
        selectedService,
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
    } = usePropertyManagement();

    return (
        <div className="space-y-6 pb-12">
            {/* Header: Title and Breadcrumbs */}
            <PageHeader
                title="Property Management"
                crumbs={[
                    { label: 'Home', path: '/facility-management/dashboard' },
                    { label: 'Manage My Property' },
                ]}
            />

            {/* Sub-nav Tabs & Log New Request Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Tabs */}
                <Tabs
                    tabs={['Service Builder', 'Maintenance', 'Notification'] as const}
                    activeTab={activeTab}
                    onChange={(tab) => setActiveTab(tab as typeof activeTab)}
                />

                {/* Log New Request Button */}
                <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsLogRequestModalOpen(true)}
                    className="rounded-lg px-5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer self-start sm:self-auto"
                >
                    Log New Request
                </Button>
            </div>

            {/* TAB 1: Maintenance View (Image 1, Image 4 & User Request for Completed) */}
            {activeTab === 'Maintenance' && (
                <MaintenanceView
                    requests={maintenanceRequests}
                    activeStatusTab={maintenanceStatusTab}
                    onChangeStatusTab={setMaintenanceStatusTab}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    counts={statusCounts}
                    onViewDetails={handleOpenDetails}
                    onAssign={handleOpenAssign}
                />
            )}

            {/* TAB 2: Service Builder View */}
            {activeTab === 'Service Builder' && (
                <div className="space-y-4">
                    <AvailableServicesCard
                        selectedService={selectedService}
                        onSelectService={handleSelectService}
                    />

                    <div className="space-y-4 border border-[#E4E4E7] rounded-lg bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-base font-semibold text-[#002E62]">
                                Recents Request
                            </h3>

                            <div className="flex items-center gap-2">
                                {/* Grid / Table Toggle */}
                                <div className="flex items-center gap-2 ">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1 rounded-sm transition-colors cursor-pointer ${
                                            viewMode === 'grid'
                                                ? 'bg-[#EDFCF4] text-[#71717A] border border-[#6EE6AA]'
                                                : 'text-[#B4B4B4] hover:text-[#71717A] border border-[#B4B4B4]'
                                        }`}
                                        aria-label="Grid view"
                                    >
                                        <FiGrid className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('table')}
                                        className={`p-1 rounded-sm transition-colors cursor-pointer ${
                                            viewMode === 'table'
                                                ? 'bg-[#EDFCF4] text-[#71717A] border border-[#6EE6AA]'
                                                : 'text-[#B4B4B4] hover:text-[#71717A] border border-[#B4B4B4]'
                                        }`}
                                        aria-label="Table view"
                                    >
                                        <FiList className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="border border-[#B4B4B4] rounded-md px-3 py-1.5 text-xs font-medium text-[#71717A] hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    See All
                                </button>
                            </div>
                        </div>

                        {viewMode === 'grid' ? (
                            <RecentRequestsGrid
                                requests={serviceBuilderRequests}
                                onViewDetails={handleOpenDetails}
                                onAssign={handleOpenAssign}
                            />
                        ) : (
                            <RecentRequestsTable
                                requests={serviceBuilderRequests}
                                onViewDetails={handleOpenDetails}
                                onAssign={handleOpenAssign}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* TAB 3: Notifications View (Image 1) */}
            {activeTab === 'Notification' && <PropertyNotificationView />}

            {/* View Details Drawer (Image 2 & Image 5 & Completed state) */}
            <MaintenanceDetailsDrawer
                isOpen={isDetailsDrawerOpen}
                onClose={handleCloseDetails}
                request={selectedRequestForDetails}
                onAssign={handleAssignFromDetails}
            />

            {/* Assign Artisan Drawer (Image 3) */}
            <AssignArtisanDrawer
                isOpen={isAssignDrawerOpen}
                onClose={handleCloseAssign}
                request={selectedRequestForAssign}
                artisans={artisans}
                onConfirmAssign={handleAssignArtisans}
            />

            {/* Log New Request Modal (Image 5 Modal) */}
            <LogNewRequestModal
                isOpen={isLogRequestModalOpen}
                onClose={() => setIsLogRequestModalOpen(false)}
                onSubmit={handleCreateRequest}
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
