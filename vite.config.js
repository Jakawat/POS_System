import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Configuration options for Vite build tool
export default defineConfig({
  plugins: [react()],
  base: '/POS_Deploy/',
})
