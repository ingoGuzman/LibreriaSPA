const KEY = 'tienda:localBooks'

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadLocalBooks() {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(KEY)
  return safeParse(raw)
}

export function saveLocalBooks(books) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(KEY, JSON.stringify(books))
    window.dispatchEvent(new CustomEvent('localBooksUpdated'))
  } catch {
    // Ignorar errores de escritura en localStorage
  }
}

export function addLocalBook({ nombre, autor }) {
  const cleanName = nombre.trim()
  const cleanAuthor = autor.trim()
  if (!cleanName || !cleanAuthor) {
    throw new Error('Nombre y autor son obligatorios')
  }

  const books = loadLocalBooks()
  const next = [
    ...books,
    {
      id: `local_${Date.now()}`,
      nombre: cleanName,
      autor: cleanAuthor,
      source: 'local',
    },
  ]
  saveLocalBooks(next)
  return next
}

export function updateLocalBook(updated) {
  const cleanName = updated.nombre.trim()
  const cleanAuthor = updated.autor.trim()
  if (!cleanName || !cleanAuthor) {
    throw new Error('Nombre y autor son obligatorios')
  }

  const books = loadLocalBooks()
  const next = books.map((book) =>
    book.id === updated.id
      ? { ...book, nombre: cleanName, autor: cleanAuthor }
      : book
  )
  saveLocalBooks(next)
  return next
}

export function deleteLocalBook(id) {
  const books = loadLocalBooks()
  const next = books.filter((book) => book.id !== id)
  saveLocalBooks(next)
  return next
}
