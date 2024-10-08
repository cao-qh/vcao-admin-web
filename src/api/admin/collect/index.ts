// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统计
enum API {
  // 汇总统计 查
  collectSelect = '/tAdmin/tOrderTj/selectAdminOrderTJ',
  // 汇总统计 下载
  collectDownload = '/tAdmin/tOrderTj/selectAdminOrderTJDown',
  // 日汇总 查
  collectDaySelect = '/tAdmin/tOrderTj/selectAdminOrderRiTJ',
  // 日汇总 下载
  collectDayDownload = '/tAdmin/tOrderTj/selectAdminOrderRiTJDown',
}

// 汇总统计 查
export const collectSelect = (data: any) =>
  request.post(API.collectSelect, obj2Query(data))

// 汇总统计 下载
export const collectDownload = (data: any) =>
  request.post<any, any>(API.collectDownload, obj2Query(data))

// 日汇总 查
export const collectDaySelect = (data: any) =>
  request.post<any, any>(API.collectDaySelect, obj2Query(data))

// 日汇总 下载
export const collectDayDownload = (data: any) =>
  request.post<any, any>(API.collectDayDownload, obj2Query(data))
