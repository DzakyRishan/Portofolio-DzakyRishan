import type { Project } from '../data/projects'

interface DeviceMockupProps {
  project: Project
  /** Lebar perangkat relatif terhadap bingkai */
  width?: string
  className?: string
}

/**
 * Placeholder perangkat (monitor) selama gambar cover asli belum ada.
 * Ganti dengan mengisi `cover` di data project, misal hasil export shots.so.
 */
export default function DeviceMockup({
  project,
  width = '64%',
  className = '',
}: DeviceMockupProps) {
  return (
    <div
      aria-hidden="true"
      className={`device absolute left-1/2 top-[13%] ${className}`}
      style={{ width }}
    >
      <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[5px] border-4 border-[#1c1c22] bg-[#0f1117]">
        <div className="h-[14%]" style={{ background: project.tone }} />
        <div className="grid flex-1 grid-cols-4 gap-[6%] p-[7%]">
          {Array.from({ length: 8 }).map((_, index) => (
            <i key={index} className="rounded-sm bg-white/[0.07]" />
          ))}
        </div>
      </div>
      <div className="mx-auto h-3 w-[15%] bg-gradient-to-b from-[#26262c] to-[#18181c]" />
      <div className="mx-auto h-[3px] w-[32%] rounded bg-[#2a2a30]" />
    </div>
  )
}

/** Latar "meja kerja" gelap dengan cahaya aksen di belakang perangkat */
export function coverBackground(accent: string) {
  return {
    background: `radial-gradient(70% 60% at 50% 25%, ${accent}40, transparent 70%), linear-gradient(180deg, #121219 0%, #0b0b0f 64%, #17141a 64%, #0d0c0f 100%)`,
  }
}
