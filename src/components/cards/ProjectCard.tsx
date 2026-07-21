import { motion } from 'framer-motion'

import { staggerItem } from '@/animations'
import { ProjectActions } from '@/components/cards/ProjectActions'
import { BodyText } from '@/components/typography/BodyText'
import { Caption } from '@/components/typography/Caption'
import { SubHeading } from '@/components/typography/SubHeading'
import { Badge } from '@/components/ui/Badge'
import { Card, type CardSurface } from '@/components/ui/Card'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { Pill } from '@/components/ui/Pill'
import type { Project } from '@/data/projects'
import { projectsSectionContent } from '@/data/projects'
import { cn } from '@/lib/cn'

export type ProjectCardProps = {
  project: Project
  surface?: CardSurface
  className?: string
}

/**
 * Editorial project card — text-first; optional cover when a real image is set.
 */
export function ProjectCard({
  project,
  surface = 'mist',
  className,
}: ProjectCardProps) {
  const copy = projectsSectionContent
  const showCover = Boolean(project.coverImage)

  return (
    <motion.article
      variants={staggerItem}
      className={cn(className)}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <Card
        interactive
        surface={surface}
        padding="lg"
        className={cn(
          project.featured
            ? 'border-accent/40 md:p-10 lg:p-12'
            : 'md:p-8 lg:p-10',
        )}
      >
        {showCover && project.coverImage ? (
          <ImageFrame
            src={project.coverImage}
            alt={project.coverImageAlt}
            width={project.imageWidth}
            height={project.imageHeight}
            aspect="wide"
            zoomOnHover
            className="mb-8"
          />
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {project.featured ? (
            <Badge tone="accent">{copy.featuredBadge}</Badge>
          ) : null}
          <Caption className="tracking-[0.16em] uppercase">
            {project.tagline}
          </Caption>
        </div>

        <SubHeading
          as="h3"
          id={`project-${project.slug}-title`}
          className={cn(
            'mt-4',
            project.featured &&
              'font-display text-3xl tracking-[0.04em] uppercase md:text-4xl',
          )}
        >
          {project.title}
        </SubHeading>

        <BodyText
          className={cn(
            'mt-4 max-w-3xl',
            project.featured && 'text-base md:text-lg',
          )}
        >
          {project.description}
        </BodyText>

        {project.features.length > 0 ? (
          <div className="mt-6">
            <Caption className="tracking-[0.16em] uppercase">
              {copy.labels.features}
            </Caption>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6">
          <Caption className="tracking-[0.16em] uppercase">
            {copy.labels.technologies}
          </Caption>
          <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Pill>{tech}</Pill>
              </li>
            ))}
          </ul>
        </div>

        <ProjectActions
          githubUrl={project.githubUrl}
          liveUrl={project.liveUrl}
          prioritizeLive={project.featured}
          liveVariant={project.featured ? 'primary' : 'outline'}
          githubVariant="secondary"
          size={project.featured ? 'md' : 'sm'}
          className="mt-8"
        />
      </Card>
    </motion.article>
  )
}
