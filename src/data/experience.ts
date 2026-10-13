export interface ExperienceItem {
  id: string
  title: string
  /** Opsional, isi jika ingin menampilkan organisasi/institusi */
  organization?: string
  period: string
  current?: boolean
  highlights: string[]
}

export interface Achievement {
  id: string
  title: string
  issuer: string
  year: string
}

export interface EducationItem {
  id: string
  institution: string
  program: string
  gpa: string
  period: string
  coursework: string[]
}

export const experiences: ExperienceItem[] = [
  {
    id: 'ta-database',
    title: 'Teaching Assistant — Database Technology',
    period: 'Sept 2026 — Present',
    current: true,
    highlights: [
      'Guided relational database design and normalization.',
      'Assisted SQL DDL/DML exercises.',
      'Supported database and transaction management learning.',
      'Prepared and graded practical assignments.',
    ],
  },
  {
    id: 'ta-computational-physics',
    title: 'Teaching Assistant — Computational Physics',
    period: 'Sept 2026 — Present',
    current: true,
    highlights: [
      'Guided Python-based electrical circuit simulations.',
      'Assisted quantitative problem solving.',
      'Helped translate theoretical circuit analysis into Python simulations.',
    ],
  },
  {
    id: 'himti-manager',
    title: 'Manager — Publication & Marketing',
    organization: 'HIMTI @Malang',
    period: 'Feb 2026 — Present',
    current: true,
    highlights: [
      'Led publication & marketing team.',
      'Managed content ideation and production.',
      'Reviewed content before publication.',
      'Developed content distribution strategies.',
      'Coordinated with Design & Development division.',
    ],
  },
  {
    id: 'event-head-funtastic',
    title: 'Event Head — Funtastic',
    period: 'Feb 2026 — Mar 2026',
    highlights: [
      'Led end-to-end event planning.',
      'Managed logistics and committee coordination.',
      'Managed event budgeting.',
      'Managed accountability reporting and timeline tracking.',
    ],
  },
  {
    id: 'freshmen-partner',
    title: 'Freshmen Partner',
    period: 'Sept 2025 — May 2026',
    highlights: [
      'Mentored new students.',
      'Provided academic guidance.',
      'Helped students adapt to university life.',
    ],
  },
]

export const achievements: Achievement[] = [
  {
    id: 'best-freshmen-partner',
    title: 'Best Freshmen Partner Award',
    issuer: 'BINUS University First Year Program',
    year: '2025',
  },
  {
    id: 'business-model-pitching',
    title: 'Top 10 Finalist',
    issuer: 'BINUS Malang Business Model Pitching Competition',
    year: '2026',
  },
]

export const education: EducationItem = {
  id: 'binus-malang',
  institution: 'BINUS University Malang',
  program: 'Computer Science Undergraduate',
  gpa: '3.36 / 4.00',
  period: 'Sep 2024 — Present',
  coursework: [
    'Software Engineering',
    'Web Programming for Business',
    'Object Oriented Programming',
    'Data Structure',
    'Database Design',
    'Algorithm Design and Analysis'
    
    
  ],
}