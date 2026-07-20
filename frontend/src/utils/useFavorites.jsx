import React, { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'tienda:favorites'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites))
    } catch {}
  }, [favorites])

  const toggle = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggle }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    return { favorites: [], toggle: () => {} }
  }
  return ctx
}
