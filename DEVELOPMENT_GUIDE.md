# CF-CMS Template Development Guide

## Overview

This guide explains how to customize the CF-CMS admin panel frontend using the Dual Theme template system. The architecture isolates the frontend from backend logic, allowing you to completely restyle the admin interface without risk of breaking core functionality.

## ✅ What You CAN Customize

### Frontend Only (Safe to Change)
- ✅ **Theme Palettes** - Dark and light mode colors
- ✅ **Gradients** - Background and interactive element gradients
- ✅ **Layout Utilities** - Responsive grids, spacing, and container widths
- ✅ **Components** - Add or modify UI components (charts, stats, lists)
- ✅ **Styling** - Global CSS variables and glassmorphism effects
- ✅ **Branding** - Logos, watermarks, and footer text

### Backend (DO NOT Change)
- ❌ **Routes** - API endpoints, route handlers
- ❌ **Data Structure** - Database schema, data models
- ❌ **Business Logic** - Authentication, permissions, validation
- ❌ **Functionality** - CRUD operations, file uploads

## 📁 Template Structure

```
packages/template-modern-dark/
├── src/
│   ├── layouts/
│   │   └── admin-layout.ts          # Main layout wrapper
│   ├── pages/
│   │   └── admin-dashboard.ts       # Dashboard composition
│   ├── components/                  # UI Components
│   │   ├── actions.ts               # Quick actions grid
│   │   ├── activity.ts              # Activity feed
│   │   ├── analytics.ts             # Charts and graphs
│   │   ├── metrics.ts               # Key metrics stats
│   │   └── logo.template.ts         # Branding
│   ├── theme.ts                     # Dual-theme configuration & CSS generation
│   └── index.ts                     # Package exports
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## 🎨 How Templates Work

### 1. Template is Loaded
```typescript
// starter-app/src/index.ts
import * as template from '@ylstack-dev/cf-cms-template-modern-dark'

const bindings = {
  TEMPLATE_PROVIDER: template  // ← Template loaded here
}
```

### 2. Middleware Intercepts Pages
The core CMS middleware checks for a `TEMPLATE_PROVIDER` and delegates rendering to it.

### 3. Template Injects Custom CSS & JS
The layout function injects the CSS generated from `theme.ts` and the theme toggle logic.

```typescript
// packages/template-modern-dark/src/layouts/admin-layout.ts
export function renderAdminLayout(data: AdminLayoutData & { _fullHtml?: string }): string {
  // Uses getThemeCSS() from theme.ts to generate CSS variables
  const css = getThemeCSS()
  
  // Injects CSS and theme toggle script into the HTML
  // ...
}
```

## 🎯 Customization Guide

### Configuring the Dual Theme

The `theme.ts` file exports a `ThemeConfig` object that controls both dark and light modes.

```typescript
// src/theme.ts
export const modernDarkTheme: ThemeConfig = {
  palettes: {
    dark: {
      primary: '#3b82f6',
      background: '#0f172a',
      // ...
    },
    light: {
      primary: '#2563eb',
      background: '#f8fafc',
      // ...
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
    surface: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
  },
  // ... typography, spacing, elevations
}
```

### Customizing Gradients

Gradients are defined as CSS variables that can reference palette colors.

- **Primary Gradient**: Used on buttons and active states.
- **Body Gradient**: An ambient background gradient (radial) that shifts slightly.
- **Surface Gradient**: Used on glassmorphism cards.

```typescript
gradients: {
  primary: 'linear-gradient(to right, #ff00cc, #333399)',
  // ...
}
```

### Responsive Layout Utilities

The theme includes a grid system that adapts to screen sizes.

- `.grid-2`: 2 columns on desktop, 1 on mobile.
- `.grid-3`: 3 columns on desktop, 1 on mobile.
- `.grid-4`: 4 columns on desktop, 1 on mobile.

Use these classes in your custom pages or extended components.

```html
<div class="grid grid-3">
  <div class="card p-6">Stat 1</div>
  <div class="card p-6">Stat 2</div>
  <div class="card p-6">Stat 3</div>
</div>
```

### Composing the Dashboard

The dashboard is built by composing smaller components found in `src/components/`. You can rearrange these or add your own in `src/pages/admin-dashboard.ts`.

```typescript
// src/pages/admin-dashboard.ts
export function renderDashboard(data: any): string {
  return `
    <div class="container mx-auto py-8">
      ${renderMetrics(data)}
      <div class="grid grid-2 mt-8">
        ${renderAnalytics(data)}
        ${renderActivity(data)}
      </div>
    </div>
  `
}
```

## 🔧 Development Workflow

### 1. Make Changes
Edit files in `packages/template-modern-dark/src/`

### 2. Build Template
```bash
cd packages/template-modern-dark
npm run build
```

### 3. Rebuild Core (if needed)
```bash
npm run build:core
```

### 4. Test Changes
```bash
npm run dev
```

Visit `http://localhost:8787/admin` to see changes. Toggle between dark and light modes to ensure your changes work in both contexts.

## 📋 CSS Variable Reference

The theme generates CSS variables mapped to the current mode (dark/light).

### Colors
- `--color-primary`
- `--color-background`
- `--color-surface`
- `--color-text`
- `--color-border`

### Gradients
- `--gradient-primary`
- `--gradient-body`
- `--gradient-surface`

### Spacing & Typography
- `--spacing-md` (16px)
- `--font-size-base` (16px)
- `--font-family`

## ⚠️ Important Rules

### DO's ✅
1. **Use CSS Variables** - Instead of hardcoded hex values, use `var(--color-primary)` so your styles adapt to theme changes.
2. **Test Both Modes** - Always check your changes in both light and dark modes.
3. **Use Grid Classes** - Utilize `.grid-2`, `.grid-3` for consistent responsive layouts.
4. **Keep Backend Intact** - Only modify CSS and template strings.

### DON'Ts ❌
1. **Don't Hardcode Colors** - Avoid `color: #000` unless you want it to be black in both themes.
2. **Don't Break Mobile** - Always test sidebar behavior on small screens.
3. **Don't Remove `.card` Class** - It handles glassmorphism and borders for you.

## 🐛 Troubleshooting

### Theme Not Switching
**Check:**
1. Is the `theme-controller` ID present in the DOM?
2. Are there any JS errors in the console preventing the toggle script from running?
3. Is `localStorage` available?

### Styles Not Applying
**Check:**
1. Did you run `npm run build` after changes?
2. Are you using `!important` if you are trying to override Tailwind utility classes directly?
3. Hard refresh browser (Ctrl+Shift+R).
