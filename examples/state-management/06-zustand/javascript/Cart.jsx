import { useCartStore } from "./useCartStore"

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  return <ul>{items.map((item) => <li key={item.id}>{item.name} <button onClick={() => removeItem(item.id)}>Remove</button></li>)}</ul>
}
