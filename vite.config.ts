import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8080
  },
  plugins: [
    createVuePlugin()
  ]
})
