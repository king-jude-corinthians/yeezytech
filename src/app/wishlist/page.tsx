'use client';

import { Heart, ShoppingBag } from '@phosphor-icons/react/dist/ssr';
import { useWishlistStore } from '@/lib/wishlist-store';
import { useCartStore } from '@/lib/cart-store';
import ProductGrid from '@/components/product/ProductGrid';
import EmptyState from '@/components/ui/EmptyState';

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addToCart);

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-8">My Wishlist</h1>
        <EmptyState
          icon={<Heart size={64} />}
          title="Your wishlist is empty"
          description="Browse products and tap the heart icon to save your favorites here."
          actionLabel="Browse Products"
          actionHref="/shop"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">My Wishlist</h1>
          <p className="text-zinc-400 text-sm">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <ProductGrid products={items} />
    </div>
  );
}