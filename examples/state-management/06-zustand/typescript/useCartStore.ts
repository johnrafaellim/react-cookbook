import { create } from "zustand"

export type Product = { id: number; name: string; price: number }
type CartStore = { items: Product[]; addItem: (product: Product) => void; removeItem: (id: number) => void }

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}))
