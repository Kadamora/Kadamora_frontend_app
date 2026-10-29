import { FiChevronRight } from 'react-icons/fi';
import type { ArtisanCategory, ServiceCategoryItem } from '../../types/services';

interface ServicesCategoryCardsProps {
    categories: ServiceCategoryItem[];
    onSelectCategory: (category: ArtisanCategory) => void;
    onAddArtisan: () => void;
}

export default function ServicesCategoryCards({
    categories,
    onSelectCategory,
    onAddArtisan,
}: ServicesCategoryCardsProps) {
    const getCategoryIcon = (id: ArtisanCategory) => {
        switch (id) {
            case 'Plumbers':
                return <img src="/assets/icons/PMPlumbing.svg" alt="Plumbers" className="w-11 h-11 shrink-0" />;
            case 'Electricians':
                return <img src="/assets/icons/PMElectrical.svg" alt="Electricians" className="w-11 h-11 shrink-0" />;
            case 'HVAC':
                return <img src="/assets/icons/PMHvac.svg" alt="HVAC" className="w-11 h-11 shrink-0" />;
            case 'Mechanics':
                return <img src="/assets/icons/PMGeneral.svg" alt="Mechanics" className="w-11 h-11 shrink-0" />;
            default:
                return <img src="/assets/icons/PMGeneral.svg" alt="General" className="w-11 h-11 shrink-0" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header: Title and Action CTA */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#002E62]">Artisans</h2>
                <button
                    type="button"
                    onClick={onAddArtisan}
                    className="bg-[#002E62] hover:bg-[#002047] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                >
                    Add New Artisan
                </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className="bg-white border border-[#E0E8F2] rounded-2xl p-5 hover:shadow-md hover:border-[#BED3EB] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelectCategory(cat.id);
                            }
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="shrink-0">
                                {getCategoryIcon(cat.id)}
                            </div>
                            <FiChevronRight className="w-5 h-5 text-[#71717A] group-hover:text-[#002E62] group-hover:translate-x-1 transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <h3 className="text-sm font-bold text-[#18181B] group-hover:text-[#002E62] transition-colors">
                                {cat.title}
                            </h3>
                            <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3">
                                {cat.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
