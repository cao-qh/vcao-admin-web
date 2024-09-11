// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'

// 引入路由（常量路由）
import { constantRoute, asyncRoute } from '@/router/routes'
import router from '@/router'
import { deepCopy } from '@/utils/deepCopy'
import type { RouteRecordRaw } from 'vue-router'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: string[]) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
const useUserStore: any = defineStore('user', () => {
  // 小仓库存储数据地方
  const token = ref(localStorage.getItem('TOKEN'))
  // const menuRoutes = ref<RouteRecordRaw[]>([])
  const menuRoutes = ref<RouteRecordRaw[]>(constantRoute)
  const username = ref('')
  const buttons = ref<string[]>([])

  // 用户登录的方法
  const userLogin = async (data: LoginForm) => {
    const result: LoginResponseData = await reqLogin(data)
    // 登录请求：成功200->token
    // 登录请求：失败201->错误信息
    if (result.code == 200) {
      // pinia仓库存储一下token
      // 由于pinia|vuex存储数据其实利用js对象
      token.value = result.data as string
      // 本地存储持久化存储一份
      localStorage.setItem('TOKEN', result.data as string)
      // 能保证当前async函数返回一个成功的promise
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }

  // 获取用户信息方法
  const userInfo = async () => {
    // 获取用户信息进行存储仓库当中
    const result: UserInfoResponseData = await reqUserInfo()
    // 如果获取用户信息成功，存储一下用户信息
    if (result.code == 200) {
      username.value = result.data.name
      buttons.value = result.data.buttons
      // 深拷贝asyncRoute
      const cloneAsyncRoute = deepCopy(asyncRoute)

      // 过滤异步路由
      const userAsyncRoute = filterAsyncRoute(
        cloneAsyncRoute,
        result.data.routes,
      )
      menuRoutes.value = [...constantRoute, ...userAsyncRoute]
      //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
      userAsyncRoute.forEach((route: any) => {
        router.addRoute(route)
      })
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  // 退出登录
  const userLogout = async () => {
    // const result: any = await reqLogout()
    // if (result.code == 200) {
    token.value = ''
    // username.value = ''
    localStorage.removeItem('TOKEN')
    //   return 'ok'
    // } else {
    //   return Promise.reject(new Error(result.message))
    // }

    router.push({
      path: '/login',
      query: {
        redirect: router.currentRoute.value.path,
      },
    })
  }

  return {
    token,
    menuRoutes,
    username,
    buttons,

    userLogin,
    userInfo,
    userLogout,
  }
})

export default useUserStore
