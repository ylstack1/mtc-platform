import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ylstack-dev/cf-cms-template-modern-dark': path.resolve(__dirname, '../../packages/template/src/theme.ts')
    }
  }
})
