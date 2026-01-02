import shopify from 'shopify-buy';

const domain = import.meta.env.PUBLIC_SHOPIFY_DOMAIN || 'mock-shop.myshopify.com';
const storefrontAccessToken = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN || 'mock-token';

export const shopifyClient = shopify.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01',
});
