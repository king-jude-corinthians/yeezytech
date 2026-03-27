'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from '@phosphor-icons/react/dist/ssr';
import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/cart-store';
import { useWishlistStore } from '@/lib/wishlist-store';
import { formatCurrency } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(
      product,
      1,
      product.colors[0]?.name ?? '',
      product.variants[0]?.value ?? ''
    );
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist(product);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div
          className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-shadow duration-300"
          style={{ boxShadow: hovered ? '0 20px 40px -15px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          {/* Image area */}
          <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Badges */}
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-zinc-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                New
              </span>
            )}
            {product.isDeal && product.originalPrice && (
              <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
                Sale
              </span>
            )}
            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-90"
              aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                size={15}
                weight={isInWishlist ? 'fill' : 'regular'}
                className={isInWishlist ? 'text-red-500' : 'text-zinc-400'}
              />
            </button>
            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="bg-zinc-900/80 backdrop-blur-sm text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5">
                <Eye size={14} />
                Quick View
              </span>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 mb-1">
              {product.brand}
            </p>
            <h3 className="text-sm font-semibold text-zinc-900 leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-zinc-400">({product.reviewCount})</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-zinc-900">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            {/* Add to Cart — always visible on mobile, hover on desktop */}
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              onClick={handleAddToCart}
              className="mt-3 w-full bg-zinc-900 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-[0.98] transition-all md:flex hidden"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </motion.button>
            <button
              onClick={handleAddToCart}
              className="mt-3 w-full bg-zinc-900 text-white text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-[0.98] transition-all md:hidden"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}