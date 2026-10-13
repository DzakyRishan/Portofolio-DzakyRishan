const MESSAGE =
  '● Open to backend & full-stack internships · Based in Malang, Indonesia · Reach me by email or WhatsApp, I usually reply within a day'

/** Banner berjalan di paling atas halaman (gaya product.inc). Berhenti saat di-hover. */
export default function Marquee() {
  // Teks diulang dua kali agar loop -50% terlihat mulus tanpa jeda
  const items = Array.from({ length: 4 }, (_, index) => index)

  return (
    <div
      role="note"
      aria-label={MESSAGE}
      className="marquee relative z-50 overflow-hidden border-b border-line bg-surface py-2 text-xs text-muted"
    >
      <div aria-hidden="true" className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex">
            {items.map((item) => (
              <span key={item} className="px-8">
                {MESSAGE}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
