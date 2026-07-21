import { Link } from 'react-router-dom'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Seo } from '@/components/seo/Seo'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { Heading } from '@/components/typography/Heading'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/lib/cn'

/** Polished 404 shell. */
export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" path="/404" noIndex />
      <main id="main" aria-label="Page not found">
        <Section spacing="lg" className="min-h-[70dvh]">
          <Container className="max-w-3xl">
            <Caption tone="accent" className="uppercase tracking-[0.22em]">
              404
            </Caption>
            <Heading as="h1" size="md" className="mt-4">
              Page not found
            </Heading>
            <BodyText className="mt-4">
              The page you are looking for does not exist or has moved.
            </BodyText>
            <Link
              to="/"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'md' }),
                'mt-8',
              )}
            >
              Return Home
            </Link>
          </Container>
        </Section>
      </main>
    </>
  )
}
