import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import MyBooks from './pages/MyBooks'
import Cart from './components/Cart'

const STORAGE_KEY = 'tienda:theme'

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem(STORAGE_KEY) || 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="app">
      <header>
        <div>
          <h1>Tienda de Libros</h1>
          <nav>
            <Link to="/">Todos los libros</Link>
            <Link to="/my">Mis libros</Link>
          </nav>
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
      </header>
      <main className="layout">
        <section className="content">
          <Routes>
            <Route path="/" element={<AllBooks />} />
            <Route path="/my" element={<MyBooks />} />
          </Routes>
        </section>
        <Cart />
      </main>
    </div>
  )
}
