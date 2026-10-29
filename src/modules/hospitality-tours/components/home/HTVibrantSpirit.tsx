interface HTVibrantSpiritProps {
    className?: string;
}

export default function HTVibrantSpirit({ className = '' }: HTVibrantSpiritProps) {
    return (
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading, Description & Pool Lounge Image */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002E62] leading-relaxed">
                            Discover Nigeria&apos;s Vibrant <br className="hidden sm:inline" />
                            Spirit Through Kadamora
                        </h2>
                        <p className="text-xs text-[#666666] leading-relaxed">
                            Uncover The Beauty Of Nigeria Through Its Colorful Festivals, Bustling Cities,
                            Peaceful Parks, And Rich Cultural Heritage. Whether You&apos;re Seeking Adventure,
                            Relaxation, Or Inspiration, Nigeria Offers Experiences That Captivate Every Traveler.
                        </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-72 sm:h-84 group bg-slate-100">
                        <img
                            src="/assets/images/HTVibrant1.png"
                            alt="Traveler relaxing with laptop by pool"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Right Column: Two stacked showcase images */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-56 sm:h-64 group bg-slate-100">
                        <img
                            src="/assets/images/HTVibrant2.png"
                            alt="Luxury resort pool and lounge chairs"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                    </div>

                    {/* Bottom: Celebration concert / festival silhouettes */}
                    <div className="relative rounded-2xl overflow-hidden shadow-lg h-56 sm:h-64 group bg-slate-100">
                        <img
                            src="/assets/images/HTVibrant3.png"
                            alt="People celebrating at festival event"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
