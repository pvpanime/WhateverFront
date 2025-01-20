import { defineConfig, SassPreprocessorOptions } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const entries = ['index', 'login', 'signup']

const input = Object.fromEntries(entries.map((name) => [name, `${name}.html`]))

const scss: SassPreprocessorOptions = {
  silenceDeprecations: [
    'mixed-decls',
    'color-functions',
    'global-builtin',
    'import',
  ],
}

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
  resolve: {
    alias: {
      // src/styles를 간단히 import하기 위한 alias
      '@styles': resolve(import.meta.dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss,
      sass: scss,
    },
  },
})
