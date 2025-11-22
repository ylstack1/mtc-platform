import { escapeHtml } from '../theme'

export interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: number // percentage
    label?: string
    direction: 'up' | 'down' | 'neutral'
  }
  icon?: string // SVG string
  className?: string
}

export function renderMetricCard(props: MetricCardProps): string {
  const { title, value, trend, icon, className = '' } = props

  let trendHtml = ''
  if (trend) {
    const trendColor = trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 
                       trend.direction === 'down' ? 'text-red-600 dark:text-red-400' : 
                       'text-gray-600 dark:text-gray-400'
    
    const arrowIcon = trend.direction === 'up' 
      ? '<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>'
      : trend.direction === 'down'
      ? '<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>'
      : '<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"></path></svg>'

    trendHtml = `
      <div class="flex items-baseline text-sm font-semibold ${trendColor}">
        ${arrowIcon}
        ${trend.value}%
        ${trend.label ? `<span class="ml-2 text-gray-500 dark:text-gray-400 font-normal">${escapeHtml(trend.label)}</span>` : ''}
      </div>
    `
  }

  return `
    <div class="card p-6 rounded-lg shadow-sm ${className}">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">${escapeHtml(title)}</h3>
        ${icon ? `<div class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">${icon}</div>` : ''}
      </div>
      <div class="flex items-baseline">
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">${escapeHtml(String(value))}</p>
      </div>
      ${trendHtml ? `<div class="mt-2">${trendHtml}</div>` : ''}
    </div>
  `
}

export interface MetricGridProps {
  metrics: MetricCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function renderMetricGrid(props: MetricGridProps): string {
  const { metrics, columns = 4, className = '' } = props
  
  const gridClass = columns === 4 ? 'grid-4' : columns === 3 ? 'grid-3' : 'grid-2'

  return `
    <div class="grid ${gridClass} gap-4 ${className}">
      ${metrics.map(metric => renderMetricCard(metric)).join('')}
    </div>
  `
}
