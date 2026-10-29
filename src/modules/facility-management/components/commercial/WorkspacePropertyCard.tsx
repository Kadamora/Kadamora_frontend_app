import { useState, useRef, useEffect } from 'react';
import { FiMapPin, FiMoreHorizontal, FiCheck, FiEdit, FiTrash2 } from 'react-icons/fi';
import type { WorkspaceProperty } from '../../types/commercialFacilities';

interface WorkspacePropertyCardProps {
    property: WorkspaceProperty;
    onSelect?: (property: WorkspaceProperty) => void;
    onEdit?: (property: WorkspaceProperty) => void;
    onDelete?: (property: WorkspaceProperty) => void;
}

export default function WorkspacePropertyCard({
    property,
    onSelect,
    onEdit,
    onDelete,
}: WorkspacePropertyCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            onClick={() => onSelect?.(property)}
            className="rounded-2xl border border-[#BED3EB] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
        >
            <div>
                {/* Image & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />

                    {/* Tag Badge Top Left */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/95 backdrop-blur-xs text-[#002E62] text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                            {property.tag}
                        </span>
                    </div>

                    {/* Action Button & Dropdown Menu Top Right (Frame 2147224189) */}
                    <div className="absolute top-3 right-3 z-20" ref={menuRef}>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMenuOpen((prev) => !prev);
                            }}
                            className="h-8 w-8 rounded-full bg-white/95 backdrop-blur-xs text-[#71717A] hover:text-[#002E62] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                            aria-label="More options"
                        >
                            <FiMoreHorizontal className="h-4 w-4" />
                        </button>

                        {/* Dropdown Menu (Frame 2147224189) */}
                        {isMenuOpen && (
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-full mt-1.5 w-32 bg-white rounded-xl border border-[#E0E8F2] shadow-xl py-1.5 z-30 animate-[fadeIn_.15s_ease-out]"
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onEdit?.(property);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-[#091E42] hover:bg-[#F0F6FF] hover:text-[#002E62] font-medium flex items-center gap-2 transition-colors cursor-pointer text-left"
                                >
                                    <FiEdit className="h-3.5 w-3.5 text-[#002E62]" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        onDelete?.(property);
                                    }}
                                    className="w-full px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 font-medium flex items-center gap-2 transition-colors cursor-pointer text-left"
                                >
                                    <FiTrash2 className="h-3.5 w-3.5 text-red-600" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                    {/* Title & Price */}
                    <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#002E62]">
                            {property.title}
                        </h4>
                        <p className="text-sm font-bold text-[#091E42]">
                            {property.price}
                        </p>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-[#71717A]">
                        <FiMapPin className="h-3.5 w-3.5 text-[#71717A] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{property.location}</span>
                    </div>

                    {/* Features Section */}
                    <div className="pt-2 border-t border-[#F1F5F9] space-y-2">
                        <h5 className="text-xs font-semibold text-[#002E62]">Features</h5>
                        <div className="grid grid-cols-2 gap-2">
                            {property.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-xs text-[#52525B]">
                                    <div className="h-4 w-4 rounded-full bg-[#EDFCF4] text-[#12B76A] flex items-center justify-center shrink-0">
                                        <FiCheck className="h-2.5 w-2.5 stroke-[2.5]" />
                                    </div>
                                    <span className="truncate">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
