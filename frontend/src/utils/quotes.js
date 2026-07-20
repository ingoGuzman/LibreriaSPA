const KEY = 'tienda:quotes'

export function getQuotes() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addQuote(quote) {
  try {
    const existing = getQuotes()
    const next = [quote, ...existing]
    localStorage.setItem(KEY, JSON.stringify(next))
    // notify listeners in the same tab
    try { window.dispatchEvent(new CustomEvent('quotesUpdated')) } catch {}
    return next
  } catch {
    return null
  }
}
