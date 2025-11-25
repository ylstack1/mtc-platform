import { escapeHtml } from '../theme'

export interface ActionItem {
  label: string
  icon?: string // SVG
  onClick?: string // JS code
  href?: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

export interface ActionGridProps {
  actions: ActionItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function renderActionGrid(props: ActionGridProps): string {
  const { actions, columns = 4, className = '' } = props

  const gridClass = columns === 4 ? 'grid-4' : columns === 3 ? 'grid-3' : 'grid-2'

  return `
    <div class="grid ${gridClass} gap-4 ${className}">
      ${actions.map(action => {
        // Using theme variables with inline styles for opacity where needed, or leveraging tailwind's arbitrary values
        // Note: Tailwind arbitrary values with CSS variables works if configured, but here we might need to rely on style attributes or direct CSS if we want transparency on variables without calc
        
        let variantClasses = ''
        let style = ''
        
        if (action.variant === 'danger') {
          variantClasses = 'text-[var(--color-error)] border-[var(--color-error)] hover:shadow-md'
          style = 'background-color: color-mix(in srgb, var(--color-error), transparent 90%); border-color: color-mix(in srgb, var(--color-error), transparent 80%);'
        } else if (action.variant === 'secondary') {
          variantClasses = 'bg-theme-surface text-theme-text border-theme hover:bg-theme-background'
        } else {
          // Primary
          variantClasses = 'text-[var(--color-primary)] border-[var(--color-primary)] hover:shadow-md'
          style = 'background-color: color-mix(in srgb, var(--color-primary), transparent 90%); border-color: color-mix(in srgb, var(--color-primary), transparent 80%);'
        }

        const disabledClass = action.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
        
        const content = `
          <div class="flex flex-col items-center justify-center py-6 px-4 text-center gap-3">
            ${action.icon ? `<div class="w-8 h-8 mb-1">${action.icon}</div>` : ''}
            <span class="font-medium">${escapeHtml(action.label)}</span>
          </div>
        `

        if (action.href) {
          return `
            <a href="${escapeHtml(action.href)}" 
               class="block border rounded-lg transition-all shadow-sm min-h-[120px] ${variantClasses} ${disabledClass}"
               style="${style}">
              ${content}
            </a>
          `
        } else {
           return `
            <button onclick="${action.onClick ? escapeHtml(action.onClick) : ''}" 
               class="w-full border rounded-lg transition-all shadow-sm min-h-[120px] ${variantClasses} ${disabledClass}"
               style="${style}"
               ${action.disabled ? 'disabled' : ''}>
              ${content}
            </button>
          `
        }
      }).join('')}
    </div>
  `
}
