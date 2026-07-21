import { cva, type VariantProps } from 'class-variance-authority'

/** Shared CVA styles for Button and link-styled actions. */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)]',
    'font-sans text-sm font-medium tracking-wide',
    'transition-[transform,background-color,border-color,color,box-shadow] duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-40',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-foreground hover:bg-accent/90 shadow-[0_10px_30px_rgb(225_29_46/0.25)]',
        secondary:
          'bg-white/[0.025] text-foreground border border-white/[0.05] hover:border-foreground/20 hover:bg-white/[0.04]',
        ghost:
          'bg-transparent text-foreground border border-transparent hover:border-white/[0.05] hover:bg-white/[0.025]',
        outline:
          'bg-transparent text-foreground border border-white/[0.05] hover:border-accent hover:text-accent',
      },
      size: {
        sm: 'h-10 px-4',
        md: 'h-12 px-6',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
