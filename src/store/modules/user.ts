// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 引入接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { LoginForm, LoginResponseData } from '@/api/user/type'

// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
// import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

// 创建用户小仓库
const useUserStore: any = defineStore('user', () => {
  // 小仓库存储数据地方
  const token = ref(localStorage.getItem('TOKEN'))
  // const menuRoutes = ref<RouteRecordRaw[]>([])
  const menuRoutes = ref<RouteRecordRaw[]>(constantRoute)
  const username = ref(localStorage.getItem('USERNAME'))
  const buttons = ref<string[]>([])

  // 用户登录的方法
  const userLogin = async (data: LoginForm) => {
    const result: LoginResponseData = await reqLogin(data)
    // 登录请求：成功200->token
    // 登录请求：失败201->错误信息
    if (result.code == 200) {
      // pinia仓库存储一下token
      // 由于pinia|vuex存储数据其实利用js对象
      token.value = result.data.token
      username.value = data.username
      // 本地存储持久化存储一份
      localStorage.setItem('TOKEN', result.data.token)
      localStorage.setItem('USERNAME', data.username)
      // 能保证当前async函数返回一个成功的promise
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
  }

  return {
    token,
    menuRoutes,
    username,
    buttons,

    userLogin,
    userLogout,
  }
})

export default useUserStore
