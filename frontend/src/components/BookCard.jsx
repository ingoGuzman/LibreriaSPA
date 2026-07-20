import React from 'react'
import useFavorites from '../utils/useFavorites.jsx'

export default function BookCard({ book, onToggle, onAdd }) {
  const { favorites } = useFavorites()
  const isFav = favorites.includes(book.id)

  return (
    <div className={isFav ? 'book favorite' : 'book'}>
      <h3>{book.nombre}</h3>
      <p>{book.autor}</p>
      <div className="book-actions">
        <button onClick={() => onToggle(book.id)}>{isFav ? 'Quitar favorito' : 'Agregar a favoritos'}</button>
        <button onClick={() => onAdd(book)} className="primary">Agregar al carrito</button>
      </div>
    </div>
  )
}
