import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import MyBooks from './pages/MyBooks'
import Cart from './components/Cart'

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Tienda de Libros</h1>
        <nav>
          <Link to="/">All Books</Link>
          <Link to="/my">My Books</Link>
        </nav>
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
