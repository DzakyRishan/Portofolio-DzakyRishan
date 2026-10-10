import { Award } from 'lucide-react'
import { achievements } from '../data/experience'
import Section, { Reveal } from './ui/Section'

export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="Awards" title="Recognition">
      <ul className="grid gap-3 sm:grid-cols-2">
        {achievements.map((item, index) => (
          <li key={item.id}>
            <Reveal
              delay={index * 0.06}
              className="h-full rounded-xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <Award size={18} aria-hidden="true" className="text-accent" />
                <span className="font-mono text-xs text-muted">{item.year}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-soft">{item.issuer}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
