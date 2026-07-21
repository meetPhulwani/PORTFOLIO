/**
 * Tech marquee items — resume-aligned stack.
 */
export const technologies = [
  'JAVA',
  'JAVASCRIPT',
  'REACT',
  'NODE',
  'EXPRESS',
  'MONGODB',
  'MYSQL',
  'POSTGRESQL',
  'REST APIS',
  'GIT',
  'GITHUB',
  'DSA',
] as const

export type Technology = (typeof technologies)[number]
