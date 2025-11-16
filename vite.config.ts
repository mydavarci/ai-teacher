import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-teacher/',
  server: {
    port: 3000,
    host: true
  }
})
