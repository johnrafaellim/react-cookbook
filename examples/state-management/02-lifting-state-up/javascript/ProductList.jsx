export default function ProductList({ products, search }) {
  const filtered = products.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase()),
  )

  return <ul>{filtered.map((product) => <li key={product}>{product}</li>)}</ul>
}
