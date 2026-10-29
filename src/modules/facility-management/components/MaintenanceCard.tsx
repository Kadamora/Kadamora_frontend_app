import Button from '@shared/components/Button';
import type { MaintenanceRequest } from '../types/propertyManagement';
import { FiDroplet, FiZap, FiWind, FiTool } from 'react-icons/fi';

export interface MaintenanceCardProps {
    request: MaintenanceRequest;
    onViewDetails: (request: MaintenanceRequest) => void;
    onAssign: (request: MaintenanceRequest) => void;
}

export default function MaintenanceCard({
    request,
    onViewDetails,
    onAssign,
}: MaintenanceCardProps) {
    const isCompleted = request.status === 'Completed';
    const isAssigned = request.status === 'Assigned' || Boolean(request.assignedTo);
    const isInProgress = request.status === 'In- Progress';
    const isPending = request.status === 'Pending' && !isAssigned;
    const showProgress = isInProgress || isCompleted;

    const displayProgress = isCompleted ? 100 : (request.progress ?? 40);

    const getServiceIcon = (type: string) => {
        switch (type) {
            case 'Plumbing':
                return <FiDroplet className="h-4 w-4 text-[#002E62]" />;
            case 'Electrical':
                return <FiZap className="h-4 w-4 text-[#002E62]" />;
            case 'HVAC':
                return <FiWind className="h-4 w-4 text-[#002E62]" />;
            default:
                return <FiTool className="h-4 w-4 text-[#002E62]" />;
        }
    };

    const getStatusBadge = () => {
        if (isCompleted) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EBFDF5] text-[#12B76A] border-[#A6F4C5] shrink-0">
                    Completed
                </span>
            );
        }
        if (request.status === 'Assigned' || isAssigned) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#E8FAF0] text-[#0E793C] border-[#A2E9C1] shrink-0">
                    Assigned
                </span>
            );
        }
        if (isInProgress) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EBFDF5] text-[#12B76A] border-[#A6F4C5] shrink-0">
                    In-progress
                </span>
            );
        }
        if (request.status === 'Scheduled') {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE] shrink-0">
                    Scheduled
                </span>
            );
        }
        return (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#F0FCFF] text-[#09AACD] border-[#D7F8FE] shrink-0">
                Pending
            </span>
        );
    };

    return (
        <div className="rounded-lg border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-semibold text-[#002E62]">
                            {isPending ? `${request.title} - ${request.id}` : request.title}
                        </h4>
                        <span className="bg-[#FDECF3] text-[#EC4899] border border-[#FBCFE8] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                            {request.priority}
                        </span>
                    </div>

                    {getStatusBadge()}
                </div>

                {/* Description */}
                <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3 mb-4">
                    {request.description}
                </p>

                {/* Tenant & Request Type */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9] mb-4">
                    {/* Tenant */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src="/assets/images/charles.png"
                            alt={request.tenantName}
                            className="h-9 w-9 rounded-full object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                            <h5 className="text-xs font-bold text-[#091E42] truncate">
                                {request.tenantName}
                            </h5>
                            <span className="text-[11px] text-[#6B7280] truncate block">
                                {request.tenantLocation}
                            </span>
                        </div>
                    </div>

                    {/* Service Type */}
                    <div className="flex items-center gap-2.5 justify-end sm:justify-start">
                        <span className="h-8 w-8 rounded-full border border-slate-200 bg-[#F8FAFC] flex items-center justify-center shrink-0">
                            {getServiceIcon(request.serviceType)}
                        </span>
                        <div className="min-w-0">
                            <h5 className="text-xs font-bold text-[#091E42] truncate">
                                {request.serviceType}
                            </h5>
                            <span className="text-[11px] text-[#6B7280] block">Request Type</span>
                        </div>
                    </div>
                </div>

                {/* For Assigned, In-Progress and Completed: Assigned to & Scheduled info */}
                {(showProgress || isAssigned) && (
                    <div className="space-y-1.5 text-xs text-[#52525B] mb-4">
                        <div>
                            <strong className="text-[#091E42]">Assigned to:</strong>{' '}
                            <span>{request.assignedTo || 'Chukwu & Co Plumbing Services'}</span>
                        </div>
                        <div>
                            <strong className="text-[#091E42]">Scheduled:</strong>{' '}
                            <span>{request.scheduledDate || '03 June, 2025'}</span>
                        </div>
                    </div>
                )}

                {/* For In-Progress and Completed: Progress Bar */}
                {showProgress && (
                    <div className="mb-5 space-y-1.5">
                        <span className="block text-xs font-medium text-[#52525B]">
                            {displayProgress}%
                        </span>
                        <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                                style={{ width: `${displayProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* For Pending: Raised On date */}
                {isPending && (
                    <div className="mb-4">
                        <span className="text-xs text-[#52525B]">
                            <strong className="text-[#091E42]">Raised On:</strong> {request.raisedOn}
                        </span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div>
                {isPending ? (
                    <div className="flex items-center gap-3 pt-2">
                        <Button
                        type='button'
                         variant='reject'
                            onClick={() => onViewDetails(request)}
                            className='text-xs rounded-sm'
                        >
                            View Details
                        </Button>
                        <Button
                            
                            onClick={() => onAssign(request)}
                            className='text-xs rounded-sm border border-[#004493]'
                        >
                            Assign
                        </Button>

                    </div>
                ) : (
                    <div className="pt-2">
                        <Button
                        type='button'
                         variant='reject'
                            onClick={() => onViewDetails(request)}
                            className='text-xs  rounded-sm'
                        >
                            View Details
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
