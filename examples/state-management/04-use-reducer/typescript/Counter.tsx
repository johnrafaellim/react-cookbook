import { useReducer } from "react"

type State = { count: number }
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment": return { count: state.count + 1 }
    case "decrement": return { count: state.count - 1 }
    case "reset": return { count: 0 }
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return <>
    <p>{state.count}</p>
    <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    <button onClick={() => dispatch({ type: "increment" })}>+</button>
  </>
}
