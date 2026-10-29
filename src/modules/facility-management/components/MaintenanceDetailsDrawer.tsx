import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiTool, FiZap, FiDroplet, FiWind } from 'react-icons/fi';
import type { MaintenanceRequest } from '../types/propertyManagement';
import Button from '@shared/components/Button/Button';

export interface MaintenanceDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    request: MaintenanceRequest | null;
    onAssign: () => void;
}

export default function MaintenanceDetailsDrawer({
    isOpen,
    onClose,
    request,
    onAssign,
}: MaintenanceDetailsDrawerProps) {
    const drawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!request) return null;

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

    const bullets = request.bulletPoints || [
        'Difficult to get hot water to flow properly',
        'Water pressure is inconsistent',
        'Leak is getting worse over time',
        'Water pooling slightly around the base of the faucet',
        'Potential water waste and risk of further damage',
    ];

    const isAssigned = request.status === 'Assigned' || Boolean(request.assignedTo);
    const isInProgress = request.status === 'In- Progress';
    const isCompleted = request.status === 'Completed';
    const isPending = request.status === 'Pending' && !isAssigned;
    const showProgress = isInProgress || isCompleted;

    const displayProgress = isCompleted ? 100 : (request.progress ?? 0);

    const getStatusBadge = () => {
        if (isCompleted) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EBFDF5] text-[#12B76A] border-[#A6F4C5]">
                    Completed
                </span>
            );
        }
        if (request.status === 'Assigned' || isAssigned) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#E8FAF0] text-[#0E793C] border-[#A2E9C1]">
                    Assigned
                </span>
            );
        }
        if (isInProgress) {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EBFDF5] text-[#12B76A] border-[#A6F4C5]">
                    In-progress
                </span>
            );
        }
        if (request.status === 'Scheduled') {
            return (
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]">
                    Scheduled
                </span>
            );
        }
        return (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border bg-[#F0FCFF] text-[#09AACD] border-[#D7F8FE]">
                Pending
            </span>
        );
    };

    if (!request || typeof document === 'undefined') return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 h-screen h-[100dvh] w-screen transition-all ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            role="presentation"
        >
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
            />

            {/* Sliding Drawer */}
            <aside
                ref={drawerRef}
                className={`fixed right-0 top-0 bottom-0 flex h-screen h-[100dvh] w-full max-w-[500px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Maintenance Details"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-[#F0F2F5]">
                    <h2 className="text-lg font-bold text-[#093154]">Maintenance Details</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#093154] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close details"
                    >
                        <FiX className="h-4 w-4" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                    {/* Repair Photograph */}
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                        <img
                            src={request.imageUrl || '/assets/images/circuit_repair.jpg'}
                            alt={request.title}
                            className="w-full h-48 sm:h-56 object-cover"
                        />
                    </div>

                    {/* Title & Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[#091E42]">{request.title}</h3>
                            <span className="bg-[#FDECF3] text-[#EC4899] border border-[#FBCFE8] text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                                {request.priority}
                            </span>
                        </div>
                        {getStatusBadge()}
                    </div>

                    {/* Progress Bar (Image 5 & Completed state) */}
                    {showProgress && (
                        <div className="space-y-0.5 pt-1">
                            <div className="flex items-center justify-between text-xs text-[#52525B]">
                                <span>Progress</span>
                                <span>{displayProgress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#EAECF0] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#F59E0B] rounded-full transition-all duration-300"
                                    style={{ width: `${displayProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Description Paragraph & Bullet points */}
                    <div className="space-y-2 text-xs sm:text-[13px] text-[#52525B] leading-relaxed">
                        <p>{request.description}</p>
                        <ul className="space-y-0.5 list-disc list-inside text-slate-600 pl-1">
                            {bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Raised Date & Available Time */}
                    <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs text-[#52525B]">
                        <div className="flex items-center gap-2">
                            <span>
                                <strong className="text-[#091E42]">Raised On:</strong> {request.raisedOn}
                            </span>
                        </div>
                        {isPending && request.availableTime && (
                            <div className="flex items-center gap-2">
                                <span>
                                    <strong className="text-[#091E42]">Available Time:</strong>{' '}
                                    {request.availableTime}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Tenant & Request Type */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9]">
                        {/* Tenant */}
                        <div className="flex items-center gap-2.5 min-w-0">
                            <img
                                src="/assets/images/charles.png"
                                alt={request.tenantName}
                                className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200"
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

                        {/* Request Type */}
                        <div className="flex items-center gap-2.5">
                            <span className="h-9 w-9 rounded-full border border-slate-200 bg-[#F8FAFC] flex items-center justify-center shrink-0">
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

                    {/* Assigned to & Scheduled (for Assigned, In-Progress, Completed, Scheduled) */}
                    {(showProgress || isAssigned || request.status === 'Scheduled') && (
                        <div className="space-y-2 pt-3 border-t border-[#F1F5F9] text-xs text-[#52525B]">
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
                </div>

                {/* Footer Bar (Only for Pending) */}
                {isPending && (
                    <div className="p-4 sm:p-5 border-t border-[#F0F2F5] bg-[#FAFBFD] flex items-center justify-between gap-4">
                        <p className="text-[11px] sm:text-xs text-[#52525B] leading-tight">
                            Assign this request to a assigned to a certified and verified{' '}
                            {request.serviceType === 'Electrical' ? 'electrician' : 'artisan'} on kadamora
                        </p>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={onAssign}
                            className="rounded-lg px-6 py-2.5 text-xs font-semibold shrink-0 cursor-pointer"
                        >
                            Assign
                        </Button>
                    </div>
                )}
            </aside>
        </div>,
        document.body
    );
}
