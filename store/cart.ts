import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'test' | 'package';
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
          totalItems: state.totalItems + 1,
        })),
      removeItem: (id) =>
        set((state) => {
          const itemIndex = state.items.findIndex(item => item.id === id);
          if (itemIndex === -1) return state;
          
          const newItems = [...state.items];
          newItems.splice(itemIndex, 1);
          
          return {
            items: newItems,
            totalItems: state.totalItems - 1,
          };
        }),
      clearCart: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
