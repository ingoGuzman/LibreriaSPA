import React, { createContext, useContext, useEffect, useState } from 'react'

const KEY = 'tienda:cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const add = (book) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === book.id)
      if (found) return prev.map((i) => (i.id === book.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: book.id, nombre: book.nombre, qty: 1 }]
    })
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const clear = () => setItems([])

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export default function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) return { items: [], add: () => {}, remove: () => {}, clear: () => {} }
  return ctx
}
