import ServiceScheduleCard from './ServiceScheduleCard';
import type { ServiceScheduleItem } from '../../types/commercialFacilities';

interface ServiceScheduleViewProps {
    upcomingServices: ServiceScheduleItem[];
    recurringServices: ServiceScheduleItem[];
    onCreateRequest: () => void;
}

export default function ServiceScheduleView({
    upcomingServices,
    recurringServices,
    onCreateRequest,
}: ServiceScheduleViewProps) {
    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                        Service Schedule
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        View and manage scheduled maintenance and cleaning services
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreateRequest}
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
                >
                    Create Request
                </button>
            </div>

            {/* 2 Columns: Upcoming & Recurring Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Column 1: Upcoming Services */}
                <div className="space-y-4">
                    <h4 className="text-xs sm:text-sm font-bold text-[#002E62]">
                        Upcoming Services
                    </h4>
                    <div className="space-y-4">
                        {upcomingServices.map((service) => (
                            <ServiceScheduleCard key={service.id} item={service} />
                        ))}
                    </div>
                </div>

                {/* Column 2: Recurring Services */}
                <div className="space-y-4">
                    <h4 className="text-xs sm:text-sm font-bold text-[#002E62]">
                        Recurring Services
                    </h4>
                    <div className="space-y-4">
                        {recurringServices.map((service) => (
                            <ServiceScheduleCard key={service.id} item={service} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
