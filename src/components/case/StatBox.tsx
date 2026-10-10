import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import type { ProjectStat } from '../../data/projects'

export function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  return <span ref={ref}>{display.toFixed(decimals)}</span>
}

/** Kotak statistik berbingkai siku, angkanya berhitung naik saat terlihat */
export default function StatBox({ stat }: { stat: ProjectStat }) {
  return (
    <div className="relative px-4 pb-5 pt-4">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-line-strong"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-line-strong"
      />
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
        {stat.label}
      </p>
      <p className="mt-1.5 font-display text-5xl font-semibold tracking-tight text-paper">
        <CountUp value={stat.value} decimals={stat.decimals} />
        {stat.plus && <sup className="ml-0.5 text-2xl text-accent">+</sup>}
      </p>
      <p className="mt-1 text-sm text-soft">{stat.caption}</p>
    </div>
  )
}
