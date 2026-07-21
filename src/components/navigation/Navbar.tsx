import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Container } from '@/components/layout/Container'
import { MobileMenu } from '@/components/navigation/MobileMenu'
import { SectionLink } from '@/components/navigation/SectionLink'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { SECTION_IDS } from '@/constants/sectionIds'
import { navigation } from '@/data/navigation'
import { profile } from '@/data/profile'
import { getSocial } from '@/data/socials'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useHeroTitleInView } from '@/hooks/useHeroTitleInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/cn'

export type NavbarProps = {
  className?: string
}

/** Sticky premium navbar — brand left, centered links, actions right. */
export function Navbar({ className }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const progress = useScrollProgress()
  const scrolled = progress > 0.02
  const activeSectionId = useActiveSection(navigation)
  const heroTitleInView = useHeroTitleInView()
  const prefersReducedMotion = usePrefersReducedMotion()
  const showBrandActions = !heroTitleInView
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const brandActionsMotion = {
    initial: false as const,
    animate: showBrandActions
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: prefersReducedMotion ? 0 : 8 },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300',
          scrolled
            ? 'border-b border-border bg-background/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
          className,
        )}
      >
        <Container className="relative flex h-16 items-center md:h-20">
          {/* Reserved left slot — invisible text keeps width stable when brand fades. */}
          <div className="relative z-10 grid">
            <span
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 font-display text-2xl tracking-[0.14em] uppercase"
            >
              {profile.shortName}
            </span>
            <motion.div
              className="col-start-1 row-start-1 flex items-center"
              {...brandActionsMotion}
            >
              <SectionLink
                sectionId={SECTION_IDS.hero}
                tabIndex={showBrandActions ? 0 : -1}
                aria-hidden={!showBrandActions}
                className={cn(
                  'font-display text-2xl tracking-[0.14em] text-foreground uppercase focus-visible:outline-none',
                  !showBrandActions && 'pointer-events-none',
                )}
                aria-label={`${profile.name} — Home`}
              >
                {profile.shortName}
              </SectionLink>
            </motion.div>
          </div>

          <nav
            aria-label="Primary"
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 xl:gap-8 lg:flex"
          >
            {navigation.map((item) => {
              const active = item.sectionId === activeSectionId
              if (!item.sectionId) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'font-sans text-sm tracking-wide whitespace-nowrap transition-colors duration-300',
                      active
                        ? 'text-accent'
                        : 'text-foreground/90 hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                )
              }
              return (
                <SectionLink
                  key={item.id}
                  sectionId={item.sectionId}
                  className={cn(
                    'font-sans text-sm tracking-wide whitespace-nowrap transition-colors duration-300',
                    active
                      ? 'text-accent'
                      : 'text-foreground/90 hover:text-foreground',
                  )}
                  aria-current={active ? 'true' : undefined}
                >
                  {item.label}
                </SectionLink>
              )
            })}
          </nav>

          <motion.div
            className={cn(
              'relative z-10 ml-auto hidden items-center gap-3 lg:flex',
              !showBrandActions && 'pointer-events-none',
            )}
            aria-hidden={!showBrandActions}
            {...brandActionsMotion}
          >
            <SocialIcon
              href={github.href}
              label={github.label}
              icon={<FaGithub />}
              className="size-10"
              tabIndex={showBrandActions ? 0 : -1}
            />
            <SocialIcon
              href={linkedin.href}
              label={linkedin.label}
              icon={<FaLinkedin />}
              className="size-10"
              tabIndex={showBrandActions ? 0 : -1}
            />
            <a
              href={profile.resumeUrl}
              tabIndex={showBrandActions ? 0 : -1}
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
              download
            >
              Resume
            </a>
          </motion.div>

          <button
            type="button"
            className="relative z-10 ml-auto inline-flex size-11 items-center justify-center rounded-[var(--radius-md)] border border-border text-foreground lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="font-display text-xl">
              {menuOpen ? '✕' : '☰'}
            </span>
          </button>
        </Container>
      </header>

      <div id="mobile-navigation">
        <MobileMenu
          open={menuOpen}
          onClose={closeMenu}
          items={navigation}
          activeSectionId={activeSectionId}
        />
      </div>
    </>
  )
}
