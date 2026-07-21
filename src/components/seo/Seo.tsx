import { useEffect } from 'react'

import { formatTitle, seo } from '@/data/seo'

export type SeoProps = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

/**
 * Applies document title + social/SEO meta tags for the active route.
 * Defaults live in `data/seo.ts` for easy deployment updates.
 */
export function Seo({
  title,
  description = seo.description,
  path = '/',
  image = seo.ogImage,
  noIndex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = formatTitle(title)
    const canonical = `${seo.siteUrl}${path === '/' ? '' : path}`
    const imageUrl = image.startsWith('http') ? image : `${seo.siteUrl}${image}`

    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'author', seo.author)
    upsertMeta('name', 'keywords', seo.keywords.join(', '))
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : seo.robots)
    upsertMeta('name', 'theme-color', seo.themeColor)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', seo.siteName)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:image:alt', seo.ogImageAlt)
    upsertMeta('property', 'og:locale', seo.locale)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertMeta('name', 'twitter:site', seo.twitterHandle)

    upsertLink('canonical', canonical)
  }, [description, image, noIndex, path, title])

  return null
}
