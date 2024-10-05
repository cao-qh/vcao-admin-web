import request, { obj2Query } from '@/utils/request'

enum API {
  // 查询记录
  search = '/tAdmin/agent/selectByAll',
  // 添加
  addUrl = '/tAdmin/agent/saveTAgent',
  // 修改
  updateUrl = '/tAdmin/agent/updateTAgent',
  // 查询可配置产品
  searchProduct = '/tAdmin/agent/selectByTAgentGoods',
  // 配置产品上下架
  configProductStatus = '/tAdmin/agent/updateTAdminTAgentGoods',
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

// 查询可配置产品
export const reqSearchProduct = (data: any) =>
  request.post<any, any>(API.searchProduct, obj2Query(data))

// 配置产品上下架
export const reqConfigProductStatus = (data: any) =>
  request.post<any, any>(API.configProductStatus, obj2Query(data))
