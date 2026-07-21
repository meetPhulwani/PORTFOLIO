/**
 * Site-wide SEO defaults.
 */
export const seo = {
  siteName: 'Meet Phulwani',
  titleDefault: 'Meet Phulwani — Software Developer',
  titleTemplate: '%s · Meet Phulwani',
  description:
    'Meet Phulwani — Software Developer and Computer Engineering student at VESIT. Building scalable full-stack applications with Java, MERN Stack, and realtime systems.',
  siteUrl: 'https://meetphulwani.dev',
  ogImage: '/images/og-placeholder.svg',
  ogImageAlt: 'Meet Phulwani — Software Developer portfolio',
  twitterHandle: '@meetPhulwani',
  locale: 'en_US',
  robots: 'index, follow',
  themeColor: '#090909',
  author: 'Meet Phulwani',
  keywords: [
    'Meet Phulwani',
    'Software Developer',
    'VESIT',
    'React',
    'Java',
    'MERN',
    'Full Stack',
    'Internship',
  ],
} as const

export type SeoConfig = typeof seo

export function formatTitle(pageTitle?: string): string {
  if (!pageTitle) return seo.titleDefault
  return seo.titleTemplate.replace('%s', pageTitle)
}
