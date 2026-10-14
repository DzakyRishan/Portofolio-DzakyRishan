export interface Skill {
  name: string
  /** Slug ikon dari Devicon, contoh: 'react'. Kosongkan jika tidak ada ikonnya. */
  icon?: string
  /** Varian file ikon Devicon. Default: 'original' */
  variant?: 'original' | 'plain' | 'original-wordmark' | 'plain-wordmark'
}

export interface SkillGroup {
  id: string
  title: string
  skills: Skill[]
}

export interface Capability {
  id: string
  index: string
  title: string
  description: string
  technologies: string[]
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

export function getSkillIconUrl(skill: Skill): string | null {
  if (!skill.icon) return null
  const variant = skill.variant ?? 'original'
  return `${DEVICON_BASE}/${skill.icon}/${skill.icon}-${variant}.svg`
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { name: 'Java', icon: 'java' },
      { name: 'C', icon: 'c' },
      { name: 'Python', icon: 'python' },
      { name: 'SQL' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'PHP', icon: 'php' },
      { name: 'Go', icon: 'go' },
    ],
  },
  {
    id: 'web',
    title: 'Web Development',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Vite', icon: 'vitejs' },
      { name: 'React Router' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css3' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Node.js', icon: 'nodejs' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    skills: [
      { name: 'Go · Gin', icon: 'go' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'Express' },
      { name: 'Flask' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'pgAdmin', icon: 'postgresql' },
      { name: 'XAMPP' },
    ],
  },
]

export const capabilities: Capability[] = [
  {
    id: 'software-development',
    index: '01',
    title: 'Software Development',
    description:
      'Building web applications and user interfaces, from frontend experiences to full application logic.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'PHP', 'Laravel', 'Node.js'],
  },
  {
    id: 'backend-database',
    index: '02',
    title: 'Backend & Database',
    description:
      'Designing relational databases and building the backend systems that power applications.',
    technologies: ['SQL', 'MySQL', 'PostgreSQL', 'Go', 'Spring Boot', 'Laravel', 'Node.js'],
  },
  {
    id: 'product-leadership',
    index: '03',
    title: 'Product & Leadership',
    description:
      'Combining technical knowledge with project management, team leadership, communication, and product thinking.',
    technologies: [],
  },
]