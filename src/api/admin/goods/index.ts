// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询套餐
  selectGoods = '/tAdmin/tGoods/selectByAll',
  // 添加
  addUrl = '/tAdmin/tGoods/saveTGoods',
  // 修改
  editUrl = '/tAdmin/tGoods/updateTGoods',
  // 详情
  detailUrl = '/tAdmin/tGoods/selectByGoodsDetail',
  // 修改详情
  editDetailUrl = '/tAdmin/tGoods/updateGoodsDetail',
  // 配置前查询
  configUrl = '/tAdmin/tGoods/selectBypeizhi',
  // 配置
  configEditUrl = '/tAdmin/tGoods/peizhi',
  // 启禁用
  useBan = '/tAdmin/tGoods/updateQiJinYong',
  // 上下架
  shangxiajia = '/tAdmin/tGoods/updateShangXiaJia',
}

// 查询套餐
export const selectGoods = (data: any) =>
  request.post(API.selectGoods, obj2Query(data))
// 添加套餐
export const reqAdd = (data: any) =>
  request.post(API.addUrl, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
// 修改套餐
export const reqEdit = (data: any) => request.post(API.editUrl, obj2Query(data))

// 配置前查询
export const reqConfig = (data: any) =>
  request.post<any, any>(API.configUrl, obj2Query(data))

// 配置
export const reqConfigEdit = (data: any) =>
  request({
    url: API.configEditUrl,
    method: 'post',
    params: data.params,
    data: data.data
  })
  // request.post<any, any>(API.configEditUrl+'?bianma='+data.params.bianma, data.data)

// 详情
export const reqDetail = (data: any) =>
  request.post<any, any>(API.detailUrl, obj2Query(data))

// 修改详情
export const reqEditDetail = (data: any) =>
  request.post<any, any>(API.editDetailUrl, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

// 启禁用
export const reqUseBan = (data: any) =>
  request.post<any, any>(API.useBan, obj2Query(data))

// 上下架
export const reqShangxiajia = (data: any) =>
  request.post<any, any>(API.shangxiajia, obj2Query(data))
