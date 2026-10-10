import { ImageIcon } from 'lucide-react'

interface ShotProps {
  image?: string
  caption?: string
  alt: string
  className?: string
}

/** Screenshot di halaman case study, atau placeholder bergaris jika gambar belum ada */
export default function Shot({ image, caption, alt, className = '' }: ShotProps) {
  return (
    <figure className={className}>
      {image ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full rounded-xl border border-line object-cover"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface text-muted">
          <ImageIcon size={22} aria-hidden="true" />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
            Screenshot · {caption ?? alt}
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  )
}
