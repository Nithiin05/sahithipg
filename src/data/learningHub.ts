import { subjects } from './subjects'

export interface VideoResource {
  label: string
  url: string
  recommended?: boolean
}

export interface ResourceGroup {
  id: string
  title: string
  description: string
  resources: VideoResource[]
}

// We link to targeted YouTube searches rather than naming specific channels —
// individual educators/channels change often, and a pinned link can go stale
// or become inaccurate. A search link always resolves to current, relevant videos.
function ytSearch(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}

export const resourceGroups: ResourceGroup[] = subjects.map((s) => ({
  id: s.slug,
  title: s.name,
  description: s.description,
  resources: [
    { label: `${s.name} — Complete Course`, url: ytSearch(`NEET PG ${s.name} complete course lectures`), recommended: true },
    { label: `${s.name} — High Yield Topics`, url: ytSearch(`NEET PG ${s.name} high yield topics revision`) },
    { label: `${s.name} — One-Shot Revision`, url: ytSearch(`NEET PG ${s.name} one shot revision`) },
  ],
}))

export const additionalHubs: ResourceGroup[] = [
  {
    id: 'pyq-practice',
    title: 'PYQ Discussion & Analysis',
    description: 'Previous-year-style question walkthroughs — a fast way to calibrate to real exam difficulty.',
    resources: [
      { label: 'NEET PG PYQ Discussion', url: ytSearch('NEET PG previous year questions discussion') },
      { label: 'INI-CET Pattern Questions', url: ytSearch('INI-CET pattern questions discussion') },
    ],
  },
  {
    id: 'grand-test-analysis',
    title: 'Grand Test Strategy & Analysis',
    description: 'How toppers triage a 200-question paper, manage time, and avoid common traps.',
    resources: [
      { label: 'NEET PG Grand Test Strategy', url: ytSearch('NEET PG grand test strategy time management') },
      { label: 'Last Month Revision Strategy', url: ytSearch('NEET PG last month revision strategy') },
    ],
  },
]
