import { useState } from 'react';
import { FiSearch, FiStar } from 'react-icons/fi';
import Modal from '@shared/components/Modal/Modal';
import { mockArtisans } from '../../../data/commercialFacilitiesMock';
import type {
    CustomizationRequestItem,
    ArtisanItem,
} from '../../../types/commercialFacilities';
import { showSuccessToast, showWarningToast } from '@shared/components/Toast/Toast';

interface AssignArtisanModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: CustomizationRequestItem | null;
    onAssignSuccess: (requestId: string, artisanName: string) => void;
}

export default function AssignArtisanModal({
    isOpen,
    onClose,
    request,
    onAssignSuccess,
}: AssignArtisanModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArtisanId, setSelectedArtisanId] = useState<string | null>('art-1');
    const [artisans] = useState<ArtisanItem[]>(mockArtisans);

    if (!request) return null;

    const filteredArtisans = artisans.filter(
        (a) =>
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const invitedArtisans = filteredArtisans.filter((a) => a.category === 'invited');
    const kadamoraArtisans = filteredArtisans.filter((a) => a.category === 'kadamora');

    const handleAssign = () => {
        if (!selectedArtisanId) {
            showWarningToast('Select Artisan', 'Please select an artisan to assign this request.');
            return;
        }

        const artisan = artisans.find((a) => a.id === selectedArtisanId);
        const artisanName = artisan ? artisan.name : 'Assigned Artisan';

        onAssignSuccess(request.id, artisanName);
        showSuccessToast('Artisan Assigned', `${artisanName} has been assigned to "${request.title}".`);
        onClose();
    };

    const renderArtisanRow = (artisan: ArtisanItem) => {
        const isSelected = selectedArtisanId === artisan.id;

        return (
            <div
                key={artisan.id}
                onClick={() => setSelectedArtisanId(artisan.id)}
                className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                        ? 'border-[#CCE3FD] bg-[#F5F9FF]'
                        : 'border-[#F1F5F9] bg-white hover:bg-slate-50'
                }`}
            >
                <div className="flex items-start gap-3 min-w-0">
                    <img
                        src={artisan.avatarUrl}
                        alt={artisan.name}
                        className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-[#002E62] truncate">
                                {artisan.name}
                            </h5>
                        </div>
                        <p className="text-[11px] text-[#71717A] leading-relaxed line-clamp-2">
                            {artisan.description}
                        </p>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B54708] bg-[#FFFAEB] border border-[#FEDF89] px-2 py-0.5 rounded-md">
                            <FiStar className="h-3 w-3 fill-[#F79009] text-[#F79009]" />
                            <span>{artisan.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="pt-1 shrink-0">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => setSelectedArtisanId(artisan.id)}
                        className="h-4 w-4 rounded border-[#D1D5DB] text-[#002E62] focus:ring-[#002E62] cursor-pointer"
                    />
                </div>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Kadamora ${request.serviceType || 'Electrician'}`}
            maxWidth="max-w-[500px]"
        >
            <div className="space-y-4 pt-1">
                {/* Search Bar & Invite Button (Image 3 right) */}
                <div className="flex items-center gap-2.5">
                    <div className="relative flex-1">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E0E8F2] bg-[#F7F9FC] text-xs text-[#091E42] placeholder-[#71717A] focus:outline-none focus:ring-1 focus:ring-[#002E62] focus:bg-white transition-all"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => showSuccessToast('Invitation Sent', 'Artisan invitation link generated.')}
                        className="border border-[#CCE3FD] text-[#0062D2] hover:bg-[#F3F9FF] px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
                    >
                        Invite Artisan
                    </button>
                </div>

                {/* Artisans Lists */}
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {/* Invited Artisans */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-[#002E62]">
                            Invited Artisans
                        </h4>
                        <div className="space-y-2">
                            {invitedArtisans.map((artisan) => renderArtisanRow(artisan))}
                        </div>
                    </div>

                    {/* Kadamora Artisans */}
                    <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-bold text-[#002E62]">
                            Kadamora Artisans
                        </h4>
                        <div className="space-y-2">
                            {kadamoraArtisans.map((artisan) => renderArtisanRow(artisan))}
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-[#F1F5F9]">
                    <button
                        type="button"
                        onClick={handleAssign}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                        Assign Request
                    </button>
                </div>
            </div>
        </Modal>
    );
}
