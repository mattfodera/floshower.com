import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom', 'react-modal', 'react-scroll', 'react-intersection-observer'],
          'framer': ['framer-motion']
        }
      },
      external: [/three-stdlib\/libs\/lottie/]
    }
  }
})