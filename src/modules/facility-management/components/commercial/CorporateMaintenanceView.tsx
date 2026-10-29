import { useState } from 'react';
import Tabs from '@shared/components/Tabs';
import MaintenanceRequestsTable from './MaintenanceRequestsTable';
import ServiceScheduleView from './ServiceScheduleView';
import type {
    MaintenanceTab,
    CommercialMaintenanceRequest,
    ServiceScheduleItem,
} from '../../types/commercialFacilities';

interface CorporateMaintenanceViewProps {
    requests: CommercialMaintenanceRequest[];
    upcomingServices: ServiceScheduleItem[];
    recurringServices: ServiceScheduleItem[];
    onCreateRequest: () => void;
    onViewAction?: (request: CommercialMaintenanceRequest) => void;
}

export default function CorporateMaintenanceView({
    requests,
    upcomingServices,
    recurringServices,
    onCreateRequest,
    onViewAction,
}: CorporateMaintenanceViewProps) {
    const [activeTab, setActiveTab] = useState<MaintenanceTab>('Maintenance Requests');

    return (
        <div className="space-y-6">
            {/* Tabs Row */}
            <Tabs
                tabs={['Maintenance Requests', 'Service Schedule'] as const}
                activeTab={activeTab}
                onChange={(tab) => setActiveTab(tab as MaintenanceTab)}
            />

            {/* Tab 1: Maintenance Requests Table (Image 1) */}
            {activeTab === 'Maintenance Requests' && (
                <MaintenanceRequestsTable
                    requests={requests}
                    onCreateRequest={onCreateRequest}
                    onViewAction={onViewAction}
                />
            )}

            {/* Tab 2: Service Schedule View (Image 3) */}
            {activeTab === 'Service Schedule' && (
                <ServiceScheduleView
                    upcomingServices={upcomingServices}
                    recurringServices={recurringServices}
                    onCreateRequest={onCreateRequest}
                />
            )}
        </div>
    );
}
