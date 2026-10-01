import { useState } from "react"

type CartItem = { id: number; name: string; price: number }
const initialItems: CartItem[] = [{ id: 1, name: "Keyboard", price: 50 }, { id: 2, name: "Mouse", price: 25 }]

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <p>Items: {items.length}</p>
      <p>Total: ${total}</p>
      <button onClick={() => setItems([])}>Clear cart</button>
    </>
  )
}
