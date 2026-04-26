'use client'

import { createContext, useContext } from 'react'

interface ThemeContextType {
  theme: any
  settings: Record<string, string>
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  settings: {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({
  children,
  theme,
  settings,
}: {
  children: React.ReactNode
  theme: any
  settings: Record<string, string>
}) {
  return (
    <ThemeContext.Provider value={{ theme, settings }}>
      {children}
    </ThemeContext.Provider>
  )
}
