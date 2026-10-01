const KEY = 'inicet:profile-name'

export function getProfileName(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function setProfileName(name: string) {
  try {
    if (name.trim()) localStorage.setItem(KEY, name.trim().slice(0, 40))
    else localStorage.removeItem(KEY)
  } catch {
    // ignore storage errors
  }
}

export function greeting(d = new Date()): string {
  const h = d.getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}
