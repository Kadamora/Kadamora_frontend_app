import { useState } from 'react';
import { FiVideo, FiPlay } from 'react-icons/fi';
import type { SecuritySystem } from '../../../types/commercialFacilities';

interface LiveCameraFeedCardProps {
    system: SecuritySystem;
    onPreview: (system: SecuritySystem) => void;
}

export default function LiveCameraFeedCard({
    system,
    onPreview,
}: LiveCameraFeedCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            onClick={() => onPreview(system)}
            className="group relative h-48 sm:h-52 w-full rounded-xl overflow-hidden border border-[#E0E8F2] bg-[#F4F6F9] cursor-pointer shadow-xs hover:shadow-md transition-all duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onPreview(system);
                }
            }}
            aria-label={`View live camera feed for ${system.id} - ${system.name}`}
        >
            {/* Background Camera Image */}
            <img
                src={system.imageUrl}
                alt={system.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Shimmer skeleton if loading */}
            {!imageLoaded && (
                <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            )}

            {/* Subtle dark gradient for contrast */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Top-Left Camera ID Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-white/60">
                <FiVideo className="w-3.5 h-3.5 text-[#002E62]" />
                <span className="text-[11px] font-bold text-[#002E62] tracking-wide">
                    {system.id}
                </span>
            </div>

            {/* Top-Right Live Indicator Dot */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12B76A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#12B76A]" />
                </span>
            </div>

            {/* Hover Play Button Overlay */}
            <div className="absolute inset-0 bg-[#002E62]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 text-white">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#002E62] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <FiPlay className="w-5 h-5 ml-0.5 fill-[#002E62]" />
                </div>
                <span className="text-[11px] font-semibold text-white drop-shadow-sm mt-1">
                    Click to Preview
                </span>
            </div>

            {/* Bottom info strip on hover */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white/90 drop-shadow-xs pointer-events-none">
                <span className="text-[11px] font-medium truncate max-w-[70%]">
                    {system.name}
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-black/50 text-white/90">
                    {system.resolution}
                </span>
            </div>
        </div>
    );
}
