import React from 'react'
import BookCard from './BookCard.jsx'

export default function BookGrid({ books, onToggle, onAdd, emptyText }) {
  if (books.length === 0) {
    return <p>{emptyText}</p>
  }

  return (
    <div className="grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onToggle={onToggle} onAdd={onAdd} />
      ))}
    </div>
  )
}
