import { useState } from "react"

export default function Counter() {
  // TypeScript infers `number` from the initial value.
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount((current) => current + 1)}>
      Count: {count}
    </button>
  )
}
