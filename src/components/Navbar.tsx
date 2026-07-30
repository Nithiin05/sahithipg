import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/mock-tests', label: 'Mock Tests' },
  { to: '/practice', label: 'Practice' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/resources', label: 'Resources' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black overflow-hidden shrink-0">
            <img src="/logo-icon-v2.png" alt="One9" className="w-full h-full object-cover" />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">One9</span>
          <span className="tag bg-secondary text-muted-foreground hidden sm:inline-flex">SSC CGL</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/mock-tests"
            className="hidden sm:inline-flex bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Practicing
          </Link>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border px-5 py-3 flex flex-col gap-1 bg-surface">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/mock-tests"
            onClick={() => setOpen(false)}
            className="mt-2 bg-primary text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-semibold text-center"
          >
            Start Practicing
          </Link>
        </div>
      )}
    </nav>
  )
}

export default memo(Navbar)
