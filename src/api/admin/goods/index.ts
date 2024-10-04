// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询套餐
  selectGoods = '/tAdmin/tGoods/selectByAll',
  // 添加
  addUrl = '/tAdmin/tGoods/saveTGoods',
  // 修改
  editUrl = '/tGoods/updateGoods',
  // 详情
  detailUrl = '/tGoods/selectByGoodsDetail',
  // 修改详情
  editDetailUrl = '/tGoods/updateByGoodsDetail',
  // 配置前查询
  configUrl = '/tGoods/selectPeiZhiGoods',
  // 配置
  configEditUrl = '/tGoods/peizhiGoods',
  // 代理上下架套餐
  agentShangXiaJiaUrl = '/tGoods/updateShangXiaJia',
  // 合伙人上下架套餐
  partnerShangXiaJiaUrl = '/tGoods/hh/updateByGoods',
}

// 查询套餐
export const selectGoods = (data: any) =>
  request.post(API.selectGoods, obj2Query(data))
// 添加套餐
export const reqAdd = (data: any) => request.post(API.addUrl, obj2Query(data))
// 修改套餐
export const reqEdit = (data: any) => request.post(API.editUrl, obj2Query(data))

// 配置前查询
export const reqConfig = (data: any) =>
  request.post<any, any>(API.configUrl, obj2Query(data))

// 配置
export const reqConfigEdit = (data: any) =>
  request.post<any, any>(API.configEditUrl, obj2Query(data))

// 详情
export const reqDetail = (data: any) =>
  request.post<any, any>(API.detailUrl, obj2Query(data))

// 修改详情
export const reqEditDetail = (data: any) =>
  request.post<any, any>(API.editDetailUrl, obj2Query(data))
