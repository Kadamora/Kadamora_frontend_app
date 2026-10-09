import React from 'react';
import { FaStar } from 'react-icons/fa';
import type { ListingReviewItem } from '../../types/listingDetailsTypes';

interface HTListingReviewsSectionProps {
    title?: string;
    reviews: ListingReviewItem[];
}

export default function HTListingReviewsSection({
    title = 'Park Review',
    reviews,
}: HTListingReviewsSectionProps) {
    const getInitials = (name: string) => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">{title}</h3>

            <div className="space-y-4">
                {reviews.map((rev) => (
                    <div
                        key={rev.id}
                        className="bg-[#F7F7FD] border border-slate-100 rounded-xl p-5 space-y-3"
                    >
                        {/* Header: Avatar, Name/Email & Rating */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                {/* Avatar Initials Circle */}
                                <div className="h-10 w-10 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#002E62] font-semibold text-xs sm:text-sm flex items-center justify-center shrink-0">
                                    {getInitials(rev.authorName)}
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                                        {rev.authorName}
                                    </h4>
                                    <p className="text-[11px] sm:text-xs text-slate-500">
                                        {rev.authorEmail}
                                    </p>
                                </div>
                            </div>

                            {/* Star Rating Badge */}
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-xs font-semibold shrink-0">
                                <FaStar className="h-3 w-3 text-amber-400" />
                                <span>{rev.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        {/* Comment Text */}
                        <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                            {rev.comment}
                        </p>

                        {/* Date */}
                        <p className="text-[11px] sm:text-xs text-slate-500 font-medium pt-1">
                            {rev.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
