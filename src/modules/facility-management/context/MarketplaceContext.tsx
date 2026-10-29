import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { Product, CartItem } from '../types/marketplace';
import { mockMarketplaceProducts, initialCartItems } from '../data/marketplaceMock';
import { showSuccessToast } from '@shared/components/Toast/Toast';

interface MarketplaceContextType {
    products: Product[];
    cartItems: CartItem[];
    cartCount: number;
    likesCount: number;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    toggleLike: (productId: string) => void;
    subtotal: number;
    shipping: number;
    total: number;
    clearCart: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(mockMarketplaceProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Pre-set baseline of 23 likes and 10 cart items to match the design badges
    const [baseLikesCount, setBaseLikesCount] = useState<number>(23);

    const toggleLike = (productId: string) => {
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === productId) {
                    const nextLiked = !p.isLiked;
                    setBaseLikesCount((c) => (nextLiked ? c + 1 : Math.max(0, c - 1)));
                    return { ...p, isLiked: nextLiked };
                }
                return p;
            })
        );
    };

    const addToCart = (product: Product, quantity = 1) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex((item) => item.product.id === product.id);
            if (existingIndex > -1) {
                const next = [...prev];
                next[existingIndex] = {
                    ...next[existingIndex],
                    quantity: next[existingIndex].quantity + quantity,
                };
                return next;
            }
            return [
                ...prev,
                {
                    id: `cart-${Date.now()}`,
                    product,
                    quantity,
                },
            ];
        });

        showSuccessToast('Added to Cart', `${product.title} has been added to your cart.`);
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const cartCount = useMemo(() => {
        // baseline + current items
        const currentSum = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        return Math.max(10, currentSum);
    }, [cartItems]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0);
    }, [cartItems]);

    const shipping = 2000;
    const total = subtotal + (cartItems.length > 0 ? shipping : 0);

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <MarketplaceContext.Provider
            value={{
                products,
                cartItems,
                cartCount,
                likesCount: baseLikesCount,
                selectedCategory,
                setSelectedCategory,
                searchQuery,
                setSearchQuery,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleLike,
                subtotal,
                shipping,
                total,
                clearCart,
            }}
        >
            {children}
        </MarketplaceContext.Provider>
    );
}

export function useMarketplace() {
    const context = useContext(MarketplaceContext);
    if (!context) {
        throw new Error('useMarketplace must be used within a MarketplaceProvider');
    }
    return context;
}
