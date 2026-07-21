/**
 * Skill categories — from resume Tech Skills.
 */
export const skillCategories = [
  {
    id: 'languages',
    category: 'Languages',
    description: 'Core programming and web languages.',
    skills: ['C', 'Java', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'frontend',
    category: 'Frontend',
    description: 'Interfaces that feel responsive and reusable.',
    skills: ['React.js', 'Responsive Design', 'DOM Manipulation'],
  },
  {
    id: 'backend',
    category: 'Backend',
    description: 'APIs and server-side application logic.',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'database',
    category: 'Database',
    description: 'Document and relational data systems.',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQL'],
  },
  {
    id: 'tools',
    category: 'Tools & Core',
    description: 'Workflow, collaboration, and fundamentals.',
    skills: ['Git', 'GitHub', 'VS Code', 'DSA', 'OOP'],
  },
] as const

export type SkillCategory = (typeof skillCategories)[number]
