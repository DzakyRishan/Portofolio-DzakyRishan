import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CountUp } from './case/StatBox'
import ParticleGlobe from './hero/ParticleGlobe'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './ui/BrandIcons'
import { EASE } from './ui/Section'
import { SITE, scrollToId } from '../lib/site'

// Angka nyata dari data portofolio. Ubah di sini kalau ada yang bertambah.
const STATS = [
  { label: 'Featured projects', value: 4, plus: true },
  { label: 'Backend frameworks', value: 5, plus: true },
  { label: 'Campus roles held', value: 5, plus: true },
  { label: 'Courses assisted', value: 2, plus: false },
  { label: 'Awards', value: 2, plus: false },
  { label: 'GPA', value: 3.36, decimals: 2, plus: false },
] as const

/** Tanda siku kecil di empat pojok bingkai hero */
function FrameCorners() {
  const base = 'pointer-events-none absolute h-2.5 w-2.5 border-line-strong'
  return (
    <>
      <span aria-hidden="true" className={`${base} left-0 top-0 border-l border-t`} />
      <span aria-hidden="true" className={`${base} right-0 top-0 border-r border-t`} />
      <span aria-hidden="true" className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden="true" className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: reduceMotion ? 0 : delay, ease: EASE },
  })

  const iconButton =
    'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-paper transition-colors duration-300 hover:border-accent/60 hover:text-accent-soft'

  return (
    <>
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="relative mt-4 grid min-h-[min(calc(100svh-7rem),56rem)] items-center gap-6 py-10 lg:grid-cols-2 lg:gap-10"
      >
        <FrameCorners />

        {/* Foto + globe partikel */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-[36rem]"
        >
          <ParticleGlobe className="absolute inset-0 h-full w-full" />
          <img
            src="/images/dzaky-cutout.webp"
            alt={`Portrait of ${SITE.name}`}
            width={900}
            height={1350}
            fetchPriority="high"
            className="pointer-events-none absolute bottom-[4%] left-1/2 h-[92%] w-auto -translate-x-1/2 select-none object-contain"
            style={{
              maskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
            }}
          />
        </motion.div>

        {/* Teks */}
        <div className="relative z-10 px-1 lg:pr-6">
          <motion.p
            {...fadeUp(0.1)}
            className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-accent"
          >
            {SITE.role}
          </motion.p>

          <motion.h1
            {...fadeUp(0.18)}
            id="hero-heading"
            className="mt-3 text-[3rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-7xl xl:text-[5.25rem]"
          >
            {SITE.displayName}
          </motion.h1>

          <motion.p {...fadeUp(0.26)} className="mt-6 max-w-[38rem] text-[0.98rem] leading-[1.75] text-soft">
            Computer Science student at BINUS University Malang who builds backends and the databases
            under them, in Laravel, Spring Boot and Go. Recently built{' '}
            <Link to="/work/pawcation" className="inline-link">PawCation</Link>, an AI pet-care
            platform with breed detection, designed the schema and API behind{' '}
            <Link to="/work/farmfresh" className="inline-link">FarmFresh</Link> and{' '}
            <Link to="/work/campus-inventory" className="inline-link">Campus Inventory</Link>, and
            managed the team that shipped{' '}
            <Link to="/work/edja-corner" className="inline-link">Edja Corner</Link>. Teaching
            assistant for Database Technology and Publication &amp; Marketing manager at HIMTI Malang.
            Open to internships in backend and full-stack development.
          </motion.p>

          <motion.div {...fadeUp(0.34)} className="mt-7 flex flex-wrap items-center gap-2.5">
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                scrollToId('contact', !reduceMotion)
              }}
              className="inline-flex h-10 items-center rounded-lg bg-accent px-4 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-accent-soft"
            >
              Let&apos;s talk
            </a>
            <a
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-paper transition-colors duration-300 hover:border-accent/60"
            >
              Download resume
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconButton}>
              <LinkedInIcon size={15} />
            </a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconButton}>
              <GitHubIcon size={15} />
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconButton}>
              <WhatsAppIcon size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Statistik lebar penuh, 3 kolom */}
      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 py-10 md:grid-cols-3 md:gap-x-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="corner-box relative px-4 py-5 md:px-5 md:py-6">
            <dt className="text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">{stat.label}</dt>
            <dd className="mt-2 font-display text-5xl font-medium tracking-tight text-paper md:text-6xl">
              <CountUp value={stat.value} decimals={'decimals' in stat ? stat.decimals : 0} />
              {stat.plus && <sup className="ml-1 text-2xl text-accent md:text-3xl">+</sup>}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}
