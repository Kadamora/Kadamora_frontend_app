import { Link } from 'react-router';
import { FiCheck } from 'react-icons/fi';
import { FM_HOME_SERVICES } from '../data/landingData';

export default function FMHomeServices() {
    return (
        <section className="py-14 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#002E62] tracking-tight">
                        Home Services Made Easy
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed">
                        From Laundry To Groceries, We Handle All Your Daily Needs So You Can Focus On What Matters Most.
                    </p>
                </div>

                {/* 3-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-10 sm:mt-12">
                    {FM_HOME_SERVICES.map((service, index) => {
                        const isThird = index === 2;
                        return (
                            <div
                                key={service.id}
                                className="rounded-lg border border-[#E4E4E7] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col "
                            >
                                <div >
                                    {/* Card Header Image */}
                                    <div className="h-36 sm:h-40 w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Card Content */}
                                    <div className="px-4 sm:px-5 pb-4 pt-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-[#002E62]">
                                            {service.title}
                                        </h3>
                                        <p className=" text-xs text-[#64748B] leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="pt-1">
                                            <h4 className="text-xs font-semibold text-[#002E62] mb-1">
                                                Features
                                            </h4>
                                            <ul className="space-y-1.5">
                                                {service.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-center gap-2.5 text-xs text-[#475569]"
                                                    >
                                                        <span className="h-4 w-4 rounded-full border border-[#12B76A] flex items-center justify-center shrink-0 text-[#12B76A]">
                                                            <FiCheck className="h-2.5 w-2.5 stroke-[3]" />
                                                        </span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Bottom CTA */}
                                <div className="px-4 sm:px-5 pt-0 pb-4 mt-0">
                                    <Link
                                        to={service.ctaLink}
                                        className={`inline-flex items-center justify-center w-fit px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer shadow-xs ${
                                            isThird
                                                ? 'bg-[#7186A0] hover:bg-[#5A6F87] text-white'
                                                : 'bg-[#002E62] hover:bg-[#0A2540] text-white'
                                        }`}
                                    >
                                        {service.ctaText}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
