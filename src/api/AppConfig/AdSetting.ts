// 统一管理咱们项目用户相关的接口
import request, { obj2Query } from '@/utils/request'

// 统一管理接口
enum API {
  // 查询
  searchUrl = '/pc/tGuanggaoShezhi/selectAll',
  // 添加
  addUrl = '/pc/tGuanggaoShezhi/insert',
  // 修改
  editUrl = '/pc/tGuanggaoShezhi/updateGg',
  // 上下架
  upDownUrl = '/pc/tGuanggaoShezhi/updateGgDel',
}

// 查询
export const reqSearch = (data: any) =>
  request.post<any, any>(API.searchUrl, obj2Query(data))

// 添加
export const reqAdd = (data: any) =>
  request.post<any, any>(API.addUrl, obj2Query(data))

// 修改
export const reqEdit = (data: any) =>
  request.post<any, any>(API.editUrl, obj2Query(data))

// 上下架
export const reqUpDown = (data: any) =>
  request.post<any, any>(API.upDownUrl, obj2Query(data))
