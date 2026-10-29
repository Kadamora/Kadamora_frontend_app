import { useState } from 'react';
import type { ListingPricingCardData } from '../../types/listingDetailsTypes';

interface HTListingPricingSidebarProps {
    title?: string;
    data: ListingPricingCardData | ListingPricingCardData[];
}

export default function HTListingPricingSidebar({ title, data }: HTListingPricingSidebarProps) {
    const cards = Array.isArray(data) ? data : [data];
    const defaultIndex = cards.findIndex((c) => c.isDefault);
    const [selectedIdx, setSelectedIdx] = useState<number>(defaultIndex !== -1 ? defaultIndex : 0);

    return (
        <aside className="w-full space-y-4">
            {title && (
                <h3 className="text-lg sm:text-xl font-bold text-[#002E62] px-1">{title}</h3>
            )}

            <div className="space-y-4">
                {cards.map((card, idx) => {
                    const isSelected = selectedIdx === idx;
                    const isFree = card.price.toLowerCase().includes('free');

                    return (
                        <div
                            key={card.id || idx}
                            onClick={() => setSelectedIdx(idx)}
                            className={`bg-white rounded-2xl p-6 sm:p-7 transition-all cursor-pointer shadow-2xs space-y-4 border ${
                                isSelected
                                    ? 'border-[#359F6A] ring-1 ring-[#359F6A]/20 bg-[#F5FBF7]/30'
                                    : 'border-[#E4E4E7] hover:border-slate-300'
                            }`}
                        >
                            {/* Header: Title & Price */}
                            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                                <h4 className="text-sm sm:text-base font-bold text-[#101828]">
                                    {card.title}
                                </h4>
                                <span
                                    className={`text-xs sm:text-sm font-extrabold ${
                                        isFree ? 'text-[#359F6A]' : 'text-[#00A63E]'
                                    }`}
                                >
                                    {card.price}
                                </span>
                            </div>

                            {/* Perk List */}
                            <ul className="space-y-2 text-xs text-[#52525B]">
                                {card.perks.map((perk, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                        <span className="text-slate-400 font-bold">•</span>
                                        <span>{perk}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Optional CTA */}
                            {card.ctaLabel && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (card.ctaAction) card.ctaAction();
                                    }}
                                    className="mt-4 w-full bg-[#002E62] hover:bg-[#072440] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer shadow-2xs"
                                >
                                    {card.ctaLabel}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
