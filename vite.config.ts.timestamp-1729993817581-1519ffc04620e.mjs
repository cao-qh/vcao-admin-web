// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig, loadEnv } from "file:///E:/svn/%E5%89%8D%E7%AB%AF%E6%96%B0/%E4%B8%89%E5%86%9C%E5%AE%9E%E7%89%A9%E9%83%A8/%E7%9F%AD%E5%89%A7/short-play-admin/node_modules/.pnpm/vite@5.4.8_@types+node@20.16.9_sass@1.79.3/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/svn/%E5%89%8D%E7%AB%AF%E6%96%B0/%E4%B8%89%E5%86%9C%E5%AE%9E%E7%89%A9%E9%83%A8/%E7%9F%AD%E5%89%A7/short-play-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.8_@types+node@20.16.9_sass@1.79.3__vue@3.5.9_typescript@5.3.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/svn/%E5%89%8D%E7%AB%AF%E6%96%B0/%E4%B8%89%E5%86%9C%E5%AE%9E%E7%89%A9%E9%83%A8/%E7%9F%AD%E5%89%A7/short-play-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.8_@types+node@20.16.9_sass@1.79.3_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///E:/svn/%E5%89%8D%E7%AB%AF%E6%96%B0/%E4%B8%89%E5%86%9C%E5%AE%9E%E7%89%A9%E9%83%A8/%E7%9F%AD%E5%89%A7/short-play-admin/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.24.0_mockjs@1.1.0_vite@5.4.8_@types+node@20.16.9_sass@1.79.3_/node_modules/vite-plugin-mock/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/svn/%E5%89%8D%E7%AB%AF%E6%96%B0/%E4%B8%89%E5%86%9C%E5%AE%9E%E7%89%A9%E9%83%A8/%E7%9F%AD%E5%89%A7/short-play-admin/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: `/${env.VITE_APP_BASE_URL}/`,
    // 插件
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        mockPath: "mock",
        enable: true
      })
    ],
    // 解析
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    // scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    },
    // 构建
    build: {
      outDir: env.VITE_APP_BASE_URL,
      rollupOptions: {
        output: {
          // 手动分割包
          manualChunks(id) {
            if (id.includes("@ant-design/icons-vue")) {
              return "@ant-design/icons-vue";
            }
            if (id.includes("ant-design-vue")) {
              return "ant-design-vue";
            }
            if (id.includes("echarts")) {
              return "echarts";
            }
            if (id.includes("@tsparticles")) {
              return "@tsparticles";
            }
            if (id.includes("nprogress")) {
              return "nprogress";
            }
            if (id.includes("vue-router")) {
              return "vue-router";
            }
          }
        }
      }
    },
    // 代理跨域
    server: {
      port: 5177,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxzdm5cXFxcXHU1MjREXHU3QUVGXHU2NUIwXFxcXFx1NEUwOVx1NTE5Q1x1NUI5RVx1NzI2OVx1OTBFOFxcXFxcdTc3RURcdTUyNjdcXFxcc2hvcnQtcGxheS1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcc3ZuXFxcXFx1NTI0RFx1N0FFRlx1NjVCMFxcXFxcdTRFMDlcdTUxOUNcdTVCOUVcdTcyNjlcdTkwRThcXFxcXHU3N0VEXHU1MjY3XFxcXHNob3J0LXBsYXktYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L3N2bi8lRTUlODklOEQlRTclQUIlQUYlRTYlOTYlQjAvJUU0JUI4JTg5JUU1JTg2JTlDJUU1JUFFJTlFJUU3JTg5JUE5JUU5JTgzJUE4LyVFNyU5RiVBRCVFNSU4OSVBNy9zaG9ydC1wbGF5LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbi8vIG1vY2tcdTYzRDJcdTRFRjZcdTYzRDBcdTRGOUJcdTY1QjlcdTZDRDVcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgLy8gXHU4M0I3XHU1M0Q2XHU1NDA0XHU3OUNEXHU3M0FGXHU1ODgzXHU0RTBCXHU3Njg0XHU1QkY5XHU1RTk0XHU3Njg0XHU1M0Q4XHU5MUNGXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBgLyR7ZW52LlZJVEVfQVBQX0JBU0VfVVJMfS9gLFxyXG4gICAgLy8gXHU2M0QyXHU0RUY2XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgLy8gU3BlY2lmeSB0aGUgaWNvbiBmb2xkZXIgdG8gYmUgY2FjaGVkXHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgICAgfSksXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXHJcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICAvLyBcdTg5RTNcdTY3OTBcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBzY3NzXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU0RTAwXHU0RTJBXHU5MTREXHU3RjZFXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFwaTogJ21vZGVybi1jb21waWxlcicsXHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIkAvc3R5bGVzL3ZhcmlhYmxlLnNjc3NcIjsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBvdXREaXI6IGVudi5WSVRFX0FQUF9CQVNFX1VSTCxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgLy8gXHU2MjRCXHU1MkE4XHU1MjA2XHU1MjcyXHU1MzA1XHJcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQ6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0BhbnQtZGVzaWduL2ljb25zLXZ1ZScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdAYW50LWRlc2lnbi9pY29ucy12dWUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdhbnQtZGVzaWduLXZ1ZScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdhbnQtZGVzaWduLXZ1ZSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2VjaGFydHMnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnZWNoYXJ0cydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0B0c3BhcnRpY2xlcycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdAdHNwYXJ0aWNsZXMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCducHJvZ3Jlc3MnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnbnByb2dyZXNzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygndnVlLXJvdXRlcicpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICd2dWUtcm91dGVyJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogNTE3NyxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAgICAgLy8gXHU4M0I3XHU1M0Q2XHU2NTcwXHU2MzZFXHU3Njg0XHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHU4QkJFXHU3RjZFXHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX1NFUlZFLFxyXG4gICAgICAgICAgLy8gXHU5NzAwXHU4OTgxXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAvLyBcdThERUZcdTVGODRcdTkxQ0RcdTUxOTlcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBYLFNBQVMsZUFBZSxXQUFXO0FBQzdaLE9BQU8sVUFBVTtBQUVqQixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFFckMsU0FBUyxxQkFBcUI7QUFQNkosSUFBTSwyQ0FBMkM7QUFVNU8sSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxTQUFPO0FBQUEsSUFDTCxNQUFNLElBQUksSUFBSSxpQkFBaUI7QUFBQTtBQUFBLElBRS9CLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLHFCQUFxQjtBQUFBO0FBQUEsUUFFbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsUUFFMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osS0FBSztBQUFBLFVBQ0wsbUJBQW1CO0FBQUEsVUFDbkIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxRQUFRLElBQUk7QUFBQSxNQUNaLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQTtBQUFBLFVBRU4sYUFBYSxJQUFZO0FBQ3ZCLGdCQUFJLEdBQUcsU0FBUyx1QkFBdUIsR0FBRztBQUN4QyxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsZ0JBQWdCLEdBQUc7QUFDakMscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLFNBQVMsR0FBRztBQUMxQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDNUIscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLFlBQVksR0FBRztBQUM3QixxQkFBTztBQUFBLFlBQ1Q7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBO0FBQUEsVUFFdkIsUUFBUSxJQUFJO0FBQUE7QUFBQSxVQUVaLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDOUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
