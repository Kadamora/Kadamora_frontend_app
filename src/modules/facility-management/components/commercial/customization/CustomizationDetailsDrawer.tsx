import { FiSettings } from 'react-icons/fi';
import Modal from '@shared/components/Modal/Modal';
import type { CustomizationRequestItem } from '../../../types/commercialFacilities';

interface CustomizationDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    request: CustomizationRequestItem | null;
    onOpenAssign: (request: CustomizationRequestItem) => void;
}

export default function CustomizationDetailsDrawer({
    isOpen,
    onClose,
    request,
    onOpenAssign,
}: CustomizationDetailsDrawerProps) {
    if (!request) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Customization Details"
            maxWidth="max-w-[480px]"
        >
            <div className="space-y-4 pt-1">
                {/* Hero Image matching Image 3 left */}
                {request.imageUrl && (
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-xs">
                        <img
                            src={request.imageUrl}
                            alt={request.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Title & Badges */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-[#002E62]">
                                {request.title}
                            </h3>
                            <span className="bg-[#FFECF2] text-[#F31260] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#FDD0DF]">
                                {request.priority}
                            </span>
                        </div>

                        <span
                            className={`text-xs font-semibold px-3 py-0.5 rounded-full ${
                                request.status === 'Assigned'
                                    ? 'bg-[#EDFCF4] text-[#12B76A] border border-[#A6F4C5]'
                                    : 'bg-[#E6F4FB] text-[#0EA5E9] border border-[#BAE6FD]'
                            }`}
                        >
                            {request.status}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#71717A] leading-relaxed">
                        {request.description}
                    </p>
                </div>

                {/* Info Metadata */}
                <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5 text-xs text-[#52525B]">
                    <p>
                        <span className="font-semibold text-[#091E42]">Raised On:</span>{' '}
                        {request.raisedOn}
                    </p>
                    <p>
                        <span className="font-semibold text-[#091E42]">Available Time:</span>{' '}
                        {request.availableTime}
                    </p>
                </div>

                {/* Tenant & Service Info */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9]">
                    {/* Tenant Profile */}
                    <div className="flex items-center gap-2.5 min-w-0">
                        <img
                            src="/assets/images/charles.png"
                            alt={request.tenantName}
                            className="h-9 w-9 rounded-full object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                            <h5 className="text-xs font-semibold text-[#091E42] truncate">
                                {request.tenantName}
                            </h5>
                            <span className="text-[11px] text-[#6B7280] truncate block">
                                {request.tenantProperty}
                            </span>
                        </div>
                    </div>

                    {/* Service Type */}
                    <div className="flex items-center gap-2.5">
                        <span className="h-8 w-8 rounded-full border border-[#E4E4E7] bg-[#F4F4F5] flex items-center justify-center shrink-0">
                            <FiSettings className="h-4 w-4 text-[#002E62]" />
                        </span>
                        <div className="min-w-0">
                            <h5 className="text-xs font-semibold text-[#091E42] truncate">
                                {request.serviceType}
                            </h5>
                            <span className="text-[11px] text-[#6B7280] block">Request Type</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Action Section */}
                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                    <p className="text-[11px] text-[#71717A] leading-tight max-w-[280px]">
                        Assign this request to a certified and verified {request.serviceType.toLowerCase()} on kadamora
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            onOpenAssign(request);
                        }}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </Modal>
    );
}
