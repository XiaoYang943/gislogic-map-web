import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Pages from 'vite-plugin-pages'
import cesium from 'vite-plugin-cesium';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Pages({
        dirs: [{ dir: 'src/pages', baseRoute: '' }],
      }),
      cesium()
  ],
  resolve:{
    alias: {
      '@': resolve(__dirname, './src')
    },
  }
})
