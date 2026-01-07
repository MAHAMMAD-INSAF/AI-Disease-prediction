


import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // Proxy `/api` calls to backend during development
    proxy: {
      '/api': {
        target: 'https://ai-disease-prediction-7711.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: '',
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['react.svg'],
    },
  },
  optimizeDeps: {
    exclude: ['react.svg'],
  },
})

