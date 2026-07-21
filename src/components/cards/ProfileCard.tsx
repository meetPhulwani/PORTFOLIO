import type { ReactNode } from 'react'

import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { SubHeading } from '@/components/typography/SubHeading'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Card, type CardSurface } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import type { ProfileStat } from '@/data/codingProfiles'
import { cn } from '@/lib/cn'

export type ProfileCardProps = {
  platform: string
  username: string
  description: string
  href: string
  stats: ProfileStat[]
  topLanguages?: string[]
  icon: ReactNode
  surface?: CardSurface
  className?: string
}

/** Coding-profile surface with stats, optional languages, and visit CTA. */
export function ProfileCard({
  platform,
  username,
  description,
  href,
  stats,
  topLanguages,
  icon,
  surface = 'mist',
  className,
}: ProfileCardProps) {
  return (
    <Card
      interactive
      surface={surface}
      padding="lg"
      className={cn('flex h-full flex-col', className)}
      aria-label={`${platform} profile`}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-white/[0.05] bg-white/[0.025] text-xl text-foreground"
        >
          {icon}
        </span>
        <div>
          <SubHeading size="sm">{platform}</SubHeading>
          <Caption className="mt-1 block">@{username}</Caption>
        </div>
      </div>

      <BodyText size="sm" className="mt-5">
        {description}
      </BodyText>

      <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {stats.map((stat) => (
          <li key={stat.label}>
            <AnimatedCounter
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          </li>
        ))}
      </ul>

      {topLanguages && topLanguages.length > 0 ? (
        <div className="mt-6">
          <Caption className="tracking-[0.16em] uppercase">Top languages</Caption>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {topLanguages.map((language) => (
              <li key={language}>
                <Pill>{language}</Pill>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto pt-8">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'w-fit')}
        >
          Visit Profile
        </a>
      </div>
    </Card>
  )
}
