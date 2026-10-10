import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

interface ScrollRevealTextProps {
  text: string
  className?: string
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

/**
 * Paragraf yang kata per katanya menyala dari abu-abu ke putih saat di-scroll.
 * Jika user memilih reduced motion, teks langsung tampil penuh.
 */
export default function ScrollRevealText({ text, className = '' }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => {
          const start = index / words.length
          const end = Math.min(1, start + 2 / words.length)
          return (
            <Word key={index} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </span>
    </p>
  )
}
