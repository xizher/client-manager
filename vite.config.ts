import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '~hooks': path.resolve(__dirname, 'src/hooks'),
      '~cp': path.resolve(__dirname, 'src/components'),
      '~services': path.resolve(__dirname, 'src/services'),
    }
  },
  plugins: [
    createVuePlugin()
  ]
})
