type ProductListProps = { products: string[]; search: string }

export default function ProductList({ products, search }: ProductListProps) {
  const filtered = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase()),
  )

  return <ul>{filtered.map((product) => <li key={product}>{product}</li>)}</ul>
}
