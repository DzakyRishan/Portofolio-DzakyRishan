import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { experiences, type ExperienceItem } from '../data/experience'
import Section, { EASE } from './ui/Section'

const INITIAL_COUNT = 3

function monogram(item: ExperienceItem) {
  const source = item.organization ?? item.title.split('—')[0]
  return source
    .replace(/[@&]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [role, subject] = item.title.split('—').map((part) => part.trim())
  return (
    <article className="rounded-xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink font-mono text-[0.7rem] text-accent">
          {monogram(item)}
        </span>
        {item.current && (
          <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-accent">
            Current
          </span>
        )}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">{subject ?? role}</h3>
      <p className="mt-2 text-sm font-medium text-paper">
        {subject ? role : item.title}
        {item.organization && <span className="text-muted"> · {item.organization}</span>}
      </p>
      <p className="mt-1 text-sm text-muted">{item.period}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-soft">{item.highlights.join(' ')}</p>
    </article>
  )
}

export default function Experience() {
  const reduceMotion = useReducedMotion()
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? experiences : experiences.slice(0, INITIAL_COUNT)
  const hidden = experiences.length - INITIAL_COUNT

  return (
    <Section
      id="experience"
      eyebrow="Resume"
      title="Leading, teaching, building"
      description="Roles I hold on campus alongside my studies, newest first."
    >
      <ol className="relative">
        {/* Garis tengah timeline (desktop) */}
        <span aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-line md:block" />

        <AnimatePresence initial={false}>
          {visible.map((item, index) => {
            const onLeft = index % 2 === 1
            return (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative grid gap-4 pb-6 md:grid-cols-2 md:gap-12 md:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent bg-ink md:block"
                />
                <div className={`${onLeft ? 'md:col-start-1' : 'md:col-start-2'} md:py-6`}>
                  <ExperienceCard item={item} />
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((open) => !open)}
          aria-expanded={showAll}
          className="mt-4 w-full rounded-xl border border-line py-3 text-sm font-medium text-paper transition-colors duration-300 hover:border-accent/50"
        >
          {showAll ? 'Show fewer roles' : `Show ${hidden} more ${hidden === 1 ? 'role' : 'roles'}`}
        </button>
      )}
    </Section>
  )
}
