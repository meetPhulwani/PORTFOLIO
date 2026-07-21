import { BodyText } from '@/components/typography/BodyText'
import { SubHeading } from '@/components/typography/SubHeading'
import { Card, type CardSurface } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { cn } from '@/lib/cn'

export type SkillCardProps = {
  category: string
  skills: string[]
  description?: string
  surface?: CardSurface
  className?: string
}

/** Category skill surface with hover lift / glow via Card interactive variant. */
export function SkillCard({
  category,
  skills,
  description,
  surface = 'mist',
  className,
}: SkillCardProps) {
  return (
    <Card
      interactive
      surface={surface}
      padding="lg"
      className={cn('h-full', className)}
      aria-label={`${category} skills`}
    >
      <SubHeading size="sm">{category}</SubHeading>
      {description ? (
        <BodyText size="sm" className="mt-2">
          {description}
        </BodyText>
      ) : null}
      <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
        {skills.map((skill) => (
          <li key={skill}>
            <Pill>{skill}</Pill>
          </li>
        ))}
      </ul>
    </Card>
  )
}
