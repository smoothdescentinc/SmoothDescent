import React, { useEffect, useState } from 'react';
import { X, Lock, Minus, Plus } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { isCartOpen, cartItems, removeCartItem, updateCartQuantity, addCartItem, checkoutUrl, isUpdating } from '../store/cartStore';
import type { Product } from '../types';

const FREE_SHIPPING_THRESHOLD = 99.00;

// Mock upsell data
const UPSELLS: Product[] = [
    {
        id: 'nausea-strips',
        name: 'Digestive Strips',
        category: 'RELIEF',
        rating: 5,
        reviews: 120,
        subtitle: 'Fast Nausea Relief',
        price: 28.00,
        image: 'https://picsum.photos/id/364/100/100',
        originalPrice: 34.00
    },
    {
        id: 'digestive-enzymes',
        name: 'Enzyme Pro Blend',
        category: 'DIGESTION',
        rating: 5,
        reviews: 400,
        subtitle: 'Stop Sulfur Burps',
        price: 32.00,
        image: 'https://picsum.photos/id/225/100/100',
        originalPrice: 40.00
    }
];

const CartDrawer: React.FC = () => {
    const isOpen = useStore(isCartOpen);
    const items = useStore(cartItems);
    const url = useStore(checkoutUrl);
    const updating = useStore(isUpdating);
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation delay for unmount
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // match transition duration
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen && isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
                onClick={() => isCartOpen.set(false)}
            />

            {/* Drawer */}
            <div
                className={`relative w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col h-full ${isOpen && isVisible ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <button onClick={() => isCartOpen.set(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                    <h2 className="text-xl font-serif italic font-bold">Your Cart</h2>
                    <span className="text-sm font-medium">({items.reduce((a, b) => a + b.quantity, 0)})</span>
                </div>

                {/* Shipping Bar */}
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <p className="text-center text-sm mb-2 font-medium text-gray-700">
                        {remainingForFreeShipping > 0
                            ? <span>🚚 You're <b>${remainingForFreeShipping.toFixed(2)}</b> away from free shipping! 🚛</span>
                            : <span className="text-green-600">🎉 You've unlocked <b>Free Shipping!</b></span>
                        }
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="text-right text-xs text-gray-500 mt-1">{Math.round(progressPercent)}%</div>
                </div>

                {/* Cart Items (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">Your cart is empty.</div>
                    ) : (
                        items.map((item, index) => (
                            <div key={`${item.id}-${item.variantLabel}-${index}`} className="flex gap-4 border-b pb-6 last:border-0 relative group">
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                {/* item.subtitle || item.details?.subtitle */}
                                                {item.variantLabel && (
                                                    <p className="text-xs text-gray-600 mt-1 bg-gray-100 inline-block px-1 rounded">{item.variantLabel}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-brand-dark">${(item.price * item.quantity).toFixed(2)}</div>
                                            {item.originalPrice && (
                                                <div className="text-xs text-gray-400 line-through">${(item.originalPrice * item.quantity).toFixed(2)}</div>
                                            )}
                                        </div>
                                    </div>

                                    {item.originalPrice && item.originalPrice > item.price && (
                                        <div className="mt-1 inline-block bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                            Saved ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                        </div>
                                    )}

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-gray-300 rounded">
                                            <button
                                                onClick={() => updateCartQuantity(item.id, -1, item.variantLabel)}
                                                className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQuantity(item.id, 1, item.variantLabel)}
                                                className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeCartItem(item.id, item.variantLabel)}
                                            className="text-xs text-gray-500 underline hover:text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* Upsells */}
                    <div className="pt-6 border-t">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">You May Also Like</h3>
                        <div className="space-y-4">
                            {UPSELLS.map(upsell => {
                                // Don't show if already in cart (basic check by ID)
                                if (items.some(i => i.id === upsell.id)) return null;

                                return (
                                    <div key={upsell.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <img src={upsell.image} alt={upsell.name} className="w-16 h-16 rounded object-cover" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-brand-dark">{upsell.name}</h4>
                                            <p className="text-xs text-gray-500 italic mb-1">{upsell.subtitle || upsell.details?.subtitle}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-medium">★ 4.9 (1.2k)</span>
                                            </div>
                                            <div className="font-bold text-brand-primary mt-1">${upsell.price.toFixed(2)}</div>
                                        </div>
                                        <button
                                            onClick={() => addCartItem(upsell, 1, 'Quick Add')}
                                            className="bg-brand-dark text-white text-xs px-4 py-2 rounded shadow hover:bg-brand-dark/90 transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-4 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-lg text-gray-700">Total</span>
                        <span className="font-bold text-xl text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-4 justify-center">
                        <div className="bg-green-500 rounded-full p-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        60-Day Money-Back Guarantee
                    </div>

                    {url ? (
                        <a
                            href={url}
                            onClick={() => {
                                // Track InitiateCheckout event for Meta Pixel
                                if (typeof window !== 'undefined' && (window as any).fbq) {
                                    (window as any).fbq('track', 'InitiateCheckout', {
                                        content_ids: items.map(i => i.id),
                                        contents: items.map(i => ({
                                            id: i.id,
                                            quantity: i.quantity
                                        })),
                                        value: subtotal,
                                        currency: 'USD',
                                        num_items: items.reduce((acc, i) => acc + i.quantity, 0)
                                    });
                                }
                            }}
                            className="w-full bg-[#fa9f1c] hover:bg-[#e89010] text-black font-extrabold text-lg py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            Continue to Checkout
                            <Lock className="w-5 h-5 opacity-50" />
                        </a>
                    ) : (
                        <button
                            className="w-full bg-[#fa9f1c] hover:bg-[#e89010] text-black font-extrabold text-lg py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={true}
                            title="Checkout is disabled in Mock Mode or initializing"
                        >
                            Checkout (Mock Mode)
                            <Lock className="w-5 h-5 opacity-50" />
                        </button>
                    )}

                    <p className="text-[10px] text-gray-400 text-center mt-3">
                        By clicking above, you agree to the <a href="#" className="underline">Terms</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
