import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Meta Pixel Purchase Event Tracker
 * 
 * This component should be placed in your App.tsx or a layout component.
 * It detects when users return from Shopify checkout (thank-you page) and fires the Purchase event.
 * 
 * SHOPIFY SETUP REQUIRED:
 * In your Shopify admin, go to Settings > Checkout and add this script to "Additional Scripts":
 * 
 * <script>
 *   if (Shopify && Shopify.checkout) {
 *     const urlParams = new URLSearchParams(window.location.search);
 *     const redirectUrl = new URL('{YOUR_SITE_URL}');
 *     redirectUrl.searchParams.set('purchase', '1');
 *     redirectUrl.searchParams.set('order_id', Shopify.checkout.order_id);
 *     redirectUrl.searchParams.set('total', Shopify.checkout.total_price);
 *     window.location.href = redirectUrl.toString();
 *   }
 * </script>
 */
const MetaPurchaseTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.get('purchase') === '1') {
            const orderId = params.get('order_id');
            const orderTotal = params.get('total');

            if (typeof window !== 'undefined' && (window as any).fbq && orderId && orderTotal) {
                (window as any).fbq('track', 'Purchase', {
                    value: parseFloat(orderTotal),
                    currency: 'USD',
                    order_id: orderId
                });

                // Clean up URL so it doesn't fire again on refresh
                const cleanUrl = window.location.pathname + window.location.hash;
                window.history.replaceState({}, document.title, cleanUrl);
            }
        }
    }, [location]);

    return null;
};

export default MetaPurchaseTracker;
