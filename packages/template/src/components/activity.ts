import { escapeHtml } from '../theme'

export interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    initials?: string
  }
  action: string
  target?: string
  time: string
  icon?: string
}

export interface ActivityListProps {
  title?: string
  items: ActivityItem[]
  className?: string
  maxHeight?: string
}

export function renderActivityList(props: ActivityListProps): string {
  const { title, items, className = '', maxHeight } = props

  return `
    <div class="card rounded-lg shadow-sm ${className}">
      ${title ? `
        <div class="px-6 py-4 border-b border-theme">
          <h3 class="text-lg font-medium text-theme-text">${escapeHtml(title)}</h3>
        </div>
      ` : ''}
      <div class="flow-root ${maxHeight ? 'overflow-y-auto' : ''}" ${maxHeight ? `style="max-height: ${maxHeight}"` : ''}>
        <ul role="list" class="divide-y divide-[var(--color-border)]">
          ${items.map(item => `
            <li class="px-6 py-4 hover:bg-theme-background transition-colors">
              <div class="flex space-x-3">
                ${item.user.avatar 
                  ? `<img class="h-8 w-8 rounded-full" src="${escapeHtml(item.user.avatar)}" alt="">`
                  : `<div class="h-8 w-8 rounded-full bg-theme-background flex items-center justify-center">
                      <span class="text-xs font-medium text-theme-secondary">${escapeHtml(item.user.initials || item.user.name.substring(0, 2))}</span>
                     </div>`
                }
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-theme-text">${escapeHtml(item.user.name)}</h3>
                    <p class="text-xs text-theme-secondary">${escapeHtml(item.time)}</p>
                  </div>
                  <p class="text-sm text-theme-secondary">
                    ${escapeHtml(item.action)} 
                    ${item.target ? `<span class="font-medium text-theme-text">${escapeHtml(item.target)}</span>` : ''}
                  </p>
                </div>
                ${item.icon ? `<div class="flex-shrink-0 text-theme-secondary">${item.icon}</div>` : ''}
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `
}
