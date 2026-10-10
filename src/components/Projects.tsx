import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../data/projects'
import DeviceMockup, { coverBackground } from './DeviceMockup'
import Section, { EASE } from './ui/Section'

/** Gambar yang diputar di kartu: cover lalu screenshot galeri yang sudah ada */
function cardImages(project: Project) {
  const images = [project.cover, ...(project.gallery ?? []).map((item) => item.image)]
  return images.filter((image): image is string => Boolean(image))
}

function ProjectCard({ project, position }: { project: Project; position: number }) {
  const reduceMotion = useReducedMotion()
  const images = cardImages(project)
  const [hovered, setHovered] = useState(false)
  const [slide, setSlide] = useState(0)

  // Seperti product.inc: saat di-hover, screenshot bergantian dan titiknya ikut menyala
  useEffect(() => {
    if (!hovered || reduceMotion || images.length < 2) return
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % images.length), 1600)
    return () => window.clearInterval(timer)
  }, [hovered, reduceMotion, images.length])

  const dots = Math.max(images.length, 1 + (project.gallery?.length ?? 0))

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay: (position % 2) * 0.1 }}
    >
      <Link
        to={`/work/${project.id}`}
        aria-label={`${project.name}: ${project.headline}. View case study`}
        className="project-card-plain group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setSlide(0)
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line"
          style={coverBackground(project.accent)}
        >
          {images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt=""
                loading="lazy"
                className={`cover-zoom absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  index === slide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <DeviceMockup project={project} />
          )}

          {dots > 1 && (
            <div aria-hidden="true" className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
              {Array.from({ length: dots }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === slide ? 'w-4 bg-white/90' : 'w-1.5 bg-white/35'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent">
          {project.name}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent md:text-[1.4rem]">
          {project.headline}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Role and tech stack: ${project.role}`}>
          <li className="rounded-md bg-surface px-2 py-0.5 text-[0.72rem] text-paper">{project.role}</li>
          {project.cardStack.map((tech) => (
            <li key={tech} className="rounded-md bg-surface px-2 py-0.5 text-[0.72rem] text-soft">
              {tech}
            </li>
          ))}
        </ul>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Cases"
      title="Selected work"
      description="Four projects spanning AI pet care, e-commerce, campus systems and retail POS."
    >
      <div className="grid gap-x-7 gap-y-12 md:grid-cols-2">
        {projects.map((project, position) => (
          <ProjectCard key={project.id} project={project} position={position} />
        ))}
      </div>
    </Section>
  )
}
