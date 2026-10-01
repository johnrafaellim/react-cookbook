import { useTheme } from "./ThemeContext"

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Theme: {theme}</button>
}
