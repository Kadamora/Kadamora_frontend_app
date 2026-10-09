import React from 'react';

interface HTListingAboutSectionProps {
    title?: string;
    paragraphs: string[];
    locationMap?: {
        address: string;
        mapImageUrl?: string;
    };
}

export default function HTListingAboutSection({
    title = 'About This Destination',
    paragraphs,
    locationMap,
}: HTListingAboutSectionProps) {
    return (
        <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">{title}</h3>
                <div className="space-y-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {paragraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>
            </div>

            {/* Location Map Card */}
            <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">Location</h3>
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                    <img
                        src={locationMap?.mapImageUrl || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80'}
                        alt="Location Map"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-[#101828] shadow-xs">
                        📍 {locationMap?.address || 'Idanre, Ondo State'}
                    </div>
                </div>
            </div>
        </div>
    );
}
