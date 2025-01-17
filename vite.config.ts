import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const entries = ['index', 'login', 'signup', 'board']

const input = Object.fromEntries(entries.map((name) => [name, `${name}.html`]))

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9500', // Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
