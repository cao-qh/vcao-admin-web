// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { message } from 'ant-design-vue'
import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'

// 第一步：利用axios对象的create方法，创建一个axios实例
const request = axios.create({
  // 基础路径 (基础路径上会携带/api)
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000, //超时的时间的设置
})
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }

  // 在发送请求之前开启PageLoading
  const settingStore = useSettingStore()
  settingStore.pageLoading = true

  // 返回配置对象
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 关闭PageLoading
    const settingStore = useSettingStore()
    settingStore.pageLoading = false

    if (
      response.data.data === -120 ||
      response.data.data === -130 ||
      response.data.data === -140 ||
      response.data.data === -150
    ) {
      const userStore = useUserStore()
      userStore.userLogout()
    }
    // 简化数据
    return response.data
  },
  (error) => {
    // 关闭PageLoading
    const settingStore = useSettingStore()
    settingStore.pageLoading = false
    // 失败回调：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let messageContent = ''
    const status = error.response.status
    switch (status) {
      case 401:
        messageContent = 'TOKEN过期'
        break
      case 403:
        messageContent = '无权访问'
        break
      case 404:
        messageContent = '请求资源不存在'
        break
      case 500:
        messageContent = '服务器内部错误'
        break
      default:
        messageContent = '网络出现问题'
        break
    }
    message.error(messageContent)
    return Promise.reject(error)
  },
)

// 对象转query字符串
export const obj2Query = function (obj: { [x: string]: any } = {}) {
  let query = ''
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = obj[key]
    if (!value && value !== '' && value !== 0) {
      continue
    }
    query += `${key}=${encodeURIComponent(obj[key])}&`
  }
  return query.slice(0, -1)
}

// 对外暴漏
export default request
