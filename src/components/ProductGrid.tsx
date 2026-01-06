import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { products, isLoading, fetchProducts } from '../store/productsStore';
import Button from './Button';
import { Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductGrid: React.FC = () => {
  const $products = useStore(products);
  const $isLoading = useStore(isLoading);

  useEffect(() => {
    // Ensure products are loaded if they happen to be empty (e.g. fresh nav)
    if ($products.length === 0 && !$isLoading) {
      fetchProducts();
    }
  }, []);

  return (
    <section id="products" className="py-12 md:py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
            Shop By What You Need
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto hidden md:block">
            Targeted solutions designed to support every stage of your GLP-1 journey.
          </p>
        </div>

        {$isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {$products.map((product) => (
              <div key={product.id} className="group relative flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">

                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square bg-gray-100 overflow-hidden cursor-pointer">
                  <span className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#D4A5A5] text-white text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full z-10 tracking-widest uppercase shadow-sm">
                    {product.category}
                  </span>
                  {product.bestSeller && (
                    <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand-secondary text-brand-dark text-[9px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full z-10 tracking-widest uppercase shadow-sm">
                      Best Seller
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover scale-[1.12] group-hover:scale-[1.15] transition-transform duration-700"
                  />
                </Link>

                {/* Details */}
                <div className="flex-grow flex flex-col p-3 md:p-6">
                  <Link to={`/product/${product.id}`} className="hover:text-brand-primary transition-colors">
                    <h3 className="text-sm md:text-xl font-bold font-serif text-brand-dark mb-1 md:mb-2 line-clamp-2 md:line-clamp-none leading-tight min-h-[2.5em] md:min-h-0">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4">
                    <div className="flex text-brand-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < product.rating ? "currentColor" : "none"} strokeWidth={i < product.rating ? 0 : 2} className="md:w-3.5 md:h-3.5" />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium">({product.reviews})</span>
                  </div>

                  {product.description && (
                    <p className="hidden md:block text-brand-dark/70 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-auto flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through mb-0 text-left">${product.originalPrice}</span>
                      )}
                      <span className="text-lg md:text-2xl font-bold text-brand-dark font-serif text-left">${product.price}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="w-full md:w-auto">
                      <Button variant="secondary" className="w-full md:w-auto px-4 py-1.5 md:py-2 text-xs md:text-sm h-8 md:h-10 flex items-center justify-center">Add</Button>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductGrid;