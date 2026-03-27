'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/lib/data';
import StarRating from '@/components/ui/StarRating';
import { formatDate } from '@/lib/utils';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

export default function ReviewCarousel() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900"
        >
          What Our Customers Say
        </motion.h2>
      </div>

      <div className="group flex gap-5 w-max">
        <motion.div
          className="flex gap-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
          style={{ willChange: 'transform' }}
        >
          {doubled.map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="w-[300px] flex-none bg-[#f9fafb] rounded-2xl p-6 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating} size="sm" />
                {review.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <CheckCircle size={12} weight="fill" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-zinc-900 mb-2 line-clamp-1">{review.title}</p>
              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-4">{review.body}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-zinc-700">{review.author}</p>
                <p className="text-xs text-zinc-400">{formatDate(review.date)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
