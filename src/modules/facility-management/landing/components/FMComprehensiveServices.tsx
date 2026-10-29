import { FM_COMPREHENSIVE_SERVICES } from '../data/landingData';

export default function FMComprehensiveServices() {
    return (
        <section className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-xl mx-auto">
                    <h2 className="  text-2xl sm:text-3xl md:text-4xl font-bold text-[#002E62] tracking-tight">
                        Comprehensive Facility Management
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#64748B]  mx-auto leading-relaxed">
                        Everything You Need To Manage Residential And Commercial Properties Efficiently, From Maintenance To Security, All In One Integrated Platform.
                    </p>
                </div>

                {/* 8 Features Grid  */}
                <div className="flex flex-wrap justify-center gap-y-12 sm:gap-y-14 gap-x-6 sm:gap-x-10 max-w-6xl mx-auto mt-10 sm:mt-12">
                    {FM_COMPREHENSIVE_SERVICES.map((service) => (
                        <div
                            key={service.id}
                            className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-sm flex flex-col items-center text-center px-4 "
                        >
                            {/* Icon badge */}
                            <div className="w-15 h-15 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src={service.icon}
                                    alt={service.title}
                                    className="w-12 h-12 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="mt-2 text-sm sm:text-base font-bold text-[#002E62] ">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-1 text-xs text-[#64748B] leading-relaxed max-w-[280px]">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
