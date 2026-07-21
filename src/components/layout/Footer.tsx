import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLink } from '@/components/navigation/SectionLink'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { footerNav } from '@/data/navigation'
import { profile } from '@/data/profile'
import { footerContent } from '@/data/sections'
import { getSocial } from '@/data/socials'
import { scrollToTop } from '@/lib/scroll'
import { cn } from '@/lib/cn'
import { useLenis } from '@/providers/lenisContext'

export type FooterProps = {
  className?: string
  onOpenTerminal?: () => void
}

/**
 * Premium footer — closing statement, nav, socials, copyright, back to top.
 */
export function Footer({ className, onOpenTerminal }: FooterProps) {
  const year = new Date().getFullYear()
  const lenis = useLenis()
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')
  const copy = footerContent

  return (
    <Section
      spacing="md"
      tone="default"
      className={cn('overflow-hidden border-t border-accent/15', className)}
      aria-label="Footer"
    >
      <Container>
        <BodyText className="mx-auto max-w-xl text-center">
          {copy.description}
        </BodyText>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1fr_auto] md:items-start md:gap-12">
          <div>
            <Caption className="block">
              © {year} {profile.name}
            </Caption>
            <Caption className="mt-2 block text-muted">{profile.title}</Caption>
          </div>

          <nav aria-label="Footer">
            <Caption className="tracking-[0.16em] uppercase">
              {copy.navigateLabel}
            </Caption>
            <ul className="mt-4 m-0 flex list-none flex-col gap-3 p-0">
              {footerNav.map((item) => (
                <li key={item.id}>
                  {item.sectionId ? (
                    <SectionLink
                      sectionId={item.sectionId}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </SectionLink>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <div className="flex gap-3">
              <SocialIcon
                href={github.href}
                label={github.label}
                icon={<FaGithub />}
              />
              <SocialIcon
                href={linkedin.href}
                label={linkedin.label}
                icon={<FaLinkedin />}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {onOpenTerminal ? (
                <button
                  type="button"
                  onClick={onOpenTerminal}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
                >
                  {copy.terminal}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => scrollToTop(lenis)}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
              >
                {copy.backToTop}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
