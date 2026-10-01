"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function ProductFilters() {
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""
  function updateSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    value ? params.set("search", value) : params.delete("search")
    router.replace(`${pathname}?${params.toString()}`)
  }
  return <input value={search} onChange={(event) => updateSearch(event.target.value)} placeholder="Search products" />
}
