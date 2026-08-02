import { Activity, Baby, Brain, HeartPulse, Microscope, Pill, Stethoscope, Syringe } from 'lucide-react'

/** An animated ECG waveform line — pure SVG, no dependencies. Decorative only (aria-hidden). */
export function EcgLine({ className = '', color = 'hsl(var(--primary))' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 400 60"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 30 H120 L135 10 L150 50 L165 5 L180 30 H210 L225 18 L240 42 L255 30 H400"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ecg-path"
        pathLength={1000}
      />
    </svg>
  )
}

/** An animated DNA double-helix motif — pure SVG. Decorative only (aria-hidden). */
export function DnaHelix({ className = '' }: { className?: string }) {
  const rungs = Array.from({ length: 10 })
  return (
    <svg viewBox="0 0 100 220" className={className} aria-hidden="true">
      <g className="dna-rotate" style={{ transformOrigin: '50px 110px' }}>
        {rungs.map((_, i) => {
          const y = i * 22 + 6
          const phase = (i / rungs.length) * Math.PI * 2
          const x1 = 50 + Math.sin(phase) * 32
          const x2 = 50 - Math.sin(phase) * 32
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(var(--accent) / 0.35)" strokeWidth="1.5" />
              <circle cx={x1} cy={y} r="4" fill="hsl(var(--primary) / 0.7)" />
              <circle cx={x2} cy={y} r="4" fill="hsl(var(--accent2) / 0.7)" />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

const FLOAT_ICONS = [Stethoscope, HeartPulse, Pill, Syringe, Activity, Brain, Microscope, Baby]

/** A scattering of faint, slowly-floating medical icons for hero/section backgrounds. */
export function FloatingMedicalIcons({ count = 8 }: { count?: number }) {
  const positions = [
    { top: '8%', left: '6%', size: 28, float: 'float-slow', delay: '0s' },
    { top: '18%', left: '88%', size: 22, float: 'float-slower', delay: '0.4s' },
    { top: '68%', left: '4%', size: 24, float: 'float-fast', delay: '0.8s' },
    { top: '78%', left: '92%', size: 30, float: 'float-slow', delay: '1.1s' },
    { top: '38%', left: '94%', size: 20, float: 'float-slower', delay: '0.2s' },
    { top: '52%', left: '2%', size: 18, float: 'float-fast', delay: '0.6s' },
    { top: '10%', left: '48%', size: 20, float: 'float-slower', delay: '1.4s' },
    { top: '85%', left: '45%', size: 22, float: 'float-slow', delay: '0.9s' },
  ].slice(0, count)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
      {positions.map((p, i) => {
        const Icon = FLOAT_ICONS[i % FLOAT_ICONS.length]
        return (
          <span
            key={i}
            className={`absolute text-primary/15 dark:text-primary/20 ${p.float}`}
            style={{ top: p.top, left: p.left, animationDelay: p.delay }}
          >
            <Icon size={p.size} strokeWidth={1.5} />
          </span>
        )
      })}
    </div>
  )
}

/** Soft, slowly-drifting gradient blobs for premium ambient backgrounds. */
export function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <div
        className="blob absolute rounded-full opacity-30 dark:opacity-20"
        style={{ width: 380, height: 380, top: '-120px', left: '-100px', background: 'hsl(var(--primary))', filter: 'blur(90px)' }}
      />
      <div
        className="blob absolute rounded-full opacity-25 dark:opacity-20"
        style={{ width: 320, height: 320, top: '20%', right: '-80px', background: 'hsl(var(--accent))', filter: 'blur(90px)', animationDelay: '2s' }}
      />
      <div
        className="blob absolute rounded-full opacity-20 dark:opacity-15"
        style={{ width: 300, height: 300, bottom: '-100px', left: '30%', background: 'hsl(var(--accent2))', filter: 'blur(90px)', animationDelay: '4s' }}
      />
    </div>
  )
}
