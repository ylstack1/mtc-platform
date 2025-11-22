import { escapeHtml } from '../theme'

export interface BadgeProps {
  label: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md'
  className?: string
  rounded?: boolean
}

export function renderBadge(props: BadgeProps): string {
  const { label, variant = 'default', size = 'md', className = '', rounded = false } = props

  const variantClasses = {
    default: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5'
  }

  const roundClass = rounded ? 'rounded-full' : 'rounded'

  return `
    <span class="inline-flex items-center font-medium ${roundClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}">
      ${escapeHtml(label)}
    </span>
  `
}
