import { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { reviews as mockReviews } from '@modules/hospitality-tours/data/mock';
import type { Review } from '@modules/hospitality-tours/types';

const BUSINESS_OPTIONS = [
    { value: 'all', label: 'All Businesses' },
    { value: 'Ojude Oba Festival', label: 'Ojude Oba Festival' },
    { value: 'Ojaja Park', label: 'Ojaja Park' },
    { value: 'Beach Resort', label: 'Beach Resort' },
];

const LISTING_OPTIONS = [
    { value: 'all', label: 'All Listing' },
    { value: 'Event & Festive', label: 'Event & Festive' },
    { value: 'Park & Destination', label: 'Park & Destination' },
];

function formatReviewDate(iso: string): string {
    const d = new Date(iso);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

export default function HTReviewsPage() {
    const [search, setSearch] = useState('');
    const [businessFilter, setBusinessFilter] = useState('all');
    const [listingFilter, setListingFilter] = useState('all');

    const filteredReviews = useMemo(() => {
        return mockReviews.filter((r) => {
            const matchesSearch =
                r.author.toLowerCase().includes(search.toLowerCase()) ||
                r.listing.toLowerCase().includes(search.toLowerCase()) ||
                r.body.toLowerCase().includes(search.toLowerCase());
            const matchesBusiness =
                businessFilter === 'all' || r.listing === businessFilter;
            const matchesListing =
                listingFilter === 'all' || r.category === listingFilter;
            return matchesSearch && matchesBusiness && matchesListing;
        });
    }, [search, businessFilter, listingFilter]);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#002E62]">Reviews</h1>
                <p className="text-sm text-[#52525B] mt-1">
                    Choose the type of listing you want to create on Kadamora and start reaching thousands of travelers
                </p>
            </div>

            {/* Reviews Card */}
            <div className="bg-white border border-[#BED3EB] rounded-xl overflow-hidden">
                {/* Toolbar: Title, Search & Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-6 sm:py-5 border-b border-[#E4E4E7] bg-white">
                    <h3 className="text-sm text-[#1E262A] whitespace-nowrap">
                        RECENT REVIEW
                    </h3>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 sm:w-52">
                            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3F3F46]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E0DEF7] rounded-[5px] text-slate-800 placeholder-[#3F3F46] focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                            />
                        </div>

                        {/* Business Filter */}
                        <div className="relative">
                            <select
                                value={businessFilter}
                                onChange={(e) => setBusinessFilter(e.target.value)}
                                className="appearance-none pl-4 pr-9 py-2 text-xs sm:text-sm font-medium bg-[#F3F9FF] border border-[#cce3fd] rounded-[5px] text-[#002E62] cursor-pointer focus:outline-none transition-all"
                            >
                                {BUSINESS_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002E62] pointer-events-none" />
                        </div>

                        {/* Listing Filter */}
                        <div className="relative">
                            <select
                                value={listingFilter}
                                onChange={(e) => setListingFilter(e.target.value)}
                                className="appearance-none pl-4 pr-9 py-2 text-xs sm:text-sm font-medium bg-[#F3F9FF] border border-[#cce3fd] rounded-[5px] text-[#002E62] cursor-pointer focus:outline-none transition-all"
                            >
                                {LISTING_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002E62] pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Review Items */}
                <div className="divide-y divide-[#E4E4E7]">
                    {filteredReviews.map((review) => (
                        <ReviewRow key={review.id} review={review} />
                    ))}

                    {filteredReviews.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <p className="text-sm text-slate-400">No reviews match your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------- Individual Review Row ---------- */

function ReviewRow({ review }: { review: Review }) {
    return (
        <div className="px-6 py-5 space-y-2.5">
            {/* Top row: Author info + rating */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="text-sm font-bold text-[#002E62]">{review.author}</h4>
                    <p className="text-xs text-[#52525B] mt-0.5">{review.listing}</p>
                </div>

                {/* Star Rating */}
                <div className="inline-flex items-center gap-1 shrink-0">
                    <FaStar className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-[#002E62]">{review.rating.toFixed(1)}</span>
                </div>
            </div>

            {/* Review Body */}
            <p className="text-xs sm:text-[13px] text-[#52525B] leading-relaxed">
                {review.body} Massa commodo in sed mattis.{review.body.split('.').slice(0, 3).join('.')}. Nibo odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec
            </p>

            {/* Bottom row: Category tag + date */}
            <div className="flex items-center justify-between gap-4 pt-1">
                <span className="inline-block px-3 py-1 text-[11px] font-semibold text-[#002E62] bg-[#EBF3FF] rounded-md">
                    {review.category}
                </span>

                <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-[#002E62]">
                        {formatReviewDate(review.date)}
                    </p>
                    <p className="text-[10px] text-[#94A3B8]">Review Date</p>
                </div>
            </div>
        </div>
    );
}
