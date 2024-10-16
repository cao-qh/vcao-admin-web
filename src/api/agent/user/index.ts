// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 登录
  loginUrl = '/tAgent/cunliang/login',
  // 用户信息
  infoUrl = '/tAgent/selectByMy',
}
// 暴漏请求函数
// 登录接口方法
export const reqLogin = (data: any) =>
  request.post<any, any>(API.loginUrl, obj2Query(data))

// 用户信息接口方法
export const reqInfo = () => request.post<any, any>(API.infoUrl)
