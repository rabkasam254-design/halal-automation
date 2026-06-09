import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // меняем на '/<repo-name>/' если деплоим в подпапку GitHub Pages
  build: {
    outDir: '../docs',  // GitHub Pages читает из /docs ветки main
    emptyOutDir: true,
  },
})
