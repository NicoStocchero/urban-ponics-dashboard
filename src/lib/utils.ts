import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values
 * @param value - Number to format
 * @returns Formatted currency string (e.g., "$1.2M", "$500K")
 */
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`
  }
  return `$${value}`
}

/**
 * Map deal stage to progress percentage
 * @param stage - Deal stage number (1-9)
 * @returns Progress percentage (10-90)
 */
export function mapStageToProgress(stage: number): number {
  return stage * 10
}
