import React, { useEffect, useState } from 'react'

export default function BookForm({ book, onSave, onCancel }) {
  const [nombre, setNombre] = useState(book?.nombre || '')
  const [autor, setAutor] = useState(book?.autor || '')
  const [error, setError] = useState('')

  useEffect(() => {
    setNombre(book?.nombre || '')
    setAutor(book?.autor || '')
    setError('')
  }, [book])

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!nombre.trim() || !autor.trim()) {
      setError('Completa el nombre y el autor del libro.')
      return
    }

    onSave({ id: book?.id, nombre: nombre.trim(), autor: autor.trim() })
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h3>{book ? 'Editar libro local' : 'Agregar libro local'}</h3>
      <label>
        Nombre
        <input
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          placeholder="Título del libro"
          required
        />
      </label>
      <label>
        Autor
        <input
          value={autor}
          onChange={(event) => setAutor(event.target.value)}
          placeholder="Nombre del autor"
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="primary">
          {book ? 'Guardar cambios' : 'Agregar libro'}
        </button>
        {onCancel && (
          <button type="button" className="small" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
