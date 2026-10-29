import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import type { CartItem } from '../../types/marketplace';

export interface CartItemRowProps {
    item: CartItem;
    onUpdateQuantity: (id: string, qty: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItemRow({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemRowProps) {
    const { product, quantity } = item;

    return (
        <div className="rounded-2xl border border-[#E4E4E7] bg-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-xs">
            {/* Product Image */}
            <div className="h-28 sm:h-32 w-full sm:w-44 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 space-y-2">
                <div className="space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#091E42] truncate">
                        {product.title}
                    </h4>
                    <div className="text-xs sm:text-sm font-bold text-[#091E42]">
                        ₦ {product.numericPrice.toFixed(2)}
                    </div>
                </div>

                <p className="text-xs text-[#71717A] leading-relaxed line-clamp-2">
                    {product.description}
                </p>

                {/* Actions: Quantity Selector & Remove Product */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                    {/* Quantity controls */}
                    <div className="inline-flex items-center rounded-lg bg-[#002E62] text-white overflow-hidden">
                        <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-[#072440] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                        >
                            <FiMinus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-center select-none">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-[#072440] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                        >
                            <FiPlus className="h-3 w-3" />
                        </button>
                    </div>

                    {/* Remove button */}
                    <button
                        type="button"
                        onClick={() => onRemove(product.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#F43F5E] hover:text-[#E11D48] transition-colors cursor-pointer"
                    >
                        <FiTrash2 className="h-3.5 w-3.5" />
                        <span>Remove product</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
