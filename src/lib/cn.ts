import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges conditional class names with Tailwind-aware conflict resolution.
 * Use with CVA component variants to avoid duplicated utility strings.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
