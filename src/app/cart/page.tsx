'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, TrashSimple, ShoppingBag, Tag } from '@phosphor-icons/react/dist/ssr';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';
import EmptyState from '@/components/ui/EmptyState';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = 0;
  const total = subtotal - discount + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-8">Shopping Cart</h1>
        <EmptyState
          icon={<ShoppingBag size={64} />}
          title="Your cart is empty"
          description="Start shopping to add items to your cart."
          actionLabel="Continue Shopping"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Shopping Cart</h1>
      <p className="text-zinc-400 text-sm mb-8">{items.length} item{items.length !== 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Items */}
        <div>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedVariant}`}
                layout
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.25 }}
                className="flex gap-5 py-6 border-b border-slate-100"
              >
                <Link href={`/product/${item.product.slug}`} className="flex-none">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-400 mb-0.5">{item.product.brand}</p>
                  <Link href={`/product/${item.product.slug}`}>
                    <p className="font-semibold text-zinc-900 leading-snug hover:text-emerald-600 transition-colors">
                      {item.product.name}
                    </p>
                  </Link>
                  {(item.selectedColor || item.selectedVariant) && (
                    <p className="text-xs text-zinc-400 mt-1">
                      {[item.selectedColor, item.selectedVariant].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:bg-slate-50 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:bg-slate-50 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-zinc-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-300 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashSimple size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-zinc-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Promo discount (10%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                  {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-zinc-600">
                <span>Tax (est.)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-zinc-900">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />
              <button
                onClick={() => { if (promoCode) setPromoApplied(true); }}
                className="bg-slate-100 hover:bg-slate-200 text-zinc-700 text-sm font-medium rounded-xl px-4 transition-colors"
              >
                <Tag size={16} />
              </button>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-[#000435] text-white rounded-xl py-4 font-medium hover:bg-[#000328] active:scale-[0.98] transition-all mb-3 text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" fill="currentColor"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z"/></svg>
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="block text-center text-sm text-zinc-400 hover:text-zinc-700 transition-colors">
              Continue Shopping
            </Link>

            <div className="flex items-center justify-center gap-3 mt-5">
              {['Visa', 'Mastercard', 'Apple Pay', 'PayPal'].map((p) => (
                <span key={p} className="text-xs text-zinc-300 font-medium">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}