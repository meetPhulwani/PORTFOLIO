/**
 * Central profile data — sourced from Meet Phulwani resume (autoCV).
 */
export const profile = {
  name: 'Meet Phulwani',
  shortName: 'Meet',
  logoLetter: 'M',
  title: 'Software Developer',
  focusLine: 'Java • MERN Stack • Full Stack Engineer',
  tagline:
    'Computer Engineering student at VESIT passionate about building scalable full-stack applications, real-time systems, and modern digital experiences.',
  availability: 'Available for Internship',
  email: 'meetphulwani24@gmail.com',
  phone: '+91 83293 67465',
  location: 'Mumbai, India',
  resumeUrl: '/resume/Meet-Phulwani-Resume.pdf',
  about: {
    introduction:
      'I am a Software Developer and Computer Engineering student at VESIT, focused on building scalable full-stack applications with the MERN stack, Java, and real-time systems.',
    philosophy:
      'I care about clean architecture, reliable APIs, and interfaces that stay fast and usable under real product constraints. Prefer pragmatic engineering with strong fundamentals in DSA and OOP.',
    focus:
      'Currently building production-minded web products through internships and personal projects — from e-commerce platforms to realtime multiplayer experiences.',
    technologies: [
      'Java',
      'JavaScript',
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'REST APIs',
      'Git',
    ],
  },
} as const

export type Profile = typeof profile
