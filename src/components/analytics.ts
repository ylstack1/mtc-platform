import { escapeHtml } from '../theme'

export interface AnalyticsDataPoint {
  label: string
  value: number
  displayValue?: string
  color?: string
}

export interface AnalyticsPanelProps {
  title: string
  description?: string
  data: AnalyticsDataPoint[]
  type?: 'bar' | 'list'
  className?: string
  height?: string
}

export function renderAnalyticsPanel(props: AnalyticsPanelProps): string {
  const { title, description, data, type = 'bar', className = '', height = '200px' } = props

  const maxValue = Math.max(...data.map(d => d.value)) || 1

  let content = ''
  
  if (type === 'bar') {
    content = `
      <div class="flex items-end justify-between gap-2 h-full w-full">
        ${data.map(item => {
          const heightPercentage = Math.max((item.value / maxValue) * 100, 4) // Min height 4%
          const color = item.color || 'bg-blue-500 dark:bg-blue-600'
          return `
            <div class="flex flex-col items-center justify-end flex-1 group h-full">
              <div class="w-full rounded-t-sm opacity-80 hover:opacity-100 transition-opacity ${color}" style="height: ${heightPercentage}%"></div>
              <div class="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" title="${escapeHtml(item.label)}">${escapeHtml(item.label)}</div>
            </div>
          `
        }).join('')}
      </div>
    `
  } else {
    content = `
      <div class="space-y-4">
        ${data.map(item => {
           const widthPercentage = Math.max((item.value / maxValue) * 100, 1)
           const color = item.color || 'bg-blue-500 dark:bg-blue-600'
           return `
             <div>
               <div class="flex justify-between text-sm font-medium mb-1">
                 <span class="text-gray-700 dark:text-gray-300">${escapeHtml(item.label)}</span>
                 <span class="text-gray-900 dark:text-white">${escapeHtml(item.displayValue || String(item.value))}</span>
               </div>
               <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                 <div class="${color} h-2.5 rounded-full" style="width: ${widthPercentage}%"></div>
               </div>
             </div>
           `
        }).join('')}
      </div>
    `
  }

  return `
    <div class="card p-6 rounded-lg shadow-sm ${className}">
      <div class="mb-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">${escapeHtml(title)}</h3>
        ${description ? `<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">${escapeHtml(description)}</p>` : ''}
      </div>
      <div style="height: ${type === 'bar' ? height : 'auto'}">
        ${content}
      </div>
    </div>
  `
}
