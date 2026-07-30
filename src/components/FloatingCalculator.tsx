import { useEffect, useRef, useState } from 'react'

/**
 * A draggable, closable floating calculator for use inside test-taking screens
 * (mock tests, previous year papers, practice tests, sectional tests, topic-wise
 * tests). Hidden by default — only a small icon shows in the bottom-right corner.
 * Rendering this never blocks the question area: it's an absolutely-positioned
 * overlay with its own small footprint and a high but bounded z-index.
 */

const OPS = ['÷', '×', '−', '+'] as const
type Op = (typeof OPS)[number]

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case '÷':
      return b === 0 ? NaN : a / b
    case '×':
      return a * b
    case '−':
      return a - b
    case '+':
      return a + b
  }
}

export default function FloatingCalculator({
  initialOpen = false,
  onOpenChange,
}: {
  /** Restore the calculator's open/closed state (e.g. from a resumed test). */
  initialOpen?: boolean
  /** Notified whenever open/closed state changes, so a parent can persist it. */
  onOpenChange?: (open: boolean) => void
} = {}) {
  const [open, setOpenState] = useState(initialOpen)
  const setOpen = (v: boolean) => {
    setOpenState(v)
    onOpenChange?.(v)
  }
  const [display, setDisplay] = useState('0')
  const [stored, setStored] = useState<number | null>(null)
  const [pendingOp, setPendingOp] = useState<Op | null>(null)
  const [overwrite, setOverwrite] = useState(true)

  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMove(e: PointerEvent) {
      if (!dragRef.current) return
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      const w = panelRef.current?.offsetWidth ?? 260
      const h = panelRef.current?.offsetHeight ?? 360
      const nextX = Math.min(Math.max(8, dragRef.current.originX + dx), window.innerWidth - w - 8)
      const nextY = Math.min(Math.max(8, dragRef.current.originY + dy), window.innerHeight - h - 8)
      setPos({ x: nextX, y: nextY })
    }
    function onUp() {
      dragRef.current = null
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [open])

  function startDrag(e: React.PointerEvent) {
    const rect = panelRef.current?.getBoundingClientRect()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: rect?.left ?? 0,
      originY: rect?.top ?? 0,
    }
  }

  function inputDigit(d: string) {
    setDisplay((prev) => (overwrite || prev === '0' ? d : prev + d))
    setOverwrite(false)
  }

  function inputDecimal() {
    setDisplay((prev) => {
      if (overwrite) return '0.'
      return prev.includes('.') ? prev : prev + '.'
    })
    setOverwrite(false)
  }

  function clearAll() {
    setDisplay('0')
    setStored(null)
    setPendingOp(null)
    setOverwrite(true)
  }

  function backspace() {
    setDisplay((prev) => {
      if (overwrite) return prev
      const next = prev.slice(0, -1)
      return next === '' || next === '-' ? '0' : next
    })
  }

  function toggleSign() {
    setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : prev === '0' ? prev : '-' + prev))
  }

  function percent() {
    setDisplay((prev) => String(parseFloat(prev) / 100))
  }

  function chooseOp(op: Op) {
    const current = parseFloat(display)
    if (stored !== null && pendingOp && !overwrite) {
      const result = compute(stored, current, pendingOp)
      setStored(result)
      setDisplay(String(Number.isFinite(result) ? round(result) : 'Error'))
    } else {
      setStored(current)
    }
    setPendingOp(op)
    setOverwrite(true)
  }

  function round(n: number) {
    return Math.round(n * 1e10) / 1e10
  }

  function equals() {
    if (stored === null || !pendingOp) return
    const current = parseFloat(display)
    const result = compute(stored, current, pendingOp)
    setDisplay(Number.isFinite(result) ? String(round(result)) : 'Error')
    setStored(null)
    setPendingOp(null)
    setOverwrite(true)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open calculator"
        title="Calculator"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="10" x2="8" y2="10" />
          <line x1="12" y1="10" x2="12" y2="10" />
          <line x1="16" y1="10" x2="16" y2="10" />
          <line x1="8" y1="14" x2="8" y2="14" />
          <line x1="12" y1="14" x2="12" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
          <line x1="8" y1="18" x2="8" y2="18" />
          <line x1="12" y1="18" x2="12" y2="18" />
          <line x1="16" y1="18" x2="16" y2="18" />
        </svg>
      </button>
    )
  }

  const panelStyle: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
    : { right: '1.25rem', bottom: '5rem' }

  return (
    <div
      ref={panelRef}
      className="fixed z-40 w-[260px] card shadow-xl select-none"
      style={panelStyle}
    >
      <div
        onPointerDown={startDrag}
        className="flex items-center justify-between px-3 py-2 border-b border-border cursor-move bg-secondary/60 rounded-t-2xl"
      >
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Calculator</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close calculator"
          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <div className="bg-secondary rounded-lg px-3 py-3 mb-3 text-right font-display font-bold text-xl overflow-x-auto whitespace-nowrap">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <CalcBtn label="C" onClick={clearAll} variant="muted" />
          <CalcBtn label="±" onClick={toggleSign} variant="muted" />
          <CalcBtn label="%" onClick={percent} variant="muted" />
          <CalcBtn label="÷" onClick={() => chooseOp('÷')} variant="op" active={pendingOp === '÷'} />

          <CalcBtn label="7" onClick={() => inputDigit('7')} />
          <CalcBtn label="8" onClick={() => inputDigit('8')} />
          <CalcBtn label="9" onClick={() => inputDigit('9')} />
          <CalcBtn label="×" onClick={() => chooseOp('×')} variant="op" active={pendingOp === '×'} />

          <CalcBtn label="4" onClick={() => inputDigit('4')} />
          <CalcBtn label="5" onClick={() => inputDigit('5')} />
          <CalcBtn label="6" onClick={() => inputDigit('6')} />
          <CalcBtn label="−" onClick={() => chooseOp('−')} variant="op" active={pendingOp === '−'} />

          <CalcBtn label="1" onClick={() => inputDigit('1')} />
          <CalcBtn label="2" onClick={() => inputDigit('2')} />
          <CalcBtn label="3" onClick={() => inputDigit('3')} />
          <CalcBtn label="+" onClick={() => chooseOp('+')} variant="op" active={pendingOp === '+'} />

          <CalcBtn label="⌫" onClick={backspace} variant="muted" />
          <CalcBtn label="0" onClick={() => inputDigit('0')} />
          <CalcBtn label="." onClick={inputDecimal} />
          <CalcBtn label="=" onClick={equals} variant="primary" />
        </div>
      </div>
    </div>
  )
}

function CalcBtn({
  label,
  onClick,
  variant = 'default',
  active = false,
}: {
  label: string
  onClick: () => void
  variant?: 'default' | 'muted' | 'op' | 'primary'
  active?: boolean
}) {
  const base = 'h-10 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center'
  const styles = {
    default: 'bg-surface border border-border hover:bg-secondary',
    muted: 'bg-secondary text-muted-foreground hover:bg-secondary/70',
    op: active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary hover:bg-secondary/70',
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
  }[variant]
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  )
}
