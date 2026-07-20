import React from 'react'
import useCart from '../utils/cart.jsx'
import { addQuote } from '../utils/quotes.js'

export default function Cart() {
  const { items, remove, clear } = useCart()

  const [message, setMessage] = React.useState('')

  const handleRequestQuote = () => {
    if (items.length === 0) {
      setMessage('El carrito está vacío')
      setTimeout(() => setMessage(''), 2000)
      return
    }

    const quote = {
      id: `q_${Date.now()}`,
      date: new Date().toISOString(),
      items: items,
      status: 'Procesando',
    }

    addQuote(quote)
    clear()
    setMessage('Tu cotización está siendo procesada')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <aside className="cart">
      <h3>Carrito de compras</h3>
      {items.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <span>{it.nombre} (x{it.qty})</span>
              <button className="small" onClick={() => remove(it.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {message && <div className="notice">{message}</div>}
      <div className="cart-actions">
        <button onClick={handleRequestQuote} disabled={items.length === 0}>Solicitar cotización</button>
        <button className="small" onClick={clear} disabled={items.length === 0}>Limpiar</button>
      </div>
    </aside>
  )
}
