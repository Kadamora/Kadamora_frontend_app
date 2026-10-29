import { HT_HERO_CATEGORIES } from '../../data/hospitalityLandingData';

interface HTCategoryBarProps {
    className?: string;
}

export default function HTCategoryBar({ className = '' }: HTCategoryBarProps) {
    return (
        <div
            className={`bg-white rounded-lg border border-slate-200/80  p-4 sm:p-5 lg:px-8 lg:py-5 max-w-7xl mx-auto w-full shadow-md ${className}`}
        >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                {/* Title (2 lines) */}
                <div className="lg:w-44 shrink-0 lg:border-r lg:border-slate-100 lg:pr-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#52525B] leading-tight tracking-tight">
                        Explore Our <br className="hidden lg:block" />
                        Category
                    </h2>
                </div>

                {/* 4 Categories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-1">
                    {HT_HERO_CATEGORIES.map((cat) => (
                        <div
                            key={cat.id}
                            className="group flex flex-col items-start p-1.5 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer"
                        >
                            <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform mb-2">
                                {cat.icon}
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#002E62]">
                                {cat.title}
                            </h3>
                            <p className="text-[11px] text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                                {cat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
