'use client';

import { motion } from 'framer-motion';
import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } },
};

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}