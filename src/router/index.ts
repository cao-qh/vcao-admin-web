// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'

const create = () =>
  createRouter({
    history: createWebHistory(`/${import.meta.env.VITE_APP_BASE_URL}/`),
    routes: constantRoute,
    // 滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })

// 创建路由器
let router = create()

// 重置路由
export function resetRouter() {
  router = create()
}

export default router
