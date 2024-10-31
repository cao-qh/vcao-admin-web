// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 登录
  loginUrl = '/pc/tYonghu/login',
  // 手机验证码登录
  phoneLoginUrl = '/pc/yonghu/loginPhone',
  // 手机登录获取验证码
  phoneCodeUrl = '/pc/yonghu/getYanZhengMa',
  // 用户信息
  infoUrl = '/info',
  // 退出登录
  logoutUrl = '/tAdmin/cunliang/tuiChu',
}

// 登录接口方法
export const reqLogin = (data: any) =>
  request.post<any, any>(API.loginUrl, obj2Query(data))

// 手机验证码登录
export const reqPhoneLogin = (data: any) =>
  request.post<any, any>(API.phoneLoginUrl, obj2Query(data))

// 手机登录获取验证码
export const reqPhoneCode = (data: any) =>
  request.post<any, any>(API.phoneCodeUrl, obj2Query(data))

// 用户信息接口方法
export const reqInfo = () => request.post<any, any>(API.infoUrl)

// 退出登录接口方法
export const reqLogout = () => request.post<any, any>(API.logoutUrl)
