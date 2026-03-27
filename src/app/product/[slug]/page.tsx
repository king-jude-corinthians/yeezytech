'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Truck, ArrowsClockwise, ShieldCheck, Minus, Plus, ShoppingBag, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { getProductBySlug, getRelatedProducts, getReviewsByProductId } from '@/lib/data';
import { useCartStore } from '@/lib/cart-store';
import { useWishlistStore } from '@/lib/wishlist-store';
import { formatCurrency, formatDate } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Tabs from '@/components/ui/Tabs';
import ProductCard from '@/components/product/ProductCard';

const TABS = [
  { label: 'Overview', value: 'overview' },
  { label: 'Specifications', value: 'specs' },
  { label: 'Comparisons', value: 'comparisons' },
  { label: 'Reviews', value: 'reviews' },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();
  // product is guaranteed non-null below after notFound() throws

  const related = getRelatedProducts(product);
  const reviews = getReviewsByProductId(product.id);
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.value ?? '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    addToCart(product!, quantity, selectedColor, selectedVariant);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      {/* Product hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 mb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-zinc-900' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">{product.brand}</p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-zinc-400">({product.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-zinc-900">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-zinc-400 line-through">{formatCurrency(product.originalPrice)}</span>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Save {formatCurrency(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="text-zinc-500 leading-relaxed mb-6">{product.shortDescription}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Color — <span className="text-zinc-700 normal-case font-normal">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === c.name ? 'border-zinc-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Storage</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setSelectedVariant(v.value)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      selectedVariant === v.value
                        ? 'bg-[#000435] text-white border-[#000435]'
                        : 'bg-white text-zinc-600 border-slate-200 hover:border-zinc-400'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-slate-50 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#000435] text-white rounded-xl py-4 font-medium flex items-center justify-center gap-2 hover:bg-[#000328] active:scale-[0.98] transition-all mb-3"
          >
            {addedToCart ? (
              <><CheckCircle size={18} weight="fill" className="text-emerald-400" /> Added to Cart</>
            ) : (
              <><ShoppingBag size={18} /> Add to Cart</>
            )}
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className="w-full border border-slate-200 rounded-xl py-3.5 text-sm font-medium flex items-center justify-center gap-2 hover:border-zinc-400 active:scale-[0.98] transition-all text-zinc-700"
          >
            <Heart size={16} weight={isInWishlist ? 'fill' : 'regular'} className={isInWishlist ? 'text-red-500' : ''} />
            {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
          </button>

          {/* Shipping info */}
          <div className="mt-6 space-y-2">
            {[
              { icon: <Truck size={14} />, text: 'Free shipping on orders over $50' },
              { icon: <ArrowsClockwise size={14} />, text: '30-day hassle-free returns' },
              { icon: <ShieldCheck size={14} />, text: '100% authentic, authorized retailer' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="text-emerald-600">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <div className="py-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {Object.entries(product.specs).slice(0, 6).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle size={16} weight="fill" className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-600"><strong className="text-zinc-900">{key}:</strong> {value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img src={product.images[1] ?? product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium text-zinc-700 w-1/3">{key}</td>
                      <td className="py-3 px-4 text-zinc-500">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'comparisons' && (
            <div className="overflow-x-auto">
              {related.length > 0 ? (
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="py-4 px-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Spec</th>
                      <th className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <img src={product.images[0]} alt={product.name} className="w-16 h-12 object-cover rounded-lg bg-slate-100" />
                          <span className="font-semibold text-zinc-900">{product.name}</span>
                        </div>
                      </th>
                      {related.slice(0, 2).map((r) => (
                        <th key={r.id} className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <img src={r.images[0]} alt={r.name} className="w-16 h-12 object-cover rounded-lg bg-slate-100" />
                            <span className="font-semibold text-zinc-600">{r.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-slate-50">
                      <td className="py-3 px-4 font-medium text-zinc-700">Price</td>
                      <td className="py-3 px-4 text-center font-bold text-zinc-900">{formatCurrency(product.price)}</td>
                      {related.slice(0, 2).map((r) => (
                        <td key={r.id} className="py-3 px-4 text-center text-zinc-500">{formatCurrency(r.price)}</td>
                      ))}
                    </tr>
                    {Object.keys(product.specs).slice(0, 6).map((key, i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="py-3 px-4 font-medium text-zinc-700">{key}</td>
                        <td className="py-3 px-4 text-center text-emerald-700 font-medium">{product.specs[key]}</td>
                        {related.slice(0, 2).map((r) => (
                          <td key={r.id} className="py-3 px-4 text-center text-zinc-400">{r.specs[key] ?? '—'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-zinc-400 py-8">No related products to compare.</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating breakdown */}
              <div className="flex flex-col md:flex-row gap-8 mb-10 pb-10 border-b border-slate-100">
                <div className="text-center">
                  <p className="text-6xl font-bold text-zinc-900">{product.rating}</p>
                  <StarRating rating={product.rating} size="lg" />
                  <p className="text-sm text-zinc-400 mt-1">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {ratingBreakdown.map(({ star, count }) => (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500 w-4">{star}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-amber-400 h-2 rounded-full transition-all"
                          style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : '0%' }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 w-4">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews list */}
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-100 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-zinc-900">{review.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} size="sm" />
                            {review.verified && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                <CheckCircle size={12} weight="fill" /> Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400">{formatDate(review.date)}</p>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed mb-2">{review.body}</p>
                      <p className="text-xs font-medium text-zinc-500">{review.author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">No reviews yet for this product.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">You Might Also Like</h2>
          <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-2">
            {related.map((p) => (
              <div key={p.id} className="flex-none w-[240px] md:w-[260px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}