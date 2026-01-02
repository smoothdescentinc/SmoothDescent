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
    <section id="products" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">
            Shop By What You Need
          </h2>
          <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Targeted solutions designed to support every stage of your GLP-1 journey.
          </p>
        </div>

        {$isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {$products.map((product) => (
              <div key={product.id} className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">

                {/* Image Container */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square bg-gray-100 overflow-hidden cursor-pointer">
                  <span className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 tracking-widest uppercase">
                    {product.category}
                  </span>
                  {product.bestSeller && (
                    <span className="absolute top-4 right-4 bg-brand-secondary text-brand-dark text-[10px] font-bold px-3 py-1.5 rounded-full z-10 tracking-widest uppercase">
                      Best Seller
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>

                {/* Details */}
                <div className="flex-grow flex flex-col p-6">
                  <Link to={`/product/${product.id}`} className="hover:text-brand-primary transition-colors">
                    <h3 className="text-xl font-bold font-serif text-brand-dark mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-brand-secondary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} strokeWidth={i < product.rating ? 0 : 2} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">({product.reviews} REVIEWS)</span>
                  </div>

                  {product.description && (
                    <p className="text-brand-dark/70 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-4">
                    <div className="flex flex-col">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through mb-0.5">${product.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-brand-dark font-serif">${product.price}</span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="secondary" className="px-6 py-2 text-sm">Add to Cart</Button>
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