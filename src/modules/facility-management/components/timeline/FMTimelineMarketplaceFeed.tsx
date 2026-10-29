import { useNavigate } from 'react-router';
import { FiMoreHorizontal, FiHeart } from 'react-icons/fi';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function FMTimelineMarketplaceFeed() {
    const navigate = useNavigate();
    const { products, addToCart, toggleLike } = useMarketplace();

    // Select the 3 products matching Image 1: Sunflower Oil, Cookies, Laundry Detergent
    const featuredItems = products.filter((p) =>
        ['prod-17', 'prod-13', 'prod-14'].includes(p.id)
    );

    const handleAddToCart = (product: any, e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
        // User instruction: "note there us a add to cart button which points to the marketplace"
        navigate('/facility-management/dashboard/marketplace');
    };

    return (
        <section className="rounded-2xl border border-[#E4E4E7] bg-white p-5 sm:p-6 shadow-xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#091E42]">Market Place</h3>
                <button
                    type="button"
                    onClick={() => navigate('/facility-management/dashboard/marketplace')}
                    className="p-1 rounded-full text-[#71717A] hover:bg-slate-100 hover:text-[#091E42] transition-colors cursor-pointer"
                    aria-label="View marketplace"
                >
                    <FiMoreHorizontal className="h-4 w-4" />
                </button>
            </div>

            {/* Product Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {featuredItems.map((prod) => (
                    <div
                        key={prod.id}
                        onClick={() => navigate(`/facility-management/dashboard/marketplace/product/${prod.id}`)}
                        className="rounded-xl border border-[#E4E4E7] bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div>
                            {/* Image Container */}
                            <div className="relative h-40 w-full overflow-hidden bg-slate-50">
                                <img
                                    src={prod.imageUrl}
                                    alt={prod.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(prod.id);
                                    }}
                                    className={`absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer ${
                                        prod.isLiked ? 'text-[#EF4444]' : 'text-slate-400 hover:text-[#EF4444]'
                                    }`}
                                    aria-label="Favorite product"
                                >
                                    <FiHeart className={`h-3.5 w-3.5 ${prod.isLiked ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Details */}
                            <div className="p-3.5 space-y-1.5">
                                <h4 className="text-xs sm:text-sm font-bold text-[#091E42] truncate">
                                    {prod.title}
                                </h4>
                                <div className="text-xs font-bold text-[#091E42]">{prod.price}</div>
                                <p className="text-[11px] text-[#71717A] leading-relaxed line-clamp-2">
                                    {prod.description}
                                </p>
                            </div>
                        </div>

                        {/* Footer: Category & Add to Cart button */}
                        <div className="p-3.5 pt-0 flex items-center justify-between gap-2">
                            <span className="text-[10px] font-medium text-[#71717A]">
                                {prod.category}
                            </span>
                            <button
                                type="button"
                                onClick={(e) => handleAddToCart(prod, e)}
                                className="rounded-md bg-[#002E62] hover:bg-[#072440] text-white text-[11px] font-semibold px-3 py-1.5 transition-colors cursor-pointer"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
