import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  proxy: {
      // Toute requête commençant par /api sera redirigée
      '/api': {
        target: 'http://localhost:3000', // L'adresse de ton backend
        changeOrigin: true,
      },
    },
})