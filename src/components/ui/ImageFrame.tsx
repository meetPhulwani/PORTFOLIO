import { cva, type VariantProps } from 'class-variance-authority'
import type { ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

const frameVariants = cva(
  'relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-secondary',
  {
    variants: {
      aspect: {
        video: 'aspect-video',
        square: 'aspect-square',
        portrait: 'aspect-[3/4]',
        wide: 'aspect-[16/10]',
        auto: '',
      },
      zoomOnHover: {
        true: 'group',
        false: '',
      },
    },
    defaultVariants: {
      aspect: 'video',
      zoomOnHover: true,
    },
  },
)

export type ImageFrameProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height'
> &
  VariantProps<typeof frameVariants> & {
    /** Reserved width — required for CLS safety. */
    width: number
    /** Reserved height — required for CLS safety. */
    height: number
    alt: string
  }

/**
 * Media frame with reserved dimensions, lazy-load default, and optional hover zoom.
 * Always pass width/height + descriptive alt (spec §17.4).
 */
export function ImageFrame({
  aspect,
  zoomOnHover,
  className,
  width,
  height,
  alt,
  loading = 'lazy',
  decoding = 'async',
  ...imgProps
}: ImageFrameProps) {
  return (
    <div className={cn(frameVariants({ aspect, zoomOnHover }), className)}>
      <img
        {...imgProps}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        className={cn(
          'size-full object-cover',
          zoomOnHover &&
            'transition-transform duration-500 ease-out group-hover:scale-105',
        )}
      />
    </div>
  )
}
