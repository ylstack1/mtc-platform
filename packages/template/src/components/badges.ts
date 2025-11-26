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

  // We use inline styles to leverage the CSS variables with transparency
  const variantStyles = {
    default: 'background-color: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border);',
    primary: 'background-color: color-mix(in srgb, var(--color-primary), transparent 85%); color: var(--color-primary);',
    success: 'background-color: color-mix(in srgb, var(--color-success), transparent 85%); color: var(--color-success);',
    warning: 'background-color: color-mix(in srgb, var(--color-warning), transparent 85%); color: var(--color-warning);',
    error: 'background-color: color-mix(in srgb, var(--color-error), transparent 85%); color: var(--color-error);',
    neutral: 'background-color: var(--color-background); color: var(--color-text-secondary); border: 1px solid var(--color-border);'
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5'
  }

  const roundClass = rounded ? 'rounded-full' : 'rounded'

  return `
    <span class="inline-flex items-center font-medium ${roundClass} ${sizeClasses[size]} ${className}" style="${variantStyles[variant]}">
      ${escapeHtml(label)}
    </span>
  `
}
