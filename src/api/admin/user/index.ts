// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 登录
  loginUrl = '/tAdmin/cunliang/login',
  // 用户信息
  infoUrl = '/tAdmin/tQuanxian/LoginAdminQuanXian',
  // 退出登录
  logoutUrl = '/tAdmin/cunliang/tuiChu',
}
// 暴漏请求函数
// 登录接口方法
export const reqLogin = (data: any) =>
  request.post<any, any>(API.loginUrl, obj2Query(data))

// 用户信息接口方法
export const reqInfo = () => request.post<any, any>(API.infoUrl)

// 退出登录接口方法
export const reqLogout = () => request.post<any, any>(API.logoutUrl)
