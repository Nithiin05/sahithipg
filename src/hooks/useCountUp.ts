import { useEffect, useState } from 'react'

export function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    let frame = 0

    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setValue(target)
        setDone(true)
      }
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [trigger, target, duration])

  return { value, done }
}
