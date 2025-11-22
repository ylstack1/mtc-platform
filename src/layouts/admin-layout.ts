/**
 * Modern Dark Admin Layout
 * Uses core Catalyst layout with custom theme colors
 * Maintains exact functionality while allowing theme customization
 */

// Import the exact Catalyst layout function from core (using relative path)
// @ts-ignore - core available in monorepo
import { renderAdminLayoutCatalyst } from '../../../core/src/templates/layouts/admin-layout-catalyst.template'
import { getThemeCSS, getThemeScript } from '../theme'

export interface AdminLayoutData {
  title?: string
  content: string
  user?: {
    name: string
    email: string
    role: string
  }
  version?: string
  currentPath?: string
  dynamicMenuItems?: Array<{
    label: string
    path: string
    icon?: string
    isPlugin?: boolean
  }>
}

/**
 * Render admin layout using core Catalyst layout with theme customization
 * This ensures 100% compatibility with all core pages while allowing theme colors
 */
export function renderAdminLayout(data: AdminLayoutData & { _fullHtml?: string }): string {
  console.log('[TEMPLATE] Modern Dark template renderAdminLayout called')
  
  const themeStyles = `<style>${getThemeCSS()}</style>`
  const themeScript = `<script>${getThemeScript()}</script>`
  
  const injection = `${themeStyles}\n${themeScript}`
  
  // If full HTML is provided, inject CSS into it
  if (data._fullHtml) {
    console.log('[TEMPLATE] Injecting CSS into existing HTML')
    const fullHtml = data._fullHtml
    
    // Inject custom CSS and script after Tailwind script
    // We use the htmx script as an anchor point since it's known to exist in the core template
    const modifiedHtml = fullHtml.replace(
      '<script src="https://unpkg.com/htmx.org@2.0.3"></script>',
      `${injection}\n  <script src="https://unpkg.com/htmx.org@2.0.3"></script>`
    )
    
    console.log('[TEMPLATE] CSS injected successfully')
    return modifiedHtml
  }
  
  // Normal flow: render with core layout
  console.log('[TEMPLATE] Rendering with core layout')
  const dataWithTemplate = {
    ...data,
    templateName: 'Modern Dark',
    templateVersion: '1.0.0'
  }
  
  const coreLayout = renderAdminLayoutCatalyst(dataWithTemplate as any)
  
  // Inject custom CSS and script after Tailwind script
  const customizedLayout = coreLayout.replace(
    '<script src="https://unpkg.com/htmx.org@2.0.3"></script>',
    `${injection}\n  <script src="https://unpkg.com/htmx.org@2.0.3"></script>`
  )
  
  console.log('[TEMPLATE] CSS injected into core layout')
  return customizedLayout
}
