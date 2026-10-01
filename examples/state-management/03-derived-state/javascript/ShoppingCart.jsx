import { useState } from "react"

const initialItems = [{ id: 1, name: "Keyboard", price: 50 }, { id: 2, name: "Mouse", price: 25 }]

export default function ShoppingCart() {
  const [items, setItems] = useState(initialItems)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <p>Items: {items.length}</p>
      <p>Total: ${total}</p>
      <button onClick={() => setItems([])}>Clear cart</button>
    </>
  )
}
