import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Route, Routes, useLocation } from 'react-router-dom'
import Marquee from './components/layout/Marquee'
import TopNav from './components/layout/TopNav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const { pathname, hash } = useLocation()

  // Smooth scrolling dengan Lenis (dinonaktifkan jika user memilih reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let frameId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Pindah halaman selalu mulai dari atas (kecuali ada #section yang dituju)
  useEffect(() => {
    if (hash) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <Marquee />
      <TopNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<CaseStudyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
