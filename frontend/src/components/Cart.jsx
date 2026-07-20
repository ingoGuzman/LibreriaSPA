import React from 'react'
import useCart from '../utils/cart.jsx'
import { addQuote } from '../utils/quotes.js'

export default function Cart() {
  const { items, remove, clear } = useCart()

  const [message, setMessage] = React.useState('')

  const handleRequestQuote = () => {
    if (items.length === 0) {
      setMessage('Cart is empty')
      setTimeout(() => setMessage(''), 2000)
      return
    }

    const quote = {
      id: `q_${Date.now()}`,
      date: new Date().toISOString(),
      items: items,
      status: 'processing',
    }

    addQuote(quote)
    clear()
    setMessage('Your quote is being processed')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <aside className="cart">
      <h3>Shopping Cart</h3>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <span>{it.nombre} (x{it.qty})</span>
              <button className="small" onClick={() => remove(it.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {message && <div className="notice">{message}</div>}
      <div className="cart-actions">
        <button onClick={handleRequestQuote} disabled={items.length === 0}>Request Quote</button>
        <button className="small" onClick={clear} disabled={items.length === 0}>Clear</button>
      </div>
    </aside>
  )
}
