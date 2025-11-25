# Dual Theme Template for CF-CMS

A production-ready, dual-theme (dark/light) template package for CF-CMS with beautiful UI, responsive design, and customizable colors.

## Features

✨ **Dual Theme System**
- Seamless Dark/Light mode switching
- Shared typography and spacing tokens
- Automatic preference detection
- Persisted user preference

🎨 **Modern Design & Gradients**
- Gradient-rich tokens for primary actions and surfaces
- Glassmorphism effects on cards and overlays
- Smooth animations and transitions
- Professional, accessible color palettes

📱 **Responsive Layouts**
- Mobile-first sidebar and navigation
- Adaptive grids (2-col, 3-col, 4-col)
- Touch-friendly interactions
- Responsive data tables

⚡ **Performance**
- Zero-runtime-overhead CSS generation
- Optimized SVG icons
- No external client-side dependencies
- Fast rendering on Edge

## Installation

```bash
npm install @ylstack-dev/cf-cms-template-modern-dark
```

## Usage

### In starter-app

1. **Update `starter-app/package.json`**:

```json
{
  "dependencies": {
    "@ylstack-dev/cf-cms-template-modern-dark": "^1.0.0"
  }
}
```

2. **Update `starter-app/src/index.ts`**:

```typescript
import { createCfCmsApp } from '@ylstack-dev/cf-cms-core'
import * as template from '@ylstack-dev/cf-cms-template-modern-dark'

const app = createCfCmsApp({
  templates: template
})

export default app
```

3. **Build and run**:

```bash
npm install
npm run build
npm run dev
```

## Customization

### Change Colors & Gradients

Create a custom theme by modifying `theme.ts` or extending the configuration:

```typescript
import { modernDarkTheme, getThemeCSS, ThemeConfig } from '@ylstack-dev/cf-cms-template-modern-dark'

const customTheme: ThemeConfig = {
  ...modernDarkTheme,
  palettes: {
    ...modernDarkTheme.palettes,
    dark: {
      ...modernDarkTheme.palettes.dark,
      primary: '#ff6b6b',      // Custom primary color
      background: '#1a1a2e',   // Custom background
    },
    light: {
      ...modernDarkTheme.palettes.light,
      primary: '#ff4757',
    }
  },
  gradients: {
    ...modernDarkTheme.gradients,
    primary: 'linear-gradient(135deg, #ff6b6b, #ff4757)',
  }
}

export function getCustomThemeCSS() {
  return getThemeCSS(customTheme)
}
```

### Extend Templates

Create new templates by extending existing ones. The dashboard pieces are modular:

```typescript
import { renderAdminLayout, AdminLayoutData } from '@ylstack-dev/cf-cms-template-modern-dark'

export function renderCustomPage(data: any): string {
  const pageContent = `
    <div class="grid grid-2">
      <div class="card p-6">
         <h2>My Analytics</h2>
         <!-- Your content -->
      </div>
    </div>
  `

  return renderAdminLayout({
    title: 'Custom Page',
    content: pageContent,
    user: data.user,
    version: data.version,
  })
}
```

## Token System

### Palettes (Dark & Light)

| Token | Description |
|-------|-------------|
| `primary` | Main brand color (Buttons, Links) |
| `primaryDark` | Darker shade for interactions |
| `secondary` | Accent color for gradients/highlights |
| `surface` | Card/Panel background color |
| `background` | Page background color |
| `text` | Primary text color |
| `textSecondary` | Muted text color |

### Gradients

- `--gradient-primary`: Used for primary buttons and active states.
- `--gradient-body`: Ambient background gradient for the page.
- `--gradient-surface`: Subtle gradient for cards (light mode).

## Typography

- **Font Family**: System fonts (Apple, Segoe UI, Roboto, etc.)
- **Base Size**: 16px
- **Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
