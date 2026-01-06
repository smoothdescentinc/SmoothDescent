/**
 * Meta Pixel Utility Library
 * 
 * Centralized helpers for Meta Pixel tracking with:
 * - SHA-256 email/phone hashing for advanced matching
 * - Safe tracking with error handling
 * - Debug mode logging
 * - Type-safe wrappers
 */

// Check if we're in debug mode
const DEBUG_MODE = import.meta.env.PUBLIC_META_PIXEL_DEBUG === 'true';

/**
 * SHA-256 hash a string using Web Crypto API
 */
async function sha256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Normalize and hash email for Meta Pixel advanced matching
 * - Converts to lowercase
 * - Trims whitespace
 * - Hashes with SHA-256
 */
export async function hashEmail(email: string): Promise<string> {
    if (!email || typeof email !== 'string') {
        console.warn('[Meta Pixel] Invalid email provided for hashing');
        return '';
    }

    const normalized = email.toLowerCase().trim();
    const hashed = await sha256(normalized);

    if (DEBUG_MODE) {
        console.log('[Meta Pixel] Email hashed:', { original: normalized, hash: hashed.substring(0, 16) + '...' });
    }

    return hashed;
}

/**
 * Normalize and hash phone for Meta Pixel advanced matching
 * - Removes all non-numeric characters
 * - Hashes with SHA-256
 */
export async function hashPhone(phone: string): Promise<string> {
    if (!phone || typeof phone !== 'string') {
        console.warn('[Meta Pixel] Invalid phone provided for hashing');
        return '';
    }

    // Remove all non-numeric characters
    const normalized = phone.replace(/\D/g, '');

    if (normalized.length < 10) {
        console.warn('[Meta Pixel] Phone number too short:', normalized.length);
        return '';
    }

    const hashed = await sha256(normalized);

    if (DEBUG_MODE) {
        console.log('[Meta Pixel] Phone hashed:', { original: normalized, hash: hashed.substring(0, 16) + '...' });
    }

    return hashed;
}

/**
 * Safely call fbq() with error handling
 */
export function safeTrack(event: string, params: Record<string, any> = {}) {
    if (typeof window === 'undefined') {
        return; // SSR - no window object
    }

    const fbq = (window as any).fbq;

    if (!fbq) {
        console.warn('[Meta Pixel] fbq not loaded - event not tracked:', event);
        return;
    }

    try {
        fbq('track', event, params);

        if (DEBUG_MODE) {
            console.log(`[Meta Pixel] ${event} tracked:`, params);
        }
    } catch (error) {
        console.error('[Meta Pixel] Error tracking event:', event, error);
    }
}

/**
 * Track event with customer data (advanced matching)
 */
export async function trackWithCustomerData(
    event: string,
    params: Record<string, any> = {},
    userData?: {
        email?: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        city?: string;
        state?: string;
        zip?: string;
    }
) {
    if (typeof window === 'undefined') {
        return;
    }

    const fbq = (window as any).fbq;

    if (!fbq) {
        console.warn('[Meta Pixel] fbq not loaded - event not tracked:', event);
        return;
    }

    try {
        // Hash sensitive data
        const hashedUserData: Record<string, string> = {};

        if (userData?.email) {
            hashedUserData.em = await hashEmail(userData.email);
        }

        if (userData?.phone) {
            hashedUserData.ph = await hashPhone(userData.phone);
        }

        if (userData?.firstName) {
            hashedUserData.fn = await sha256(userData.firstName.toLowerCase().trim());
        }

        if (userData?.lastName) {
            hashedUserData.ln = await sha256(userData.lastName.toLowerCase().trim());
        }

        if (userData?.city) {
            hashedUserData.ct = await sha256(userData.city.toLowerCase().trim());
        }

        if (userData?.state) {
            hashedUserData.st = await sha256(userData.state.toLowerCase().trim());
        }

        if (userData?.zip) {
            hashedUserData.zp = await sha256(userData.zip.toLowerCase().trim());
        }

        // Track with advanced matching
        fbq('track', event, params, { eventID: generateEventId() });

        // Update user data if provided
        if (Object.keys(hashedUserData).length > 0) {
            fbq('init', import.meta.env.PUBLIC_META_PIXEL_ID || '3411322232377394', hashedUserData);
        }

        if (DEBUG_MODE) {
            console.log(`[Meta Pixel] ${event} tracked with customer data:`, {
                params,
                userData: Object.keys(hashedUserData)
            });
        }
    } catch (error) {
        console.error('[Meta Pixel] Error tracking with customer data:', event, error);
    }
}

/**
 * Generate unique event ID for deduplication
 */
function generateEventId(): string {
    return `${Date.now()}.${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Track Lead event (email subscriptions, form submissions)
 */
export async function trackLead(email?: string, value: number = 0) {
    await trackWithCustomerData('Lead', {
        value,
        currency: 'USD',
        content_name: 'Email Subscription'
    }, email ? { email } : undefined);
}

/**
 * Track ViewContent with standard product parameters
 */
export function trackViewContent(product: {
    id: string;
    name: string;
    price: number;
    category?: string;
}) {
    safeTrack('ViewContent', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        content_category: product.category || 'General',
        value: product.price,
        currency: 'USD'
    });
}

/**
 * Track AddToCart with standard product parameters
 */
export function trackAddToCart(product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
}) {
    safeTrack('AddToCart', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price * product.quantity,
        currency: 'USD',
        num_items: product.quantity
    });
}

/**
 * Track InitiateCheckout with cart data
 */
export function trackInitiateCheckout(cart: {
    items: Array<{ id: string; quantity: number }>;
    total: number;
}) {
    safeTrack('InitiateCheckout', {
        content_ids: cart.items.map(i => i.id),
        content_type: 'product',
        value: cart.total,
        currency: 'USD',
        num_items: cart.items.reduce((sum, i) => sum + i.quantity, 0)
    });
}

/**
 * Track Purchase with order data
 */
export async function trackPurchase(order: {
    orderId: string;
    total: number;
    email?: string;
    items?: Array<{ id: string; quantity: number }>;
}) {
    await trackWithCustomerData('Purchase', {
        content_ids: order.items?.map(i => i.id) || [order.orderId],
        content_type: 'product',
        value: order.total,
        currency: 'USD',
        transaction_id: order.orderId,
        num_items: order.items?.reduce((sum, i) => sum + i.quantity, 0) || 1
    }, order.email ? { email: order.email } : undefined);
}
