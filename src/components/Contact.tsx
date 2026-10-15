import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { SITE } from '../lib/site'
import { Reveal } from './ui/Section'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-20 md:pt-28">
      <Reveal
        className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 90% at 100% 0%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 70%)',
          }}
        />
        <div className="relative">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-accent">Work together</p>
          <h2 id="contact-heading" className="mt-3 text-3xl font-semibold tracking-tight md:text-[2.5rem]">
            Looking for a  intern?
          </h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-soft">
            I&apos;m open to internships in backend and web development. 
            Send me a message and I&apos;ll get back to you within a day.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-accent-soft"
            >
              <Mail size={15} aria-hidden="true" />
              {SITE.email}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink px-4 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-accent/60"
            >
              {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
            </button>
            {[
              { label: 'WhatsApp', href: SITE.whatsapp },
              { label: 'LinkedIn', href: SITE.linkedin },
              { label: 'GitHub', href: SITE.github },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-line bg-ink px-4 py-2.5 text-sm text-paper transition-colors duration-300 hover:border-accent/60"
              >
                {link.label}
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
