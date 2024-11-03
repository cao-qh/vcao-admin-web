// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 引入接口
import { reqLogin, reqPhoneLogin, reqInfo } from '@/api/user'

// 引入路由（常量路由）
import { constantRoute, asyncRoute } from '@/router/routes'
import router, { resetRouter } from '@/router'
import { deepCopy } from '@/utils/deepCopy'
import type { RouteRecordRaw } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'

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
  // 使用设置仓库
  const setting = useLayoutSettingStore()

  // 小仓库存储数据地方
  const token = ref(localStorage.getItem('TOKEN'))
  // const menuRoutes = ref<RouteRecordRaw[]>([])
  const username = ref('')
  // const buttons = ref<string[]>([])

  // 测试代码
  const menuRoutes = ref<RouteRecordRaw[]>(constantRoute)
  const buttons = ref<string[]>([
    'Btn.Protocol.Add',
    'Btn.Protocol.Update',
    'Btn.HomeSetting.Add',
    'Btn.HomeSetting.Update',
    'Btn.HomeSetting.Delete',
    'Btn.AdSetting.Add',
    'Btn.AdSetting.Update',
    'Swh.AdSetting.UpDown',
    'Btn.MemberOrder.Add',
    'Btn.MemberOrder.Update',
    'Swh.MemberOrder.UpDown',
    'Btn.VideoUnlock.Add',
    'Btn.VideoUnlock.Update',
    'Btn.CloudPlay.Add',
    'Btn.CloudPlay.UpdateParams',
    'Btn.Pay.UpdateParams',
    'Btn.Pay.Add',
    'Btn.UserManager.Add',
    'Btn.UserManager.Update',
    'Swh.UserManager.Enable',
    'Btn.UserManager.Permission',
    'Btn.MemberBuyOrder.Download',
    'Btn.VideoShowClass.Add',
    'Btn.VideoShowClass.Update',
    'Btn.VideoShowClass.Enable',
    'Btn.VideoShowClass.Delete',
    'Btn.VideoActor.Add',
    'Btn.VideoActor.Update',
    'Btn.VideoActor.Enable',
    'Btn.VideoLargeClass.Add',
    'Swh.VideoLargeClass.Enable',
    'Btn.VideoLargeClass.Update',
    'Btn.VideoSmallClass.Add',
    'Btn.VideoSmallClass.Update',
    'Swh.VideoSmallClass.Enable',
    'Btn.VideoCollection.Add',
    'Btn.VideoCollection.Update',
    'Btn.VideoCollection.Detail',
    'Btn.VideoCollection.UpDown',
    'Btn.VideoCollection.ConfigActor',
    'Btn.VideoCollection.ConfigClass',
    'Btn.VideoCollection.Chapter',
    'Btn.VideoCollection.Classify',
    'Btn.ViewScore.Delete',
    'Btn.ViewScore.Add',
    'Btn.ViewScore.Update',
    'Btn.AdScore.Add',
    'Btn.AdScore.Update',
    'Btn.AdScore.Delete',
  ])

  // 用户登录的方法
  const userLogin = async (data: any) => {
    const result: any = await reqLogin(data)
    // 登录请求：成功200->token
    // 登录请求：失败201->错误信息
    if (result.code == 0) {
      // pinia仓库存储一下token
      // 由于pinia|vuex存储数据其实利用js对象
      token.value = result.data.token as string
      // 本地存储持久化存储一份
      localStorage.setItem('TOKEN', token.value)

      // 能保证当前async函数返回一个成功的promise
      return 'ok'
    } else {
      return Promise.reject(new Error(result.msg))
    }
  }

  // 手机验证码登录
  const phoneLogin = async (data: any) => {
    const result: any = await reqPhoneLogin(data)
    if (result.code == 0) {
      // pinia仓库存储一下token
      // 由于pinia|vuex存储数据其实利用js对象
      token.value = result.data.token
      // 本地存储持久化存储一份
      localStorage.setItem('TOKEN', result.data.token)

      // 能保证当前async函数返回一个成功的promise
      return 'ok'
    } else {
      throw new Error(result.msg)
    }
  }

  // 获取用户信息方法
  const userInfo = async () => {
    // 管理员权限
    // 获取用户信息进行存储仓库当中
    const result: any = await reqInfo()
    // 如果获取用户信息成功，存储一下用户信息
    if (result.code == 0) {
      username.value = result.data.username
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
      return Promise.reject(new Error(result.msg))
    }
  }

  // 是否包含用户按钮
  const hasPermission = (button: string) => {
    return buttons.value.includes(button)
  }

  // 退出登录
  const userLogout = async () => {
    token.value = ''
    localStorage.removeItem('TOKEN')
    username.value = ''

    // 清除tabList
    setting.tabList = []

    // 重置路由
    resetRouter()

    router.push({
      path: '/user/login',
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
    phoneLogin,
    userInfo,
    userLogout,
    hasPermission,
  }
})

export default useUserStore
