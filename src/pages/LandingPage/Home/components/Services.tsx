
import Service from '@components/cards/service/Service';
import { fakeDb } from '@components/fakeDB/fakeDb';
import { useRef } from 'react';

export default function Services() {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const scrollBy = (delta: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        const amount = Math.max(200, Math.round(el.clientWidth * 0.8));
        el.scrollBy({ left: delta * amount, behavior: 'smooth' });
    };
    console.log(scrollBy)

    return (
        <section className="pt-8 lg:pt-16 bg-[#f7f8fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className=" max-w-[400px] w-full">
                           <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-4">Our Service</h2>
                        <p className="text-gray-600">
                            Discover how Kadamora is transforming real estate management with our integrated suite of services. From property listings to property managements, we've got you covered.
                    </p>
                </div>

                {/* Services Carousel Container */}
                <div className="relative">
                    {/* Scrollable Services Container */}
                    <div ref={scrollerRef} className="w-full scrollbar-hide scroll-smooth">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4" style={{ width: 'max-content' }}>
                            {fakeDb.services.map((service) => (
                                <Service key={service.id} service={service} />
                            ))}
                        </div>
                    </div>
                </div>
                    {/* Navigation Buttons */}
                    {/* <div className="flex justify-end items-center mt-6.25">
                        <div className="mr-3.75">
                            <button
                                onClick={() => scrollBy(-1)}
                                aria-label="Scroll left"
                                className="w-12 h-12 bg-white rounded-full border border-[#BABABA] flex items-center justify-center transition-colors duration-150 active:scale-95 group hover:border-[#43CC88] hover:bg-[#E6FAF3] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <svg
                                    className="w-6 h-6 text-[#BABABA] group-hover:text-[#43CC88] transition-transform duration-150 group-active:-translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="">
                            <button
                                onClick={() => scrollBy(1)}
                                aria-label="Scroll right"
                                className="w-12 h-12 bg-white rounded-full border border-[#BABABA] flex items-center justify-center hover:bg-[#E6FAF3] transition-colors duration-150 active:scale-95 group hover:border-[#43CC88] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                            >
                                <svg
                                    className="w-6 h-6 text-[#BABABA] group-hover:text-[#43CC88] transition-transform duration-150 group-active:translate-x-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
