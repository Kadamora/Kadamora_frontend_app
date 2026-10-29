import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import ProductCard from '../../components/marketplace/ProductCard';
import ProductFeaturedCard from '../../components/marketplace/ProductFeaturedCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FiSearch, FiSliders, FiHeart, FiShoppingCart, FiChevronDown } from 'react-icons/fi';

export default function FMMarketplacePage() {
    const navigate = useNavigate();
    const {
        products,
        cartCount,
        likesCount,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
    } = useMarketplace();

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const categories = ['All', 'Groceries', 'Fashion', 'Clothing', 'Jewelry', 'Electronics'];

    // Filter products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesCategory =
                selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    // Bento grid segments matching Image 2:
    // Row 1: 4 standard cards
    const row1 = filteredProducts.slice(0, 4);
    // Row 2: 4 standard cards
    const row2 = filteredProducts.slice(4, 8);
    // Row 3: Oris Watch (wide) + Air Fresheners (standard)
    const orisWatch = filteredProducts.find((p) => p.id === 'prod-9') || filteredProducts[8];
    const airFresheners = filteredProducts.find((p) => p.id === 'prod-10') || filteredProducts[9];
    // Row 4: 4 standard cards (Jpearl Necklace, Baseball FaceCap, Cookies, Laundry Detergent)
    const row4 = filteredProducts.slice(10, 14);
    // Row 5: Sockings (standard) + iPhone 12 (wide)
    const sockings = filteredProducts.find((p) => p.id === 'prod-15') || filteredProducts[14];
    const iphone12 = filteredProducts.find((p) => p.id === 'prod-16') || filteredProducts[15];

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div>
                <PageHeader
                    title="Marketplace"
                    crumbs={[
                        { label: 'Home', path: '/facility-management/dashboard' },
                        { label: 'Marketplace' },
                    ]}
                />
                <p className="text-xs text-[#71717A] -mt-4">
                    Browse and purchase items from local vendors
                </p>
            </div>

            {/* Filter & Actions Bar (Image 2) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Category Dropdown & Search Bar */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Category Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsCategoryOpen((prev) => !prev)}
                            className="inline-flex items-center gap-2 rounded-xl border border-[#BED3EB] bg-white px-4 py-2 text-xs font-semibold text-[#091E42] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                            <span>
                                {selectedCategory === 'All' ? `All (${products.length})` : selectedCategory}
                            </span>
                            <FiChevronDown className="h-3.5 w-3.5 text-slate-500" />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl border border-[#BED3EB] bg-white p-1.5 shadow-lg z-20 space-y-0.5">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setIsCategoryOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                            selectedCategory === cat
                                                ? 'bg-[#F3F9FF] text-[#002E62] font-bold'
                                                : 'text-[#52525B] hover:bg-slate-50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-64 sm:w-80">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search ..."
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#BED3EB] bg-white text-xs text-[#091E42] placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#002E62]"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        type="button"
                        className="p-2 rounded-xl border border-[#BED3EB] bg-white text-[#093154] hover:bg-slate-50 transition-colors cursor-pointer"
                        aria-label="Advanced filters"
                    >
                        <FiSliders className="h-4 w-4" />
                    </button>
                </div>

                {/* Right: Likes & Cart Buttons */}
                <div className="flex items-center gap-3 self-end md:self-auto">
                    {/* Likes Button */}
                    <button
                        type="button"
                        className="rounded-xl border border-[#FECDD3] bg-[#FFF1F3] text-[#F43F5E] px-4 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-[#FFE4E6] transition-colors cursor-pointer"
                    >
                        <FiHeart className="h-3.5 w-3.5 fill-current" />
                        <span>Likes ({likesCount})</span>
                    </button>

                    {/* Cart Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/facility-management/dashboard/marketplace/cart')}
                        className="rounded-xl border border-[#BED3EB] bg-white hover:bg-slate-50 text-[#002E62] px-4 py-2 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                    >
                        <FiShoppingCart className="h-3.5 w-3.5" />
                        <span>Cart ({cartCount})</span>
                    </button>
                </div>
            </div>

            {/* Marketplace Products Bento Grid (Image 2) */}
            <div className="space-y-6">
                {/* Row 1: 4 Standard Cards */}
                {row1.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {row1.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                {/* Row 2: 4 Standard Cards */}
                {row2.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {row2.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                {/* Row 3: Oris Watch (Wide Banner) + Air Fresheners */}
                {(orisWatch || airFresheners) && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                        {orisWatch && (
                            <div className="lg:col-span-3">
                                <ProductFeaturedCard product={orisWatch} />
                            </div>
                        )}
                        {airFresheners && (
                            <div className="lg:col-span-1">
                                <ProductCard product={airFresheners} />
                            </div>
                        )}
                    </div>
                )}

                {/* Row 4: 4 Standard Cards */}
                {row4.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {row4.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                {/* Row 5: Sockings (Standard) + iPhone 12 (Wide Banner) */}
                {(sockings || iphone12) && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                        {sockings && (
                            <div className="lg:col-span-1">
                                <ProductCard product={sockings} />
                            </div>
                        )}
                        {iphone12 && (
                            <div className="lg:col-span-3">
                                <ProductFeaturedCard product={iphone12} />
                            </div>
                        )}
                    </div>
                )}

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-slate-400 bg-white rounded-2xl border border-[#E4E4E7]">
                        <p className="text-sm font-medium">No products found matching your search.</p>
                    </div>
                )}
            </div>

            {/* Floating Chat Support FAB */}
            <FloatingChatButton />
        </div>
    );
}
