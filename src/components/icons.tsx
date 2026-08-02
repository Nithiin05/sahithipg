import {
  Activity,
  Baby,
  Bone,
  Brain,
  Bug,
  Dumbbell,
  Ear,
  Eye,
  Fingerprint,
  FlaskConical,
  HeartPulse,
  Microscope,
  Pill,
  Scale,
  ScanLine,
  Scissors,
  Smile,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react'

/** Maps the `icon` string stored on each Subject to its lucide-react component. */
export const SUBJECT_ICONS: Record<string, LucideIcon> = {
  Bone,
  Activity,
  FlaskConical,
  Microscope,
  Pill,
  Bug,
  Scale,
  Users,
  HeartPulse,
  Scissors,
  Baby,
  Smile,
  Dumbbell,
  Ear,
  Eye,
  Fingerprint,
  Brain,
  ScanLine,
  Syringe,
}

export function SubjectIcon({ name, className }: { name: string; className?: string }) {
  const Icon = SUBJECT_ICONS[name] ?? Activity
  return <Icon className={className} strokeWidth={2} />
}

/** Tailwind color-family → light/dark background+text class pairs, for subject badges/icons. */
export const SUBJECT_COLOR_CLASSES: Record<string, string> = {
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  lime: 'bg-lime-500/10 text-lime-700 dark:text-lime-400',
  slate: 'bg-slate-500/10 text-slate-600 dark:text-slate-300',
  teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  orange: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  pink: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  stone: 'bg-stone-500/10 text-stone-600 dark:text-stone-300',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  indigo: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  fuchsia: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  zinc: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-300',
  yellow: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
}
