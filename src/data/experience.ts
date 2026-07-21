/**
 * Professional experience — from resume.
 */
export type ExperienceItem = {
  id: string
  role: string
  company: string
  duration: string
  location: string
  summary: string
  technologies: string[]
  achievements: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'bluestock',
    role: 'Software Development Intern',
    company: 'Bluestock',
    duration: 'Internship',
    location: 'Remote',
    summary:
      'Contributed to product development in an agile team — building React UI, integrating REST APIs, and improving application performance.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'REST APIs'],
    achievements: [
      'Built responsive and reusable UI components using React.js',
      'Integrated RESTful APIs with the frontend using Node.js and Express.js',
      'Collaborated in an agile team to implement features and troubleshoot production issues',
      'Optimized application performance and enhanced UX through debugging and code improvements',
    ],
  },
]
