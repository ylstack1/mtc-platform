/**
 * Dual Theme Configuration
 * Supports both dark and light modes with shared typography and spacing
 */

export type ThemeMode = 'dark' | 'light'

export interface ThemePalette {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  background: string
  surface: string
  border: string
  text: string
  textSecondary: string
  success: string
  warning: string
  error: string
}

export interface ThemeConfig {
  palettes: {
    dark: ThemePalette
    light: ThemePalette
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  gradients: {
    primary: string
    surface: string
  }
  elevations: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  motion: {
    fast: string
    normal: string
    slow: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

const darkPalette: ThemePalette = {
  primary: '#3b82f6',      // Blue
  primaryDark: '#1e40af',  // Dark Blue
  secondary: '#8b5cf6',    // Purple
  accent: '#ec4899',       // Pink
  background: '#0f172a',   // Very Dark Blue
  surface: '#1e293b',      // Dark Slate
  border: '#334155',       // Slate
  text: '#f1f5f9',         // Light Slate
  textSecondary: '#cbd5e1',// Medium Slate
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Amber
  error: '#ef4444',        // Red
}

const lightPalette: ThemePalette = {
  primary: '#2563eb',      // Blue
  primaryDark: '#1e40af',  // Dark Blue
  secondary: '#7c3aed',    // Purple
  accent: '#db2777',       // Pink
  background: '#f8fafc',   // Off-white
  surface: '#ffffff',      // White
  border: '#e2e8f0',       // Light Slate
  text: '#0f172a',         // Dark Slate
  textSecondary: '#475569',// Medium Slate
  success: '#059669',      // Green
  warning: '#d97706',      // Amber
  error: '#dc2626',        // Red
}

export const modernDarkTheme: ThemeConfig = {
  palettes: {
    dark: darkPalette,
    light: lightPalette
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  gradients: {
    primary: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
    surface: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
  },
  elevations: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  motion: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

function generateCssVars(palette: ThemePalette): string {
  return `
    --color-primary: ${palette.primary};
    --color-primary-dark: ${palette.primaryDark};
    --color-secondary: ${palette.secondary};
    --color-accent: ${palette.accent};
    --color-background: ${palette.background};
    --color-surface: ${palette.surface};
    --color-border: ${palette.border};
    --color-text: ${palette.text};
    --color-text-secondary: ${palette.textSecondary};
    --color-success: ${palette.success};
    --color-warning: ${palette.warning};
    --color-error: ${palette.error};
  `
}

export function getThemeToggleHTML(): string {
  return `
    <div id="theme-controller" class="fixed bottom-6 right-6 z-50 flex items-center gap-2 print:hidden">
        <!-- Mobile Sidebar Toggle -->
        <button id="sidebar-toggle" class="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 active:scale-95 border border-white/10" aria-label="Toggle Sidebar">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>

        <!-- Theme Toggle -->
        <button id="theme-toggle" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:bg-white/20 hover:scale-110 active:scale-95 border border-white/10" aria-label="Toggle theme">
            <!-- Sun Icon -->
            <svg class="h-5 w-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon Icon -->
            <svg class="h-5 w-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        </button>
    </div>
  `
}

export function getThemeCSS(theme: ThemeConfig = modernDarkTheme): string {
  return `
    :root {
      /* Typography */
      --font-family: ${theme.typography.fontFamily};
      --font-size-xs: ${theme.typography.fontSize.xs};
      --font-size-sm: ${theme.typography.fontSize.sm};
      --font-size-base: ${theme.typography.fontSize.base};
      --font-size-lg: ${theme.typography.fontSize.lg};
      --font-size-xl: ${theme.typography.fontSize.xl};
      --font-size-2xl: ${theme.typography.fontSize['2xl']};
      
      /* Spacing */
      --spacing-xs: ${theme.spacing.xs};
      --spacing-sm: ${theme.spacing.sm};
      --spacing-md: ${theme.spacing.md};
      --spacing-lg: ${theme.spacing.lg};
      --spacing-xl: ${theme.spacing.xl};

      /* Gradients */
      --gradient-primary: ${theme.gradients.primary};
      --gradient-surface: ${theme.gradients.surface};
      --gradient-body: radial-gradient(circle at top right, var(--color-primary-dark), transparent 40%),
                       radial-gradient(circle at bottom left, var(--color-secondary), transparent 40%);

      /* Elevations */
      --elevation-sm: ${theme.elevations.sm};
      --elevation-md: ${theme.elevations.md};
      --elevation-lg: ${theme.elevations.lg};

      /* Motion */
      --motion-fast: ${theme.motion.fast};
      --motion-normal: ${theme.motion.normal};
      --motion-slow: ${theme.motion.slow};

      /* Default Palette (Dark) */
      ${generateCssVars(theme.palettes.dark)}
    }

    [data-theme="dark"] {
      ${generateCssVars(theme.palettes.dark)}
      --gradient-body: radial-gradient(circle at top right, rgba(30, 64, 175, 0.3), transparent 40%),
                       radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.2), transparent 40%);
    }

    [data-theme="light"] {
      ${generateCssVars(theme.palettes.light)}
      --gradient-surface: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0));
      --gradient-body: radial-gradient(circle at top right, rgba(37, 99, 235, 0.1), transparent 40%),
                       radial-gradient(circle at bottom left, rgba(124, 58, 237, 0.1), transparent 40%);
    }

    /* Map to Core Layout Variables */
    :root {
      --theme-primary: var(--color-primary);
      --theme-secondary: var(--color-secondary);
      --theme-accent: var(--color-accent);
    }

    /* Base Reset & Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-family: var(--font-family);
      font-size: var(--font-size-base);
      color: var(--color-text);
      background: var(--color-background);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background: var(--color-background);
      background-image: var(--gradient-body) !important;
      background-attachment: fixed !important;
      color: var(--color-text);
      line-height: 1.6;
      transition: background-color var(--motion-normal), color var(--motion-normal);
      min-height: 100vh;
    }

    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* View Transition */
    @view-transition {
      navigation: auto;
    }

    /* Mobile Sidebar & Responsive Shell */
    @media (max-width: 768px) {
      /* Hide Sidebar by default on mobile */
      .sidebar, nav[aria-label="Sidebar"] {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        height: 100vh !important;
        width: 80% !important;
        max-width: 300px !important;
        z-index: 60 !important;
        transform: translateX(-100%) !important;
        transition: transform var(--motion-normal) !important;
        box-shadow: var(--elevation-lg) !important;
        background: var(--color-surface) !important;
      }
      
      /* Show Sidebar when active */
      body.sidebar-open .sidebar, 
      body.sidebar-open nav[aria-label="Sidebar"] {
        transform: translateX(0) !important;
      }

      /* Overlay when sidebar is open */
      body.sidebar-open::before {
        content: '';
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(4px);
        z-index: 59;
        animation: fadeIn var(--motion-fast);
      }
    }

    /* Sticky Headers */
    header, .header {
      position: sticky !important;
      top: 0 !important;
      z-index: 50 !important;
      backdrop-filter: blur(12px) !important;
      background-color: rgba(var(--color-background), 0.8) !important;
      border-bottom: 1px solid var(--color-border) !important;
      transition: all var(--motion-normal) !important;
    }
    
    /* Glassmorphism Cards */
    .card, .bg-zinc-900, .dark\\:bg-zinc-900 {
       background: rgba(30, 41, 59, 0.7) !important;
       backdrop-filter: blur(12px) !important;
       border: 1px solid rgba(255,255,255,0.05) !important;
    }

    [data-theme="light"] .card,
    [data-theme="light"] .bg-zinc-900,
    [data-theme="light"] .dark\\:bg-zinc-900 {
       background: rgba(255, 255, 255, 0.7) !important;
       border: 1px solid rgba(0,0,0,0.05) !important;
    }

    /* Typography */
    h1 { font-size: var(--font-size-2xl); font-weight: 700; margin-bottom: var(--spacing-md); color: var(--color-text); }
    h2 { font-size: var(--font-size-xl); font-weight: 600; margin-bottom: var(--spacing-md); color: var(--color-text); }
    h3 { font-size: var(--font-size-lg); font-weight: 600; margin-bottom: var(--spacing-sm); color: var(--color-text); }
    p { margin-bottom: var(--spacing-md); color: var(--color-text-secondary); }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: 8px;
      font-weight: 500;
      font-size: var(--font-size-sm);
      border: none;
      cursor: pointer;
      transition: all var(--motion-fast);
      text-decoration: none;
    }

    .btn-primary {
      background: var(--color-primary);
      background-image: var(--gradient-primary);
      color: white;
      box-shadow: var(--elevation-sm);
    }

    .btn-primary:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--elevation-md);
    }

    .btn-secondary {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }

    .btn-secondary:hover {
      background: var(--color-border);
      border-color: var(--color-text-secondary);
    }

    /* Forms */
    input, textarea, select {
      width: 100%;
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      color: var(--color-text);
      font-family: inherit;
      font-size: inherit;
      transition: all var(--motion-fast);
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background: var(--color-background);
      color: var(--color-text-secondary);
      padding: var(--spacing-md);
      text-align: left;
      font-weight: 600;
      font-size: var(--font-size-sm);
      border-bottom: 1px solid var(--color-border);
    }

    td {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
      color: var(--color-text);
    }

    tr {
      transition: background-color var(--motion-fast);
    }

    tr:hover {
      background: var(--color-surface);
    }

    /* Layout */
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    .grid {
      display: grid;
      gap: var(--spacing-lg);
    }

    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
    .grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

    /* Responsive Grid Helpers */
    @media (max-width: ${theme.breakpoints.md}) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }

    /* Content Fade In */
    main, .content, .main-content {
      animation: fadeIn var(--motion-normal) forwards;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn var(--motion-normal) forwards;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    ::-webkit-scrollbar-track {
      background: var(--color-background);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--color-primary);
    }
  `
}

export function getThemeScript(): string {
  return `
    (function() {
      // Initialize theme immediately to prevent flash
      try {
        var saved = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = saved || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}

      // Initialize Controller when DOM is ready
      function initController() {
        // Theme Toggle
        var themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
          themeBtn.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', next);
            if (next === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            localStorage.setItem('theme', next);
          });
        }

        // Sidebar Toggle
        var sidebarBtn = document.getElementById('sidebar-toggle');
        if (sidebarBtn) {
          sidebarBtn.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-open');
          });
          
          // Close sidebar when clicking outside (overlay)
          document.body.addEventListener('click', function(e) {
            if (document.body.classList.contains('sidebar-open') && 
                !e.target.closest('nav[aria-label="Sidebar"]') && 
                !e.target.closest('.sidebar') &&
                !e.target.closest('#sidebar-toggle')) {
              document.body.classList.remove('sidebar-open');
            }
          });
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initController);
      } else {
        initController();
      }
    })();
  `
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

export { escapeHtml }
