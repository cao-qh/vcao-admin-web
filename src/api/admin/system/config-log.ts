import request, { obj2Query } from '@/utils/request'

// 产品-代理配置日志
enum API {
  // 查询
  searchUrl = '/tAdmin/TAgentGoodsLog/selectByAll',
}

// 获取省份
export const reqSearch = (data: any) =>
  request.post(API.searchUrl, obj2Query(data))
