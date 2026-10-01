import { useState } from "react"
import SearchInput from "./SearchInput"
import ProductList from "./ProductList"

const products = ["Keyboard", "Mouse", "Monitor", "Laptop"]

export default function ProductSearch() {
  const [search, setSearch] = useState("")

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <ProductList products={products} search={search} />
    </>
  )
}
