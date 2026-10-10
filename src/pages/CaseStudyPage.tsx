import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, projects, type Project } from '../data/projects'
import { GitHubIcon } from '../components/ui/BrandIcons'
import DeviceMockup, { coverBackground } from '../components/DeviceMockup'
import ScrollRevealText from '../components/case/ScrollRevealText'
import StatBox from '../components/case/StatBox'
import Shot from '../components/case/Shot'
import { scrollToId } from '../lib/site'

const EASE = [0.22, 1, 0.36, 1] as const

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'solution', label: 'Solution' },
  { id: 'role', label: 'My Role' },
  { id: 'impact', label: 'Impact' },
  { id: 'learning', label: 'Key Learning' },
] as const

function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        <span className="mr-2 text-accent">{number}</span>
        {label}
      </p>
      <h2 className="mt-3 font-serif text-4xl font-normal leading-[1.1] tracking-[-0.01em] md:text-[2.6rem]">
        {title}
      </h2>
    </>
  )
}

/** Daftar isi sticky di kiri yang menyala sesuai section yang sedang dibaca */
function Toc() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<string>(SECTIONS[0].id)

  useEffect(() => {
    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => element !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    scrollToId(id, !reduceMotion)
  }

  return (
    <nav aria-label="On this page" className="sticky top-24 hidden xl:block">
      <ul className="space-y-3">
        {SECTIONS.map((section, index) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => goTo(section.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isActive ? 'text-accent' : 'text-faint hover:text-soft'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px bg-current transition-all duration-500 ease-premium ${
                    isActive ? 'w-6' : 'w-3'
                  }`}
                />
                <span
                  className={`transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  0{index + 1} {section.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProjectNav({ project }: { project: Project }) {
  const position = projects.findIndex((item) => item.id === project.id)
  const previous = projects[(position - 1 + projects.length) % projects.length]
  const next = projects[(position + 1) % projects.length]

  return (
    <nav aria-label="More projects" className="grid gap-3 sm:grid-cols-2">
      <Link
        to={`/work/${previous.id}`}
        className="group rounded-xl border border-line p-5 transition-colors duration-300 hover:border-accent/60"
      >
        <span className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Previous
        </span>
        <span className="mt-2 block font-display text-lg font-semibold">{previous.name}</span>
      </Link>
      <Link
        to={`/work/${next.id}`}
        className="group rounded-xl border border-line p-5 text-right transition-colors duration-300 hover:border-accent/60"
      >
        <span className="flex items-center justify-end gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Next case study
          <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
        <span className="mt-2 block font-display text-lg font-semibold">{next.name}</span>
      </Link>
    </nav>
  )
}

export default function CaseStudyPage() {
  const { id } = useParams()
  const project = getProject(id)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const previousTitle = document.title
    document.title = `${project.name} — Case Study · Dzaky Rishan`
    return () => {
      document.title = previousTitle
    }
  }, [project])

  if (!project) return <Navigate to="/" replace />

  return (
    <article key={project.id} className="pt-14 md:pt-20" aria-labelledby="case-title">
      {/* Hero */}
      <header className="container-page">
        <div className="mx-auto max-w-[42rem]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              <Link to="/" className="transition-colors hover:text-paper">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-accent">{project.name}</span>
            </p>
            <h1
              id="case-title"
              className="mt-5 font-serif text-[2.6rem] font-normal leading-[1.06] tracking-[-0.015em] sm:text-5xl md:text-6xl"
            >
              {project.headline}
            </h1>
            <p className="mt-4 text-base text-soft">{project.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-accent-soft"
              >
                <GitHubIcon size={16} />
                View source on GitHub
                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-line sm:aspect-[21/9]"
          style={coverBackground(project.accent)}
        >
          {project.cover ? (
            <img src={project.cover} alt={`${project.name} cover`} className="h-full w-full object-cover" />
          ) : (
            <DeviceMockup project={project} width="46%" />
          )}
        </motion.div>
      </header>

      {/* Body */}
      <div className="container-page mt-16 xl:grid xl:grid-cols-[11rem_minmax(0,1fr)_11rem] xl:gap-8">
        <div>
          <Toc />
        </div>

        <div className="mx-auto w-full max-w-[42rem]">
          {/* Overview */}
          <section id="overview" aria-label="Overview">
            <ScrollRevealText
              text={project.problem}
              className="font-serif text-2xl leading-[1.4] text-paper md:text-[1.75rem]"
            />

            <p className="mt-14 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
              {project.statsTitle}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {project.stats.map((stat) => (
                <StatBox key={stat.label} stat={stat} />
              ))}
            </div>
          </section>

          {/* Solution */}
          <section id="solution" className="mt-20 border-t border-line pt-12">
            <Reveal>
              <SectionHeading number="01" label="Solution" title="What I built" />
              <p className="mt-5 text-base leading-relaxed text-soft">{project.solution}</p>
            </Reveal>

            {project.features.map((feature) => (
              <Reveal key={feature.title} className="mt-12">
                <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-soft">{feature.body}</p>
                <Shot
                  image={feature.image}
                  caption={feature.caption}
                  alt={`${project.name} — ${feature.title}`}
                  className="mt-6 lg:-mx-20"
                />
              </Reveal>
            ))}

            {project.gallery && project.gallery.length > 0 && (
              <Reveal className="mt-12">
                <div
                  className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 lg:-mx-20 lg:px-0"
                  tabIndex={0}
                  aria-label={`${project.name} screenshot gallery, scroll horizontally`}
                  data-lenis-prevent
                >
                  {project.gallery.map((item) => (
                    <Shot
                      key={item.caption}
                      image={item.image}
                      caption={item.caption}
                      alt={`${project.name} — ${item.caption}`}
                      className="w-[78%] shrink-0 snap-center sm:w-[60%]"
                    />
                  ))}
                </div>
              </Reveal>
            )}
          </section>

          {/* Role */}
          <section id="role" className="mt-20 border-t border-line pt-12">
            <Reveal>
              <SectionHeading number="02" label="My Role" title={project.role} />
              <p className="mt-5 text-base leading-relaxed text-soft">{project.roleDetail}</p>

              <p className="mt-10 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
                Tech Stack
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.stack.map((group) => (
                  <div key={group.group} className="rounded-xl border border-line bg-surface p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">{group.group}</p>
                    <ul className="mt-2 space-y-1">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm text-paper">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Impact */}
          <section id="impact" className="mt-20 border-t border-line pt-12">
            <Reveal>
              <SectionHeading number="03" label="Impact" title="What it changes for the people using it" />
              <ul className="mt-6">
                {project.impact.map((item) => (
                  <li key={item.verb} className="border-b border-line py-4 text-base leading-relaxed text-soft">
                    <strong className="font-semibold text-paper">{item.verb}</strong> {item.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Key learning */}
          <section id="learning" className="mt-20 border-t border-line pt-12">
            <Reveal>
              <SectionHeading number="04" label="Key Learning" title="What this project taught me" />
              <p className="mt-5 text-base leading-relaxed text-soft">{project.keyLearning}</p>

              {(project.github || project.liveDemo) && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-accent-soft"
                    >
                      Live demo
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:border-accent hover:text-accent-soft"
                    >
                      View on GitHub
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </section>

          <div className="mt-20">
            <ProjectNav project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}
