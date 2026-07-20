import React, { useEffect, useState } from 'react'
import useFavorites from '../utils/useFavorites.jsx'
import useCart from '../utils/cart.jsx'
import BookGrid from '../components/BookGrid.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import BookForm from '../components/BookForm.jsx'
import { loadLocalBooks, addLocalBook, updateLocalBook, deleteLocalBook } from '../utils/localBooks.jsx'

export default function AllBooks() {
  const [books, setBooks] = useState([])
  const [localBooks, setLocalBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')
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

  useEffect(() => {
    setLocalBooks(loadLocalBooks())
    const updateHandler = () => setLocalBooks(loadLocalBooks())
    window.addEventListener('localBooksUpdated', updateHandler)
    return () => window.removeEventListener('localBooksUpdated', updateHandler)
  }, [])

  const handleSave = (book) => {
    try {
      const next = book.id ? updateLocalBook(book) : addLocalBook(book)
      setLocalBooks(next)
      setEditing(null)
      setMessage(book.id ? 'Libro actualizado.' : 'Libro agregado.')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.message)
    }
  }

  const handleDelete = (id) => {
    setLocalBooks(deleteLocalBook(id))
    setMessage('Libro local eliminado.')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section>
      <h2>Todos los libros</h2>

      <div className="actions-row">
        <button className="primary" onClick={() => setEditing({})}>
          Agregar libro local
        </button>
        {message && <span className="notice">{message}</span>}
      </div>

      {editing ? (
        <BookForm
          book={editing.id ? editing : null}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      ) : null}

      {loading ? (
        <p>Cargando libros...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <SectionHeader title="Libros desde la API" subtitle="Catálogo oficial del proveedor central" />
          {books.length === 0 ? (
            <p>No hay libros disponibles desde la API.</p>
          ) : (
            <BookGrid books={books.map((b) => ({ ...b, source: 'api' }))} onToggle={toggle} onAdd={add} emptyText="No hay libros disponibles desde la API." />
          )}

          <SectionHeader title="Libros locales" subtitle="Registros creados manualmente y guardados en el navegador" />
          {localBooks.length === 0 ? (
            <p>No hay libros locales agregados.</p>
          ) : (
            <div className="grid">
              {localBooks.map((book) => (
                <div key={book.id} className="book local-book">
                  <h3>{book.nombre}</h3>
                  <p>{book.autor}</p>
                  <div className="book-actions">
                    <button onClick={() => setEditing(book)}>Editar</button>
                    <button onClick={() => handleDelete(book.id)} className="small">
                      Eliminar
                    </button>
                    <button onClick={() => add(book)} className="primary">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
