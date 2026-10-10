// Data kontak & link dipakai bersama oleh sidebar, hero dan section kontak
export const SITE = {
  name: 'Dzaky Rishan Atha Puasawa',
  displayName: 'Dzaky Rishan',
  shortName: 'Dzaky',
  initials: 'DR',
  /** Logo gaya 'A — Z' milik product.inc */
  monogram: ['D', 'R'],
  role: 'Computer Science Student · Backend Developer',
  email: 'dzaky.puasawa@binus.ac.id',
  github: 'https://github.com/DzakyRishan',
  // TODO: ganti dengan URL profil LinkedIn kamu
  linkedin: 'https://www.linkedin.com/in/your-linkedin-id',
  // TODO: taruh file CV di public/ dengan nama ini
  resume: '/CV-Dzaky-Rishan.pdf',
  location: 'Malang, Indonesia',
} as const

/** Jarak dari atas layar saat scroll ke section (tinggi top nav sticky + sedikit ruang) */
export function navOffset() {
  return 72
}

export function scrollToId(id: string, smooth = true) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset()
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
}

export type Theme = 'dark' | 'light'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // localStorage bisa diblokir (mode privat); tema tetap berlaku untuk sesi ini
  }
}
