/**
 * Meta Pixel User Data Utilities
 * 
 * This module handles hashing and storing customer information for Meta Pixel events.
 * All data is hashed using SHA-256 before being sent to Meta for privacy compliance.
 */

/**
 * Hash a string using SHA-256
 */
async function sha256Hash(value: string): Promise<string> {
    const normalized = value.toLowerCase().trim();
    const msgBuffer = new TextEncoder().encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Store user email (hashed) in localStorage
 */
export async function captureUserEmail(email: string): Promise<void> {
    if (!email || typeof window === 'undefined') return;

    try {
        const hashedEmail = await sha256Hash(email);
        localStorage.setItem('_user_em', hashedEmail);
    } catch (error) {
        console.error('Failed to hash email:', error);
    }
}

/**
 * Get stored user data for pixel events
 */
export function getUserData(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    const hashedEmail = localStorage.getItem('_user_em');

    if (hashedEmail) {
        return { em: hashedEmail };
    }

    return {};
}

/**
 * Clear stored user data (e.g., on logout)
 */
export function clearUserData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('_user_em');
}
