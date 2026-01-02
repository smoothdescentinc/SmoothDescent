/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#4A3C47', // Deep Plum
                    primary: '#C89F9C', // Dusty Rose
                    accent: '#D4A59A', // Soft Terracotta
                    light: '#FAF7F2', // Warm Ivory
                    secondary: '#E8D5B7', // Pale Gold
                    success: '#B8C5B4', // Sage Mist
                    cream: '#F2EFEA', // Cool Cream
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['DM Sans', 'serif'], // Used for headings
            },
            keyframes: {
                slideIn: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                }
            },
            animation: {
                'slide-in': 'slideIn 0.3s ease-out',
            }
        }
    },
    plugins: [],
}
