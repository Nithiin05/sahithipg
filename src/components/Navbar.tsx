import { memo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Stethoscope, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import GlobalSearch from './GlobalSearch'

interface NavItem {
  to: string
  label: string
}
interface NavGroup {
  label: string
  items: NavItem[]
}

const NAV: (NavItem | NavGroup)[] = [
  { to: '/dashboard', label: 'Dashboard' },
  {
    label: 'Study',
    items: [
      { to: '/subjects', label: 'Subjects & Topics' },
      { to: '/question-bank?cat=high-yield', label: 'High Yield' },
      { to: '/revision', label: 'My Revision' },
      { to: '/resources', label: 'Resources' },
    ],
  },
  {
    label: 'Question Bank',
    items: [
      { to: '/pyqs', label: 'PYQs' },
      { to: '/question-bank?cat=pyq-pattern', label: 'PYQ Pattern' },
      { to: '/question-bank?cat=clinical', label: 'Clinical MCQs' },
      { to: '/question-bank?cat=image', label: 'Image Questions' },
      { to: '/question-bank?cat=integrated', label: 'Integrated Questions' },
      { to: '/question-bank?cat=rapid', label: 'Rapid Revision' },
    ],
  },
  {
    label: 'Tests',
    items: [
      { to: '/tests?tab=full-grand', label: 'Full INI-CET Mock & Grand Tests' },
      { to: '/tests?tab=subject', label: 'Subject Tests' },
      { to: '/tests?tab=system', label: 'System Tests' },
      { to: '/tests?tab=quick', label: 'Rapid & Image Challenge' },
      { to: '/tests?tab=custom', label: 'Custom Test' },
    ],
  },
  { to: '/analytics', label: 'Analytics' },
  {
    label: 'More',
    items: [
      { to: '/planner', label: 'Study Planner' },
      { to: '/bookmarks', label: 'Bookmarks' },
      { to: '/profile', label: 'Profile' },
    ],
  },
]

const isGroup = (n: NavItem | NavGroup): n is NavGroup => 'items' in n

function Dropdown({ group, activePath, activeSearch }: { group: NavGroup; activePath: string; activeSearch: string }) {
  const [open, setOpen] = useState(false)
  // Links with a query (e.g. /question-bank?cat=high-yield) only count as active on that exact query.
  const active = group.items.some((i) => {
    const [p, q] = i.to.split('?')
    return q ? activePath === p && activeSearch.includes(q) : activePath.startsWith(p)
  })
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-expanded={open}
        className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}
      >
        {group.label} <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-40">
          <div className="w-64 card p-1.5 shadow-xl">
            {group.items.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  return (
    <nav className="sticky top-0 z-30 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex items-center justify-center w-9 h-9 rounded-xl gradient-primary text-white shrink-0 shadow-sm">
            <Stethoscope size={19} strokeWidth={2.25} />
          </span>
          <span className="font-display font-extrabold text-[15px] tracking-tight">INI-CET Preparation</span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          {NAV.map((n) =>
            isGroup(n) ? (
              <Dropdown key={n.label} group={n} activePath={pathname} activeSearch={search} />
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`
                }
              >
                {n.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <GlobalSearch />
          <ThemeToggle />
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border px-5 py-3 flex flex-col gap-1 bg-surface max-h-[75vh] overflow-y-auto">
          {NAV.map((n) =>
            isGroup(n) ? (
              <div key={n.label} className="py-1">
                <p className="px-3 pt-2 pb-1 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground">{n.label}</p>
                {n.items.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary">
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                {n.label}
              </NavLink>
            ),
          )}
        </div>
      )}
    </nav>
  )
}

export default memo(Navbar)
