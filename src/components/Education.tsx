import { education } from '../data/experience'
import Section, { Reveal } from './ui/Section'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title={education.institution}
      description={`${education.program}, GPA ${education.gpa}.`}
    >
      <Reveal className="grid gap-2 border-y border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8">
        <p className="font-mono text-xs text-muted md:pt-1">{education.period}</p>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Relevant coursework</h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Relevant coursework">
            {education.coursework.map((course) => (
              <li
                key={course}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft"
              >
                {course}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
