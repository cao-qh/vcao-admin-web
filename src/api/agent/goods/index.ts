// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)

// 统一管理接口
enum API {
  // 代理查询套餐
  agentGoodsUrl = '/tGoods/selectByGoods',
  // 合伙人查询套餐
  partnerGoodsUrl = '/tGoods/hh/selectByGoods',
  // 添加
  addUrl = '/tGoods/insert',
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

// 获取商品
export const reqGoods = (data: any) => {
  let url = ''
  if (userStore.level == 0) {
    url = API.agentGoodsUrl
  } else {
    url = API.partnerGoodsUrl
  }
  return request.post(url, obj2Query(data))
}

// 上下架
export const reqShangxiajia = (data: any) => {
  let url = ''
  if (userStore.level == 0) {
    url = API.agentShangXiaJiaUrl
  } else {
    url = API.partnerShangXiaJiaUrl
  }
  return request.post(url, obj2Query(data))
}

// 添加
export const reqAdd = (data: any) => request.post<any, any>(API.addUrl, data)

// 修改
export const reqEdit = (data: any) => request.post<any, any>(API.editUrl, data)

// 详情
export const reqDetail = (data: any) =>
  request.post(API.detailUrl, obj2Query(data))

// 修改详情
export const reqEditDetail = (data: any) =>
  request.post<any, any>(API.editDetailUrl, data)

// 配置前查询
export const reqConfig = (data: any) =>
  request.post<any, any>(API.configUrl, obj2Query(data))

// 配置
export const reqConfigEdit = (data: any) =>
  request.post<any, any>(API.configEditUrl, obj2Query(data))
