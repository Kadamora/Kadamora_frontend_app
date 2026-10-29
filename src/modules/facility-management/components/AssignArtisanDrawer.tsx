import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiSearch, FiStar, FiCheck } from 'react-icons/fi';
import type { Artisan, MaintenanceRequest, ServiceType } from '../types/propertyManagement';
import Button from '@shared/components/Button/Button';
import InviteArtisanModal from './InviteArtisanModal';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export interface AssignArtisanDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    request: MaintenanceRequest | null;
    artisans: Artisan[];
    onConfirmAssign: (requestId: string, artisanIds: string[]) => void;
}

export default function AssignArtisanDrawer({
    isOpen,
    onClose,
    request,
    artisans: initialArtisans,
    onConfirmAssign,
}: AssignArtisanDrawerProps) {
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>(['art-2', 'art-3']); // pre-selected matching Image 4
    const [artisanList, setArtisanList] = useState<Artisan[]>(initialArtisans);
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    useEffect(() => {
        setArtisanList(initialArtisans);
    }, [initialArtisans]);

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

    const toggleArtisan = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleInviteArtisan = (data: { serviceType: string; email: string }) => {
        const username = data.email.split('@')[0];
        const formattedName =
            username.charAt(0).toUpperCase() + username.slice(1).replace(/[._-]/g, ' ');

        const newArtisan: Artisan = {
            id: `art-${Date.now()}`,
            name: formattedName,
            rating: 5.0,
            description: `Certified specialist in ${data.serviceType} installations and rapid response repairs.`,
            isInvited: true,
            avatarUrl: '/assets/images/charles.png',
            trade: data.serviceType as ServiceType,
        };

        setArtisanList((prev) => [newArtisan, ...prev]);
        setSelectedIds((prev) => [newArtisan.id, ...prev]);
        showSuccessToast('Artisan Invited', `Invitation email sent to ${data.email}.`);
        setIsInviteModalOpen(false);
    };

    const filtered = artisanList.filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    const invitedArtisans = filtered.filter((a) => a.isInvited);
    const kadamoraArtisans = filtered.filter((a) => !a.isInvited);

    const handleAssign = () => {
        if (request) {
            onConfirmAssign(request.id, selectedIds);
        }
    };

    if (typeof document === 'undefined') return null;

    return createPortal(
        <>
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
                    aria-label="Assign Artisan"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0F2F5]">
                        <h2 className="text-lg font-bold text-[#093154]">
                            Kadamora {request?.serviceType ? `${request.serviceType}` : 'Artisans'}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-8 w-8 rounded-full bg-[#F2F5F8] text-[#71717A] hover:bg-[#E4E9EF] hover:text-[#093154] flex items-center justify-center transition-colors cursor-pointer"
                            aria-label="Close assign drawer"
                        >
                            <FiX className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Search & Invite Bar */}
                    <div className="px-6 py-4 border-b border-[#F0F2F5] flex items-center gap-3">
                        <div className="relative flex-1">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#091E42] placeholder-slate-400 focus:outline-none focus:border-[#002E62] focus:bg-white transition"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsInviteModalOpen(true)}
                            className="border border-[#BED3EB] hover:bg-slate-50 text-xs font-semibold text-[#093154] px-3.5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                            Invite Artisan
                        </button>
                    </div>

                    {/* Artisan Lists */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                        {/* Invited Artisans Section */}
                        {invitedArtisans.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-[#093154] mb-3">
                                    Invited Artisans
                                </h4>
                                <div className="space-y-3">
                                    {invitedArtisans.map((artisan) => {
                                        const isChecked = selectedIds.includes(artisan.id);
                                        return (
                                            <div
                                                key={artisan.id}
                                                onClick={() => toggleArtisan(artisan.id)}
                                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                                                    isChecked
                                                        ? 'border-[#359F6A] bg-[#F6FEF9]'
                                                        : 'border-[#F0F2F5] hover:bg-[#F9FBFC]'
                                                }`}
                                            >
                                                <img
                                                    src={artisan.avatarUrl}
                                                    alt={artisan.name}
                                                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200 mt-0.5"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="text-xs font-bold text-[#091E42]">
                                                        {artisan.name}
                                                    </h5>
                                                    <p className="text-[11px] text-[#6B7280] leading-snug line-clamp-2 my-1">
                                                        {artisan.description}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[11px] text-[#F59E0B] font-medium">
                                                        <FiStar className="h-3.5 w-3.5 fill-current" />
                                                        <span>{artisan.rating}</span>
                                                    </div>
                                                </div>

                                                {/* Custom Checkbox */}
                                                <div
                                                    className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 transition-colors mt-1 ${
                                                        isChecked
                                                            ? 'bg-[#12B76A] text-white'
                                                            : 'border-2 border-[#D0D5DD] bg-white'
                                                    }`}
                                                >
                                                    {isChecked && <FiCheck className="h-3.5 w-3.5" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Kadamora Artisans Section */}
                        {kadamoraArtisans.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-[#093154] mb-3">
                                    Kadamora Artisans
                                </h4>
                                <div className="space-y-3">
                                    {kadamoraArtisans.map((artisan) => {
                                        const isChecked = selectedIds.includes(artisan.id);
                                        return (
                                            <div
                                                key={artisan.id}
                                                onClick={() => toggleArtisan(artisan.id)}
                                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                                                    isChecked
                                                        ? 'border-[#359F6A] bg-[#F6FEF9]'
                                                        : 'border-[#F0F2F5] hover:bg-[#F9FBFC]'
                                                }`}
                                            >
                                                <img
                                                    src={artisan.avatarUrl}
                                                    alt={artisan.name}
                                                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200 mt-0.5"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="text-xs font-bold text-[#091E42]">
                                                        {artisan.name}
                                                    </h5>
                                                    <p className="text-[11px] text-[#6B7280] leading-snug line-clamp-2 my-1">
                                                        {artisan.description}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-[11px] text-[#F59E0B] font-medium">
                                                        <FiStar className="h-3.5 w-3.5 fill-current" />
                                                        <span>{artisan.rating}</span>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 transition-colors mt-1 ${
                                                        isChecked
                                                            ? 'bg-[#12B76A] text-white'
                                                            : 'border-2 border-[#D0D5DD] bg-white'
                                                    }`}
                                                >
                                                    {isChecked && <FiCheck className="h-3.5 w-3.5" />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer with full-width Assign Request Button */}
                    <div className="p-4 sm:p-5 border-t border-[#F0F2F5] bg-white">
                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleAssign}
                            disabled={selectedIds.length === 0}
                            className="w-full rounded-xl py-3 text-sm font-semibold cursor-pointer shadow-xs"
                        >
                            Assign Request
                        </Button>
                    </div>
                </aside>
            </div>

            {/* Invite New Artisan Modal (Image 2) */}
            <InviteArtisanModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                defaultServiceType={request?.serviceType || 'Electrician'}
                onInvite={handleInviteArtisan}
            />
        </>,
        document.body
    );
}
