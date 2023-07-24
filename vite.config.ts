import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: '/',
    host: true,
    proxy: {
      //使用代理
      '/ef': {
        target: '', // 需要跨域代理的本地路径
        changeOrigin: true, //是否改变请求源头
      },
    },
  },
  build: {
    // build目录名称，默认为"dist"
    outDir: 'build',
    // 静态资源存放目录名称，默认为"assets"
    assetsDir: 'static',
  },
  plugins: [react()],
})
