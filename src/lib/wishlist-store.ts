import { create } from 'zustand';
import { Product } from './data';

type WishlistStore = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addToWishlist: (product) =>
    set((state) => {
      if (state.items.find((i) => i.id === product.id)) return state;
      return { items: [...state.items, product] };
    }),
  removeFromWishlist: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
    })),
  isInWishlist: (productId) => get().items.some((i) => i.id === productId),
  toggleWishlist: (product) => {
    const state = get();
    if (state.items.some((i) => i.id === product.id)) {
      set({ items: state.items.filter((i) => i.id !== product.id) });
    } else {
      set({ items: [...state.items, product] });
    }
  },
}));
