import React, { useEffect, useState } from 'react'
import useFavorites from '../utils/useFavorites.jsx'
import useCart from '../utils/cart.jsx'
import BookCard from '../components/BookCard.jsx'
import { getQuotes } from '../utils/quotes.js'

export default function MyBooks() {
  const { favorites, toggle } = useFavorites()
  const { add } = useCart()
  const [books, setBooks] = useState([])
  const [quotes, setQuotes] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        setError('No se pudieron cargar los libros. Intenta de nuevo.')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setQuotes(getQuotes())
    const handler = () => setQuotes(getQuotes())
    window.addEventListener('quotesUpdated', handler)
    return () => window.removeEventListener('quotesUpdated', handler)
  }, [])

  const my = books.filter((b) => favorites.includes(b.id))

  return (
    <section>
      <h2>Mis libros</h2>

      <h3>Mis libros favoritos</h3>

      {loading ? (
        <p>Cargando libros...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="grid">
          {my.length === 0 ? (
            <p>Aún no tienes favoritos.</p>
          ) : (
            my.map((b) => (
              <BookCard key={b.id} book={b} onToggle={toggle} onAdd={add} />
            ))
          )}
        </div>
      )}

      <h3>Mis cotizaciones</h3>
      <div className="quotes">
        {quotes.length === 0 ? (
          <p>Aún no tienes cotizaciones.</p>
        ) : (
          <ul>
            {quotes.map((q) => (
              <li key={q.id} className="quote">
                <strong>{new Date(q.date).toLocaleString()}</strong>
                <div>
                  {q.items.map((it) => (
                    <div key={it.id}>{it.nombre} (x{it.qty})</div>
                  ))}
                </div>
                <small>Estado: {q.status}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
