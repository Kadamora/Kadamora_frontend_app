import { useState, useRef, useEffect } from 'react';
import {
    FiMoreHorizontal,
    FiSlash,
    FiCheckCircle,
    FiEye,
    FiMessageSquare,
    FiUserPlus,
} from 'react-icons/fi';
import type { ServiceArtisan, ArtisanCategory } from '../../types/services';

interface ArtisansCategoryViewProps {
    category: ArtisanCategory;
    artisans: ServiceArtisan[];
    onAddArtisan: () => void;
    onViewArtisan: (artisan: ServiceArtisan) => void;
    onToggleStatus: (artisan: ServiceArtisan) => void;
    onMessageArtisan: (artisan: ServiceArtisan) => void;
}

export default function ArtisansCategoryView({
    category,
    artisans,
    onAddArtisan,
    onViewArtisan,
    onToggleStatus,
    onMessageArtisan,
}: ArtisansCategoryViewProps) {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const categorySingular =
        category === 'Plumbers'
            ? 'Plumber'
            : category === 'Electricians'
            ? 'Electrician'
            : category === 'Mechanics'
            ? 'Mechanic'
            : 'HVAC Specialist';

    return (
        <div className="bg-white rounded-2xl border border-[#BED3EB] p-6 shadow-xs space-y-6">
            {/* Header: Title, Subtitle, and Add Plumber CTA (Image 3) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[#002E62]">{category}</h2>
                    <p className="text-xs text-[#71717A] mt-0.5">
                        Download or view your generated reports
                    </p>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={onAddArtisan}
                        className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                        <FiUserPlus className="w-4 h-4" />
                        <span>Add {categorySingular}</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                        <tr className="border-b border-[#F0F2F5] text-[11px] font-bold text-[#71717A] uppercase tracking-wider">
                            <th className="py-3 px-3">Name</th>
                            <th className="py-3 px-3">Business Name</th>
                            <th className="py-3 px-3">Phone Number</th>
                            <th className="py-3 px-3">Request Completed</th>
                            <th className="py-3 px-3">Active Request</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F2F5]">
                        {artisans.map((artisan) => (
                            <tr
                                key={artisan.id}
                                className="hover:bg-[#F9FAFC] transition-colors text-xs text-[#18181B]"
                            >
                                <td className="py-4 px-3 font-semibold text-[#18181B]">
                                    {artisan.name}
                                </td>
                                <td className="py-4 px-3 font-bold text-[#18181B]">
                                    {artisan.businessName}
                                </td>
                                <td className="py-4 px-3 text-[#52525B] font-mono">
                                    {artisan.phoneNumber}
                                </td>
                                <td className="py-4 px-3 text-[#52525B] font-mono">
                                    {String(artisan.requestCompleted).padStart(3, '0')}
                                </td>
                                <td className="py-4 px-3 text-[#52525B] font-mono">
                                    {artisan.activeRequest}
                                </td>
                                <td className="py-4 px-3">
                                    {artisan.status === 'Active' ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF3] text-[#12B76A] border border-[#ABEFC6]">
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]">
                                            In-Active
                                        </span>
                                    )}
                                </td>
                                <td className="py-4 px-3 text-center relative">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMenuId(
                                                activeMenuId === artisan.id ? null : artisan.id
                                            );
                                        }}
                                        className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-[#71717A] hover:text-[#002E62] transition-colors cursor-pointer mx-auto"
                                        aria-label="Actions menu"
                                    >
                                        <FiMoreHorizontal className="w-4 h-4" />
                                    </button>

                                    {/* Action Dropdown Menu (matching Frame 2147224542 in Image 3) */}
                                    {activeMenuId === artisan.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-xl border border-[#E0E8F2] py-1.5 z-40 text-left animate-[fadeIn_.15s_ease-out]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveMenuId(null);
                                                    onToggleStatus(artisan);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                            >
                                                {artisan.status === 'Active' ? (
                                                    <>
                                                        <FiSlash className="w-3.5 h-3.5 text-[#F04438]" />
                                                        <span>Deactivate</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiCheckCircle className="w-3.5 h-3.5 text-[#12B76A]" />
                                                        <span>Activate</span>
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveMenuId(null);
                                                    onViewArtisan(artisan);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                            >
                                                <FiEye className="w-3.5 h-3.5 text-[#002E62]" />
                                                <span>View</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setActiveMenuId(null);
                                                    onMessageArtisan(artisan);
                                                }}
                                                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-[#18181B] hover:bg-[#F4F6F9] hover:text-[#002E62] transition-colors cursor-pointer"
                                            >
                                                <FiMessageSquare className="w-3.5 h-3.5 text-[#002E62]" />
                                                <span>Message</span>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
