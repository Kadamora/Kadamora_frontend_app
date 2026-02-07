import React, { useState, useEffect } from 'react';

interface Ad {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
    badge?: string;
    tag?: string;
}

interface AdsWidgetProps {
    ads: Ad[];
}

const AdsWidget: React.FC<AdsWidgetProps> = ({ ads }) => {
    // Show 2 ads at a time
    const ADS_PER_PAGE = 2;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Rotate every 1 hour (3600000 ms)
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + ADS_PER_PAGE;
                // Loop back to start if we reach end
                return nextIndex >= ads.length ? 0 : nextIndex;
            });
        }, 3600000); 

        return () => clearInterval(interval);
    }, [ads.length]);

    // Get current pair of ads
    const currentAds = ads.slice(currentIndex, currentIndex + ADS_PER_PAGE);

    if (ads.length === 0) return null;

    return (
        <div className="flex flex-col gap-6 sticky top-24">
            {currentAds.map((ad) => (
                <div key={ad.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 overflow-hidden">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                        <img 
                            src={ad.image} 
                            alt={ad.title} 
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                        {/* Ads Badge */}
                        <div className="absolute top-3 left-3 bg-[#B20000] text-white text-xs font-bold px-3 py-1 rounded-full">
                            Ads
                        </div>
                    </div>
                    
                    <div className="px-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[#091E42] font-bold text-base">{ad.title}</h3>
                            {ad.tag && (
                                <span className="text-[#008A45] bg-[#E3FCEF] text-xs font-semibold px-3 py-1 rounded-full border border-[#008A45]/20">
                                    {ad.tag}
                                </span>
                            )}
                        </div>
                        
                        <div className="text-[#172B4D] font-medium text-sm mb-2">{ad.price}</div>
                        
                        <p className="text-[#5E6C84] text-xs leading-relaxed line-clamp-3">
                            {ad.description}
                        </p>
                    </div>
                </div>
            ))}
            
            {/* Disclaimer or navigation dots could go here if requested, but not in spec */}
        </div>
    );
};

export default AdsWidget;
