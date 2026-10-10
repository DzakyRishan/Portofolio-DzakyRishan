import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { SITE } from '../lib/site'

export default function Footer() {
  const reduceMotion = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="content-page mt-24 pb-10">
      <div className="flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE.name} · {SITE.location}
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
          className="group inline-flex items-center gap-2 self-start transition-colors duration-300 hover:text-paper sm:self-auto"
        >
          Back to top
          <ArrowUp size={13} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  )
}
