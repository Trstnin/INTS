import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled'],
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
