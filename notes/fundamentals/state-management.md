# State Management

State management in React is about deciding **where data should live** and **who needs access to it**.

The main rule:

> Keep state as close as possible to where it is used.

Do not make state global unless it actually needs to be global.

---

## Quick Decision Guide

Use this order when deciding how to manage state:

| Situation | Use |
|---|---|
| One component needs the state | `useState` |
| Several nearby components need it | Lift state up |
| Complex local state logic | `useReducer` |
| Many components need client state | Zustand |
| Data comes from an API/server | TanStack Query / framework data fetching |
| Simple app-wide dependency | Context |

---

# 1. Local State

Use `useState` when the state belongs to a component.

```tsx
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Count: {count}
    </button>
  )
}
```

Examples:

- Modal open/closed
- Selected tab
- Input value
- Dropdown state
- Temporary UI state

### Rule

Don't put local state in a global store.

❌ Avoid:

```tsx
useAppStore((state) => state.isModalOpen)
```

when only one component needs the modal state.

✅ Prefer:

```tsx
const [isOpen, setIsOpen] = useState(false)
```

---

# 2. Lift State Up

If two or more nearby components need the same state, move the state to their closest common parent.

```tsx
function ProductsPage() {
  const [search, setSearch] = useState("")

  return (
    <>
      <SearchInput
        value={search}
        onChange={setSearch}
      />

      <ProductList search={search} />
    </>
  )
}
```

Think:

```text
ProductsPage
     │
     ├── SearchInput
     │
     └── ProductList
```

The parent owns the state because both children need it.

---

# 3. Derived State

Don't store something in state if you can calculate it from existing state.

❌ Avoid:

```tsx
const [products, setProducts] = useState([])
const [productCount, setProductCount] = useState(0)
```

Now two states need to stay synchronized.

✅ Prefer:

```tsx
const [products, setProducts] = useState([])

const productCount = products.length
```

Another example:

```tsx
const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
)
```

### Rule

> If a value can be calculated from existing state or props, derive it instead of storing another copy.

---

# 4. Complex Local State

Use `useReducer` when several state changes belong together or transitions are becoming difficult to manage.

```tsx
type State = {
  quantity: number
}

type Action =
  | { type: "increment" }
  | { type: "decrement" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        quantity: state.quantity + 1,
      }

    case "decrement":
      return {
        ...state,
        quantity: state.quantity - 1,
      }

    default:
      return state
  }
}
```

Usage:

```tsx
const [state, dispatch] = useReducer(reducer, {
  quantity: 0,
})

dispatch({ type: "increment" })
```

Don't automatically replace every `useState` with `useReducer`.

Use it when the state transitions genuinely become complex.

---

# 5. Global Client State

Use global state when unrelated parts of the application need the same **client-side state**.

Examples:

- Shopping cart
- Sidebar preferences
- Multi-step workflow state
- Complex application filters
- Selected organization/workspace

A simple option is **Zustand**.

Install:

```bash
npm install zustand
```

Create a store:

```tsx
import { create } from "zustand"

type CartStore = {
  itemCount: number
  addItem: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  itemCount: 0,

  addItem: () =>
    set((state) => ({
      itemCount: state.itemCount + 1,
    })),
}))
```

Use it:

```tsx
const itemCount = useCartStore((state) => state.itemCount)
const addItem = useCartStore((state) => state.addItem)
```

### Prefer selectors

✅ Good:

```tsx
const itemCount = useCartStore((state) => state.itemCount)
```

Avoid subscribing to the entire store unnecessarily:

```tsx
const store = useCartStore()
```

Selecting only what the component needs can reduce unnecessary re-renders.

---

# 6. Server State

Data coming from an API is different from normal client state.

For example:

```text
GET /api/products
GET /api/users
GET /api/orders
```

This data often needs:

- Loading state
- Error handling
- Caching
- Refetching
- Mutations
- Cache invalidation

Instead of putting all API data into Zustand:

```tsx
const products = useProductStore((state) => state.products)
```

consider a server-state solution such as **TanStack Query**:

```tsx
const {
  data,
  isPending,
  error,
} = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
})
```

Think of it as:

```text
Client State
    ↓
useState / useReducer / Zustand

Server State
    ↓
TanStack Query / Next.js data fetching
```

---

# 7. Context

Context is useful for values that need to be available throughout a component tree.

Common examples:

```text
Theme
Authentication context
Locale
Application configuration
```

Example:

```tsx
const ThemeContext = createContext<Theme | null>(null)
```

Context is not automatically a replacement for Zustand or other state-management libraries.

Use the simplest tool that solves the problem.

---

# State Categories

Before choosing a library, identify what kind of state you have.

## Local UI State

```tsx
const [isOpen, setIsOpen] = useState(false)
```

Use:

```text
useState
```

---

## Shared Client State

```text
Cart
Application preferences
Workflow state
Complex shared filters
```

Use:

```text
Zustand
Context
```

depending on the problem.

---

## Server State

```text
Users
Products
Orders
API results
```

Use:

```text
TanStack Query
Next.js server-side data fetching
```

---

## URL State

For things such as:

```text
/products?page=2&search=iphone&status=active
```

consider keeping the state in the URL.

This makes filters:

- Shareable
- Bookmarkable
- Compatible with browser navigation

Don't automatically put URL-friendly state into Zustand.

---

# Common Mistakes

### 1. Making everything global

❌

```text
Everything → Zustand
```

✅

```text
Local UI state → useState

Complex local state → useReducer

Shared client state → Zustand

Server state → TanStack Query / Next.js

Search/filter/page → often URL
```

### 2. Duplicating state

❌

```tsx
const [users, setUsers] = useState([])
const [userCount, setUserCount] = useState(0)
```

✅

```tsx
const [users, setUsers] = useState([])

const userCount = users.length
```

### 3. Using `useEffect` to synchronize derived state

❌

```tsx
useEffect(() => {
  setFilteredProducts(
    products.filter((product) =>
      product.name.includes(search)
    )
  )
}, [products, search])
```

Often you can simply derive it:

```tsx
const filteredProducts = products.filter((product) =>
  product.name.includes(search)
)
```

---

# Mental Model

When you encounter state, ask:

```text
What kind of state is this?
        │
        ├── Only this component?
        │       └── useState
        │
        ├── Several nearby components?
        │       └── Lift state up
        │
        ├── Complex local transitions?
        │       └── useReducer
        │
        ├── Shared client state?
        │       └── Zustand / Context
        │
        ├── From an API?
        │       └── TanStack Query / Next.js
        │
        └── Should it be in the URL?
                └── Search params / route
```

---

# Senior-Level Rule

The goal is **not** to use the most powerful state-management library.

The goal is to use the **simplest state model that correctly represents the application**.

Before creating global state, ask:

1. Who needs this state?
2. Who should own it?
3. Is it client state or server state?
4. Can it be derived instead?
5. Should it live in the URL?
6. Does it actually need to be global?

If `useState` solves the problem cleanly, use `useState`.
