# Template Customization Examples

## Recommended Method: Using Theme Config

The standard way to customize the theme is by modifying the `ThemeConfig` object in `src/theme.ts` or by creating a new config object and passing it to `getThemeCSS`.

### Example 1: Corporate Blue Theme (Dual Mode)

This example shows how to configure both dark and light palettes for a corporate identity.

```typescript
import { modernDarkTheme, getThemeCSS, ThemeConfig } from '@ylstack-dev/cf-cms-template-modern-dark'

const corporateTheme: ThemeConfig = {
  ...modernDarkTheme,
  palettes: {
    dark: {
      ...modernDarkTheme.palettes.dark,
      primary: '#0066cc',
      primaryDark: '#004c99',
      secondary: '#00ccff',
      background: '#001f3f',
      surface: '#003366',
    },
    light: {
      ...modernDarkTheme.palettes.light,
      primary: '#0055aa',
      primaryDark: '#003366',
      secondary: '#00aaff',
      background: '#f0f4f8',
      surface: '#ffffff',
    }
  },
  gradients: {
    ...modernDarkTheme.gradients,
    primary: 'linear-gradient(135deg, #0066cc, #00ccff)',
  }
}

export function getCustomThemeCSS() {
  return getThemeCSS(corporateTheme)
}
```

## Advanced Method: Raw CSS Injection

For more specific overrides that go beyond the token system, you can inject raw CSS. Note that you should use the new CSS variables and handle both theme modes.

### Example 2: Custom Glassmorphism

Override the default card styles to have a stronger glass effect.

```typescript
const customThemeCSS = `
  <style>
    /* Stronger Glass Effect */
    :root {
      --glass-opacity: 0.8;
      --glass-blur: 20px;
    }

    .card {
      background: rgba(30, 41, 59, var(--glass-opacity)) !important;
      backdrop-filter: blur(var(--glass-blur)) !important;
      border: 1px solid rgba(255,255,255,0.1) !important;
    }

    [data-theme="light"] .card {
      background: rgba(255, 255, 255, var(--glass-opacity)) !important;
      border: 1px solid rgba(0,0,0,0.05) !important;
    }
  </style>
`
```

### Example 3: Hide Specific Menu Items

This remains largely the same, as it targets elements by attributes.

```typescript
const customThemeCSS = `
  <style>
    /* Hide Community Plugins */
    a[href="/admin/community-plugins"] {
      display: none !important;
    }
    
    /* Hide Settings */
    a[href="/admin/settings"] {
      display: none !important;
    }
  </style>
`
```

### Example 4: Animated Gradient Background

You can override the `--gradient-body` variable to add animation.

```typescript
const customThemeCSS = `
  <style>
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    :root {
      --gradient-body: linear-gradient(270deg, #0c4a6e, #075985, #0369a1);
    }

    body {
      background-size: 600% 600% !important;
      animation: gradientShift 15s ease infinite !important;
    }
  </style>
`
```

### Example 5: Custom Branding in Sidebar

Customize the logo text using pseudo-elements.

```typescript
const customThemeCSS = `
  <style>
    /* Replace logo text */
    .sidebar-logo-text {
      visibility: hidden;
      position: relative;
    }
    
    .sidebar-logo-text::after {
      content: "My Company CMS";
      visibility: visible;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text);
    }
  </style>
`
```

### Example 6: High Contrast Accessibility Theme

Force high contrast colors regardless of theme mode for accessibility.

```typescript
const customThemeCSS = `
  <style>
    /* High Contrast Overrides */
    :root {
      --color-background: #000000 !important;
      --color-surface: #000000 !important;
      --color-text: #ffffff !important;
      --color-primary: #ffff00 !important;
      --color-secondary: #00ffff !important;
      --color-border: #ffffff !important;
    }
    
    [data-theme="light"] {
      --color-background: #ffffff !important;
      --color-surface: #ffffff !important;
      --color-text: #000000 !important;
      --color-primary: #0000cc !important;
      --color-border: #000000 !important;
    }
    
    .card {
      border: 2px solid var(--color-border) !important;
      background: var(--color-background) !important;
    }
  </style>
`
```

## Testing Your Customizations

After making changes:

1. **Build template**: `cd packages/template-modern-dark && npm run build`
2. **Restart dev server**: `npm run dev`
3. **Toggle Themes**: Use the sun/moon icon to switch between light and dark modes.
4. **Test Responsive**: Check mobile sidebar and grid layouts.
5. **Verify Contrast**: Ensure text is readable in both modes.

## Tips

- **Use Variables**: Always rely on `var(--color-...)` variables when writing custom CSS. This ensures your overrides respect the theme toggle.
- **Inspect Elements**: Use browser DevTools to see which variables are being applied.
- **Scope Styles**: If you only want to affect a specific page, try to scope your CSS selectors (e.g., `.page-dashboard .card`).
