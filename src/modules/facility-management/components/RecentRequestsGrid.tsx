import { Cog } from 'lucide-react';
import type { MaintenanceRequest } from '../types/propertyManagement';
import Button from '@shared/components/Button';

export interface RecentRequestsGridProps {
    requests: MaintenanceRequest[];
    onViewDetails: (request: MaintenanceRequest) => void;
    onAssign: (request: MaintenanceRequest) => void;
}

export default function RecentRequestsGrid({
    requests,
    onViewDetails,

    onAssign,
}: RecentRequestsGridProps) {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {requests.map((req) => {
                const isAssigned =
                    req.status === 'Assigned' ||
                    req.status === 'In- Progress' ||
                    Boolean(req.assignedTo);
                const statusText = isAssigned ? 'Assigned' : 'Pending';

                return (
                    <div
                        key={req.id}
                        className="rounded-lg border border-[#E4E4E7] bg-white p-4 sm:p-5 flex flex-col justify-between transition-shadow"
                    >
                        <div>
                            {/* Title & Badges */}
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="text-sm font-semibold text-[#002E62]">
                                        {req.title} - {req.id}
                                    </h4>
                                    <span className="bg-[#FFECF2] text-[#F31260] border border-[#FDD0DF] text-[10px] font-medium px-2 py-0.5 rounded-sm">
                                        {req.priority}
                                    </span>
                                </div>

                                <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm shrink-0 border ${
                                        isAssigned
                                            ? 'bg-[#E8FAF0] text-[#0E793C] border-[#A2E9C1]'
                                            : 'bg-[#F0FCFF] text-[#09AACD] border-[#D7F8FE]'
                                    }`}
                                >
                                    {statusText}
                                </span>
                            </div>

                        {/* Description */}
                        <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3 mb-4">
                            {req.description}
                        </p>

                        {/* Tenant and Service Info */}
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9] mb-4">
                            {/* Tenant */}
                            <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                    src="/assets/images/charles.png"
                                    alt={req.tenantName}
                                    className="h-9 w-9 rounded-full object-cover shrink-0 border border-slate-200"
                                />
                                <div className="min-w-0">
                                    <h5 className="text-xs font-semibold text-[#091E42] truncate">
                                        {req.tenantName}
                                    </h5>
                                    <span className="text-[11px] text-[#6B7280] truncate block">
                                        {req.tenantLocation}
                                    </span>
                                </div>
                            </div>

                            {/* Service Type */}
                            <div className="flex items-center gap-2.5 justify-end sm:justify-start">
                                <span className="h-8 w-8 rounded-full border border-[#E4E4E7] bg-[#F4F4F5] flex items-center justify-center shrink-0">
                                    <Cog className="h-4 w-4 text-[#002E62]" />
                                </span>
                                <div className="min-w-0">
                                    <h5 className="text-xs font-semibold text-[#091E42] truncate">
                                        {req.serviceType}
                                    </h5>
                                    <span className="text-[11px] text-[#6B7280] block">Request Type</span>
                                </div>
                            </div>
                        </div>

                        {/* Raised Date */}
                        <div className="mb-4">
                            <span className="text-xs text-[#52525B]">
                                <strong className="text-[#091E42]">Raised On:</strong> {req.raisedOn}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 ">
                        <Button 
                        type='button'
                        variant='reject'
                        onClick={() => onViewDetails(req)}
                        className='text-xs border border-[#004493] rounded-sm'
                        >
                            View Details
                        </Button>
                        <Button 
                        type='button'
                        variant='primary'
                        onClick={() => onAssign(req)}
                        className='text-xs rounded-sm'
                        >
                            Assign
                        </Button>
                    </div>
                </div>
            );
        })}
        </div>
    );
}
