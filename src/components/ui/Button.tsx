import { forwardRef, type ButtonHTMLAttributes } from 'react'

import {
  buttonVariants,
  type ButtonVariantProps,
} from '@/components/ui/buttonVariants'
import { cn } from '@/lib/cn'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps

/** Primary interactive control — CVA variants for solid / ghost / outline. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant, size, className, type = 'button', ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
