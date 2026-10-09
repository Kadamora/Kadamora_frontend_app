import React from 'react';
import type { ListingGalleryPhoto } from '../../types/listingDetailsTypes';

interface HTListingGallerySectionProps {
    title?: string;
    photos: ListingGalleryPhoto[];
}

export default function HTListingGallerySection({
    title = 'Park Gallery',
    photos,
}: HTListingGallerySectionProps) {
    const heroPhoto = photos.find((p) => p.isHero) || photos[0];
    const subPhotos = photos.filter((p) => p.id !== heroPhoto?.id);

    return (
        <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#002E62]">{title}</h3>

            <div className="space-y-4">
                {/* Hero Photo Top */}
                {heroPhoto && (
                    <div className="w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-slate-100 shadow-2xs group relative">
                        <img
                            src={heroPhoto.url}
                            alt={heroPhoto.caption || title}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        {heroPhoto.caption && (
                            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-md text-xs text-white">
                                {heroPhoto.caption}
                            </div>
                        )}
                    </div>
                )}

                {/* Sub Photos Grid Bottom */}
                {subPhotos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subPhotos.map((photo) => (
                            <div
                                key={photo.id}
                                className="w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100 shadow-2xs group relative"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.caption || title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {photo.caption && (
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-md text-xs text-white">
                                        {photo.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
