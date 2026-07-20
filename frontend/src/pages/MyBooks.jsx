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

  useEffect(() => {
    fetch('/api/libros')
      .then((r) => r.json())
      .then((data) => setBooks(data.libros || []))
      .catch(() => setBooks([]))
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
      <h2>My Books</h2>

      <h3>My favorite books</h3>
      <div className="grid">
        {my.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          my.map((b) => (
            <BookCard key={b.id} book={b} onToggle={toggle} onAdd={add} />
          ))
        )}
      </div>

      <h3>My quotes</h3>
      <div className="quotes">
        {quotes.length === 0 ? (
          <p>No quotes yet.</p>
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
                <small>Status: {q.status}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
