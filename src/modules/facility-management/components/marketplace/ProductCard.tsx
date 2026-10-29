import { useNavigate } from 'react-router';
import { FiHeart } from 'react-icons/fi';
import type { Product } from '../../types/marketplace';
import { useMarketplace } from '../../context/MarketplaceContext';

export interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
            className="rounded-2xl border border-[#E4E4E7] bg-white overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group"
        >
            <div>
                {/* Media Container */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-50">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        type="button"
                        onClick={handleToggleLike}
                        className={`absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer ${
                            product.isLiked ? 'text-[#EF4444]' : 'text-slate-400 hover:text-[#EF4444]'
                        }`}
                        aria-label="Save product"
                    >
                        <FiHeart className={`h-3.5 w-3.5 ${product.isLiked ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#091E42] truncate">
                        {product.title}
                    </h4>
                    <div className="text-xs font-bold text-[#091E42]">{product.price}</div>
                    <p className="text-[11px] text-[#71717A] leading-relaxed line-clamp-2">
                        {product.description}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 pt-0 flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-[#71717A] truncate">
                    {product.category}
                </span>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="rounded-md bg-[#002E62] hover:bg-[#072440] text-white text-[11px] font-semibold px-3 py-1.5 transition-colors cursor-pointer shrink-0"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}
