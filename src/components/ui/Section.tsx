import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE, delay: reduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  children: ReactNode
}

/** Section home dengan pola product.inc: eyebrow aksen + judul + satu kalimat */
export default function Section({ id, eyebrow, title, description, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className="pt-20 md:pt-28">
      <Reveal>
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent">{eyebrow}</p>
        <h2 id={headingId} className="mt-1.5 text-3xl font-semibold tracking-tight md:text-[2.15rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-soft">{description}</p>
        )}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  )
}
