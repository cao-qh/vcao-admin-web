import request, { obj2Query } from '@/utils/request'

const API = {
  // 订单查询
  orderUrl: '/tAgent/cunliang/tOrder/selectAgentOrder',
  // 推送
  pushUrl: '/tAgent/cunliang/tOrder/tuiSongOrder',
  // 批量推送
  batchPushUrl: '/tAgent/cunliang/tOrder/tuiSongOrderS',
  // 导出
  exportUrl: '/tAgent/cunliang/tOrder/dowOrder',
}

// 订单查询
export const reqOrder = (data: any) =>
  request.post<any, any>(API.orderUrl, obj2Query(data))

// 推送
export const reqPush = (data: any) =>
  request.post<any, any>(API.pushUrl, obj2Query(data))

// 批量推送
export const reqBatchPush = (data: any) =>
  request.post<any, any>(API.batchPushUrl, obj2Query(data))

// 导出
export const reqExport = (data: any) =>
  request.post<any, any>(API.exportUrl, obj2Query(data))
