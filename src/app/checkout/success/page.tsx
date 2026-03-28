import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent?: string };
}) {
  const paymentId = searchParams.payment_intent;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f9fafb] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[500px] text-center">

        {/* Success icon */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={44} weight="fill" className="text-emerald-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-zinc-500 leading-relaxed mb-8 max-w-[36ch] mx-auto">
          Thank you for your purchase. We&apos;ve received your order and will begin
          processing it right away.
        </p>

        {/* Order details card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#000435]/8 flex items-center justify-center">
              <Package size={18} className="text-[#000435]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Your order is being prepared</p>
              <p className="text-xs text-zinc-400 mt-0.5">Expected delivery in 2 business days</p>
            </div>
          </div>

          {paymentId && (
            <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
              <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                Payment Reference
              </p>
              <p className="text-xs font-mono text-zinc-600 break-all">{paymentId}</p>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="flex justify-between text-center mb-8 px-4">
          {[
            { label: 'Order placed', done: true },
            { label: 'Processing', done: false },
            { label: 'Shipped', done: false },
            { label: 'Delivered', done: false },
          ].map((step, i) => (
            <div key={step.label} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.done
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step.done ? '✓' : i + 1}
              </div>
              <p className={`text-[10px] ${step.done ? 'text-zinc-700 font-medium' : 'text-zinc-400'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="bg-[#000435] text-white rounded-xl px-7 py-3 text-sm font-semibold hover:bg-[#000328] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-200 text-zinc-700 rounded-xl px-7 py-3 text-sm font-semibold hover:bg-slate-50 transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
