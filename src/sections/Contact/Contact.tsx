import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useLayoutEffect, useRef, useState } from 'react'

import { AnimatedSectionHeader } from '@/components/effects/AnimatedSectionHeader'
import { Reveal } from '@/components/effects/Reveal'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Caption } from '@/components/typography/Caption'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { SECTION_IDS } from '@/constants/sectionIds'
import { contactContent } from '@/data/contact'
import { profile } from '@/data/profile'
import { getSocial } from '@/data/socials'
import { sectionCardSurface } from '@/lib/cardSurface'
import { cn } from '@/lib/cn'
import { ContactForm } from '@/sections/Contact/ContactForm'

type ContactProps = {
  className?: string
}

/**
 * Editorial contact section — details + validated EmailJS-ready form.
 * On desktop, the form card grows (bottom padding only) to match the info card bottom.
 */
export function Contact({ className }: ContactProps) {
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')
  const infoCardRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const [formMinHeight, setFormMinHeight] = useState<number | undefined>()

  useLayoutEffect(() => {
    const infoCard = infoCardRef.current
    const formCard = formCardRef.current
    if (!infoCard || !formCard) return

    const syncHeight = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      if (!isDesktop) {
        setFormMinHeight(undefined)
        return
      }

      const infoBottom = infoCard.getBoundingClientRect().bottom
      const formTop = formCard.getBoundingClientRect().top
      const nextHeight = Math.ceil(infoBottom - formTop)

      setFormMinHeight(nextHeight > 0 ? nextHeight : undefined)
    }

    syncHeight()

    const observer = new ResizeObserver(() => {
      syncHeight()
    })
    observer.observe(infoCard)
    observer.observe(formCard)

    window.addEventListener('resize', syncHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncHeight)
    }
  }, [])

  return (
    <Section
      id={SECTION_IDS.contact}
      spacing="lg"
      tone="default"
      aria-labelledby="contact-heading"
      className={cn('overflow-hidden border-t border-accent/10', className)}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <AnimatedSectionHeader
              layout="stack"
              eyebrow={contactContent.eyebrow}
              heading={contactContent.heading}
              headingId="contact-heading"
              headingClassName="mt-4 max-w-md text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] normal-case tracking-[-0.02em] drop-shadow-[0_0_36px_rgba(225,29,46,0.08)]"
              description={contactContent.description}
              descriptionClassName="mt-6 max-w-md"
            />

            <Reveal preset="fadeUp" className="mt-10">
              <div ref={infoCardRef}>
                <Card
                  surface={sectionCardSurface.contact}
                  padding="lg"
                  className="space-y-5"
                >
                  <Badge tone="success" className="w-fit">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-success"
                    />
                    {profile.availability}
                  </Badge>

                  <dl className="space-y-4">
                    <div>
                      <dt className="font-sans text-xs tracking-[0.16em] text-muted uppercase">
                        {contactContent.labels.email}
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-foreground transition-colors hover:text-accent"
                        >
                          {profile.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-sans text-xs tracking-[0.16em] text-muted uppercase">
                        {contactContent.labels.phone}
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                          className="text-foreground transition-colors hover:text-accent"
                        >
                          {profile.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-sans text-xs tracking-[0.16em] text-muted uppercase">
                        {contactContent.labels.location}
                      </dt>
                      <dd className="mt-1 text-foreground">
                        {profile.location}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex gap-3 pt-2">
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
                </Card>
              </div>
            </Reveal>
          </div>

          <Reveal preset="fadeUp" className="lg:col-span-7 lg:pt-8">
            <div ref={formCardRef}>
              <Card
                surface={sectionCardSurface.contact}
                padding="lg"
                className="md:p-8 lg:p-10"
                style={
                  formMinHeight != null
                    ? { minHeight: formMinHeight }
                    : undefined
                }
              >
                <Caption className="tracking-[0.18em] uppercase">
                  {contactContent.formHeading}
                </Caption>
                <ContactForm className="mt-6" />
              </Card>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
