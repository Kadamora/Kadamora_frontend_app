import { useParams } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import ProductCard from '../../components/marketplace/ProductCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { FiStar } from 'react-icons/fi';
import Button from '@shared/components/Button/Button';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { products, addToCart } = useMarketplace();

    const product = products.find((p) => p.id === id) || products[0];

    // Similar products matching Image 3: Fresh Fruits Hamper, Sunflower Oil, Cookies, Laundry Detergent
    const similarProducts = products.filter((p) =>
        ['prod-1', 'prod-17', 'prod-13', 'prod-14'].includes(p.id)
    );

    const handleMessageVendor = () => {
        showSuccessToast('Vendor Chat', `Connecting you with ${product.vendor?.name || 'vendor'}...`);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <PageHeader
                title="Product Details"
                crumbs={[
                    { label: 'Marketplace', path: '/facility-management/dashboard/marketplace' },
                    { label: product.title },
                ]}
            />

            {/* Top 2-Column Section (Image 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left: Hero Image */}
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E4E4E7] bg-white shadow-xs">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-[360px] sm:h-[460px] object-cover"
                    />
                </div>

                {/* Right: Product & Vendor Cards */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Product Details Card */}
                    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-xs space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#091E42]">
                                {product.title}
                            </h2>
                            <div className="text-base sm:text-lg font-bold text-[#091E42]">
                                {product.price}
                            </div>
                        </div>

                        <p className="text-xs sm:text-[13px] text-[#52525B] leading-relaxed">
                            {product.description}
                        </p>

                        {/* Category tag */}
                        <div>
                            <span className="inline-block bg-[#E6F6EE] text-[#12B76A] border border-[#A6F4C5] text-xs font-semibold px-3 py-1 rounded-md">
                                {product.category}
                            </span>
                        </div>

                        {/* Reviews (5 stars) */}
                        <div className="flex items-center gap-2 text-xs text-[#52525B] pt-1">
                            <span className="font-semibold">Review:</span>
                            <div className="flex items-center text-[#12B76A]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FiStar key={star} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart full-width button */}
                        <div className="pt-2">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => addToCart(product)}
                                className="w-full rounded-xl py-3 text-sm font-semibold cursor-pointer shadow-xs"
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>

                    {/* Vendor Information Card */}
                    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-3">
                        <h3 className="text-sm font-bold text-[#091E42]">Vendor Information</h3>

                        <div className="flex items-center justify-between gap-3 pt-1">
                            <div className="flex items-center gap-3 min-w-0">
                                <img
                                    src={product.vendor?.avatar || '/assets/images/charles.png'}
                                    alt="Vendor avatar"
                                    className="h-11 w-11 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                                <div className="min-w-0">
                                    <h4 className="text-xs sm:text-sm font-bold text-[#091E42] truncate">
                                        {product.vendor?.name || 'Abel Johnson Charles'}
                                    </h4>
                                    <span className="text-[11px] text-[#71717A] block">
                                        {product.vendor?.productsCount || 26} Products Listed
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleMessageVendor}
                                className="rounded-lg px-4 py-2 text-xs font-semibold shrink-0 cursor-pointer"
                            >
                                Message Vendor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Similar Products (Image 3) */}
            <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                <h3 className="text-base sm:text-lg font-bold text-[#091E42]">Similar Products</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {similarProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
