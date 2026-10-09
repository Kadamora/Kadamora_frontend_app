import React from 'react';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiEdit2, FiTrash2 } from 'react-icons/fi';
import type { ListingMetadataBadge, CountdownTimerData } from '../../types/listingDetailsTypes';

interface HTListingHeroBannerProps {
    title: string;
    heroTitle?: string;
    description: string;
    coverImage: string;
    metadata: ListingMetadataBadge[];
    countdown?: CountdownTimerData;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function HTListingHeroBanner({
    title,
    heroTitle,
    description,
    coverImage,
    metadata,
    countdown,
    onEdit,
    onDelete,
}: HTListingHeroBannerProps) {
    const renderIcon = (meta: ListingMetadataBadge) => {
        if (meta.customIcon) return meta.customIcon;
        switch (meta.icon) {
            case 'location':
                return <FiMapPin className="h-4 w-4 shrink-0 text-white/80" />;
            case 'calendar':
                return <FiCalendar className="h-4 w-4 shrink-0 text-white/80" />;
            case 'time':
                return <FiClock className="h-4 w-4 shrink-0 text-white/80" />;
            case 'attendance':
                return <FiUsers className="h-4 w-4 shrink-0 text-white/80" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Top Bar: Title & Edit/Delete Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#002E62]">{title}</h1>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                    {onEdit && (
                        <button
                            type="button"
                            onClick={onEdit}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#002E62] bg-white border border-[#002E62]/30 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                        >
                            <FiEdit2 className="h-4 w-4" />
                            <span>Edit Listing</span>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            type="button"
                            onClick={onDelete}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#E11D48] bg-[#FFF1F2] border border-[#FECDD3] rounded-lg hover:bg-[#FFE4E6] transition-colors shadow-2xs cursor-pointer"
                        >
                            <FiTrash2 className="h-4 w-4" />
                            <span>Delete Listing</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Hero Image Banner with Gradient Overlay & Content */}
            <div className="relative w-full rounded-2xl overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[400px] shadow-sm flex flex-col justify-end p-6 sm:p-10 text-white">
                {/* Background Image */}
                <img
                    src={coverImage}
                    alt={heroTitle || title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Dark Gradient Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Banner Content Container */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    {/* Left: Text & Metadata */}
                    <div className="space-y-3 max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                            {heroTitle || title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed max-w-2xl">
                            {description}
                        </p>

                        {/* Metadata Chips (Location, Date, Time, Attendance) */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm font-medium text-slate-200">
                            {metadata.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {renderIcon(item)}
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Countdown Timer (matching Screenshot 2) */}
                    {countdown && (
                        <div className="shrink-0 flex items-center gap-4 sm:gap-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/20">
                            <div className="text-center">
                                <span className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                                    {String(countdown.days).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 mt-1 block">
                                    DAYS
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                                    {String(countdown.hours).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 mt-1 block">
                                    HOURS
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                                    {String(countdown.minutes).padStart(2, '0')}
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200 mt-1 block">
                                    MINUTES
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
