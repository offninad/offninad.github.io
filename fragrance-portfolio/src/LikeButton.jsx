import { useEffect, useState } from 'react'

/*
 * Live "likes" counter for a static site, backed by Abacus — a free, no-auth,
 * CORS-enabled counter API (the spiritual successor to CountAPI).
 *   GET /get/:ns/:key  → read   { value }
 *   GET /hit/:ns/:key  → +1     { value }
 * One like per browser is enforced with localStorage; the global tally is
 * increment-only. Everything degrades gracefully if the API is unreachable.
 */
const API = 'https://abacus.jasoncameron.dev'
const NS = 'offninad-portfolio'
const KEY = 'visitor-likes'
const STORE = 'nr-portfolio-liked'

export default function LikeButton() {
  const [count, setCount] = useState(null)
  const [liked, setLiked] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem(STORE) === '1'
  )
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(`${API}/get/${NS}/${KEY}`)
      .then((r) => r.json())
      .then((d) => alive && setCount(typeof d.value === 'number' ? d.value : 0))
      .catch(() => alive && setCount(0))
    return () => {
      alive = false
    }
  }, [])

  const like = async () => {
    if (liked || busy) return
    setBusy(true)
    setLiked(true) // optimistic — feels instant
    setCount((c) => (c ?? 0) + 1)
    try {
      localStorage.setItem(STORE, '1')
    } catch {
      /* private mode — fine */
    }
    try {
      const d = await fetch(`${API}/hit/${NS}/${KEY}`).then((r) => r.json())
      if (typeof d.value === 'number') setCount(d.value) // reconcile with truth
    } catch {
      /* keep the optimistic count */
    }
    setBusy(false)
  }

  return (
    <div className="like">
      <button
        className="like-btn"
        data-liked={liked}
        onClick={like}
        disabled={liked}
        aria-pressed={liked}
        aria-label={liked ? 'You liked this portfolio' : 'Leave a thumbs up'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span>{liked ? 'Thanks!' : 'Leave a thumbs up'}</span>
      </button>
      <p className="like-count" aria-live="polite">
        {count == null ? (
          <span className="like-dim">counting…</span>
        ) : (
          <>
            <strong>{count.toLocaleString()}</strong>{' '}
            {count === 1 ? 'person liked this' : 'people liked this'}
          </>
        )}
      </p>
    </div>
  )
}
