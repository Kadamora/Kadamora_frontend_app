import { Link } from 'react-router';

export default function FMHero() {
    return (
        <section className="relative w-full pt-24 pb-10 sm:pt-30 sm:pb-12 md:pb-12 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading & Subtitle */}
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl max-w-2xl mx-auto font-extrabold text-[#002E62] leading-normal">
                        Seamless Control For Your Estate Facility.
                    </h1>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                        Transform Your Property Management Experience With Kadamora's Comprehensive Platform. From Residential To Commercial Spaces, We've Got Everything Covered.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-3 flex justify-center">
                        <Link
                            to="/facility-management/dashboard"
                            className="inline-flex items-center justify-center bg-[#002E62] hover:bg-[#0A2540] text-white px-7 sm:px-8 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="mt-2 sm:mt-3 w-full mx-auto">
                    <div className="relative w-full flex justify-center items-center">
                        <img
                            src="/assets/icons/FMHero.svg"
                            alt="Seamless Control For Your Estate Facility"
                            className="w-full h-auto max-h-[500px] object-contain drop-shadow-md select-none"
                            loading="eager"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
