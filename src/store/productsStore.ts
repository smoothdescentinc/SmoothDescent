import { atom, onMount } from 'nanostores';
import { shopifyClient } from '../lib/shopify';
import { PRODUCTS as MOCK_PRODUCTS } from '../constants';
import type { Product, PricingTier } from '../types';

export const products = atom<Product[]>([]);
export const isLoading = atom<boolean>(false);

// Helper to map Shopify product to our internal Product type
const mapShopifyProduct = (shopifyProduct: any): Product => {
    // Map variants to tiers
    // Assumes variants are named "1 Bottle", "2 Bottles", etc. or similar logic
    const tiers: PricingTier[] = shopifyProduct.variants.map((v: any) => ({
        id: v.id,
        quantity: 1, // Logic to determine qty from title needed if not explicit
        label: v.title,
        subLabel: "", // Shopify doesn't have sublabel natively, maybe use metafields later
        price: parseFloat(v.price.amount),
        originalPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : undefined,
    }));

    return {
        id: shopifyProduct.id,
        name: shopifyProduct.title,
        category: shopifyProduct.productType || "General",
        rating: 5, // Placeholder or from metafields
        reviews: 0, // Placeholder
        image: shopifyProduct.images[0]?.src || '',
        price: parseFloat(shopifyProduct.variants[0]?.price.amount || '0'),
        description: shopifyProduct.description,
        tiers: tiers.length > 0 ? tiers : undefined,
        // Preserve other fields as mock/defaults for now since Shopify data may be sparse
    };
};

export async function fetchProducts() {
    isLoading.set(true);
    try {
        if (!import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN || import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN.includes('mock')) {
            console.log("Using Mock Data (No Valid Shopify Token)");
            products.set(MOCK_PRODUCTS);
            return;
        }

        const shopifyProducts = await shopifyClient.product.fetchAll();

        if (!shopifyProducts || shopifyProducts.length === 0) {
            console.log("No products found in Shopify, using mock.");
            products.set(MOCK_PRODUCTS);
            return;
        }

        const mappedProducts = shopifyProducts.map(mapShopifyProduct);
        products.set(mappedProducts);

    } catch (error) {
        console.error("Failed to fetch products from Shopify:", error);
        // Fallback to mock data on error to prevent broken site
        products.set(MOCK_PRODUCTS);
    } finally {
        isLoading.set(false);
    }
}

// Fetch automatically on client mount if needed, or trigger manually
onMount(products, () => {
    fetchProducts();
});
