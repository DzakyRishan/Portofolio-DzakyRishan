import { useState } from 'react'
import { capabilities, getSkillIconUrl, skillGroups, type Skill } from '../data/skills'
import Section, { Reveal } from './ui/Section'

function getInitials(name: string): string {
  const words = name.split(/[\s.·]+/).filter(Boolean)
  if (words.length === 1) return name.slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

function SkillIcon({ skill }: { skill: Skill }) {
  const [failed, setFailed] = useState(false)
  const url = getSkillIconUrl(skill)

  if (!url || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-4 w-4 items-center justify-center font-mono text-[0.5rem] font-semibold text-muted"
      >
        {getInitials(skill.name)}
      </span>
    )
  }

  return (
    <img
      src={url}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={16}
      height={16}
      onError={() => setFailed(true)}
      className="h-4 w-4 object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
    />
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      description="What I focus on, and the tools I have used in real projects."
    >
      <div className="border-t border-line">
        {capabilities.map((capability, index) => (
          <Reveal
            key={capability.id}
            delay={index * 0.05}
            className="group grid gap-2 border-b border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <p className="font-mono text-xs text-accent md:pt-1">{capability.index}</p>
            <div>
              <h3 className="text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-soft">
                {capability.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">{capability.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={index * 0.05}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <h3 className="font-mono text-[0.65rem] font-normal uppercase tracking-[0.16em] text-muted">
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-soft transition-colors duration-300 hover:border-accent/50 hover:text-paper"
                >
                  <SkillIcon skill={skill} />
                  {skill.name}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
