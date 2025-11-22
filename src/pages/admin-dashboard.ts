/**
 * Modern Dark Dashboard Page
 * Same data interface as core, different design
 */

import { renderAdminLayout, AdminLayoutData } from '../layouts/admin-layout'
import { escapeHtml } from '../theme'
import { renderMetricGrid, MetricCardProps } from '../components/metrics'
import { renderAnalyticsPanel, AnalyticsDataPoint } from '../components/analytics'
import { renderActionGrid, ActionItem as ActionGridItem } from '../components/actions'
import { renderActivityList, ActivityItem as ActivityListItem } from '../components/activity'

export interface DashboardStats {
  collections: number
  contentItems: number
  mediaFiles: number
  users: number
  databaseSize?: number
  mediaSize?: number
  recentActivity?: ActivityItem[]
  analytics?: AnalyticsData
}

export interface ActivityItem {
  id: string
  type: 'content' | 'media' | 'user' | 'collection'
  action: string
  description: string
  timestamp: string
  user: string
}

export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  contentPublished: number
  mediaUploaded: number
  weeklyGrowth: {
    pageViews: number
    visitors: number
    content: number
    media: number
  }
}

export interface DashboardPageData {
  user?: {
    name: string
    email: string
    role: string
  }
  stats?: DashboardStats
  version?: string
  dynamicMenuItems?: Array<{
    label: string
    path: string
    icon?: string
    isPlugin?: boolean
  }>
}

export function renderDashboardPage(data: DashboardPageData): string {
  const stats = data.stats || {
    collections: 0,
    contentItems: 0,
    mediaFiles: 0,
    users: 0,
  }

  // 1. Hero Header
  const heroHtml = `
    <div class="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 p-8 text-white shadow-lg">
      <div class="relative z-10">
        <h1 class="text-3xl font-bold mb-2 text-white">Welcome back${data.user?.name ? `, ${escapeHtml(data.user.name)}` : ''}!</h1>
        <p class="text-blue-100 max-w-2xl">Here's what's happening in your project today. You have <span class="font-semibold text-white">${stats.recentActivity?.length || 0} new updates</span> to review.</p>
        
        ${data.user?.role ? `
          <div class="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-sm border border-white/10">
            <span class="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
            ${escapeHtml(data.user.role)}
          </div>
        ` : ''}
      </div>
      
      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
    </div>
  `

  // 2. Metrics Grid
  const metrics: MetricCardProps[] = [
    {
      title: 'Collections',
      value: stats.collections,
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
      trend: { value: 12, direction: 'up', label: 'from last week' } // Dummy trend for visual
    },
    {
      title: 'Content Items',
      value: stats.contentItems,
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
      trend: { value: 5, direction: 'up' }
    },
    {
      title: 'Media Files',
      value: stats.mediaFiles,
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
      trend: { value: 2, direction: 'down', label: 'storage usage' }
    },
    {
      title: 'Users',
      value: stats.users,
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
      trend: { value: 0, direction: 'neutral' }
    }
  ]

  const metricsHtml = renderMetricGrid({ metrics, className: 'mb-8' })

  // 3. Analytics & Actions Grid
  const analyticsData: AnalyticsDataPoint[] = stats.analytics ? [
    { label: 'Views', value: stats.analytics.weeklyGrowth.pageViews, color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'Visitors', value: stats.analytics.weeklyGrowth.visitors, color: 'bg-purple-500 dark:bg-purple-600' },
    { label: 'Content', value: stats.analytics.weeklyGrowth.content, color: 'bg-pink-500 dark:bg-pink-600' },
    { label: 'Media', value: stats.analytics.weeklyGrowth.media, color: 'bg-green-500 dark:bg-green-600' }
  ] : []

  const analyticsPanel = renderAnalyticsPanel({
    title: 'Weekly Overview',
    description: 'Performance metrics across your content and users',
    data: analyticsData,
    type: 'bar',
    height: '250px',
    className: 'h-full'
  })

  const actions: ActionGridItem[] = [
    {
      label: 'Create Content',
      href: '/admin/content',
      variant: 'primary',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>'
    },
    {
      label: 'Upload Media',
      href: '/admin/media',
      variant: 'secondary',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>'
    },
    {
      label: 'Manage Users',
      href: '/admin/users',
      variant: 'secondary',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      variant: 'secondary',
      icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
    }
  ]

  const actionsGrid = renderActionGrid({ actions, columns: 2 })

  // 4. Activity List
  const activityItems: ActivityListItem[] = (stats.recentActivity || []).map(activity => ({
    id: activity.id,
    user: {
      name: activity.user,
      initials: activity.user.substring(0, 2).toUpperCase()
    },
    action: activity.action,
    target: activity.description, // Mapping description to target
    time: activity.timestamp,
    icon: getActivityIcon(activity.type)
  }))

  const activityHtml = renderActivityList({
    title: 'Recent Activity',
    items: activityItems,
    maxHeight: '400px'
  })

  // Combine Layout
  const pageContent = `
    <div class="animate-fade-in">
      ${heroHtml}
      ${metricsHtml}
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
          ${analyticsPanel}
        </div>
        <div class="flex flex-col gap-6">
           <div class="card p-6 rounded-lg shadow-sm">
             <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
             ${actionsGrid}
           </div>
           <!-- You could add more widgets here -->
        </div>
      </div>

      ${activityHtml}
    </div>
  `

  const layoutData: AdminLayoutData = {
    title: 'Dashboard - CF-CMS',
    content: pageContent,
    user: data.user,
    version: data.version,
    dynamicMenuItems: data.dynamicMenuItems,
  }

  return renderAdminLayout(layoutData)
}

function getActivityIcon(type: string): string {
  switch (type) {
    case 'content':
      return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
    case 'media':
      return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
    case 'user':
      return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
    default:
      return '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
  }
}
