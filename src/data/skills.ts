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
    id: 'backend',
    title: 'Backend & Database',
    skills: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Spring Boot', icon: 'spring' },
      { name: 'Go · Gin', icon: 'go' },
      { name: 'Express' },
      { name: 'Flask' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
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
    id: 'full-stack',
    index: '01',
    title: 'Backend & Database Development',
    description:
      'Designing relational schemas and building the APIs on top of them, from layered Spring Boot services to SQL-first Go handlers.',
    technologies: ['Laravel', 'Spring Boot', 'Go', 'Express', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'ai-ml',
    index: '02',
    title: 'AI & Machine Learning',
    description:
      'Exploring AI and Machine Learning through practical projects and AI-integrated applications.',
    technologies: ['Python', 'AI/ML concepts'],
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