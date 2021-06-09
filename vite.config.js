import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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
      },
      '/djapi': {
        target: 'https://danjuanapp.com',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    // 打包输出地址
    outDir: 'docs',
  },
  // 静态资源服务
  base: '/-Hong-Kong-stocks/'
})
