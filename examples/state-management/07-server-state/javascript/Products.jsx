import { useQuery } from "@tanstack/react-query"

async function getProducts() {
  const response = await fetch("/api/products")
  if (!response.ok) throw new Error("Failed to load products")
  return response.json()
}

export default function Products() {
  const { data: products = [], isPending, isError } = useQuery({ queryKey: ["products"], queryFn: getProducts })
  if (isPending) return <p>Loading...</p>
  if (isError) return <p>Could not load products.</p>
  return <ul>{products.map((product) => <li key={product.id}>{product.name}</li>)}</ul>
}
