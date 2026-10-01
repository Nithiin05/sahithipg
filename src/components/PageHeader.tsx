import type { ReactNode } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  usePageTitle(eyebrow && eyebrow !== title ? `${title} — ${eyebrow}` : title)
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="block text-xs uppercase tracking-widest text-primary font-semibold mb-2">{eyebrow}</span>
        )}
        <h1 className="font-display font-extrabold" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
          {title}
        </h1>
        {description && <p className="text-muted-foreground mt-2 max-w-2xl" style={{ lineHeight: 1.6 }}>{description}</p>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
