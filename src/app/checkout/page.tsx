'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { LockSimple, ShieldCheck, CaretLeft } from '@phosphor-icons/react/dist/ssr';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

/* ─── Inner payment form (needs Elements context) ─────────────────────── */
function CheckoutForm({
  total,
  onSuccess,
}: {
  total: number;
  onSuccess: (paymentIntentId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping fields
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity]       = useState('');
  const [zip, setZip]         = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setError('');
    setLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Payment failed');
      setLoading(false);
      return;
    }

    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(total * 100),
        items: [],
      }),
    });

    const { clientSecret, error: apiError } = await res.json();
    if (apiError || !clientSecret) {
      setError(apiError ?? 'Could not initialize payment');
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        payment_method_data: {
          billing_details: { name, email, address: { line1: address, city, postal_code: zip } },
        },
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed');
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent.id);
    }
  }

  const inputClass =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#000435]/20 focus:border-[#000435] transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900 mb-5">Shipping Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Address</label>
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main Street" required className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">City</label>
              <input value={city} onChange={e => setCity(e.target.value)} placeholder="New York" required className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">ZIP Code</label>
              <input value={zip} onChange={e => setZip(e.target.value)} placeholder="10001" required className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900 mb-5">Payment Details</h2>
        <PaymentElement
          options={{
            layout: 'tabs',
            wallets: { applePay: 'auto', googlePay: 'auto' },
          }}
        />
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pay button */}
      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-[#000435] text-white rounded-xl py-4 text-sm font-semibold hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <LockSimple size={15} weight="fill" />
            Pay {formatCurrency(total)}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
        <ShieldCheck size={13} />
        Secured by Stripe · 256-bit SSL encryption
      </div>
    </form>
  );
}

/* ─── Checkout page wrapper ────────────────────────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const paymentSucceeded = useRef(false);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 3000;
  const tax      = 0;
  const total    = subtotal + shipping + tax;

  // Redirect to cart if empty (but not after a successful payment)
  useEffect(() => {
    if (items.length === 0 && !paymentSucceeded.current) router.push('/cart');
  }, [items.length, router]);

  function handleSuccess(paymentIntentId: string) {
    paymentSucceeded.current = true;
    router.push(`/checkout/success?payment_intent=${paymentIntentId}`);
    clearCart();
  }

  if (items.length === 0 && !paymentSucceeded.current) return null;

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#000435',
      colorBackground: '#ffffff',
      colorText: '#18181b',
      colorDanger: '#ef4444',
      fontFamily: 'inherit',
      borderRadius: '12px',
      spacingUnit: '4px',
    },
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] py-8 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <CaretLeft size={14} /> Back to cart
          </Link>
          <div className="h-4 w-px bg-slate-200" />
          <h1 className="text-xl font-bold text-zinc-900">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: form */}
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: Math.round(total * 100),
              currency: 'ngn',
              appearance,
            }}
          >
            <CheckoutForm total={total} onSuccess={handleSuccess} />
          </Elements>

          {/* Right: order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-base font-semibold text-zinc-900 mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedVariant}`}
                    className="flex gap-3"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {[item.selectedColor, item.selectedVariant].filter(Boolean).join(' · ')}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 flex-shrink-0">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-zinc-900 text-base pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Payment icons */}
              <div className="flex items-center gap-2.5 mt-5 pt-5 border-t border-slate-100">
                {['VISA', 'MC', 'AMEX', 'GPay', 'AliPay'].map((p) => (
                  <span
                    key={p}
                    className="text-[10px] font-bold text-zinc-400 border border-slate-200 rounded-md px-2 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
