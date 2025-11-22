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
        const variantClasses = action.variant === 'danger' 
          ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 dark:border-red-800'
          : action.variant === 'secondary'
          ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700'
          : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'

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
               class="block border rounded-lg transition-all shadow-sm hover:shadow-md min-h-[120px] ${variantClasses} ${disabledClass}">
              ${content}
            </a>
          `
        } else {
           return `
            <button onclick="${action.onClick ? escapeHtml(action.onClick) : ''}" 
               class="w-full border rounded-lg transition-all shadow-sm hover:shadow-md min-h-[120px] ${variantClasses} ${disabledClass}"
               ${action.disabled ? 'disabled' : ''}>
              ${content}
            </button>
          `
        }
      }).join('')}
    </div>
  `
}
