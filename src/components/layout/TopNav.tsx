import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SITE, getTheme, scrollToId, setTheme, type Theme } from '../../lib/site'

const NAV_ITEMS = [
  { label: 'Cases', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' },
  { label: 'Awards', id: 'achievements' },
  { label: 'Work together', id: 'contact' },
] as const

/** Section mana yang sedang dibaca di home (untuk menebalkan menu) */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!enabled) return
    const ids = ['top', ...NAV_ITEMS.map((item) => item.id)]
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [enabled])

  return active
}

function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const [theme, setThemeState] = useState<Theme>(() => getTheme())
  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next === 'dark' ? 'Dark' : 'Light'}`

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next)
        setThemeState(next)
      }}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center gap-2 rounded-full px-2 text-muted transition-colors duration-300 hover:text-paper"
    >
      {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      {withLabel && <span className="text-sm">{label}</span>}
    </button>
  )
}

export default function TopNav() {
  const reduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const activeOnHome = useActiveSection(isHome)
  const active = isHome ? activeOnHome : 'work'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    const wasOpen = menuOpen
    setMenuOpen(false)
    if (!isHome) {
      navigate(id === 'top' ? '/' : `/#${id}`)
      return
    }
    window.setTimeout(() => scrollToId(id, !reduceMotion), wasOpen ? 50 : 0)
  }

  const [first, last] = SITE.monogram

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/85 backdrop-blur-md">
        <nav aria-label="Main navigation" className="content-page flex h-14 items-center justify-between gap-6">
          <Link
            to="/"
            onClick={(event) => handleNavigate(event, 'top')}
            aria-label={`${SITE.name}, home`}
            className="group flex items-center gap-2 font-display text-[0.8rem] font-semibold tracking-[0.1em] text-paper"
          >
            <span>{first}</span>
            <span
              aria-hidden="true"
              className="h-px w-5 bg-current transition-all duration-500 ease-premium group-hover:w-8 group-hover:bg-accent"
            />
            <span>{last}</span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavigate(event, item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-[0.72rem] uppercase tracking-[0.08em] transition-colors duration-300 ${
                      isActive ? 'font-semibold text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
            <li>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.72rem] uppercase tracking-[0.08em] text-muted transition-colors duration-300 hover:text-paper"
              >
                Resume
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <a
              href={`mailto:${SITE.email}`}
              aria-label={`Email ${SITE.email}`}
              title={SITE.email}
              className="hidden h-9 items-center rounded-full px-2 text-muted transition-colors duration-300 hover:text-paper lg:inline-flex"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-paper transition-colors hover:bg-surface lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto bg-ink px-5 pb-8 pt-2 lg:hidden"
          >
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(event) => handleNavigate(event, item.id)}
                    className={`block border-b border-line py-4 font-display text-2xl font-semibold ${
                      active === item.id ? 'text-accent-soft' : 'text-paper'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-b border-line py-4 font-display text-2xl font-semibold text-paper"
                >
                  Resume
                </a>
              </li>
            </ul>
            <div className="mt-auto flex items-center justify-between pt-6">
              <ThemeToggle withLabel />
              <a href={`mailto:${SITE.email}`} className="font-mono text-xs text-muted">
                {SITE.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
