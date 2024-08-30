import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
// import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
export default defineConfig(() => {
  // 获取各种环境下的对应的变量
  // const env = loadEnv(mode, process.cwd())
  return {
    // 插件
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    // 解析
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 构建
    build: {
      rollupOptions: {
        output: {
          // 手动分割包
          manualChunks(id: string) {
            if (id.includes('@ant-design/icons-vue')) {
              return '@ant-design/icons-vue'
            }
            if (id.includes('ant-design-vue')) {
              return 'ant-design-vue'
            }
            if (id.includes('echarts')) {
              return 'echarts'
            }
            if (id.includes('@tsparticles')) {
              return '@tsparticles'
            }
            if (id.includes('nprogress')) {
              return 'nprogress'
            }
            if (id.includes('vue-router')) {
              return 'vue-router'
            }
          },
        },
      },
    },
    // 代理跨域
    server: {
      port: 5174,
      // proxy: {
      //   [env.VITE_APP_BASE_API]: {
      //     // 获取数据的服务器地址设置
      //     target: env.VITE_SERVE,
      //     // 需要代理跨域
      //     changeOrigin: true,
      //     // 路径重写
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  }
})
