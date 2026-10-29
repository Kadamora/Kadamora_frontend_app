import { Link } from 'react-router';

interface HTAdventureBannerProps {
    className?: string;
}

export default function HTAdventureBanner({ className = '' }: HTAdventureBannerProps) {
    return (
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            <div className="relative rounded-xl bg-gradient-to-r from-[#016630] to-[#00A63E] flex flex-col md:flex-row items-center justify-between min-h-[320px]">
                {/* Background decorative pattern overlay */}
                <img
                    src="/assets/images/HTReady1.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Left Text & Actions */}
                <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl text-white ">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
                        Ready To Start <br />
                        Your Adventure?
                    </h2>
                    <p className="text-sm text-[#DCFCE7] leading-relaxed font-normal mt-1">
                        Join thousands of travelers discovering Nigeria&apos;s hidden gems.
                    </p>
                    <div className="flex flex-wrap items-center gap-3.5 pt-5">
                        <Link
                            to="/hospitality-tours/explore"
                            className="bg-white text-[#00A63E] hover:bg-slate-50 px-6 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium shadow-xs transition-colors"
                        >
                            Explore Now
                        </Link>
                        <Link
                            to="/auth/signup"
                            className="border border-white/80 text-white hover:bg-white/10 px-6 py-2.5 rounded-[8px] text-xs sm:text-sm font-medium transition-colors"
                        >
                            List Your Business
                        </Link>
                    </div>
                </div>

                {/* Right Hero Woman Image */}
                <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-[360px] w-[380px] sm:h-[400px] sm:w-[430px] md:h-[430px] md:w-[480px] ">
                    <img
                        src="/assets/images/HTReady2.svg"
                        alt="Happy traveler using smartphone"
                        className="h-full w-full object-contain object-bottom"
                    />
                </div>
            </div>
        </div>
    );
}
