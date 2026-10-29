import { useNavigate } from 'react-router';
import { FiHeart } from 'react-icons/fi';
import type { Product } from '../../types/marketplace';
import { useMarketplace } from '../../context/MarketplaceContext';

export interface ProductFeaturedCardProps {
    product: Product;
}

export default function ProductFeaturedCard({ product }: ProductFeaturedCardProps) {
    const navigate = useNavigate();
    const { addToCart, toggleLike } = useMarketplace();

    const handleCardClick = () => {
        navigate(`/facility-management/dashboard/marketplace/product/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleToggleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleLike(product.id);
    };

    return (
        <div
            onClick={handleCardClick}
            className="relative rounded-2xl overflow-hidden h-56 sm:h-64 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between p-5 sm:p-6"
        >
            {/* Background Image with Dark Vignette Overlay */}
            <img
                src={product.imageUrl}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

            {/* Top Right Like Button */}
            <div className="relative z-10 flex justify-end">
                <button
                    type="button"
                    onClick={handleToggleLike}
                    className={`h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
                        product.isLiked ? 'text-[#EF4444]' : 'text-white/80 hover:text-white'
                    }`}
                    aria-label="Save product"
                >
                    <FiHeart className={`h-4 w-4 ${product.isLiked ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Bottom Content & Action */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1 text-white max-w-lg">
                    <h3 className="text-base sm:text-lg font-bold truncate">{product.title}</h3>
                    <div className="text-xs sm:text-sm font-semibold text-white/90">
                        {product.price}
                    </div>
                    <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="rounded-lg bg-[#002E62] hover:bg-[#072440] border border-white/20 text-white text-xs font-semibold px-5 py-2.5 transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-sm"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
