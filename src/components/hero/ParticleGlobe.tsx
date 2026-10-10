import { useEffect, useRef } from 'react'
import { LAND_BITMAP, LAND_HEIGHT, LAND_WIDTH } from '../../data/globePoints'

/** Jumlah titik kandidat di permukaan bola (Fibonacci sphere), lalu disaring daratan/laut */
const SAMPLES = 64000
/** Dari titik laut, hanya 1 dari N yang digambar (tipis, supaya bentuk bola tetap terlihat) */
const OCEAN_EVERY = 9
const BUCKETS = 7
/** Kecepatan maksimum partikel (px per frame) */
const MAX_SPEED = 2.2
const MAX_SPEED2 = MAX_SPEED * MAX_SPEED

interface Palette {
  dot: readonly [number, number, number]
  spark: readonly [number, number, number]
  body: string
  rim: readonly [number, number, number]
}

const DARK: Palette = {
  dot: [96, 214, 236],
  spark: [210, 250, 255],
  body: 'rgba(6, 22, 32, 0.55)',
  rim: [86, 200, 230],
}

const LIGHT: Palette = {
  dot: [8, 120, 150],
  spark: [0, 90, 120],
  body: 'rgba(200, 236, 244, 0.35)',
  rim: [20, 140, 170],
}

function decodeLand() {
  const binary = atob(LAND_BITMAP)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return (lat: number, lng: number) => {
    const row = Math.min(LAND_HEIGHT - 1, Math.max(0, Math.floor(((90 - lat) / 180) * LAND_HEIGHT)))
    const col = Math.min(LAND_WIDTH - 1, Math.max(0, Math.floor(((lng + 180) / 360) * LAND_WIDTH)))
    const index = row * LAND_WIDTH + col
    return (bytes[index >> 3] & (1 << (index & 7))) !== 0
  }
}

/** Titik permukaan bola: daratan rapat, laut jarang, beberapa "kota" berkilau */
function buildPoints() {
  const isLand = decodeLand()
  const lat: number[] = []
  const lng: number[] = []
  const kind: number[] = [] // 0 laut, 1 darat, 2 kilau
  const golden = Math.PI * (3 - Math.sqrt(5))
  let oceanSeen = 0
  let landSeen = 0

  for (let i = 0; i < SAMPLES; i++) {
    const y = 1 - (i / (SAMPLES - 1)) * 2
    const theta = golden * i
    const latDeg = (Math.asin(y) * 180) / Math.PI
    let lngDeg = ((theta * 180) / Math.PI) % 360
    if (lngDeg > 180) lngDeg -= 360
    if (latDeg < -60) continue // Antartika dan laut selatan dibuang, seperti globe referensi

    if (isLand(latDeg, lngDeg)) {
      landSeen++
      lat.push((latDeg * Math.PI) / 180)
      lng.push((lngDeg * Math.PI) / 180)
      kind.push(landSeen % 263 === 0 ? 2 : 1)
    } else if (oceanSeen++ % OCEAN_EVERY === 0) {
      lat.push((latDeg * Math.PI) / 180)
      lng.push((lngDeg * Math.PI) / 180)
      kind.push(0)
    }
  }

  return {
    count: lat.length,
    cosLat: Float32Array.from(lat, Math.cos),
    sinLat: Float32Array.from(lat, Math.sin),
    lng: Float32Array.from(lng),
    kind: Uint8Array.from(kind),
  }
}

/**
 * Globe partikel ala product.inc: titik-titik cyan yang membentuk bumi, berputar pelan,
 * bisa diputar dengan drag, dan partikelnya tersibak saat dilewati kursor lalu kembali
 * ke tempatnya. Saat muncul, partikel berkumpul dari sebaran acak.
 * Reduced motion: tanpa putaran otomatis, tanpa efek sibak/intro.
 */
