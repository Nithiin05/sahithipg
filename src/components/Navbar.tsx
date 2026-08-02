import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, Stethoscope, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const PRIMARY_LINKS = [
  { to: '/subjects', label: 'Subjects' },
  { to: '/pyqs', label: 'PYQs' },
  { to: '/mock-tests', label: 'Mock Tests' },
  { to: '/grand-tests', label: 'Grand Tests' },
  { to: '/resources', label: 'Resources' },
  { to: '/analytics', label: 'Analytics' },
]

const MORE_LINKS = [
  { to: '/bookmarks', label: 'Bookmarks' },
  { to: '/mistakes', label: 'Mistake Notebook' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/planner', label: 'Study Planner' },
  { to: '/profile', label: 'Profile' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-30 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex items-center justify-center w-9 h-9 rounded-xl gradient-primary text-white shrink-0 shadow-sm">
            <Stethoscope size={19} strokeWidth={2.25} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-[15px] tracking-tight">Dr. Sahithi Preparation</span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-wide hidden sm:block">Every Question Matters.</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {PRIMARY_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors duration-150 whitespace-nowrap ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex items-center gap-1"
            >
              More <ChevronDown size={14} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 card p-1.5 shadow-xl z-40">
                {MORE_LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            to="/grand-tests"
            className="hidden sm:inline-flex gradient-primary text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Start Free Mock
          </Link>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border px-5 py-3 flex flex-col gap-1 bg-surface max-h-[75vh] overflow-y-auto">
          {[...PRIMARY_LINKS, ...MORE_LINKS].map((l) => (
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
            to="/grand-tests"
            onClick={() => setOpen(false)}
            className="mt-2 gradient-primary text-white rounded-lg px-4 py-2.5 text-sm font-semibold text-center"
          >
            Start Free Mock
          </Link>
        </div>
      )}
    </nav>
  )
}

export default memo(Navbar)
