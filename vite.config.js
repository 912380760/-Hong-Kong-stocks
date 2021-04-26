import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';
const srcPath = path.resolve(__dirname, './src');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 反向代理
  server: {
    proxy: {
      '/fm': {
        target: 'https://www.xinguyufu.cn',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  }
})
