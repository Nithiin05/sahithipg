import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { search, type SearchResult } from '../lib/search'

/** Global search (Ctrl/⌘ K or "/"): subjects, syllabus, topics, questions, PYQs, images and your notes. */
export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const results = useMemo(() => (open ? search(q) : []), [q, open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
    else setQ('')
  }, [open])

  useEffect(() => setActive(0), [q])

  const go = (r: SearchResult) => {
    setOpen(false)
    navigate(r.to)
  }

  let lastGroup = ''
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-9 flex items-center gap-2 rounded-lg border border-border px-2.5 text-sm text-muted-foreground hover:bg-secondary"
        aria-label="Search"
      >
        <Search size={16} />
        <span className="hidden xl:inline">Search</span>
        <kbd className="hidden xl:inline text-[10px] border border-border rounded px-1">Ctrl K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 pt-[10vh]" onClick={() => setOpen(false)}>
          <div className="card w-full max-w-2xl p-0 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
            <div className="flex items-center gap-2 px-4 border-b border-border">
              <Search size={18} className="text-muted-foreground" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setActive((a) => Math.min(results.length - 1, a + 1))
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActive((a) => Math.max(0, a - 1))
                  } else if (e.key === 'Enter' && results[active]) go(results[active])
                }}
                placeholder="Search topics, questions, PYQs, images, notes… e.g. WPW"
                className="flex-1 py-4 bg-transparent outline-none text-sm"
                aria-label="Search query"
              />
              <button onClick={() => setOpen(false)} aria-label="Close search" className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto py-2">
              {q && results.length === 0 && <p className="px-4 py-6 text-sm text-muted-foreground text-center">No results for “{q}”.</p>}
              {!q && <p className="px-4 py-6 text-sm text-muted-foreground text-center">Type to search across subjects, the syllabus, every question and your notes.</p>}
              {results.map((r, i) => {
                const header = r.group !== lastGroup ? r.group : null
                lastGroup = r.group
                return (
                  <div key={`${r.to}-${i}`}>
                    {header && <p className="px-4 pt-3 pb-1 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground">{header}</p>}
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={`w-full text-left px-4 py-2 ${i === active ? 'bg-primary/10' : ''}`}
                    >
                      <p className="text-sm line-clamp-2">{r.title}</p>
                      {r.subtitle && <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