export default function ParticleGlobe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const points = buildPoints()
    const n = points.count

    // offset layar per partikel (efek sibak + intro) beserta kecepatannya
    const offsetX = new Float32Array(n)
    const offsetY = new Float32Array(n)
    const speedX = new Float32Array(n)
    const speedY = new Float32Array(n)
    const screenX = new Float32Array(n)
    const screenY = new Float32Array(n)
    const bucket = new Int8Array(n)
    const sizeOf = new Float32Array(n)

    if (!reduceMotion) {
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2
        const distance = 120 + Math.random() * 260
        offsetX[i] = Math.cos(angle) * distance
        offsetY[i] = Math.sin(angle) * distance
      }
    }

    const tilt = (-16 * Math.PI) / 180
    const cosTilt = Math.cos(tilt)
    const sinTilt = Math.sin(tilt)

    let palette = document.documentElement.dataset.theme === 'light' ? LIGHT : DARK
    let rotation = -2.0 // bujur ~115° (Indonesia) di depan
    let spin = 0
    let dragging = false
    let lastX = 0
    let pointerX = -9999
    let pointerY = -9999
    let pointerInside = false
    let smoothX = -9999
    let smoothY = -9999
    let visible = true
    let frame = 0
    let dpr = 1
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
    }

    const step = (time: number, animate: boolean) => {
      // posisi kursor yang diperhalus, supaya area dorongan ikut bergerak lembut
      smoothX += (pointerX - smoothX) * 0.12
      smoothY += (pointerY - smoothY) * 0.12
      const radius = Math.min(width, height) * 0.45
      const cx = width / 2
      const cy = height / 2
      const influence = radius * 0.42
      const influence2 = influence * influence
      const baseDot = Math.max(1, radius / 210)

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      // badan bola gelap + pinggiran yang menyala
      context.fillStyle = palette.body
      context.beginPath()
      context.arc(cx, cy, radius, 0, Math.PI * 2)
      context.fill()

      const [rr, rg, rb] = palette.rim
      const rim = context.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.12)
      rim.addColorStop(0, `rgba(${rr},${rg},${rb},0)`)
      rim.addColorStop(0.55, `rgba(${rr},${rg},${rb},0.16)`)
      rim.addColorStop(1, `rgba(${rr},${rg},${rb},0)`)
      context.fillStyle = rim
      context.beginPath()
      context.arc(cx, cy, radius * 1.12, 0, Math.PI * 2)
      context.fill()

      for (let i = 0; i < n; i++) {
        const longitude = points.lng[i] + rotation
        const cosLat = points.cosLat[i]
        const x = cosLat * Math.sin(longitude)
        const y0 = points.sinLat[i]
        const z0 = cosLat * Math.cos(longitude)
        const y = y0 * cosTilt - z0 * sinTilt
        const z = y0 * sinTilt + z0 * cosTilt

        if (z < -0.05) {
          bucket[i] = -1
          continue
        }

        let sx = cx + x * radius
        let sy = cy - y * radius

        if (animate) {
          // sibak menjauh dari kursor
          if (pointerInside) {
            const dx = sx + offsetX[i] - smoothX
            const dy = sy + offsetY[i] - smoothY
            const d2 = dx * dx + dy * dy
            if (d2 < influence2 && d2 > 0.01) {
              const d = Math.sqrt(d2)
              // dorongan lembut yang terus bekerja selama kursor di dekatnya: globe melengkung pelan,
              // bukan meledak. smoothstep membuat tepi area dorongan halus.
              const t = 1 - d / influence
              const force = t * t * (3 - 2 * t) * 0.55
              const swirl = force * 0.15
              speedX[i] += (dx / d) * force - (dy / d) * swirl
              speedY[i] += (dy / d) * force + (dx / d) * swirl
            }
          }
          // pegas lemah = partikel melayang pelan kembali ke posisi asal (beberapa detik)
          speedX[i] = (speedX[i] - offsetX[i] * 0.0045) * 0.93
          speedY[i] = (speedY[i] - offsetY[i] * 0.0045) * 0.93
          // batasi kecepatan supaya partikel bergeser pelan, tidak terlempar
          const speed2 = speedX[i] * speedX[i] + speedY[i] * speedY[i]
          if (speed2 > MAX_SPEED2) {
            const scale = MAX_SPEED / Math.sqrt(speed2)
            speedX[i] *= scale
            speedY[i] *= scale
          }
          offsetX[i] += speedX[i]
          offsetY[i] += speedY[i]
        }

        sx += offsetX[i]
        sy += offsetY[i]
        screenX[i] = sx
        screenY[i] = sy

        // titik dekat pinggir bola sedikit lebih terang (efek rim), titik belakang redup
        const edge = 1 - z
        const kind = points.kind[i]
        let alpha: number
        if (kind === 0) alpha = 0.05 + z * 0.12
        else alpha = 0.25 + z * 0.55 + edge * edge * 0.25
        if (kind === 2) {
          const pulse = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(time / 520 + i)
          alpha = (0.35 + z * 0.65) * (0.6 + 0.4 * pulse)
        }
        bucket[i] = Math.min(BUCKETS - 1, Math.max(0, Math.floor(alpha * BUCKETS)))
        sizeOf[i] = kind === 2 ? baseDot * 1.7 : baseDot * (0.65 + z * 0.55)
      }

      // gambar per kelompok alpha supaya fillStyle tidak diganti ribuan kali
      const [dr, dg, db] = palette.dot
      for (let b = 0; b < BUCKETS; b++) {
        context.fillStyle = `rgba(${dr},${dg},${db},${((b + 0.5) / BUCKETS).toFixed(3)})`
        context.beginPath()
        for (let i = 0; i < n; i++) {
          if (bucket[i] !== b || points.kind[i] === 2) continue
          const s = sizeOf[i]
          context.rect(screenX[i] - s / 2, screenY[i] - s / 2, s, s)
        }
        context.fill()
      }

      // titik "kota" berkilau dengan cahaya kecil
      const [sr, sg, sb] = palette.spark
      for (let i = 0; i < n; i++) {
        if (points.kind[i] !== 2 || bucket[i] < 0) continue
        const alpha = (bucket[i] + 0.5) / BUCKETS
        const s = sizeOf[i]
        context.fillStyle = `rgba(${sr},${sg},${sb},${(alpha * 0.18).toFixed(3)})`
        context.beginPath()
        context.arc(screenX[i], screenY[i], s * 1.8, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = `rgba(${sr},${sg},${sb},${alpha.toFixed(3)})`
        context.fillRect(screenX[i] - s / 2, screenY[i] - s / 2, s, s)
      }
    }

    const loop = (time: number) => {
      if (!dragging) {
        rotation += 0.0011 + spin
        spin *= 0.95
      }
      step(time, true)
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0
    }

    const start = () => {
      if (!reduceMotion && !frame) frame = requestAnimationFrame(loop)
    }

    const localPoint = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      return [event.clientX - rect.left, event.clientY - rect.top] as const
    }

    const onPointerDown = (event: PointerEvent) => {
      dragging = true
      lastX = event.clientX
      spin = 0
      canvas.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent) => {
      ;[pointerX, pointerY] = localPoint(event)
      if (!pointerInside) {
        smoothX = pointerX
        smoothY = pointerY
      }
      pointerInside = true
      if (!dragging) return
      const delta = ((event.clientX - lastX) / Math.max(width, 1)) * 3.2
      rotation += delta
      spin = delta * 0.4
      lastX = event.clientX
      if (reduceMotion) step(performance.now(), false)
    }
    const onPointerUp = () => {
      dragging = false
    }
    const onPointerLeave = () => {
      pointerInside = false
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    observer.observe(canvas)

    const themeObserver = new MutationObserver(() => {
      palette = document.documentElement.dataset.theme === 'light' ? LIGHT : DARK
      if (reduceMotion) step(performance.now(), false)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onVisibility = () => !document.hidden && start()
    const onResize = () => {
      resize()
      if (reduceMotion) step(performance.now(), false)
    }

    resize()
    step(0, false)
    start()

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`touch-pan-y cursor-grab active:cursor-grabbing ${className}`}
    />
  )
}
