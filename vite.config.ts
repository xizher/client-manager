import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8080,
    proxy: {
      '/api': {
        // target: 'https://wuxizhe.fun/api',
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    },
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
    createVuePlugin(),
    viteCompression(),
  ]
})
