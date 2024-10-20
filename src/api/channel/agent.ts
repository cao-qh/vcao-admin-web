import request, { obj2Query } from '@/utils/request'

enum API {
  // 查询记录
  search = '/tAdmin/agent/selectByAll',
  // 添加
  addUrl = '/tAdmin/agent/saveTAgent',
  // 修改
  updateUrl = '/tAdmin/agent/updateTAgent',
  // 启禁用
  qijinyongUrl = '/tAdmin/agent/updateTAgentQiJinYong',
  // 查询可配置产品
  searchProduct = '/tAdmin/agent/selectByTAgentGoods',
  // 配置产品
  configProduct = '/tAdmin/agent/peizhi',
  // 查询API
  searchApi = '/tAdmin/agent/selectByTAgentAPI',
  // 修改API
  updateApi = '/tAdmin/agent/updateByTAgentAPI',
}

// 查询代理列表
export const reqSearch = (data: any) =>
  request.post<any, any>(API.search, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqUpdate = (data: any) =>
  request.post<any, any>(API.updateUrl, obj2Query(data))

// 启禁用
export const reqQijinyong = (data: any) =>
  request.post<any, any>(API.qijinyongUrl, obj2Query(data))

// 查询可配置产品
export const reqSearchProduct = (data: any) =>
  request.post<any, any>(API.searchProduct, obj2Query(data))

// 配置产品
export const reqConfigProduct = (DLbianma: string, data: any) => {
  return request.post<any, any>(API.configProduct + `?bianma=${DLbianma}`, data)
}

// 查询API
export const reqSearchApi = (data: any) =>
  request.post<any, any>(API.searchApi, obj2Query(data))

// 修改API
export const reqUpdateApi = (data: any) =>
  request.post<any, any>(API.updateApi, obj2Query(data))
