import { create } from 'zustand';
import { Product, CartItem } from './data';

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, selectedColor: string, selectedVariant: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product, quantity, selectedColor, selectedVariant) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === selectedColor &&
          i.selectedVariant === selectedVariant
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id &&
            i.selectedColor === selectedColor &&
            i.selectedVariant === selectedVariant
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity, selectedColor, selectedVariant }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
