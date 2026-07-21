/**
 * Education — from resume.
 */
export type EducationItem = {
  id: string
  degree: string
  college: string
  duration: string
  cgpa: string | null
  coursework: string[]
  achievements: string[]
}

export const education: EducationItem[] = [
  {
    id: 'vesit',
    degree: 'B.E. Computer Engineering',
    college: "Vivekanand Education Society's Institute of Technology (VESIT), Mumbai",
    duration: 'Sept 2024 – 2028',
    cgpa: '7.34 / 10',
    coursework: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Database Systems',
      'REST APIs',
    ],
    achievements: [
      'Building full-stack MERN and Java-focused projects alongside coursework',
      'MHT-CET 79.9 %ile · JEE 85.6 %ile',
    ],
  },
  {
    id: 'hsc-chm',
    degree: 'Higher Secondary Certificate (Science)',
    college: 'CHM College, Ulhasnagar',
    duration: 'Completed',
    cgpa: null,
    coursework: [],
    achievements: [
      'Scored 71.2%',
      'Science stream foundation for Computer Engineering',
    ],
  },
]
