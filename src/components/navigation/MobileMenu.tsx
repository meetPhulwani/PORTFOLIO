import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { SectionLink } from '@/components/navigation/SectionLink'
import { BodyText } from '@/components/typography/BodyText'
import { Heading } from '@/components/typography/Heading'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { SECTION_IDS } from '@/constants/sectionIds'
import type { NavItem } from '@/data/navigation'
import { profile } from '@/data/profile'
import { getSocial } from '@/data/socials'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/cn'

export type MobileMenuProps = {
  open: boolean
  onClose: () => void
  items: NavItem[]
  activeSectionId: string | null
}

/** Full-screen mobile navigation overlay with focus trap + escape close. */
export function MobileMenu({
  open,
  onClose,
  items,
  activeSectionId,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const locationKey = `${location.pathname}${location.hash}`
  const prevLocationKeyRef = useRef(locationKey)
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')

  useBodyScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (prevLocationKeyRef.current === locationKey) return
    prevLocationKeyRef.current = locationKey
    onClose()
  }, [locationKey, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          data-scroll-lock-allow
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-background px-6 pt-24 pb-10 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <Heading as="p" size="sm" className="text-foreground/20">
            Menu
          </Heading>

          <nav aria-label="Mobile" className="mt-8 flex flex-1 flex-col gap-2">
            {items.map((item, index) => {
              const active = item.sectionId === activeSectionId
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.35 }}
                >
                  {item.sectionId ? (
                    <SectionLink
                      sectionId={item.sectionId}
                      onClick={onClose}
                      className={cn(
                        'block border-b border-border py-4 font-display text-4xl tracking-[0.08em] uppercase',
                        active ? 'text-accent' : 'text-foreground',
                      )}
                    >
                      {item.label}
                    </SectionLink>
                  ) : (
                    <a
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block border-b border-border py-4 font-display text-4xl tracking-[0.08em] uppercase',
                        active ? 'text-accent' : 'text-foreground',
                      )}
                    >
                      {item.label}
                    </a>
                  )}
                </motion.div>
              )
            })}
          </nav>

          <div className="mt-auto space-y-6">
            <a
              href={profile.resumeUrl}
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full')}
              download
            >
              Resume
            </a>
            <div className="flex items-center gap-3">
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
              <BodyText size="sm" className="ml-2">
                {profile.name}
              </BodyText>
            </div>
            <SectionLink
              sectionId={SECTION_IDS.hero}
              onClick={onClose}
              className="font-display text-sm tracking-[0.2em] text-muted uppercase"
            >
              Home
            </SectionLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
