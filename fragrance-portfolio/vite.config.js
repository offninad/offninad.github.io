import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the build works at any path (GitHub Pages subfolder included)
export default defineConfig({
  plugins: [react()],
  base: './',
})
