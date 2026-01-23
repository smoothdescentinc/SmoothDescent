/**
 * Meta Pixel Tracking Library
 *
 * Triple tracking approach for maximum accuracy:
 * 1. Direct fbq() calls - Primary browser tracking
 * 2. Conversions API - Server-side backup (bypasses ad blockers)
 * 3. GTM Data Layer - Legacy backup
 *
 * Features:
 * - SHA-256 email/phone hashing for Advanced Matching
 * - Event deduplication via eventID (same ID for browser + server)
 * - Safe tracking with error handling
 * - Debug mode logging
 */

// Check if we're in debug mode
const DEBUG_MODE = import.meta.env.PUBLIC_META_PIXEL_DEBUG === 'true';

// Meta Pixel ID - centralized for easy updates
const META_PIXEL_ID = '3411322252377394';

// Define Data Layer type
type DataLayerEvent = {
    event: string;
    eventName?: string;
    eventData?: Record<string, any>;
    userData?: Record<string, string>;
    [key: string]: any;
};

// Define fbq function type for Meta Pixel
type FbqFunction = {
    (action: 'track', event: string, params?: Record<string, any>, options?: { eventID?: string }): void;
    (action: 'trackCustom', event: string, params?: Record<string, any>, options?: { eventID?: string }): void;
    (action: 'init', pixelId: string, userData?: Record<string, string>): void;
    callMethod?: (...args: any[]) => void;
    queue?: any[];
    loaded?: boolean;
    version?: string;
};

// Safe access to dataLayer and fbq
declare global {
    interface Window {
        dataLayer: DataLayerEvent[];
        fbq: FbqFunction;
        _fbq?: FbqFunction;
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
 * Fire direct Meta Pixel event via fbq()
 * This is the PRIMARY tracking method - more reliable than GTM
 */
function firePixelEvent(
    eventName: string,
    eventData: Record<string, any> = {},
    eventId?: string
) {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        if (DEBUG_MODE) {
            console.warn('[Meta Pixel] fbq not available, skipping direct pixel fire');
        }
        return;
    }

    try {
        // Standard Meta events vs custom events
        const standardEvents = [
            'PageView', 'ViewContent', 'AddToCart', 'InitiateCheckout',
            'Purchase', 'Lead', 'CompleteRegistration', 'AddPaymentInfo',
            'AddToWishlist', 'Search', 'Contact', 'CustomizeProduct',
            'Donate', 'FindLocation', 'Schedule', 'StartTrial',
            'SubmitApplication', 'Subscribe'
        ];

        const isStandardEvent = standardEvents.includes(eventName);
        const options = eventId ? { eventID: eventId } : undefined;

        if (isStandardEvent) {
            window.fbq('track', eventName, eventData, options);
        } else {
            window.fbq('trackCustom', eventName, eventData, options);
        }

        if (DEBUG_MODE) {
            console.log(`[Meta Pixel] Fired ${isStandardEvent ? 'standard' : 'custom'} event:`, {
                event: eventName,
                data: eventData,
                eventId
            });
        }
    } catch (error) {
        console.error('[Meta Pixel] Error firing pixel event:', error);
    }
}

/**
 * Get Meta cookies for better attribution
 */
function getMetaCookies(): { fbc?: string; fbp?: string } {
    if (typeof document === 'undefined') return {};

    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    return {
        fbc: cookies['_fbc'],
        fbp: cookies['_fbp']
    };
}

/**
 * Send event to Conversions API (server-side)
 * This bypasses ad blockers and iOS restrictions
 */
async function sendToCAPI(
    eventName: string,
    eventId: string,
    eventData: Record<string, any> = {},
    hashedUserData: Record<string, string> = {}
) {
    if (typeof window === 'undefined') return;

    try {
        const { fbc, fbp } = getMetaCookies();

        const response = await fetch('/api/meta-capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventName,
                eventId,
                eventData,
                userData: hashedUserData,
                sourceUrl: window.location.href,
                fbc,
                fbp
            })
        });

        if (DEBUG_MODE) {
            const result = await response.json();
            console.log(`[CAPI] Server response for ${eventName}:`, result);
        }
    } catch (error) {
        // Silent fail - don't break the user experience
        if (DEBUG_MODE) {
            console.error('[CAPI] Error sending event:', error);
        }
    }
}

/**
 * Update user data for Advanced Matching
 * Call this when you capture new user information
 */
