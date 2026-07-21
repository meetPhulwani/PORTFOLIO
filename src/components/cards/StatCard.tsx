import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { Card, type CardSurface } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

export type StatCardProps = {
  value: number
  label: string
  suffix?: string
  prefix?: string
  surface?: CardSurface
  className?: string
}

/** Statistic surface composed from Card + AnimatedCounter. */
export function StatCard({
  value,
  label,
  suffix,
  prefix,
  surface = 'mist',
  className,
}: StatCardProps) {
  return (
    <Card
      interactive
      surface={surface}
      padding="lg"
      className={cn('h-full', className)}
      aria-label={`${value}${suffix ?? ''} ${label}`}
    >
      <AnimatedCounter
        value={value}
        label={label}
        suffix={suffix}
        prefix={prefix}
      />
    </Card>
  )
}
