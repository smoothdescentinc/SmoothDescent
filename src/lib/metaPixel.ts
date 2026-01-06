/**
 * Tracking Utility Library
 * 
 * Centralized helpers for GTM Data Layer tracking with:
 * - SHA-256 email/phone hashing for advanced matching
 * - Safe tracking with error handling
 * - Debug mode logging
 * - Type-safe wrappers
 */

// Check if we're in debug mode
const DEBUG_MODE = import.meta.env.PUBLIC_META_PIXEL_DEBUG === 'true';

// Define Data Layer type
type DataLayerEvent = {
    event: string;
    eventName?: string;
    eventData?: Record<string, any>;
    userData?: Record<string, string>;
    [key: string]: any;
};

// Safe access to dataLayer
declare global {
    interface Window {
        dataLayer: DataLayerEvent[];
    }
}

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
 * Normalize and hash email for Advanced Matching
 */
export async function hashEmail(email: string): Promise<string> {
    if (!email || typeof email !== 'string') {
        console.warn('[Tracking] Invalid email provided for hashing');
        return '';
    }

    const normalized = email.toLowerCase().trim();
    const hashed = await sha256(normalized);

    if (DEBUG_MODE) {
        console.log('[Tracking] Email hashed:', { original: normalized, hash: hashed.substring(0, 16) + '...' });
    }

    return hashed;
}

/**
 * Normalize and hash phone for Advanced Matching
 */
export async function hashPhone(phone: string): Promise<string> {
    if (!phone || typeof phone !== 'string') {
        console.warn('[Tracking] Invalid phone provided for hashing');
        return '';
    }

    const normalized = phone.replace(/\D/g, '');

    if (normalized.length < 10) {
        console.warn('[Tracking] Phone number too short:', normalized.length);
        return '';
    }

    const hashed = await sha256(normalized);

    if (DEBUG_MODE) {
        console.log('[Tracking] Phone hashed:', { original: normalized, hash: hashed.substring(0, 16) + '...' });
    }

    return hashed;
}

/**
 * Push event to GTM Data Layer
 */
export function pushToDataLayer(
    eventName: string,
    eventData: Record<string, any> = {},
    hashedUserData?: Record<string, string>
) {
    if (typeof window === 'undefined') {
        return; // SSR
    }

    window.dataLayer = window.dataLayer || [];

    const payload: DataLayerEvent = {
        event: 'meta_event', // Generic trigger for GTM
        eventName: eventName, // Specific FB/GA4 event name
        eventData: eventData, // Parameters
        userData: hashedUserData, // Hashed user data for Matching
        _clear: true // Optional: helper for some GTM setups to clear previous state
    };

    try {
        window.dataLayer.push(payload);

        if (DEBUG_MODE) {
            console.log(`[Tracking] Pushed to Data Layer:`, payload);
        }
    } catch (error) {
        console.error('[Tracking] Error pushing to Data Layer:', error);
    }
}

/**
 * Track event with customer data (Advanced Matching wrapper)
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

        // Push to Data Layer
        pushToDataLayer(event, { ...params, eventID: generateEventId() }, hashedUserData);

    } catch (error) {
        console.error('[Tracking] Error processing customer data:', event, error);
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
    // ViewContent generally doesn't have user data unless logged in, but we use the generic pusher
    pushToDataLayer('ViewContent', {
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
    pushToDataLayer('AddToCart', {
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
    pushToDataLayer('InitiateCheckout', {
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

