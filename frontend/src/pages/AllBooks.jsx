import React, { useEffect, useState } from 'react'
import useFavorites from '../utils/useFavorites.jsx'
import useCart from '../utils/cart.jsx'
import BookCard from '../components/BookCard.jsx'

export default function AllBooks() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { toggle } = useFavorites()
  const { add } = useCart()

  useEffect(() => {
    setLoading(true)
    setError('')

    fetch('/api/libros')
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`)
        return r.json()
      })
      .then((data) => setBooks(data.libros || []))
      .catch((err) => {
        console.error(err)
        setBooks([])
        setError('No se pudo cargar el catálogo. Intenta de nuevo.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Todos los libros</h2>

      {loading ? (
        <p>Cargando libros...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : books.length === 0 ? (
        <p>No hay libros disponibles.</p>
      ) : (
        <div className="grid">
          {books.map((b) => (
            <BookCard key={b.id} book={b} onToggle={toggle} onAdd={add} />
          ))}
        </div>
      )}
    </section>
  )
}
