import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import {
    HT_EXPLORE_CATEGORIES,
    HT_EXPLORE_LOCATIONS,
} from '../../data/hospitalityLandingData';

import HTFilterCard from './HTFilterCard';
import HTFilterChip from './HTFilterChip';

interface HTFilterSidebarProps {
    selectedCategory?: string;
    selectedLocation?: string;
    onSelectCategory?: (categoryKey: string) => void;
    onFilterChange?: (filters: {
        category?: string;
        location?: string;
        minPrice?: string;
        maxPrice?: string;
        startDate?: string;
        endDate?: string;
    }) => void;
    className?: string;
}

type FilterState = {
    category: string;
    location: string;
    minPrice: string;
    maxPrice: string;
    startDate: string;
    endDate: string;
};

export default function HTFilterSidebar({
    selectedCategory = 'all',
    selectedLocation = 'all',
    onSelectCategory,
    onFilterChange,
    className = '',
}: HTFilterSidebarProps) {
    const [activeCategory, setActiveCategory] = useState(selectedCategory);
    const [location, setLocation] = useState(selectedLocation);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getFilters = (
        overrides: Partial<FilterState> = {},
    ): FilterState => ({
        category: activeCategory,
        location,
        minPrice,
        maxPrice,
        startDate,
        endDate,
        ...overrides,
    });

    const emitFilterChange = (overrides: Partial<FilterState> = {}) => {
        onFilterChange?.(getFilters(overrides));
    };

    const handleCategoryClick = (key: string) => {
        const nextCategory =
            activeCategory === key ? 'all' : key;

        setActiveCategory(nextCategory);

        onSelectCategory?.(nextCategory);

        emitFilterChange({
            category: nextCategory,
        });
    };

    const handleLocationChange = (
        nextLocation: string,
    ) => {
        setLocation(nextLocation);

        emitFilterChange({
            location: nextLocation,
        });
    };

    const handlePriceFilter = () => {
        emitFilterChange();
    };

    const handlePriceReset = () => {
        setMinPrice('');
        setMaxPrice('');

        emitFilterChange({
            minPrice: '',
            maxPrice: '',
        });
    };

    const handleDateFilter = () => {
        emitFilterChange();
    };

    const handleDateReset = () => {
        setStartDate('');
        setEndDate('');

        emitFilterChange({
            startDate: '',
            endDate: '',
        });
    };

    return (
        <aside
            className={`w-full space-y-4 ${className}`}
        >
            {/* Categories */}
            <HTFilterCard title="Categories">
                <div className="flex flex-wrap gap-1.5">
                    {HT_EXPLORE_CATEGORIES.map((category) => (
                        <HTFilterChip
                            key={category.key}
                            label={category.label}
                            count={category.count}
                            active={
                                activeCategory === category.key
                            }
                            onClick={() =>
                                handleCategoryClick(category.key)
                            }
                        />
                    ))}
                </div>
            </HTFilterCard>

            {/* Location */}
            <HTFilterCard title="Location">
                <div className="relative">
                    <select
                        id="ht-location-filter"
                        aria-label="Filter by Location"
                        value={location}
                        onChange={(event) =>
                            handleLocationChange(event.target.value)
                        }
                        className="h-9 w-full cursor-pointer appearance-none rounded-md border border-[#DDDFF5] bg-[#F8F8FD] px-3 pr-8 text-[12px] font-medium text-[#111827] outline-none transition-colors hover:border-[#CFE2FF] focus:border-[#00A63E] focus:bg-white focus:ring-1 focus:ring-[#00A63E]/20"
                    >
                        {HT_EXPLORE_LOCATIONS.map((loc) => (
                            <option key={loc.value} value={loc.value}>
                                {loc.label}
                            </option>
                        ))}
                    </select>

                    <FiChevronDown
                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]"
                        strokeWidth={2}
                    />
                </div>
            </HTFilterCard>

            {/* Price Range */}
            <HTFilterCard title="Price Range">
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {/* Minimum Price */}
                        <div>
                            <label
                                htmlFor="min-price"
                                className="mb-1.5 block text-[11px] font-medium text-[#003B76]"
                            >
                                Min Price
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7280]">
                                    ₦
                                </span>

                                <input
                                    id="min-price"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0.00"
                                    value={minPrice}
                                    onChange={(event) =>
                                        setMinPrice(
                                            event.target.value,
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-[#DDDFF5] bg-[#F8F8FD] pl-7 pr-2.5 text-[11px] text-[#111827] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#00A63E] focus:bg-white focus:ring-1 focus:ring-[#00A63E]/20"
                                />
                            </div>
                        </div>

                        {/* Maximum Price */}
                        <div>
                            <label
                                htmlFor="max-price"
                                className="mb-1.5 block text-[11px] font-medium text-[#003B76]"
                            >
                                Max Price
                            </label>

                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-[#6B7280]">
                                    ₦
                                </span>

                                <input
                                    id="max-price"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0.00"
                                    value={maxPrice}
                                    onChange={(event) =>
                                        setMaxPrice(
                                            event.target.value,
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-[#DDDFF5] bg-[#F8F8FD] pl-7 pr-2.5 text-[11px] text-[#111827] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#00A63E] focus:bg-white focus:ring-1 focus:ring-[#00A63E]/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                        <button
                            type="button"
                            onClick={handlePriceReset}
                            className="text-[11px] font-medium text-[#6B7280] transition-colors hover:text-[#374151]"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            onClick={handlePriceFilter}
                            className="text-[11px] font-medium text-[#008F3C] transition-colors hover:text-[#016630]"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </HTFilterCard>

            {/* Date Range */}
            <HTFilterCard title="Date Range">
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {/* Start Date */}
                        <div>
                            <label
                                htmlFor="start-date"
                                className="mb-1.5 block text-[11px] font-medium text-[#003B76]"
                            >
                                Start Date
                            </label>

                            <input
                                id="start-date"
                                type="text"
                                placeholder="DD/MM/YY"
                                value={startDate}
                                onChange={(event) =>
                                    setStartDate(
                                        event.target.value,
                                    )
                                }
                                className="h-9 w-full rounded-md border border-[#DDDFF5] bg-[#F8F8FD] px-2.5 text-[11px] text-[#111827] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#00A63E] focus:bg-white focus:ring-1 focus:ring-[#00A63E]/20"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label
                                htmlFor="end-date"
                                className="mb-1.5 block text-[11px] font-medium text-[#003B76]"
                            >
                                End Date
                            </label>

                            <input
                                id="end-date"
                                type="text"
                                placeholder="DD/MM/YY"
                                value={endDate}
                                onChange={(event) =>
                                    setEndDate(
                                        event.target.value,
                                    )
                                }
                                className="h-9 w-full rounded-md border border-[#DDDFF5] bg-[#F8F8FD] px-2.5 text-[11px] text-[#111827] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#00A63E] focus:bg-white focus:ring-1 focus:ring-[#00A63E]/20"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                        <button
                            type="button"
                            onClick={handleDateReset}
                            className="text-[11px] font-medium text-[#6B7280] transition-colors hover:text-[#374151]"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            onClick={handleDateFilter}
                            className="text-[11px] font-medium text-[#008F3C] transition-colors hover:text-[#016630]"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </HTFilterCard>
        </aside>
    );
}