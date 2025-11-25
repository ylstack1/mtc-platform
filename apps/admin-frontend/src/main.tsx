import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { getThemeCSS, modernDarkTheme } from '@ylstack-dev/cf-cms-template-modern-dark'

// Inject theme CSS
const style = document.createElement('style')
style.textContent = getThemeCSS(modernDarkTheme)
document.head.appendChild(style)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
