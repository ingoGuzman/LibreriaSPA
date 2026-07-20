import React, { useEffect, useState } from 'react'
import useFavorites from '../utils/useFavorites.jsx'
import useCart from '../utils/cart.jsx'
import BookCard from '../components/BookCard.jsx'

export default function AllBooks() {
  const [books, setBooks] = useState([])
  const { toggle } = useFavorites()
  const { add } = useCart()

  useEffect(() => {
    // backend exposes /api/libros
    fetch('/api/libros')
      .then((r) => r.json())
      .then((data) => setBooks(data.libros || []))
      .catch(() => setBooks([]))
  }, [])

  return (
    <section>
      <h2>All Books</h2>
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} onToggle={toggle} onAdd={add} />
        ))}
      </div>
    </section>
  )
}
