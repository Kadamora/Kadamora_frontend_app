import React, { useEffect, useRef, useState } from 'react';
import CardMenuItem from './CardMenuItem';
import DeleteConfirmationModal from '@shared/components/Modal/DeleteConfirmationModal';
import { Users } from 'lucide-react';

export interface PropertyCard2Props {
    id: number | string;
    name: string;
    address?: string;
    tenantCount?: number | string;
    onEdit?: (id: number | string) => void;
    onAddTenant?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
    className?: string;
}

const PropertyCard2: React.FC<PropertyCard2Props> = ({
    id,
    name,
    address,
    tenantCount,
    onEdit,
    onAddTenant,
    onDelete,
    className = '',
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const firstItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        }

        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setMenuOpen(false);
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClick);
            document.addEventListener('keydown', handleKey);
            setTimeout(() => firstItemRef.current?.focus(), 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [menuOpen]);

    const tenantsIcon = (
        <span className="h-10 w-10 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center shrink-0">
            <Users className="h-4 w-4 text-[#002E62]" />
        </span>
    );

    return (
        <>
            <article
                data-id={id}
                className={`rounded-lg border border-[#BED3EB] bg-white p-5 relative group flex flex-col justify-between transition-all duration-200 ease-in-out hover:bg-[#F8FBFF] hover:border-[#BEE7FF] hover:-translate-y-1 hover:shadow-md ${
                    menuOpen ? 'z-40' : 'hover:z-10'
                } ${className}`}
            >
                {/* three-dot menu */}
                <div className="absolute top-4 right-4 text-[#6B7280]">
                    <div className="relative inline-block" ref={menuRef}>
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            aria-controls={`prop-menu-${id}`}
                            onClick={() => setMenuOpen((s) => !s)}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Open property actions"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <circle cx="5" cy="12" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="19" cy="12" r="1.5" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div
                                id={`prop-menu-${id}`}
                                role="menu"
                                aria-orientation="vertical"
                                className="absolute right-0 mt-2 w-[160px] bg-white border border-[#E6EEF7] rounded-md shadow-lg ring-1 ring-black/5 py-1 z-50 overflow-hidden"
                            >
                                <CardMenuItem
                                    ref={firstItemRef}
                                    label="Edit Property"
                                    iconSrc="/assets/icons/pen-line.svg"
                                    iconAlt="Edit Property"
                                    onActivate={() => {
                                        setMenuOpen(false);
                                        onEdit?.(id);
                                    }}
                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                />

                                <CardMenuItem
                                    label="Add Tenant"
                                    iconSrc="/assets/icons/plus.svg"
                                    iconAlt="Add Tenant"
                                    onActivate={() => {
                                        setMenuOpen(false);
                                        onAddTenant?.(id);
                                    }}
                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                />

                                <CardMenuItem
                                    label="Delete Property"
                                    iconSrc="/assets/icons/trash-2.svg"
                                    iconAlt="Delete"
                                    onActivate={() => {
                                        setMenuOpen(false);
                                        setShowDeleteConfirm(true);
                                    }}
                                    className="text-red-600 hover:bg-red-50"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <h3 className="text-[18px] font-semibold text-[#002E62] mb-1 pr-8">{name}</h3>
                    <p className="text-[13px] text-[#6B7280] mb-4">{address}</p>
                </div>

                <div className="flex items-center gap-3 pt-2 ">
                    {tenantsIcon}
                    <div>
                        <div className="text-[15px] font-medium text-[#001731] leading-tight">
                            {tenantCount?.toString().padStart(3, '0')}
                        </div>
                        <div className="text-[12px] text-[#6B7280]">Tenants</div>
                    </div>
                </div>
            </article>

            {/* delete confirmation modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={() => {
                    onDelete?.(id);
                    setShowDeleteConfirm(false);
                }}
            />
        </>
    );
};

export default PropertyCard2;
