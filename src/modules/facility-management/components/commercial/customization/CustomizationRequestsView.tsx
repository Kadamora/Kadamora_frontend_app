import { useState } from 'react';
import NewCustomizationModal from './NewCustomizationModal';
import CustomizationDetailsDrawer from './CustomizationDetailsDrawer';
import AssignArtisanModal from './AssignArtisanModal';
import { mockCustomizationRequests } from '../../../data/commercialFacilitiesMock';
import type { CustomizationRequestItem } from '../../../types/commercialFacilities';

export default function CustomizationRequestsView() {
    const [requests, setRequests] = useState<CustomizationRequestItem[]>(mockCustomizationRequests);

    // Modal / Drawer states
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedRequestForDetails, setSelectedRequestForDetails] =
        useState<CustomizationRequestItem | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [selectedRequestForAssign, setSelectedRequestForAssign] =
        useState<CustomizationRequestItem | null>(null);
    const [isAssignOpen, setIsAssignOpen] = useState(false);

    const handleOpenDetails = (request: CustomizationRequestItem) => {
        setSelectedRequestForDetails(request);
        setIsDetailsOpen(true);
    };

    const handleOpenAssign = (request: CustomizationRequestItem) => {
        setSelectedRequestForAssign(request);
        setIsAssignOpen(true);
    };

    const handleAssignSuccess = (requestId: string, artisanName: string) => {
        setRequests((prev) =>
            prev.map((r) =>
                r.id === requestId
                    ? { ...r, status: 'Assigned', assignedArtisan: artisanName }
                    : r
            )
        );
    };

    const handleCreateCustomization = (newReq: CustomizationRequestItem) => {
        setRequests((prev) => [newReq, ...prev]);
    };

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-5 sm:p-6 shadow-xs space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#002E62]">
                        Customization Requests
                    </h3>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Manage tenant customization and modification requests
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs self-start sm:self-auto shrink-0"
                >
                    Log New Customization
                </button>
            </div>

            {/* Requests Cards List (Image 2) */}
            <div className="space-y-4">
                {requests.map((req) => (
                    <div
                        key={req.id}
                        className="rounded-2xl border border-[#BED3EB] bg-white p-5 sm:p-6 shadow-xs space-y-3.5 hover:border-[#96BEEB] transition-all"
                    >
                        {/* Title & Badges */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm sm:text-base font-bold text-[#002E62]">
                                    {req.title}
                                </h4>
                                <span className="bg-[#FFECF2] text-[#F31260] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#FDD0DF]">
                                    {req.priority}
                                </span>
                            </div>

                            <span
                                className={`text-xs font-semibold px-3 py-0.5 rounded-full ${
                                    req.status === 'Assigned'
                                        ? 'bg-[#EDFCF4] text-[#12B76A] border border-[#A6F4C5]'
                                        : 'bg-[#E6F4FB] text-[#0EA5E9] border border-[#BAE6FD]'
                                }`}
                            >
                                {req.status}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">
                            {req.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => handleOpenDetails(req)}
                                className="bg-[#E6F4FB] hover:bg-[#D4EDFA] text-[#0062D2] px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                                View Details
                            </button>

                            {req.status === 'Pending' && (
                                <button
                                    type="button"
                                    onClick={() => handleOpenAssign(req)}
                                    className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                                >
                                    Assign
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal: Log New Customization (Image 4) */}
            <NewCustomizationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCustomization}
            />

            {/* Drawer: Customization Details (Image 3 left) */}
            <CustomizationDetailsDrawer
                isOpen={isDetailsOpen}
                onClose={() => {
                    setIsDetailsOpen(false);
                    setSelectedRequestForDetails(null);
                }}
                request={selectedRequestForDetails}
                onOpenAssign={(req) => handleOpenAssign(req)}
            />

            {/* Modal: Assign Artisan (Image 3 right) */}
            <AssignArtisanModal
                isOpen={isAssignOpen}
                onClose={() => {
                    setIsAssignOpen(false);
                    setSelectedRequestForAssign(null);
                }}
                request={selectedRequestForAssign}
                onAssignSuccess={handleAssignSuccess}
            />
        </div>
    );
}
