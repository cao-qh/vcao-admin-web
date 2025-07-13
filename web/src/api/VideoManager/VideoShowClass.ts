// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tShipinZhanshiLeibie/selectByAll',
  // 启禁用
  enableUrl = '/pc/tShipinZhanshiLeibie/updateQiJinYong',
  // 删除
  deleteUrl = '/pc/tShipinZhanshiLeibie/deleteShipinZhanshiLeibie',
  // 添加
  addUrl = '/pc/tShipinZhanshiLeibie/saveShipinZhanshiLeibie',
  // 修改
  editUrl = '/pc/tShipinZhanshiLeibie/updateShipinZhanshiLeibie',
  // 配置查询
  configSearchUrl = '/pc/tShipinZhanshiLeibie/selectBypeizhi',
  // 配置
  configUrl = '/pc/tShipinZhanshiLeibie/peizhi',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 启禁用
export const reqEnable = (data: any) =>
  request.post<any, any>(API.enableUrl, obj2Query(data))

// 删除
export const reqDelete = (id: any) =>
  request.post<any, any>(API.deleteUrl, obj2Query({ id }))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))

// 配置查询
export const reqConfigSearch = (data: any) =>
  request.post<any, any>(API.configSearchUrl, obj2Query(data))

// 配置
export const reqConfig = (bianma: string, data: any) =>
  request.post<any, any>(API.configUrl + `?bianma=${bianma}`, data)
