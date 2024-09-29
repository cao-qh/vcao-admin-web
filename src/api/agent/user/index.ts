// 统一管理咱们项目用户相关的接口
import request from '@/utils/request'

// 统一管理接口
enum API {
  loginUrl = '/agent/login',
}
// 暴漏请求函数
// 登录接口方法
export const reqLogin = (data: any) =>
  request.post<any, any>(API.loginUrl, data)
