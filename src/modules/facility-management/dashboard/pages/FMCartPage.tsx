import { useState } from 'react';
import { useNavigate } from 'react-router';
import PageHeader from '@shared/components/Dashboard/PageHeader';
import FloatingChatButton from '@shared/components/Dashboard/FloatingChatButton';
import CartItemRow from '../../components/marketplace/CartItemRow';
import ProductCard from '../../components/marketplace/ProductCard';
import ConfirmOrderModal from '../../components/marketplace/ConfirmOrderModal';
import MarketplacePaymentModal from '../../components/marketplace/MarketplacePaymentModal';
import { useMarketplace } from '../../context/MarketplaceContext';
import Button from '@shared/components/Button/Button';
import { showSuccessToast } from '@shared/components/Toast/Toast';

export default function FMCartPage() {
    const navigate = useNavigate();
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        subtotal,
        shipping,
        total,
        products,
        clearCart,
    } = useMarketplace();

    const [isConfirmOrderOpen, setIsConfirmOrderOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Recently viewed items matching Image 4: Fresh Fruits Hamper, Sunflower Oil, Cookies, Laundry Detergent
    const recentlyViewed = products.filter((p) =>
        ['prod-1', 'prod-17', 'prod-13', 'prod-14'].includes(p.id)
    );

    const handleCheckout = () => {
        setIsConfirmOrderOpen(true);
    };

    const handleConfirmOrder = () => {
        setIsConfirmOrderOpen(false);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaymentModalOpen(false);
        clearCart();
        showSuccessToast(
            'Payment Verified',
            'Your order has been placed successfully and will be delivered shortly.'
        );
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <PageHeader
                title="Cart"
                crumbs={[
                    { label: 'Marketplace', path: '/facility-management/dashboard/marketplace' },
                    { label: 'Cart' },
                ]}
            />

            {/* Top 2-Column Section (Image 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left: Cart Items List */}
                <div className="lg:col-span-8 space-y-4">
                    {cartItems.map((item) => (
                        <CartItemRow
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}

                    {cartItems.length === 0 && (
                        <div className="py-16 text-center text-slate-400 bg-white rounded-2xl border border-[#E4E4E7] space-y-3">
                            <p className="text-sm font-medium">Your cart is currently empty.</p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/facility-management/dashboard/marketplace')}
                                className="rounded-lg px-4 py-2 text-xs font-semibold"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right: Order Summary Card (Image 4) */}
                <div className="lg:col-span-4 rounded-2xl border border-[#BED3EB] bg-white p-6 shadow-xs space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-base font-bold text-[#091E42]">Order Summary</h3>
                        <p className="text-xs text-[#71717A]">
                            Detailed summary of items in my cart
                        </p>
                    </div>

                    <div className="text-xs italic text-[#52525B] pt-1">
                        {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items in total
                    </div>

                    <div className="space-y-3 pt-2 border-t border-[#F1F5F9] text-xs">
                        <div className="flex items-center justify-between text-[#52525B]">
                            <span>Sub-total</span>
                            <span className="font-bold text-[#091E42]">₦{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-[#52525B]">
                            <span>Shipping</span>
                            <span className="font-bold text-[#091E42]">₦ {shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold text-[#091E42] pt-2 border-t border-[#F1F5F9]">
                            <span>Total</span>
                            <span>₦{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="button"
                            variant="primary"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="w-full rounded-xl py-3 text-sm font-semibold cursor-pointer shadow-xs"
                        >
                            Checkout ₦ {total.toFixed(2)}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Recently View (Image 4) */}
            <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                <h3 className="text-base sm:text-lg font-bold text-[#091E42]">Recently View</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {recentlyViewed.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>

            {/* Checkout Modals (Image 1 & Image 2) */}
            <ConfirmOrderModal
                isOpen={isConfirmOrderOpen}
                onClose={() => setIsConfirmOrderOpen(false)}
                onConfirm={handleConfirmOrder}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                itemsCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            />

            <MarketplacePaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onPaymentSuccess={handlePaymentSuccess}
                amount={total > 0 ? total : 3500000}
                bankName="Wema Bank"
                accountNumber="015119521001"
                accountName="Smart Valley"
            />

            {/* Floating Support Chat FAB */}
            <FloatingChatButton />
        </div>
    );
}
