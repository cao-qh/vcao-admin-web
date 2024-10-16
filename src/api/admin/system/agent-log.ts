// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/tAdmin/tAgentLog/selectByAll',
}

// 获取省份
export const reqSearch = (data: any) =>
  request.post(API.searchUrl, obj2Query(data))
