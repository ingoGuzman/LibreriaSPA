import React, { useEffect, useState } from 'react'
import { getQuotes } from '../utils/quotes.js'

export default function Quotes() {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    setQuotes(getQuotes())
    const handler = () => setQuotes(getQuotes())
    window.addEventListener('quotesUpdated', handler)
    return () => window.removeEventListener('quotesUpdated', handler)
  }, [])

  return (
    <section>
      <h2>Mis cotizaciones</h2>
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
