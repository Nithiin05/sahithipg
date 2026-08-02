const KEY = 'drsahithi:theme'
export type Theme = 'light' | 'dark'

function getStoredTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw === 'light' || raw === 'dark' ? raw : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/** Call once, as early as possible (before first paint), to avoid a flash of the wrong theme. */
export function initTheme(): Theme {
  const stored = getStoredTheme()
  const theme: Theme = stored ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  applyTheme(theme)
  return theme
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // ignore storage errors
  }
  applyTheme(theme)
}