export async function updatePixelUserData(userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}) {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        return;
    }

    try {
        const hashedData: Record<string, string> = {};

        if (userData.email) {
            hashedData.em = await hashEmail(userData.email);
        }
        if (userData.phone) {
            hashedData.ph = await hashPhone(userData.phone);
        }
        if (userData.firstName) {
            hashedData.fn = await sha256(userData.firstName.toLowerCase().trim());
        }
        if (userData.lastName) {
            hashedData.ln = await sha256(userData.lastName.toLowerCase().trim());
        }
        if (userData.city) {
            hashedData.ct = await sha256(userData.city.toLowerCase().trim());
        }
        if (userData.state) {
            hashedData.st = await sha256(userData.state.toLowerCase().trim());
        }
        if (userData.zip) {
            hashedData.zp = await sha256(userData.zip.replace(/\s/g, ''));
        }
        if (userData.country) {
            hashedData.country = await sha256(userData.country.toLowerCase().trim());
        }

        // Re-init pixel with updated user data for Advanced Matching
        window.fbq('init', META_PIXEL_ID, hashedData);

        if (DEBUG_MODE) {
            console.log('[Meta Pixel] Updated user data for Advanced Matching:', Object.keys(hashedData));
        }
    } catch (error) {
        console.error('[Meta Pixel] Error updating user data:', error);
    }
}

/**
 * Push event to GTM Data Layer (BACKUP method)
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
            console.log(`[GTM Data Layer] Pushed event:`, payload);
        }
    } catch (error) {
        console.error('[GTM Data Layer] Error pushing event:', error);
    }
}

/**
 * Track event with customer data (Advanced Matching wrapper)
 * Fires browser pixel, CAPI, and Data Layer for maximum coverage
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
    },
    sendServerSide: boolean = true
) {
    try {
        // Generate event ID ONCE for deduplication across ALL channels
        const eventId = generateEventId();

        // Hash sensitive data for Advanced Matching
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

        // Update pixel with user data for Advanced Matching (if we have user data)
        if (userData && Object.keys(userData).length > 0) {
            await updatePixelUserData(userData);
        }

        // 1. PRIMARY: Fire direct fbq() call (browser)
        firePixelEvent(event, params, eventId);

        // 2. SERVER: Send to Conversions API (bypasses ad blockers)
        if (sendServerSide) {
            sendToCAPI(event, eventId, params, hashedUserData);
        }

        // 3. BACKUP: Push to Data Layer for GTM
        pushToDataLayer(event, { ...params, eventID: eventId }, hashedUserData);

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
    const eventId = generateEventId();
    const eventData = {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        content_category: product.category || 'General',
        value: product.price,
        currency: 'USD'
    };

    // PRIMARY: Direct fbq() call
    firePixelEvent('ViewContent', eventData, eventId);

    // BACKUP: GTM Data Layer
    pushToDataLayer('ViewContent', { ...eventData, eventID: eventId });
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
    const eventId = generateEventId();
    const eventData = {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: product.price * product.quantity,
        currency: 'USD',
        num_items: product.quantity
    };

    // 1. PRIMARY: Direct fbq() call (browser)
    firePixelEvent('AddToCart', eventData, eventId);

    // 2. SERVER: Conversions API
    sendToCAPI('AddToCart', eventId, eventData);

    // 3. BACKUP: GTM Data Layer
    pushToDataLayer('AddToCart', { ...eventData, eventID: eventId });
}

/**
 * Track InitiateCheckout with cart data
 */
export function trackInitiateCheckout(cart: {
    items: Array<{ id: string; quantity: number }>;
    total: number;
}) {
    const eventId = generateEventId();
    const eventData = {
        content_ids: cart.items.map(i => i.id),
        content_type: 'product',
        value: cart.total,
        currency: 'USD',
        num_items: cart.items.reduce((sum, i) => sum + i.quantity, 0)
    };

    // 1. PRIMARY: Direct fbq() call (browser)
    firePixelEvent('InitiateCheckout', eventData, eventId);

    // 2. SERVER: Conversions API
    sendToCAPI('InitiateCheckout', eventId, eventData);

    // 3. BACKUP: GTM Data Layer
    pushToDataLayer('InitiateCheckout', { ...eventData, eventID: eventId });
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

/**
 * Track PageView for SPA navigation
 * Call this on route changes in your React Router
 */
export function trackPageView(url?: string) {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        return;
    }

    try {
        window.fbq('track', 'PageView');

        if (DEBUG_MODE) {
            console.log('[Meta Pixel] PageView tracked:', url || window.location.href);
        }
    } catch (error) {
        console.error('[Meta Pixel] Error tracking PageView:', error);
    }
}

/**
 * Track ViewCategory when user browses product category/shop page
 */
export function trackViewCategory(category: {
    name: string;
    productCount?: number;
}) {
    const eventId = generateEventId();
    const eventData = {
        content_category: category.name,
        content_type: 'product_group',
        num_items: category.productCount
    };

    // ViewCategory is a custom event (not standard)
    firePixelEvent('ViewCategory', eventData, eventId);
    pushToDataLayer('ViewCategory', { ...eventData, eventID: eventId });
}

/**
 * Track Search queries
 */
export function trackSearch(searchTerm: string) {
    const eventId = generateEventId();
    const eventData = {
        search_string: searchTerm
    };

    firePixelEvent('Search', eventData, eventId);
    pushToDataLayer('Search', { ...eventData, eventID: eventId });
}

/**
 * Track Contact form submissions
 */
export function trackContact() {
    const eventId = generateEventId();

    firePixelEvent('Contact', {}, eventId);
    pushToDataLayer('Contact', { eventID: eventId });
}
