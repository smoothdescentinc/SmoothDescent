import { atom, onMount } from 'nanostores';
import { shopifyClient } from '../lib/shopify';
import type { Product, CartItem } from '../types';
import { trackAddToCart } from '../lib/metaPixel';

export const isCartOpen = atom(false);
export const cartItems = atom<CartItem[]>([]);
export const checkoutUrl = atom<string>('');
export const isUpdating = atom(false);

const IS_MOCK = !import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN || import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN.includes('mock');

// Retrieve checkout ID from local storage
const getCheckoutId = () => typeof localStorage !== 'undefined' ? localStorage.getItem('shopify_checkout_id') : null;
const setCheckoutId = (id: string) => typeof localStorage !== 'undefined' && localStorage.setItem('shopify_checkout_id', id);

export async function initCart() {
    if (IS_MOCK) return;

    const existingId = getCheckoutId();
    if (existingId) {
        try {
            const checkout = await shopifyClient.checkout.fetch(existingId);
            if (!checkout || checkout.orderStatusUrl) {
                // If completed or invalid, start new
                await createNewCheckout();
            } else {
                updateStoreFromCheckout(checkout);
            }
        } catch (e) {
            console.error("Failed to fetch checkout", e);
            await createNewCheckout();
        }
    } else {
        await createNewCheckout();
    }
}

async function createNewCheckout() {
    try {
        const checkout = await shopifyClient.checkout.create();
        setCheckoutId(checkout.id);
        updateStoreFromCheckout(checkout);
    } catch (e) {
        console.error("Failed to create checkout", e);
    }
}

function updateStoreFromCheckout(checkout: any) {
    if (!checkout) return;

    const items: CartItem[] = checkout.lineItems.map((item: any) => ({
        id: item.id, // Note: This is LINE ITEM ID, not Product ID. We need to handle this carefully.
        name: item.title,
        price: parseFloat(item.variant.price.amount),
        quantity: item.quantity,
        image: item.variant.image?.src || '',
        variantLabel: item.variant.title !== 'Default Title' ? item.variant.title : '',
        category: 'Product', // Placeholder
        rating: 5,
        reviews: 0
    }));

    cartItems.set(items);
    checkoutUrl.set(checkout.webUrl);
}

// --- Cart Actions ---

export async function addCartItem(product: Product, quantity = 1, label = '') {
    isCartOpen.set(true);

    if (IS_MOCK) {
        // MOCK PATH
        const currentItems = cartItems.get();
        const existing = currentItems.find(item => item.id === product.id && item.variantLabel === label);

        if (existing) {
            cartItems.set(currentItems.map(item =>
                (item.id === product.id && item.variantLabel === label)
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            const newItem: CartItem = { ...product, quantity, variantLabel: label };
            cartItems.set([...currentItems, newItem]);
        }

        // Track AddToCart event for Meta Pixel
        trackAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity
        });

        return;
    }

    // SHOPIFY PATH
    isUpdating.set(true);
    try {
        const currentCheckoutId = getCheckoutId();
        if (!currentCheckoutId) await createNewCheckout(); // Should exist from init, but safety check

        // We need the Variant ID.
        // Logic: product.id should be the ID we got from Shopify.
        // If we have tiers/variants, we need to match the label to the specific variant ID.
        // For simplicity in this step, if 'product' comes from our mapped store,
        // we might store the real Variant ID in tiers.
        // Fallback: Use product.id as variant ID (if it was mapped that way).

        let variantId = product.id;

        // Complex logic: Map our 'label' back to a variant ID if possible.
        if (product.tiers) {
            const tier = product.tiers.find(t => t.label === label || (label.includes(t.label)));
            if (tier) variantId = tier.id;
        }

        const lineItemsToAdd = [{ variantId: variantId, quantity: quantity }];
        const checkout = await shopifyClient.checkout.addLineItems(getCheckoutId() as string, lineItemsToAdd);
        updateStoreFromCheckout(checkout);

        // Track AddToCart event for Meta Pixel (Shopify path)
        trackAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity
        });

    } catch (e) {
        console.error("Failed to add to cart", e);
    } finally {
        isUpdating.set(false);
    }
}

export async function removeCartItem(itemId: string, variantLabel?: string) {
    if (IS_MOCK) {
        cartItems.set(cartItems.get().filter(item => !(item.id === itemId && item.variantLabel === variantLabel)));
        return;
    }

    // SHOPIFY PATH
    // itemId here MUST be the Line Item ID from Shopify, not Product ID.
    // Our updateStoreFromCheckout maps lineItem.id -> item.id, so this should mirror correctly.
    isUpdating.set(true);
    try {
        const checkout = await shopifyClient.checkout.removeLineItems(getCheckoutId() as string, [itemId]);
        updateStoreFromCheckout(checkout);
    } catch (e) {
        console.error("Failed to remove item", e);
    } finally {
        isUpdating.set(false);
    }
}

export async function updateCartQuantity(itemId: string, delta: number, variantLabel?: string) {
    const currentItem = cartItems.get().find(i => i.id === itemId && i.variantLabel === variantLabel);
    if (!currentItem) return;
    const newQty = Math.max(0, currentItem.quantity + delta);

    if (newQty === 0) {
        removeCartItem(itemId, variantLabel);
        return;
    }

    if (IS_MOCK) {
        cartItems.set(cartItems.get().map(item => {
            if (item.id === itemId && item.variantLabel === variantLabel) {
                return { ...item, quantity: newQty };
            }
            return item;
        }));
        return;
    }

    // SHOPIFY PATH
    isUpdating.set(true);
    try {
        const lineItemsToUpdate = [{ id: itemId, quantity: newQty }];
        const checkout = await shopifyClient.checkout.updateLineItems(getCheckoutId() as string, lineItemsToUpdate);
        updateStoreFromCheckout(checkout);
    } catch (e) {
        console.error("Failed to update quantity", e);
    } finally {
        isUpdating.set(false);
    }
}

// Initialize on load
if (typeof window !== 'undefined') {
    onMount(cartItems, () => {
        initCart();
    });
}
