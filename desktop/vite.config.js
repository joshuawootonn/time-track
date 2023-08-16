import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    // This is important for how assets are referenced in the electron packaged version
    base: './',
    build: {
      outDir: 'build',
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    plugins: [react()],
  }
})
