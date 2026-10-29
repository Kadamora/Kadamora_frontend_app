import { useState, useEffect, useMemo } from 'react';
import HTHeroSearch from './HTHeroSearch';
import HTCategoryBar from './HTCategoryBar';

interface HTHomeHeroProps {
    onSearch?: (query: string) => void;
}

interface HTHeroSlide {
    id: string;
    src: string;
    alt: string;
}

const SLIDE_DURATION = 5000;

export default function HTHomeHero({ onSearch }: HTHomeHeroProps) {
    const slides = useMemo<HTHeroSlide[]>(
        () => [
            {
                id: 'cultural-iyalode',
                src: '/assets/images/ht_hero_slide_1.jpg',
                alt: 'Nigerian cultural festival celebration with traditional dancers',
            },
            {
                id: 'beach-resort',
                src: '/assets/images/ht_hero_slide_2.png',
                alt: 'Breathtaking beach resort with tropical palm trees and sun loungers',
            },
            {
                id: 'pool-party',
                src: '/assets/images/ht_hero_slide_3.png',
                alt: 'Vibrant outdoor pool party and day club celebration in Nigeria',
            },
            {
                id: 'joyful-carnival',
                src: '/assets/images/ht_hero_slide_4.png',
                alt: 'Joyous cultural festival carnival dancing and music',
            },
        ],
        [],
    );

    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance carousel every 5s
    useEffect(() => {
        if (slides.length <= 1) return undefined;
        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
        return () => window.clearInterval(interval);
    }, [slides.length]);

    const handleSelectSlide = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative w-full">
            {/* Background Carousel Hero Banner */}
            <div className="relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] w-full flex flex-col justify-end pt-28 pb-14 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
                {/* Background Carousel Slides with overflow-hidden */}
                <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                    isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                                }`}
                            >
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className={`w-full h-full object-cover transition-transform duration-3000 ease-in-out ${
                                        isActive ? 'scale-100' : 'scale-105'
                                    }`}
                                />
                                {/* Gradient Overlay for high-contrast legible text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/50 lg:to-black/30" />
                            </div>
                        );
                    })}
                </div>

                {/* Right-Side Vertical Slide Indicator Circles */}
                {slides.length > 1 && (
                    <div className="absolute right-4 sm:right-6 lg:right-8 top-[40%] -translate-y-1/2 z-20 flex flex-col gap-3">
                        {slides.map((slide, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button
                                    key={slide.id}
                                    type="button"
                                    onClick={() => handleSelectSlide(index)}
                                    className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
                                    aria-label={`Show slide ${index + 1} of ${slides.length}`}
                                    aria-pressed={isActive}
                                >
                                    <span
                                        className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border transition-all duration-300 ${
                                            isActive
                                                ? 'border-[#00D26A] bg-black/50 shadow-[0_0_0_4px_rgba(0,210,106,0.25)]'
                                                : 'border-white/50 bg-black/30 hover:border-white/80'
                                        }`}
                                    >
                                        <span
                                            className={`rounded-full transition-colors duration-300 ${
                                                isActive ? 'h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#00D26A]' : 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/40'
                                            }`}
                                        />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Foreground Content: Heading & Search Row sitting directly above the Category Card */}
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8">
                        {/* Left: Heading */}
                        <div className="lg:w-auto shrink-0">
                            <h1 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-black text-white leading-normal drop-shadow-md">
                                Experience Nigeria&apos;s <br />
                                Rich Culture
                            </h1>
                        </div>

                        {/* Right: Subtitle & Search Bar */}
                        <div className="max-w-xl w-full space-y-2 sm:space-y-2.5 lg:pb-1">
                            <p className="text-xs sm:text-[13px] md:text-sm text-white/95 leading-relaxed drop-shadow-xs font-normal">
                                Experience the heart of nigeria by uncovering its most captivating festivals,
                                thrilling events, and unforgettable destinations waiting to be explored.
                            </p>
                            <HTHeroSearch
                                onSearch={onSearch}
                                placeholder="Search destinations, events, festivals..."
                                
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Category Bar: exactly half on the hero image and half on the white section below */}
            <div className="relative z-20 -mt-12 sm:-mt-14 lg:-mt-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <HTCategoryBar />
            </div>
        </div>
    );
}
