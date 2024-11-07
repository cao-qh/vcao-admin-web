// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 用户日志查询
  searchUserLogUrl = '/pc/riZhiGuanLi/getAll',
}

// 查用户日志查询
export const reqSearchUserLog = (data: any) =>
  request.post<any, any>(API.searchUserLogUrl, obj2Query(data))
