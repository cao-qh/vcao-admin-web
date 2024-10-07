// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 代理查询套餐
  selectGoodsUrl = '/tAgent/tGoods/selectBytAgentGoodsAll',
  // 详情
  detailUrl = '/tAgent/tGoods/selectBytAgentGoodsDetail',
  // 上下架
  shangXiaJiaUrl = '/tAgent/tGoods/updatetAgentShangXiaJia',
}

// 获取商品
export const reqGoods = (data: any) => {
  return request.post(API.selectGoodsUrl, obj2Query(data))
}

// 上下架
export const reqShangxiajia = (data: any) => {
  return request.post(API.shangXiaJiaUrl, obj2Query(data))
}
// 详情
export const reqDetail = (data: any) =>
  request.post(API.detailUrl, obj2Query(data))
