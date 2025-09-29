import { ThemeProvider } from "../theme-provider"
import { ThemeToggle } from "../theme-toggle"

export default function ThemeToggleExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="p-4 bg-background">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}