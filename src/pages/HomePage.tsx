import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Achievements from '../components/Achievements'
import Contact from '../components/Contact'
import { scrollToId } from '../lib/site'

export default function HomePage() {
  const { hash } = useLocation()

  // Saat kembali dari case study ke "/#work", langsung lompat ke section-nya
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const frame = requestAnimationFrame(() => scrollToId(id, false))
    return () => cancelAnimationFrame(frame)
  }, [hash])

  return (
    <div className="content-page">
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Achievements />
      <Contact />
    </div>
  )
}
